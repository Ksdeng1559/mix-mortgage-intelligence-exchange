# RIOS MIX Design Principles

## Purpose

RIOS MIX — Mortgage Intelligence Exchange — is not only a mortgage CRM. It is a vertical Relationship Asset Management and Opportunity Intelligence system for mortgage professionals.

The product should help a mortgage broker convert relationships, conversations, referral networks, client signals, property intelligence, lender knowledge, workflows, and execution history into reusable business assets.

The core design principle is:

> Design the operating system first. Use AI agents and code to execute clearly defined workflows.

---

## 1. The Human Is the Architect

RIOS MIX should keep the mortgage professional in control of strategy, judgment, relationship ownership, and client-facing accountability.

AI and automation should support execution, not replace professional responsibility.

Design implications:

- The broker defines the market, client profile, referral strategy, and compliance boundaries.
- The system recommends actions but does not silently make high-impact decisions.
- Human approval is required for external communications, financial recommendations, canonical relationship changes, and sensitive client actions unless an explicit autonomous policy exists.
- The product should make expert judgment reusable without hiding the broker's role.

---

## 2. Claude / ChatGPT Designs, Codex Implements

RIOS MIX should follow a two-layer software production model:

```text
Product Owner / Architect
  ↓
Claude / ChatGPT
  ↓
Architecture, PRD, workflows, database design, agent specs
  ↓
Codex
  ↓
Implementation, tests, bug fixes, deployment
  ↓
Vercel + Supabase + production services
```

Claude or ChatGPT should be used for product architecture, PRDs, ICM assets, workflow specifications, agent governance, vertical-pack design, database design, and roadmap planning.

Codex should be used for implementing clear tickets, fixing build errors, writing components, refactoring code, running tests, preparing deployment, and creating pull requests.

Operational rule:

> Do not ask Codex to invent RIOS MIX. Ask Codex to implement clearly written RIOS MIX specifications.

---

## 3. Interpretable Context Before Automation

RIOS MIX should not automate a poorly defined process.

Before automation, the system should capture objective, trigger, required data, required context, decision rules, output contract, success metrics, human approval rules, escalation conditions, and write-back rules.

Every meaningful AI action should be explainable through a visible execution contract.

The system should preserve inputs, rules, evidence, structured conclusions, actions taken, human reviewer decisions, and outcome feedback.

The goal is not hidden chain-of-thought. The goal is auditable business execution.

---

## 4. Relationship Asset Management Comes First

RIOS MIX should treat relationships as business assets.

The system should answer:

- Who knows whom?
- Which referral relationships create revenue?
- Which professionals influence client opportunities?
- Which relationships are underused?
- Which introductions should happen next?
- Which partner ecosystem creates the strongest deal flow?

Core entities should include clients, prospects, realtors, lawyers, accountants, financial planners, insurance advisors, builders, developers, private lenders, MICs, lender representatives, and community partners.

Design implication:

> The relationship graph is not a visual novelty. It is a revenue-navigation system.

---

## 5. Opportunity Intelligence Over Contact Storage

RIOS MIX should not simply store contacts. It should detect and activate opportunities.

The system should identify mortgage renewal, refinance, debt consolidation, HELOC, self-employed borrower, construction financing, reverse mortgage, referral partner, client reactivation, property/zoning, developer, and capital-stack opportunities.

Every contact, conversation, note, email, task, and relationship should improve opportunity detection.

Design implication:

> A record is valuable only if it improves timing, context, prioritization, or execution.

---

## 6. Mortgage Vertical Intelligence Is a First-Class Layer

RIOS MIX should include mortgage-specific intelligence as a vertical pack, not as generic CRM fields.

The mortgage vertical layer should include borrower profile, income type, property type, mortgage stage, renewal date, rate sensitivity, lender fit, documentation requirements, GDS/TDS considerations, credit profile, down payment source, compliance notes, referral source, important life events, property development signals, and local zoning/bylaw intelligence where relevant.

Design implication:

> Mortgage expertise should be encoded as inspectable criteria, workflows, and context files — not buried in prompts.

---

## 7. Human Governance and Compliance by Design

RIOS MIX operates in a regulated professional environment.

The system should assume that compliance, auditability, privacy, and professional accountability are product requirements.

High-impact actions should require review, including sending client-facing recommendations, representing mortgage advice, changing canonical financial facts, updating borrower eligibility assumptions, making lender suitability recommendations, creating external referral communications, and changing compliance-sensitive context.

Design implication:

> Compliance should be built into workflow design, not added as a disclaimer after automation.

---

## 8. Agents Execute From Contracts, Not Vibes

AI agents in RIOS MIX should execute from explicit workflow contracts.

Each agent workflow should define role, objective, scope, tools allowed, data allowed, decision rules, required evidence, output schema, approval policy, write-back rules, failure state, and success metric.

Agents should be used for lead triage, follow-up drafting, renewal monitoring, relationship reactivation, referral partner intelligence, mortgage document checklists, lender-fit preparation, market and rate monitoring, client summary generation, and opportunity prioritization.

Agents should not autonomously perform professional, financial, legal, or compliance-sensitive actions without explicit rules and approval.

---

## 9. Codex Tickets Must Be Small, Testable, and Traceable

Implementation work should be decomposed into tickets Codex can execute reliably.

A good Codex ticket includes goal, files likely affected, acceptance criteria, tests to run, out-of-scope items, deployment risk, and rollback note if relevant.

Bad ticket:

```text
Build the full MIX platform.
```

Good ticket:

```text
Add graceful fallback to /api/rios/mix/intelligence when BRAVE_API_KEY is missing.
Acceptance criteria:
- Route returns 200 with empty news/events arrays.
- UI displays a helpful unavailable state.
- npm run build passes.
```

Design implication:

> Codex should receive bounded engineering work, not open-ended product invention.

---

## 10. Production Readiness Beats Demo Features

RIOS MIX should prioritize deployable, reliable workflows over flashy incomplete features.

Before a feature is considered complete, confirm that it builds, is typed, respects workspace isolation, handles missing environment variables, handles empty data, handles failed API calls, has clear loading/error states, does not expose secrets, degrades gracefully, and records meaningful activity or audit data where required.

Design implication:

> A boring feature that works in production is more valuable than an impressive feature that breaks during deployment.

---

## 11. Supabase Is the System of Record

Supabase should remain the canonical operational database for RIOS MIX.

It should store workspaces, users and membership, contacts, organizations, opportunities, relationships, tasks, touchpoints, episodes, signals, context documents, agent runs, audit trails, and mortgage-specific records.

Other systems should support Supabase, not replace it.

Examples:

- Qdrant supports semantic search and memory retrieval.
- DuckDB / MotherDuck supports analytics and pattern analysis.
- Resend supports email delivery.
- Twilio supports SMS, MMS, voice, and video workflows.
- Hermes supports agent mission control.

Design implication:

> Supabase owns truth. Supporting systems enrich, search, analyze, deliver, or execute against that truth.

---

## 12. Intelligence Modules Should Compound

Each intelligence module should make future execution better.

Examples:

- Client Intelligence improves borrower understanding.
- Property Intelligence improves financing context.
- Lender Intelligence improves placement strategy.
- Relationship Intelligence improves referral strategy.
- Development Intelligence improves zoning and construction opportunity detection.
- Capital Intelligence improves private lending and capital-stack matching.
- Community Intelligence Exchange improves trusted expert networks.

Design implication:

> Every module should create reusable context, not isolated dashboard data.

---

## 13. The Dashboard Should Answer “Who Should I Talk To Today?”

The MIX dashboard should focus on action, not passive reporting.

It should surface urgent client follow-ups, renewal opportunities, stuck deals, warm introduction paths, referral partners to re-engage, rate-sensitive clients, new market signals, important deadlines, missing documents, lender-fit opportunities, and relationship gaps.

Design implication:

> The dashboard is an execution cockpit, not a static report.

---

## 14. Community Intelligence Exchange Is a Strategic Moat

MIX should support a trusted professional ecosystem around the mortgage broker.

Possible professional verticals include realtors, lawyers, accountants, financial planners, insurance advisors, builders, developers, benefits specialists, private lenders, and community organizations.

Each professional or partner group may have its own directory, referral page, subdomain, content context, and relationship graph.

Design implication:

> MIX should help the mortgage broker become the center of a high-trust referral network.

---

## 15. Measure Business Outcomes, Not Just Activity

RIOS MIX should measure whether intelligence creates business results.

Important metrics include funded volume, opportunities created, opportunities reactivated, referral partner contribution, time to follow-up, renewal capture rate, pipeline velocity, win rate, client retention, warm introductions generated, human hours saved, agent tasks completed, approval rate, and escalation rate.

Design implication:

> The platform should prove that relationship intelligence creates measurable revenue and operating leverage.

---

## 16. Design for Vertical Expansion

Mortgage is the first vertical pack, not the final product boundary.

RIOS MIX should help prove the reusable RIOS model:

```text
Relationship Asset Management
+ Opportunity Intelligence
+ Interpretable Context Methodology
+ Vertical Pack
+ Human-Governed Agents
+ Outcome Measurement
```

Future verticals may include commercial real estate, private lending, private equity, M&A, urban mining, construction finance, employee benefits, and professional referral networks.

Design implication:

> Build mortgage-specific workflows without making the platform impossible to generalize.

---

## 17. Practical Engineering Default

When unsure, choose the option that is easier to deploy, easier to inspect, easier to test, easier to roll back, safer for client data, consistent with Supabase as system of record, aligned with human approval and auditability, and useful to the broker's next best action.

---

## Final Operating Principle

RIOS MIX should transform mortgage relationships, client conversations, professional networks, lender knowledge, property intelligence, and workflow execution into a compounding business operating system.

The product should not merely help a broker manage deals.

It should help the broker build an intelligent, governed, measurable relationship and opportunity engine.
