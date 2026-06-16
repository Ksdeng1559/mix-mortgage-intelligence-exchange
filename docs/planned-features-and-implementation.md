# MIX Planned Features and Implementation Roadmap

This document is intended for Codex, Claude Code, and future implementation agents working on the MIX — Mortgage Intelligence Exchange codebase.

MIX is an active working Next.js / React / TypeScript application designed to deploy on Vercel. The current production priority is to preserve the working app, improve the command-center workflow, and add planned modules incrementally without breaking the existing Supabase-backed functionality.

---

## Current Product Direction

MIX is a Mortgage Intelligence Exchange and Revenue Operating System for mortgage professionals.

The product should help the broker answer:

> What should I do today to create revenue, reduce risk, or deepen a valuable relationship?

Core product pillars:

1. Command Center
2. Mortgage Dashboard
3. Opportunity Radar
4. Pipeline Intelligence
5. Relationship Asset Registry
6. Mortgage Intelligence Hub
7. RIOS Practice Assetization Layer
8. Agent Runtime and System Admin
9. Knowledge Base and Document Intelligence
10. Analytics and Practice Asset Reporting

---

## Current Deployment Principle

The app should remain Vercel-ready at all times.

Do not introduce dependencies, services, or environment variables that cause the build to fail when they are not configured.

Every optional provider must have a graceful fallback state.

Required production baseline:

- Next.js app builds with `next build`
- Existing `/dashboard` route works
- Command Center remains default landing experience
- Supabase-backed API routes continue to work
- Mock or fallback data is acceptable for planned modules
- Missing optional providers should display configuration-needed messages, not crash

---

## Current Core Stack

### Operational App Layer

- Next.js
- React
- TypeScript
- Vercel

### System of Record

- Supabase Postgres
- Supabase Auth, if added later
- Supabase Storage, if document upload is enabled

Supabase should remain the operational source of truth for:

- contacts
- clients
- subscribers
- opportunities
- pipeline stages
- relationship records
- agent runs
- tasks
- approval queue
- inbox metadata
- lender documents
- knowledge base records

### Outbound Email

- Resend

Use Resend for:

- outbound email delivery
- broker-approved outreach
- transactional notifications
- human approval queue dispatch

Do not use Resend as the inbox provider.

### Inbox and Relationship Messaging

- Unipile, planned

Use Unipile for:

- Gmail inbox ingestion
- Outlook inbox ingestion
- LinkedIn messages and profiles
- WhatsApp conversations
- Instagram conversations
- calendar/contact context where supported

Unipile should feed relationship timelines, inbox intelligence, and opportunity detection.

---

## Planned Analytics Layer: DuckDB / MotherDuck

### Status

Planned feature. Not required for initial Vercel deployment.

### Naming

Use `DuckDB` for the local embedded analytics database.
Use `MotherDuck` for the cloud/serverless DuckDB analytics layer.

Do not use the term `DuckDuckDB`.

### Architecture Principle

DuckDB / MotherDuck must not replace Supabase.

Use:

```text
Supabase = operational system of record
DuckDB / MotherDuck = analytics, forecasting, historical reporting, practice asset statements
```

### Recommended Architecture

```text
MIX Dashboard / Next.js
        ↓
Supabase operational data
        ↓ scheduled export / sync / read replica pattern
DuckDB locally or MotherDuck in production
        ↓
Analytics queries, forecasts, reports, asset statements
```

### Why Add DuckDB / MotherDuck

DuckDB is useful for fast analytical queries over historical and aggregated data. It is especially useful once MIX accumulates enough relationship, opportunity, outreach, lender, and agent history.

Use DuckDB / MotherDuck for:

- Practice Asset Statement
- Relationship Capital analytics
- Opportunity Capital analytics
- Knowledge Capital analytics
- Renewal forecasting
- Commission forecasting
- Agent performance reporting
- Lender intelligence trend analysis
- Outreach performance analysis
- Vertical pack performance analysis

### Do Not Use DuckDB / MotherDuck For

Do not use DuckDB / MotherDuck for transactional app writes.

Avoid using it as the source of truth for:

- editing contacts
- changing pipeline status
- creating opportunities
- storing approval decisions
- sending emails
- user sessions
- operational workflows

Those remain Supabase responsibilities.

---

## DuckDB / MotherDuck Implementation Plan

### Phase 1 — Documentation and Environment Planning

Add documentation only.

Suggested environment variables:

```text
MOTHERDUCK_TOKEN=
MOTHERDUCK_DATABASE=
MIX_ANALYTICS_ENABLED=false
```

Acceptance criteria:

- App builds without MotherDuck configured
- Analytics feature flag defaults to disabled
- Documentation explains Supabase vs MotherDuck responsibilities

### Phase 2 — Analytics Service Stub

Create an analytics service module that can be imported safely even when MotherDuck is not configured.

Suggested files:

```text
lib/analytics/index.ts
lib/analytics/types.ts
lib/analytics/motherduck.ts
lib/analytics/fallback.ts
```

Service behavior:

- If `MIX_ANALYTICS_ENABLED !== 'true'`, return disabled/fallback results
- If MotherDuck environment variables are missing, return disabled/fallback results
- Never throw during page render because analytics is unavailable
- Keep Supabase operational APIs unchanged

### Phase 3 — Practice Asset Statement Endpoint

Create an API route, for example:

```text
app/api/mix/analytics/practice-asset/route.ts
```

Initial response may be computed from Supabase directly until MotherDuck is ready.

Return:

- relationship capital
- opportunity capital
- knowledge capital
- workflow capital
- decision capital
- owner dependency score
- succession readiness score
- top relationships
- dormant high-value relationships
- renewal pipeline value
- estimated commission opportunity

### Phase 4 — MotherDuck Connection

Add optional MotherDuck client support only after the app has stable analytics types.

Acceptance criteria:

- Vercel build succeeds without MotherDuck variables
- Local dev succeeds without MotherDuck variables
- Analytics route returns fallback when disabled
- Analytics route returns real data when enabled and configured

### Phase 5 — Scheduled Sync / Export

Plan a background sync pattern from Supabase to DuckDB / MotherDuck.

Options:

1. Vercel Cron
2. Supabase Edge Function
3. GitHub Actions scheduled job
4. Manual admin-triggered sync

Initial exported datasets:

- opportunities
- contacts
- relationship events
- agent runs
- outreach events
- lender updates
- renewal records
- knowledge base documents
- decision records

---

## Analytics Data Models to Support Later

### PracticeAssetStatement

Suggested fields:

```ts
export interface PracticeAssetStatement {
  generatedAt: string
  relationshipCapital: number
  opportunityCapital: number
  knowledgeCapital: number
  workflowCapital: number
  decisionCapital: number
  ownerDependencyScore: number
  successionReadinessScore: number
  estimatedPracticeAssetValue: number
  topRelationships: RelationshipAssetSummary[]
  atRiskRelationships: RelationshipAssetSummary[]
  renewalPipelineValue: number
  estimatedCommissionOpportunity: number
  recommendations: string[]
}
```

### RelationshipCapitalReport

Track:

- revenue by partner category
- trust score trends
- referral velocity
- dormant relationship risk
- last-contact aging
- relationship concentration risk

### OpportunityCapitalReport

Track:

- pipeline value by stage
- probability-weighted value
- renewal windows: 30 / 60 / 90 / 180 days
- deal source attribution
- opportunity category mix
- conversion rates

### KnowledgeCapitalReport

Track:

- lender documents indexed
- rate sheets indexed
- policy changes captured
- decisions recorded
- playbooks published
- knowledge gaps

### AgentPerformanceReport

Track:

- agent runs
- signals detected
- opportunities created
- false positives
- average latency
- review queue volume
- revenue attributed

### OutreachPerformanceReport

Track:

- messages drafted
- messages approved
- messages sent
- replies
- booked calls
- funded deals
- conversion by vertical pack

---

## Planned Tabs From Working Prototype

The uploaded working prototype includes the following target tabs:

1. Dashboard
2. Command Center
3. Operations
4. Pipeline
5. Subscribers
6. Agents
7. Docs
8. System
9. RIOS Legacy
10. Opportunity Radar
11. Mortgage Intelligence Hub
12. Relationship Asset Registry

Current React implementation may expose fewer tabs. Add missing tabs incrementally.

Recommended navigation order:

```text
Command
Dashboard
Opportunities
Pipeline
Relationships
Intel Hub
Operations
Agents
System
Docs
RIOS
Subscribers
```

Command Center should remain the default landing tab.

---

## Priority Implementation Backlog

### Priority 0 — Deployment Safety

- Confirm Vercel build passes
- Confirm `/dashboard` opens Command Center by default
- Add clear fallback states for failed API calls
- Add Vercel deployment documentation
- Confirm required environment variables

### Priority 1 — Full Tab Shell

Add the missing tabs as working placeholders or prototype-backed React components:

- Operations
- System
- RIOS
- Opportunities
- Intel Hub

Do not break existing Command, Dashboard, Pipeline, Subscribers, Agents, Relationships, or Docs tabs.

### Priority 2 — System Tab Provider Updates

The System tab should show the current planned stack:

- Supabase — operational system of record
- Resend — outbound email delivery
- Unipile — inbox, LinkedIn, WhatsApp, Instagram, relationship messaging
- Vercel — deployment
- Exa — entity research
- Tavily — current web intelligence
- Scrapling — website extraction
- TinyFish — monitoring/change detection
- DuckDB / MotherDuck — analytics layer, planned

### Priority 3 — Inbox Intelligence

Use Unipile to ingest and classify:

- lender emails
- client replies
- referral partner conversations
- LinkedIn conversations
- WhatsApp conversations

Classify items as:

- Rate Change
- Policy Change
- Lender Notice
- Client Opportunity
- Referral Opportunity
- Compliance Risk
- Follow-Up Required

### Priority 4 — Human Approval Queue

Every outbound message should require human approval before sending.

Approval queue should support:

- renewal outreach
- lender update notices
- referral partner follow-ups
- reactivation messages
- client condition reminders
- GTM outreach drafts

Resend sends only after approval.

### Priority 5 — Opportunity Radar

Detect opportunities across:

- renewals
- refinance windows
- HELOC candidates
- reverse mortgage candidates
- debt consolidation
- construction financing
- commercial financing
- referral partner triggers
- municipal development signals

Every opportunity should include:

- why now
- estimated value
- confidence
- next best action
- related contact
- related lender or product

### Priority 6 — Relationship Asset Registry

Improve relationship scoring:

- trust score
- referral score
- revenue generated
- asset value
- last contact
- dormancy risk
- next best action
- relationship category

Relationship categories:

- past client
- realtor
- lawyer
- accountant
- financial planner
- builder
- developer
- lender / BDM
- insurance advisor
- professional partner

### Priority 7 — Analytics and Practice Asset Reporting

Add DuckDB / MotherDuck analytics only after the core app is stable.

Initial analytics module:

- Practice Asset Statement

Then add:

- Relationship Capital Report
- Opportunity Capital Report
- Renewal Forecast Report
- Lender Intelligence Trend Report
- Agent Performance Report
- Outreach Performance Report

---

## Codex Guardrails

When implementing features:

1. Preserve existing working functionality.
2. Do not remove Supabase-backed API behavior.
3. Do not make optional providers required at build time.
4. Use feature flags for incomplete integrations.
5. Prefer small, reviewable PRs.
6. Add TypeScript types before complex UI changes.
7. Keep mock data separate from components.
8. Add clear error and empty states.
9. Keep Command Center as the default experience.
10. Do not send outbound communications without human approval.

---

## Suggested Codex Tasks

### Task 1

Create Vercel deployment checklist and confirm required environment variables.

### Task 2

Add missing tab shell components for Operations, System, RIOS, Opportunities, and Intel Hub using mock/fallback data.

### Task 3

Update System tab provider cards to show Resend, Unipile, Supabase, Exa, Tavily, Scrapling, TinyFish, and DuckDB / MotherDuck planned analytics.

### Task 4

Create analytics service stubs for future DuckDB / MotherDuck integration with graceful fallback.

### Task 5

Create Practice Asset Statement API contract and fallback implementation.

---

## Final Product Rule

Every dashboard card, tab, and agent output should answer at least one of these:

1. What should the broker do next?
2. What opportunity exists now?
3. What relationship needs attention?
4. What risk needs review?
5. What knowledge should be captured?
6. What revenue can be created or protected?
