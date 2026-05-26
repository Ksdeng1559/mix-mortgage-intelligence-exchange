-- ============================================================
-- MIX (Mortgage Intelligence Exchange) — Supabase Schema
-- RIOS-powered opportunity intelligence platform
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE pipeline_stage AS ENUM (
  'lead',
  'qualify',
  'underwrite',
  'score',
  'match',
  'deliver',
  'fund',
  'refer',
  'reactivate',
  'renew'
);

CREATE TYPE lead_source AS ENUM (
  'discovery_agent',
  'linkedin',
  'database_reactivation',
  'referral',
  'organic',
  'api',
  'manual'
);

CREATE TYPE opportunity_status AS ENUM (
  'active',
  'matched',
  'funded',
  'denied',
  'withdrawn',
  'expired'
);

CREATE TYPE scoring_tier AS ENUM (
  'A_plus',
  'A',
  'B',
  'C',
  'D',
  'reject'
);

-- ============================================================
-- PROFILES & ORGS
-- ============================================================

CREATE TABLE organizations (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  type        TEXT NOT NULL, -- 'lender' | 'broker' | 'crm_vendor' | 'cdfi' | 'foundation'
  cdfi_flag   BOOLEAN DEFAULT FALSE,
  faith_framed BOOLEAN DEFAULT FALSE,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT UNIQUE NOT NULL,
  full_name     TEXT,
  role          TEXT DEFAULT 'broker', -- 'broker' | 'lender' | 'agent' | 'admin'
  org_id        UUID REFERENCES organizations(id),
  phone         TEXT,
  avatar_url    TEXT,
  prefs         JSONB DEFAULT '{}',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- LEADS & OPPORTUNITIES
-- ============================================================

CREATE TABLE leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source          lead_source NOT NULL DEFAULT 'manual',
  first_name      TEXT,
  last_name       TEXT,
  email           TEXT,
  phone           TEXT,
  city            TEXT,
  state           TEXT,
  postal_code     TEXT,
  loan_amount     BIGINT,
  property_type   TEXT, -- 'primary' | 'investment' | 'vacation'
  property_value  BIGINT,
  credit_score    INTEGER,
  income_monthly  BIGINT,
  employer        TEXT,
  job_title       TEXT,
  years_employed  NUMERIC(4,1),
  intent_signal   TEXT, -- 'refi' | 'purchase' | 'cash_out' | 'reverse' | 'heloc'
  life_events     TEXT[], -- ['new_job', 'divorce', 'retirement', 'new_baby']
  raw_data        JSONB DEFAULT '{}', -- original scraped/enriched data
  discovery_source TEXT, -- URL or platform where lead was found
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_state ON leads(state);
CREATE INDEX idx_leads_intent ON leads(intent_signal);
CREATE INDEX idx_leads_credit ON leads(credit_score);

CREATE TABLE opportunities (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id          UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  stage            pipeline_stage NOT NULL DEFAULT 'lead',
  status           opportunity_status NOT NULL DEFAULT 'active',
  assigned_broker  UUID REFERENCES auth.users(id),
  assigned_org     UUID REFERENCES organizations(id),
  score_tier       scoring_tier,
  composite_score  NUMERIC(6,3), -- 0.000 to 1.000
  score_breakdown  JSONB DEFAULT '{}', -- {credit: 0.8, intent: 0.9, capacity: 0.7, market: 0.6}
  why_now_triggers JSONB DEFAULT '[]', -- [{engine: 'WhyNow', event: 'rate_drop', confidence: 0.87}]
  stage_history    JSONB DEFAULT '[]', -- [{stage: 'lead', entered_at: '...', exited_at: '...'}]
  match_history    JSONB DEFAULT '[]', -- tracked match attempts
  notes            TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  funded_at        TIMESTAMPTZ
);

CREATE INDEX idx_opp_stage ON opportunities(stage);
CREATE INDEX idx_opp_status ON opportunities(status);
CREATE INDEX idx_opp_broker ON opportunities(assigned_broker);
CREATE INDEX idx_opp_score ON opportunities(composite_score DESC);
CREATE INDEX idx_opp_lead ON opportunities(lead_id);

-- ============================================================
-- QUALIFICATION (LiveKit Interview Logs)
-- ============================================================

CREATE TABLE qualification_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id  UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  session_id      TEXT NOT NULL, -- LiveKit room ID
  duration_secs   INTEGER,
  transcript      JSONB DEFAULT '[]', -- [{speaker: 'agent'|'borrower', text: '...', ts: 1234}]
  summary         TEXT,
  needs_analysis  JSONB DEFAULT '{}',
  budget_min      BIGINT,
  budget_max      BIGINT,
  timeline_months INTEGER,
  property_found  BOOLEAN,
  preapproved     BOOLEAN,
  agent_id       TEXT, -- which Qualification Agent handled this
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_qual_opp ON qualification_logs(opportunity_id);

-- ============================================================
-- UNDERWRITING
-- ============================================================

CREATE TABLE underwriting_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id  UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  decision        TEXT NOT NULL, -- 'approve' | 'deny' | 'refer' | 'pending'
  decision_reason TEXT,
  risk_profile    JSONB DEFAULT '{}',
  capacity_score  NUMERIC(4,3),
  collateral_score NUMERIC(4,3),
  dti_ratio       NUMERIC(5,3),
  ltv_ratio       NUMERIC(5,3),
  conditions      JSONB DEFAULT '[]',
  human_reviewer  UUID REFERENCES auth.users(id),
  human_signoff   BOOLEAN DEFAULT FALSE,
  agent_id        TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_uw_opp ON underwriting_logs(opportunity_id);

-- ============================================================
-- SCORING
-- ============================================================

CREATE TABLE scores (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id  UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  stage           TEXT NOT NULL, -- 'initial' | 'post_qualify' | 'post_underwrite' | 'final'
  credit_score    NUMERIC(5,3),
  intent_score    NUMERIC(5,3),
  capacity_score  NUMERIC(5,3),
  market_score    NUMERIC(5,3),
  composite       NUMERIC(6,3),
  tier            scoring_tier,
  model_version   TEXT DEFAULT 'v1',
  factors         JSONB DEFAULT '{}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scores_opp ON scores(opportunity_id);

-- ============================================================
-- MATCHING
-- ============================================================

CREATE TABLE matches (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id    UUID NOT NULL REFERENCES opportunities(id) ON DELETE CASCADE,
  lender_org_id     UUID NOT NULL REFERENCES organizations(id),
  product_id        TEXT, -- lender's internal product ID
  product_name      TEXT,
  rate_offered      NUMERIC(6,4),
  term_months       INTEGER,
  max_loan_amount   BIGINT,
  closing_cost_estimate BIGINT,
  match_score       NUMERIC(5,4), -- how good this match is
  status            TEXT DEFAULT 'proposed', -- 'proposed' | 'accepted' | 'declined' | 'funded'
  broker_notes      TEXT,
  lender_notes      TEXT,
  presented_at      TIMESTAMPTZ DEFAULT NOW(),
  decided_at        TIMESTAMPTZ,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_matches_opp ON matches(opportunity_id);
CREATE INDEX idx_matches_lender ON matches(lender_org_id);

-- ============================================================
-- RIOS AGENT CONTEXT (per-opportunity memory)
-- ============================================================

CREATE TABLE agents_context (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id  UUID REFERENCES opportunities(id) ON DELETE CASCADE,
  agent_name      TEXT NOT NULL, -- e.g. 'LeadDiscoveryAgent', 'WhyNowEngine'
  turn_number      INTEGER NOT NULL,
  input_context    JSONB DEFAULT '{}',
  output_result    JSONB DEFAULT '{}',
  tokens_used     INTEGER,
  model_used      TEXT,
  latency_ms      INTEGER,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ac_opp ON agents_context(opportunity_id);
CREATE INDEX idx_ac_agent ON agents_context(agent_name);

-- ============================================================
-- REFERRALS
-- ============================================================

CREATE TABLE referrals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_profile_id   UUID REFERENCES auth.users(id),
  from_org_id       UUID REFERENCES organizations(id),
  to_profile_id     UUID REFERENCES auth.users(id),
  to_org_id         UUID REFERENCES organizations(id),
  opportunity_id    UUID REFERENCES opportunities(id),
  referral_type     TEXT NOT NULL, -- 'warm_intro' | 'vendor' | 'partner' | 'repeat'
  status            TEXT DEFAULT 'pending', -- 'pending' | 'completed' | 'declined' | 'reward_paid'
  reward_amount     BIGINT,
  reward_paid_at    TIMESTAMPTZ,
  notes             TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_ref_from ON referrals(from_profile_id);
CREATE INDEX idx_ref_opp ON referrals(opportunity_id);

-- ============================================================
-- DATABASE REACTIVATION
-- ============================================================

CREATE TABLE reactivation_campaigns (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  segment         TEXT NOT NULL, -- 'cold_90' | 'lapsed_12' | 'renewal_due'
  channel         TEXT NOT NULL, -- 'email' | 'sms' | 'call' | 'linkedin'
  template_id     TEXT,
  schedule_at     TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  stats           JSONB DEFAULT '{"sent": 0, "opened": 0, "replied": 0, "converted": 0}',
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reactivation_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id     UUID REFERENCES reactivation_campaigns(id),
  lead_id         UUID REFERENCES leads(id),
  channel         TEXT NOT NULL,
  message_id      TEXT, -- external provider message ID
  status          TEXT DEFAULT 'pending', -- 'sent' | 'delivered' | 'opened' | 'replied' | 'converted'
  opened_at       TIMESTAMPTZ,
  replied_at      TIMESTAMPTZ,
  converted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG (everything RIOS does)
-- ============================================================

CREATE TABLE audit_log (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  opportunity_id  UUID,
  actor           TEXT NOT NULL, -- 'agent:name' | 'human:user_id'
  action          TEXT NOT NULL,
  object_type     TEXT,
  object_id       UUID,
  payload         JSONB DEFAULT '{}',
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_opp ON audit_log(opportunity_id);
CREATE INDEX idx_audit_actor ON audit_log(actor);
CREATE INDEX idx_audit_created ON audit_log(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE underwriting_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents_context ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactivation_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactivation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Leads & Opps: broker sees only their assigned or org's records
CREATE POLICY "leads_select_broker" ON leads FOR SELECT
  USING (
    auth.uid() IN (
      SELECT assigned_broker FROM opportunities
      WHERE opportunities.lead_id = leads.id
    )
    OR auth.uid() IN (SELECT id FROM profiles WHERE org_id = (SELECT org_id FROM profiles WHERE id = auth.uid()))
  );

CREATE POLICY "opps_select_own" ON opportunities FOR SELECT
  USING (
    assigned_broker = auth.uid()
    OR assigned_org = (SELECT org_id FROM profiles WHERE id = auth.uid())
    OR TRUE -- admin override
  );

CREATE POLICY "opps_update_own" ON opportunities FOR UPDATE
  USING (assigned_broker = auth.uid() OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Agents context: readable by broker assigned to the opp
CREATE POLICY "ac_select_own_opp" ON agents_context FOR SELECT
  USING (
    opportunity_id IN (SELECT id FROM opportunities WHERE assigned_broker = auth.uid())
    OR (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Audit log: admin only
CREATE POLICY "audit_admin_only" ON audit_log FOR SELECT
  USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_leads_updated
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_opportunities_updated
  BEFORE UPDATE ON opportunities
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- VECTOR EMBEDDINGS (pgvector ready)
-- ============================================================

-- When pgvector is available, add:
-- ALTER TABLE leads ADD COLUMN embedding vector(1536);
-- CREATE INDEX idx_leads_embedding ON leads USING ivfflat(embedding vector_cosine_ops);

-- ============================================================
-- SUMMARY VIEW
-- ============================================================

CREATE OR REPLACE VIEW v_opportunity_summary AS
SELECT
  o.id,
  o.stage,
  o.status,
  o.composite_score,
  o.score_tier,
  o.funded_at,
  l.first_name,
  l.last_name,
  l.email,
  l.city,
  l.state,
  l.loan_amount,
  l.intent_signal,
  l.credit_score,
  p.full_name AS broker_name,
  org.name AS org_name,
  o.created_at,
  o.updated_at
FROM opportunities o
JOIN leads l ON l.id = o.lead_id
LEFT JOIN profiles p ON p.id = o.assigned_broker
LEFT JOIN organizations org ON org.id = o.assigned_org;

GRANT SELECT ON v_opportunity_summary TO authenticated;
