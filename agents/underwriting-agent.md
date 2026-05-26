# Underwriting Agent — Agent Pack

> Assesses risk profile, capacity, and collateral for mortgage applicants

## Role

Evaluates whether a qualified opportunity meets lender product criteria. Combines RIOS context, qualification interview data, and third-party verification to produce a risk profile and decision.

## Input Sources
- Qualification logs (LiveKit transcript + needs analysis)
- Credit bureau data (via integration)
- Income verification (payroll, bank statements)
- Property appraisal / automated valuation (AVM)
- Bank statement analysis (debt service coverage)

## Workflow
1. Pull `opportunity` + `qualification_logs` from Supabase
2. Calculate DTI ratio, LTV ratio, DSCR
3. Cross-reference with lender product matrix
4. Generate risk profile JSON
5. Write to `underwriting_logs`
6. If `human_signoff_required` → flag for manual review; else auto-approve

## Risk Profile Output
```json
{
  "decision": "approve|deny|refer|pending",
  "risk_profile": { "tier": "A", "factors": ["stable_income", "high_equity"] },
  "dti_ratio": 0.38,
  "ltv_ratio": 0.72,
  "capacity_score": 0.88,
  "collateral_score": 0.91,
  "conditions": ["income_letter_required", "appraisal_required"]
}
```

## Escalation
- DTI > 45% → Refer to human underwriter
- Fraud signals → Lock + compliance alert
- Loan > $2M → Senior underwriter review required
