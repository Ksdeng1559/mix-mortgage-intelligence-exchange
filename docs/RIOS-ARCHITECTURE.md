# RIOS — Real-Time Intelligence Operating System

> The cognitive engine powering the Mortgage Intelligence Exchange™ (MIX)

---

## What is RIOS?

**RIOS** (Real-Time Intelligence Operating System) is the reasoning and decision-making substrate of MIX. It connects every agent, data source, and action into a unified intelligence graph — enabling the platform to move a mortgage opportunity from raw lead to funded loan without manual intervention.

---

## Core Principles

| Principle | Description |
|---|---|
| **Always-on reasoning** | RIOS never sleeps — it scores, matches, and routes 24/7 |
| **Audit everything** | Every decision is logged, scored, and explainable |
| **Human in the loop** | High-stakes actions (underwriting, funding) require human sign-off |
| **Composable agents** | Each agent pack is independent but shares RIOS context |
| **Faith-framed lens** | CDFI and Christian foundation alignment baked into scoring logic |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      MIX Frontend (Next.js / Lovable)        │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WebSocket
┌──────────────────────────▼──────────────────────────────────┐
│                    Hermes Runtime Layer                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Executive    │  │ Orchestrator  │  │ Agent Supervisor │  │
│  │ Assistant    │  │ (Ruflo)       │  │                  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    RIOS Core Engine                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Intelligence Graph (Pinecone + Wiki)       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────┐  │
│  │ Context │ │ Scoring  │ │ Matching │ │  WhyNow Engine™ │  │
│  │ Broker  │ │ Engine   │ │ Agent   │ │                 │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Data & Service Layer                       │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │ Supabase   │  │ MotherDuck  │  │ LiveKit (realtime) │   │
│  │ (PG/Vec)   │  │ (Analytics) │  │                    │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │
│  │ SendGrid   │  │ Twilio     │  │ Unipile (LinkedIn) │   │
│  │ (Email)    │  │ (SMS/Call) │  │                    │   │
│  └────────────┘  └────────────┘  └────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Pipeline Stages

```
Lead → Qualify → Underwrite → Score → Match → Deliver → Fund → Refer → Reactivate → Renew
```

### Stage Descriptions

| Stage | Agent | Key Action |
|---|---|---|
| **Lead** | Lead Discovery Agent | Surface opportunities from web, LinkedIn, public records |
| **Qualify** | Qualification Agent | 5-minute LiveKit interview, needs vs. product fit |
| **Underwrite** | Underwriting Agent | Risk profile, capacity, collateral assessment |
| **Score** | Opportunity Scoring Agent | Composite score (credit + intent + capacity + market) |
| **Match** | Matching Agent | Pair borrower profile with optimal lender/product |
| **Deliver** | Cross-Sell Agent | Package and present to all parties simultaneously |
| **Fund** | Revenue Agent | Final compliance check, fund release orchestration |
| **Refer** | Referral Intelligence Agent™ | Identify referral partners at every transaction node |
| **Reactivate** | Database Reactivation Agent™ | Re-engage cold leads via multi-channel sequence |
| **Renew** | Database Enrichment Agent | Keep CRM fresh; annual renewal triggers |

---

## Agent Pack Registry

| # | Agent | Purpose | Status |
|---|---|---|---|
| 1 | Lead Discovery Agent | Opportunity surface mining | Planned |
| 2 | Qualification Agent | LiveKit interview + needs analysis | Planned |
| 3 | Underwriting Agent | Risk and capacity assessment | Planned |
| 4 | Opportunity Scoring Agent | Composite scoring engine | Planned |
| 5 | WhyNow Engine™ | Real-time market trigger detection | Planned |
| 6 | Matching Agent | Borrower-lender-product matching | Planned |
| 7 | Cross-Sell Agent | Multi-product upsell at loan close | Planned |
| 8 | Revenue Agent | Funding orchestration + compliance | Planned |
| 9 | Referral Intelligence Agent™ | Network analysis for warm referrals | Planned |
| 10 | Database Reactivation Agent™ | Multi-channel re-engagement | Planned |
| 11 | Database Enrichment Agent | Ongoing CRM hygiene + annual triggers | Planned |

---

## RIOS Context Broker

The Context Broker is the heart of RIOS. It maintains a rolling memory graph per opportunity:

```
OpportunityContext {
  opportunity_id: string
  stage: PipelineStage
  agent_history: AgentResult[]
  composite_score: float
  match_candidates: Match[]
  decision_logs: DecisionLog[]
  last_modified: timestamp
}
```

All agents write back to the Context Broker after every turn. No agent operates with stale context.

---

## WhyNow Engine™

WhyNow detects market events and triggers the right action automatically:

- **Rate change events** → Score recalculation + borrower notification
- **Life events** (divorce, retirement, new job) → Re-engagement trigger
- **Market demand shifts** → Lender product re-ranking
- **Referral partner activity** → Warm intro opportunity alert

---

## Data Model (Supabase)

See `/supabase/schema.sql` for full table definitions.

Key tables:
- `leads` — raw opportunity records
- `opportunities` — active pipeline records
- `underwriting_logs` — decision audit trail
- `scores` — per-stage scoring snapshots
- `matches` — lender/product match history
- `agents_context` — RIOS per-opportunity memory

---

## Security & Compliance

- SOC 2 Type II compliance target
- All PHI/PI data encrypted at rest (AES-256) and in transit (TLS 1.3)
- Underwriting decisions require human sign-off above score threshold
- Full audit log for all agent decisions
- CDFI/Faith-framed scoring: no discriminatory variables in model

---

## Next Steps

- [ ] Implement Supabase schema and RLS policies
- [ ] Stand up LiveKit qualification interview flow
- [ ] Build RIOS Context Broker API endpoints
- [ ] Deploy agent pack #1 (Lead Discovery Agent)
- [ ] Integrate Pinecone for opportunity embedding
- [ ] Build WhyNow Engine webhook receivers

---

*RIOS is the operating system. The agents are the apps. The MIX platform is the product.*
