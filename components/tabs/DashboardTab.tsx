'use client'

import { useEffect, useState } from 'react'

interface RenewalDeadline {
  title: string
  renewal_date: string
  days_remaining: number
  estimated_value: number | null
}

interface AgentFleetEntry {
  name: string
  status: string
  last_run: string | null
  signals: number
  opps_created: number
}

interface RecentRun {
  agent: string
  status: string
  started_at: string
  signals: number
}

interface RecentCampaign {
  id: string
  status: string
  sent: number
  opens: number
  clicks: number
  replies: number
  sent_at: string | null
}

interface DashboardData {
  pipeline_value: number
  active_deals: number
  avg_mix_score: number
  revenue_mtd: number
  funnel: Record<string, number>
  renewal_deadlines: RenewalDeadline[]
  agent_fleet: AgentFleetEntry[]
  recent_runs: RecentRun[]
  emails_sent_mtd: number
  open_rate: number
  contacts_total: number
  recent_campaigns: RecentCampaign[]
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function timeAgo(ts: string | null) {
  if (!ts) return 'Never'
  const d = (Date.now() - new Date(ts).getTime()) / 1000
  if (d < 60) return 'Just now'
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  return `${Math.round(d / 86400)}d ago`
}

const STAGES = ['lead', 'qualify', 'underwrite', 'score', 'match', 'deliver', 'fund']
const STAGE_COLORS = ['#4338CA', '#6366F1', '#818CF8', '#A78BFA', '#34D399', '#FBBF24', '#F87171']

const AGENT_EMOJIS: Record<string, string> = {
  'Lead Discovery Agent': '🔍',
  'WhyNow Engine™': '⚡',
  'Underwriting Agent': '📋',
  'Enrichment Agent': '🔗',
  'Referral Intelligence Agent': '🤝',
  'Scoring Agent': '📈',
  'Revenue Agent': '💰',
  'Reactivation Agent': '🔄',
}

const Sk = ({ w = 80, h = 40 }: { w?: number; h?: number }) => (
  <div className="skeleton" style={{ height: h, width: w }} />
)

export function DashboardTab() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/mix/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const funnel = data?.funnel ?? {}
  const maxFunnelCount = Math.max(1, ...STAGES.map(s => funnel[s] ?? 0))

  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Dashboard</h1>
          <div className="meta">Mortgage intelligence · pipeline · renewals · agents</div>
        </div>
        <div className="live"><span className="dot" /> Live</div>
      </div>

      <div className="bento">
        {/* Pipeline Value */}
        <div>
          <div className="card-label">Pipeline Value</div>
          {loading ? <Sk /> : (
            <div className="card-value gradient">{fmt(data?.pipeline_value ?? 0)}</div>
          )}
          <div className="card-sub">{loading ? '' : `${data?.active_deals ?? 0} active deals`}</div>
          <div className="spark-wrap">
            <svg viewBox="0 0 120 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4338CA" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#4338CA" stopOpacity="0" />
                </linearGradient>
              </defs>
              {!loading && (data?.pipeline_value ?? 0) > 0 && (
                <>
                  <polyline className="spark-line" points="0,55 20,45 40,50 60,30 80,35 100,20 120,10" />
                  <polygon className="spark-fill" points="0,60 0,55 20,45 40,50 60,30 80,35 100,20 120,10 120,60" />
                  <circle className="spark-dot" cx="120" cy="10" r="3" />
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Active Deals mini bar chart */}
        <div>
          <div className="card-label">Active Deals</div>
          {loading ? <Sk /> : (
            <div className="card-value">{data?.active_deals ?? 0}</div>
          )}
          <div className="card-sub">across {STAGES.length} stages</div>
          <div className="mini-bars">
            {STAGES.map((s, i) => {
              const count = funnel[s] ?? 0
              const pct = loading ? 0 : Math.round((count / maxFunnelCount) * 100)
              return (
                <div key={s} className="bar-col">
                  <div className="bar" style={{ height: `${Math.max(4, pct)}%`, background: STAGE_COLORS[i] }} />
                  <span className="lbl">{s[0].toUpperCase()}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Avg MIX Score */}
        <div>
          <div className="card-label">Avg MIX Score</div>
          {loading ? <Sk /> : (
            <div
              className="card-value"
              style={{
                color: (data?.avg_mix_score ?? 0) >= 80 ? 'var(--green)'
                  : (data?.avg_mix_score ?? 0) >= 60 ? 'var(--amber)'
                  : undefined
              }}
            >
              {data?.avg_mix_score ?? '—'}
            </div>
          )}
          <div className="card-sub">Credit · Intent · Capacity · Market</div>
        </div>

        {/* Revenue MTD */}
        <div>
          <div className="card-label">Revenue MTD</div>
          {loading ? <Sk /> : (
            <div className="card-value gradient">{fmt(data?.revenue_mtd ?? 0)}</div>
          )}
          <div className="card-sub">funded volume this month</div>
        </div>

        {/* Pipeline Funnel — span-2 */}
        <div className="span-2">
          <div className="card-label">Pipeline Funnel</div>
          <div className="funnel">
            {STAGES.map((s, i) => {
              const count = funnel[s] ?? 0
              const pct = loading ? 0 : Math.round((count / maxFunnelCount) * 100)
              return (
                <div key={s} className="funnel-bar">
                  <span className="label" style={{ textTransform: 'capitalize' }}>{s}</span>
                  <div className="bar" style={{ width: `${Math.max(2, pct)}%`, background: STAGE_COLORS[i] }} />
                  {loading ? <Sk w={20} h={14} /> : <span className="count">{count}</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Upcoming Deadlines — span-2 */}
        <div className="span-2">
          <div className="card-label">Upcoming Renewals</div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 16 }} />)}
            </div>
          ) : (data?.renewal_deadlines ?? []).length === 0 ? (
            <div style={{ color: 'var(--fg-muted)', fontSize: 12, paddingTop: 8 }}>
              No renewals in the next 90 days — or Supabase schema not yet deployed
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {(data?.renewal_deadlines ?? []).map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, alignItems: 'center' }}>
                  <span
                    className={`pill ${r.days_remaining < 7 ? 'red' : r.days_remaining < 30 ? 'amber' : 'muted'}`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {r.days_remaining}d
                  </span>
                  <span style={{ flex: 1, fontWeight: 500 }}>{r.title}</span>
                  {r.estimated_value && (
                    <span style={{ color: 'var(--green)' }}>{fmt(r.estimated_value)}</span>
                  )}
                  <span style={{ color: 'var(--fg-muted)' }}>{new Date(r.renewal_date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent Fleet — span-2 */}
        <div className="span-2">
          <div className="card-label">Agent Fleet</div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 16 }} />)}
            </div>
          ) : (data?.agent_fleet ?? []).length === 0 ? (
            <div style={{ color: 'var(--fg-muted)', fontSize: 12, paddingTop: 8 }}>
              No agent runs yet — deploy agents to activate
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {(data?.agent_fleet ?? []).map((a, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, alignItems: 'center' }}>
                  <span>{AGENT_EMOJIS[a.name] ?? '🤖'}</span>
                  <span style={{ flex: 1, fontWeight: 500 }}>{a.name}</span>
                  <span className={`pill ${a.status === 'completed' ? 'green' : a.status === 'running' ? 'amber' : a.status === 'error' ? 'red' : 'muted'}`}>
                    {a.status}
                  </span>
                  <span style={{ color: 'var(--fg-muted)' }}>{timeAgo(a.last_run)}</span>
                  <span style={{ color: 'var(--fg-secondary)' }}>{a.signals} signals</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="span-2">
          <div className="card-label">Recent Agent Activity</div>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: 14 }} />)}
            </div>
          ) : (data?.recent_runs ?? []).length === 0 ? (
            <div style={{ color: 'var(--fg-muted)', fontSize: 12, paddingTop: 8 }}>No agent runs recorded</div>
          ) : (
            <div className="feed">
              {(data?.recent_runs ?? []).map((r, i) => (
                <div key={i} className="feed-item">
                  <span className="time">{timeAgo(r.started_at)}</span>
                  <div className="body">
                    <span className="agent">{r.agent}</span>
                    {' — '}
                    <span className="event">{r.signals} signals detected</span>
                  </div>
                  <span className={`pill ${r.status === 'completed' ? 'green' : r.status === 'error' ? 'red' : 'amber'}`}>{r.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GTM Summary */}
        <div>
          <div className="card-label">Outreach (MTD)</div>
          {loading ? <Sk /> : <div className="card-value">{data?.emails_sent_mtd ?? 0}</div>}
          <div className="card-sub">emails sent this month</div>
          {!loading && (data?.emails_sent_mtd ?? 0) > 0 && (
            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fg-secondary)' }}>
              Open rate: <span style={{ color: 'var(--green)' }}>{data?.open_rate}%</span>
            </div>
          )}
        </div>

        {/* Contacts */}
        <div>
          <div className="card-label">Total Contacts</div>
          {loading ? <Sk /> : <div className="card-value">{data?.contacts_total ?? 0}</div>}
          <div className="card-sub">in relationship network</div>
        </div>
      </div>
    </div>
  )
}
