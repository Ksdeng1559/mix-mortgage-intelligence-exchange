# Database Reactivation Agent™ — Agent Pack

> Re-engages cold leads via multi-channel sequences (email, SMS, LinkedIn, voice)

## Role

Keeps the MIX database warm by running intelligent reactivation campaigns against leads who have gone cold. Uses WhyNow triggers and behavioral data to time outreach perfectly.

## Campaign Segments
| Segment | Definition | Channel | Cadence |
|---|---|---|---|
| Cold 30 | No activity in 30 days | Email | 3-touch, 7-day span |
| Cold 90 | No activity in 90 days | Email + SMS | 5-touch, 14-day span |
| Lapsed 12mo | Previous opp expired | Multi-channel | 7-touch, 30-day span |
| Renewal Due | Loan maturing in 60 days | Email + Call | Personal outreach |

## Workflow
1. Query cold leads from Supabase (`opportunities.status = 'expired'`)
2. Score reactivation probability (RFM: Recency × Frequency × Monetary)
3. Select channel + template based on segment + intent_signal
4. Execute via SendGrid / Twilio / Unipile
5. Track open, reply, conversion
6. Update `reactivation_logs`; advance stage if converted

## Message Templates
Pre-approved templates in `agents/prompts/reactivation_templates.md`

## Escalation
- Reply with life event signal → Alert WhyNow Engine; fast-track to scoring
- Hard bounce → Remove from sequence; update `leads.email_valid = false`
- Fraud signal → Lock lead; alert compliance
