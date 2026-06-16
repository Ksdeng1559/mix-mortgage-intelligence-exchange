-- MIX GTM Tables
-- Run once on shared RIOS-Financial Supabase project (amgknqnhiscryvcfeoyj)

-- mix_campaigns: outbound email campaigns
CREATE TABLE IF NOT EXISTS mix_campaigns (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title           TEXT NOT NULL,
  subject         TEXT NOT NULL,
  body_html       TEXT,
  body_text       TEXT,
  from_email      TEXT,
  from_name       TEXT,
  segment_filter  JSONB DEFAULT '{}',
  status          TEXT NOT NULL DEFAULT 'draft',
  sent_count      INTEGER NOT NULL DEFAULT 0,
  open_count      INTEGER NOT NULL DEFAULT 0,
  click_count     INTEGER NOT NULL DEFAULT 0,
  reply_count     INTEGER NOT NULL DEFAULT 0,
  bounce_count    INTEGER NOT NULL DEFAULT 0,
  scheduled_at    TIMESTAMPTZ,
  sent_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mix_campaigns_status ON mix_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_mix_campaigns_created ON mix_campaigns(created_at DESC);

-- mix_campaign_sends: per-contact send records
CREATE TABLE IF NOT EXISTS mix_campaign_sends (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id         UUID NOT NULL REFERENCES mix_campaigns(id) ON DELETE CASCADE,
  contact_id          UUID REFERENCES contacts(id) ON DELETE SET NULL,
  resend_message_id   TEXT,
  status              TEXT NOT NULL DEFAULT 'queued',
  opened_at           TIMESTAMPTZ,
  clicked_at          TIMESTAMPTZ,
  bounced_at          TIMESTAMPTZ,
  replied_at          TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mix_sends_campaign ON mix_campaign_sends(campaign_id);
CREATE INDEX IF NOT EXISTS idx_mix_sends_resend_id ON mix_campaign_sends(resend_message_id);

-- mix_outreach_messages: 1:1 outreach (LinkedIn, email, etc.)
CREATE TABLE IF NOT EXISTS mix_outreach_messages (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id      UUID REFERENCES contacts(id) ON DELETE SET NULL,
  channel         TEXT NOT NULL DEFAULT 'email',
  direction       TEXT NOT NULL DEFAULT 'outbound',
  subject         TEXT,
  body            TEXT,
  provider_msg_id TEXT,
  status          TEXT NOT NULL DEFAULT 'sent',
  sent_at         TIMESTAMPTZ DEFAULT NOW(),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mix_outreach_contact ON mix_outreach_messages(contact_id);
CREATE INDEX IF NOT EXISTS idx_mix_outreach_channel ON mix_outreach_messages(channel);

-- RPC for webhook aggregation: increment campaign counters
CREATE OR REPLACE FUNCTION increment_campaign_count(
  p_campaign_id UUID,
  p_field       TEXT
) RETURNS VOID AS $$
BEGIN
  EXECUTE format(
    'UPDATE mix_campaigns SET %I = %I + 1, updated_at = NOW() WHERE id = $1',
    p_field, p_field
  ) USING p_campaign_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- updated_at trigger for mix_campaigns
CREATE OR REPLACE TRIGGER trg_mix_campaigns_updated
  BEFORE UPDATE ON mix_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
