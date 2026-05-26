# Opportunity Scoring Agent — Agent Pack

> Produces the composite MIX score that drives all routing and matching decisions

## Role

Calculates a 0.000–1.000 composite score across four dimensions: creditworthiness, intent, capacity, and market readiness. The score is the single most important number in the MIX pipeline.

## Score Dimensions

| Dimension | Weight | Data Source |
|---|---|---|
| Credit Score | 25% | Credit bureau + self-report |
| Intent Signal | 30% | Life events, search behavior, timeline |
| Capacity | 25% | Income, DTI, bank data |
| Market Readiness | 20% | Rate environment, inventory, season |

## Composite Formula
```
composite = (credit × 0.25) + (intent × 0.30) + (capacity × 0.25) + (market × 0.20)
```

## Scoring Tiers
| Tier | Score Range | Action |
|---|---|---|
| A+ | 0.90–1.00 | Instant match, priority funding |
| A | 0.80–0.89 | Fast-track to lender matching |
| B | 0.65–0.79 | Standard pipeline |
| C | 0.50–0.64 | Enhanced monitoring; nurture |
| D | 0.30–0.49 | Reactivation candidate |
| Reject | < 0.30 | Archive; notify via reactivation |

## Output
- Writes to `scores` table with full breakdown
- Updates `opportunities.composite_score` and `score_tier`
- Feeds Matching Agent with score tier

## Faith-Framed Adjustment
CDFI and Christian foundation partners get a +0.05 bump on capacity scoring for mission-aligned borrowers. No discriminatory variables used.
