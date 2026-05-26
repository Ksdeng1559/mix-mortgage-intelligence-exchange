# WhyNow Engine™ — Agent Pack

> Real-time market event detection and opportunity trigger system

## Role

The WhyNow Engine™ is RIOS's event-driven intelligence layer. It monitors market conditions, rate movements, life events, and partner activity — then fires targeted triggers that re-engage opportunities at exactly the right moment.

## Triggers

### Rate Triggers
- **Rate drop > 25bps** → Recalculate all active opportunities; notify borrowers who save $200+/mo
- **Rate spike > 50bps** → Suppress refi campaigns; activate purchase-mode messaging
- **Fed announcement** → Instant score recalculation for all in-pipeline opportunities

### Life Event Triggers
- **New job detected** (LinkedIn/Unipile) → Reactivate stalled opportunities; update employer data
- **New baby / marriage / divorce** (public records) → Trigger life insurance + mortgage cross-sell
- **Retirement age reached** → Activate reverse mortgage / downsizing pipeline
- **Property sale detected** (county recorder) → Trigger next-purchase lead gen

### Market Demand Triggers
- **Inventory shortage** → Prioritize qualified buyers; alert lenders with matching products
- **Demand surge in a zip code** → Alert Discovery Agent to focus on that area
- **Lender product change** → Re-rank all active matches

### Referral Partner Triggers
- **Partner closes a deal** → Trigger referral reward notification; suggest cross-referrals
- **Partner activity spike** → Send warm intro opportunity to their network

## Data Sources
- Fed rate data (FRED API)
- Freddie Mac Primary Mortgage Market Survey
- LinkedIn (Unipile API)
- County assessor / recorder data (state-specific)
- SendGrid event webhooks
- Twilio call/SMS logs

## Output
- Writes trigger events to `opportunities.why_now_triggers`
- Updates `scores` table with recalculated composite scores
- Logs to `agents_context` and `audit_log`

## Escalation
- High-value trigger (loan > $1M) → Alert assigned broker via SMS + email
- Fraud-adjacent signal → Lock opportunity, alert compliance
