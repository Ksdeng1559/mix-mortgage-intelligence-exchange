# MIX — Mortgage Intelligence Exchange

> A collaborative open platform for sharing market insights, underwriting frameworks, and risk analysis across the mortgage industry.

![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)
![Stage](https://img.shields.io/badge/Stage-Alpha-orange)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen)

---

## 🎯 What Is MIX?

**MIX** is an open intelligence exchange built for mortgage professionals — loan officers, underwriters, risk analysts, compliance teams, and investors — to collaborate on real-world market intelligence. Think of it as a collective brain for the mortgage industry: structured frameworks, underwriting playbooks, risk models, and market signals shared in the open.

No paywalls. No data hoarding. Just honest, actionable intelligence from people doing the work every day.

---

## 🏗️ Architecture Overview

MIX is built on the **RIOS Architecture** — a modular, AI-augmented pipeline that transforms raw mortgage data into scored, actionable intelligence.

```
┌─────────────────────────────────────────────────────────────┐
│                    INTAKE & DISCOVERY                        │
│  Lead Discovery Agent  │  WhyNow Engine  │  Market Signals │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                  PROCESSING & ENRICHMENT                     │
│  Qualification Agent  │  Database Enrichment Agent           │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    SCORING & MATCHING                        │
│  Scoring Agent  │  Matching Agent  │  Cross-Sell Agent      │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   UNDERWRITING & REVIEW                     │
│  Underwriting Agent  │  Referral Intelligence Agent         │
└──────────────┬──────────────────┬───────────────────────────┘
               ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACTIVATION & REVENUE                    │
│  Database Reactivation Agent  │  Revenue Agent               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 What's Included

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
- Row-Level Security (RLS) policies for data isolation
- pgvector integration for semantic lead scoring

### 🐳 Docker Stack

One-command local development environment:
- **Supabase** (PostgreSQL + Auth + Edge Functions + Studio)
- **Next.js** application stack
- **11 Agent Services** running as isolated workers

### 📐 RIOS Architecture Docs

Detailed architectural documentation covering:
- Agent-to-agent communication protocols
- Data flow diagrams
- Stage-by-stage processing logic
- Extensibility patterns for new agents

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

```
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

## 🔐 Security & Privacy

- **No real borrower data** should ever be uploaded to this repo
- All agent specs use synthetic sample data
- The Supabase schema includes Row-Level Security — enable RLS in production
- Report security concerns via GitHub Issues (private mode)

---

## 📜 License

Apache License 2.0 — see [LICENSE](LICENSE) for the full text.

---

## 🌐 The Intelligence Exchange

> *"The best underwriting judgment comes from the most diverse set of experiences shared openly."*

MIX is more than software — it's a commitment to collective intelligence in an industry built on risk. Join the exchange, share what's working, and let's raise the standard together.

**🌐 [View on GitHub](https://github.com/Ksdeng1559/mix-mortgage-intelligence-exchange)**
