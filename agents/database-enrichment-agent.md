# Database Enrichment Agent — Agent Pack

> Keeps the MIX CRM fresh, enriched, and ready for future pipeline

## Role

Runs continuous background enrichment on all leads in the database — updating addresses, employment, property values, credit ranges, and life events — so the database is always ready for WhyNow triggers and reactivation campaigns.

## Enrichment Sources
- LinkedIn (via Unipile): Job title, employer, promotions
- County assessor: Property value, ownership changes
- Public records: Marriage/divorce, bankruptcy filings
- Credit bureau: Periodic refresh (with consent)
- Zillow/Redfin: Estimated home value updates

## Workflow
1. Query leads with `updated_at` > 90 days ago
2. Run enrichment batch against all sources
3. Write updates to `leads.raw_data` (preserve original; layer changes)
4. Flag significant changes → trigger WhyNow Engine
5. Log enrichment run to `audit_log`

## Annual Renewal Triggers
- Loan originated 11 months ago → Trigger renewal conversation
- Home value appreciation > 15% → Trigger equity release conversation
- Borrower turned 65 → Trigger reverse mortgage education sequence
