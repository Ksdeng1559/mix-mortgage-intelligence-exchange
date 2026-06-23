# MIX Copilot OS — 180-Day Implementation Plan

## Purpose

Build MIX into a broker-controlled Mortgage Operating System using:

```text
RIOS = Research -> Intelligence -> Opportunity -> Strategy -> Execution
ICM  = Data -> Context -> Signal -> Interpretation -> Score -> Action
MWP  = Numbered filesystem workspaces with markdown context and review gates
```

This plan turns the current MIX dashboard, agents, smart placement module, AML module, and document intelligence concept into an operating product over 180 days.

---

## Strategic Outcome by Day 180

By the end of 180 days, MIX should operate as a working mortgage practice Copilot that can:

1. Create a numbered workspace for every meaningful mortgage file, relationship opportunity, lender review, or compliance workflow.
2. Assemble trusted context from markdown, Supabase records, documents, conversations, and lender criteria.
3. Run Copilot actions through the RIOS + ICM method.
4. Produce broker-reviewable recommendations for smart placement, AML readiness, document readiness, lender matching, relationship reactivation, and renewal opportunity strategy.
5. Route regulated and external actions through human review gates.
6. Capture approved learnings into reusable knowledge assets and future lender/playbook intelligence.
7. Track measurable business outcomes: funded volume, time saved, missing-document reduction, renewal conversion, and relationship activation.

---

## Implementation Philosophy

MIX should not try to become a fully autonomous mortgage bot.

The correct build path is:

```text
First: context discipline
Second: workspace structure
Third: broker review gates
Fourth: agent recommendations
Fifth: document and compliance automation
Sixth: learning loop
Seventh: scalable multi-tenant operating model
```

Core rule:

```text
AI prepares. Broker approves. System records. Practice intelligence compounds.
```

---

## 180-Day Roadmap Summary

| Period | Theme | Main Outcome |
|---|---|---|
| Days 1-30 | OS Foundation | Workspace templates, schema, Copilot contracts, manual flow |
| Days 31-60 | Workspace Runtime | Workspaces tab, workspace APIs, review gates, opportunity linking |
| Days 61-90 | Copilot MVP | Context assembler, Copilot run endpoint, strategy memo generation |
| Days 91-120 | Mortgage Intelligence Modules | Smart placement, AML intake, document readiness, lender fit |
| Days 121-150 | Automation + Learning Loop | Agent-triggered tasks, knowledge candidates, wiki-ready outputs |
| Days 151-180 | Production Hardening + Pilot | Broker pilot, QA, analytics, security, deployment, packaging |

---

# Phase 1 — Days 1-30: OS Foundation

## Goal

Convert the repo from documentation plus dashboard into a governed operating-system foundation.

## Day 30 outcome

A broker can manually create a workspace, fill in structured markdown context, see the RIOS/ICM state, and understand which review gates apply before execution.

## Workstream 1 — Complete MWP filesystem standard

### Deliverables

Create complete workspace templates:

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

### Acceptance criteria

- Every file has a clear purpose.
- Every workspace follows RIOS + ICM.
- Every workspace has review gates.
- Workspace structure is understandable to a human and usable by Claude Code/Codex.

## Workstream 2 — Create example workspaces

### Deliverables

Create example workspaces:

```text
workspaces/MWP-2026-001-smart-placement-aml-module/
workspaces/MWP-2026-002-sample-renewal-file/
workspaces/MWP-2026-003-sample-bfs-placement/
```

### Acceptance criteria

- At least one product/module workspace exists.
- At least one borrower-file workspace exists.
- At least one relationship/renewal workspace exists.
- Each example shows the end-to-end operating method.

## Workstream 3 — Supabase schema planning

### Deliverables

Draft migration for:

```text
mix_workspaces
mix_workspace_files
mix_review_gates
mix_workspace_actions
mix_learning_candidates
mix_copilot_runs
```

### Acceptance criteria

- Tables use `mix_` prefix.
- Records can link to opportunities, contacts, organizations, and agent runs.
- Review gate decisions are auditable.
- Copilot outputs can be stored as draft, candidate, approved, or rejected.

## Workstream 4 — Governance rules

### Deliverables

Add governance doc:

```text
docs/MIX-COPILOT-GOVERNANCE.md
```

Required rules:

- no autonomous lender submission
- no autonomous AML clearance
- no hidden risk suppression
- no outbound communication without approval unless explicitly authorized
- all regulated decisions require broker review
- all context updates must be versioned

## Days 1-30 Milestones

| Day | Milestone |
|---|---|
| Day 7 | Workspace templates complete |
| Day 14 | Example workspaces complete |
| Day 21 | Schema migration drafted |
| Day 30 | Foundation review gate passed |

---

# Phase 2 — Days 31-60: Workspace Runtime

## Goal

Move MWP from static markdown into the application runtime.

## Day 60 outcome

A broker can open MIX, create/view workspaces, link them to opportunities, and see current stage, open actions, review gates, and last Copilot run.

## Workstream 1 — Workspace database tables

### Deliverables

Implement migration:

```text
supabase/migrations/mix_002_workspaces.sql
```

Core tables:

- `mix_workspaces`
- `mix_workspace_files`
- `mix_review_gates`
- `mix_workspace_actions`
- `mix_learning_candidates`
- `mix_copilot_runs`

### Acceptance criteria

- Migration applies cleanly.
- RLS design is documented.
- Workspaces can be queried by opportunity, contact, organization, type, status, and current gate.

## Workstream 2 — Workspace service layer

### Deliverables

Suggested files:

```text
lib/mix/workspaces.ts
lib/mix/review-gates.ts
lib/mix/workspace-actions.ts
```

Functions:

- create workspace
- list workspaces
- load workspace
- link workspace to opportunity
- create review gate
- update review gate
- create action
- mark action complete
- create learning candidate

### Acceptance criteria

- Service functions are typed.
- All writes create traceable records.
- Review-gate updates require explicit status.

## Workstream 3 — API routes

### Deliverables

Suggested routes:

```text
app/api/mix/workspaces/route.ts
app/api/mix/workspaces/[id]/route.ts
app/api/mix/workspaces/[id]/actions/route.ts
app/api/mix/workspaces/[id]/review-gates/route.ts
```

### Acceptance criteria

- Create, list, read, update workspace.
- Add/list actions.
- Add/update review gates.
- Return current RIOS and ICM state.

## Workstream 4 — UI: Workspaces tab

### Deliverables

Suggested pages/components:

```text
app/(mix)/workspaces/page.tsx
app/(mix)/workspaces/[id]/page.tsx
components/mix/WorkspaceList.tsx
components/mix/WorkspaceDetail.tsx
components/mix/ReviewGatePanel.tsx
components/mix/WorkspaceActionsPanel.tsx
```

### Acceptance criteria

- Workspaces appear as a new top-level MIX section or Docs subtab.
- Workspace detail shows:
  - RIOS state
  - ICM state
  - open gates
  - open actions
  - related opportunity
  - related contacts
  - last Copilot run

## Days 31-60 Milestones

| Day | Milestone |
|---|---|
| Day 37 | Workspace migration implemented |
| Day 45 | Workspace service and API working |
| Day 53 | Workspaces UI list/detail working |
| Day 60 | Workspace runtime demo complete |

---

# Phase 3 — Days 61-90: Copilot MVP

## Goal

Build the first usable Copilot loop: summarize current state, detect missing context, identify signals, score priority, and generate a strategy memo for broker review.

## Day 90 outcome

A broker can click “Run Copilot” on a workspace and receive a structured recommendation with known facts, missing context, signals, scores, next actions, review gates, and confidence.

## Workstream 1 — Context assembler

### Deliverables

Suggested file:

```text
lib/mix/context-assembler.ts
```

Assembly order:

1. platform and tenant rules
2. MIX operating principles
3. workspace README
4. workspace data
5. workspace context
6. workspace signals
7. vertical pack
8. lender criteria
9. agent execution contract
10. source records
11. current instruction

### Acceptance criteria

- Context assembly is deterministic.
- Missing files produce warnings, not hallucinated content.
- Assembler returns context sections with source references.

## Workstream 2 — Copilot run endpoint

### Deliverables

Suggested route:

```text
app/api/mix/copilot/run/route.ts
```

Inputs:

- workspace id
- run type
- user instruction
- selected mode

Modes:

- `research`
- `intelligence`
- `opportunity`
- `strategy`
- `execution`
- `full_loop`

### Acceptance criteria

- Endpoint loads workspace context.
- Endpoint applies `agents/mix-copilot-os.md` contract.
- Endpoint writes a `mix_copilot_runs` record.
- Endpoint does not automatically execute external actions.

## Workstream 3 — Output parser

### Deliverables

Suggested file:

```text
lib/mix/copilot-output.ts
```

Responsibilities:

- validate Copilot JSON output
- extract actions
- extract review gate updates
- extract workspace update candidates
- extract learning candidates
- store traceability

### Acceptance criteria

- Invalid output is rejected or marked failed.
- Draft actions are created from output.
- Review gates are not auto-approved.
- Learning candidates remain draft until reviewed.

## Workstream 4 — Strategy memo generator

### Deliverables

Copilot can generate:

- borrower file strategy memo
- renewal strategy memo
- smart placement memo
- compliance readiness memo
- missing context memo

### Acceptance criteria

- Memo separates facts, assumptions, interpretations, and recommendations.
- Memo has confidence score.
- Memo includes next best action.
- Memo identifies review gates before execution.

## Days 61-90 Milestones

| Day | Milestone |
|---|---|
| Day 67 | Context assembler complete |
| Day 75 | Copilot run endpoint working |
| Day 82 | Output parser and action creation working |
| Day 90 | Copilot MVP demo complete |

---

# Phase 4 — Days 91-120: Mortgage Intelligence Modules

## Goal

Connect the Copilot OS to the mortgage-specific modules: Smart Placement, AML Compliance, Document Intelligence, and lender matching.

## Day 120 outcome

MIX can produce a broker-reviewable smart placement and compliance-readiness packet for a borrower file.

## Workstream 1 — Smart Placement module

### Deliverables

Implement data and UI support for:

- borrower profile
- property profile
- income profile
- credit profile
- down-payment profile
- requested product
- recommended channel
- fallback channel
- placement score
- confidence

Suggested table:

```text
mix_smart_placement_profiles
```

Suggested UI:

```text
components/mix/SmartPlacementPanel.tsx
```

### Acceptance criteria

- Broker can enter or review normalized borrower scenario.
- System can produce A / Alt-A / B / Private / Reverse / Specialty channel recommendation.
- Recommendation explains why.
- Recommendation creates broker review gate before lender action.

## Workstream 2 — AML / FINTRAC intake module

### Deliverables

Implement support for:

- application consent
- identity intake
- occupation/income intake
- source-of-funds intake
- third-party determination
- PEP/HIO/family/associate questions
- international exposure
- purpose/use-of-funds confirmation
- risk tier
- manual review flag

Suggested table:

```text
mix_aml_intakes
```

Suggested UI:

```text
components/mix/AMLIntakePanel.tsx
```

### Acceptance criteria

- AML starts only after consent.
- Missing AML answers cannot be treated as low risk.
- Medium/high risk creates review gate.
- Final compliance status requires human review.

## Workstream 3 — Document Intelligence module

### Deliverables

Implement support for:

- document checklist
- document type classification
- extracted facts
- completeness status
- anomaly flags
- income findings
- down-payment findings
- review status

Suggested table:

```text
mix_document_reviews
```

Suggested UI:

```text
components/mix/DocumentReadinessPanel.tsx
```

### Acceptance criteria

- Broker can see missing documents.
- Broker can see document anomalies.
- System can produce document-readiness score.
- Extracted facts remain reviewable, not automatically final.

## Workstream 4 — Lender fit scoring

### Deliverables

Implement support for:

- hard filters
- soft scoring
- ranked lender/program recommendations
- conditions to resolve
- fallback path

Suggested table:

```text
mix_placement_recommendations
```

Suggested UI:

```text
components/mix/LenderFitPanel.tsx
```

### Acceptance criteria

- Recommendation includes facts used.
- Recommendation includes lender/program rule used.
- Recommendation includes unresolved conditions.
- Broker must approve before lender submission.

## Days 91-120 Milestones

| Day | Milestone |
|---|---|
| Day 97 | Smart Placement schema/UI complete |
| Day 105 | AML intake schema/UI complete |
| Day 113 | Document readiness schema/UI complete |
| Day 120 | Broker-ready placement/compliance packet demo complete |

---

# Phase 5 — Days 121-150: Automation + Learning Loop

## Goal

Turn repeated broker work into repeatable intelligence assets.

## Day 150 outcome

MIX can convert approved Copilot outputs into learning candidates and knowledge assets that improve future workflows.

## Workstream 1 — Agent-triggered tasks

### Deliverables

Copilot can create draft tasks for:

- missing borrower data
- missing documents
- compliance review
- lender review
- renewal outreach
- referral follow-up
- BDM clarification
- strategy review

### Acceptance criteria

- All tasks have owner, priority, source, and review status.
- External tasks require approval when needed.
- Completed tasks update workspace state.

## Workstream 2 — Learning candidate workflow

### Deliverables

Learning candidates can be created from:

- funded files
- declined files
- lender exceptions
- BDM conversations
- document gap patterns
- AML review patterns
- borrower objections
- renewal outreach results

### Acceptance criteria

- Learning candidates are draft by default.
- Broker can approve/reject/edit.
- Approved candidates become knowledge assets or context updates.

## Workstream 3 — Knowledge asset publishing

### Deliverables

Connect approved learnings to:

```text
mix_knowledge_assets
GitHub Wiki Publisher Agent
workspace 10-LEARNINGS.md
```

### Acceptance criteria

- Approved learning can become playbook content.
- Published assets have source workspace reference.
- Knowledge assets are versioned and traceable.

## Workstream 4 — Renewal and relationship Copilot

### Deliverables

Add Copilot workflows for:

- renewal opportunity review
- dormant database reactivation
- referral partner action plan
- client retention sequence

### Acceptance criteria

- Relationship actions are not purely generic outreach.
- Every action is tied to relationship context, timing, and reason.
- CASL/human approval rules apply.

## Days 121-150 Milestones

| Day | Milestone |
|---|---|
| Day 127 | Agent task creation working |
| Day 135 | Learning candidate review workflow working |
| Day 143 | Knowledge asset conversion working |
| Day 150 | Learning loop demo complete |

---

# Phase 6 — Days 151-180: Production Hardening + Pilot

## Goal

Prepare MIX Copilot OS for real broker use and future multi-tenant expansion.

## Day 180 outcome

MIX is ready for a controlled broker pilot with real files, real review gates, and measurable operating outcomes.

## Workstream 1 — QA and safety hardening

### Deliverables

Test scenarios:

- missing consent
- missing AML answers
- medium/high AML risk
- document anomaly
- low-confidence lender fit
- conflicting lender rules
- outbound message approval
- workspace context missing
- Copilot output malformed

### Acceptance criteria

- System blocks unsafe progression.
- System creates review tasks instead of guessing.
- System logs failures.
- Broker can override only with recorded reason.

## Workstream 2 — Audit and traceability

### Deliverables

Ensure traceability for:

- source files
- source records
- Copilot run
- model used
- context files used
- output generated
- reviewer decision
- final action taken

### Acceptance criteria

- Every recommendation has traceability.
- Every review gate decision has reviewer and timestamp.
- Every regulated action has approval record.

## Workstream 3 — Analytics dashboard

### Deliverables

Track:

- number of active workspaces
- open review gates
- Copilot runs
- recommendations accepted/edited/rejected
- average time to strategy memo
- missing document rate
- AML completeness rate
- placement recommendation acceptance rate
- funded volume influenced

### Acceptance criteria

- Broker sees operational value.
- Dashboard connects activity to revenue and risk reduction.

## Workstream 4 — Pilot launch

### Pilot scope

Run with:

- 10 borrower files
- 10 renewal opportunities
- 5 referral partner opportunities
- 3 lender rule updates
- 3 compliance review cases

### Acceptance criteria

- At least 80 percent of pilot workspaces have complete RIOS/ICM state.
- At least 80 percent of regulated actions pass through review gate.
- Broker confirms Copilot saves time or improves clarity.
- At least 10 reusable learning candidates are captured.

## Workstream 5 — Packaging for future multi-tenant use

### Deliverables

Document:

- tenant model
- workspace-per-tenant rules
- role permissions
- audit log requirements
- client data isolation
- white-label module strategy

### Acceptance criteria

- System can evolve from Dennis/MIX internal use to white-label broker or agency deployment.
- Tenant isolation requirements are known before scaling.

## Days 151-180 Milestones

| Day | Milestone |
|---|---|
| Day 157 | QA scenarios complete |
| Day 165 | Audit and traceability complete |
| Day 172 | Analytics dashboard complete |
| Day 180 | Controlled pilot complete |

---

# Resource Plan

## Minimum team

- Product owner / broker expert
- Full-stack developer
- AI workflow engineer
- Supabase/data engineer
- Compliance reviewer or broker reviewer

## Lean build mode

If only one builder is available, prioritize:

1. workspace runtime
2. Copilot run endpoint
3. review gates
4. Smart Placement + AML intake
5. document readiness
6. learning loop

Do not overbuild integrations before workspace discipline and review gates work.

---

# Critical Dependencies

## Technical

- Supabase schema and RLS
- Next.js dashboard stability
- agent execution contracts
- document storage strategy
- model/API selection
- audit logging

## Business

- broker-approved lender criteria
- AML question set
- document checklist standards
- smart placement logic
- review gate rules
- pilot file examples

## Compliance

- borrower consent before AML intake
- no autonomous AML clearance
- no autonomous lender submission
- audit trail for regulated actions
- secure handling of borrower documents and identity information

---

# Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Overbuilding before workflow clarity | High | Complete MWP templates and manual workflow first |
| AI recommendations treated as final advice | High | Review gates and prohibited actions enforced |
| Weak lender criteria data | Medium | Use broker-approved criteria and confidence scoring |
| Document extraction errors | High | Human review for extracted facts |
| Compliance gaps | High | AML intake cannot proceed without consent and review flags |
| Too many modules at once | Medium | Build file Copilot first, then relationship/revenue Copilot |
| Poor traceability | High | Store source records, context versions, run IDs, decisions |

---

# 180-Day Success Scorecard

| Metric | Target by Day 180 |
|---|---|
| Active workspaces created | 25+ |
| Pilot borrower files processed | 10+ |
| Renewal opportunities processed | 10+ |
| Referral opportunities processed | 5+ |
| Copilot runs completed | 100+ |
| Recommendations accepted or edited by broker | 60%+ |
| Regulated actions with review gate | 90%+ |
| Missing-document rate reduced | 25%+ |
| AML intake completeness before submission | 90%+ |
| Learning candidates captured | 25+ |
| Approved knowledge assets | 10+ |

---

# Final Day 180 Definition of Done

MIX Copilot OS is ready for controlled production use when:

1. Every active file can be managed inside an MWP workspace.
2. Every Copilot run follows RIOS and ICM.
3. Every regulated or external action has a review gate.
4. Smart Placement produces broker-reviewable lender strategy.
5. AML intake produces risk tier and compliance review tasks.
6. Document Intelligence produces readiness score and missing-document tasks.
7. Approved learnings become reusable knowledge assets.
8. The broker can see measurable value in revenue, speed, risk reduction, and practice intelligence.

The goal is not to replace the broker.

The goal is to turn the broker's expertise into a governed, compounding operating system.
