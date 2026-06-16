# Contributing to Mortgage Intelligence Exchange™ (MIX)

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` — minimum required:
- `NEXT_PUBLIC_SUPABASE_URL` — from Supabase dashboard
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Settings → API → anon public
- `SUPABASE_SERVICE_ROLE_KEY` — Settings → API → service_role (keep secret)
- `ANTHROPIC_API_KEY` — required for agent runs

### 3. Deploy Supabase schema

**Project:** RIOS-Financial (`amgknqnhiscryvcfeoyj`)
**Strategy:** All MIX tables use `mix_` prefix — safe to run alongside RIOS-CRM.

Open [Supabase SQL Editor](https://supabase.com/dashboard/project/amgknqnhiscryvcfeoyj/sql) and run in this order:

```
-- Step 1: Core MIX schema (contacts, organizations, mix_ tables)
supabase/schema.sql

-- Step 2: GTM tables (campaigns, outreach messages)
supabase/mix_gtm_migration.sql
```

If `contacts` and `organizations` tables already exist from RIOS-CRM, `schema.sql` will skip them (uses `CREATE TABLE IF NOT EXISTS`).

### 4. Start dev server

```bash
npm run dev
# Opens at http://localhost:3001
```

---

## How to Contribute

### Reporting Issues

Open an issue with a clear title and description. For bugs, include reproduction steps and expected vs actual behavior.

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run `npx tsc --noEmit` to check types
5. Submit a clear PR description

### Agent Pack Development

Each agent pack lives in `/agents/` and must include:

- `AGENT.md` — role, objectives, tools, workflows
- `prompts/` — prompt templates
- `tests/` — validation suite

## Code of Conduct

Be respectful and collaborative. This is a professional financial intelligence platform.

## Questions

Open a Discussion or reach out via the repo.
