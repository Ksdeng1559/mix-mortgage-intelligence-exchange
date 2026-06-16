export type PipelineStage = 'lead' | 'qualify' | 'underwrite' | 'score' | 'match' | 'deliver' | 'fund'

export interface MITItem {
  task: string
  reason: string
  revenue_impact: number
  due_date: string | null
  recommended_action: string
  mit_score: number
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  confidence: number
}

export interface RenewalBucket {
  days_30: MixOpportunity[]
  days_60: MixOpportunity[]
  days_90: MixOpportunity[]
  days_180: MixOpportunity[]
}

export interface ReferralAlert {
  contact: MixContact
  days_since_contact: number | null
  health: string
  recommended_action: string
}

export interface OpportunityAlert {
  opportunity: MixOpportunity
  alert_type: 'high_value' | 'at_risk' | 'cross_sell' | 'renewal'
  recommended_action: string
  revenue_impact: number
  confidence: number
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
}

export interface DailyBrief {
  revenue_forecast: number
  revenue_at_risk: number
  renewals_count: number
  policy_changes: number
  lender_updates: number
  referral_opportunities: number
  recommended_actions: string[]
}

export interface CommandResponse {
  generated_at: string
  brief: DailyBrief
  mit: MITItem[]
  renewals: RenewalBucket
  referrals: ReferralAlert[]
  opportunities: OpportunityAlert[]
  agents: { fleet: DashboardKPIs['agent_fleet']; signals_7d: number; opps_7d: number }
  inbox: unknown[]
  lender_updates: unknown[]
  calendar: unknown[]
  industry: unknown[]
}

export interface MixOpportunity {
  id: string
  title: string
  type: string | null
  subscriber_name: string | null
  status: string
  mix_score: number | null
  estimated_value: number | null
  next_step: string | null
  commission_est: number | null
  stage: PipelineStage
  renewal_date: string | null
  created_at: string
  updated_at: string
}

export interface MixContact {
  id: string
  first_name: string
  last_name: string
  email: string | null
  phone: string | null
  role_title: string | null
  contact_type: string | null
  organization_name: string | null
  relationship_health: string | null
  tier: string | null
  last_contacted_at: string | null
  created_at: string
}

export interface MixAgentRun {
  id: string
  agent_name: string
  status: string
  signals_detected: number
  opportunities_created: number
  started_at: string
  completed_at: string | null
  error_message: string | null
}

export interface DashboardKPIs {
  pipeline_value: number
  active_deals: number
  avg_mix_score: number
  funnel: Record<PipelineStage, number>
  revenue_mtd: number
  upcoming_deadlines: Array<{ title: string; date: string; days: number }>
  recent_activity: Array<{ agent: string; event: string; minutes_ago: number }>
  agent_fleet: Array<{ name: string; emoji: string; status: string; detail: string }>
}
