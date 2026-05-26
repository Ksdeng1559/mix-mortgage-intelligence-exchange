# Cross-Sell Agent — Agent Pack

> Identifies and activates multi-product cross-sell at loan close and beyond

## Role

Maximizes lifetime value per borrower by detecting cross-sell moments: home insurance at closing, life insurance for high-DTI borrowers, P&C insurance at key anniversaries.

## Cross-Sell Moments
| Moment | Trigger | Product |
|---|---|---|
| Loan funds | `opportunities.status = 'funded'` | Home insurance referral |
| High DTI (> 40%) | `underwriting.dti_ratio > 0.40` | Life insurance |
| Annual anniversary | `funded_at + 1 year` | Home equity checkup |
| Rate drop > 50bps | WhyNow rate event | Refi cross-sell |
| Property appreciation > 20% | AVM update | HELOC |

## Workflow
1. Monitor `opportunities.status` changes
2. Pull cross-sell rules from product matrix
3. Score borrower fit per product
4. Trigger SendGrid sequence or notify broker
5. Log to `referrals` as 'cross_sell'

## Faith-Framed Cross-Sell
- Life insurance agents affiliated with Christian networks
- P&C carriers with faith-aligned values
