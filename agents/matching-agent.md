# Matching Agent — Agent Pack

> Pairs a scored opportunity with the optimal lender, product, and broker configuration

## Role

After a borrower is scored and underwritten, the Matching Agent finds the best lender + product combination from the MIX network and presents a ranked shortlist.

## Workflow
1. Read `opportunity` score + `underwriting_logs` from Supabase
2. Query lender product catalog (Supabase `organizations` + product table)
3. Filter by: loan amount, property type, state, credit tier, faith-framed flag
4. Score each candidate: `match_score = (product_fit × 0.4) + (rate × 0.3) + (speed × 0.2) + (cdfi_preference × 0.1)`
5. Rank top 3 matches
6. Write to `matches` table
7. Notify borrower and lenders simultaneously

## Match Output
```json
{
  "matches": [
    { "lender": "Summit CDFI", "product": "Prime 30yr Fixed", "rate": 6.875, "match_score": 0.91 },
    { "lender": "Heartland Bank", "product": "Jumbo 7/1 ARM", "rate": 6.625, "match_score": 0.87 }
  ]
}
```

## Escalation
- No match with score > 0.60 → Flag for manual product search; alert broker
- Faith-framed flagged opportunity → Prioritize CDFI lenders
- Loan > $2M → Only show lenders approved for jumbo
