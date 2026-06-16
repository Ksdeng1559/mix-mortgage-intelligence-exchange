'use client'

import { useEffect, useState } from 'react'
import type { MixAgentRun } from '@/lib/mix-types'

const AGENT_SPECS = [
  { name: 'Lead Discovery Agent', emoji: '🔍', desc: 'Surface mining · Web + LinkedIn', planned: false },
  { name: 'WhyNow Engine™', emoji: '⚡', desc: 'Market trigger detection', planned: false },
  { name: 'Underwriting Agent', emoji: '📋', desc: 'Risk & capacity assessment', planned: true },
  { name: 'Enrichment Agent', emoji: '🔗', desc: 'CRM hygiene + web research', planned: true },
  { name: 'Referral Intelligence Agent', emoji: '🤝', desc: 'Network analysis + warm intros', planned: true },
  { name: 'Scoring Agent', emoji: '📈', desc: 'Composite MIX score engine', planned: true },
  { name: 'Revenue Agent', emoji: '💰', desc: 'Forecasting + commission', planned: true },
  { name: 'Reactivation Agent', emoji: '🔄', desc: 'Dormant lead re-engagement', planned: true },
]

function statusColor(s: string) {
  if (s === 'completed' || s === 'running') return 'var(--green)'
  if (s === 'error') return 'var(--red)'
  return 'var(--fg-muted)'
}

function timeAgo(ts: string | null) {
  if (!ts) return 'Never'
  const d = (Date.now() - new Date(ts).getTime()) / 1000
  if (d < 60) return 'Just now'
  if (d < 3600) return `${Math.round(d / 60)}m ago`
  if (d < 86400) return `${Math.round(d / 3600)}h ago`
  return `${Math.round(d / 86400)}d ago`
}

export function AgentsTab() {
  const [runs, setRuns] = useState<MixAgentRun[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/mix/agents')
      .then(r => r.json())
      .then(data => { setRuns(data.agent_runs ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const latestByAgent = runs.reduce<Record<string, MixAgentRun>>((acc, r) => {
    if (!acc[r.agent_name] || new Date(r.started_at) > new Date(acc[r.agent_name].started_at)) {
      acc[r.agent_name] = r
    }
    return acc
  }, {})

  return (
    <div>
      <div className="page-hd">
        <div>
          <h1>Agents</h1>
          <div className="meta">
            {AGENT_SPECS.filter(a => !a.planned).length} active ·{' '}
            {AGENT_SPECS.filter(a => a.planned).length} planned
          </div>
        </div>
      </div>

      <div className="card-grid">
        {AGENT_SPECS.map(agent => {
          const run = latestByAgent[agent.name]
          return (
            <div key={agent.name} className="ent-card">
              <div className="row">
                <div className="av" style={{
                  background: agent.planned ? 'rgba(255,255,255,0.03)' : 'var(--green-bg)',
                  border: agent.planned ? '2px solid rgba(255,255,255,0.06)' : '2px solid rgba(52,211,153,0.3)',
                }}>
                  {agent.emoji}
                </div>
                <div>
                  <div className="name">{agent.name}</div>
                  <div className="sub">{agent.desc}</div>
                </div>
              </div>
              {agent.planned ? (
                <>
                  <div className="stat"><span>Status: <span style={{ color: 'var(--fg-muted)' }}>Planned</span></span></div>
                  <div className="stat" style={{ color: 'var(--fg-muted)', fontSize: 10 }}>Implementation scheduled — see docs/MIX-IMPLEMENTATION-PLAN.md</div>
                </>
              ) : run ? (
                <>
                  <div className="stat">
                    <span>Status: <span style={{ color: statusColor(run.status) }}>{run.status}</span></span>
                    <span>Signals: {run.signals_detected}</span>
                  </div>
                  <div className="stat">
                    <span>Last run: {timeAgo(run.started_at)}</span>
                    <span>Opps created: {run.opportunities_created}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="stat"><span>Status: <span style={{ color: 'var(--amber)' }}>Not yet run</span></span></div>
                  <div className="stat" style={{ color: 'var(--fg-muted)' }}>Deploy agent to activate</div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {!loading && runs.length > 0 && (
        <>
          <div className="sec-hd" style={{ marginTop: 28 }}>
            <h2>Recent Agent Runs</h2>
          </div>
          <div className="tbl-wrap">
            <table>
              <thead>
                <tr>
                  <th>Agent</th>
                  <th>Status</th>
                  <th>Signals</th>
                  <th>Opps Created</th>
                  <th>Started</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {runs.slice(0, 10).map(r => {
                  const dur = r.completed_at
                    ? Math.round((new Date(r.completed_at).getTime() - new Date(r.started_at).getTime()) / 1000)
                    : null
                  return (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.agent_name}</td>
                      <td><span className={`pill ${r.status === 'completed' ? 'green' : r.status === 'error' ? 'red' : 'amber'}`}>{r.status}</span></td>
                      <td>{r.signals_detected}</td>
                      <td>{r.opportunities_created}</td>
                      <td style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{timeAgo(r.started_at)}</td>
                      <td style={{ color: 'var(--fg-muted)', fontSize: 12 }}>{dur != null ? `${dur}s` : '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
