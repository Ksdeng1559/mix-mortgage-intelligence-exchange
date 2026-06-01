# MIX — Mortgage Intelligence Exchange

> A voice-first Relationship Intelligence Operating System for mortgage professionals that converts conversations, market signals, underwriting context, and relationship history into actionable mortgage intelligence.

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Stage](https://img.shields.io/badge/Stage-Alpha-orange)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)

---

## 🎯 What Is MIX?

**MIX** is the mortgage-focused vertical of the broader **RIOS — Relationship Intelligence Operating System** architecture.

It is designed for mortgage professionals — loan officers, brokers, underwriters, risk analysts, compliance teams, referral partners, and investors — who need to capture relationship context, market signals, borrower intent, underwriting insight, and follow-up opportunities without forcing every user to type perfect CRM notes.

Traditional CRMs are built around manual data entry.

MIX is built around relationship intelligence.

The core belief is simple:

> The most valuable mortgage intelligence lives inside conversations, not fields.

Mortgage professionals think, sell, advise, and assess risk through conversations. MIX captures those conversations, structures the information, updates the intelligence layer, and activates specialized AI agents to recommend the next best action.

No paywalls. No data hoarding. Just honest, actionable mortgage intelligence from people doing the work every day.

---

## 🎙️ Voice-First Relationship Intelligence

MIX treats voice as a primary input layer, not an add-on feature.

Most mortgage professionals speak more naturally than they type. A broker may finish a client call, lender discussion, referral partner conversation, or underwriting review with important context in their head, but that context often never makes it into the CRM.

This creates **Relationship Intelligence Leakage™**:

> The loss of valuable business intelligence because conversations, context, intent, concerns, and follow-up signals are not captured, structured, or activated.

MIX is designed to reduce that leakage.

### Why Voice Matters

Voice capture allows mortgage professionals to document insight at the speed of thought:

- Borrower concerns
- Renewal windows
- Refinance signals
- HELOC opportunities
- Debt consolidation needs
- Family or life-event changes
- Referral partner updates
- Lender guideline observations
- Underwriting exceptions
- Compliance-sensitive notes
- Next-step instructions

Typing requires users to organize thoughts before entering them. Speaking allows users to express context naturally. MIX then converts that raw voice input into structured intelligence.

### Voice-to-Intelligence Workflow

```text
Conversation
↓
Voice Capture
↓
Transcription
↓
AI Summarization
↓
Entity Extraction
↓
Borrower / Property / Loan Record Update
↓
Signal Detection
↓
Agent Activation
↓
Task Creation
↓
Next Best Action
```

The user speaks.

MIX organizes.

Hermes activates the right agent.

---

## 🔐 VoiceLock™ Secure Access Layer

MIX also supports the future **VoiceLock™** security concept from RIOS.

VoiceLock™ is a secure voice access and confirmation layer for sensitive workflows. It is not intended to replace standard authentication. Instead, it acts as an additional verification signal for high-trust actions.

Potential use cases:

- Accessing sensitive borrower records
- Confirming client-data retrieval
- Approving outbound communications
- Confirming underwriting or compliance review steps
- Authorizing agent actions that affect client records
- Creating an audit trail for licensed-user activity

VoiceLock™ principle:

> Voice is a step-up security factor, not the only security factor.

---

## 🏗️ Architecture Overview

MIX is built on the **RIOS Architecture** — a modular, AI-augmented pipeline that transforms conversations, borrower data, market data, and mortgage signals into scored, actionable intelligence.

```text
┌─────────────────────────────────────────────────────────────┐
│                     VOICE & SIGNAL CAPTURE                  │
│  Voice Notes │ Calls │ Meetings │ Forms │ Market Signals    │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                 TRANSCRIPTION & CONTEXT EXTRACTION          │
│  Speech-to-Text │ AI Summary │ Entity Extraction │ Intent    │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    INTAKE & DISCOVERY                       │
│  Lead Discovery Agent  │  WhyNow Engine  │  Market Signals │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  PROCESSING & ENRICHMENT                    │
│  Qualification Agent  │  Database Enrichment Agent          │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    SCORING & MATCHING                       │
│  Scoring Agent  │  Matching Agent  │  Cross-Sell Agent      │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   UNDERWRITING & REVIEW                     │
│  Underwriting Agent  │  Referral Intelligence Agent         │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACTIVATION & REVENUE                   │
│  Database Reactivation Agent  │  Revenue Agent              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 What's Included

### 🎙️ Voice-First CRM Layer

The voice-first CRM layer defines how conversations become structured mortgage intelligence.

Core capabilities:

- Voice note capture
- Call and meeting transcription
- AI-generated summaries
- Borrower, property, lender, and partner entity extraction
- Intent and opportunity detection
- CRM note generation
- Task and follow-up creation
- Audit-friendly activity history
- Future VoiceLock™ verification hooks

### 🧠 11 Agent Packs

| Agent | Purpose |
|---|---|
| **Lead Discovery Agent** | Identify high-intent prospects via behavioral signals and market data |
| **WhyNow Engine** | Surface time-sensitive triggers that create immediate lending opportunities |
| **Qualification Agent** | Pre-screen leads against lending product criteria and borrower profiles |
| **Database Enrichment Agent** | Augment existing records with credit, equity, and market data |
| **Scoring Agent** | Rate and rank leads by conversion probability and loan potential |
| **Matching Agent** | Pair borrowers with optimal loan products, lenders, and programs |
| **Cross-Sell Agent** | Identify insurance, title, and ancillary product opportunities |
| **Referral Intelligence Agent** | Map center-of-influence networks and referral pathways |
| **Underwriting Agent** | Execute layered underwriting review using guideline knowledge bases |
| **Database Reactivation Agent** | Re-engage dormant leads and stale pipeline records |
| **Revenue Agent** | Forecast revenue, model pipeline value, and optimize loan officer commission |

### 🗄️ Supabase Schema

Production-ready PostgreSQL schema with:
- Normalized borrower, property, and loan records
- Agent state and task tracking tables
- Signal event log for market trigger capture
- Conversation, transcript, summary, and voice-note records
- Row-Level Security (RLS) policies for data isolation
- pgvector integration for semantic lead scoring and relationship memory

### 🐳 Docker Stack

One-command local development environment:
- **Supabase** (PostgreSQL + Auth + Edge Functions + Studio)
- **Next.js** application stack
- **11 Agent Services** running as isolated workers
- Optional voice/transcription services for future implementation

### 📐 RIOS Architecture Docs

Detailed architectural documentation covering:
- Voice-first relationship intelligence flows
- Agent-to-agent communication protocols
- Data flow diagrams
- Stage-by-stage processing logic
- Extensibility patterns for new agents
- Security and privacy expectations for mortgage workflows

---

## 🧭 Core System Principle

```text
Conversation → Context → Intelligence → Action → Revenue
```

MIX is designed around one operating principle:

> A mortgage CRM should not merely store what happened. It should understand what the relationship means and recommend what should happen next.

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js 20+
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Ksdeng1559/mix-mortgage-intelligence-exchange.git
cd mix-mortgage-intelligence-exchange
```

### 2. Start the Stack

```bash
docker compose up -d
```

Supabase Studio will be available at `http://localhost:3000`

### 3. Initialize the Database

```bash
# Apply the schema
docker compose exec supabase-db psql -U postgres -d postgres -f /supabase/schema.sql
```

### 4. Explore the Agents

```bash
# Read the agent pack for the workflow stage you're working on
cat agents/lead-discovery-agent.md
cat agents/underwriting-agent.md
```

---

## 📁 Project Structure

```text
mix-mortgage-intelligence-exchange/
├── agents/                  # 11 AI agent packs (Markdown specs)
│   ├── README.md            # Agent orchestration overview
│   ├── lead-discovery-agent.md
│   ├── whynow-engine.md
│   ├── qualification-agent.md
│   ├── database-enrichment-agent.md
│   ├── scoring-agent.md
│   ├── matching-agent.md
│   ├── cross-sell-agent.md
│   ├── referral-intelligence-agent.md
│   ├── underwriting-agent.md
│   ├── database-reactivation-agent.md
│   └── revenue-agent.md
├── docs/
│   └── RIOS-ARCHITECTURE.md # Full architecture documentation
├── supabase/
│   └── schema.sql           # Complete PostgreSQL schema
├── .github/
│   └── workflows/
│       └── ci.yml           # CI/CD pipeline
├── docker-compose.yml       # Local development stack
├── LICENSE                  # Apache 2.0
├── CONTRIBUTING.md          # Contribution guidelines
└── README.md                # This file
```

---

## 🤝 Contributing

MIX grows through contribution. Whether you're an underwriter with a framework to share, a developer building an agent, or an analyst with a risk model — your expertise makes the ecosystem smarter.

**Read [CONTRIBUTING.md](CONTRIBUTING.md)** before submitting PRs.

---

## 🔐 Security, Privacy & Compliance Notes

- **No real borrower data** should ever be uploaded to this repo
- All agent specs use synthetic sample data
- The Supabase schema includes Row-Level Security — enable RLS in production
- Voice transcripts and summaries may contain sensitive client context and must be protected accordingly
- Production deployments should include consent, access control, retention, audit logging, and jurisdiction-specific compliance review
- VoiceLock™ is an additional verification layer, not a replacement for legal, compliance, authentication, or licensing requirements
- Report security concerns via GitHub Issues (private mode)

---

## 📜 License

Apache License 2.0 — see [LICENSE](LICENSE) for the full text.

---

## 🌐 The Intelligence Exchange

> *"The best mortgage judgment comes from the most complete relationship context, the clearest market signals, and the most diverse set of experiences shared openly."*

MIX is more than software — it is a commitment to collective intelligence in an industry built on trust, advice, risk, timing, and relationships. Join the exchange, share what's working, and let's raise the standard together.

**🌐 [View on GitHub](https://github.com/Ksdeng1559/mix-mortgage-intelligence-exchange)**
