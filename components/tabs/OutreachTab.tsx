'use client'

import { useEffect, useState } from 'react'
import type { MixContact } from '@/lib/mix-types'

interface OutreachMessage {
  id: string
  contact_id: string | null
  channel: string
  direction: string
  body: string
  status: string
  sent_at: string
  read_at: string | null
  replied_at: string | null
  contacts: {
    first_name: string
    last_name: string
    email: string | null
    organization_name: string | null
  } | null
}

const CHANNEL_ICONS: Record<string, string> = {
  linkedin: '🔗',
  gmail: '📧',
  outlook: '📬',
  whatsapp: '💬',
  email: '📧',
}

const TEMPLATES = [
  { label: 'Renewal check-in', text: 'Hi {name},\n\nI noticed your mortgage may be coming up for renewal soon. I wanted to reach out to see if you\'d like to explore your options before the renewal date.\n\nWould a quick 15-minute call this week work for you?\n\nBest,\nDennis' },
  { label: 'Rate drop alert', text: 'Hi {name},\n\nRates have shifted recently and I wanted to make sure you\'re aware — there may be an opportunity to save on your current mortgage.\n\nHappy to run a quick analysis at no cost. Interested?\n\nBest,\nDennis' },
  { label: 'Referral thank you', text: 'Hi {name},\n\nThank you for the referral — I really appreciate it. I\'ll make sure they\'re taken care of.\n\nIf there\'s ever anything I can do for you in return, don\'t hesitate to reach out.\n\nBest,\nDennis' },
  { label: 'Introduction', text: 'Hi {name},\n\nI\'m Dennis, a mortgage broker specializing in complex deals — strata, construction, refinancing. I work with clients in BC and help match them to the right lender program.\n\nWould love to connect if you ever have clients who need mortgage help.\n\nBest,\nDennis' },
]

function timeAgo(ts: string) {
  const d = (Date.now() - new Date(ts).getTime()) / 1000
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  if (d < 604800) return `${Math.round(d / 86400)}d ago`
  return new Date(ts).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })
}

function statusDot(s: string) {
  if (s === 'replied') return 'var(--green)'
  if (s === 'read') return 'var(--amber)'
  if (s === 'failed') return 'var(--red)'
  return 'var(--fg-muted)'
}

type ComposeView = 'inbox' | 'compose'

export function OutreachTab() {
  const [messages, setMessages] = useState<OutreachMessage[]>([])
  const [contacts, setContacts] = useState<MixContact[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ComposeView>('inbox')
  const [contactSearch, setContactSearch] = useState('')
  const [selectedContact, setSelectedContact] = useState<MixContact | null>(null)
  const [channel, setChannel] = useState('email')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null)
  const [activeTemplate, setActiveTemplate] = useState<number | null>(null)

  function showFlash(msg: string, ok = true) {
    setFlash({ msg, ok })
    setTimeout(() => setFlash(null), 4000)
  }

  useEffect(() => {
    Promise.all([
      fetch('/api/mix/outreach').then(r => r.json()),
      fetch('/api/mix/subscribers').then(r => r.json()),
    ]).then(([out, sub]) => {
      setMessages(out.messages ?? [])
      setContacts(sub.contacts ?? [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  function applyTemplate(idx: number) {
    const t = TEMPLATES[idx]
    const name = selectedContact ? selectedContact.first_name : '{name}'
    setBody(t.text.replace('{name}', name))
    setActiveTemplate(idx)
  }

  async function sendMessage() {
    if (!body.trim()) return showFlash('Message body required', false)
    setSending(true)
    const res = await fetch('/api/mix/outreach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contact_id: selectedContact?.id ?? null,
        channel,
        subject: channel === 'email' ? subject : undefined,
        body,
      }),
    }).then(r => r.json())
    setSending(false)
    if (res.error) return showFlash(res.error, false)
    showFlash('Message sent')
    setBody('')
    setSubject('')
    setSelectedContact(null)
    setContactSearch('')
    setActiveTemplate(null)
    setView('inbox')
    fetch('/api/mix/outreach').then(r => r.json()).then(d => setMessages(d.messages ?? []))
  }

  const filteredContacts = contacts.filter(c =>
    contactSearch.length >= 2 &&
    (`${c.first_name} ${c.last_name}`.toLowerCase().includes(contactSearch.toLowerCase()) ||
      c.email?.toLowerCase().includes(contactSearch.toLowerCase()))
  )

  const outbound = messages.filter(m => m.direction === 'outbound')
  const inbound = messages.filter(m => m.direction === 'inbound')

  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Outreach</h1>
          <div className="meta">
            {outbound.length} sent · {inbound.length} replies · LinkedIn, Gmail, Outlook via Unipile
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setView(view === 'inbox' ? 'compose' : 'inbox')}>
            {view === 'inbox' ? '+ New Message' : '← Inbox'}
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 900 }}>
          {/* Left: compose */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 style={{ marginBottom: 4 }}>Compose</h2>

            {/* Contact search */}
            <div style={{ position: 'relative' }}>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>To (contact)</label>
              {selectedContact ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', padding: '8px 12px' }}>
                  <span style={{ fontSize: 13 }}>{selectedContact.first_name} {selectedContact.last_name}</span>
                  <span style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{selectedContact.email}</span>
                  <button onClick={() => { setSelectedContact(null); setContactSearch('') }} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 14 }}>×</button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search contacts by name or email..."
                    value={contactSearch}
                    onChange={e => setContactSearch(e.target.value)}
                    style={{
                      width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                      borderRadius: 'var(--radius)', padding: '8px 12px', color: 'var(--fg)',
                      fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box',
                    }}
                  />
                  {filteredContacts.length > 0 && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', zIndex: 10, marginTop: 2 }}>
                      {filteredContacts.slice(0, 5).map(c => (
                        <div
                          key={c.id}
                          onClick={() => { setSelectedContact(c); setContactSearch(''); if (body.includes('{name}')) setBody(b => b.replace(/\{name\}/g, c.first_name)) }}
                          style={{ padding: '8px 12px', cursor: 'pointer', fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
                          onMouseLeave={e => (e.currentTarget.style.background = '')}
                        >
                          <span style={{ fontWeight: 500 }}>{c.first_name} {c.last_name}</span>
                          <span style={{ color: 'var(--fg-muted)', marginLeft: 8, fontSize: 11 }}>{c.email}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Channel */}
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Channel</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {['email', 'linkedin', 'gmail', 'outlook'].map(ch => (
                  <button
                    key={ch}
                    onClick={() => setChannel(ch)}
                    className={channel === ch ? 'btn primary' : 'btn'}
                    style={{ padding: '5px 12px', fontSize: 11 }}
                  >
                    {CHANNEL_ICONS[ch]} {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject — email only */}
            {channel === 'email' && (
              <div>
                <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Quick question about your renewal"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  style={{
                    width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                    borderRadius: 'var(--radius)', padding: '8px 12px', color: 'var(--fg)',
                    fontSize: 13, fontFamily: 'inherit', boxSizing: 'border-box',
                  }}
                />
              </div>
            )}

            {/* Body */}
            <div>
              <label style={{ fontSize: 11, color: 'var(--fg-muted)', display: 'block', marginBottom: 4 }}>Message</label>
              <textarea
                value={body}
                onChange={e => setBody(e.target.value)}
                rows={10}
                placeholder="Write your message..."
                style={{
                  width: '100%', background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
                  borderRadius: 'var(--radius)', padding: '8px 12px', color: 'var(--fg)',
                  fontSize: 13, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn primary" onClick={sendMessage} disabled={sending}>
                {sending ? 'Sending...' : `Send via ${channel}`}
              </button>
              <button className="btn" onClick={() => setView('inbox')}>Cancel</button>
            </div>
          </div>

          {/* Right: templates */}
          <div>
            <h2 style={{ marginBottom: 12 }}>Templates</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {TEMPLATES.map((t, i) => (
                <div
                  key={i}
                  onClick={() => applyTemplate(i)}
                  style={{
                    background: activeTemplate === i ? 'rgba(67,56,202,0.15)' : 'var(--bg-card)',
                    border: `1px solid ${activeTemplate === i ? 'rgba(67,56,202,0.4)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)', padding: '10px 14px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontWeight: 500, fontSize: 13 }}>{t.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.text.substring(0, 80)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === 'inbox' && (
        <>
          {inbound.length > 0 && (
            <>
              <div className="sec-hd" style={{ marginBottom: 12 }}>
                <h2>Replies</h2>
                <span className="pill green">{inbound.length} new</span>
              </div>
              <div className="tbl-wrap" style={{ marginBottom: 24 }}>
                <table>
                  <thead><tr><th>Channel</th><th>From</th><th>Message</th><th>Time</th></tr></thead>
                  <tbody>
                    {inbound.map(m => (
                      <tr key={m.id}>
                        <td>{CHANNEL_ICONS[m.channel]} <span style={{ fontSize: 11 }}>{m.channel}</span></td>
                        <td style={{ fontWeight: 500 }}>{m.contacts ? `${m.contacts.first_name} ${m.contacts.last_name}` : '—'}</td>
                        <td style={{ color: 'var(--fg-secondary)', fontSize: 12 }}>{m.body.substring(0, 100)}{m.body.length > 100 ? '…' : ''}</td>
                        <td style={{ color: 'var(--fg-muted)', fontSize: 11 }}>{timeAgo(m.sent_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="sec-hd" style={{ marginBottom: 12 }}>
            <h2>Sent</h2>
          </div>
          {loading && (
            <div className="tbl-wrap"><table><tbody>
              {[1,2,3,4].map(i => <tr key={i}>{[1,2,3,4,5].map(j => <td key={j}><div className="skeleton" style={{ height: 14, width: j === 3 ? 200 : 80 }} /></td>)}</tr>)}
            </tbody></table></div>
          )}
          {!loading && outbound.length === 0 && (
            <div className="empty-state">
              <div className="icon">✉️</div>
              <p>No outreach sent yet. Compose your first message.</p>
              <button className="btn primary" onClick={() => setView('compose')}>+ New Message</button>
            </div>
          )}
          {!loading && outbound.length > 0 && (
            <div className="tbl-wrap">
              <table>
                <thead>
                  <tr><th>Channel</th><th>To</th><th>Message</th><th>Status</th><th>Sent</th></tr>
                </thead>
                <tbody>
                  {outbound.map(m => (
                    <tr key={m.id}>
                      <td>{CHANNEL_ICONS[m.channel]} <span style={{ fontSize: 11 }}>{m.channel}</span></td>
                      <td style={{ fontWeight: 500 }}>{m.contacts ? `${m.contacts.first_name} ${m.contacts.last_name}` : '—'}</td>
                      <td style={{ color: 'var(--fg-secondary)', fontSize: 12, maxWidth: 280 }}>{m.body.substring(0, 80)}{m.body.length > 80 ? '…' : ''}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                          <span style={{ width: 7, height: 7, borderRadius: '50%', background: statusDot(m.status), display: 'inline-block' }} />
                          {m.replied_at ? 'replied' : m.read_at ? 'read' : m.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--fg-muted)', fontSize: 11 }}>{timeAgo(m.sent_at)}</td>
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
