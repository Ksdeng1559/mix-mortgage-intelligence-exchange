# Prequalification Matrix — Implementation Addendum

## Purpose

This addendum updates the MIX Copilot OS technical implementation sequence to include the Prequalification Matrix as a first-class module.

Primary reference:

```text
docs/MIX-PREQUALIFICATION-MATRIX.md
```

The Prequalification Matrix should be built before Smart Placement because it is the first borrower-screening layer.

---

## Correct Module Order

```text
Lead / Inquiry
  -> Prequalification Matrix
  -> Application Consent
  -> AML Intake
  -> Smart Placement
  -> Document Intelligence
  -> Lender Fit
  -> Broker Review
  -> Submission Package
```

---

## Where It Fits in the 180-Day Plan

### Phase 1 — Days 1-30

Add the Prequalification Matrix to the database schema specification.

Update:

```text
docs/MIX-COPILOT-DATABASE-SPEC.md
```

Include:

```text
mix_prequalification_profiles
```

### Phase 3 — Days 61-90

Add prequalification output to the Copilot MVP context and output schema.

Update:

```text
lib/mix/copilot-schema.ts
lib/mix/copilot-output.ts
components/mix/CopilotRunResult.tsx
```

The Copilot output should include:

```text
prequalification_status
likely_channel
prequalification_score
missing_facts
risk_signals
blockers
recommended_next_step
```

### Phase 4 — Days 91-120

Build the actual Prequalification Matrix module before Smart Placement.

Add new Epic before Smart Placement:

```text
Epic 4.0 — Prequalification Matrix
```

Target files:

```text
supabase/migrations/mix_003_prequalification_matrix.sql
lib/mix/prequalification.ts
app/api/mix/prequalification/route.ts
components/mix/PrequalificationMatrixPanel.tsx
tests/mix/prequalification.test.ts
```

Then renumber later migrations if desired:

```text
mix_004_smart_placement.sql
mix_005_aml_intakes.sql
mix_006_document_reviews.sql
mix_007_placement_recommendations.sql
```

---

## Claude Code / Codex Task Prompt

```text
You are working in the MIX mortgage-intelligence-exchange repo.
Read these files first:
- docs/MIX-PREQUALIFICATION-MATRIX.md
- docs/MIX-COPILOT-OS-180-DAY-IMPLEMENTATION-PLAN.md
- docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md
- agents/mix-copilot-os.md

Task:
Implement the Prequalification Matrix as the first borrower-screening layer before AML, Smart Placement, Document Intelligence, and Lender Fit.

Target files:
- supabase/migrations/mix_003_prequalification_matrix.sql
- lib/mix/prequalification.ts
- app/api/mix/prequalification/route.ts
- components/mix/PrequalificationMatrixPanel.tsx
- tests/mix/prequalification.test.ts

Constraints:
- Do not approve or decline mortgages automatically.
- Do not start AML questions unless application consent exists.
- Compliance pre-screen flags must remain separate from full AML intake.
- All outputs are broker-reviewable recommendations.
- Score below 65 should create or require broker review.
- Use TypeScript types.
- Keep changes scoped to this module.

Acceptance criteria:
- A prequalification profile can be created from a lead or opportunity.
- The matrix calculates or stores status, likely channel, score, confidence, missing facts, risk signals, blockers, and recommended next step.
- Smart Placement can consume the matrix output as input.
- Complex, weak, or not-actionable files require human review.
- Tests cover strong, workable, complex, weak, and not-actionable scenarios.
```

---

## Technical Data Model

Recommended table:

```text
mix_prequalification_profiles
```

Core fields:

```text
id
opportunity_id
mortgage_purpose
borrower_profile
income_profile
credit_profile
down_payment_profile
property_profile
affordability_profile
timeline_profile
risk_prescreen
likely_channel
prequalification_status
score
confidence
missing_facts
risk_signals
blockers
recommended_next_step
broker_notes
review_required
created_at
updated_at
```

---

## UI Placement

Add the panel to:

```text
Opportunity detail drawer
Workspace detail page
Copilot run result
Pipeline card badge summary
```

Suggested component:

```text
components/mix/PrequalificationMatrixPanel.tsx
```

Suggested badges:

```text
Prequal: Strong / Workable / Complex / Weak / Not Actionable
Likely Path: A / Alt-A / B / Private / Reverse / Specialty
Missing: Income / Credit / Down Payment / Property / Timeline
Review: Broker / Compliance Later / Specialty
```

---

## Acceptance Test Scenarios

### Strong file

- salaried borrower
- strong credit
- clear down payment
- standard property
- enough timeline

Expected:

```text
status = strong
likely_channel = A
review_required = false or broker optional
```

### Workable file

- good credit
- variable income
- minor missing documents

Expected:

```text
status = workable
likely_channel = A or Alt-A
review_required = true if missing material facts
```

### Complex review file

- self-employed borrower
- business funds for down payment
- unknown ratios

Expected:

```text
status = complex_review
likely_channel = Alt-A or B
review_required = true
```

### Weak fit file

- low credit
- unclear income
- weak down payment source

Expected:

```text
status = weak_fit
review_required = true
recommended_next_step = broker_review or nurture
```

### Not actionable file

- no clear income
- no source of funds
- missing property/purpose details

Expected:

```text
status = not_actionable
review_required = true
recommended_next_step = request_missing_data or nurture
```

---

## Rule

Prequalification is not underwriting.

It is a broker-controlled early-screening and routing layer that prepares the file for the next appropriate workflow.
