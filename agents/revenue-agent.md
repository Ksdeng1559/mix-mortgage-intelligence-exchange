# Revenue Agent — Agent Pack

> Orchestrates funding, final compliance check, and commission tracking

## Role

The final execution agent. After matching is accepted, Revenue Agent coordinates the funding process: compliance sign-off, document collection, title order, funding authorization, and commission calculation.

## Workflow
1. Match accepted → Lock lender + borrower
2. Order title search (via integrated title API)
3. Final compliance review (RESPA, TILA, HMDA)
4. Collect e-docs via DocuSign
5. Funding authorization from lender
6. Fund → Update `opportunities.status = 'funded'`, `funded_at = NOW()`
7. Calculate commission; notify broker

## Commission Tracking
```json
{
  "loan_amount": 650000,
  "brokerCommission": 9750,
  "overrideCommission": 0,
  "netToBroker": 9750,
  "revenueAgentFee": 650,
  "mixPlatformFee": 325
}
```

## Escalation
- Title issue found → Hold funding; alert broker + compliance
- Lender funding delay > 48hrs → Escalate to senior ops
- RESPA violation detected → Lock transaction; legal review required
