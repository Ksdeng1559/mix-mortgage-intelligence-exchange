# MIX Copilot OS — 180-Day Technical Implementation Plan

## Purpose

Build MIX into a broker-controlled Mortgage Operating System using:

```text
RIOS = Research -> Intelligence -> Opportunity -> Strategy -> Execution
ICM  = Data -> Context -> Signal -> Interpretation -> Score -> Action
MWP  = Numbered filesystem workspaces with markdown context and review gates
```

This document is written so **Claude Code, Codex, or a human developer** can plan and execute the technical implementation inside this repository.

It provides:

- repo-aware build sequence
- target files and folders
- schema/migration plan
- API route plan
- component plan
- implementation prompts for Claude Code/Codex
- test and acceptance criteria
- PR and review-gate workflow
- 180-day phased roadmap

---

## North Star

By Day 180, MIX should be a working mortgage Copilot OS where every meaningful borrower file, renewal, lender review, compliance workflow, or relationship opportunity can be managed as a numbered workspace.

The system should:

1. Create and manage MWP workspaces.
2. Assemble trusted context from markdown, Supabase, documents, conversations, and lender criteria.
3. Run Copilot actions through RIOS + ICM.
4. Produce broker-reviewable recommendations for smart placement, AML readiness, document readiness, lender matching, renewal strategy, and relationship activation.
5. Route regulated and external actions through human review gates.
6. Capture approved learnings into reusable knowledge assets.
7. Track measurable value: funded volume, time saved, missing-document reduction, AML completeness, renewal conversion, and relationship activation.

Core operating principle:

```text
AI prepares. Broker approves. System records. Practice intelligence compounds.
```

---

## Existing Repo Context

Current stack from README:

```text
Next.js 15
React 19
TypeScript
Supabase PostgreSQL + RLS
Claude / OpenAI compatible model layer
Tailwind CSS v4
Vitest
Docker
Qdrant planned
```

Existing relevant folders:

```text
app/
app/(mix)/dashboard
app/(mix)/pipeline
app/(mix)/subscribers
app/(mix)/agents
app/(mix)/relationships
app/(mix)/docs
app/api/mix/
components/mix/
lib/
agents/
context/
docs/
supabase/migrations/
workspaces/
```

Existing product documents:

```text
docs/RIOS-ICM-MWP-OPERATING-SYSTEM.md
docs/MIX-COPILOT-IMPLEMENTATION-BACKLOG.md
docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md
agents/mix-copilot-os.md
agents/smart-placement-compliance-agent.md
workspaces/TEMPLATE/README.md
workspaces/TEMPLATE/01-DATA.md
```

---

## Implementation Strategy for Claude Code / Codex

### Use AI coding tools in small, reviewable units

Do not ask Claude Code or Codex to build the entire OS in one instruction.

Use this pattern:

```text
1. Give the agent one phase or one task.
2. Provide target files.
3. Provide constraints.
4. Ask for tests.
5. Ask for no unrelated refactors.
6. Review the diff.
7. Run tests.
8. Commit.
```

### Recommended branch naming

```text
feature/mwp-workspace-templates
feature/workspace-schema
feature/workspace-api
feature/workspaces-ui
feature/copilot-context-assembler
feature/copilot-run-endpoint
feature/smart-placement-module
feature/aml-intake-module
feature/document-readiness-module
feature/learning-loop
feature/pilot-hardening
```

### Recommended PR format

Each PR should include:

```markdown
## What changed

## Why it matters

## Files changed

## How to test

## Screenshots / demo notes

## Review gates affected

## Risks / follow-up
```

### Guardrails for Claude Code / Codex

Every coding prompt should include:

```text
Do not remove existing behavior.
Do not rename existing routes unless required.
Do not introduce autonomous lender submission.
Do not mark AML complete automatically.
Do not send external communications.
Keep all AI-generated actions draft-only unless a human approval field exists.
Use TypeScript types.
Add tests or test notes.
Keep changes scoped to the requested task.
```

---

## 180-Day Roadmap Summary

| Period | Theme | Main Technical Outcome |
|---|---|---|
| Days 1-30 | OS Foundation | Workspace templates, schema design, governance docs, seed examples |
| Days 31-60 | Workspace Runtime | Supabase workspace tables, API routes, Workspaces UI |
| Days 61-90 | Copilot MVP | Context assembler, Copilot run endpoint, output parser, strategy memo |
| Days 91-120 | Mortgage Intelligence Modules | Smart Placement, AML, Document Readiness, Lender Fit panels |
| Days 121-150 | Automation + Learning Loop | Agent tasks, learning candidates, knowledge asset conversion |
| Days 151-180 | Production Hardening + Pilot | QA, audit trail, analytics, pilot readiness, deployment hardening |

---

# Phase 1 — Days 1-30: OS Foundation

## Goal

Create the repo-level operating system foundation so future AI coding runs have stable instructions, workspace templates, and governance rules.

## Deliverable by Day 30

A developer or AI coding agent can create a complete MWP workspace and understand how RIOS, ICM, review gates, and Copilot outputs should work before touching runtime code.

---

## Epic 1.1 — Complete MWP workspace templates

### Target files

Create or complete:

```text
workspaces/TEMPLATE/README.md
workspaces/TEMPLATE/01-DATA.md
workspaces/TEMPLATE/02-CONTEXT.md
workspaces/TEMPLATE/03-SIGNALS.md
workspaces/TEMPLATE/04-INTERPRETATION.md
workspaces/TEMPLATE/05-SCORES.md
workspaces/TEMPLATE/06-STRATEGY.md
workspaces/TEMPLATE/07-ACTIONS.md
workspaces/TEMPLATE/08-REVIEW-GATES.md
workspaces/TEMPLATE/09-OUTPUTS.md
workspaces/TEMPLATE/10-LEARNINGS.md
```

### Claude Code / Codex prompt

```text
Read docs/RIOS-ICM-MWP-OPERATING-SYSTEM.md and agents/mix-copilot-os.md.
Complete the workspaces/TEMPLATE markdown files for the MWP standard.
Each file should have a clear purpose, fill-in sections, and review-friendly structure.
Do not add application code.
Do not remove existing template files.
Keep the template usable by a broker and by an AI coding agent.
```

### Acceptance criteria

- All 11 workspace files exist.
- Each file maps clearly to RIOS or ICM.
- Review gates are explicit.
- The template can be copied to create a real workspace.

---

## Epic 1.2 — Add example workspaces

### Target folders

```text
workspaces/MWP-2026-001-smart-placement-aml-module/
workspaces/MWP-2026-002-sample-renewal-file/
workspaces/MWP-2026-003-sample-bfs-placement/
```

### Claude Code / Codex prompt

```text
Using workspaces/TEMPLATE as the base, create three example MWP workspaces:
1. Smart Placement + AML module workspace
2. Sample renewal file workspace
3. Sample business-for-self placement workspace
Use realistic but fictional data.
Do not include real borrower personal information.
Show how RIOS and ICM flow through each workspace.
```

### Acceptance criteria

- Example workspaces use fictional data only.
- Each example has visible data, context, signals, scores, strategy, actions, review gates, outputs, and learnings.
- Smart Placement and AML examples align with docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md.

---

## Epic 1.3 — Add governance document

### Target file

```text
docs/MIX-COPILOT-GOVERNANCE.md
```

### Required sections

- AI permission boundaries
- broker approval requirements
- AML restrictions
- lender submission restrictions
- outbound communication rules
- data privacy rules
- audit and traceability rules
- context update rules
- human override rules

### Claude Code / Codex prompt

```text
Create docs/MIX-COPILOT-GOVERNANCE.md.
Use the existing Copilot OS and Smart Placement/AML docs as source context.
Write clear product and engineering rules for what the Copilot may and may not do.
Focus on human approval, auditability, privacy, and regulated mortgage workflow boundaries.
```

### Acceptance criteria

- Governance doc is understandable by product, compliance, and engineering.
- Prohibited actions are explicit.
- Human approval requirements are explicit.

---

## Epic 1.4 — Draft database schema spec

### Target file

```text
docs/MIX-COPILOT-DATABASE-SPEC.md
```

### Include tables

```text
mix_workspaces
mix_workspace_files
mix_review_gates
mix_workspace_actions
mix_learning_candidates
mix_copilot_runs
mix_smart_placement_profiles
mix_aml_intakes
mix_document_reviews
mix_placement_recommendations
```

### Claude Code / Codex prompt

```text
Create docs/MIX-COPILOT-DATABASE-SPEC.md.
Design the Supabase/Postgres tables needed for MWP workspaces, review gates, Copilot runs, learning candidates, Smart Placement, AML intake, document readiness, and placement recommendations.
Use mix_ table prefixes.
Include columns, purpose, relationships, suggested indexes, and RLS notes.
Do not create migrations yet.
```

### Acceptance criteria

- Schema spec is complete enough to implement migrations.
- Tables link to existing MIX opportunities, contacts, organizations, and agent runs where appropriate.
- RLS and audit notes are included.

---

# Phase 2 — Days 31-60: Workspace Runtime

## Goal

Turn MWP from markdown templates into runtime objects in Supabase and the MIX UI.

## Deliverable by Day 60

A broker can create, view, update, and link workspaces to opportunities, with visible review gates and actions.

---

## Epic 2.1 — Workspace migration

### Target file

```text
supabase/migrations/mix_002_workspaces.sql
```

### Required tables

```text
mix_workspaces
mix_workspace_files
mix_review_gates
mix_workspace_actions
mix_learning_candidates
mix_copilot_runs
```

### Claude Code / Codex prompt

```text
Read docs/MIX-COPILOT-DATABASE-SPEC.md and existing supabase/migrations/mix_001_core.sql.
Create supabase/migrations/mix_002_workspaces.sql.
Add tables for workspaces, workspace files, review gates, workspace actions, learning candidates, and Copilot runs.
Use mix_ prefixes, UUID primary keys, timestamptz timestamps, useful indexes, and comments.
Do not modify existing migrations.
Do not break existing schema.
```

### Acceptance criteria

- Migration is additive.
- Uses `mix_` prefix.
- Includes foreign keys where safe.
- Includes indexes for common queries.
- Includes status fields and timestamps.

### Test command

```bash
# run in local Supabase or SQL editor
# verify migration applies without errors
```

---

## Epic 2.2 — Workspace TypeScript types

### Target files

```text
types/mix-workspaces.ts
# or lib/mix/types.ts if repo prefers lib-local types
```

### Claude Code / Codex prompt

```text
Create TypeScript types for MIX workspaces, workspace files, review gates, actions, learning candidates, and Copilot runs.
Base the types on supabase/migrations/mix_002_workspaces.sql.
Keep enums as string union types where practical.
Do not introduce a new runtime dependency.
```

### Acceptance criteria

- Types compile.
- Types are imported by services and components.
- Status fields are constrained with union types.

---

## Epic 2.3 — Workspace service layer

### Target files

```text
lib/mix/workspaces.ts
lib/mix/review-gates.ts
lib/mix/workspace-actions.ts
lib/mix/learning-candidates.ts
```

### Functions

```text
createWorkspace
listWorkspaces
getWorkspace
updateWorkspace
linkWorkspaceToOpportunity
createReviewGate
updateReviewGate
listReviewGates
createWorkspaceAction
updateWorkspaceAction
listWorkspaceActions
createLearningCandidate
listLearningCandidates
```

### Claude Code / Codex prompt

```text
Implement a typed workspace service layer using the existing Supabase client pattern in lib/supabase.ts.
Create functions for workspace CRUD, review gates, actions, and learning candidates.
Do not add UI.
Do not change existing Supabase client behavior.
Return typed results and useful errors.
```

### Acceptance criteria

- Service functions compile.
- No unrelated refactors.
- Errors are handled consistently.
- Services can be used by API routes.

---

## Epic 2.4 — Workspace API routes

### Target files

```text
app/api/mix/workspaces/route.ts
app/api/mix/workspaces/[id]/route.ts
app/api/mix/workspaces/[id]/actions/route.ts
app/api/mix/workspaces/[id]/review-gates/route.ts
app/api/mix/workspaces/[id]/learning-candidates/route.ts
```

### Claude Code / Codex prompt

```text
Create Next.js API routes for MIX workspaces.
Use the workspace service layer.
Support listing, creating, reading, updating, adding actions, updating actions, adding review gates, updating review gates, and listing learning candidates.
Validate request bodies lightly without adding heavy dependencies unless already present.
Do not implement authentication beyond existing project patterns.
Do not execute external actions.
```

### Acceptance criteria

- Routes compile.
- POST creates workspace records.
- GET lists or reads workspaces.
- Review gates can be created and updated.
- Actions can be created and updated.

---

## Epic 2.5 — Workspaces UI

### Target files

```text
app/(mix)/workspaces/page.tsx
app/(mix)/workspaces/[id]/page.tsx
components/mix/WorkspaceList.tsx
components/mix/WorkspaceDetail.tsx
components/mix/RIOSStateBadge.tsx
components/mix/ICMStateBadge.tsx
components/mix/ReviewGatePanel.tsx
components/mix/WorkspaceActionsPanel.tsx
components/mix/LearningCandidatesPanel.tsx
```

### Claude Code / Codex prompt

```text
Add a Workspaces section to the MIX app.
Create a list page and detail page using existing dashboard styling patterns.
Show workspace title, key, type, related opportunity, current RIOS stage, current ICM stage, current review gate, open actions, and status.
Add panels for review gates, actions, and learning candidates.
Do not implement Copilot runs yet.
Keep UI read-friendly and broker-friendly.
```

### Acceptance criteria

- Workspaces page renders.
- Detail page renders.
- Existing dashboard routes still work.
- UI follows existing MIX design style.

---

# Phase 3 — Days 61-90: Copilot MVP

## Goal

Create the first functional Copilot loop: load workspace context, detect gaps, generate structured recommendations, and create draft actions/review gates.

## Deliverable by Day 90

A broker can click “Run Copilot” and receive a structured strategy memo plus draft actions, without any autonomous external action.

---

## Epic 3.1 — Context assembler

### Target file

```text
lib/mix/context-assembler.ts
```

### Context order

```text
1. platform / governance rules
2. MIX operating principles
3. workspace README or DB workspace record
4. workspace data
5. workspace context
6. workspace signals
7. vertical pack
8. lender criteria
9. agent contract
10. source records
11. current user instruction
```

### Claude Code / Codex prompt

```text
Build lib/mix/context-assembler.ts.
It should assemble deterministic context for a Copilot run from workspace records, workspace markdown files when available, relevant docs, agent contracts, and source records.
Return structured sections with title, content, source, and warnings.
Missing files should create warnings, not fabricated content.
Do not call an LLM from this file.
```

### Acceptance criteria

- Returns ordered context sections.
- Captures missing context warnings.
- Does not hallucinate missing files.
- Can be unit-tested without an LLM.

---

## Epic 3.2 — Copilot output schema

### Target file

```text
lib/mix/copilot-schema.ts
```

### Claude Code / Codex prompt

```text
Create a TypeScript schema/type contract for Copilot output based on agents/mix-copilot-os.md.
Include known_facts, missing_context, signals, interpretations, scores, recommended_strategy, fallback_strategy, actions, review_gate_updates, workspace_updates, learning_candidates, confidence_label, and traceability.
Use TypeScript types. Add runtime validation with existing project dependencies only; if no validation library exists, implement a lightweight validator.
```

### Acceptance criteria

- Output type exists.
- Validator catches missing required fields.
- Invalid output can be rejected gracefully.

---

## Epic 3.3 — Copilot run endpoint

### Target file

```text
app/api/mix/copilot/run/route.ts
```

### Claude Code / Codex prompt

```text
Create app/api/mix/copilot/run/route.ts.
The route should accept workspace_id, run_type, mode, and user_instruction.
It should call the context assembler, build a model prompt using agents/mix-copilot-os.md, call the configured LLM provider using existing project patterns, validate the output, store a mix_copilot_runs record, and create draft actions/review-gate updates only.
Do not send emails, submit files, mark AML complete, or approve review gates.
Return the Copilot output plus created draft records.
```

### Acceptance criteria

- Route compiles.
- Missing workspace returns a clear error.
- LLM output is validated.
- Copilot run is recorded.
- Draft actions can be created.
- No external actions occur.

---

## Epic 3.4 — Copilot output parser

### Target file

```text
lib/mix/copilot-output.ts
```

### Claude Code / Codex prompt

```text
Build lib/mix/copilot-output.ts.
It should take validated Copilot output and create draft workspace actions, draft review gate updates, workspace update candidates, and learning candidates.
It must never auto-approve a review gate.
It must preserve traceability back to workspace_id and copilot_run_id.
```

### Acceptance criteria

- Converts recommendations into draft records.
- Review gates remain open unless explicitly updated by human route.
- Learning candidates are draft.
- Traceability is stored.

---

## Epic 3.5 — Copilot UI panel

### Target files

```text
components/mix/CopilotPanel.tsx
components/mix/CopilotRunResult.tsx
```

Add to:

```text
app/(mix)/workspaces/[id]/page.tsx
```

### Claude Code / Codex prompt

```text
Add a Copilot panel to the workspace detail page.
Allow the broker to choose run type: research, intelligence, opportunity, strategy, execution, full_loop.
Allow optional instruction text.
Call /api/mix/copilot/run.
Show summary, missing context, signals, scores, recommended strategy, actions, review gates, and confidence.
Do not add autonomous execution buttons.
```

### Acceptance criteria

- Broker can trigger Copilot run.
- Result is readable.
- Draft actions and review gates are shown.
- Loading and error states exist.

---

# Phase 4 — Days 91-120: Mortgage Intelligence Modules

## Goal

Connect Copilot OS to real mortgage workflows: Smart Placement, AML intake, Document Readiness, and lender recommendations.

## Deliverable by Day 120

A borrower workspace can produce a broker-reviewable placement/compliance/document readiness packet.

---

## Epic 4.1 — Smart Placement schema and service

### Target files

```text
supabase/migrations/mix_003_smart_placement.sql
lib/mix/smart-placement.ts
components/mix/SmartPlacementPanel.tsx
```

### Claude Code / Codex prompt

```text
Implement the Smart Placement module based on docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md.
Create migration, service functions, and a broker-facing panel.
Track borrower profile, property profile, income profile, credit profile, down-payment profile, requested product, recommended channel, fallback channel, placement score, and confidence.
All recommendations must be draft and require broker review before lender action.
```

### Acceptance criteria

- Smart Placement data can be created and updated.
- Panel displays placement state.
- Recommendation has reasons and confidence.
- Broker review gate is required before lender submission.

---

## Epic 4.2 — AML intake schema and panel

### Target files

```text
supabase/migrations/mix_004_aml_intakes.sql
lib/mix/aml-intakes.ts
components/mix/AMLIntakePanel.tsx
```

### Claude Code / Codex prompt

```text
Implement AML intake support based on docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md and agents/smart-placement-compliance-agent.md.
AML intake must require application consent before AML fields are processed.
Track identity, occupation, source of income, source of funds, third-party involvement, PEP/HIO/family/associate answers, international exposure, purpose/use of funds, risk tier, review_required, and reviewer notes.
Do not mark AML complete automatically.
Medium or high risk must create or require a review gate.
```

### Acceptance criteria

- Consent state exists.
- AML questions can be captured.
- Missing AML fields cannot be treated as low risk.
- Risk tier is visible.
- Review gate is required for medium/high risk.

---

## Epic 4.3 — Document readiness schema and panel

### Target files

```text
supabase/migrations/mix_005_document_reviews.sql
lib/mix/document-reviews.ts
components/mix/DocumentReadinessPanel.tsx
```

### Claude Code / Codex prompt

```text
Implement Document Readiness support inspired by the Purelend-style module spec.
Track document type, storage path, extracted facts, completeness status, anomaly flags, income findings, down-payment findings, review status, and reviewer notes.
Do not treat extracted facts as final unless reviewed.
Add a panel showing missing documents, review-required documents, and readiness score.
```

### Acceptance criteria

- Document review records can be created and updated.
- Panel shows missing and review-required documents.
- Anomaly flags are visible.
- Human review is required for extracted facts.

---

## Epic 4.4 — Lender fit recommendations

### Target files

```text
supabase/migrations/mix_006_placement_recommendations.sql
lib/mix/lender-fit.ts
components/mix/LenderFitPanel.tsx
```

### Claude Code / Codex prompt

```text
Implement lender fit recommendation support.
Use existing mix_lenders and mix_lender_programs where available.
Create placement recommendation records with rank, lender_id, program_id, fit_score, confidence, reasons, conditions_to_resolve, and human_decision.
Do not invent lender criteria. If criteria are missing, mark confidence low and create a missing-context action.
```

### Acceptance criteria

- Recommendations can be stored and displayed.
- Reasons and conditions are visible.
- Missing lender criteria lowers confidence.
- Broker decision is tracked.

---

## Epic 4.5 — Smart Placement Compliance Agent runtime

### Target files

```text
app/api/mix/agents/smart-placement-compliance/run/route.ts
lib/mix/agents/smart-placement-compliance.ts
```

### Claude Code / Codex prompt

```text
Implement a draft-only runtime for agents/smart-placement-compliance-agent.md.
It should load opportunity, Smart Placement profile, AML intake, document reviews, and lender criteria.
It should output application readiness, AML risk flags, document gaps, placement recommendation, broker tasks, and confidence.
It must not submit to lenders, mark AML complete, or send messages.
```

### Acceptance criteria

- Agent run produces structured output.
- Draft actions are created.
- Review gates are created where required.
- Run is logged.

---

# Phase 5 — Days 121-150: Automation + Learning Loop

## Goal

Convert repeated broker work into approved knowledge assets and reusable playbooks.

## Deliverable by Day 150

Copilot outputs can become learning candidates; approved learning candidates can become MIX knowledge assets and wiki-ready content.

---

## Epic 5.1 — Workspace action automation

### Target files

```text
lib/mix/workspace-action-executor.ts
app/api/mix/workspaces/[id]/actions/[actionId]/approve/route.ts
```

### Claude Code / Codex prompt

```text
Build approval-based workspace action execution.
Only implement safe internal actions first: mark task complete, create draft note, create learning candidate, update workspace status.
Do not implement external email/SMS/lender submission execution yet.
Every approved action must record reviewer, timestamp, and result.
```

### Acceptance criteria

- Internal actions can be approved and completed.
- Reviewer metadata is recorded.
- External actions remain draft-only.

---

## Epic 5.2 — Learning candidate review

### Target files

```text
components/mix/LearningCandidateReviewPanel.tsx
app/api/mix/learning-candidates/[id]/route.ts
app/api/mix/learning-candidates/[id]/approve/route.ts
```

### Claude Code / Codex prompt

```text
Add a learning candidate review workflow.
Broker can approve, reject, or edit a learning candidate.
Approved candidates can be converted into mix_knowledge_assets as draft or reviewed.
Keep source workspace and Copilot run traceability.
```

### Acceptance criteria

- Learning candidates can be reviewed.
- Approved candidates create or update knowledge assets.
- Traceability is preserved.

---

## Epic 5.3 — Knowledge asset conversion

### Target files

```text
lib/mix/knowledge-assets.ts
app/api/mix/knowledge-assets/route.ts
```

### Claude Code / Codex prompt

```text
Create functions and routes to convert approved learning candidates into knowledge assets.
Use existing mix_knowledge_assets table if present.
If fields are missing, add an additive migration only.
Do not publish to GitHub Wiki automatically unless a separate human-approved action exists.
```

### Acceptance criteria

- Approved learning can become knowledge asset.
- Knowledge asset has source reference.
- Publishing remains separate and approved.

---

## Epic 5.4 — Renewal and relationship Copilot workflows

### Target files

```text
agents/renewal-workspace-copilot.md
agents/relationship-reactivation-copilot.md
lib/mix/agents/renewal-copilot.ts
lib/mix/agents/relationship-copilot.ts
```

### Claude Code / Codex prompt

```text
Add draft-only Copilot workflows for renewal opportunities and relationship reactivation.
Use MWP workspaces, RIOS, and ICM.
All outreach must remain draft-only and require broker approval.
Actions should be tied to relationship context, timing, and reason.
```

### Acceptance criteria

- Renewal Copilot can create draft strategy/actions.
- Relationship Copilot can create draft strategy/actions.
- CASL/human approval rules are preserved.

---

# Phase 6 — Days 151-180: Production Hardening + Pilot

## Goal

Prepare MIX Copilot OS for controlled real-world pilot use.

## Deliverable by Day 180

MIX is ready for a controlled broker pilot with real files, real review gates, traceability, QA scenarios, and measurable operating outcomes.

---

## Epic 6.1 — QA scenario suite

### Target files

```text
tests/mix/copilot-context-assembler.test.ts
tests/mix/copilot-output.test.ts
tests/mix/workspaces.test.ts
tests/mix/smart-placement.test.ts
tests/mix/aml-intakes.test.ts
tests/mix/document-readiness.test.ts
```

### Required test scenarios

- missing workspace
- missing context file
- missing application consent
- missing AML answers
- medium AML risk
- high AML risk
- document anomaly
- missing lender criteria
- malformed Copilot output
- review gate cannot be auto-approved
- external action remains draft

### Claude Code / Codex prompt

```text
Add Vitest tests for the MIX Copilot OS core logic.
Focus on context assembly, output parsing, workspace services, AML guardrails, document readiness, and review gate rules.
Mock Supabase and LLM calls where necessary.
Do not require real external services.
```

### Acceptance criteria

- Tests run locally.
- Guardrails are tested.
- Failed AI output is handled.

---

## Epic 6.2 — Audit and traceability hardening

### Target files

```text
lib/mix/audit-log.ts
supabase/migrations/mix_007_audit_hardening.sql
components/mix/AuditTrailPanel.tsx
```

### Claude Code / Codex prompt

```text
Add audit and traceability hardening for MIX Copilot OS.
Every Copilot run, review gate decision, approved action, learning conversion, and regulated workflow change should have reviewer/source/timestamp metadata.
Add an AuditTrailPanel to workspace detail pages.
Do not allow deletion of audit records through normal UI.
```

### Acceptance criteria

- Audit events are recorded.
- Workspace detail shows audit trail.
- Regulated actions have reviewer metadata.

---

## Epic 6.3 — Analytics dashboard

### Target files

```text
app/(mix)/analytics/page.tsx
components/mix/CopilotAnalytics.tsx
app/api/mix/analytics/copilot/route.ts
```

### Metrics

```text
active workspaces
open review gates
Copilot runs
recommendations accepted/edited/rejected
average time to strategy memo
missing document rate
AML completeness rate
placement recommendation acceptance rate
funded volume influenced
learning candidates created/approved
```

### Claude Code / Codex prompt

```text
Add a Copilot analytics page and API route.
Show operational metrics for workspaces, review gates, Copilot runs, recommendations, AML completeness, document readiness, and learning candidates.
Use existing design system patterns.
Do not require external analytics tools.
```

### Acceptance criteria

- Analytics page renders.
- API returns metrics.
- Metrics help broker see value and risk reduction.

---

## Epic 6.4 — Pilot readiness package

### Target files

```text
docs/MIX-COPILOT-PILOT-RUNBOOK.md
docs/MIX-COPILOT-QA-CHECKLIST.md
docs/MIX-COPILOT-DEPLOYMENT-CHECKLIST.md
```

### Claude Code / Codex prompt

```text
Create pilot runbook, QA checklist, and deployment checklist for MIX Copilot OS.
The pilot should cover 10 borrower files, 10 renewal opportunities, 5 referral opportunities, 3 lender rule updates, and 3 compliance review cases.
Include setup, test data, review gates, success metrics, and rollback steps.
```

### Acceptance criteria

- Pilot can be run by a broker/operator.
- QA checklist covers safety and compliance guardrails.
- Deployment checklist covers environment variables, migrations, and smoke tests.

---

# Technical Build Order

Use this exact order unless there is a strong reason to change it:

```text
1. Finish docs and workspace templates
2. Add database schema spec
3. Add workspace migration
4. Add workspace types
5. Add workspace services
6. Add workspace API routes
7. Add Workspaces UI
8. Add context assembler
9. Add Copilot output schema
10. Add Copilot run endpoint
11. Add Copilot UI panel
12. Add Smart Placement module
13. Add AML intake module
14. Add Document Readiness module
15. Add Lender Fit module
16. Add Smart Placement Compliance Agent runtime
17. Add learning candidate review
18. Add knowledge asset conversion
19. Add tests
20. Add audit panel
21. Add analytics
22. Add pilot runbook
```

---

# Repo-Level File Map

## New docs

```text
docs/MIX-COPILOT-GOVERNANCE.md
docs/MIX-COPILOT-DATABASE-SPEC.md
docs/MIX-COPILOT-PILOT-RUNBOOK.md
docs/MIX-COPILOT-QA-CHECKLIST.md
docs/MIX-COPILOT-DEPLOYMENT-CHECKLIST.md
```

## New migrations

```text
supabase/migrations/mix_002_workspaces.sql
supabase/migrations/mix_003_smart_placement.sql
supabase/migrations/mix_004_aml_intakes.sql
supabase/migrations/mix_005_document_reviews.sql
supabase/migrations/mix_006_placement_recommendations.sql
supabase/migrations/mix_007_audit_hardening.sql
```

## New API routes

```text
app/api/mix/workspaces/route.ts
app/api/mix/workspaces/[id]/route.ts
app/api/mix/workspaces/[id]/actions/route.ts
app/api/mix/workspaces/[id]/review-gates/route.ts
app/api/mix/workspaces/[id]/learning-candidates/route.ts
app/api/mix/copilot/run/route.ts
app/api/mix/agents/smart-placement-compliance/run/route.ts
app/api/mix/analytics/copilot/route.ts
```

## New lib modules

```text
lib/mix/workspaces.ts
lib/mix/review-gates.ts
lib/mix/workspace-actions.ts
lib/mix/learning-candidates.ts
lib/mix/context-assembler.ts
lib/mix/copilot-schema.ts
lib/mix/copilot-output.ts
lib/mix/smart-placement.ts
lib/mix/aml-intakes.ts
lib/mix/document-reviews.ts
lib/mix/lender-fit.ts
lib/mix/audit-log.ts
lib/mix/agents/smart-placement-compliance.ts
```

## New UI

```text
app/(mix)/workspaces/page.tsx
app/(mix)/workspaces/[id]/page.tsx
app/(mix)/analytics/page.tsx
components/mix/WorkspaceList.tsx
components/mix/WorkspaceDetail.tsx
components/mix/RIOSStateBadge.tsx
components/mix/ICMStateBadge.tsx
components/mix/ReviewGatePanel.tsx
components/mix/WorkspaceActionsPanel.tsx
components/mix/LearningCandidatesPanel.tsx
components/mix/CopilotPanel.tsx
components/mix/CopilotRunResult.tsx
components/mix/SmartPlacementPanel.tsx
components/mix/AMLIntakePanel.tsx
components/mix/DocumentReadinessPanel.tsx
components/mix/LenderFitPanel.tsx
components/mix/AuditTrailPanel.tsx
components/mix/CopilotAnalytics.tsx
```

---

# Standard Claude Code / Codex Task Template

Use this for every technical task:

```text
You are working in the MIX mortgage-intelligence-exchange repo.
Read these files first:
- docs/RIOS-ICM-MWP-OPERATING-SYSTEM.md
- agents/mix-copilot-os.md
- docs/MIX-COPILOT-OS-180-DAY-IMPLEMENTATION-PLAN.md

Task:
[describe one focused task]

Target files:
[list files]

Constraints:
- Keep changes scoped to this task.
- Do not remove existing behavior.
- Do not introduce autonomous lender submission.
- Do not mark AML complete automatically.
- Do not send external communications.
- All AI actions must remain draft-only unless a human approval field exists.
- Use TypeScript types.
- Add tests or test notes.

Acceptance criteria:
[list criteria]

After implementation, summarize:
- files changed
- key decisions
- how to test
- risks or follow-up
```

---

# Definition of Done by Day 180

MIX Copilot OS is ready for controlled production use when:

1. Every active file can be managed inside an MWP workspace.
2. Every Copilot run follows RIOS and ICM.
3. Every regulated or external action has a review gate.
4. Smart Placement produces broker-reviewable lender strategy.
5. AML intake produces risk tier and compliance review tasks after consent.
6. Document Readiness produces readiness score and missing-document tasks.
7. Lender Fit produces ranked recommendations with reasons and unresolved conditions.
8. Approved learnings become reusable knowledge assets.
9. Tests cover core guardrails.
10. Audit trail captures Copilot runs, review gates, approvals, and regulated actions.
11. Analytics show operational value.
12. Pilot runbook is complete.

Final product goal:

```text
Turn the broker's expertise into a governed, compounding mortgage operating system.
```
