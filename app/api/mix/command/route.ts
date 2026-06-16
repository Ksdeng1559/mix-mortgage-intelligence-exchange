export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'
import type { MixOpportunity, MixContact, MITItem, ReferralAlert, OpportunityAlert, RenewalBucket, DailyBrief, CommandResponse } from '@/lib/mix-types'

const STAGE_CONVERSION: Record<string, number> = {
  fund: 0.95,
  deliver: 0.70,
  match: 0.50,
  score: 0.35,
  underwrite: 0.25,
  qualify: 0.15,
  lead: 0.08,
}

function daysBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000)
}

function mitPriority(score: number): MITItem['priority'] {
  if (score >= 50000) return 'CRITICAL'
  if (score >= 10000) return 'HIGH'
  if (score >= 2000)  return 'MEDIUM'
  return 'LOW'
}

function oppPriority(score: number): OpportunityAlert['priority'] {
  if (score >= 50000) return 'CRITICAL'
  if (score >= 10000) return 'HIGH'
  if (score >= 2000)  return 'MEDIUM'
  return 'LOW'
}

export async function GET() {
  const sb = createServiceClient()
  const now = new Date()

  // --- Fetch opportunities ---
  const { data: opps } = await sb
    .from('mix_opportunities')
    .select('id, title, type, subscriber_name, status, mix_score, estimated_value, next_step, commission_est, stage, renewal_date, created_at, updated_at')
    .not('status', 'in', '("funded","declined","done")')
    .order('estimated_value', { ascending: false })
    .limit(100)

  const opportunities: MixOpportunity[] = opps ?? []

  // --- Fetch referral contacts ---
  const { data: refContacts } = await sb
    .from('contacts')
    .select('id, first_name, last_name, email, phone, role_title, contact_type, organization_name, relationship_health, tier, last_contacted_at, created_at')
    .in('contact_type', ['realtor', 'lawyer', 'accountant', 'financial_planner', 'insurance_advisor', 'builder', 'partner'])
    .order('last_contacted_at', { ascending: true, nullsFirst: true })
    .limit(50)

  const referralContacts: MixContact[] = refContacts ?? []

  // --- Fetch agent runs last 7d ---
  const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000).toISOString()
  const { data: agentRuns } = await sb
    .from('mix_agent_runs')
    .select('agent_name, status, signals_detected, opportunities_created, started_at, completed_at, error_message')
    .gte('started_at', sevenDaysAgo)
    .order('started_at', { ascending: false })
    .limit(100)

  const runs = agentRuns ?? []

  // --- Renewal buckets ---
  const in180 = new Date(now.getTime() + 180 * 86400000)
  const renewalOpps = opportunities.filter(o => o.renewal_date && new Date(o.renewal_date) <= in180)

  const renewals: RenewalBucket = {
    days_30:  renewalOpps.filter(o => daysBetween(now, new Date(o.renewal_date!)) <= 30),
    days_60:  renewalOpps.filter(o => { const d = daysBetween(now, new Date(o.renewal_date!)); return d > 30 && d <= 60 }),
    days_90:  renewalOpps.filter(o => { const d = daysBetween(now, new Date(o.renewal_date!)); return d > 60 && d <= 90 }),
    days_180: renewalOpps.filter(o => { const d = daysBetween(now, new Date(o.renewal_date!)); return d > 90 && d <= 180 }),
  }

  // --- MIT Engine ---
  const mitItems: MITItem[] = []

  // Renewal-driven MIT items
  for (const opp of renewalOpps.slice(0, 10)) {
    const daysLeft = daysBetween(now, new Date(opp.renewal_date!))
    const convProb = STAGE_CONVERSION[opp.stage] ?? 0.15
    const mixStrength = (opp.mix_score ?? 50) / 100
    const mitScore = (opp.estimated_value ?? 0) * (1 / Math.max(daysLeft, 1)) * mixStrength * convProb
    const commission = opp.commission_est ?? Math.round((opp.estimated_value ?? 0) * 0.005)

    mitItems.push({
      task: `Renewal: ${opp.title}`,
      reason: `Mortgage renews in ${daysLeft} day${daysLeft === 1 ? '' : 's'} — commission at risk: $${commission.toLocaleString()}`,
      revenue_impact: commission,
      due_date: opp.renewal_date,
      recommended_action: daysLeft <= 14
        ? `Call ${opp.subscriber_name ?? 'client'} immediately — send renewal package today`
        : `Send renewal outreach to ${opp.subscriber_name ?? 'client'} — book discovery call`,
      mit_score: mitScore,
      priority: daysLeft <= 14 ? 'CRITICAL' : daysLeft <= 30 ? 'HIGH' : 'MEDIUM',
      confidence: Math.round(mixStrength * 95),
    })
  }

  // High-value pipeline MIT items
  const highValue = opportunities
    .filter(o => !o.renewal_date && (o.estimated_value ?? 0) >= 500000)
    .slice(0, 5)

  for (const opp of highValue) {
    const convProb = STAGE_CONVERSION[opp.stage] ?? 0.15
    const mixStrength = (opp.mix_score ?? 50) / 100
    const createdDaysAgo = daysBetween(new Date(opp.created_at), now)
    const mitScore = (opp.estimated_value ?? 0) * (1 / Math.max(createdDaysAgo, 1)) * mixStrength * convProb

    mitItems.push({
      task: `Advance pipeline: ${opp.title}`,
      reason: `$${(opp.estimated_value ?? 0).toLocaleString()} deal in ${opp.stage} stage — MIX score ${opp.mix_score ?? 'N/A'}`,
      revenue_impact: Math.round((opp.estimated_value ?? 0) * 0.005),
      due_date: null,
      recommended_action: opp.next_step ?? `Move ${opp.title} from ${opp.stage} to next stage`,
      mit_score: mitScore,
      priority: oppPriority(mitScore),
      confidence: Math.round(mixStrength * convProb * 100),
    })
  }

  // Dormant referral partner MIT items
  const dormantPartners = referralContacts.filter(c => {
    if (!c.last_contacted_at) return true
    return daysBetween(new Date(c.last_contacted_at), now) >= 30
  }).slice(0, 3)

  for (const c of dormantPartners) {
    const daysSince = c.last_contacted_at ? daysBetween(new Date(c.last_contacted_at), now) : null
    mitItems.push({
      task: `Re-engage: ${c.first_name} ${c.last_name}`,
      reason: daysSince
        ? `${c.role_title ?? c.contact_type} at ${c.organization_name ?? 'unknown'} — last contact ${daysSince} days ago`
        : `${c.role_title ?? c.contact_type} at ${c.organization_name ?? 'unknown'} — never contacted`,
      revenue_impact: 0,
      due_date: null,
      recommended_action: `Send a personal check-in to ${c.first_name} — ask about active clients who may need financing`,
      mit_score: daysSince ? 500 / daysSince : 100,
      priority: 'LOW',
      confidence: 60,
    })
  }

  // Sort by MIT score descending, top 5
  mitItems.sort((a, b) => b.mit_score - a.mit_score)
  const topMIT = mitItems.slice(0, 5)

  // --- Referral Alerts ---
  const referrals: ReferralAlert[] = referralContacts.map(c => {
    const daysSince = c.last_contacted_at ? daysBetween(new Date(c.last_contacted_at), now) : null
    const health = c.relationship_health ?? (daysSince == null ? 'unknown' : daysSince > 90 ? 'dormant' : daysSince > 30 ? 'at-risk' : 'healthy')

    let action = 'Send check-in message'
    if (daysSince == null || daysSince > 90) action = `Call ${c.first_name} — relationship may be going cold`
    else if (daysSince > 30) action = `Send value-add update to ${c.first_name} — invite to coffee`

    return {
      contact: c,
      days_since_contact: daysSince,
      health,
      recommended_action: action,
    }
  })

  // --- Opportunity Alerts ---
  const oppAlerts: OpportunityAlert[] = opportunities.map(o => {
    const convProb = STAGE_CONVERSION[o.stage] ?? 0.15
    const mixStrength = (o.mix_score ?? 50) / 100
    const score = (o.estimated_value ?? 0) * convProb * mixStrength
    const commission = o.commission_est ?? Math.round((o.estimated_value ?? 0) * 0.005)

    let alertType: OpportunityAlert['alert_type'] = 'high_value'
    let action = `Advance ${o.title} — ${o.next_step ?? 'confirm next step with client'}`

    if (o.renewal_date && daysBetween(now, new Date(o.renewal_date)) <= 90) {
      alertType = 'renewal'
      action = `Book renewal call with ${o.subscriber_name ?? 'client'} — window closing`
    } else if ((o.mix_score ?? 100) < 60 && o.stage === 'score') {
      alertType = 'at_risk'
      action = `Review qualification for ${o.title} — MIX score below threshold`
    } else if ((o.estimated_value ?? 0) >= 1000000) {
      alertType = 'high_value'
      action = `Prioritize ${o.title} — high-value deal requires personal attention`
    }

    return {
      opportunity: o,
      alert_type: alertType,
      recommended_action: action,
      revenue_impact: commission,
      confidence: Math.round(convProb * mixStrength * 100),
      priority: oppPriority(score),
    }
  }).sort((a, b) => b.revenue_impact - a.revenue_impact).slice(0, 10)

  // --- Agent summary ---
  const agentMap = new Map<string, typeof runs[0]>()
  for (const r of runs) {
    if (!agentMap.has(r.agent_name)) agentMap.set(r.agent_name, r)
  }
  const fleet = [...agentMap.values()].map(r => ({
    name: r.agent_name,
    emoji: '🤖',
    status: r.status,
    detail: `Last: ${new Date(r.started_at).toLocaleTimeString()} · Signals: ${r.signals_detected ?? 0}`,
  }))
  const signals7d = runs.reduce((s, r) => s + (r.signals_detected ?? 0), 0)
  const opps7d = runs.reduce((s, r) => s + (r.opportunities_created ?? 0), 0)

  // --- Revenue forecast (weighted pipeline) ---
  const revenueForecast = opportunities.reduce((sum, o) => {
    const conv = STAGE_CONVERSION[o.stage] ?? 0
    const commission = o.commission_est ?? Math.round((o.estimated_value ?? 0) * 0.005)
    return sum + commission * conv
  }, 0)

  const revenueAtRisk = oppAlerts
    .filter(a => a.alert_type === 'at_risk' || a.alert_type === 'renewal')
    .reduce((s, a) => s + a.revenue_impact, 0)

  // --- Daily Brief ---
  const brief: DailyBrief = {
    revenue_forecast: Math.round(revenueForecast),
    revenue_at_risk: revenueAtRisk,
    renewals_count: renewalOpps.length,
    policy_changes: 0,
    lender_updates: 0,
    referral_opportunities: dormantPartners.length,
    recommended_actions: topMIT.slice(0, 3).map(m => m.task),
  }

  const response: CommandResponse = {
    generated_at: now.toISOString(),
    brief,
    mit: topMIT,
    renewals,
    referrals,
    opportunities: oppAlerts,
    agents: { fleet, signals_7d: signals7d, opps_7d: opps7d },
    inbox: [],
    lender_updates: [],
    calendar: [],
    industry: [],
  }

  return NextResponse.json(response)
}
