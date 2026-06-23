-- Local Mortgage Copilot schema for MIX
-- Prefix: mix_local_

create extension if not exists "uuid-ossp";

create table if not exists mix_local_borrowers (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid,
  full_name text not null,
  email text,
  phone text,
  date_of_birth date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mix_local_deals (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid,
  borrower_id uuid references mix_local_borrowers(id),
  deal_name text not null,
  purpose text,
  property_address text,
  estimated_property_value numeric(14,2),
  mortgage_balance numeric(14,2),
  target_amount numeric(14,2),
  status text not null default 'intake',
  retention_start_date date,
  retention_end_date date,
  legal_hold boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists mix_local_documents (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid,
  deal_id uuid references mix_local_deals(id),
  borrower_id uuid references mix_local_borrowers(id),
  document_type text,
  original_filename text not null,
  storage_bucket text not null,
  storage_key text not null,
  mime_type text,
  sha256_hash text,
  page_count integer,
  status text not null default 'uploaded',
  uploaded_by uuid,
  uploaded_at timestamptz not null default now()
);

create table if not exists mix_local_document_jobs (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid references mix_local_documents(id),
  job_type text not null,
  status text not null default 'queued',
  started_at timestamptz,
  completed_at timestamptz,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists mix_local_document_extractions (
  id uuid primary key default uuid_generate_v4(),
  document_id uuid references mix_local_documents(id),
  extraction_schema text not null,
  model_name text,
  parser_name text,
  raw_text_ref text,
  extracted_json jsonb not null,
  confidence numeric(5,4),
  broker_review_required boolean not null default true,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists mix_local_bank_transactions (
  id uuid primary key default uuid_generate_v4(),
  extraction_id uuid references mix_local_document_extractions(id),
  transaction_date date,
  description text,
  amount numeric(14,2),
  direction text check (direction in ('credit','debit')),
  category text,
  confidence numeric(5,4),
  created_at timestamptz not null default now()
);

create table if not exists mix_local_risk_flags (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references mix_local_deals(id),
  document_id uuid references mix_local_documents(id),
  flag_type text not null,
  severity text not null check (severity in ('info','low','medium','high','critical')),
  title text not null,
  detail text,
  status text not null default 'open',
  resolved_by uuid,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists mix_local_aml_records (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references mix_local_deals(id),
  borrower_id uuid references mix_local_borrowers(id),
  occupation text,
  source_of_funds text,
  third_party_involved boolean,
  pep_answer text,
  risk_rating text,
  broker_notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists mix_local_broker_reports (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references mix_local_deals(id),
  report_type text not null,
  report_json jsonb not null,
  storage_bucket text,
  storage_key text,
  status text not null default 'draft',
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists mix_local_audit_log (
  id uuid primary key default uuid_generate_v4(),
  tenant_id uuid,
  actor_user_id uuid,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_mix_local_deals_borrower on mix_local_deals(borrower_id);
create index if not exists idx_mix_local_documents_deal on mix_local_documents(deal_id);
create index if not exists idx_mix_local_document_jobs_status on mix_local_document_jobs(status);
create index if not exists idx_mix_local_transactions_extraction on mix_local_bank_transactions(extraction_id);
create index if not exists idx_mix_local_risk_flags_deal on mix_local_risk_flags(deal_id);
create index if not exists idx_mix_local_audit_log_entity on mix_local_audit_log(entity_type, entity_id);
