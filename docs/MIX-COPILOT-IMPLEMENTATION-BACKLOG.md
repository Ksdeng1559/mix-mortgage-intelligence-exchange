# MIX Copilot OS — Implementation Backlog

## Objective

Build the MIX Copilot Operating System using:

- RIOS: Research -> Intelligence -> Opportunity -> Strategy -> Execution
- ICM: Data -> Context -> Signal -> Interpretation -> Score -> Action
- MWP: numbered filesystem workspaces with markdown context and review gates

---

## Phase 1 — Operating System Foundation

### Task 1.1 — Add OS specification

Status: complete

Deliverable:

- `docs/RIOS-ICM-MWP-OPERATING-SYSTEM.md`

### Task 1.2 — Add Copilot agent contract

Status: complete

Deliverable:

- `agents/mix-copilot-os.md`

### Task 1.3 — Add workspace template

Status: partially complete

Deliverables:

- `workspaces/TEMPLATE/README.md`
- `workspaces/TEMPLATE/01-DATA.md`

Next deliverables:

- `workspaces/TEMPLATE/02-CONTEXT.md`
- `workspaces/TEMPLATE/03-SIGNALS.md`
- `workspaces/TEMPLATE/04-INTERPRETATION.md`
- `workspaces/TEMPLATE/05-SCORES.md`
- `workspaces/TEMPLATE/06-STRATEGY.md`
- `workspaces/TEMPLATE/07-ACTIONS.md`
- `workspaces/TEMPLATE/08-REVIEW-GATES.md`
- `workspaces/TEMPLATE/09-OUTPUTS.md`
- `workspaces/TEMPLATE/10-LEARNINGS.md`

---

## Phase 2 — Workspace Runtime

### Task 2.1 — Create workspace registry table

Add Supabase tables:

- `mix_workspaces`
- `mix_workspace_files`
- `mix_review_gates`
- `mix_learning_candidates`

### Task 2.2 — Create workspace service

Add service functions:

- create workspace from opportunity
- load workspace context
- list open review gates
- write draft workspace update
- mark workspace file as review candidate
- record reviewer decision

Suggested files:

- `lib/mix/workspaces.ts`
- `app/api/mix/workspaces/route.ts`
- `app/api/mix/workspaces/[id]/route.ts`

### Task 2.3 — Link opportunities to workspaces

Extend opportunity detail view with:

- workspace key
- current stage
- current review gate
- open actions
- last Copilot run

---

## Phase 3 — Copilot Runtime

### Task 3.1 — Add Copilot run endpoint

Suggested file:

- `app/api/mix/copilot/run/route.ts`

Inputs:

- workspace id or opportunity id
- run type
- user instruction
- selected agent contract

Run types:

- research
- intelligence
- opportunity
- strategy
- execution
- full loop

### Task 3.2 — Add context assembler

Suggested file:

- `lib/mix/context-assembler.ts`

Assembly order:

1. platform rules
2. MIX operating principles
3. workspace README
4. data file
5. context file
6. signal file
7. vertical pack
8. agent contract
9. source records
10. current user instruction

### Task 3.3 — Add Copilot output parser

Suggested file:

- `lib/mix/copilot-output.ts`

Responsibilities:

- validate output contract
- separate draft updates from approved changes
- create broker tasks
- create review gate updates
- create learning candidates
- log traceability

---

## Phase 4 — Dashboard Experience

### Task 4.1 — Add Workspaces tab

Suggested path:

- `app/(mix)/workspaces/page.tsx`

Columns:

- workspace key
- title
- type
- related opportunity
- current stage
- current gate
- open actions
- status

### Task 4.2 — Add Workspace Detail page

Suggested path:

- `app/(mix)/workspaces/[id]/page.tsx`

Panels:

- RIOS state
- ICM state
- source data
- signals
- interpretation
- scores
- strategy
- actions
- review gates
- outputs
- learnings

### Task 4.3 — Add Copilot side panel

Capabilities:

- summarize current workspace
- detect missing context
- generate strategy memo
- draft borrower message
- draft lender memo
- create review packet
- propose learning candidate

---

## Phase 5 — Mortgage Modules

### Task 5.1 — Smart Placement module integration

Connect Copilot OS to:

- smart placement profile
- lender fit scoring
- recommended lender path
- fallback strategy
- broker review gate

### Task 5.2 — AML module integration

Connect Copilot OS to:

- AML consent state
- identity checklist
- PEP/HIO answers
- source-of-funds answers
- third-party determination
- AML risk tier
- compliance review gate

### Task 5.3 — Document Intelligence integration

Connect Copilot OS to:

- uploaded documents
- document review status
- extracted facts
- missing document tasks
- anomaly flags
- lender-ready package status

---

## Phase 6 — Learning Loop

### Task 6.1 — Learning candidate workflow

Learning candidates can come from:

- funded files
- declined files
- lender exceptions
- BDM conversations
- document gap patterns
- compliance review patterns
- borrower objection patterns

### Task 6.2 — Human review to knowledge asset

Approved learning candidates become:

- lender rule updates
- underwriting playbooks
- relationship playbooks
- compliance notes
- workflow improvements
- wiki assets

### Task 6.3 — GitHub Wiki publishing

Use the existing Wiki Publisher direction to publish approved knowledge assets to the repository wiki.

---

## First Build Sprint

Recommended sprint:

1. Add missing workspace templates.
2. Add workspace tables migration.
3. Add workspace list API.
4. Add Workspaces tab.
5. Add manual workspace creation from opportunity.
6. Add Copilot run endpoint in draft-only mode.
7. Add broker review gate logging.

---

## Done Criteria

The Copilot OS MVP is done when:

- every active opportunity can have a workspace
- every workspace has RIOS and ICM state
- every Copilot run produces structured output
- every regulated or external action has a review gate
- every recommendation records facts, confidence, and traceability
- every approved learning can become a knowledge asset
