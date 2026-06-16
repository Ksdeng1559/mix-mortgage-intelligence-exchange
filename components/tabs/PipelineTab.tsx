'use client'

import { useEffect, useRef, useState } from 'react'
import type { MixOpportunity, PipelineStage } from '@/lib/mix-types'

function fmt(n: number | null) {
  if (!n) return '—'
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

const TYPE_ICONS: Record<string, string> = {
  strata: '🏢', refinance: '🏠', construction: '🏗️', commercial: '🏗️',
  heloc: '💳', reverse: '🔄', purchase: '🏡', referral: '📋',
}

const TYPES = ['strata', 'refinance', 'construction', 'commercial', 'heloc', 'reverse', 'purchase']
const STAGES: PipelineStage[] = ['lead', 'qualify', 'underwrite', 'score', 'match', 'deliver', 'fund']

const STAGE_LABELS: Record<PipelineStage, string> = {
  lead: 'Lead', qualify: 'Qualify', underwrite: 'Underwrite',
  score: 'Score', match: 'Match', deliver: 'Deliver', fund: 'Fund',
}

const STAGE_COLORS: Record<PipelineStage, string> = {
  lead: '#6b7280',
  qualify: '#7c3aed',
  underwrite: '#1d4ed8',
  score: '#0369a1',
  match: '#0e7490',
  deliver: '#047857',
  fund: '#15803d',
}

function scoreClass(s: number | null) {
  if (!s) return 'low'
  if (s >= 80) return 'high'
  if (s >= 60) return 'mid'
  return 'low'
}

function statusPill(s: string) {
  const map: Record<string, string> = {
    active: 'green', pending: 'amber', review: 'purple',
    dormant: 'muted', done: 'muted', funded: 'green', declined: 'red',
  }
  return map[s.toLowerCase()] ?? 'muted'
}

interface NewOppForm {
  title: string
  type: string
  subscriber_name: string
  stage: PipelineStage
  estimated_value: string
  renewal_date: string
  next_step: string
}

const EMPTY_FORM: NewOppForm = {
  title: '', type: 'refinance', subscriber_name: '',
  stage: 'lead', estimated_value: '', renewal_date: '', next_step: '',
}

function KanbanCard({ opp, onStageChange }: { opp: MixOpportunity; onStageChange: (id: string, stage: PipelineStage) => void }) {
  const [expanded, setExpanded] = useState(false)
  const [moving, setMoving] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!expanded) return
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setExpanded(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [expanded])

  async function moveTo(stage: PipelineStage) {
    if (stage === opp.stage || moving) return
    setMoving(true)
    const res = await fetch('/api/mix/pipeline', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: opp.id, stage }),
    })
    setMoving(false)
    if (res.ok) { onStageChange(opp.id, stage); setExpanded(false) }
  }

  const renewalFmt = opp.renewal_date
    ? new Date(opp.renewal_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
    : null

  return (
    <div ref={ref} style={{ marginBottom: 8 }}>
      <div
        onClick={() => !moving && setExpanded(v => !v)}
        style={{
          background: expanded ? 'var(--bg-card)' : 'var(--bg-elevated)',
          border: `1px solid ${expanded ? 'var(--accent, #6366f1)' : 'var(--border)'}`,
          borderRadius: expanded ? '10px 10px 0 0' : 10,
          padding: '12px 14px',
          cursor: 'pointer',
          transition: 'background 0.15s, border-color 0.15s',
          opacity: moving ? 0.5 : 1,
        }}
        onMouseEnter={e => { if (!expanded) e.currentTarget.style.borderColor = 'var(--border-strong)' }}
        onMouseLeave={e => { if (!expanded) e.currentTarget.style.borderColor = 'var(--border)' }}
      >
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{TYPE_ICONS[opp.type?.toLowerCase() ?? ''] ?? '📋'}</span>
            <span style={{
              fontSize: 12, fontWeight: 600, color: 'var(--fg)', lineHeight: 1.3,
              overflow: expanded ? 'visible' : 'hidden',
              textOverflow: expanded ? 'unset' : 'ellipsis',
              whiteSpace: expanded ? 'normal' : 'nowrap',
            }}>
              {opp.title}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <span className={`pill ${statusPill(opp.status)}`} style={{ fontSize: 9, padding: '2px 6px' }}>
              {opp.status}
            </span>
            <span style={{ fontSize: 10, color: 'var(--fg-muted)', opacity: 0.6 }}>{expanded ? '▲' : '▼'}</span>
          </div>
        </div>

        {opp.subscriber_name && (
          <div style={{ fontSize: 11, color: 'var(--fg-secondary)', marginBottom: 8 }}>
            {opp.subscriber_name}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--fg)' }}>{fmt(opp.estimated_value)}</span>
          {opp.mix_score != null && (
            <span className={`score ${scoreClass(opp.mix_score)}`} style={{ fontSize: 10, padding: '1px 6px' }}>
              {opp.mix_score}
            </span>
          )}
        </div>

        {!expanded && opp.next_step && (
          <div style={{
            marginTop: 8, fontSize: 10, color: 'var(--fg-muted)',
            borderTop: '1px solid var(--border)', paddingTop: 8,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            → {opp.next_step}
          </div>
        )}
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--accent, #6366f1)',
            borderTop: 'none',
            borderRadius: '0 0 10px 10px',
            padding: '14px 14px 12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
          }}
          onClick={e => e.stopPropagation()}
        >
          {/* Detail rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {opp.type && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: 'var(--fg-muted)' }}>Type</span>
                <span style={{ color: 'var(--fg)', textTransform: 'capitalize', fontWeight: 500 }}>{opp.type}</span>
              </div>
            )}
            {renewalFmt && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: 'var(--fg-muted)' }}>Renewal</span>
                <span style={{ color: 'var(--fg)', fontWeight: 500 }}>{renewalFmt}</span>
              </div>
            )}
            {opp.commission_est && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: 'var(--fg-muted)' }}>Commission</span>
                <span style={{ color: 'var(--green, #22c55e)', fontWeight: 600 }}>{fmt(opp.commission_est)}</span>
              </div>
            )}
            {opp.next_step && (
              <div style={{ fontSize: 11, background: 'var(--bg-elevated)', borderRadius: 6, padding: '7px 10px' }}>
                <span style={{ color: 'var(--fg-muted)', display: 'block', marginBottom: 3, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>Next Step</span>
                <span style={{ color: 'var(--fg)' }}>→ {opp.next_step}</span>
              </div>
            )}
          </div>

          {/* Stage mover */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <div style={{ fontSize: 9, color: 'var(--fg-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>
              {moving ? 'Moving…' : 'Move to stage'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {STAGES.map(s => (
                <button
                  key={s}
                  onClick={() => moveTo(s)}
                  disabled={moving}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '5px 9px',
                    background: s === opp.stage ? STAGE_COLORS[s] + '33' : 'var(--bg-elevated)',
                    border: `1px solid ${s === opp.stage ? STAGE_COLORS[s] : 'var(--border)'}`,
                    borderRadius: 6,
                    cursor: s === opp.stage || moving ? 'default' : 'pointer',
                    color: s === opp.stage ? 'var(--fg)' : 'var(--fg-secondary)',
                    fontSize: 10, fontFamily: 'inherit', fontWeight: s === opp.stage ? 700 : 400,
                    transition: 'all 0.12s',
                    opacity: moving && s !== opp.stage ? 0.5 : 1,
                  }}
                  onMouseEnter={e => { if (s !== opp.stage && !moving) { e.currentTarget.style.borderColor = STAGE_COLORS[s]; e.currentTarget.style.color = 'var(--fg)' } }}
                  onMouseLeave={e => { if (s !== opp.stage) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-secondary)' } }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: STAGE_COLORS[s], flexShrink: 0 }} />
                  {STAGE_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function KanbanBoard({ opps, onStageChange }: { opps: MixOpportunity[]; onStageChange: (id: string, stage: PipelineStage) => void }) {
  const byStage = STAGES.reduce<Record<PipelineStage, MixOpportunity[]>>((acc, s) => {
    acc[s] = opps.filter(o => o.stage === s)
    return acc
  }, {} as Record<PipelineStage, MixOpportunity[]>)

  return (
    <div style={{
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      paddingBottom: 16,
      minHeight: 'calc(100vh - 160px)',
      alignItems: 'flex-start',
    }}>
      {STAGES.map(stage => {
        const cards = byStage[stage]
        const stageValue = cards.reduce((s, o) => s + (o.estimated_value ?? 0), 0)
        return (
          <div key={stage} style={{
            flexShrink: 0,
            width: 220,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Column header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
              padding: '0 2px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: STAGE_COLORS[stage], flexShrink: 0,
                }} />
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--fg-secondary)' }}>
                  {STAGE_LABELS[stage]}
                </span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: 99, padding: '1px 7px',
                color: 'var(--fg-muted)',
              }}>
                {cards.length}
              </span>
            </div>

            {/* Stage value */}
            {stageValue > 0 && (
              <div style={{ fontSize: 10, color: 'var(--fg-muted)', marginBottom: 8, paddingLeft: 2 }}>
                {fmt(stageValue)} total
              </div>
            )}

            {/* Drop zone */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              padding: '8px 8px 2px',
              minHeight: 120,
            }}>
              {cards.length === 0 ? (
                <div style={{
                  textAlign: 'center', fontSize: 11,
                  color: 'var(--fg-muted)', padding: '24px 8px',
                  opacity: 0.5,
                }}>
                  No deals
                </div>
              ) : (
                cards.map(o => <KanbanCard key={o.id} opp={o} onStageChange={onStageChange} />)
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function PipelineTab() {
  const [opps, setOpps] = useState<MixOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'table' | 'kanban'>('kanban')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<NewOppForm>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function load() {
    setLoading(true)
    fetch('/api/mix/pipeline')
      .then(r => r.json())
      .then(data => { setOpps(data.opportunities ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const totalValue = opps.reduce((s, o) => s + (o.estimated_value ?? 0), 0)

  function handleStageChange(id: string, stage: PipelineStage) {
    setOpps(prev => prev.map(o => o.id === id ? { ...o, stage } : o))
  }

  function field(key: keyof NewOppForm, val: string) {
    setForm(f => ({ ...f, [key]: val }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    setSaving(true)
    setError(null)

    const body: Record<string, unknown> = {
      title: form.title.trim(),
      type: form.type,
      stage: form.stage,
      status: 'active',
    }
    if (form.subscriber_name.trim()) body.subscriber_name = form.subscriber_name.trim()
    if (form.estimated_value) body.estimated_value = parseFloat(form.estimated_value)
    if (form.renewal_date) body.renewal_date = form.renewal_date
    if (form.next_step.trim()) body.next_step = form.next_step.trim()

    const res = await fetch('/api/mix/pipeline', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    setSaving(false)
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error ?? 'Save failed')
      return
    }

    setShowForm(false)
    setForm(EMPTY_FORM)
    load()
  }

  return (
    <>
      {/* Slide-in overlay */}
      {showForm && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(7,10,19,0.7)', backdropFilter: 'blur(4px)',
          }}
          onClick={() => setShowForm(false)}
        />
      )}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 51,
          width: 420, background: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-strong)',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.5)',
          transform: showForm ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.22s cubic-bezier(0.4,0,0.2,1)',
          display: 'flex', flexDirection: 'column',
          padding: '28px 24px',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700 }}>New Opportunity</h2>
          <button className="btn" style={{ padding: '4px 10px', fontSize: 16 }} onClick={() => setShowForm(false)}>✕</button>
        </div>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelStyle}>Title *</span>
            <input required value={form.title} onChange={e => field('title', e.target.value)} placeholder="e.g. Smith strata refinance" style={inputStyle} />
          </label>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={labelStyle}>Type</span>
              <select value={form.type} onChange={e => field('type', e.target.value)} style={inputStyle}>
                {TYPES.map(t => <option key={t} value={t}>{TYPE_ICONS[t]} {t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
              </select>
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={labelStyle}>Stage</span>
              <select value={form.stage} onChange={e => field('stage', e.target.value as PipelineStage)} style={inputStyle}>
                {STAGES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
              </select>
            </label>
          </div>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelStyle}>Subscriber / Borrower Name</span>
            <input value={form.subscriber_name} onChange={e => field('subscriber_name', e.target.value)} placeholder="e.g. Jane Smith" style={inputStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelStyle}>Estimated Value ($)</span>
            <input type="number" min="0" step="10000" value={form.estimated_value} onChange={e => field('estimated_value', e.target.value)} placeholder="e.g. 850000" style={inputStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelStyle}>Renewal Date</span>
            <input type="date" value={form.renewal_date} onChange={e => field('renewal_date', e.target.value)} style={inputStyle} />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={labelStyle}>Next Step</span>
            <input value={form.next_step} onChange={e => field('next_step', e.target.value)} placeholder="e.g. Send rate options" style={inputStyle} />
          </label>

          {error && (
            <div style={{ fontSize: 12, color: 'var(--red)', padding: '8px 12px', background: 'var(--red-bg)', borderRadius: 8 }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <button type="button" className="btn" style={{ flex: 1 }} onClick={() => setShowForm(false)}>Cancel</button>
            <button type="submit" className="btn primary" style={{ flex: 2 }} disabled={saving || !form.title.trim()}>
              {saving ? 'Saving…' : 'Create Opportunity'}
            </button>
          </div>
        </form>
      </div>

      {/* Main content */}
      <div>
        <div className="page-hd">
          <div>
            <h1>Pipeline</h1>
            <div className="meta">{opps.length} opportunities · {fmt(totalValue)} total value</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* View toggle */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => setView('kanban')}
                style={{
                  padding: '6px 12px', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: view === 'kanban' ? 'var(--bg-card)' : 'transparent',
                  color: view === 'kanban' ? 'var(--fg)' : 'var(--fg-muted)',
                  borderRight: '1px solid var(--border)',
                  transition: 'all 0.15s',
                }}
              >
                ⬛ Board
              </button>
              <button
                onClick={() => setView('table')}
                style={{
                  padding: '6px 12px', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: view === 'table' ? 'var(--bg-card)' : 'transparent',
                  color: view === 'table' ? 'var(--fg)' : 'var(--fg-muted)',
                  transition: 'all 0.15s',
                }}
              >
                ☰ Table
              </button>
            </div>
            <button className="btn primary" onClick={() => setShowForm(true)}>+ New Opportunity</button>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', gap: 12, paddingTop: 8 }}>
            {STAGES.map(s => (
              <div key={s} style={{ width: 220, flexShrink: 0 }}>
                <div className="skeleton" style={{ height: 20, width: 80, marginBottom: 12 }} />
                {[1, 2].map(i => <div key={i} className="skeleton" style={{ height: 90, borderRadius: 10, marginBottom: 8 }} />)}
              </div>
            ))}
          </div>
        ) : view === 'kanban' ? (
          <KanbanBoard opps={opps} onStageChange={handleStageChange} />
        ) : (
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Opportunity</th>
                  <th>Type</th>
                  <th>Subscriber</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>MIX Score</th>
                  <th>Value</th>
                  <th>Next Step</th>
                </tr>
              </thead>
              <tbody>
                {opps.length === 0 && (
                  <tr><td colSpan={9}>
                    <div className="empty-state">
                      <div className="icon">📊</div>
                      <p>No opportunities yet. Click <strong>+ New Opportunity</strong> to add your first deal.</p>
                    </div>
                  </td></tr>
                )}
                {opps.map(o => (
                  <tr key={o.id}>
                    <td>{TYPE_ICONS[o.type?.toLowerCase() ?? ''] ?? '📋'}</td>
                    <td style={{ fontWeight: 500 }}>{o.title}</td>
                    <td style={{ textTransform: 'capitalize' }}>{o.type ?? '—'}</td>
                    <td>{o.subscriber_name ?? '—'}</td>
                    <td style={{ textTransform: 'capitalize', fontSize: 12, color: 'var(--fg-secondary)' }}>{o.stage}</td>
                    <td><span className={`pill ${statusPill(o.status)}`}>{o.status}</span></td>
                    <td><span className={`score ${scoreClass(o.mix_score)}`}>{o.mix_score ?? '—'}</span></td>
                    <td style={{ fontWeight: 600 }}>{fmt(o.estimated_value)}</td>
                    <td style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{o.next_step ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
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
