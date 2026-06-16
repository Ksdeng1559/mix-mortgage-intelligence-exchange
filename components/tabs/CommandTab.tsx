'use client'

import { useEffect, useState, useCallback } from 'react'
import type { CommandResponse, MITItem, ReferralAlert, OpportunityAlert } from '@/lib/mix-types'

const fmt = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000   ? `$${(n / 1_000).toFixed(0)}K`
  : `$${n.toFixed(0)}`

const PRIORITY_COLOR: Record<string, string> = {
  CRITICAL: '#ef4444',
  HIGH:     '#f59e0b',
  MEDIUM:   '#6366f1',
  LOW:      '#64748b',
}

const ALERT_LABEL: Record<string, string> = {
  high_value: 'High Value',
  at_risk:    'At Risk',
  cross_sell: 'Cross-Sell',
  renewal:    'Renewal',
}

const ALERT_COLOR: Record<string, string> = {
  high_value: '#6366f1',
  at_risk:    '#ef4444',
  cross_sell: '#10b981',
  renewal:    '#f59e0b',
}

function SectionHeader({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 16 }}>{emoji}</span>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: '#94a3b8', textTransform: 'uppercase' }}>
        {title}
      </span>
    </div>
  )
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12,
      padding: '18px 20px',
      ...style,
    }}>
      {children}
    </div>
  )
}

function StubCard({ emoji, title, description, cta }: { emoji: string; title: string; description: string; cta: string }) {
  return (
    <Card style={{ opacity: 0.5 }}>
      <SectionHeader emoji={emoji} title={title} />
      <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 10px' }}>{description}</p>
      <span style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 6,
        border: '1px solid rgba(99,102,241,0.4)',
        color: '#6366f1',
        fontSize: 11,
        cursor: 'default',
      }}>{cta}</span>
    </Card>
  )
}

function MITCard({ item, rank }: { item: MITItem; rank: number }) {
  const color = PRIORITY_COLOR[item.priority]
  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.02)',
      border: `1px solid rgba(255,255,255,0.06)`,
      borderLeft: `3px solid ${color}`,
      marginBottom: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              width: 20, height: 20, borderRadius: '50%',
              background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>{rank}</span>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0' }}>{item.task}</span>
          </div>
          <p style={{ margin: '0 0 8px 28px', fontSize: 12, color: '#94a3b8' }}>{item.reason}</p>
          <div style={{ marginLeft: 28, padding: '8px 10px', background: 'rgba(99,102,241,0.08)', borderRadius: 6 }}>
            <span style={{ fontSize: 11, color: '#818cf8', fontWeight: 600 }}>ACTION: </span>
            <span style={{ fontSize: 12, color: '#c7d2fe' }}>{item.recommended_action}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          {item.revenue_impact > 0 && (
            <div style={{ fontSize: 15, fontWeight: 700, color: '#10b981' }}>{fmt(item.revenue_impact)}</div>
          )}
          <div style={{ fontSize: 10, color: color, fontWeight: 600 }}>{item.priority}</div>
          <div style={{ fontSize: 10, color: '#64748b' }}>{item.confidence}% conf.</div>
        </div>
      </div>
    </div>
  )
}

function RenewalRow({ opp, daysLabel }: { opp: { title: string; renewal_date: string | null; estimated_value: number | null; commission_est: number | null; subscriber_name: string | null }; daysLabel: string }) {
  const commission = opp.commission_est ?? Math.round((opp.estimated_value ?? 0) * 0.005)
  const days = opp.renewal_date ? Math.round((new Date(opp.renewal_date).getTime() - Date.now()) / 86400000) : null
  const urgency = days != null && days <= 14 ? '#ef4444' : days != null && days <= 30 ? '#f59e0b' : '#10b981'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 120px 100px 120px',
      gap: 8,
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      alignItems: 'center',
      fontSize: 13,
    }}>
      <div>
        <div style={{ color: '#e2e8f0', fontWeight: 500 }}>{opp.title}</div>
        <div style={{ color: '#64748b', fontSize: 11 }}>{opp.subscriber_name}</div>
      </div>
      <div style={{ color: urgency, fontWeight: 600 }}>{daysLabel}</div>
      <div style={{ color: '#94a3b8' }}>{opp.estimated_value ? fmt(opp.estimated_value) : '—'}</div>
      <div style={{ color: '#10b981', fontWeight: 600 }}>{fmt(commission)} est.</div>
    </div>
  )
}

function ReferralRow({ alert }: { alert: ReferralAlert }) {
  const healthColor =
    alert.health === 'dormant' || alert.health === 'unknown' ? '#ef4444'
    : alert.health === 'at-risk' ? '#f59e0b'
    : '#10b981'

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 80px 80px 1fr',
      gap: 8,
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      alignItems: 'center',
      fontSize: 13,
    }}>
      <div>
        <div style={{ color: '#e2e8f0', fontWeight: 500 }}>{alert.contact.first_name} {alert.contact.last_name}</div>
        <div style={{ color: '#64748b', fontSize: 11 }}>{alert.contact.role_title} · {alert.contact.organization_name}</div>
      </div>
      <div>
        <span style={{ color: healthColor, fontWeight: 600, fontSize: 11 }}>● {alert.health}</span>
      </div>
      <div style={{ color: '#64748b', fontSize: 11 }}>
        {alert.days_since_contact != null ? `${alert.days_since_contact}d ago` : 'Never'}
      </div>
      <div style={{ color: '#818cf8', fontSize: 11 }}>{alert.recommended_action}</div>
    </div>
  )
}

function OppAlertRow({ alert }: { alert: OpportunityAlert }) {
  const color = ALERT_COLOR[alert.alert_type]

  return (
    <div style={{
      padding: '12px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{
              padding: '2px 7px', borderRadius: 4,
              background: `${color}22`, color, fontSize: 10, fontWeight: 700,
            }}>{ALERT_LABEL[alert.alert_type]}</span>
            <span style={{ color: '#e2e8f0', fontWeight: 500, fontSize: 13 }}>{alert.opportunity.title}</span>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: 11, color: '#818cf8' }}>▶ {alert.recommended_action}</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
          {alert.revenue_impact > 0 && (
            <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>{fmt(alert.revenue_impact)}</div>
          )}
          <div style={{ fontSize: 10, color: '#64748b' }}>{alert.confidence}% prob.</div>
        </div>
      </div>
    </div>
  )
}

export function CommandTab() {
  const [data, setData] = useState<CommandResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [briefOpen, setBriefOpen] = useState(true)
  const [activeRenewalBucket, setActiveRenewalBucket] = useState<'days_30' | 'days_60' | 'days_90' | 'days_180'>('days_30')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/mix/command')
      if (res.ok) setData(await res.json())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const renewalCounts = data ? {
    days_30:  data.renewals.days_30.length,
    days_60:  data.renewals.days_60.length,
    days_90:  data.renewals.days_90.length,
    days_180: data.renewals.days_180.length,
  } : { days_30: 0, days_60: 0, days_90: 0, days_180: 0 }

  const totalRenewals = Object.values(renewalCounts).reduce((a, b) => a + b, 0)

  return (
    <div className="page-wrap" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <div className="page-hd" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h1 className="page-title" style={{ margin: 0 }}>⚡ Command Center</h1>
          {data && (
            <p style={{ margin: '2px 0 0', fontSize: 11, color: '#64748b' }}>
              Last updated: {new Date(data.generated_at).toLocaleString()}
            </p>
          )}
        </div>
        <button className="btn" onClick={load} disabled={loading} style={{ fontSize: 13 }}>
          {loading ? '…' : '↻ Refresh'}
        </button>
      </div>

      {loading && !data && (
        <div style={{ color: '#64748b', textAlign: 'center', padding: '60px 0', fontSize: 14 }}>
          Generating intelligence brief…
        </div>
      )}

      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Daily Executive Brief */}
          <Card>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: briefOpen ? 16 : 0 }}
              onClick={() => setBriefOpen(v => !v)}
            >
              <SectionHeader emoji="📋" title="Daily Executive Brief" />
              <span style={{ color: '#64748b', fontSize: 13 }}>{briefOpen ? '▲' : '▼'}</span>
            </div>
            {briefOpen && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                  {[
                    { label: 'Revenue Forecast', value: fmt(data.brief.revenue_forecast), color: '#10b981' },
                    { label: 'Revenue at Risk', value: fmt(data.brief.revenue_at_risk), color: '#ef4444' },
                    { label: 'Renewals', value: String(data.brief.renewals_count), color: '#f59e0b' },
                    { label: 'Policy Changes', value: String(data.brief.policy_changes), color: '#64748b' },
                    { label: 'Lender Updates', value: String(data.brief.lender_updates), color: '#64748b' },
                    { label: 'Referral Opps', value: String(data.brief.referral_opportunities), color: '#6366f1' },
                  ].map(kpi => (
                    <div key={kpi.label} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      <div style={{ fontSize: 11, color: '#64748b', marginBottom: 2 }}>{kpi.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: kpi.color }}>{kpi.value}</div>
                    </div>
                  ))}
                </div>
                {data.brief.recommended_actions.length > 0 && (
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Recommended Actions</div>
                    {data.brief.recommended_actions.map((a, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, fontSize: 13, color: '#c7d2fe' }}>
                        <span style={{ color: '#6366f1', fontWeight: 700 }}>{i + 1}.</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </Card>

          {/* MIT Engine */}
          <Card>
            <SectionHeader emoji="🎯" title="Most Important Tasks (MIT)" />
            {data.mit.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 13 }}>No active tasks — pipeline looks clear.</p>
            ) : (
              data.mit.map((item, i) => <MITCard key={i} item={item} rank={i + 1} />)
            )}
          </Card>

          {/* Renewal Intelligence */}
          <Card>
            <SectionHeader emoji="📅" title="Renewal Intelligence" />
            {totalRenewals === 0 ? (
              <p style={{ color: '#64748b', fontSize: 13 }}>No renewals in the next 180 days.</p>
            ) : (
              <>
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  {(['days_30', 'days_60', 'days_90', 'days_180'] as const).map(bucket => {
                    const label = bucket === 'days_30' ? '≤ 30 days' : bucket === 'days_60' ? '31–60 days' : bucket === 'days_90' ? '61–90 days' : '91–180 days'
                    const count = renewalCounts[bucket]
                    const active = activeRenewalBucket === bucket
                    const urgColor = bucket === 'days_30' ? '#ef4444' : bucket === 'days_60' ? '#f59e0b' : '#10b981'
                    return (
                      <button
                        key={bucket}
                        onClick={() => setActiveRenewalBucket(bucket)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: 8,
                          border: `1px solid ${active ? urgColor : 'rgba(255,255,255,0.08)'}`,
                          background: active ? `${urgColor}22` : 'transparent',
                          color: active ? urgColor : '#64748b',
                          fontSize: 12,
                          cursor: 'pointer',
                          fontWeight: active ? 700 : 400,
                        }}
                      >
                        {label} <span style={{ marginLeft: 4, fontWeight: 700 }}>{count}</span>
                      </button>
                    )
                  })}
                </div>
                {data.renewals[activeRenewalBucket].length === 0 ? (
                  <p style={{ color: '#64748b', fontSize: 13 }}>No renewals in this window.</p>
                ) : (
                  <>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 120px 100px 120px',
                      gap: 8,
                      padding: '6px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      fontSize: 11,
                      color: '#475569',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}>
                      <div>Deal</div><div>Days Left</div><div>Mortgage</div><div>Commission</div>
                    </div>
                    {data.renewals[activeRenewalBucket].map(opp => {
                      const days = opp.renewal_date ? Math.round((new Date(opp.renewal_date).getTime() - Date.now()) / 86400000) : null
                      return (
                        <RenewalRow
                          key={opp.id}
                          opp={opp}
                          daysLabel={days != null ? `${days}d` : '—'}
                        />
                      )
                    })}
                  </>
                )}
              </>
            )}
          </Card>

          {/* Referral Intelligence */}
          <Card>
            <SectionHeader emoji="🤝" title="Referral Intelligence" />
            {data.referrals.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 13 }}>No referral partners tracked. Add contacts with type: realtor, lawyer, accountant.</p>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 80px 80px 1fr',
                  gap: 8,
                  padding: '6px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  fontSize: 11,
                  color: '#475569',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  <div>Partner</div><div>Health</div><div>Last Touch</div><div>Action</div>
                </div>
                {data.referrals.slice(0, 10).map((alert, i) => (
                  <ReferralRow key={i} alert={alert} />
                ))}
              </>
            )}
          </Card>

          {/* Opportunity Intelligence */}
          <Card>
            <SectionHeader emoji="💼" title="Opportunity Intelligence" />
            {data.opportunities.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 13 }}>No active opportunities.</p>
            ) : (
              data.opportunities.map((alert, i) => <OppAlertRow key={i} alert={alert} />)
            )}
          </Card>

          {/* Agent Intelligence */}
          <Card>
            <SectionHeader emoji="🤖" title="Agent Intelligence" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 12 }}>
              <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#64748b' }}>Signals (7d)</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#6366f1' }}>{data.agents.signals_7d}</div>
              </div>
              <div style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#64748b' }}>Opps Created (7d)</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>{data.agents.opps_7d}</div>
              </div>
            </div>
            {data.agents.fleet.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 13 }}>No agent runs in the last 7 days.</p>
            ) : (
              data.agents.fleet.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: 13,
                }}>
                  <span style={{ color: '#e2e8f0' }}>{a.emoji} {a.name}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
                    background: a.status === 'running' ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
                    color: a.status === 'running' ? '#10b981' : '#94a3b8',
                  }}>{a.status}</span>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{a.detail}</span>
                </div>
              ))
            )}
          </Card>

          {/* Stub integrations */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            <StubCard
              emoji="📬"
              title="Inbox Intelligence"
              description="Classify lender emails: policy changes, rate updates, action required."
              cta="Connect Gmail / Unipile"
            />
            <StubCard
              emoji="🏦"
              title="Lender Intelligence"
              description="Track rate sheet changes, BDM announcements, program updates."
              cta="Add Lender Feeds"
            />
            <StubCard
              emoji="📰"
              title="Industry Intelligence"
              description="BoC, CMHC, OSFI, BCFSA — actionable mortgage market signals only."
              cta="Connect Brave Search"
            />
            <StubCard
              emoji="🗓"
              title="Calendar Intelligence"
              description="Pre-meeting briefs: who, why, revenue opportunity, talking points."
              cta="Connect Google Calendar"
            />
          </div>

        </div>
      )}
    </div>
  )
}
