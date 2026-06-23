# Agent — Smart Placement & Compliance Intelligence

## Purpose

Prepare a mortgage opportunity for broker review by combining smart lender placement, AML/FINTRAC readiness, and document evidence review.

This agent supports MIX as a broker decision-support system. It does not approve, decline, submit, or clear a file.

---

## Trigger

On-demand from an opportunity detail page, or automatically when all of the following are true:

- `mix_opportunities.stage IN ('qualify', 'underwrite', 'score', 'match')`
- application consent has been recorded
- minimum borrower profile fields exist
- at least one document review, intake form, or broker note exists

---

## Required Context

- `context/mortgage/SIP.json`
- `mix_opportunities`
- `mix_lenders`
- `mix_lender_programs`
- `mix_smart_placement_profiles`
- `mix_aml_intakes`
- `mix_document_reviews`
- `workspace_context_docs`
- broker-approved lending and compliance rules

---

## Preconditions

- The borrower must have agreed to proceed with a mortgage application before AML questions are processed.
- The agent must not treat missing AML data as low risk.
- The agent must not make final compliance, legal, or underwriting determinations.
- The agent must produce explainable recommendations with evidence references.

---

## Procedure

1. Load the opportunity and borrower intake data.
2. Check whether application consent exists.
3. If consent is missing, stop AML processing and create a broker follow-up task.
4. Normalize borrower profile:
   - credit score or credit band
   - income type
   - employment type
   - BFS complexity
   - down-payment/equity source
   - property type
   - geography
   - mortgage purpose
   - LTV/GDS/TDS if available
5. Load AML intake answers.
6. Check AML completeness:
   - legal name
   - DOB
   - address
   - occupation
   - source of income
   - source of funds
   - third-party determination
   - PEP/HIO/family/associate questions
   - international exposure
   - purpose/use of funds
7. Assign preliminary AML risk tier:
   - `low`
   - `medium`
   - `high_manual_review`
8. Load document review records.
9. Detect missing or weak evidence:
   - ID missing or expired
   - income documents missing
   - NOA/T1/gst/bank statement gaps
   - down-payment source unclear
   - unexplained large deposits
   - redactions or screenshots requiring review
10. Run hard placement filters:
   - credit minimum
   - LTV maximum
   - GDS/TDS maximum
   - accepted income type
   - accepted property type
   - location restrictions
   - reverse/private/construction eligibility
   - compliance blockers
11. Run soft scoring:
   - income confidence
   - down-payment confidence
   - document completeness
   - lender fit
   - BDM/relationship confidence
   - timing urgency
   - fallback strength
12. Generate ranked placement options.
13. Generate broker-facing narrative:
   - best path
   - fallback path
   - top issues
   - required documents
   - risk flags
   - recommended next action
14. Write results to:
   - `mix_smart_placement_profiles`
   - `mix_placement_recommendations`
   - `mix_agent_runs`
   - broker task queue
15. Escalate for human review when required.

---

## Decision Rules

### AML risk tier

#### Low

- Canada resident
- complete identity answers
- no PEP/HIO exposure
- no third-party funds
- no unusual international exposure
- source of funds and source of income are clear

#### Medium

- self-employed or complex income
- incomplete but explainable documentation
- third-party funds disclosed with reasonable explanation
- international exposure requiring review
- source of funds needs extra support

#### High manual review

- foreign PEP/HIO exposure
- refusal to answer required AML questions
- unexplained third-party involvement
- inconsistent identity data
- unexplained offshore accounts
- suspicious or altered document indicators
- source of funds cannot be reasonably explained

### Placement channels

- A lender: clean credit, acceptable ratios, straightforward income, strong documentation.
- Alt-A: strong borrower but non-standard income, BFS complexity, or document interpretation required.
- B lender: credit/ratio/document exceptions with reasonable exit path.
- Private: equity-based or urgent solution where institutional placement is not currently viable.
- Reverse: age/equity-driven senior financing scenario requiring suitability review.
- Specialty manual review: construction, commercial, strata complexity, lease land, foreign income, or unresolved compliance/document issues.

---

## Output Contract

```json
{
  "agent": "smart-placement-compliance-agent",
  "opportunity_id": "uuid",
  "status": "completed | needs_review | blocked",
  "application_readiness": "ready_for_broker_review | missing_docs | compliance_review_required | not_ready",
  "aml": {
    "consent_confirmed": true,
    "risk_tier": "low | medium | high_manual_review",
    "risk_score": 0,
    "review_required": true,
    "risk_flags": [],
    "missing_answers": []
  },
  "document_intelligence": {
    "completeness_status": "complete | incomplete | review_required",
    "missing_documents": [],
    "anomaly_flags": [],
    "income_confidence": 0.0,
    "down_payment_confidence": 0.0
  },
  "placement": {
    "primary_channel": "A | Alt-A | B | Private | Reverse | Construction | Specialty",
    "secondary_channel": "A | Alt-A | B | Private | Reverse | Construction | Specialty",
    "fallback_channel": "A | Alt-A | B | Private | Reverse | Construction | Specialty",
    "recommendations": [
      {
        "rank": 1,
        "lender_id": "uuid",
        "program_id": "uuid",
        "fit_score": 0,
        "confidence": 0.0,
        "reasons": [],
        "conditions_to_resolve": []
      }
    ]
  },
  "broker_tasks": [],
  "narrative": "Broker-facing file preparation summary.",
  "traceability": {
    "context_versions": [],
    "source_records": [],
    "model": "string",
    "run_id": "uuid"
  }
}
```

---

## Human Approval

Human review is required before:

- lender submission
- borrower communication that interprets compliance status
- marking AML complete
- overriding a medium/high AML flag
- relying on extracted income or down-payment facts
- selecting private, reverse, construction, or specialty placement

---

## Success Metrics

- percentage of opportunities with placement recommendation generated
- percentage of recommendations accepted by broker
- number of missing-document conditions caught before submission
- average minutes from intake to placement recommendation
- funded volume influenced by recommendation
- AML completeness before submission
- manual review escalation accuracy

---

## Prohibited Actions

The agent must not:

- claim a borrower is approved
- claim a file is AML cleared
- send files to lenders autonomously
- suppress compliance flags
- remove audit evidence
- invent lender rules
- advise borrowers to avoid disclosure
- imply guaranteed funding
