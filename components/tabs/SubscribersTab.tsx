'use client'

import { useEffect, useRef, useState } from 'react'
import type { MixContact } from '@/lib/mix-types'

function healthPill(h: string | null) {
  const map: Record<string, string> = {
    strong: 'green', warm: 'green', neutral: 'amber', cold: 'muted',
    'at-risk': 'red', dormant: 'muted', active: 'green', prospect: 'amber',
    client: 'green', referral_partner: 'purple', advisor: 'purple',
  }
  return map[h?.toLowerCase() ?? ''] ?? 'muted'
}

function initials(f: string, l: string) {
  return `${f[0] ?? ''}${l[0] ?? ''}`.toUpperCase()
}

function timeAgo(ts: string | null) {
  if (!ts) return 'Never'
  const d = (Date.now() - new Date(ts).getTime()) / 1000
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  if (d < 604800) return `${Math.round(d / 86400)}d ago`
  return `${Math.round(d / 604800)}w ago`
}

const CONTACT_TYPES = ['Client', 'Broker', 'Lender', 'Investor', 'Advisor', 'Referral']
const HEALTH_OPTIONS = ['strong', 'neutral', 'at-risk', 'dormant']
const TIER_OPTIONS = ['platinum', 'gold', 'silver', 'bronze']

// ── Field row for detail view ─────────────────────────────────────
function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, flexShrink: 0, paddingTop: 1 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--fg)', textAlign: 'right' }}>{value}</span>
    </div>
  )
}

// ── Contact modal (detail + edit) ────────────────────────────────
function ContactModal({ contact, onClose, onSave }: {
  contact: MixContact
  onClose: () => void
  onSave: (updated: MixContact) => void
}) {
  const [mode, setMode] = useState<'view' | 'edit'>('view')
  const [form, setForm] = useState({ ...contact })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  function field(key: keyof MixContact, val: string) {
    setForm(f => ({ ...f, [key]: val || null }))
  }

  async function save() {
    setSaving(true)
    setError(null)
    const res = await fetch('/api/mix/subscribers', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: contact.id,
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone: form.phone,
        role_title: form.role_title,
        contact_type: form.contact_type,
        organization_name: form.organization_name,
        relationship_health: form.relationship_health,
        tier: form.tier,
      }),
    })
    setSaving(false)
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error ?? 'Save failed')
      return
    }
    const updated = await res.json()
    onSave(updated)
    setMode('view')
  }

  const ins = inputStyle

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(7,10,19,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-strong)',
        borderRadius: 16,
        width: '100%', maxWidth: 520,
        maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
      }}>
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '20px 24px 16px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'var(--accent, #6366f1)22',
            border: '2px solid var(--accent, #6366f1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 700, color: 'var(--fg)', flexShrink: 0,
          }}>
            {initials(form.first_name, form.last_name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--fg)' }}>
              {form.first_name} {form.last_name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
              {form.role_title ?? form.contact_type ?? ''}
              {form.organization_name && <span> · {form.organization_name}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            {mode === 'view' ? (
              <button className="btn" onClick={() => setMode('edit')} style={{ fontSize: 12, padding: '6px 14px' }}>
                ✏️ Edit
              </button>
            ) : (
              <button className="btn" onClick={() => { setMode('view'); setForm({ ...contact }); setError(null) }} style={{ fontSize: 12 }}>
                Cancel
              </button>
            )}
            <button className="btn" onClick={onClose} style={{ padding: '6px 10px', fontSize: 14 }}>✕</button>
          </div>
        </div>

        {/* Modal body */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '16px 24px 24px' }}>
          {mode === 'view' ? (
            <div>
              <DetailRow label="Email" value={form.email && <a href={`mailto:${form.email}`} style={{ color: 'var(--accent, #6366f1)' }}>{form.email}</a>} />
              <DetailRow label="Phone" value={form.phone} />
              <DetailRow label="Role" value={form.role_title} />
              <DetailRow label="Organization" value={form.organization_name} />
              <DetailRow label="Type" value={form.contact_type && (
                <span className={`pill ${healthPill(form.contact_type)}`} style={{ textTransform: 'capitalize' }}>
                  {form.contact_type.replace('_', ' ')}
                </span>
              )} />
              <DetailRow label="Health" value={form.relationship_health && (
                <span className={`pill ${healthPill(form.relationship_health)}`} style={{ textTransform: 'capitalize' }}>
                  {form.relationship_health}
                </span>
              )} />
              <DetailRow label="Tier" value={form.tier && (
                <span className="pill muted" style={{ textTransform: 'capitalize' }}>{form.tier}</span>
              )} />
              <DetailRow label="Last Contact" value={timeAgo(form.last_contacted_at)} />
              <DetailRow label="Added" value={new Date(form.created_at).toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })} />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={labelStyle}>First Name</span>
                  <input value={form.first_name} onChange={e => field('first_name', e.target.value)} style={ins} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={labelStyle}>Last Name</span>
                  <input value={form.last_name} onChange={e => field('last_name', e.target.value)} style={ins} />
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={labelStyle}>Email</span>
                <input type="email" value={form.email ?? ''} onChange={e => field('email', e.target.value)} placeholder="email@example.com" style={ins} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={labelStyle}>Phone</span>
                <input value={form.phone ?? ''} onChange={e => field('phone', e.target.value)} placeholder="+1 604 555 0100" style={ins} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={labelStyle}>Role Title</span>
                <input value={form.role_title ?? ''} onChange={e => field('role_title', e.target.value)} placeholder="e.g. Managing Partner" style={ins} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span style={labelStyle}>Organization</span>
                <input value={form.organization_name ?? ''} onChange={e => field('organization_name', e.target.value)} placeholder="e.g. Capital Group" style={ins} />
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={labelStyle}>Type</span>
                  <select value={form.contact_type ?? ''} onChange={e => field('contact_type', e.target.value)} style={ins}>
                    <option value="">—</option>
                    {CONTACT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={labelStyle}>Health</span>
                  <select value={form.relationship_health ?? ''} onChange={e => field('relationship_health', e.target.value)} style={ins}>
                    <option value="">—</option>
                    {HEALTH_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  <span style={labelStyle}>Tier</span>
                  <select value={form.tier ?? ''} onChange={e => field('tier', e.target.value)} style={ins}>
                    <option value="">—</option>
                    {TIER_OPTIONS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </label>
              </div>

              {error && (
                <div style={{ fontSize: 12, color: 'var(--red)', padding: '8px 12px', background: 'rgba(239,68,68,0.1)', borderRadius: 8 }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button className="btn" style={{ flex: 1 }} onClick={() => { setMode('view'); setForm({ ...contact }); setError(null) }}>
                  Cancel
                </button>
                <button
                  className="btn primary"
                  style={{ flex: 2 }}
                  onClick={save}
                  disabled={saving || !form.first_name.trim()}
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main tab ──────────────────────────────────────────────────────
export function SubscribersTab() {
  const [contacts, setContacts] = useState<MixContact[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [importing, setImporting] = useState(false)
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null)
  const [selected, setSelected] = useState<MixContact | null>(null)
  const [showNewForm, setShowNewForm] = useState(false)
  const [newForm, setNewForm] = useState({ first_name: '', last_name: '', email: '', role_title: '', organization_name: '', contact_type: 'Client' })
  const [creating, setCreating] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function load() {
    setLoading(true)
    fetch('/api/mix/subscribers')
      .then(r => r.json())
      .then(data => { setContacts(data.contacts ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImporting(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/mix/contacts/import', { method: 'POST', body: form }).then(r => r.json())
    setImporting(false)
    if (fileRef.current) fileRef.current.value = ''
    if (res.error) { setFlash({ msg: res.error, ok: false }); setTimeout(() => setFlash(null), 5000); return }
    setFlash({ msg: `Imported ${res.imported} contacts`, ok: true })
    setTimeout(() => setFlash(null), 4000)
    load()
  }

  function handleSave(updated: MixContact) {
    setContacts(prev => prev.map(c => c.id === updated.id ? updated : c))
    setSelected(updated)
  }

  async function createContact(e: React.FormEvent) {
    e.preventDefault()
    if (!newForm.first_name.trim() || !newForm.last_name.trim()) return
    setCreating(true)
    const res = await fetch('/api/mix/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        full_name: `${newForm.first_name} ${newForm.last_name}`,
        ...newForm,
        relationship_status: 'unknown',
      }),
    })
    setCreating(false)
    if (res.ok) {
      const c = await res.json()
      setContacts(prev => [c, ...prev])
      setShowNewForm(false)
      setNewForm({ first_name: '', last_name: '', email: '', role_title: '', organization_name: '', contact_type: 'Client' })
      setSelected(c)
    }
  }

  const filtered = contacts.filter(c =>
    !filter ||
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(filter.toLowerCase()) ||
    c.organization_name?.toLowerCase().includes(filter.toLowerCase()) ||
    c.role_title?.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {/* Detail / edit modal */}
      {selected && (
        <ContactModal
          contact={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />
      )}

      {/* New contact slide-in */}
      {showNewForm && (
        <div onClick={() => setShowNewForm(false)} style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(7,10,19,0.7)', backdropFilter: 'blur(4px)' }} />
      )}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 151,
        width: 400, background: 'var(--bg-card)', borderLeft: '1px solid var(--border-strong)',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
        transform: showNewForm ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)',
        padding: '28px 24px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>New Contact</h2>
          <button className="btn" style={{ padding: '4px 10px' }} onClick={() => setShowNewForm(false)}>✕</button>
        </div>
        <form onSubmit={createContact} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={labelStyle}>First Name *</span>
              <input required value={newForm.first_name} onChange={e => setNewForm(f => ({ ...f, first_name: e.target.value }))} style={inputStyle} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={labelStyle}>Last Name *</span>
              <input required value={newForm.last_name} onChange={e => setNewForm(f => ({ ...f, last_name: e.target.value }))} style={inputStyle} />
            </label>
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={labelStyle}>Email</span>
            <input type="email" value={newForm.email} onChange={e => setNewForm(f => ({ ...f, email: e.target.value }))} placeholder="email@example.com" style={inputStyle} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={labelStyle}>Role Title</span>
            <input value={newForm.role_title} onChange={e => setNewForm(f => ({ ...f, role_title: e.target.value }))} placeholder="e.g. Managing Partner" style={inputStyle} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={labelStyle}>Organization</span>
            <input value={newForm.organization_name} onChange={e => setNewForm(f => ({ ...f, organization_name: e.target.value }))} placeholder="e.g. Capital Group" style={inputStyle} />
          </label>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={labelStyle}>Type</span>
            <select value={newForm.contact_type} onChange={e => setNewForm(f => ({ ...f, contact_type: e.target.value }))} style={inputStyle}>
              {CONTACT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button type="button" className="btn" style={{ flex: 1 }} onClick={() => setShowNewForm(false)}>Cancel</button>
            <button type="submit" className="btn primary" style={{ flex: 2 }} disabled={creating}>
              {creating ? 'Creating…' : 'Create Contact'}
            </button>
          </div>
        </form>
      </div>

      <div className="page-hd">
        <div>
          <h1>Subscribers</h1>
          <div className="meta">{contacts.length} contacts · relationship network</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="search"
            placeholder="Search contacts..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius)', padding: '6px 12px', color: 'var(--fg)',
              fontSize: 13, fontFamily: 'inherit', width: 220,
            }}
          />
          <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleImport} />
          <button className="btn" onClick={() => fileRef.current?.click()} disabled={importing}>
            {importing ? 'Importing...' : '↑ Import CSV'}
          </button>
          <button className="btn primary" onClick={() => setShowNewForm(true)}>+ New Contact</button>
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

      <div className="tbl-wrap">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Type</th>
              <th>Health</th>
              <th>Tier</th>
              <th>Last Contact</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading && [1,2,3,4,5].map(i => (
              <tr key={i}>
                {[1,2,3,4,5,6,7,8,9].map(j => (
                  <td key={j}><div className="skeleton" style={{ height: 14, width: j === 2 ? 120 : 80 }} /></td>
                ))}
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={9}>
                <div className="empty-state">
                  <div className="icon">👥</div>
                  <p>{filter ? 'No contacts match your search.' : 'No contacts yet.'}</p>
                </div>
              </td></tr>
            )}
            {!loading && filtered.map(c => (
              <tr
                key={c.id}
                onClick={() => setSelected(c)}
                style={{ cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-elevated)')}
                onMouseLeave={e => (e.currentTarget.style.background = '')}
              >
                <td style={{ fontWeight: 700, fontSize: 12, color: 'var(--fg-secondary)' }}>
                  {initials(c.first_name, c.last_name)}
                </td>
                <td style={{ fontWeight: 500 }}>{c.first_name} {c.last_name}</td>
                <td style={{ color: 'var(--fg-secondary)' }}>{c.role_title ?? '—'}</td>
                <td style={{ color: 'var(--fg-secondary)' }}>{c.organization_name ?? '—'}</td>
                <td>
                  {c.contact_type && (
                    <span className={`pill ${healthPill(c.contact_type)}`} style={{ textTransform: 'capitalize' }}>
                      {c.contact_type.replace('_', ' ')}
                    </span>
                  )}
                </td>
                <td>
                  {c.relationship_health && (
                    <span className={`pill ${healthPill(c.relationship_health)}`} style={{ textTransform: 'capitalize' }}>
                      {c.relationship_health}
                    </span>
                  )}
                </td>
                <td style={{ color: 'var(--fg-secondary)', textTransform: 'capitalize' }}>{c.tier ?? '—'}</td>
                <td style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{timeAgo(c.last_contacted_at)}</td>
                <td onClick={e => e.stopPropagation()}>
                  <button className="btn" style={{ padding: '4px 10px', fontSize: 11 }}>Send</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius)',
  padding: '8px 12px',
  color: 'var(--fg)',
  fontSize: 13,
  fontFamily: 'inherit',
  width: '100%',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: 'var(--fg-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontWeight: 600,
}
