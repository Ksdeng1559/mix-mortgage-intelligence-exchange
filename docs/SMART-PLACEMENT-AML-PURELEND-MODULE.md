# MIX Module — Smart Placement + AML Compliance + Document Intelligence

## Status

Proposed production module for MIX — Mortgage Intelligence Exchange.

This module combines three workflows that should operate together but remain clearly separated for governance:

1. **Mortgage Smart Placement** — borrower scenario intake, underwriting fit, lender/program ranking, and placement strategy.
2. **AML / FINTRAC Compliance Intake** — post-consent identity, occupation, source-of-funds, third-party, PEP/HIO, jurisdiction, and risk-tier capture.
3. **Document Intelligence** — Purelend-inspired borrower document collection, organization, verification, income review, down-payment sourcing, fraud/anomaly flagging, and lender-ready packaging.

MIX remains the system of record and broker command center. The AI layer may recommend, summarize, extract, classify, and flag. It must not provide final underwriting approval, legal advice, compliance clearance, or autonomous lender submission.

---

## Product Definition

### Product name

**MIX Smart Placement & Compliance Intelligence Module**

### Purpose

Help a mortgage broker move from lead intake to lender-ready strategy faster by connecting borrower fit, compliance readiness, and document evidence in one auditable workflow.

The module exists to answer four questions:

1. **Can this borrower likely qualify?**
2. **Where should the file be placed first: A, Alt-A, B, Private, Reverse, or Specialty?**
3. **Is the file compliance-ready enough to proceed?**
4. **What document gaps, income issues, down-payment issues, or risk flags must be resolved before submission?**

### Strategic fit inside MIX

MIX already positions itself as a Relationship Asset Management and Opportunity Intelligence platform. This module adds the missing bridge between opportunity discovery and executable mortgage placement.

```text
Relationship / Lead
  -> Opportunity
  -> Intake
  -> Smart Placement
  -> AML / Compliance Checkpoint
  -> Document Intelligence
  -> Lender Match
  -> Broker Review
  -> Submission Package
  -> Funded / Declined / Nurture
```

---

## Core Workflow

### Stage 1 — Lead qualification

Purpose: determine whether the lead is worth moving into application workflow.

Capture:

- full name
- phone
- email
- mortgage purpose
- property city/province
- property type
- approximate mortgage amount
- down payment or equity amount
- employment type
- stated income range
- credit band
- timeline
- consent to proceed to application

Output:

```json
{
  "lead_status": "qualified | nurture | not_fit",
  "mortgage_type": "purchase | refinance | renewal | reverse | construction | commercial | other",
  "next_step": "application_consent | nurture_sequence | broker_review",
  "confidence": 0.0
}
```

### Stage 2 — Smart Placement intake

Purpose: normalize the borrower scenario into a placement-ready profile.

Capture:

- credit score / credit band
- GDS / TDS if known
- LTV estimate
- down payment source
- income types
- self-employed status
- incorporated / sole proprietor / commission / rental / pension / investment income
- NOA income vs actual cash flow
- retained earnings / shareholder loans where applicable
- property type
- location restrictions
- strata / lease land / rural / acreage / commercial-use flags
- desired amortization
- urgency / closing date

Placement categories:

- A lender
- Alt-A
- B lender
- Private
- Reverse mortgage
- Construction / development capital
- Specialty manual review

### Stage 3 — Consent checkpoint

AML questions should only begin after the borrower agrees to proceed with a mortgage application.

Required consent record:

```json
{
  "application_consent": true,
  "consent_timestamp": "ISO-8601",
  "consent_channel": "voice | web | sms | email | broker_entered",
  "consent_script_version": "aml-intake-v1"
}
```

If consent is refused or unclear, stop AML intake and tag the file:

```text
application_not_started
aml_not_collected
broker_follow_up_required
```

### Stage 4 — AML / FINTRAC compliance intake

Purpose: collect structured information for broker review and compliance file completion.

Question blocks:

1. Identity
2. Occupation and income
3. Source of funds
4. Third-party involvement
5. PEP / HIO / family member / close associate exposure
6. Jurisdiction and international exposure
7. Mortgage purpose and use of funds
8. Accuracy confirmation

The system may create a recommended risk tier, but the broker or compliance reviewer makes the final decision.

Risk tiers:

- `low`
- `medium`
- `high_manual_review`

Automatic manual review triggers:

- foreign PEP / HIO exposure
- refusal to answer required compliance questions
- unexplained third-party funding
- inconsistent identity details
- offshore accounts or material international exposure
- unusual or unsupported source of funds
- suspected document alteration or fraud signal

### Stage 5 — Document Intelligence layer

Purpose: organize borrower documents, verify document completeness, extract key facts, compare stated answers to evidence, and prepare a cleaner submission package.

Purelend-inspired feature set:

- borrower document collection checklist
- smart document matching against file requirements
- automatic document organization, naming, and PDF conversion
- income verification and usable income calculation
- business-for-self income review from 12+ months of bank statements
- down-payment verification and 90-day source-of-funds trail
- large deposit detection and explanation tracking
- liability confirmation
- missing-page, expired-document, redaction, screenshot, and anomaly detection
- multi-borrower document separation
- lender-ready summary report
- compliance/audit trail for broker review

MIX should treat Purelend as a category benchmark, not as a dependency. If Purelend is integrated later, it should be via a broker-authorized workflow and not assumed to provide API access unless an official integration exists.

### Stage 6 — Smart Placement scoring

The placement engine uses hard eligibility filters first, then weighted ranking.

Hard filters:

- minimum credit score
- maximum LTV
- maximum GDS/TDS
- accepted property type
- accepted income type
- geography restrictions
- reverse mortgage age/product constraints
- construction or private lending constraints
- compliance blockers

Soft scoring:

- lender fit
- documentation strength
- income confidence
- down-payment traceability
- closing urgency
- relationship strength with lender / BDM
- historical approval likelihood
- file complexity
- compensation estimate
- borrower experience fit

Example output:

```json
{
  "placement_recommendation": {
    "primary_channel": "Alt-A",
    "secondary_channel": "B",
    "fallback_channel": "Private",
    "recommended_lenders": [
      {
        "lender_id": "uuid",
        "program_id": "uuid",
        "fit_score": 86,
        "confidence": 0.78,
        "reasons": [
          "BFS income accepted",
          "LTV inside program tolerance",
          "Down payment mostly sourced"
        ],
        "conditions_to_resolve": [
          "Explain two large deposits",
          "Upload 2025 NOA",
          "Confirm shareholder loan treatment"
        ]
      }
    ]
  }
}
```

---

## Required MIX Data Objects

### New or extended tables

```sql
-- Smart Placement profile normalized from intake + documents
CREATE TABLE mix_smart_placement_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES mix_opportunities(id),
  borrower_profile jsonb NOT NULL DEFAULT '{}',
  property_profile jsonb NOT NULL DEFAULT '{}',
  income_profile jsonb NOT NULL DEFAULT '{}',
  credit_profile jsonb NOT NULL DEFAULT '{}',
  down_payment_profile jsonb NOT NULL DEFAULT '{}',
  requested_product text,
  recommended_channel text,
  fallback_channel text,
  placement_score numeric,
  confidence numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- AML / FINTRAC intake record
CREATE TABLE mix_aml_intakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES mix_opportunities(id),
  consent_confirmed boolean DEFAULT false,
  consent_timestamp timestamptz,
  legal_name text,
  date_of_birth date,
  residential_address text,
  canada_resident boolean,
  id_type text,
  occupation text,
  employer text,
  employment_status text,
  income_source text,
  fund_source text,
  third_party_involved boolean,
  third_party_details jsonb DEFAULT '{}',
  pep_status text,
  hio_status text,
  pep_family_or_associate boolean,
  international_exposure jsonb DEFAULT '{}',
  mortgage_purpose text,
  use_of_funds text,
  accuracy_confirmed boolean DEFAULT false,
  risk_tier text,
  risk_score numeric,
  review_required boolean DEFAULT true,
  reviewer_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Document intelligence result record
CREATE TABLE mix_document_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES mix_opportunities(id),
  document_type text,
  borrower_id uuid,
  storage_path text,
  extracted_facts jsonb DEFAULT '{}',
  completeness_status text,
  anomaly_flags jsonb DEFAULT '[]',
  income_findings jsonb DEFAULT '{}',
  down_payment_findings jsonb DEFAULT '{}',
  review_status text DEFAULT 'draft',
  reviewer_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ranked lender/program recommendations
CREATE TABLE mix_placement_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  opportunity_id uuid REFERENCES mix_opportunities(id),
  lender_id uuid REFERENCES mix_lenders(id),
  program_id uuid REFERENCES mix_lender_programs(id),
  rank integer,
  fit_score numeric,
  confidence numeric,
  recommendation_type text,
  reasons jsonb DEFAULT '[]',
  conditions_to_resolve jsonb DEFAULT '[]',
  human_decision text,
  human_decision_notes text,
  created_at timestamptz DEFAULT now()
);
```

---

## Agent Execution Contract

### Objective

Produce an auditable borrower placement and compliance-readiness recommendation for broker review.

### Role

The agent is a mortgage file preparation assistant. It extracts, classifies, ranks, and flags. It does not approve, decline, submit, or provide legal/compliance clearance.

### Scope

Allowed:

- read opportunity records
- read borrower intake answers
- read uploaded document metadata and extracted facts
- read lender/program rules
- read workspace-approved mortgage context
- write draft placement recommendations
- write AML risk flags
- write document gap tasks
- write broker review tasks

Not allowed:

- auto-submit to lenders
- auto-send compliance statements to borrowers
- override broker decisions
- clear a high-risk AML file
- alter immutable audit logs
- make final lending or legal determinations

### Required context

- `context/mortgage/SIP.json`
- lender criteria from `mix_lenders` and `mix_lender_programs`
- opportunity profile from `mix_opportunities`
- uploaded document review records
- AML intake record
- workspace BUSINESS / ICP / GTM / MARKET context where relevant

### Procedure

1. Load opportunity and borrower intake data.
2. Validate whether application consent exists before AML processing.
3. Normalize borrower, property, income, credit, and down-payment facts.
4. Run AML question completeness check.
5. Assign preliminary AML risk tier and identify manual review triggers.
6. Check document completeness and document anomaly flags.
7. Apply hard lender/program eligibility rules.
8. Rank viable lender/program options by fit score and confidence.
9. Generate broker-facing placement narrative.
10. Create conditions-to-resolve list.
11. Write recommendations and review tasks to Supabase.
12. Log agent run with context versions and evidence references.

### Output contract

```json
{
  "opportunity_id": "uuid",
  "application_readiness": "ready_for_broker_review | missing_docs | compliance_review_required | not_ready",
  "aml": {
    "consent_confirmed": true,
    "risk_tier": "low | medium | high_manual_review",
    "review_required": true,
    "risk_flags": []
  },
  "documents": {
    "completeness_status": "complete | incomplete | review_required",
    "missing_documents": [],
    "anomaly_flags": []
  },
  "placement": {
    "primary_channel": "A | Alt-A | B | Private | Reverse | Construction | Specialty",
    "fallback_channel": "A | Alt-A | B | Private | Reverse | Construction | Specialty",
    "recommendations": []
  },
  "broker_tasks": [],
  "confidence": 0.0
}
```

### Human controls

Human review is mandatory when:

- AML risk tier is `medium` or `high_manual_review`
- required ID or source-of-funds answers are missing
- document anomaly flags exist
- lender/program rule confidence is below threshold
- borrower scenario involves reverse mortgage, private lending, construction financing, commercial use, foreign income, complex BFS income, or third-party funds
- agent recommends any lender submission action

---

## Dashboard Placement

Recommended UI placement:

- Add a new **Placement** tab or expand the existing **Pipeline** detail drawer.
- Add compliance state badges to pipeline cards.
- Add document-readiness state to each opportunity.
- Add Smart Placement card inside opportunity detail.

Suggested opportunity badges:

```text
Placement: A Fit / Alt-A Fit / B Fit / Private / Reverse / Specialty Review
AML: Not Started / Low / Medium Review / High Review
Docs: Missing / Reviewing / Lender-Ready
Submission: Draft / Broker Review / Ready / Submitted
```

---

## MVP Build Sequence

### Phase 1 — Documentation and schema

- Add this module spec.
- Add agent spec.
- Add migration for `mix_smart_placement_profiles`, `mix_aml_intakes`, `mix_document_reviews`, and `mix_placement_recommendations`.

### Phase 2 — Broker-entered intake

- Manual intake form for smart placement fields.
- Manual AML answer capture after consent.
- Manual document checklist status.

### Phase 3 — AI extraction and matching

- Extract document facts from uploaded PDFs/images.
- Compare stated answers against document evidence.
- Generate ranked lender/program recommendations.

### Phase 4 — Voice and portal intake

- Voice Intake Agent asks lead questions.
- AML Voice Agent asks compliance questions after consent.
- Borrower portal collects documents and shows missing items.

### Phase 5 — Purelend-style automation benchmark

- Automate document organization and naming.
- Automate income and down-payment review.
- Generate lender-ready document report.
- Add anomaly and fraud-signal review queue.

---

## Success Metrics

- Time from lead to placement recommendation
- Percentage of files with complete AML intake before submission
- Percentage of files with complete document checklist before lender submission
- Reduction in broker manual document review time
- Number of lender conditions prevented before submission
- Placement recommendation acceptance rate by broker
- Funded volume attributed to Smart Placement module
- Manual review accuracy and false-positive rate for compliance flags

---

## Governance Principle

This module should make the broker faster and more consistent, not less accountable.

Every recommendation must show:

- facts used
- source record or document reference
- lender rule used
- confidence level
- unresolved conditions
- human reviewer action

The output is a broker decision-support artifact, not an autonomous mortgage approval or compliance clearance system.
