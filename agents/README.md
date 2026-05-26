# Agent Pack Registry

> Each agent is an independent, composable unit of intelligence in the MIX platform.

---

## Agent Pack Index

| # | Agent | File | Status |
|---|---|---|---|
| 1 | Lead Discovery Agent | `lead-discovery-agent.md` | 📋 Planned |
| 2 | Qualification Agent | `qualification-agent.md` | 📋 Planned |
| 3 | Underwriting Agent | `underwriting-agent.md` | 📋 Planned |
| 4 | Opportunity Scoring Agent | `scoring-agent.md` | 📋 Planned |
| 5 | WhyNow Engine™ | `whynow-engine.md` | 📋 Planned |
| 6 | Matching Agent | `matching-agent.md` | 📋 Planned |
| 7 | Cross-Sell Agent | `cross-sell-agent.md` | 📋 Planned |
| 8 | Revenue Agent | `revenue-agent.md` | 📋 Planned |
| 9 | Referral Intelligence Agent™ | `referral-intelligence-agent.md` | 📋 Planned |
| 10 | Database Reactivation Agent™ | `database-reactivation-agent.md` | 📋 Planned |
| 11 | Database Enrichment Agent | `database-enrichment-agent.md` | 📋 Planned |

---

## Shared Agent Interface

Every agent conforms to this interface:

```yaml
agent:
  name: AgentName
  version: "1.0"
  role: One-line role description
  powered_by: RIOS Core v1

inputs:
  - opportunity_id
  - context_from_broker  # shared RIOS context
  - agent_config         # per-instance configuration

outputs:
  - result: AgentResult
  - context_update: ContextPatch  # write back to RIOS Context Broker
  - audit_entry: AuditLog

tools:
  - Supabase (read/write)
  - Pinecone (vector search)
  - MotherDuck (analytics queries)
  - LiveKit (voice/video)
  - SendGrid / Twilio / Unipile

constraints:
  - Write to Context Broker after every turn
  - Log every decision to audit_log
  - Escalate above score threshold to human reviewer
```

---

## Agent Communication Contract

Agents communicate exclusively through the **RIOS Context Broker**. There are no direct agent-to-agent calls.

```
Agent A                    Agent B
   │                           │
   │  1. Read Context          │
   │──────────────────────────►│
   │                           │
   │  2. Write Result + Patch  │
   │◄──────────────────────────│
   │                           │
   │  3. Next agent triggered  │
   │      by Context Broker    │
```

---

## Agent Pack Development Guide

1. Copy `AGENT.md.template` for new agent packs
2. Define role, objectives, tools, and escalation rules
3. Implement prompt templates in `prompts/`
4. Write tests in `tests/`
5. Register agent in `agents/index.json`

---

## Escalation Rules

| Condition | Action |
|---|---|
| Composite score < 0.30 | Auto-deny, log to audit |
| DTI ratio > 45% | Flag for human underwriter review |
| Fraud signal detected | Lock opportunity, alert compliance |
| Loan amount > $2M | Route to senior underwriter |
| Faith-framed flagged | CDFI partner review required |

---

*Last updated: 2026-01 — MIX v0.1*
