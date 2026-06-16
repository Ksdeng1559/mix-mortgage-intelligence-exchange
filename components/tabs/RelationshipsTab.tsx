'use client'

import { useEffect, useRef, useState } from 'react'
import type { MixContact, MixOpportunity } from '@/lib/mix-types'

function initials(f: string, l: string) {
  return `${f[0] ?? ''}${l[0] ?? ''}`.toUpperCase()
}

function healthBadge(h: string | null) {
  const map: Record<string, string> = { strong: 'green', warm: 'green', neutral: 'amber', cold: 'muted', 'at-risk': 'red', dormant: 'muted' }
  return map[h?.toLowerCase() ?? ''] ?? 'muted'
}

function tierColor(t: string | null) {
  if (t === 'platinum') return '#c0c0ff'
  if (t === 'gold') return '#f59e0b'
  if (t === 'silver') return '#94a3b8'
  return 'var(--fg-muted)'
}

function timeAgo(ts: string | null) {
  if (!ts) return 'Never'
  const d = (Date.now() - new Date(ts).getTime()) / 1000
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  if (d < 604800) return `${Math.round(d / 86400)}d ago`
  return `${Math.round(d / 604800)}w ago`
}

function fmt(n: number | null) {
  if (!n) return null
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const TYPE_ICONS: Record<string, string> = {
  strata: '🏢', refinance: '🏠', construction: '🏗️', commercial: '🏗️',
  heloc: '💳', reverse: '🔄', purchase: '🏡', referral: '📋',
}

// ── Tree node styles ──────────────────────────────────────────────
const TREE_LINE = '1px solid rgba(255,255,255,0.12)'

function TreeNode({ icon, label, sub, badge, accent, leaf = false }: {
  icon: string; label: string; sub?: string; badge?: string; accent?: string; leaf?: boolean
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 32, height: 32, borderRadius: leaf ? 6 : '50%',
        background: accent ? accent + '22' : 'var(--bg-elevated)',
        border: `1px solid ${accent ?? 'var(--border)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}>
          {label}
        </div>
        {sub && <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 1 }}>{sub}</div>}
      </div>
      {badge && (
        <span style={{
          fontSize: 9, padding: '2px 6px',
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 99, color: 'var(--fg-secondary)', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {badge}
        </span>
      )}
    </div>
  )
}

function RelationshipTree({ contact, allContacts, allOpps }: {
  contact: MixContact
  allContacts: MixContact[]
  allOpps: MixOpportunity[]
}) {
  const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase()

  // Deals linked to this contact by name match
  const linkedDeals = allOpps.filter(o =>
    o.subscriber_name?.toLowerCase().includes(contact.first_name.toLowerCase()) ||
    o.subscriber_name?.toLowerCase().includes(contact.last_name.toLowerCase())
  )

  // Colleagues at same org (exclude self)
  const colleagues = contact.organization_name
    ? allContacts.filter(c =>
        c.id !== contact.id &&
        c.organization_name?.toLowerCase() === contact.organization_name?.toLowerCase()
      )
    : []

  const hasChildren = linkedDeals.length > 0 || colleagues.length > 0
  const hasOrg = !!contact.organization_name

  return (
    <div style={{ padding: '14px 0 4px', fontFamily: 'inherit' }}>
      {/* Parent: Organization */}
      {hasOrg && (
        <div style={{ marginBottom: 8, paddingLeft: 2 }}>
          <TreeNode
            icon="🏢"
            label={contact.organization_name!}
            sub="Organization"
            accent="#6366f1"
          />
          {/* Vertical line down */}
          <div style={{ marginLeft: 15, borderLeft: TREE_LINE, height: 12, marginTop: 2 }} />
        </div>
      )}

      {/* Self */}
      <div style={{ paddingLeft: hasOrg ? 16 : 2, marginBottom: hasChildren ? 4 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {hasOrg && <div style={{ width: 12, borderTop: TREE_LINE, marginTop: 0, flexShrink: 0 }} />}
          <div style={{
            background: 'var(--accent, #6366f1)' + '22',
            border: '1.5px solid var(--accent, #6366f1)',
            borderRadius: '50%',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'var(--fg)', flexShrink: 0,
          }}>
            {initials(contact.first_name, contact.last_name)}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>
              {contact.first_name} {contact.last_name}
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
              {contact.role_title ?? contact.contact_type ?? ''}
              {contact.tier && <span style={{ color: tierColor(contact.tier), marginLeft: 6 }}>● {contact.tier}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && (
        <div style={{ paddingLeft: hasOrg ? 28 : 18, marginTop: 4 }}>
          {/* Vertical trunk */}
          <div style={{ borderLeft: TREE_LINE, paddingLeft: 16 }}>

            {/* Deals */}
            {linkedDeals.map((deal, i) => {
              const isLast = i === linkedDeals.length - 1 && colleagues.length === 0
              return (
                <div key={deal.id} style={{ position: 'relative', marginBottom: 6 }}>
                  {/* Horizontal connector */}
                  <div style={{
                    position: 'absolute', left: -16, top: 16,
                    width: 16, borderTop: TREE_LINE,
                  }} />
                  {!isLast && (
                    <div style={{
                      position: 'absolute', left: -16, top: 16, bottom: -6,
                      borderLeft: TREE_LINE,
                    }} />
                  )}
                  <TreeNode
                    icon={TYPE_ICONS[deal.type?.toLowerCase() ?? ''] ?? '📋'}
                    label={deal.title}
                    sub={fmt(deal.estimated_value) ?? deal.stage}
                    badge={deal.status}
                    leaf
                    accent={deal.status === 'funded' ? '#22c55e' : deal.status === 'active' ? '#6366f1' : undefined}
                  />
                </div>
              )
            })}

            {/* Colleagues */}
            {colleagues.map((col, i) => {
              const isLast = i === colleagues.length - 1
              return (
                <div key={col.id} style={{ position: 'relative', marginBottom: 6 }}>
                  <div style={{
                    position: 'absolute', left: -16, top: 16,
                    width: 16, borderTop: TREE_LINE,
                  }} />
                  {!isLast && (
                    <div style={{
                      position: 'absolute', left: -16, top: 16, bottom: -6,
                      borderLeft: TREE_LINE,
                    }} />
                  )}
                  <TreeNode
                    icon="👤"
                    label={`${col.first_name} ${col.last_name}`}
                    sub={col.role_title ?? col.contact_type ?? ''}
                    badge="colleague"
                    accent="#0e7490"
                  />
                </div>
              )
            })}

          </div>
        </div>
      )}

      {!hasOrg && !hasChildren && (
        <div style={{ padding: '8px 4px', fontSize: 11, color: 'var(--fg-muted)', opacity: 0.6 }}>
          No linked relationships yet.
        </div>
      )}
    </div>
  )
}

// ── ContactCard ───────────────────────────────────────────────────
function ContactCard({ c, allContacts, allOpps }: { c: MixContact; allContacts: MixContact[]; allOpps: MixOpportunity[] }) {
  const [expanded, setExpanded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!expanded) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setExpanded(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [expanded])

  return (
    <div ref={ref}>
      {/* Card header — always visible */}
      <div
        className="ent-card"
        onClick={() => setExpanded(v => !v)}
        style={{
          cursor: 'pointer',
          border: `1px solid ${expanded ? 'var(--accent, #6366f1)' : 'var(--border, rgba(255,255,255,0.08))'}`,
          borderRadius: expanded ? '12px 12px 0 0' : undefined,
          marginBottom: expanded ? 0 : undefined,
          transition: 'border-color 0.15s',
          background: expanded ? 'var(--bg-card)' : undefined,
        }}
      >
        <div className="row">
          <div className="av">{initials(c.first_name, c.last_name)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="name">{c.first_name} {c.last_name}</div>
            <div className="sub">{c.role_title ?? c.contact_type?.replace('_', ' ') ?? '—'}</div>
          </div>
          <span style={{ fontSize: 10, color: 'var(--fg-muted)', opacity: 0.5, flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
        </div>
        {c.organization_name && (
          <div className="stat"><span style={{ color: 'var(--fg-secondary)' }}>🏢 {c.organization_name}</span></div>
        )}
        <div className="stat">
          {c.relationship_health && (
            <span className={`pill ${healthBadge(c.relationship_health)}`}>{c.relationship_health}</span>
          )}
          {c.tier && (
            <span className="pill muted" style={{ color: tierColor(c.tier) }}>● {c.tier}</span>
          )}
        </div>
        <div className="stat">
          <span style={{ color: 'var(--fg-muted)', fontSize: 11 }}>Last: {timeAgo(c.last_contacted_at)}</span>
          <button
            className="btn"
            style={{ padding: '3px 8px', fontSize: 10 }}
            onClick={e => e.stopPropagation()}
          >
            Touch
          </button>
        </div>
      </div>

      {/* Expanded panel with relationship tree */}
      {expanded && (
        <div style={{
          border: '1px solid var(--accent, #6366f1)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          padding: '0 14px 14px',
          background: 'var(--bg-card)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          marginBottom: 0,
        }}>
          <div style={{
            fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.08em',
            fontWeight: 700, color: 'var(--fg-muted)', padding: '10px 0 4px',
            borderBottom: '1px solid var(--border)', marginBottom: 4,
          }}>
            Relationship Map
          </div>
          <RelationshipTree contact={c} allContacts={allContacts} allOpps={allOpps} />
        </div>
      )}
    </div>
  )
}

// ── RelationshipsTab ──────────────────────────────────────────────
type ViewMode = 'cards' | 'table'

export function RelationshipsTab() {
  const [contacts, setContacts] = useState<MixContact[]>([])
  const [opps, setOpps] = useState<MixOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>('cards')
  const [filter, setFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  useEffect(() => {
    Promise.all([
      fetch('/api/mix/relationships').then(r => r.json()),
      fetch('/api/mix/pipeline').then(r => r.json()),
    ]).then(([rel, pipe]) => {
      setContacts(rel.contacts ?? [])
      setOpps(pipe.opportunities ?? [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const types = ['all', ...Array.from(new Set(contacts.map(c => c.contact_type).filter((t): t is string => t != null)))]

  const filtered = contacts.filter(c => {
    const matchText = !filter ||
      `${c.first_name} ${c.last_name}`.toLowerCase().includes(filter.toLowerCase()) ||
      c.organization_name?.toLowerCase().includes(filter.toLowerCase())
    const matchType = typeFilter === 'all' || c.contact_type === typeFilter
    return matchText && matchType
  })

  const tierOrder = ['platinum', 'gold', 'silver']
  const byTier = tierOrder.map(t => ({ tier: t, contacts: filtered.filter(c => c.tier === t) })).filter(g => g.contacts.length > 0)
  const untiered = filtered.filter(c => !c.tier || !tierOrder.includes(c.tier))

  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Relationships</h1>
          <div className="meta">{contacts.length} contacts · relationship capital</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            type="search"
            placeholder="Search..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius)', padding: '6px 12px', color: 'var(--fg)',
              fontSize: 13, fontFamily: 'inherit', width: 180,
            }}
          />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius)', padding: '6px 10px', color: 'var(--fg)',
              fontSize: 12, fontFamily: 'inherit',
            }}
          >
            {types.map(t => (
              <option key={t} value={t}>{t === 'all' ? 'All types' : t.replace('_', ' ')}</option>
            ))}
          </select>
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--border-strong)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            {(['cards', 'table'] as ViewMode[]).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={view === v ? 'btn primary' : 'btn'}
                style={{ borderRadius: 0, padding: '6px 12px', fontSize: 11 }}
              >
                {v === 'cards' ? '⊞' : '☰'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'cards' ? (
        loading ? (
          <div className="card-grid">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="ent-card">
                <div className="skeleton" style={{ height: 44, width: 44, borderRadius: '50%', marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16, width: '70%', marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: '50%' }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🤝</div>
            <p>No relationships found.</p>
          </div>
        ) : (
          <>
            {byTier.map(g => (
              <div key={g.tier}>
                <div className="sec-hd" style={{ marginBottom: 12 }}>
                  <h2 style={{ color: tierColor(g.tier) }}>
                    ● {g.tier.charAt(0).toUpperCase() + g.tier.slice(1)} · {g.contacts.length} contacts
                  </h2>
                </div>
                <div className="card-grid" style={{ marginBottom: 24 }}>
                  {g.contacts.map(c => <ContactCard key={c.id} c={c} allContacts={contacts} allOpps={opps} />)}
                </div>
              </div>
            ))}
            {untiered.length > 0 && (
              <div>
                <div className="sec-hd" style={{ marginBottom: 12 }}>
                  <h2>Untiered · {untiered.length} contacts</h2>
                </div>
                <div className="card-grid">
                  {untiered.map(c => <ContactCard key={c.id} c={c} allContacts={contacts} allOpps={opps} />)}
                </div>
              </div>
            )}
          </>
        )
      ) : (
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Organization</th>
                <th>Health</th>
                <th>Tier</th>
                <th>Last Contact</th>
              </tr>
            </thead>
            <tbody>
              {loading && [1,2,3,4,5].map(i => (
                <tr key={i}>{[1,2,3,4,5,6].map(j => (
                  <td key={j}><div className="skeleton" style={{ height: 14, width: j === 1 ? 140 : 80 }} /></td>
                ))}</tr>
              ))}
              {!loading && filtered.length === 0 && (
                <tr><td colSpan={6}><div className="empty-state"><div className="icon">🤝</div><p>No contacts.</p></div></td></tr>
              )}
              {!loading && filtered.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 500 }}>{c.first_name} {c.last_name}</td>
                  <td>{c.contact_type && <span className="pill muted" style={{ textTransform: 'capitalize' }}>{c.contact_type.replace('_', ' ')}</span>}</td>
                  <td style={{ color: 'var(--fg-secondary)' }}>{c.organization_name ?? '—'}</td>
                  <td>{c.relationship_health && <span className={`pill ${healthBadge(c.relationship_health)}`}>{c.relationship_health}</span>}</td>
                  <td>{c.tier && <span className="pill muted" style={{ color: tierColor(c.tier) }}>● {c.tier}</span>}</td>
                  <td style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{timeAgo(c.last_contacted_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
