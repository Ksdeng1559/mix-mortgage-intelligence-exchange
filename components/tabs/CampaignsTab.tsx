'use client'

import { useEffect, useState } from 'react'

interface Campaign {
  id: string
  title: string
  subject: string
  body_html: string | null
  body_text: string | null
  from_email: string | null
  from_name: string | null
  status: string
  sent_count: number
  open_count: number
  click_count: number
  reply_count: number
  bounce_count: number
  segment_filter: Record<string, string>
  sent_at: string | null
  created_at: string
}

type View = 'list' | 'compose'
type Provider = 'resend' | 'gmail'

interface ProviderStatus {
  resend: { configured: boolean; from: string | null }
  gmail: { configured: boolean; from: string | null }
}

function pct(n: number, d: number) {
  return d > 0 ? `${Math.round((n / d) * 100)}%` : '—'
}

function statusPill(s: string) {
  const map: Record<string, string> = { draft: 'muted', sending: 'amber', sent: 'green', paused: 'amber', archived: 'muted' }
  return map[s] ?? 'muted'
}

const DEFAULT_FORM = { title: '', subject: '', body_text: '', from_name: '', segment_type: '', segment_tier: '' }

export function CampaignsTab() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<View>('list')
  const [form, setForm] = useState(DEFAULT_FORM)
  const [provider, setProvider] = useState<Provider>('resend')
  const [providers, setProviders] = useState<ProviderStatus | null>(null)
  const [saving, setSaving] = useState(false)
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null)

  function showFlash(msg: string, ok = true) {
    setFlash({ msg, ok })
    setTimeout(() => setFlash(null), 4000)
  }

  async function load() {
    setLoading(true)
    const [camp, prov] = await Promise.all([
      fetch('/api/mix/campaigns').then(r => r.json()),
      fetch('/api/mix/providers').then(r => r.json()),
    ])
    setCampaigns(camp.campaigns ?? [])
    setProviders(prov)
    if (prov.resend?.configured) setProvider('resend')
    else if (prov.gmail?.configured) setProvider('gmail')
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function createCampaign() {
    if (!form.title || !form.subject) return showFlash('Title and subject required', false)
    setSaving(true)
    const seg: Record<string, string> = {}
    if (form.segment_type) seg.contact_type = form.segment_type
    if (form.segment_tier) seg.tier = form.segment_tier

    const res = await fetch('/api/mix/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        subject: form.subject,
        body_text: form.body_text,
        body_html: form.body_text ? `<p>${form.body_text.replace(/\n/g, '</p><p>')}</p>` : null,
        from_name: form.from_name || null,
        segment_filter: seg,
      }),
    }).then(r => r.json())

    setSaving(false)
    if (res.error) return showFlash(res.error, false)
    showFlash('Campaign created')
    setForm(DEFAULT_FORM)
    setView('list')
    load()
  }

  async function sendCampaign(id: string) {
    setSendingId(id)
    const res = await fetch(`/api/mix/campaigns/${id}/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    }).then(r => r.json())
    setSendingId(null)
    if (res.error) return showFlash(res.error, false)
    showFlash(`Sent to ${res.sent} contacts via ${res.provider}${res.errors ? ` · ${res.errors} failed` : ''}`)
    load()
  }

  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Campaigns</h1>
          <div className="meta">{campaigns.length} campaigns · outbound email via Resend</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setView(view === 'list' ? 'compose' : 'list')}>
            {view === 'list' ? '+ New Campaign' : '← Back'}
          </button>
        </div>
      </div>

      {flash && (
        <div style={{
          background: flash.ok ? 'rgba(52,211,153,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${flash.ok ? 'rgba(52,211,153,0.3)' : 'rgba(239,68,68,0.3)'}`,
          borderRadius: 'var(--radius)', padding: '10px 16px', marginBottom: 16,
          color: flash.ok ? 'var(--green)' : 'var(--red)', fontSize: 13,
        }}>
          {flash.msg}
        </div>
      )}

      {view === 'compose' && (
        <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ marginBottom: 4 }}>New Campaign</h2>

          {[
            { label: 'Campaign title', key: 'title', placeholder: 'e.g. June Referral Partner Outreach' },
            { label: 'Email subject', key: 'subject', placeholder: 'e.g. Quick question about renewals' },
            { label: 'From name (optional)', key: 'from_name', placeholder: 'Dennis Deng | MIX' },
          ].map(f => (
            <div key={f.key}>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>{f.label}</label>
              <input
                type="text"
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{
                  width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius)', padding: '8px 12px', color: 'var(--fg)',
                  fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box',
                }}
              />
            </div>
          ))}

          <div>
            <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Email body</label>
            <textarea
              placeholder="Write your email here. Plain text, will be auto-wrapped in HTML."
              value={form.body_text}
              onChange={e => setForm(p => ({ ...p, body_text: e.target.value }))}
              rows={8}
              style={{
                width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                borderRadius: 'var(--radius)', padding: '8px 12px', color: 'var(--fg)',
                fontSize: 13, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Segment by type</label>
              <select
                value={form.segment_type}
                onChange={e => setForm(p => ({ ...p, segment_type: e.target.value }))}
                style={{
                  width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius)', padding: '8px 10px', color: 'var(--fg)',
                  fontSize: 12, fontFamily: 'inherit',
                }}
              >
                <option value="">All contacts</option>
                <option value="referral_partner">Referral Partners</option>
                <option value="client">Clients</option>
                <option value="prospect">Prospects</option>
                <option value="advisor">Advisors</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Segment by tier</label>
              <select
                value={form.segment_tier}
                onChange={e => setForm(p => ({ ...p, segment_tier: e.target.value }))}
                style={{
                  width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius)', padding: '8px 10px', color: 'var(--fg)',
                  fontSize: 12, fontFamily: 'inherit',
                }}
              >
                <option value="">All tiers</option>
                <option value="A">Tier A</option>
                <option value="B">Tier B</option>
                <option value="C">Tier C</option>
              </select>
            </div>
          </div>

          {/* Provider selector */}
          <div>
            <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 6 }}>Send via</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Resend — primary */}
              <div
                onClick={() => setProvider('resend')}
                style={{
                  flex: 2, padding: '10px 14px', borderRadius: 'var(--radius)',
                  border: `1px solid ${provider === 'resend' ? 'rgba(52,211,153,0.5)' : 'var(--border)'}`,
                  background: provider === 'resend' ? 'rgba(52,211,153,0.07)' : 'var(--bg-card)',
                  cursor: 'pointer', opacity: providers?.resend.configured ? 1 : 0.7,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>📨 Resend</div>
                <div style={{ fontSize: 11, marginTop: 2, color: providers?.resend.configured ? 'var(--green)' : 'var(--amber)' }}>
                  {providers?.resend.configured ? `✓ Connected · ${providers.resend.from}` : 'Add RESEND_API_KEY + verify domain at resend.com'}
                </div>
              </div>
              {/* Gmail — optional */}
              <div
                onClick={() => setProvider('gmail')}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: 'var(--radius)',
                  border: `1px solid ${provider === 'gmail' ? 'rgba(67,56,202,0.4)' : 'var(--border)'}`,
                  background: provider === 'gmail' ? 'rgba(67,56,202,0.08)' : 'var(--bg-card)',
                  cursor: 'pointer', opacity: providers?.gmail.configured ? 1 : 0.5,
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 13 }}>📧 Gmail</div>
                <div style={{ fontSize: 11, marginTop: 2, color: providers?.gmail.configured ? 'var(--fg-secondary)' : 'var(--fg-muted)' }}>
                  {providers?.gmail.configured ? providers.gmail.from : 'Optional'}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button className="btn primary" onClick={createCampaign} disabled={saving}>
              {saving ? 'Saving...' : 'Save Campaign'}
            </button>
            <button className="btn" onClick={() => setView('list')}>Cancel</button>
          </div>
        </div>
      )}

      {view === 'list' && (
        <>
          {loading && (
            <div className="tbl-wrap">
              <table><tbody>
                {[1,2,3].map(i => <tr key={i}>{[1,2,3,4,5,6].map(j => <td key={j}><div className="skeleton" style={{ height: 14, width: j === 1 ? 180 : 70 }} /></td>)}</tr>)}
              </tbody></table>
            </div>
          )}
          {!loading && campaigns.length === 0 && (
            <div className="empty-state">
              <div className="icon">📧</div>
              <p>No campaigns yet. Create your first outbound campaign.</p>
              <button className="btn primary" onClick={() => setView('compose')}>+ New Campaign</button>
            </div>
          )}
          {!loading && campaigns.length > 0 && (
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Status</th>
                    <th>Sent</th>
                    <th>Open %</th>
                    <th>Click %</th>
                    <th>Reply %</th>
                    <th>Bounces</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(c => (
                    <tr key={c.id}>
                      <td>
                        <div style={{ fontWeight: 500 }}>{c.title}</div>
                        <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{c.subject}</div>
                      </td>
                      <td><span className={`pill ${statusPill(c.status)}`}>{c.status}</span></td>
                      <td>{c.sent_count}</td>
                      <td style={{ color: c.open_count > 0 ? 'var(--green)' : undefined }}>{pct(c.open_count, c.sent_count)}</td>
                      <td>{pct(c.click_count, c.sent_count)}</td>
                      <td style={{ color: c.reply_count > 0 ? 'var(--green)' : undefined }}>{pct(c.reply_count, c.sent_count)}</td>
                      <td style={{ color: c.bounce_count > 0 ? 'var(--red)' : 'var(--fg-muted)' }}>{c.bounce_count || '—'}</td>
                      <td>
                        {c.status === 'draft' && (
                          <button
                            className="btn primary"
                            style={{ padding: '4px 10px', fontSize: 11 }}
                            onClick={() => sendCampaign(c.id)}
                            disabled={sendingId === c.id}
                          >
                            {sendingId === c.id ? 'Sending...' : 'Send'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}
