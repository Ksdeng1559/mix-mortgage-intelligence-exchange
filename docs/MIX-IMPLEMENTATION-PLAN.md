# MIX — Mortgage Intelligence Exchange
## Implementation Plan

**Document status:** Build-ready v1.1  
**Operating system:** RIOS — Relationship Intelligence Operating System  
**Underwriting engine:** ClearClose  
**Market-facing platform:** MIX — Mortgage Intelligence Exchange  
**Context and relationship foundation:** [Interpretable Context and Relationship Graph](INTERPRETABLE-CONTEXT-GRAPH.md)

---

## 1. Executive Objective

Build MIX as a relationship-driven mortgage and real-estate capital intelligence platform that converts:

```text
Source Evidence
→ Interpretable Context
→ Relationship Graph
→ Signal
→ Opportunity
→ ClearClose Underwriting
→ Lender / Capital Match
→ Outcome
→ Updated Graph Knowledge
```

MIX is not intended to be another contact-centric mortgage CRM. It must preserve the meaning, origin, evidence, timing, confidence, and privacy scope of relationships. It should identify financing events, structure opportunities through ClearClose, route them to suitable lenders or capital providers, and compound the resulting knowledge.

The initial implementation will focus on four vertical packs:

1. Strata Financial Resolution
2. Estate & Elder Law Financing
3. Portfolio Investor Lending
4. Construction & Development Capital

The first production release should prioritize the first two packs because they provide the shortest route to referral-driven revenue and require the least expansion of the existing lender network.

---

## 2. Mandatory Architectural Foundation

The Interpretable Context and Relationship Graph methodology is a core build requirement, not an optional future enhancement.

MIX must use:

- atomic, readable context assertions
- source-linked relationship evidence
- graph nodes and edges for people, organizations, properties, opportunities, lenders, decisions, and outcomes
- confidence and human-verification states
- temporal validity and version history
- role-based graph visibility
- explainable graph paths for agent recommendations
- vector retrieval only as a discovery mechanism, never as proof of a relationship

The canonical implementation standard is defined in:

- [`docs/INTERPRETABLE-CONTEXT-GRAPH.md`](INTERPRETABLE-CONTEXT-GRAPH.md)

No relationship-scoring, matching, referral-intelligence, or opportunity-intelligence feature is complete unless its graph path and supporting context can be inspected.

---

## 3. Platform Boundaries

### RIOS

RIOS is the internal operating system responsible for:

- interpretable context assembly
- relationship graph construction and traversal
- relationship memory
- opportunity intelligence
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

- professional referral intake
- financing opportunity submission
- relationship-path visibility
- lender and capital-source matching
- opportunity collaboration
- case-status visibility
- partner attribution
- outcome reporting
- exchange-level intelligence

---

## 4. Implementation Principles

1. **Interpretable context first** — every material fact, inference, and recommendation must be readable, source-linked, scoped, versioned, and reviewable.
2. **Graph-native relationships** — relationships are represented as nodes and edges, not merely foreign keys or free-text notes.
3. **Glass-box workflows** — every major workflow must be documented, numbered, versioned, and inspectable.
4. **Human approval for regulated decisions** — agents may recommend, summarize, and route; licensed professionals approve advice, submissions, underwriting conclusions, and client communications.
5. **Relationship before transaction** — every opportunity must retain its origin relationship, context, consent basis, and attribution.
6. **Signals create opportunities** — the system must distinguish a raw signal from a qualified financing opportunity.
7. **Outcomes create intelligence** — funded, declined, withdrawn, referred, and restructured outcomes update lender, relationship, and workflow knowledge.
8. **Vertical packs are configuration** — vertical logic is swappable without duplicating the core platform.
9. **Explainable matching** — lender and capital matches include reasons, graph paths, missing conditions, policy source, confidence, and review status.
10. **Minimum necessary data** — collect and expose only the client information necessary for the workflow and user role.

---

## 5. Target System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│ MIX EXPERIENCE LAYER                                          │
│ Partner Portal │ Advisor Workspace │ Graph Explorer │ Ops      │
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
│ Relationship │ Signal │ Qualification │ Underwriting          │
│ Lender Match │ Capital Match │ Renewal │ Outcome Learning      │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ DATA AND KNOWLEDGE LAYER                                      │
│ Supabase/Postgres │ Graph Projection │ Qdrant/pgvector         │
│ Markdown Context Vault │ Lender Registry │ Capital Registry     │
└───────────────────────────────────────────────────────────────┘
```

---

## 6. Core Domain and Graph Model

The production schema should support relational system-of-record entities plus graph projections.

### 6.1 Organization and Workspace

- `organizations`
- `workspaces`
- `users`
- `roles`
- `workspace_memberships`
- `permissions`

### 6.2 Interpretable Context

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

### 6.3 Relationship Graph

- `graph_nodes`
- `graph_edges`
- `graph_edge_evidence`
- `graph_path_cache`
- `entity_resolution_candidates`
- `entity_merge_history`

Every active edge must have evidence or an explicit human assertion.

### 6.4 Relationship Asset Registry

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

### 6.5 Conversation and Evidence

- `conversations`
- `voice_notes`
- `transcripts`
- `summaries`
- `documents`
- `document_extractions`
- `source_citations`
- `consent_records`

Every extracted fact must retain its source and review state.

### 6.6 Signal Registry

- `signals`
- `signal_types`
- `signal_sources`
- `signal_scores`
- `signal_reviews`

Examples:

- special assessment issued
- probate opened
- mortgage maturity approaching
- beneficiary buyout required
- construction permit approved
- cost overrun identified
- rental acquisition planned
- care funding required

Signals must connect through graph edges to their source evidence, affected parties, properties, and resulting opportunities.

### 6.7 Opportunity Registry

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
Signal Detected
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

Every opportunity must display its origin graph path.

### 6.8 Property and Borrower Records

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

### 6.9 ClearClose Underwriting

- `underwriting_cases`
- `underwriting_versions`
- `underwriting_inputs`
- `underwriting_calculations`
- `underwriting_conditions`
- `underwriting_risk_flags`
- `underwriting_memos`
- `human_approvals`

ClearClose facts, assumptions, risks, decisions, and outcomes must be graph-addressable and source-linked.

### 6.10 Lender and Capital Intelligence

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

Capital-source types:

- Schedule I bank
- credit union
- alternative lender
- MIC
- private lender
- syndicate
- family office
- JV equity partner
- preferred equity provider

### 6.11 Outcome and Knowledge Assets

- `outcomes`
- `commissions`
- `advisory_fees`
- `case_studies`
- `lessons_learned`
- `workflow_metrics`
- `agent_evaluations`
- `knowledge_assets`

Outcomes must update graph relationships without silently rewriting verified knowledge.

---

## 7. Vertical Pack Contract

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
- target relationships
- graph node extensions
- graph edge extensions
- permitted context assertion types
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

## 8. Initial Vertical Packs

## 8.1 Strata Financial Resolution

### Target relationships

- strata lawyers
- strata managers
- property managers
- condo realtors
- insurance adjusters
- restoration firms

### Graph extensions

Nodes:

- `StrataCorporation`
- `StrataLot`
- `SpecialAssessment`
- `StrataLien`
- `RepairProject`

Edges:

- `MEMBER_OF_STRATA`
- `ASSESSED_FOR`
- `ENCUMBERED_BY`
- `MANAGED_BY`
- `REPRESENTED_BY`

### Signals

- special assessment
- strata lien
- building-envelope repair
- parkade repair
- water-loss claim
- strata wind-up
- urgent payment deadline

### ClearClose inputs

- property value
- registered mortgage balances
- assessment amount
- assessment due date
- owner age
- household income
- credit profile
- property occupancy
- strata documentation

### Outputs

- refinance feasibility
- HELOC feasibility
- reverse mortgage feasibility
- private bridge feasibility
- funding-gap calculation
- recommended next action
- required documents

### First workflow

```text
Referral Received
→ Relationship Path Captured
→ Consent and Conflict Check
→ Assessment Notice Uploaded
→ Context Assertions Proposed
→ Graph Relationships Verified
→ Property and Mortgage Data Captured
→ ClearClose Equity Review
→ Product Path Comparison
→ Licensed Advisor Approval
→ Client Options Report
→ Lender Submission
→ Outcome Recorded
→ Graph and Knowledge Updated
```

## 8.2 Estate & Elder Law Financing

### Target relationships

- estate lawyers
- elder law lawyers
- executors
- accountants
- financial planners
- family representatives

### Graph extensions

Nodes:

- `Estate`
- `Will`
- `ExecutorRole`
- `RepresentationAgreement`
- `BeneficiaryInterest`

Edges:

- `EXECUTOR_OF`
- `BENEFICIARY_OF`
- `AUTHORIZED_BY`
- `REPRESENTED_BY`
- `HAS_BENEFICIAL_INTEREST`

### Signals

- probate
- beneficiary buyout
- estate liquidity shortfall
- care-home funding
- aging in place
- representation agreement
- power of attorney
- property carrying-cost pressure

### Outputs

- estate liquidity report
- beneficiary buyout analysis
- reverse mortgage analysis
- refinance analysis
- short-term bridge analysis
- source-of-repayment summary

### Mandatory controls

- legal-authority status recorded
- client capacity and consent workflow
- representation limitations documented
- licensed and legal review gates
- no automated legal conclusion
- sensitive legal relationships hidden from unauthorized graph traversal

## 8.3 Portfolio Investor Lending

### Target relationships

- financial planners
- accountants
- property managers
- real-estate lawyers
- realtors
- investors

### Graph extensions

Nodes:

- `Portfolio`
- `HoldingCompany`
- `RentalProperty`
- `MortgageMaturity`

Edges:

- `HELD_BY`
- `GUARANTEED_BY`
- `PART_OF_PORTFOLIO`
- `MATURES_ON`
- `CROSS_COLLATERALIZED_WITH`

### Signals

- mortgage maturity
- acquisition
- equity extraction
- HoldCo restructuring
- cash-flow pressure
- lender concentration

### ClearClose calculations

- portfolio LTV
- property-level DSCR
- global DSCR
- liquidity
- net worth
- concentration risk
- renewal exposure

### Outputs

- portfolio health score
- refinance opportunities
- renewal calendar
- equity extraction capacity
- lender diversification recommendations

## 8.4 Construction & Development Capital

### Target relationships

- construction lawyers
- architects
- engineers
- builders
- developers
- development consultants

### Graph extensions

Nodes:

- `DevelopmentProject`
- `Permit`
- `Budget`
- `DrawRequest`
- `BuilderLien`
- `CapitalStack`

Edges:

- `DEVELOPED_BY`
- `FINANCED_BY`
- `HAS_PERMIT`
- `HAS_COST_OVERRUN`
- `SECURED_BY`
- `FUNDED_THROUGH`

### Signals

- land acquisition
- rezoning
- permit approval
- construction draw shortfall
- cost overrun
- builder lien
- permit delay
- takeout financing requirement

### ClearClose calculations

- LTC
- current and stabilized LTV
- cost to complete
- contingency adequacy
- interest reserve
- project equity
- exit feasibility

### Outputs

- sources and uses
- capital stack
- debt and equity gap
- lender shortlist
- mezzanine/preferred equity options
- risk and condition report

---

## 9. Agent Workforce

The existing agent specifications remain, but every agent must operate through bounded interpretable context and permitted graph traversal.

### 9.1 Relationship Agent

Responsibilities:

- extract candidate relationships from conversations and documents
- create proposed graph nodes, edges, and context assertions
- update partner histories
- calculate transparent relationship health
- identify neglected high-value partners
- recommend non-promotional follow-up
- attribute opportunities and outcomes

Prohibited without approval:

- sending regulated advice
- changing referral compensation
- disclosing borrower information
- activating sensitive inferred relationships

### 9.2 Signal Agent

Responsibilities:

- classify incoming conversations and documents
- create candidate signals
- connect signals to evidence and affected graph nodes
- score urgency, relevance, and confidence
- request human validation when confidence is low

### 9.3 Qualification Agent

Responsibilities:

- verify minimum intake completeness
- identify product pathways
- list missing documents
- flag policy conflicts
- show the graph relationships used in qualification

### 9.4 ClearClose Underwriting Agent

Responsibilities:

- execute deterministic calculations
- prepare draft underwriting memos
- identify assumptions and missing evidence
- create risk flags and conditions
- connect every conclusion to its inputs and sources

All calculations must be reproducible independently of an LLM.

### 9.5 Lender Match Agent

Responsibilities:

- compare approved underwriting facts with versioned lender policies
- traverse permitted lender, program, BDM, submission, and outcome relationships
- rank eligible programs
- state reasons and graph paths for each match
- identify exceptions requiring discussion

### 9.6 Capital Match Agent

Responsibilities:

- route commercial, construction, bridge, and equity requirements
- respect investor mandates and consent boundaries
- identify trusted introduction paths
- prepare anonymized opportunity summaries before disclosure approval

### 9.7 Renewal Agent

Responsibilities:

- monitor maturity dates
- trigger 180/120/90/60/30-day workflows
- request updated borrower data
- identify retention and refinance opportunities
- connect renewals to the relationship graph

### 9.8 Outcome Learning Agent

Responsibilities:

- compare recommendation with actual outcome
- update lender-performance and relationship metrics
- propose policy and workflow changes
- create new knowledge assets
- never overwrite approved policy knowledge automatically

---

## 10. ClearClose Module Requirements

## 10.1 Residential Module

Minimum calculations:

- GDS
- TDS
- qualifying payment
- stress-test rate
- LTV
- available equity
- refinance proceeds

## 10.2 Portfolio Module

Minimum calculations:

- aggregate debt
- aggregate property value
- portfolio LTV
- property DSCR
- global DSCR
- liquidity ratio
- renewal concentration

## 10.3 Commercial Module

Minimum calculations:

- NOI
- DSCR
- debt yield
- cap rate
- break-even occupancy
- maximum proceeds by LTV, DSCR, and debt yield

## 10.4 Construction Module

Minimum calculations:

- land and project cost
- LTC
- current/as-complete LTV
- equity invested and remaining
- interest reserve
- contingency ratio
- cost to complete
- exit sensitivity

## 10.5 Underwriting Memo Standard

Every generated memo should include:

1. executive summary
2. transaction request
3. borrower and sponsor profile
4. relationship and referral path
5. property/project summary
6. sources and uses
7. calculations
8. strengths
9. risks
10. mitigants
11. assumptions
12. missing information
13. proposed lender/capital path
14. evidence and context references
15. human review and approval record

---

## 11. Product Experiences

## 11.1 Internal Advisor Workspace

First-release views:

- relationship dashboard
- relationship graph explorer
- context assertion review queue
- signal inbox
- opportunity pipeline
- ClearClose case workspace
- lender match results with graph paths
- document checklist
- task queue
- referral attribution
- outcome reporting

## 11.2 Referral Partner Portal

First-release capabilities:

- secure referral submission
- consent acknowledgment
- document upload
- status milestones
- request-for-information responses
- non-sensitive relationship-path confirmation
- non-sensitive outcome summary
- partner impact dashboard

The portal must not expose lender deliberations, protected borrower information, legal privilege, or internal compliance notes to unauthorized partners.

## 11.3 Operations Dashboard

- pipeline by vertical pack
- opportunities by stage
- aging and stalled files
- partner-sourced revenue
- referral-path performance
- graph coverage and unresolved entities
- lender turnaround
- approval and decline reasons
- agent exception queue
- data-quality alerts

---

## 12. Phased Delivery Plan

## Phase 0 — Repository and Product Alignment
**Target:** Week 1

### Deliverables

- approve naming: RIOS / ClearClose / MIX
- reconcile architecture terminology across repository documents
- approve interpretable context methodology
- approve graph ontology and privacy model
- create architecture decision records
- define environment strategy
- establish issue labels and milestones
- create synthetic demonstration data

### Acceptance criteria

- one canonical glossary
- one canonical system diagram
- one canonical graph and context methodology
- no conflicting definition of RIOS
- development, staging, and production environments documented

---

## Phase 1 — Context and Graph Foundation
**Target:** Weeks 2–5

### Deliverables

- workspace and role model
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
- users can inspect the source, confidence, validity, and verification state of a relationship
- graph traversal respects workspace, role, consent, and sensitivity boundaries

---

## Phase 2 — Core RIOS Mortgage Workflow
**Target:** Weeks 6–8

### Deliverables

- Relationship Asset Registry
- Signal Registry
- Opportunity Registry
- conversation and voice evidence records
- task and audit system
- initial operations dashboard

### Acceptance criteria

- a referral becomes an interpretable relationship path, signal, and opportunity
- every material change creates an audit record
- role-based data access is enforced
- a user can identify the source and owner of each opportunity
- every opportunity displays its origin graph path

---

## Phase 3 — Strata and Estate Vertical Packs
**Target:** Weeks 9–12

### Deliverables

- vertical ontology extensions
- pack manifests
- specialized intake flows
- document checklists
- signal classifiers
- workflow definitions
- partner-facing submission forms
- output report templates

### Acceptance criteria

- synthetic strata and estate cases complete the full workflow
- pack-specific ontology does not contaminate the core ontology
- human approval gates block unauthorized agent actions
- sensitive legal and client relationships remain access-controlled

---

## Phase 4 — ClearClose Residential Engine
**Target:** Weeks 13–16

### Deliverables

- deterministic calculation service
- versioned underwriting cases
- assumption and evidence tracking
- draft underwriting memo
- HELOC/refinance/reverse/private comparison output
- advisor approval UI

### Acceptance criteria

- calculations pass unit tests against known scenarios
- every result displays input data, graph relationships, evidence, and assumptions
- no lender recommendation is approved until human review
- memo versions are immutable after approval

---

## Phase 5 — Lender Intelligence and Matching
**Target:** Weeks 17–20

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

## Phase 6 — Hermes Agent Execution Layer
**Target:** Weeks 21–24

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
- each recommendation includes provenance, confidence, and cited graph path

---

## Phase 7 — Referral Partner Pilot
**Target:** Weeks 25–28

### Pilot cohort

- 3 strata/estate lawyers
- 3 financial planners/accountants
- 2 property managers
- internal mortgage advisory team

### Deliverables

- onboarding workflow
- partner portal
- referral-source reporting
- service-level expectations
- pilot support playbook

### Acceptance criteria

- at least 20 synthetic or consented pilot opportunities processed
- median intake-to-triage time measured
- partner status visibility validated
- graph attribution completeness measured
- user feedback converted into prioritized issues

---

## Phase 8 — Portfolio Investor Pack
**Target:** Weeks 29–34

### Deliverables

- multi-property ownership graph
- renewal calendar
- portfolio calculations
- portfolio health report
- lender concentration analysis

### Acceptance criteria

- a borrower owns multiple entities and properties through explicit graph relationships
- property-level and global calculations reconcile
- renewal opportunities are generated automatically
- beneficial ownership and guarantee relationships remain explainable

---

## Phase 9 — Construction and Development Pack
**Target:** Weeks 35–42

### Deliverables

- project relationship graph
- project budget and draws
- sources and uses
- construction underwriting module
- capital stack builder
- debt/equity matching
- anonymized investor summary workflow

### Acceptance criteria

- cost-to-complete and capital-gap analysis are reproducible
- project participants, obligations, liens, permits, and capital sources are graph-connected
- disclosure permissions are enforced
- debt, mezzanine, preferred equity, and JV paths can be compared

---

## Phase 10 — MIX Exchange Network
**Target:** Weeks 43–52

### Deliverables

- controlled deal rooms
- opportunity/capital mandate graph matching
- trusted-introduction paths
- network participation model
- exchange analytics
- subscription and access controls
- partner reputation and performance metrics

### Acceptance criteria

- sensitive opportunities remain private by default
- all disclosures are explicit and auditable
- marketplace matching cannot circumvent licensing or referral rules
- platform revenue and transaction attribution are measurable
- every network recommendation has an inspectable relationship path

---

## 13. First 90-Day Build Backlog

### Epic A — Canonical Architecture

- create `docs/GLOSSARY.md`
- create architecture decision records
- reconcile Relationship Intelligence vs Real-Time Intelligence terminology
- document ClearClose service boundary
- approve `INTERPRETABLE-CONTEXT-GRAPH.md`

### Epic B — Context and Graph Schema

- add `context_assertions`
- add context version and source tables
- add `graph_nodes`
- add `graph_edges`
- add `graph_edge_evidence`
- add entity-resolution candidates
- add merge history
- add graph RLS tests

### Epic C — Core Workflow Schema

- add organization/workspace tables
- add relationship tables
- add signal tables
- add opportunity tables
- add consent and source-evidence tables
- add audit events

### Epic D — Relationship Graph Experience

- build relationship explorer
- build relationship assertion review queue
- show graph origin path on opportunities
- show evidence and confidence on edges
- implement reversible entity merge

### Epic E — Opportunity Workflow

- create signal triage
- create opportunity stages
- create task templates
- create approval gates
- create outcome states

### Epic F — Vertical Pack Runtime

- define manifest schema
- define ontology extension schema
- load pack configuration
- validate pack versions
- render pack-specific intake
- execute pack-specific workflows

### Epic G — Strata Pack

- implement strata ontology
- implement special-assessment intake
- implement equity/funding-gap analysis
- generate client options report
- create partner referral form

### Epic H — Estate Pack

- implement estate ontology
- implement authority/capacity fields
- implement estate-liquidity intake
- implement beneficiary-buyout analysis
- generate estate liquidity report

### Epic I — ClearClose MVP

- create calculation library
- implement residential ratios
- implement equity analysis
- implement scenario comparison
- implement memo generation
- implement approval/version controls
- connect inputs and conclusions to graph evidence

### Epic J — Quality and Security

- RLS tests
- graph traversal authorization tests
- calculation unit tests
- synthetic fixtures
- audit-log tests
- prompt-injection tests for uploaded documents
- entity-resolution collision tests
- backup and recovery documentation

---

## 14. Definition of Done

A feature is complete only when:

- requirements and acceptance criteria are documented
- data and graph permissions are defined
- context assertions are readable and source-linked
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

## 15. Governance and Compliance Gates

Before handling live borrower information, complete:

- privacy impact assessment
- consent and disclosure templates
- graph visibility and relationship-discovery policy
- data retention schedule
- access-control review
- vendor/subprocessor register
- incident response plan
- business continuity plan
- jurisdiction-specific mortgage and referral compliance review
- legal review of exchange, investor, and capital-introduction workflows

No AI agent should independently:

- provide final mortgage advice
- approve a borrower
- represent lender policy as guaranteed
- send a lender submission
- release personal information to a referral partner
- make a legal-capacity determination
- promise funding
- activate a sensitive inferred relationship without required review

---

## 16. Success Metrics

### Adoption

- active internal users
- active referral partners
- voice/conversation capture rate
- intake completion rate

### Context and graph quality

- context assertions with evidence
- human verification rate
- unresolved entity-resolution candidates
- graph attribution completeness
- disputed assertion rate
- recommendations with inspectable graph paths

### Operational efficiency

- referral-to-triage time
- triage-to-ClearClose time
- time spent assembling underwriting memos
- missing-document cycles
- opportunity aging

### Relationship intelligence

- referrals per active partner
- partner response time
- partner retention
- relationship coverage
- referral attribution completeness
- trusted-path conversion rate

### Revenue

- qualified opportunities
- funded volume
- commission revenue
- commercial/advisory revenue
- revenue per relationship asset
- revenue per vertical pack

### Intelligence quality

- signal precision
- lender match acceptance
- recommendation override rate
- calculation defect rate
- outcome-learning coverage

---

## 17. Recommended Release Sequence

```text
Release 0.1 — Canonical context methodology and graph ontology
Release 0.2 — Context assertions, graph schema, and entity resolution
Release 0.3 — Relationship, signal, and opportunity workflow
Release 0.4 — Strata vertical pack
Release 0.5 — Estate and elder law vertical pack
Release 0.6 — ClearClose residential engine
Release 0.7 — Lender graph and explainable matching
Release 0.8 — Hermes agent execution and review queues
Release 0.9 — Referral partner pilot
Release 1.0 — Production-ready Mortgage Intelligence Exchange
Release 1.1 — Portfolio investor pack
Release 1.2 — Construction and development capital
Release 2.0 — Controlled relationship and capital exchange network
```

---

## 18. Immediate Next Actions

1. Adopt the Interpretable Context and Relationship Graph document as a binding architecture standard.
2. Create the canonical glossary and architecture decision records.
3. Audit the current Supabase schema against the context, graph, and core domain model.
4. Implement context assertions, graph nodes, graph edges, and evidence tables.
5. Define the vertical-pack ontology extension specification.
6. Build the Relationship Agent verification workflow.
7. Implement the Relationship, Signal, and Opportunity registries.
8. Build the Strata Financial Resolution pack first.
9. Connect ClearClose calculations only after deterministic tests are defined.
10. Run the first pilot with a small, measurable professional referral cohort.

---

## Strategic Position

**RIOS** is the interpretable relationship operating system.  
**The Relationship Graph** shows who and what are connected.  
**Interpretable Context** explains what those connections mean and why the system believes them.  
**ClearClose** is the underwriting brain.  
**Hermes** is the governed execution workforce.  
**MIX** is the relationship, mortgage, and capital intelligence exchange.

Together, they create a system that does more than store mortgage contacts: it detects real financing problems, structures solutions, routes opportunities, preserves institutional knowledge, and compounds the value of every professional relationship and funded outcome.
