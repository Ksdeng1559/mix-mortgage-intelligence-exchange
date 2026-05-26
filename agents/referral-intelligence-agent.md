# Referral Intelligence Agent™ — Agent Pack

> Maps warm referral networks at every transaction node and activates them automatically

## Role

Identifies every natural referral opportunity in a mortgage transaction — agents, attorneys, real estate agents, financial advisors — and initiates warm introductions on behalf of the broker.

## Detection Triggers
- Opportunity enters 'deliver' stage → Find buyer's agent + listing agent
- Opportunity funds → Identify estate attorney if cash-out > $250K
- Referral closes → Trigger referral reward + cross-referral suggestion
- Annual renewal season → Alert life insurance + P&C agents in network

## Workflow
1. Detect referral node from transaction context
2. Search `profiles` + `organizations` for matching partners
3. Score partner relevance (same area code, same product need, past referral history)
4. Generate warm intro email via SendGrid
5. Log to `referrals` table
6. Track referral to close; trigger reward payment

## Faith-Framed Referral Network
- Christian financial advisors
- CDFI community partners
- Church-affiliated housing ministries
- Faith-based real estate networks

## Escalation
- High-value referral (funded > $1M) → Personal outreach from broker
- Partner has not referred in 12 months → Trigger re-engagement sequence
