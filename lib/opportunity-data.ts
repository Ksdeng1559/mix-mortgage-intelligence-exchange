// MIX Alternative Financing Opportunity Detection Engine
// Canonical data + scoring weights, shared by the landing-page marketing section
// AND the /opportunity-engine interactive tool.

export type SignalId =
  | 'low_declared_income'
  | 'high_tds_gds'
  | 'credit_challenges'
  | 'down_payment_gift'
  | 'equity_available'
  | 'corporate_structure'
  | 'special_levy'
  | 'divorce'
  | 'consumer_proposal'

export type ProblemId =
  | 'debt_consolidation'
  | 'bridge_financing'
  | 'equity_takeout'
  | 'construction_financing'
  | 'reverse_mortgage'
  | 'investment_financing'
  | 'purchase_financing'
  | 'refinance'

export type ProfileId =
  | 'self_employed'
  | 'credit_bruised'
  | 'new_to_canada'
  | 'high_debt_ratio'
  | 'high_net_worth'

export type ReferralSourceId =
  | 'accountant'
  | 'lawyer'
  | 'financial_planner'
  | 'trustee'
  | 'realtor'
  | 'developer'
  | 'bookkeeper'
  | 'tax_advisor'
  | 'credit_counsellor'
  | 'corporate_lawyer'
  | 'family_lawyer'
  | 'mediator'
  | 'parent'
  | 'business_coach'
  | 'wealth_advisor'

export interface Signal {
  id: SignalId
  num: string
  title: string
  profiles: string[]
  statements: string[]
  solutions: string[]
  referrers: ReferralSourceId[]
}

export interface ProblemOption {
  id: ProblemId
  label: string
}

export interface ProfileOption {
  id: ProfileId
  label: string
  path: string
}

export interface ReferralOption {
  id: ReferralSourceId
  label: string
  path?: string
}

// ─────────────────────────────────────────────────────────────────
// THE 4 PRIMARY SIGNALS (from PRD slide)
// ─────────────────────────────────────────────────────────────────
export const SIGNALS: Signal[] = [
  {
    id: 'low_declared_income',
    num: '01',
    title: 'Low Declared Income',
    profiles: ['Business For Self', 'Incorporated Owner', 'Commission Salesperson', 'Contractor', 'Professional Corporation', 'Real Estate Investor'],
    statements: [
      'I only show $40,000 income.',
      'My accountant writes everything off.',
      'The company earns good money.',
      'I take dividends.',
      'I leave money in the corporation.',
    ],
    solutions: ['Alt-A', 'Stated Income', 'Bank Statement Program', 'Equity Lending'],
    referrers: ['accountant', 'bookkeeper', 'tax_advisor', 'business_coach', 'corporate_lawyer'],
  },
  {
    id: 'high_tds_gds',
    num: '02',
    title: 'High TDS / GDS',
    profiles: [],
    statements: [
      'I make good money but don\'t qualify.',
      'I have too many debts.',
      'I own several properties.',
      'The bank says my ratios are too high.',
    ],
    solutions: ['Debt Consolidation', 'Alt-A Lending', 'Equity Takeout', 'Refinance'],
    referrers: ['financial_planner', 'accountant', 'realtor', 'lawyer'],
  },
  {
    id: 'credit_challenges',
    num: '03',
    title: 'Credit Challenges',
    profiles: [],
    statements: [
      'I went through a divorce.',
      'My business failed.',
      'I had a consumer proposal.',
      'My credit dropped.',
    ],
    solutions: ['Alternative Lending', 'B-Lender', 'Credit Recovery Roadmap', 'Equity-Based Financing'],
    referrers: ['trustee', 'family_lawyer', 'credit_counsellor', 'accountant'],
  },
  {
    id: 'down_payment_gift',
    num: '04',
    title: 'Down Payment & Gift Issues',
    profiles: [],
    statements: [
      'My parents are helping.',
      'I have a gift.',
      'I can put down 20%.',
      'I have equity elsewhere.',
    ],
    solutions: ['Alt-A Lending', 'Purchase Financing', 'Equity Takeout', 'Gift Programs'],
    referrers: ['realtor', 'parent', 'financial_planner', 'lawyer'],
  },
]

// ─────────────────────────────────────────────────────────────────
// SECONDARY SIGNALS (additional context, weighted in scoring)
// ─────────────────────────────────────────────────────────────────
export const SECONDARY_SIGNALS: { id: SignalId; label: string }[] = [
  { id: 'equity_available', label: 'Equity Available' },
  { id: 'corporate_structure', label: 'Corporate Structure' },
  { id: 'special_levy', label: 'Special Levy' },
  { id: 'divorce', label: 'Divorce' },
  { id: 'consumer_proposal', label: 'Consumer Proposal' },
]

// ─────────────────────────────────────────────────────────────────
// SCORING WEIGHTS — total = 100
// ─────────────────────────────────────────────────────────────────
// Profile    : 25
// Signals    : 35
// Problem    : 20
// Referrer   : 20
// ─────────────────────────────────────────────────────────────────
export const SCORE_WEIGHTS = {
  profile: 25,
  signal: 35,
  problem: 20,
  referrer: 20,
} as const

// Signals that are heavily weighted (the 4 primary = 8 each = 32, secondary ~2-3 each)
export const PRIMARY_SIGNAL_WEIGHT = 8
export const SECONDARY_SIGNAL_WEIGHT = 2

// Estimated revenue per profile (illustrative — MIX config)
export const REVENUE_BY_PROFILE: Record<ProfileId, number> = {
  self_employed: 4500,
  credit_bruised: 3800,
  new_to_canada: 3200,
  high_debt_ratio: 5200,
  high_net_worth: 8800,
}

// ─────────────────────────────────────────────────────────────────
// PROFILES (matches the 5 borrower profile pages)
// ─────────────────────────────────────────────────────────────────
export const PROFILE_OPTIONS: ProfileOption[] = [
  { id: 'self_employed', label: 'Self-Employed', path: '/self-employed-financing' },
  { id: 'credit_bruised', label: 'Credit Bruised', path: '/credit-recovery-financing' },
  { id: 'new_to_canada', label: 'New To Canada', path: '/new-to-canada-financing' },
  { id: 'high_debt_ratio', label: 'High Debt Ratio', path: '/high-debt-ratio-financing' },
  { id: 'high_net_worth', label: 'High Net Worth', path: '/high-net-worth-financing' },
]

// ─────────────────────────────────────────────────────────────────
// PROBLEMS
// ─────────────────────────────────────────────────────────────────
export const PROBLEMS: ProblemOption[] = [
  { id: 'debt_consolidation', label: 'Debt Consolidation' },
  { id: 'bridge_financing', label: 'Bridge Financing' },
  { id: 'equity_takeout', label: 'Equity Takeout' },
  { id: 'construction_financing', label: 'Construction Financing' },
  { id: 'reverse_mortgage', label: 'Reverse Mortgage' },
  { id: 'investment_financing', label: 'Investment Financing' },
  { id: 'purchase_financing', label: 'Purchase Financing' },
  { id: 'refinance', label: 'Refinance' },
]

// ─────────────────────────────────────────────────────────────────
// REFERRAL SOURCES
// ─────────────────────────────────────────────────────────────────
export const REFERRAL_SOURCES: ReferralOption[] = [
  { id: 'accountant', label: 'Accountant', path: '/accountants' },
  { id: 'lawyer', label: 'Lawyer', path: '/lawyers' },
  { id: 'family_lawyer', label: 'Family Lawyer' },
  { id: 'corporate_lawyer', label: 'Corporate Lawyer' },
  { id: 'financial_planner', label: 'Financial Planner', path: '/financial-planners' },
  { id: 'trustee', label: 'Insolvency Trustee', path: '/insolvency-trustees' },
  { id: 'realtor', label: 'Realtor', path: '/realtors' },
  { id: 'developer', label: 'Developer', path: '/developers' },
  { id: 'bookkeeper', label: 'Bookkeeper' },
  { id: 'tax_advisor', label: 'Tax Advisor' },
  { id: 'credit_counsellor', label: 'Credit Counsellor' },
  { id: 'mediator', label: 'Mediator' },
  { id: 'parent', label: 'Parent / Family' },
  { id: 'business_coach', label: 'Business Coach' },
  { id: 'wealth_advisor', label: 'Wealth Advisor' },
]

// ─────────────────────────────────────────────────────────────────
// STRATEGY → PROFILE mapping (used by the scorer output)
// ─────────────────────────────────────────────────────────────────
export const RECOMMENDED_STRATEGY: Record<ProfileId, string> = {
  self_employed: 'Alt-A Mortgage',
  credit_bruised: 'B-Lender Program',
  new_to_canada: 'New-to-Canada Program',
  high_debt_ratio: 'Debt Consolidation + Alt-A',
  high_net_worth: 'Asset-Based / Private Lending',
}

// ─────────────────────────────────────────────────────────────────
// SCORING ENGINE
// ─────────────────────────────────────────────────────────────────
export interface OpportunityInput {
  profile: ProfileId | null
  primarySignals: SignalId[]     // 4 primary signals (from SIGNALS[])
  secondarySignals: SignalId[]   // 5 secondary signals
  problems: ProblemId[]
  referrer: ReferralSourceId | null
}

export interface OpportunityResult {
  score: number
  tier: 'HOT' | 'WARM' | 'QUALIFIED' | 'REVIEW' | 'COLD'
  profile: ProfileId | null
  strategy: string
  estimatedRevenue: number
  referrerPath: string | null
  recommendedSolutions: string[]
  recommendedVerticals: string[]
  breakdown: { label: string; points: number; max: number }[]
}

const TIER_THRESHOLDS = [
  { min: 85, tier: 'HOT' as const },
  { min: 70, tier: 'WARM' as const },
  { min: 55, tier: 'QUALIFIED' as const },
  { min: 35, tier: 'REVIEW' as const },
  { min: 0, tier: 'COLD' as const },
]

export function scoreOpportunity(input: OpportunityInput): OpportunityResult {
  // Profile component (25)
  const profilePoints = input.profile ? SCORE_WEIGHTS.profile : 0

  // Signal component (35) — primary 8 each, secondary 2 each
  const primaryPts = Math.min(input.primarySignals.length, 4) * PRIMARY_SIGNAL_WEIGHT
  const secondaryPts = Math.min(input.secondarySignals.length, 5) * SECONDARY_SIGNAL_WEIGHT
  // Cap at 35
  const rawSignal = primaryPts + secondaryPts
  const signalPoints = Math.min(rawSignal, SCORE_WEIGHTS.signal)

  // Problem component (20) — 7 per problem, cap at 3
  const problemPoints = Math.min(input.problems.length, 3) * 7

  // Referrer component (20) — flat 20 if present (high-value source attribution)
  const referrerPoints = input.referrer ? SCORE_WEIGHTS.referrer : 0

  const total = Math.min(100, profilePoints + signalPoints + problemPoints + referrerPoints)

  const tier = TIER_THRESHOLDS.find(t => total >= t.min)!.tier

  // Build recommended solutions from primary signals
  const signalMap = new Map(SIGNALS.map(s => [s.id, s]))
  const recommendedSolutions: string[] = []
  for (const sid of input.primarySignals) {
    const s = signalMap.get(sid)
    if (s) recommendedSolutions.push(...s.solutions)
  }

  // Map problems to specialty verticals (route paths)
  const verticalMap: Record<ProblemId, string> = {
    debt_consolidation: '/high-debt-ratio-financing',
    bridge_financing: '/bridge-financing',
    equity_takeout: '/high-net-worth-financing',
    construction_financing: '/construction-financing',
    reverse_mortgage: '/reverse-mortgage-solutions',
    investment_financing: '/investor-financing',
    purchase_financing: '/self-employed-financing',
    refinance: '/self-employed-financing',
  }
  const recommendedVerticals = Array.from(new Set(input.problems.map(p => verticalMap[p])))

  const referrerOpt = REFERRAL_SOURCES.find(r => r.id === input.referrer)

  return {
    score: total,
    tier,
    profile: input.profile,
    strategy: input.profile ? RECOMMENDED_STRATEGY[input.profile] : 'Generic Alt-A',
    estimatedRevenue: input.profile ? REVENUE_BY_PROFILE[input.profile] : 3500,
    referrerPath: referrerOpt?.path ?? null,
    recommendedSolutions: Array.from(new Set(recommendedSolutions)),
    recommendedVerticals,
    breakdown: [
      { label: 'Borrower Profile', points: profilePoints, max: SCORE_WEIGHTS.profile },
      { label: 'Detected Signals', points: signalPoints, max: SCORE_WEIGHTS.signal },
      { label: 'Financing Problem', points: problemPoints, max: SCORE_WEIGHTS.problem },
      { label: 'Referral Source', points: referrerPoints, max: SCORE_WEIGHTS.referrer },
    ],
  }
}
