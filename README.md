# MIX — Mortgage Intelligence Exchange

## Relationship Asset Management & Opportunity Intelligence for Mortgage Professionals

MIX is a standalone Relationship Asset Management (RAM) and Opportunity Intelligence (OI) platform built for mortgage brokers who have 18+ years of relationship capital sitting dormant inside their heads, their inboxes, and their CRM fields — and want to convert it into a living, compounding intelligence engine.

The objective is not another contact-centric CRM. MIX exists to help mortgage professionals collect the right relationship data, systematize operating context, identify automatable workflows, and convert existing business activity into repeatable human-and-agent execution systems — so that the next $5M in funded volume comes from intelligence, not manual follow-up.

MIX is designed so that critical knowledge, decisions, and workflows do not remain trapped inside one broker. The platform captures how deals move, why lenders say yes, who the real referral sources are, and when the renewal window is closing. This reduces owner dependency and allows practice intelligence to compound over time.

MIX helps mortgage professionals answer:

- Who in my database has a mortgage maturing in the next 90 days?
- Which referral partners are warm, dormant, or at risk?
- Which contacts fit the strata or estate financing niche?
- What rate changes just created an opportunity in my existing book?
- Which introductions should happen next?
- Which workflows can be systematized or handed to an agent?
- What does the practice look like as a transferable asset?
- Where am I still the bottleneck?

---

## Core Mission

MIX converts mortgage relationships, opportunities, underwriting knowledge, and market signals into reusable practice assets.

It captures business activity, structures operational knowledge, measures outcomes, and enables the broker and AI agents to work together toward defined revenue objectives. Every conversation, rate sheet, renewal window, referral introduction, and lender update should improve the system's ability to find and close the next deal.

The mission of MIX is to:

1. Surface renewal, refinance, and new-opportunity windows before the client knows they exist
2. Convert unstructured mortgage conversations and notes into confirmed, reusable context
3. Score and rank every relationship by revenue, recency, referral quality, and strategic fit
4. Map the practice's referral network as a relationship graph with measurable edge strength
5. Identify recurring mortgage workflows and define them as executable, agent-ready specifications
6. Enable AI agents and the broker to execute from the same trusted underwriting and market context
7. Measure which relationships, verticals, and workflows drive funded volume
8. Reduce owner dependency without removing the broker from regulated decisions
9. Continuously improve accuracy through evidence, lender feedback, and outcome capture

A useful product test for every MIX capability is:

> Does this help find the next deal, close the next deal, or deepen a relationship that will produce the next deal?

---

## Stack

**Next.js 15** · React 19 · TypeScript · Supabase (PostgreSQL + RLS) · Claude Sonnet 4.6 · OpenAI (Whisper) · Resend · Unipile · React Flow · @dnd-kit · Tailwind CSS v4 · Vitest · Docker

**Supabase project:** `RIOS-Financial` (shared with RIOS-CRM, MIX tables use `mix_` prefix)

---

## Interpretable Context Methodology

MIX uses **Interpretable Context Methodology (ICM)** as the technical instruction architecture for all LLM and agent execution.

ICM means that mortgage business logic must not exist only inside opaque prompts, model memory, source-code conditionals, or undocumented broker knowledge. The context governing an AI action must be readable by humans, addressable by software, versionable, testable, and traceable to the resulting execution.

The vertical packs, underwriting rules, lender criteria, and renewal scoring logic are part of the software. They are not supplementary documentation.

### Core Requirement

Every material LLM or agent action must be explainable through an inspectable execution contract containing:

1. **Objective** — the mortgage business outcome the action is intended to produce
2. **Role** — the responsibility and operating perspective assigned to the model or agent
3. **Scope** — the records, tools, workflows, and lender systems the agent may access
4. **Trusted context** — the approved workspace, ICP, GTM, market, and vertical information available to the action
5. **Inputs** — the source records and event that triggered execution
6. **Decision rules** — explicit criteria, thresholds, classifications, exclusions, and lending rule precedence
7. **Procedure** — the numbered workflow steps the executor must follow
8. **Output contract** — the required schema, format, evidence, confidence, and destination
9. **Human controls** — approval gates, escalation conditions, permissions, and prohibited autonomous actions
10. **Success measures** — the operational and business metrics used to evaluate the result
11. **Write-back rules** — what may be saved as a record, signal, task, relationship, opportunity, context update, or learning candidate
12. **Traceability** — the context versions, source records, model, workflow, decisions, and reviewer actions associated with the execution

An instruction is not considered production-ready when any of these elements are materially undefined.

### Instruction Precedence

When assembling context for an LLM or agent run, apply instructions in this order:

```text
1. Platform safety, security, privacy, and tenant-isolation rules
2. MIX operating principles and system-level policies
3. Workspace-approved context documents (BUSINESS / ICP / GTM / MARKET)
4. Active vertical-pack instructions and BC lending decision criteria
5. Workflow-specific execution contract
6. Record-level facts and retrieved evidence
7. Current user request or triggering event
```

A lower-precedence instruction must not silently override a higher-precedence instruction. Conflicts must be rejected, resolved by an explicit rule, or escalated for human review.

### Canonical Context Layers

MIX context is assembled from modular layers rather than one large prompt:

```text
context/
  mortgage/
    SIP.json                      # Subscriber Intelligence Profile — mortgage vertical
  insurance/
    SIP.json                      # Insurance vertical SIP

vertical-packs/
  rios_general/
    onboarding_interview.md       # Interview block structure
  strata-financing/
    manifest.yaml
    qualification-rules.yaml
    signal-types.yaml
  estate-elder-law/
    manifest.yaml
    qualification-rules.yaml
  portfolio-investor/
    manifest.yaml
  construction-capital/
    manifest.yaml

workspace-context/
  BUSINESS.md                     # Generated by GTM onboarding
  ICP.md
  GTM.md
  MARKET.md
```

### Canonical Workflow Specification

Every agent-executable workflow uses a consistent numbered specification:

```markdown
# Workflow 002 — Renewal Intelligence Agent

## Objective
Surface all contacts with mortgages maturing in the next 90/180/365 days,
rank by revenue potential, and draft outreach for the top 5.

## Trigger
Hermes cron: daily at 6 AM PT

## Required Context
Workspace BUSINESS.md, ICP.md, mix_opportunities renewal_date, contacts.last_contacted_at

## Preconditions
- workspace onboarding_status = 'complete'
- opportunity.renewal_date IS NOT NULL
- opportunity.status != 'funded' AND status != 'declined'

## Procedure
1. Query mix_opportunities WHERE renewal_date BETWEEN now() AND now() + 180 days
2. Load workspace GTM context for outreach tone
3. Rank by days_remaining ASC, estimated_value DESC
4. Draft renewal outreach messages for top 5 (CASL-compliant, compliance_mode=moderate)
5. Write draft messages to mix_outreach_drafts (status='draft')
6. Write agent_run record to mix_agent_runs
7. Surface deadline alerts to dashboard

## Decision Rules
- renewal_date < 14 days: urgency=HIGH (red)
- renewal_date 14-30 days: urgency=MED (amber)
- renewal_date 31-90 days: urgency=NORMAL (muted)
- Do not auto-send — human approval required for all outreach

## Output Contract
{ opportunities: [...], drafts: [...], agent_run_id: uuid }

## Human Approval
All outreach messages require broker review before sending.

## Success Metrics
- 100% of renewals within 90-day window surfaced
- 30% conversion to active pipeline
```

---

## Strategic Product Direction

MIX is the mortgage-vertical implementation of the broader RIOS RAM/OI architecture.

The current implementation targets four vertical packs:

1. **Strata Financial Resolution** — highest-ROI for referral-driven revenue
2. **Estate & Elder Law Financing** — executor relationships, reverse mortgage, estate settlement
3. **Portfolio Investor Lending** — multi-property, DSCR, portfolio refinance
4. **Construction & Development Capital** — progress draws, builder relationships, municipal intelligence

Priority order for initial build: Strata → Estate (shortest route to referral-driven revenue, least lender network expansion required).

The practice asset model maps:

```text
Relationship Capital = Σ(trust_score × revenue_attributed) for all contacts
Opportunity Capital  = Σ(estimated_value) for active pipeline
Knowledge Capital    = count(published underwriting playbooks) × avg_value_per_playbook
Practice Asset Score = weighted sum of above
Owner Dependency Score = 100 - Succession Readiness Score
```

---

## Current Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| v5.html — dark glass dashboard mockup (6 tabs) | ✅ Built | `dashboard/v5.html` — static, all data hardcoded |
| Architecture docs + agent specs | ✅ Written | `docs/`, `agents/` — markdown only |
| Supabase schema DDL | ✅ Deployed | `supabase/migrations/mix_001_core.sql` applied |
| Context SIP files (mortgage, insurance) | ✅ Written | `context/mortgage/SIP.json` |
| Next.js 15 app — 6-tab shell | ✅ Live | Running at port 3001, Docker container `mix-app` |
| Dashboard tab — live KPIs from Supabase | ✅ Live | Pipeline value, active deals, MIX score, funnel, activity feed |
| Pipeline tab — kanban board + table toggle | ✅ Live | Stage move (HITL override), expand card, PATCH endpoint |
| Subscribers tab — modal detail + edit form | ✅ Live | Click row → popup, edit → PATCH, new contact slide-in |
| Agents tab — agent fleet grid | ✅ Live | Live telemetry from `mix_agent_runs` |
| Relationships tab — expandable tree | ✅ Live | Org → contact → linked deals + colleagues tree |
| Docs tab | ✅ Live | Knowledge assets scaffold |
| Mock data seed — contacts (16) + pipeline (12) | ✅ Seeded | Covers platinum/gold/silver tiers, all 7 pipeline stages |
| Email import pipeline | 📋 Planned | Issue #2 |
| ClearClose BC lending rules | 📋 Planned | Issue #3 |
| Qdrant embedding pipeline | 📋 Planned | Issue #3.5 |
| Renewal Intelligence dashboard card | 📋 Planned | Issue #4 |
| Lead Discovery Agent (Agent 1) | 📋 Planned | Issue #5 |
| Relationship Asset Registry scoring | 📋 Planned | Issue #6 |
| WhyNow Engine (Agent 3) | 📋 Planned | Issue #7 |
| VoiceClaw Lite (audio → entities) | 📋 Planned | Issue #9 |
| GitHub Wiki Publisher (Agent 4) | 📋 Planned | Issue #10 |
| Practice Asset Statement dashboard card | 📋 Planned | Issue #11 |
| Lender Intelligence Hub | 📋 Planned | Issue #12 |

---

## MIX Dashboard — 6-Tab Shell

The MIX dashboard (`/`) is a GTM Revenue Operations platform for the broker in a dark glassmorphism 6-tab shell. Running live at `http://localhost:3001` (Docker container `mix-app`).

```
╔══════════════════════════════════════════════════════════════════════════════╗
║  M MIX   Dashboard  Pipeline  Subscribers  Agents  Relationships  Docs      ║
║                                                              [+ Opportunity] ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

### Tab 1 — Dashboard

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DASHBOARD                                                                  │
├──────────────────┬──────────────────┬──────────────────┬────────────────────┤
│  Pipeline Value  │  Active Deals    │  Avg MIX Score   │  Revenue MTD       │
│  $14.2M          │  12              │  74              │  $48,500           │
│  ▁▃▅▇▆▇▆█ ↑12%  │  ▂▄▅▄▆▅▇█        │  ████░░░░  74/100│                    │
├──────────────────┴──────────────────┴──────────────────┴────────────────────┤
│  PIPELINE FUNNEL                                                             │
│                                                                              │
│  lead ████████████████ 3    qualify ███████████ 2    underwrite ████████ 2  │
│  score ████ 1          match ████ 1              deliver ████ 1  fund ██ 2  │
│                                                                              │
│  Conversion: lead → fund  16.7%                                              │
├──────────────────────────────────┬──────────────────────────────────────────┤
│  UPCOMING DEADLINES              │  RECENT ACTIVITY                         │
│                                  │                                           │
│  🔴  Chen Strata Refi    3 days  │  Lead Discovery Agent                    │
│  🟡  Patel Refinance    18 days  │  Found 3 new signals · 2 min ago         │
│  🟢  Walsh Portfolio    45 days  │                                           │
│                                  │  Renewal Intelligence Agent              │
│                                  │  2 upcoming renewals · 14 min ago        │
├──────────────────────────────────┴──────────────────────────────────────────┤
│  AGENT FLEET                                                                 │
│                                                                              │
│  [🟢 Lead Discovery]  [🟡 Renewal Intel]  [⚪ WhyNow Engine]               │
│  Running · 3 signals  Reviewing · 2 opps  Idle                              │
│                                                                              │
│  [⚪ Scoring Agent]   [⚪ Wiki Publisher]  [⚪ VoiceClaw]                   │
│  Idle                 Idle                Idle                               │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

### Tab 2 — Pipeline (Kanban + Table toggle)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  PIPELINE                                          [⊞ Board]  [☰ Table]    │
├──────────┬──────────┬──────────┬──────────┬──────────┬──────────┬──────────┤
│  LEAD    │ QUALIFY  │UNDERWRITE│  SCORE   │  MATCH   │ DELIVER  │  FUND    │
│  3 deals │ 2 deals  │ 2 deals  │ 1 deal   │ 1 deal   │ 1 deal   │ 2 deals  │
│  $2.5M   │ $3.1M    │ $2.8M    │ $1.2M    │ $0.8M    │ $1.4M    │ $2.4M    │
├──────────┼──────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐ │ ┌──────┐│
│ │ Chen │ │ │Patel │ │ │Walsh │ │ │Torres│ │ │Reed  │ │ │Okafor│ │ │Chen  ││
│ │Strata│ │ │Refi  │ │ │Port. │ │ │Comm. │ │ │HELOC │ │ │Estate│ │ │Refi  ││
│ │ $1.2M│ │ │$850K │ │ │$2.2M │ │ │$1.2M │ │ │$800K │ │ │$1.4M │ │ │$950K ││
│ │  87  │ │ │  72  │ │ │  91  │ │ │  58  │ │ │  65  │ │ │  78  │ │ │  83  ││
│ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘ │ └──────┘│
│          │          │          │          │          │          │          │
│          │          │          │          │          │          │ ┌──────┐ │
│          │          │          │          │          │          │ │Torres││
│          │          │          │          │          │          │ │Rev.  ││
│          │          │          │          │          │          │ │$1.5M ││
│          │          │          │          │          │          │ └──────┘│
└──────────┴──────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

  Expanded card (click to open):
  ┌──────────────────────────────────────────────────┐
  │  Chen Strata Refinance          [● lead]         │
  │  Sarah Chen · Strata            MIX Score: 87    │
  │  ─────────────────────────────────────────────── │
  │  Type: Strata    Renewal: Aug 15 2026            │
  │  Est. Value: $1,200,000    Commission: $6,000    │
  │  Next Step: Send pre-approval docs               │
  │  ─────────────────────────────────────────────── │
  │  [lead] [qualify] [underwrite] [score] [match]   │
  │                                   [deliver][fund] │
  └──────────────────────────────────────────────────┘
  Click any stage pill → PATCH stage (Human-in-the-Loop override)
```

---

### Tab 3 — Subscribers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  SUBSCRIBER CONTACTS                [Search...]  [+ New Contact] [↑ CSV]   │
│  16 contacts · 4 tiers                                                      │
├────┬──────────────────┬──────────────────┬──────────┬───────────┬───────────┤
│    │ NAME             │ ORGANIZATION     │ TYPE     │ HEALTH    │ TIER      │
├────┼──────────────────┼──────────────────┼──────────┼───────────┼───────────┤
│ RP │ Raj Patel        │ Alpha Properties │ Client   │ ● Strong  │ ◆ Plat.  │
│ SC │ Sarah Chen       │ Chen Strata Ref. │ Referral │ ● Strong  │ ◆ Plat.  │
│ MJ │ Michael Jordan   │ Jordan Inv. Grp  │ Client   │ ● Healthy │ ◆ Plat.  │
│ AL │ Amanda Liu       │ Liu Legal        │ Partner  │ ● Healthy │ ★ Gold   │
│ TC │ Tom Chen         │ Pacific Devs     │ Client   │ ⚠ At-Risk │ ★ Gold   │
│ AW │ Amanda Walsh     │ RIOS Ventures    │ Partner  │ ⚠ At-Risk │ ◇ Silver │
│ NT │ Natalie Torres   │ Star City Props  │ Partner  │ ● Healthy │ ◇ Silver │
│ .. │ ...              │ ...              │ ...      │ ...       │ ...      │
└────┴──────────────────┴──────────────────┴──────────┴───────────┴───────────┘

  Click row → Contact Modal:
  ┌────────────────────────────────────┐
  │  RP  Raj Patel          [✏️ Edit] ✕│
  │      Property Developer            │
  │      Alpha Properties Inc          │
  │  ──────────────────────────────── │
  │  EMAIL       raj.patel@...com      │
  │  ROLE        Property Developer    │
  │  ORG         Alpha Properties Inc  │
  │  TYPE        ● Client              │
  │  HEALTH      ● Strong              │
  │  TIER        ◆ Platinum            │
  │  LAST CONTACT  Never               │
  │  ADDED         Jun 15, 2026        │
  └────────────────────────────────────┘
  Click ✏️ Edit → editable form → PATCH /api/mix/subscribers → optimistic update
```

---

### Tab 4 — Agents

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENT FLEET — 6 agents                                                     │
├────────────────────────────┬────────────────────────────┬───────────────────┤
│  Lead Discovery Agent      │  Renewal Intelligence      │  WhyNow Engine    │
│  [● Running]               │  [○ Reviewing]             │  [○ Idle]         │
│  Signals: 3                │  Renewals: 2               │  Signals: 0       │
│  Last run: 2 min ago       │  Last run: 14 min ago      │  Last run: —      │
├────────────────────────────┼────────────────────────────┼───────────────────┤
│  Scoring Agent             │  Wiki Publisher            │  VoiceClaw Lite   │
│  [○ Idle]                  │  [○ Idle]                  │  [○ Idle]         │
│  Last run: —               │  Assets: 0                 │  Transcripts: 0   │
└────────────────────────────┴────────────────────────────┴───────────────────┘
```

---

### Tab 5 — Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  RELATIONSHIPS                                                               │
│                                                                              │
│  PLATINUM · 3 contacts                                                      │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────────────┐│
│  │ RP  Raj Patel        │  │ SC  Sarah Chen       │  │ MJ  Michael Jordan ││
│  │     Property Dev.    │  │     Managing Partner  │  │     Investor       ││
│  │ ■ Alpha Properties   │  │ ■ Chen Strata Ref.   │  │ ■ Jordan Inv. Grp  ││
│  │ ◆ platinum  ▼        │  │ ◆ platinum  ▼        │  │ ◆ platinum  ▼      ││
│  └──────────────────────┘  └──────────────────────┘  └────────────────────┘│
│                                                                              │
│  Expanded card → RELATIONSHIP MAP:                                           │
│  ┌───────────────────────────────────────────┐                              │
│  │  ┌──────────────────────┐                 │                              │
│  │  │ 🏢 Chen Strata Ref.  │  (org)          │                              │
│  │  └──────────────────────┘                 │                              │
│  │       │                                   │                              │
│  │  ┌────┴─────────────────────────┐         │                              │
│  │  │ 👤 Sarah Chen               │  (self)  │                              │
│  │  │    Managing Partner          │         │                              │
│  │  └─────┬────────────────────────┘         │                              │
│  │        ├── 📋 Chen Strata Refinance  active│                              │
│  │        └── 👥 Tom Chen  (colleague)        │                              │
│  └───────────────────────────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Tab 6 — Docs

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE ASSETS                                                           │
│                                                                              │
│  [draft]     Strata Financing Playbook          Updated Jun 15 2026         │
│  [reviewed]  BC Renewal Qualification Rules     Updated Jun 14 2026         │
│  [published] Lender BDM Contact Guide  → wiki   Published Jun 13 2026       │
│                                                                              │
│  Status: draft → reviewed → published (→ GitHub Wiki via Wiki Publisher)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Workforce

MIX deploys 11 agents in priority order:

| # | Agent | Trigger | Model | Priority |
|---|-------|---------|-------|----------|
| 1 | Lead Discovery Agent | Cron: every 4h | DeepSeek | P0 — Week 1-2 |
| 2 | Renewal Intelligence Agent | Cron: daily 6AM | DeepSeek | P0 — Week 2-3 |
| 3 | WhyNow Engine™ | Cron: every 30min + webhooks | DeepSeek | P1 — Week 3-4 |
| 4 | Wiki Publisher Agent | On-demand / weekly | Any | P1 — Week 4-5 |
| 5 | Voice Intake Agent (VoiceClaw Lite) | On-demand (audio upload) | Whisper + DeepSeek | P1 — Week 5-6 |
| 6 | Relationship Scoring Agent | Cron: daily | DeepSeek | P2 |
| 7 | Database Enrichment Agent | Cron: weekly | DeepSeek | P2 |
| 8 | Database Reactivation Agent™ | Cron: weekly | Claude | P2 |
| 9 | Qualification Agent | On-demand | Claude | P3 |
| 10 | Matching Agent | On-demand | Claude | P3 |
| 11 | Revenue Agent | On-demand | Claude | P3 |

**Agent communication architecture:** All agents communicate through the Supabase database, not directly. No message queue, no event bus for MVP. The database is the message broker. Agent A writes → Agent B reads.

Agent specification documents: `agents/` folder.

---

## Database Schema

**Supabase project:** RIOS-Financial (`amgknqnhiscryvcfeoyj`)
**Strategy:** MIX tables use `mix_` prefix to avoid conflicts with RIOS-CRM tables.

### Tables owned by MIX

| Table | Purpose |
|-------|---------|
| `mix_leads` | Raw incoming lead records (scraped, imported, manual) |
| `mix_opportunities` | Active pipeline — stages, scores, renewal dates, values |
| `mix_agent_runs` | Agent execution log — status, signals, opportunities created |
| `mix_lenders` | Lender registry — BDM contacts, type, notes |
| `mix_lender_programs` | Rate sheets — product, rate, term, LTV, credit min |
| `mix_knowledge_assets` | Underwriting playbooks, decisions, lessons — draft / reviewed / published |
| `mix_conversations` | Call notes, meeting summaries, voice transcripts |
| `mix_relationship_scores` | Trust / referral / influence scores per contact |

### Tables shared with RIOS-CRM

| Table | Used for |
|-------|---------|
| `contacts` | Relationship network — past clients, realtors, lawyers, accountants |
| `organizations` | Lender firms, law firms, real estate agencies |
| `relationships` | Graph edges (refers, knows, works_at) |
| `touchpoints` | Interaction log per contact |
| `workspace_context_docs` | BUSINESS / ICP / GTM / MARKET context loaded into agent runs |

### Key indexes

```sql
-- Renewal intelligence (most queried)
CREATE INDEX idx_mix_opps_renewal ON mix_opportunities(renewal_date)
  WHERE renewal_date IS NOT NULL AND status NOT IN ('funded', 'declined');

-- Pipeline funnel
CREATE INDEX idx_mix_opps_stage ON mix_opportunities(stage);
CREATE INDEX idx_mix_opps_status ON mix_opportunities(status);

-- Agent audit
CREATE INDEX idx_mix_agent_runs_agent ON mix_agent_runs(agent_name);
CREATE INDEX idx_mix_agent_runs_created ON mix_agent_runs(started_at DESC);

-- Relationship scoring
CREATE INDEX idx_mix_scores_health ON mix_relationship_scores(relationship_health);
```

Full DDL: `supabase/schema.sql`
MIX migration: `supabase/migrations/mix_001_core.sql`

---

## Qdrant Semantic Layer

Qdrant runs in Docker (port 6333). It is the semantic discovery layer — rebuildable from Supabase at any time. Supabase is the system of record.

| Collection | Purpose | Dimension |
|------------|---------|-----------|
| `contacts` | Semantic contact search | 1536 (OpenAI text-embedding-3-small) |
| `mix_opportunities` | Similar opportunity matching | 1536 |
| `mix_knowledge_assets` | Playbook / underwriting retrieval | 1536 |
| `mix_conversations` | Conversation memory | 1536 |
| `mix_lender_programs` | Lender / product matching | 1536 |

Embedding pipeline: `pipelines/qdrant_sync.py` (planned — Issue #3.5)

---

## Project Structure

```text
mix-mortgage-intelligence-exchange/
├── app/                          # Next.js 15 app (in progress)
│   ├── globals.css               # Dark glass design system (ported from dashboard/v5.html)
│   ├── layout.tsx
│   ├── page.tsx                  # Root → redirect to /dashboard
│   ├── (mix)/
│   │   ├── layout.tsx            # MixNav top bar
│   │   ├── dashboard/page.tsx    # Bento grid KPIs
│   │   ├── pipeline/page.tsx     # Opportunity table / kanban
│   │   ├── subscribers/page.tsx  # Contact list
│   │   ├── agents/page.tsx       # Agent fleet grid
│   │   ├── relationships/page.tsx# React Flow graph
│   │   └── docs/page.tsx         # Knowledge asset list
│   └── api/
│       └── mix/
│           ├── dashboard/route.ts  # KPIs, funnel, activity
│           ├── pipeline/route.ts   # Opportunities CRUD
│           ├── subscribers/route.ts# Contacts query
│           └── agents/route.ts     # Agent run log
├── components/
│   ├── MixNav.tsx
│   └── mix/
│       ├── DashboardTab.tsx
│       ├── PipelineTab.tsx
│       ├── SubscribersTab.tsx
│       ├── AgentsTab.tsx
│       ├── RelationshipsTab.tsx
│       └── DocsTab.tsx
├── lib/
│   └── supabase.ts               # Supabase client (server + browser)
├── agents/                       # Agent specification docs (markdown)
│   ├── lead-discovery-agent.md
│   ├── whynow-engine.md
│   ├── matching-agent.md
│   ├── scoring-agent.md
│   ├── database-reactivation-agent.md
│   ├── database-enrichment-agent.md
│   ├── referral-intelligence-agent.md
│   ├── cross-sell-agent.md
│   ├── qualification-agent.md
│   ├── underwriting-agent.md
│   └── revenue-agent.md
├── context/
│   ├── mortgage/SIP.json         # Mortgage vertical Subscriber Intelligence Profile
│   └── insurance/SIP.json
├── dashboard/
│   ├── v5.html                   # Latest static mockup (design reference)
│   ├── v4-glass.html
│   ├── v3-light.html
│   └── v2.html
├── design-system/
│   └── DESIGN.md
├── docs/
│   ├── RIOS-ARCHITECTURE.md
│   ├── MIX-IMPLEMENTATION-PLAN.md
│   ├── INTERPRETABLE-CONTEXT-GRAPH.md
│   └── SUBSCRIBER-ONBOARDING-OPPORTUNITY-INTELLIGENCE.md
├── supabase/
│   ├── schema.sql                # Full MIX DDL
│   └── migrations/
│       └── mix_001_core.sql      # Additive MIX tables (mix_ prefix, no RIOS conflicts)
├── pipelines/                    # Python data pipelines (planned)
│   ├── email_import.py           # Gmail → conversations
│   ├── qdrant_setup.py           # Create Qdrant collections
│   └── qdrant_sync.py            # Supabase → Qdrant embeddings
└── docker-compose.yml            # Next.js + Qdrant + Supabase local stack
```

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Anon key for browser client (RLS-enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Service role key for server API routes |
| `ANTHROPIC_API_KEY` | Yes | Claude — onboarding interview, context generation, entity extraction |
| `OPENAI_API_KEY` | Optional | Whisper (audio transcription) + OpenAI embeddings |
| `RESEND_API_KEY` | Optional | Outreach email via Resend |
| `UNIPILE_API_KEY` | Optional | LinkedIn + WhatsApp outreach via Unipile |
| `UNIPILE_DSN` | Optional | Unipile host:port (e.g. `api4.unipile.com:13444`) |
| `BRAVE_API_KEY` | Optional | WhyNow Engine web search + market news |
| `NEXT_PUBLIC_DEV_BYPASS` | Dev only | `true` enables `/api/dev-login` — never in production |

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with Supabase credentials

# 3. Deploy MIX schema to Supabase
# Run supabase/migrations/mix_001_core.sql in Supabase SQL Editor

# 4. Start dev server (port 3001 — avoids conflict with RIOS-CRM on 3000)
npm run dev

# 5. Open
open http://localhost:3001
```

---

## 90-Day Build Backlog

```text
Priority 0 (Days 1-14): Data Foundation
├── Issue #1  — Deploy Supabase schema + seed contacts
├── Issue #2  — Email import pipeline (Gmail → conversations)
├── Issue #3  — ClearClose BC lending rules (knowledge assets)
└── Issue #3.5— Qdrant collections + embedding sync pipeline

Priority 1 (Days 15-45): Intelligence Layer
├── Issue #4  — Renewal Intelligence dashboard card
├── Issue #5  — Lead Discovery Agent (web scraping)
├── Issue #6  — Relationship scoring engine
├── Issue #7  — WhyNow Engine (market triggers)
└── Issue #8  — Dashboard → live Supabase data

Priority 2 (Days 46-90): Activation & Publishing
├── Issue #9  — VoiceClaw Lite (audio → entities)
├── Issue #10 — Wiki Publisher Agent
├── Issue #11 — Practice Asset Statement
└── Issue #12 — Lender Intelligence Hub
```

**Success criteria for 90 days:** 5 agents running, data flowing, ≥15 new opportunities generated, renewal pipeline active, GitHub Wiki published with ≥20 knowledge assets.

---

## Human Governance

Human review is required when MIX or its agents:

- Create, merge, or materially change a canonical relationship or organization record
- Send external communication (email, LinkedIn, WhatsApp) unless the workflow explicitly authorizes autonomous sending
- Commit to a lender submission, change legal or financial status, or represent professional advice
- Use low-confidence, contradictory, stale, or incomplete evidence
- Encounter an instruction conflict or missing lending rule
- Exceed configured cost, risk, or impact thresholds
- Modify an approved context document, vertical criterion, or workflow specification

Review actions must be recorded as approve, reject, edit, defer, or escalate, with reviewer identity and timestamp.

**CASL compliance:** MIX never auto-sends outreach without explicit broker approval. All draft messages require human review. Compliance mode defaults to `moderate` (see `context/mortgage/SIP.json`).

---

## GitHub Wiki

MIX publishes approved knowledge assets to the GitHub Wiki at:
`https://github.com/Ksdeng1559/mix-mortgage-intelligence-exchange/wiki/`

Wiki structure:
```
wiki/
├── PLAYBOOKS/         # renewal-workflow, referral-request, lender-negotiation, underwriting-bc
├── RELATIONSHIPS/     # referral-partners, lender-contacts, professional-network
├── KNOWLEDGE/         # market-insights, product-notes, compliance-updates
├── DECISIONS/         # 2026-Q2/ → dated decision records
├── ASSETS/            # practice-asset-statement, revenue-attribution, succession-readiness
└── VERTICAL-PACKS/    # strata-financing, estate-elder-law, portfolio-investor, construction-capital
```

Publishing pipeline: `knowledge_assets` WHERE `status='reviewed'` → Wiki Publisher Agent → GitHub API → `status='published'` + `wiki_url`.

---

## Product Principle

MIX should not automate a poorly defined mortgage workflow. It should first capture the context, objective, data, lending rules, lender criteria, relationship evidence, and compliance constraints required for reliable execution.

In practical terms, building MIX is the same discipline as giving excellent context to Claude — systematized, governed, reusable, and measurable across the practice.

> Every agent action in MIX must be driven by visible, modular, versioned instructions and produce an auditable mortgage business result.

---

## License & Copyright

© 2026 **KlickSmartAI** — All rights reserved.

- [klicksmartai.com](https://www.klicksmartai.com)
- [klick2client.com](https://www.klick2client.com)

MIX — Mortgage Intelligence Exchange™ is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
