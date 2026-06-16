export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export async function GET() {
  const sb = createServiceClient()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const in90Days = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()

  const [oppsRes, renewalsRes, agentRunsRes, contactsRes, campaignsRes, sendsRes] = await Promise.all([
    // Active pipeline — exclude terminal states
    sb.from('mix_opportunities')
      .select('estimated_value, mix_score, stage, status, updated_at')
      .in('status', ['active', 'pending', 'review', 'dormant', 'funded', 'declined', 'done']),

    // Upcoming renewals (next 90 days) — exclude closed states
    sb.from('mix_opportunities')
      .select('id, title, renewal_date, estimated_value, status')
      .not('renewal_date', 'is', null)
      .gte('renewal_date', now.toISOString())
      .lte('renewal_date', in90Days)
      .not('status', 'in', '("funded","declined","done")')
      .order('renewal_date', { ascending: true })
      .limit(10),

    // Agent runs — latest per agent
    sb.from('mix_agent_runs')
      .select('agent_name, status, started_at, completed_at, signals_detected, opportunities_created')
      .order('started_at', { ascending: false })
      .limit(50),

    // Contacts count
    sb.from('contacts').select('id', { count: 'exact', head: true }),

    // GTM campaigns
    sb.from('mix_campaigns')
      .select('id, status, sent_count, open_count, click_count, reply_count, sent_at')
      .order('created_at', { ascending: false })
      .limit(3),

    // GTM email sends MTD
    sb.from('mix_campaign_sends')
      .select('status, opened_at, clicked_at, replied_at')
      .gte('created_at', startOfMonth),
  ])

  const opps = oppsRes.data ?? []
  const activeOpps = opps.filter(o => ['active', 'pending', 'review'].includes(o.status))
  const fundedMTD = opps.filter(o => o.status === 'funded' && o.updated_at >= startOfMonth)

  // Pipeline KPIs
  const pipeline_value = activeOpps.reduce((s, o) => s + (o.estimated_value ?? 0), 0)
  const active_deals = activeOpps.length
  const scores = activeOpps.map(o => o.mix_score).filter((s): s is number => s != null)
  const avg_mix_score = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const revenue_mtd = fundedMTD.reduce((s, o) => s + (o.estimated_value ?? 0), 0)

  // Funnel counts per stage
  const STAGES = ['lead', 'qualify', 'underwrite', 'score', 'match', 'deliver', 'fund']
  const funnel: Record<string, number> = {}
  for (const stage of STAGES) funnel[stage] = activeOpps.filter(o => o.stage === stage).length

  // Renewal deadlines
  const renewal_deadlines = (renewalsRes.data ?? []).map(r => {
    const days = Math.round((new Date(r.renewal_date!).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return { title: r.title, renewal_date: r.renewal_date!, days_remaining: days, estimated_value: r.estimated_value }
  })

  // Agent fleet — latest run per agent
  type AgentRun = { agent_name: string; status: string; started_at: string; completed_at: string | null; signals_detected: number; opportunities_created: number }
  const runsByAgent: Record<string, AgentRun> = {}
  for (const run of (agentRunsRes.data ?? []) as AgentRun[]) {
    if (!runsByAgent[run.agent_name]) runsByAgent[run.agent_name] = run
  }
  const agent_fleet = Object.values(runsByAgent).map(r => ({
    name: r.agent_name,
    status: r.status,
    last_run: r.started_at,
    signals: r.signals_detected,
    opps_created: r.opportunities_created,
  }))

  // Recent runs (last 5)
  const recent_runs = (agentRunsRes.data ?? []).slice(0, 5).map(r => ({
    agent: r.agent_name,
    status: r.status,
    started_at: r.started_at,
    signals: r.signals_detected,
  }))

  // GTM summary
  const sends = sendsRes.data ?? []
  const emails_sent_mtd = sends.length
  const opens = sends.filter(s => s.opened_at).length
  const open_rate = emails_sent_mtd > 0 ? Math.round((opens / emails_sent_mtd) * 100) : 0

  return NextResponse.json({
    // Mortgage intelligence
    pipeline_value,
    active_deals,
    avg_mix_score,
    revenue_mtd,
    funnel,
    renewal_deadlines,
    agent_fleet,
    recent_runs,
    // GTM summary
    emails_sent_mtd,
    open_rate,
    contacts_total: contactsRes.count ?? 0,
    recent_campaigns: (campaignsRes.data ?? []).map(c => ({
      id: c.id,
      status: c.status,
      sent: c.sent_count,
      opens: c.open_count,
      clicks: c.click_count,
      replies: c.reply_count,
      sent_at: c.sent_at,
    })),
  })
}
