# MIX — Mortgage Intelligence Exchange
## Implementation Plan

**Document status:** Build-ready v1.2  
**Operating system:** RIOS — Relationship Intelligence Operating System  
**Underwriting engine:** ClearClose  
**Market-facing platform:** MIX — Mortgage Intelligence Exchange  
**Context and relationship foundation:** [Interpretable Context and Relationship Graph](INTERPRETABLE-CONTEXT-GRAPH.md)  
**Subscriber onboarding foundation:** [Subscriber Onboarding and Opportunity Intelligence](SUBSCRIBER-ONBOARDING-OPPORTUNITY-INTELLIGENCE.md)

---

## 1. Executive Objective

Build MIX as a relationship-driven mortgage and real-estate capital intelligence platform that converts:

```text
Subscriber Onboarding
→ Subscriber Intelligence Profile
→ Source Evidence
→ Interpretable Context
→ Relationship Graph
→ Niche and Opportunity Hypotheses
→ Signal
→ Opportunity
→ ClearClose Underwriting
→ Lender / Capital Match
→ Outcome
→ Updated Graph Knowledge
```

MIX is not intended to be another contact-centric mortgage CRM. It must preserve the meaning, origin, evidence, timing, confidence, and privacy scope of relationships. It should understand each subscriber after onboarding, identify the niches and business opportunities that fit their capabilities and network, structure opportunities through ClearClose, route them to suitable lenders or capital providers, and compound the resulting knowledge.

The initial implementation will focus on four vertical packs:

1. Strata Financial Resolution
2. Estate & Elder Law Financing
3. Portfolio Investor Lending
4. Construction & Development Capital

The first production release should prioritize the first two packs because they provide the shortest route to referral-driven revenue and require the least expansion of the existing lender network.

---

## 2. Mandatory Architectural Foundation

The Interpretable Context and Relationship Graph methodology and the Subscriber Onboarding and Opportunity Intelligence methodology are core build requirements, not optional future enhancements.

MIX must use:

- atomic, readable context assertions
- source-linked relationship evidence
- graph nodes and edges for people, organizations, properties, opportunities, lenders, decisions, and outcomes
- confidence and human-verification states
- temporal validity and version history
- role-based graph visibility
- explainable graph paths for agent recommendations
- subscriber capability, relationship, market, and constraint mapping
- transparent niche and opportunity scoring
- human review of subscriber conclusions and recommendations
- vector retrieval only as a discovery mechanism, never as proof of a relationship

The canonical implementation standards are defined in:

- [`docs/INTERPRETABLE-CONTEXT-GRAPH.md`](INTERPRETABLE-CONTEXT-GRAPH.md)
- [`docs/SUBSCRIBER-ONBOARDING-OPPORTUNITY-INTELLIGENCE.md`](SUBSCRIBER-ONBOARDING-OPPORTUNITY-INTELLIGENCE.md)

No relationship-scoring, matching, referral-intelligence, niche-discovery, subscriber-opportunity, or opportunity-intelligence feature is complete unless its graph path and supporting context can be inspected.

---

## 3. Subscriber Onboarding as Business Discovery

Subscriber onboarding must produce more than account credentials and profile fields.

It must generate:

1. Subscriber Intelligence Profile
2. Subscriber Business Graph
3. Capability Map
4. Relationship Leverage Map
5. Market and Client Segment Map
6. Top Niche Opportunities
7. Opportunity Evidence Pack
8. Capability Gap Analysis
9. Recommended Vertical Pack or Packs
10. 90-Day Opportunity Activation Plan
11. Initial Relationship Actions
12. Baseline Metrics and Learning Objectives

The niche-discovery model is:

```text
Subscriber Capability
× Relationship Access
× Market Problems
× Trigger Signals
× Product and Capital Access
× Revenue Potential
× Delivery Capacity
× Competitive Advantage
```

Every niche recommendation must include evidence, assumptions, confidence, gaps, transparent scoring, and a validation action.

---

## 4. Platform Boundaries

### RIOS

RIOS is the internal operating system responsible for:

- subscriber context assembly
- subscriber business graph construction
- niche and opportunity intelligence
- interpretable context assembly
- relationship graph construction and traversal
- relationship memory
- workflow orchestration
- agent coordination
- knowledge capture
- outcome measurement
- reusable organizational intelligence

### ClearClose

ClearClose is the underwriting and structuring engine responsible for:

- borrower qualification
- property and portfolio analysis
- debt-service calculations
- capital requirement analysis
- risk flags
- lender-fit assessment
- underwriting memo generation
- human approval checkpoints

### MIX

MIX is the market-facing exchange responsible for:

- subscriber onboarding and business discovery
- professional referral intake
- financing opportunity submission
- relationship-path visibility
- niche and opportunity recommendations
- lender and capital-source matching
- opportunity collaboration
- case-status visibility
- partner attribution
- outcome reporting
- exchange-level intelligence

---

## 5. Implementation Principles

1. **Interpretable context first** — every material fact, inference, and recommendation must be readable, source-linked, scoped, versioned, and reviewable.
2. **Graph-native relationships** — relationships are represented as nodes and edges, not merely foreign keys or free-text notes.
3. **Onboarding creates intelligence** — onboarding must map the subscriber's capabilities, relationships, markets, goals, constraints, and opportunity fit.
4. **Niche recommendations are explainable** — every recommended niche includes evidence, score components, gaps, assumptions, and validation steps.
5. **Glass-box workflows** — every major workflow must be documented, numbered, versioned, and inspectable.
6. **Human approval for regulated decisions** — agents may recommend, summarize, and route; licensed professionals approve advice, submissions, underwriting conclusions, and client communications.
7. **Relationship before transaction** — every opportunity must retain its origin relationship, context, consent basis, and attribution.
8. **Signals create opportunities** — the system must distinguish a raw signal from a qualified financing opportunity.
9. **Outcomes create intelligence** — funded, declined, withdrawn, referred, and restructured outcomes update lender, subscriber, relationship, niche, and workflow knowledge.
10. **Vertical packs are configuration** — vertical logic is swappable without duplicating the core platform.
11. **Explainable matching** — lender and capital matches include reasons, graph paths, missing conditions, policy source, confidence, and review status.
12. **Minimum necessary data** — collect and expose only the information necessary for the workflow and user role.

---

## 6. Target System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│ MIX EXPERIENCE LAYER                                          │
│ Onboarding │ Partner Portal │ Advisor Workspace │ Graph │ Ops  │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ SUBSCRIBER INTELLIGENCE SERVICES                              │
│ Interview │ Profile │ Capability Map │ Niche Discovery         │
│ Opportunity Scoring │ Vertical Recommendation │ 90-Day Plan     │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ RIOS CONTEXT AND GRAPH SERVICES                               │
│ Context Assertions │ Entity Resolution │ Nodes │ Edges         │
│ Evidence │ Confidence │ Verification │ Graph Paths            │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ RIOS APPLICATION SERVICES                                     │
│ Signals │ Opportunities │ Tasks │ Outcomes │ Consent │ Audit    │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ CLEARCLOSE INTELLIGENCE LAYER                                 │
│ Residential │ Portfolio │ Commercial │ Construction           │
│ Qualification │ Risk Flags │ Memo Builder │ Lender Fit         │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ HERMES AGENT WORKFORCE                                        │
│ Onboarding │ Context │ Relationship │ Niche Discovery          │
│ Signal │ Qualification │ Underwriting │ Match │ Outcome Learning │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ DATA AND KNOWLEDGE LAYER                                      │
│ Supabase/Postgres │ Graph Projection │ Qdrant/pgvector         │
│ Markdown Context Vault │ Lender Registry │ Capital Registry     │
└───────────────────────────────────────────────────────────────┘
```

---

## 7. Core Domain and Graph Model

The production schema should support relational system-of-record entities plus graph projections.

### 7.1 Organization and Workspace

- `organizations`
- `workspaces`
- `users`
- `roles`
- `workspace_memberships`
- `permissions`

### 7.2 Subscriber Intelligence

- `subscriber_profiles`
- `subscriber_goals`
- `subscriber_capabilities`
- `subscriber_credentials`
- `subscriber_markets`
- `subscriber_constraints`
- `subscriber_data_sources`
- `onboarding_sessions`
- `onboarding_responses`
- `niche_hypotheses`
- `niche_scores`
- `niche_score_components`
- `capability_gaps`
- `vertical_pack_recommendations`
- `activation_plans`
- `activation_plan_actions`
- `subscriber_baselines`

These records must connect to context assertions and graph nodes rather than becoming isolated profile fields.

### 7.3 Interpretable Context

- `context_assertions`
- `context_assertion_versions`
- `context_sources`
- `context_reviews`
- `context_conflicts`
- `context_scopes`

Every assertion must retain:

- subject
- predicate
- object or literal value
- human-readable summary
- evidence references
- confidence
- verification status
- valid dates
- sensitivity
- workspace scope
- creator and reviewer

### 7.4 Relationship Graph

- `graph_nodes`
- `graph_edges`
- `graph_edge_evidence`
- `graph_path_cache`
- `entity_resolution_candidates`
- `entity_merge_history`

Every active edge must have evidence or an explicit human assertion.

### 7.5 Relationship Asset Registry

Canonical entities remain available for transactional workflows:

- `relationships`
- `people`
- `companies`
- `relationship_roles`
- `relationship_strength_events`
- `referral_agreements`
- `referral_attributions`
- `relationship_interactions`

These records are projected into graph nodes and edges.

Typical roles:

- subscriber
- borrower
- guarantor
- lawyer
- financial planner
- accountant
- realtor
- property manager
- developer
- lender representative
- private investor
- executor

### 7.6 Conversation and Evidence

- `conversations`
- `voice_notes`
- `transcripts`
- `summaries`
- `documents`
- `document_extractions`
- `source_citations`
- `consent_records`

Every extracted fact must retain its source and review state.

### 7.7 Signal Registry

- `signals`
- `signal_types`
- `signal_sources`
- `signal_scores`
- `signal_reviews`

Signals must connect through graph edges to their source evidence, affected parties, properties, subscribers, and resulting opportunities.

### 7.8 Opportunity Registry

- `opportunities`
- `opportunity_parties`
- `opportunity_properties`
- `opportunity_requirements`
- `opportunity_stages`
- `opportunity_stage_history`
- `opportunity_tasks`
- `opportunity_notes`

Suggested stages:

```text
Niche Hypothesis
→ Validation
→ Signal Detected
→ Triage
→ Consent Confirmed
→ Discovery
→ Documents Required
→ ClearClose Review
→ Structuring
→ Lender/Capital Match
→ Submission Approved
→ Submitted
→ Conditional Approval
→ Funded / Declined / Withdrawn / Referred
```

Every opportunity must display its origin graph path and, where applicable, the niche hypothesis that led to it.

### 7.9 Property and Borrower Records

- `borrower_profiles`
- `income_sources`
- `liabilities`
- `assets`
- `credit_observations`
- `properties`
- `property_ownership`
- `mortgages`
- `rental_income`
- `property_expenses`
- `valuations`

### 7.10 ClearClose Underwriting

- `underwriting_cases`
- `underwriting_versions`
- `underwriting_inputs`
- `underwriting_calculations`
- `underwriting_conditions`
- `underwriting_risk_flags`
- `underwriting_memos`
- `human_approvals`

ClearClose facts, assumptions, risks, decisions, and outcomes must be graph-addressable and source-linked.

### 7.11 Lender and Capital Intelligence

- `capital_sources`
- `lender_programs`
- `lender_policies`
- `policy_versions`
- `lender_contacts`
- `lender_exceptions`
- `lender_matches`
- `capital_matches`
- `submissions`
- `submission_outcomes`

### 7.12 Outcome and Knowledge Assets

- `outcomes`
- `commissions`
- `advisory_fees`
- `case_studies`
- `lessons_learned`
- `workflow_metrics`
- `agent_evaluations`
- `knowledge_assets`

Outcomes must update graph relationships and subscriber niche intelligence without silently rewriting verified knowledge.

---

## 8. Vertical Pack Contract

Each vertical pack should be stored as a versioned configuration package rather than embedded directly into application code.

```text
vertical-packs/<pack-slug>/
├── manifest.yaml
├── ontology/
│   ├── nodes.yaml
│   ├── edges.yaml
│   └── context-assertions.yaml
├── relationship-types.yaml
├── signal-types.yaml
├── niche-fit-rules.yaml
├── qualification-rules.yaml
├── clearclose-requirements.yaml
├── capital-source-types.yaml
├── workflows/
├── prompts/
├── templates/
├── metrics.yaml
└── README.md
```

Each manifest should define:

- pack name and version
- target subscriber characteristics
- target relationships
- graph node extensions
- graph edge extensions
- permitted context assertion types
- niche-fit scoring factors
- recognized signals
- opportunity types
- required intake fields
- document checklist
- ClearClose module
- permitted agent actions
- approval gates
- lender/capital filters
- output templates
- KPIs

---

## 9. Agent Workforce

The existing agent specifications remain, but every agent must operate through bounded interpretable context and permitted graph traversal.

### 9.1 Onboarding Interview Agent

Responsibilities:

- conduct the guided subscriber interview
- ask adaptive follow-up questions
- separate facts from interpretations
- create proposed context assertions

### 9.2 Subscriber Context Agent

Responsibilities:

- consolidate interview, documents, CRM, relationship, and case history
- resolve contradictions
- create the Subscriber Intelligence Profile
- identify missing context and confidence gaps

### 9.3 Relationship Mapping Agent

Responsibilities:

- build the subscriber's professional relationship graph
- extract candidate relationships from conversations and documents
- create proposed graph nodes, edges, and context assertions
- calculate transparent relationship-health factors
- flag missing and ambiguous entities

### 9.4 Niche Discovery Agent

Responsibilities:

- generate niche hypotheses
- map hypotheses to subscriber capabilities, relationships, markets, signals, and capital access
- identify assumptions and validation requirements
- recommend candidate vertical packs

### 9.5 Opportunity Scoring Agent

Responsibilities:

- apply transparent scoring rules
- rank niche opportunities
- display score components, evidence, confidence, and gaps
- avoid unsupported market or revenue claims

### 9.6 Activation Planning Agent

Responsibilities:

- create the 90-day activation plan
- assign actions, metrics, owners, and review gates
- recommend initial relationship actions
- establish baseline metrics

### 9.7 Signal Agent

Responsibilities:

- classify incoming conversations and documents
- create candidate signals
- connect signals to evidence and affected graph nodes
- score urgency, relevance, and confidence
- request human validation when confidence is low

### 9.8 Qualification Agent

Responsibilities:

- verify minimum intake completeness
- identify product pathways
- list missing documents
- flag policy conflicts
- show graph relationships used in qualification

### 9.9 ClearClose Underwriting Agent

Responsibilities:

- execute deterministic calculations
- prepare draft underwriting memos
- identify assumptions and missing evidence
- create risk flags and conditions
- connect every conclusion to its inputs and sources

All calculations must be reproducible independently of an LLM.

### 9.10 Lender Match Agent

Responsibilities:

- compare approved underwriting facts with versioned lender policies
- traverse permitted lender, program, BDM, submission, and outcome relationships
- rank eligible programs
- state reasons and graph paths for each match
- identify exceptions requiring discussion

### 9.11 Capital Match Agent

Responsibilities:

- route commercial, construction, bridge, and equity requirements
- respect investor mandates and consent boundaries
- identify trusted introduction paths
- prepare anonymized opportunity summaries before disclosure approval

### 9.12 Renewal and Outcome Learning Agents

Responsibilities:

- monitor maturity dates
- identify retention and refinance opportunities
- compare recommendations with outcomes
- update lender, relationship, subscriber, and niche metrics
- create knowledge assets
- never overwrite approved knowledge automatically

All recommendations require subscriber or authorized human review before activation.

---

## 10. Subscriber Onboarding Product Experience

The onboarding dashboard must show:

1. onboarding progress
2. verified and unverified context
3. Subscriber Intelligence Profile
4. Subscriber Business Graph
5. relationship clusters
6. capability map
7. market and client segment map
8. niche opportunity cards
9. evidence and score components
10. capability gaps
11. recommended vertical pack
12. 90-day activation plan
13. approval, correction, and rejection controls

The subscriber must be able to correct, reject, or supersede system conclusions before they become active.

---

## 11. Phased Delivery Plan

## Phase 0 — Repository and Product Alignment
**Target:** Week 1

### Deliverables

- approve naming: RIOS / ClearClose / MIX
- reconcile architecture terminology
- approve interpretable context methodology
- approve graph ontology and privacy model
- approve subscriber onboarding and niche-discovery methodology
- create architecture decision records
- define environment strategy
- create synthetic demonstration data

### Acceptance criteria

- one canonical glossary
- one canonical system diagram
- one canonical graph and context methodology
- one canonical subscriber onboarding methodology
- no conflicting definition of RIOS
- environments documented

---

## Phase 1 — Subscriber Onboarding Foundation
**Target:** Weeks 2–4

### Deliverables

- subscriber profile schema
- onboarding session and response schema
- guided onboarding interview
- subscriber context assertions
- subscriber business graph
- capability, market, relationship, goal, and constraint mapping
- subscriber review and correction workflow

### Acceptance criteria

- a subscriber completes onboarding
- key conclusions have evidence and verification states
- the subscriber can correct or reject conclusions
- profile fields are linked to context and graph records

---

## Phase 2 — Niche and Opportunity Intelligence
**Target:** Weeks 5–7

### Deliverables

- niche hypothesis generator
- transparent scoring model
- capability gap analysis
- relationship leverage map
- vertical-pack recommendation
- 90-day activation plan
- baseline metrics

### Acceptance criteria

- at least three niche hypotheses are evaluated where appropriate
- the top niche includes evidence, score components, confidence, gaps, and validation steps
- a vertical pack recommendation is produced
- the subscriber approves an activation plan

---

## Phase 3 — Context and Graph Foundation
**Target:** Weeks 8–11

### Deliverables

- context assertion schema
- graph node and edge schema
- edge-evidence records
- entity-resolution workflow
- relationship verification queue
- graph row-level security
- one-hop and two-hop graph visualization

### Acceptance criteria

- every active edge has evidence or explicit human confirmation
- ambiguous entities are not automatically merged
- users can inspect source, confidence, validity, and verification state
- graph traversal respects role, consent, and sensitivity boundaries

---

## Phase 4 — Core RIOS Mortgage Workflow
**Target:** Weeks 12–14

### Deliverables

- Relationship Asset Registry
- Signal Registry
- Opportunity Registry
- conversation and voice evidence records
- task and audit system
- operations dashboard

### Acceptance criteria

- a niche hypothesis or referral becomes a relationship path, signal, and opportunity
- every material change creates an audit record
- role-based access is enforced
- every opportunity displays its origin graph path

---

## Phase 5 — Strata and Estate Vertical Packs
**Target:** Weeks 15–18

### Deliverables

- vertical ontology extensions
- niche-fit rules
- pack manifests
- specialized intake flows
- signal classifiers
- workflows
- partner-facing submission forms
- output templates

### Acceptance criteria

- synthetic cases complete the full workflow
- pack-specific ontology does not contaminate the core ontology
- human approval gates block unauthorized agent actions
- sensitive relationships remain access-controlled

---

## Phase 6 — ClearClose Residential Engine
**Target:** Weeks 19–22

### Deliverables

- deterministic calculation service
- versioned underwriting cases
- assumption and evidence tracking
- draft underwriting memo
- scenario comparison output
- advisor approval UI

### Acceptance criteria

- calculations pass unit tests
- every result displays input data, graph relationships, evidence, and assumptions
- no lender recommendation is approved until human review
- approved memo versions are immutable

---

## Phase 7 — Lender Intelligence and Matching
**Target:** Weeks 23–26

### Deliverables

- Capital Source Registry
- lender program and policy graph
- policy effective dates and sources
- explainable match scoring
- graph-path explanations
- exception workflow
- BDM contact routing

### Acceptance criteria

- expired policy versions cannot produce a final match
- every match explains eligibility, risks, missing conditions, and relationship path
- outcomes are attributed to lender program and policy version

---

## Phase 8 — Hermes Agent Execution Layer
**Target:** Weeks 27–30

### Deliverables

- bounded agent context packages
- graph traversal permissions
- agent task contract
- orchestrator routing
- retry and escalation policies
- agent observability
- prompt/version registry
- human review queue

### Acceptance criteria

- agents receive only permitted context and graph depth
- agent actions are idempotent where required
- failures create visible exceptions
- agents cannot bypass authorization or approval gates
- recommendations include provenance, confidence, and graph paths

---

## Phase 9 — Subscriber and Referral Partner Pilot
**Target:** Weeks 31–34

### Pilot cohort

- 5 mortgage-professional subscribers
- 3 strata or estate lawyers
- 3 financial planners or accountants
- 2 property managers

### Deliverables

- onboarding workflow
- subscriber opportunity reports
- partner portal
- referral-source reporting
- pilot support playbook

### Acceptance criteria

- subscribers complete onboarding and approve an activation plan
- at least 20 synthetic or consented opportunities are processed
- niche recommendation quality is reviewed
- graph attribution completeness is measured
- user feedback becomes prioritized issues

---

## Phase 10 — Portfolio, Construction, and Exchange Expansion
**Target:** Weeks 35–52

### Deliverables

- portfolio investor pack
- construction and development pack
- controlled deal rooms
- opportunity/capital mandate graph matching
- trusted-introduction paths
- exchange analytics
- subscription and access controls

### Acceptance criteria

- subscriber niche recommendations can activate additional packs
- sensitive opportunities remain private by default
- disclosures are explicit and auditable
- marketplace matching cannot circumvent licensing or referral rules
- every network recommendation has an inspectable relationship path

---

## 12. First 90-Day Build Backlog

### Epic A — Canonical Architecture

- create `docs/GLOSSARY.md`
- create architecture decision records
- reconcile terminology
- document ClearClose service boundary
- approve both architecture standards

### Epic B — Subscriber Onboarding

- add subscriber profile tables
- add onboarding sessions and responses
- implement guided interview
- create subscriber context assertions
- build subscriber review and correction flow

### Epic C — Niche and Opportunity Intelligence

- implement subscriber capability graph
- implement relationship leverage map
- create niche hypothesis model
- implement transparent niche scoring
- create capability gap analysis
- create vertical-pack recommendation
- create 90-day activation-plan generator

### Epic D — Context and Graph Schema

- add context tables
- add graph nodes, edges, and evidence
- add entity-resolution candidates
- add merge history
- add graph RLS tests

### Epic E — Relationship Graph Experience

- build relationship explorer
- build assertion review queue
- show graph origin paths
- show evidence and confidence
- implement reversible entity merge

### Epic F — Core Opportunity Workflow

- add signal and opportunity tables
- create signal triage
- create opportunity stages
- create task templates
- create approval gates
- create outcome states

### Epic G — Vertical Pack Runtime

- define manifest schema
- define ontology extensions
- define niche-fit rules
- load and validate pack configuration
- render pack-specific intake
- execute pack-specific workflows

### Epic H — Initial Packs and ClearClose

- implement Strata pack
- implement Estate pack
- create calculation library
- implement residential ratios and equity analysis
- implement scenario comparison and memo generation
- connect inputs and conclusions to graph evidence

### Epic I — Quality and Security

- RLS tests
- graph traversal authorization tests
- niche scoring tests
- calculation unit tests
- synthetic fixtures
- audit-log tests
- entity-resolution collision tests
- prompt-injection tests
- backup and recovery documentation

---

## 13. Definition of Done

A feature is complete only when:

- requirements and acceptance criteria are documented
- data and graph permissions are defined
- context assertions are readable and source-linked
- niche or opportunity recommendations show evidence and score components
- the subscriber can correct or reject conclusions
- happy path and exception path are implemented
- audit events are captured
- automated tests pass
- synthetic examples are included
- user-facing documentation is updated
- agent actions and human approvals are distinguishable
- graph paths used in recommendations are inspectable
- disputed and superseded context remains preserved
- production monitoring is defined

---

## 14. Success Metrics

### Subscriber onboarding

- onboarding completion rate
- time to approved Subscriber Intelligence Profile
- verified context rate
- correction and rejection rate
- time to first approved niche recommendation
- activation-plan approval rate

### Niche and opportunity intelligence

- niche validation rate
- opportunities generated per recommended niche
- relationship-path conversion
- subscriber acceptance of recommendations
- capability gaps resolved
- time to first qualified opportunity

### Context and graph quality

- context assertions with evidence
- human verification rate
- unresolved entity candidates
- graph attribution completeness
- disputed assertion rate
- recommendations with inspectable graph paths

### Operational efficiency

- referral-to-triage time
- triage-to-ClearClose time
- underwriting preparation time
- missing-document cycles
- opportunity aging

### Revenue

- qualified opportunities
- funded volume
- commission and advisory revenue
- revenue per subscriber
- revenue per relationship asset
- revenue per vertical pack

---

## 15. Recommended Release Sequence

```text
Release 0.1 — Canonical context, graph, and onboarding standards
Release 0.2 — Subscriber profile, onboarding interview, and review
Release 0.3 — Niche discovery, transparent scoring, and activation plan
Release 0.4 — Context assertions, graph schema, and entity resolution
Release 0.5 — Relationship, signal, and opportunity workflow
Release 0.6 — Strata vertical pack
Release 0.7 — Estate and elder law vertical pack
Release 0.8 — ClearClose residential engine
Release 0.9 — Lender graph and explainable matching
Release 1.0 — Subscriber and referral pilot
Release 1.1 — Portfolio investor pack
Release 1.2 — Construction and development capital
Release 2.0 — Controlled relationship and capital exchange network
```

---

## 16. Immediate Next Actions

1. Adopt both architecture documents as binding implementation standards.
2. Create the canonical glossary and architecture decision records.
3. Implement the subscriber onboarding data model and guided interview.
4. Implement subscriber capability, relationship, market, goal, and constraint mapping.
5. Implement niche hypotheses, transparent scoring, capability gaps, and the 90-day activation plan.
6. Audit the Supabase schema against the subscriber, context, graph, and core domain models.
7. Implement context assertions, graph nodes, graph edges, and evidence.
8. Define vertical-pack ontology and niche-fit specifications.
9. Build the Strata Financial Resolution pack first.
10. Run the first subscriber pilot with measurable niche and opportunity outcomes.

---

## Strategic Position

**RIOS** understands the subscriber and operates the interpretable relationship system.  
**The Subscriber Business Graph** maps capabilities, markets, goals, constraints, and professional access.  
**The Relationship Graph** shows who and what are connected.  
**Interpretable Context** explains what those connections mean and why the system believes them.  
**Opportunity Intelligence** identifies the niches and business opportunities best suited to each subscriber.  
**ClearClose** is the underwriting brain.  
**Hermes** is the governed execution workforce.  
**MIX** is the relationship, mortgage, and capital intelligence exchange.
