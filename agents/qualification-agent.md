# Qualification Agent — Agent Pack

> 5-minute LiveKit interview + needs analysis to qualify or disqualify mortgage leads

## Role

Conducts a structured voice/video interview with a discovered lead to determine product fit, financial capacity, and timeline readiness. Converts cold leads into qualified opportunities in minutes — not days.

## LiveKit Interview Flow

### Pre-call
- Verify phone/email via Supabase lookup
- Pull `opportunity` context from RIOS
- Select interview script variant based on `intent_signal`

### Interview Script (5 minutes)
1. **Intro** (30s) — Who we are, why we're calling, what to expect
2. **Property Status** (60s) — Do you own? What's the property type?
3. **Timeline** (60s) — When do you want to close?
4. **Financial Overview** (90s) — Income, debts, credit standing self-assessment
5. **Product Fit** (60s) — Refi, purchase, cash-out, HELOC, reverse?
6. **Close** (30s) — Next steps, consent, scheduling

### Post-call
- Generate transcript + summary
- Run needs analysis against product catalog
- Write to `qualification_logs` table
- Update `opportunities.stage` → 'qualify' or 'underwrite'

## Output Fields
```json
{
  "session_id": "lk_room_xxx",
  "summary": "Qualified for jumbo refi, 760 credit, $650K loan, 60-day close",
  "needs_analysis": { "product": "jumbo_fixed", "rate_class": "prime", "timeline": 60 },
  "budget_min": 600000,
  "budget_max": 700000,
  "timeline_months": 2,
  "preapproved": true,
  "transcript": [...]
}
```

## Escalation
- Self-reported credit < 620 → Flag for manual review; don't advance to underwriting
- Income cannot be verified → Request pay stubs; pause pipeline
- Fraud indicators → Lock opportunity; alert compliance team
