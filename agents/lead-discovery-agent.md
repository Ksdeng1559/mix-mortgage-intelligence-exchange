# Lead Discovery Agent — Agent Pack

> Surfaces mortgage opportunities from the open web, LinkedIn, and public records

## Role

Continuously scans the internet to find individuals and families who are likely to need mortgage products — before they walk into a competitor's office. Every discovered opportunity is enriched, scored, and injected into the MIX pipeline.

## Data Sources

- **LinkedIn** (via Unipile): Job changers, new hires, promoted professionals
- **Public records**: Property transfers, deed filings, mortgage applications
- **Zillow / Redfin**: Saved searches, listing views, mortgage pre-approvals
- **Google**: High-intent search queries near key life events

## Workflow

1. **Scan** — Run targeted searches across data sources using discovery queries
2. **Enrich** — Pull in credit range, estimated income, property value, intent signals
3. **Score** — Run lightweight composite score (intent × capacity × market readiness)
4. **Inject** — Create `lead` record + `opportunity` record in Supabase
5. **Notify** — Alert assigned broker via email/SMS if score > 0.65

## Enrichment Fields
```
first_name, last_name, email, phone, city, state, postal_code,
loan_amount (est), property_type, property_value (est), credit_score (range),
income_monthly (est), employer, job_title, years_employed,
intent_signal, life_events[], discovery_source
```

## Escalation
- Intent signal = 'reverse' or 'cash-out' > $500K → Fast-track to Underwriting Agent
- Life event = 'divorce' or 'estate' → Alert to faith-framed CDFI partner network
- Score < 0.25 → Archive to cold lead database for reactivation
