# MIX Operating System — RIOS + ICM + MWP

## Status

Core operating-system specification for MIX — Mortgage Intelligence Exchange.

This document converts MIX from a dashboard plus agents into a repeatable mortgage execution system using three operating methods:

```text
RIOS = Research -> Intelligence -> Opportunity -> Strategy -> Execution
ICM  = Data -> Context -> Signal -> Interpretation -> Score -> Action
MWP  = Numbered filesystem workspaces with markdown context and review gates
```

Together, these create the MIX Copilot: a broker-controlled mortgage command system that turns conversations, documents, lender rules, compliance obligations, market changes, and relationship knowledge into auditable next actions.

---

## 1. Operating Thesis

Most mortgage workflows fail because context is fragmented:

- borrower facts are in notes, calls, forms, and emails
- lender criteria are in PDFs, rate sheets, memory, and BDM conversations
- compliance obligations are separate from sales intake
- referral intelligence is trapped in the broker's head
- agents act from prompts instead of inspectable operating files

MIX solves this by making every important mortgage workflow run through a visible operating loop:

```text
Workspace context -> Agent contract -> Evidence -> Interpretation -> Score -> Action -> Review -> Learning
```

The result is not a normal CRM. It is a mortgage practice operating system.

---

## 2. The Three-Layer Method

### 2.1 RIOS — Business outcome loop

RIOS defines the business flow from raw information to executed mortgage action.

| Stage | Meaning | MIX output |
|---|---|---|
| Research | Gather borrower, relationship, lender, market, and document data | source records, documents, transcripts, notes |
| Intelligence | Convert raw data into structured mortgage context | normalized borrower profile, lender criteria, compliance profile |
| Opportunity | Identify what can be acted on | renewal, refinance, placement, referral, compliance gap, lender match |
| Strategy | Decide the best route | smart placement plan, outreach plan, compliance plan, document plan |
| Execution | Move the file or relationship forward | task, draft, checklist, broker review, submission package |

RIOS is the business operating rhythm.

### 2.2 ICM — Agent reasoning loop

ICM defines how an agent or Copilot turns facts into a controlled recommendation.

| Stage | Meaning | MIX example |
|---|---|---|
| Data | Raw source material | email, call transcript, bank statement, rate sheet |
| Context | Known business/lending/compliance meaning | borrower is BFS, lender accepts BFS addbacks, AML consent exists |
| Signal | Event or pattern worth attention | maturity in 90 days, large deposit, new rate change |
| Interpretation | What the signal likely means | refinance opportunity, documentation gap, compliance review trigger |
| Score | Prioritize by confidence and value | fit score, risk tier, opportunity score, urgency score |
| Action | Recommended next step | call borrower, request docs, match lender, escalate review |

ICM is the auditable reasoning architecture.

### 2.3 MWP — Managed Workspace Protocol

MWP defines the filesystem and review process. Every meaningful workflow lives in a numbered workspace with markdown context and review gates.

A workspace is a folder with:

- immutable source notes
- current context markdown
- agent instructions
- decision records
- outputs
- review gates
- final approved package

MWP prevents agent work from becoming hidden prompt logic.

---

## 3. MIX Copilot Product Definition

### Name

**MIX Copilot OS**

### Purpose

Help the broker decide what to do next, why it matters, what evidence supports it, and what must be reviewed before execution.

### Primary Copilot modes

1. **File Copilot** — helps move a borrower file from intake to placement to submission.
2. **Relationship Copilot** — helps reactivate contacts, referral partners, and dormant database value.
3. **Compliance Copilot** — helps ensure AML, disclosure, document, and audit readiness.
4. **Lender Copilot** — helps select lenders and track program fit.
5. **Revenue Copilot** — helps prioritize highest-value actions across the practice.

### What the Copilot can do

- summarize borrower scenario
- identify missing facts
- interpret documents
- classify compliance gaps
- rank lender/program fit
- draft broker tasks
- draft borrower/lender communications for human approval
- create strategy memos
- update workspace markdown outputs
- produce auditable review packets

### What the Copilot cannot do

- approve a mortgage
- clear AML compliance
- send lender submissions without broker approval
- provide legal advice
- override broker review gates
- modify immutable audit logs
- invent lender rules or borrower facts

---

## 4. Canonical Operating Flow

```text
1. Create or select workspace
2. Load approved context
3. Gather data
4. Normalize facts
5. Detect signals
6. Interpret meaning
7. Score opportunity, risk, urgency, and confidence
8. Recommend action
9. Route through review gate
10. Execute approved action
11. Write back result
12. Capture learning
```

This is both the product workflow and the agent workflow.

---

## 5. Numbered Workspace Standard

### Workspace ID format

```text
MWP-YYYY-NNN-client-or-theme
```

Examples:

```text
MWP-2026-001-chen-strata-refi
MWP-2026-002-patel-renewal
MWP-2026-003-smart-placement-aml-module
MWP-2026-004-lender-rate-sheet-review
```

### Workspace folder structure

```text
workspaces/
  MWP-2026-001-chen-strata-refi/
    00-README.md
    01-DATA.md
    02-CONTEXT.md
    03-SIGNALS.md
    04-INTERPRETATION.md
    05-SCORES.md
    06-STRATEGY.md
    07-ACTIONS.md
    08-REVIEW-GATES.md
    09-OUTPUTS.md
    10-LEARNINGS.md
    sources/
      emails/
      transcripts/
      documents/
      lender-rules/
    outputs/
      borrower-summary.md
      placement-memo.md
      compliance-checklist.md
      lender-package.md
```

### Required workspace files

#### 00-README.md

The control page for the workspace.

Must include:

- workspace owner
- opportunity/contact/lender references
- current stage
- open decisions
- current blocker
- next review gate

#### 01-DATA.md

Raw facts and source references.

Must include:

- borrower facts
- property facts
- income facts
- document inventory
- lender references
- relationship notes
- source links or database references

#### 02-CONTEXT.md

Meaning assigned to the data.

Must include:

- borrower situation
- mortgage purpose
- constraints
- lender-fit assumptions
- compliance context
- relationship context

#### 03-SIGNALS.md

Signals extracted from data and context.

Examples:

- renewal date approaching
- rate-hold expiry
- large deposit
- missing NOA
- PEP exposure
- down-payment gap
- alternative lender likely needed
- referral opportunity

#### 04-INTERPRETATION.md

Agent or broker interpretation of each signal.

Must separate:

- known facts
- assumptions
- inferred meaning
- uncertainties
- required verification

#### 05-SCORES.md

All scoring outputs.

Recommended scores:

- opportunity score
- urgency score
- relationship score
- placement fit score
- income confidence score
- document completeness score
- AML risk score
- broker review priority

#### 06-STRATEGY.md

Recommended route.

Must include:

- primary strategy
- fallback strategy
- lender path
- document path
- compliance path
- communication path
- risks and mitigations

#### 07-ACTIONS.md

Action plan.

Must include:

- broker tasks
- borrower tasks
- lender/BDM tasks
- document tasks
- compliance tasks
- automation tasks

#### 08-REVIEW-GATES.md

Human review requirements.

Review gate types:

- intake approved
- AML review required
- document review required
- lender placement approved
- borrower communication approved
- lender submission approved
- file closeout approved

#### 09-OUTPUTS.md

Approved outputs.

Examples:

- borrower summary
- lender placement memo
- document checklist
- compliance summary
- lender-ready package
- outreach draft

#### 10-LEARNINGS.md

Reusable intelligence after the workflow completes.

Examples:

- lender accepted exception
- borrower objection pattern
- referral source quality
- document gap pattern
- new underwriting rule
- compliance issue pattern

---

## 6. Copilot Execution Model

### Input

The Copilot receives:

- user request
- selected workspace
- approved context files
- source records
- agent contract
- database records
- document extraction results

### Context assembly order

1. Platform safety, privacy, tenant isolation
2. MIX operating principles
3. Workspace `00-README.md`
4. Workspace `02-CONTEXT.md`
5. Vertical pack and lender criteria
6. Agent execution contract
7. Source records and retrieved evidence
8. Current user instruction

### Output

Every Copilot run must produce one or more of:

- markdown workspace update
- structured JSON output
- broker task
- review gate status
- recommendation memo
- draft communication
- learning candidate
- agent run log

### Write-back rules

Allowed write-backs:

- draft recommendation
- draft communication
- missing-data task
- broker-review task
- score update
- context update candidate
- learning candidate

Requires human approval:

- approved context file update
- outbound communication
- lender submission
- compliance completion
- relationship merge
- canonical lender rule change

---

## 7. Database Mapping

MWP workspaces can be filesystem-first for MVP and database-indexed later.

Recommended tables:

```sql
CREATE TABLE mix_workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_key text UNIQUE NOT NULL,
  title text NOT NULL,
  workspace_type text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  opportunity_id uuid REFERENCES mix_opportunities(id),
  contact_id uuid,
  organization_id uuid,
  current_stage text,
  current_gate text,
  filesystem_path text,
  owner_user_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE mix_workspace_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES mix_workspaces(id),
  file_path text NOT NULL,
  file_type text NOT NULL,
  status text DEFAULT 'draft',
  content_sha text,
  last_reviewed_at timestamptz,
  reviewer_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE mix_review_gates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES mix_workspaces(id),
  gate_type text NOT NULL,
  status text NOT NULL DEFAULT 'open',
  required_role text,
  decision text,
  decision_notes text,
  decided_by uuid,
  decided_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE mix_learning_candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES mix_workspaces(id),
  source_type text NOT NULL,
  candidate_type text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'draft',
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);
```

---

## 8. Agent Types in the OS

### Research agents

Gather raw material.

Examples:

- inbox import
- call transcript extraction
- document parsing
- lender rate sheet parsing
- market/news monitoring

### Intelligence agents

Turn raw material into reusable context.

Examples:

- borrower profile builder
- lender criteria normalizer
- relationship graph updater
- compliance intake normalizer

### Opportunity agents

Find actionable opportunities.

Examples:

- renewal opportunity detector
- refinance signal detector
- cross-sell detector
- referral reactivation detector
- AML/document gap detector

### Strategy agents

Recommend routes.

Examples:

- smart placement agent
- borrower communication strategy
- lender route planner
- deal rescue planner

### Execution agents

Prepare action artifacts.

Examples:

- task creation
- draft email/SMS
- lender package builder
- broker review packet
- wiki publisher

---

## 9. Review Gate Philosophy

MIX should automate preparation, not professional accountability.

Review gates protect:

- client trust
- regulatory compliance
- lender relationships
- borrower privacy
- broker license risk
- data quality
- business asset value

Default rule:

```text
AI may prepare. Broker approves. System records.
```

---

## 10. MVP Build Plan

### Phase 1 — Filesystem OS

- Add `/workspaces` directory.
- Add one example workspace.
- Add workspace template files.
- Add Copilot agent contract.
- Add review gate definitions.

### Phase 2 — Dashboard integration

- Add Workspaces tab or Docs subtab.
- Show workspace status, current gate, open actions, and last Copilot run.
- Link opportunities to workspaces.

### Phase 3 — Database indexing

- Add `mix_workspaces`, `mix_workspace_files`, `mix_review_gates`, and `mix_learning_candidates`.
- Store filesystem path + status in Supabase.
- Keep markdown as human-readable context source.

### Phase 4 — Copilot actions

- Add `/api/mix/copilot/run`.
- Add action types:
  - summarize workspace
  - detect missing context
  - generate strategy
  - create review packet
  - draft borrower message
  - draft lender memo
  - propose learning candidate

### Phase 5 — Learning loop

- Approved outputs become knowledge assets.
- Approved lender insights become lender criteria candidates.
- Approved process improvements update workflow specs.

---

## 11. Success Metrics

- time from raw lead to strategy memo
- percentage of files with current workspace context
- percentage of actions routed through review gates
- number of reusable learnings captured
- broker task completion rate
- reduction in missing documents before submission
- increase in funded volume from existing relationships
- percentage of agent recommendations accepted or edited

---

## 12. Operating Principle

MIX is not a prompt library.

MIX is a governed mortgage execution environment where context, intelligence, decisions, review, and action become reusable practice assets.

The Copilot should always make the broker more informed, faster, and more accountable — never detached from the decision.
