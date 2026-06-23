# MIX Prequalification Matrix

## Purpose

The Prequalification Matrix is the first structured borrower-screening layer inside MIX.

It sits before Smart Placement, AML intake, Document Intelligence, and lender submission strategy.

Its job is to answer:

```text
Is this borrower worth moving into a mortgage application workflow?
What channel is most likely?
What facts are missing?
What risks or blockers must be reviewed before spending broker time?
```

The matrix does not approve, decline, or provide final underwriting advice. It produces a preliminary broker-reviewable qualification view.

---

## Position in MIX Workflow

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

The matrix is the bridge between raw lead intake and a structured mortgage file.

---

## RIOS Mapping

| RIOS Stage | Prequalification Role |
|---|---|
| Research | collect borrower, property, credit, income, asset, and timeline facts |
| Intelligence | normalize the facts into a comparable qualification profile |
| Opportunity | determine whether there is a purchase, refinance, renewal, reverse, debt consolidation, or specialty opportunity |
| Strategy | recommend likely channel and missing data path |
| Execution | create broker tasks, application next step, or nurture path |

---

## ICM Mapping

| ICM Stage | Prequalification Role |
|---|---|
| Data | lead answers, CRM fields, call notes, form responses |
| Context | mortgage purpose, borrower type, property type, province, timing |
| Signal | credit issue, high LTV, BFS income, down-payment gap, urgency, senior borrower, complex property |
| Interpretation | likely A, Alt-A, B, private, reverse, or manual review path |
| Score | qualification score, urgency score, confidence score, blocker score |
| Action | request missing data, book broker call, move to application, route to nurture, escalate review |

---

## Core Matrix Dimensions

### 1. Mortgage purpose

| Input | Signal | Routing |
|---|---|---|
| Purchase | active transaction | pre-approval or live purchase workflow |
| Refinance | equity / debt consolidation / cash-out | refinance workflow |
| Renewal | maturity window | renewal intelligence workflow |
| Reverse mortgage | age/equity need | reverse mortgage suitability review |
| Construction | build/draw complexity | construction-capital workflow |
| Commercial / mixed-use | non-standard property/use | specialty review |
| Unknown | missing context | request clarification |

### 2. Borrower profile

| Input | Low friction | Review required |
|---|---|---|
| Canadian resident | yes | foreign residency / non-resident |
| Single borrower | simpler | multiple borrowers with complex ownership |
| Age | standard | senior borrower where reverse/suitability may apply |
| First-time buyer | program opportunity | missing down-payment support |
| Existing homeowner | refinance/equity opportunity | title/ownership complexity |

### 3. Income profile

| Input | Likely channel signal | Review notes |
|---|---|---|
| Salaried T4 | A lender possible | verify employment and income |
| Hourly / variable | A or Alt-A | need average income support |
| Commission | A or Alt-A | need 2-year average / lender rules |
| Self-employed sole proprietor | Alt-A/BFS review | NOA/T1/bank statements required |
| Incorporated BFS | Alt-A/BFS review | retained earnings/addbacks may matter |
| Rental income | investor/portfolio review | lease and tax treatment required |
| Pension / retirement | A/reverse possible | confirm sustainable income |
| Foreign income | specialty review | lender rules and currency risk |
| Cash income / undocumented | B/private likely | high documentation risk |
| No clear income | manual review | may not proceed without strategy |

### 4. Credit profile

| Credit band | Preliminary interpretation | Likely path |
|---|---|---|
| 760+ | strong | A lender likely if ratios fit |
| 700-759 | good | A lender likely if ratios fit |
| 650-699 | workable | A / Alt-A depending ratios and history |
| 600-649 | exception path | Alt-A / B likely |
| 550-599 | high friction | B / private / repair plan |
| Below 550 | major blocker | private / credit repair / manual review |
| Unknown | missing context | request credit estimate or consented pull |

### 5. Down payment / equity profile

| Source | Signal | Review level |
|---|---|---|
| Savings | clean if sourced | verify 90-day history |
| Sale proceeds | clean if documented | need sale agreement / statement |
| Gift | acceptable with documentation | third-party and gift letter review |
| Borrowed funds | higher risk | lender-specific treatment |
| Business funds | BFS complexity | verify business impact/source |
| Crypto / unusual asset | manual review | source-of-funds review |
| Cash deposit | compliance/document risk | explanation required |
| Unknown | blocker | request source of funds |

### 6. Property profile

| Property type | Routing |
|---|---|
| Detached / townhome / condo | standard placement possible |
| Strata | strata document review may apply |
| Rural / acreage | lender/property review required |
| Leasehold | specialty lender review |
| Rental property | investor / DSCR / rental-income review |
| Mixed-use | specialty/manual review |
| Construction | construction-capital workflow |
| Commercial | commercial/specialty workflow |
| Private sale | enhanced document review |

### 7. Ratio / affordability profile

| Input | Interpretation |
|---|---|
| GDS/TDS within A guidelines | A lender possible |
| Slightly above A guidelines | Alt-A or exception review |
| Materially above A guidelines | B/private/manual review |
| Unknown ratios | calculate estimate before placement |
| Stated payment comfort below required payment | borrower education / budget review |

### 8. Timeline and urgency

| Timeline | Routing |
|---|---|
| 90+ days | nurture / pre-approval / planning |
| 30-90 days | active prequalification |
| 14-30 days | urgent review |
| Under 14 days | urgent broker escalation |
| Subject removal pending | high urgency |
| Renewal within 120 days | renewal workflow |
| Renewal within 30 days | urgent renewal workflow |

### 9. Compliance / risk pre-screen

This is not full AML. It only identifies whether the file may need compliance attention if the borrower proceeds.

| Signal | Action |
|---|---|
| third-party funds mentioned | flag for later AML/source-of-funds review |
| politically exposed person mentioned | flag for later PEP/HIO review |
| foreign residency or foreign accounts | flag for jurisdiction review |
| large cash contribution | flag for source-of-funds review |
| unclear source of funds | request clarification before application |
| borrower refuses basic identity/contact info | manual broker review |

Full AML questions begin only after application consent.

---

## Prequalification Score

Recommended scoring range: 0-100.

| Score | Meaning | Action |
|---|---|---|
| 80-100 | strong prequalification | move to application consent and document collection |
| 65-79 | workable | broker review or request missing documents |
| 45-64 | possible but complex | manual strategy review required |
| 25-44 | weak fit | nurture, repair plan, or specialty/private review |
| 0-24 | not currently actionable | decline/nurture with broker-approved language |

---

## Matrix Output Contract

```json
{
  "opportunity_id": "uuid",
  "prequalification_status": "strong | workable | complex_review | weak_fit | not_actionable",
  "recommended_next_step": "application_consent | broker_review | request_missing_data | nurture | specialty_review",
  "likely_channel": "A | Alt-A | B | Private | Reverse | Construction | Commercial | Specialty | Unknown",
  "score": 0,
  "confidence": 0.0,
  "known_facts": {
    "mortgage_purpose": "string",
    "borrower_profile": {},
    "income_profile": {},
    "credit_profile": {},
    "down_payment_profile": {},
    "property_profile": {},
    "timeline": "string"
  },
  "missing_facts": [],
  "positive_signals": [],
  "risk_signals": [],
  "blockers": [],
  "broker_tasks": [],
  "review_gates": []
}
```

---

## Recommended Database Object

```sql
CREATE TABLE mix_prequalification_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES mix_opportunities(id),
  mortgage_purpose text,
  borrower_profile jsonb NOT NULL DEFAULT '{}',
  income_profile jsonb NOT NULL DEFAULT '{}',
  credit_profile jsonb NOT NULL DEFAULT '{}',
  down_payment_profile jsonb NOT NULL DEFAULT '{}',
  property_profile jsonb NOT NULL DEFAULT '{}',
  affordability_profile jsonb NOT NULL DEFAULT '{}',
  timeline_profile jsonb NOT NULL DEFAULT '{}',
  risk_prescreen jsonb NOT NULL DEFAULT '{}',
  likely_channel text,
  prequalification_status text,
  score numeric,
  confidence numeric,
  missing_facts jsonb NOT NULL DEFAULT '[]',
  risk_signals jsonb NOT NULL DEFAULT '[]',
  blockers jsonb NOT NULL DEFAULT '[]',
  recommended_next_step text,
  broker_notes text,
  review_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

---

## UI Placement

Recommended UI locations:

1. Opportunity detail drawer
2. Workspace detail page
3. Pipeline card badge
4. Copilot run result panel

Suggested badges:

```text
Prequal: Strong / Workable / Complex / Weak / Not Actionable
Likely Path: A / Alt-A / B / Private / Reverse / Specialty
Missing: Income / Credit / Down Payment / Property / Timeline
Review: Broker / Compliance Later / Specialty
```

---

## Integration with Smart Placement

The Prequalification Matrix should feed Smart Placement, but not replace it.

```text
Prequalification Matrix = early screen and route
Smart Placement = deeper lender/program strategy
Document Intelligence = evidence verification
AML Intake = compliance workflow after application consent
```

Prequalification can recommend likely path. Smart Placement ranks actual lender/program options.

---

## Human Review Rules

Human review is required when:

- score is below 65 but the borrower wants to proceed
- income is BFS, foreign, cash-heavy, or unclear
- down payment source is unclear or third-party funded
- property is construction, commercial, mixed-use, rural, leasehold, or strata-complex
- credit band is below 650
- urgency is under 14 days
- reverse mortgage or senior borrower suitability concerns exist
- compliance risk pre-screen flags exist
- the system recommends not actionable / weak fit language

---

## Claude Code / Codex Implementation Prompt

```text
Read docs/MIX-PREQUALIFICATION-MATRIX.md, docs/SMART-PLACEMENT-AML-PURELEND-MODULE.md, and agents/mix-copilot-os.md.
Implement the Prequalification Matrix as a draft-only borrower screening layer.
Add a migration for mix_prequalification_profiles, typed service functions, an API route, and a broker-facing PrequalificationMatrixPanel.
The matrix should produce status, likely channel, score, confidence, missing facts, risk signals, blockers, and recommended next step.
Do not approve or decline a mortgage automatically.
Do not start AML questions unless application consent exists.
All outputs are recommendations for broker review.
```

---

## Acceptance Criteria

- Prequalification record can be created from a lead or opportunity.
- Matrix output includes likely channel, score, confidence, missing facts, and blockers.
- Score below 65 creates broker review requirement.
- Compliance pre-screen flags are separated from full AML.
- Full AML intake remains post-consent only.
- Smart Placement can use the prequalification result as an input.
- Human review is required for complex, weak, or not-actionable files.
