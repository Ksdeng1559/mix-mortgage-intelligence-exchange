# MIX — Mortgage Intelligence Exchange
## Implementation Plan

**Document status:** Build-ready v1.0  
**Operating system:** RIOS — Relationship Intelligence Operating System  
**Underwriting engine:** ClearClose  
**Market-facing platform:** MIX — Mortgage Intelligence Exchange

---

## 1. Executive Objective

Build MIX as a relationship-driven mortgage and real-estate capital intelligence platform that converts:

```text
Relationship → Signal → Opportunity → Underwriting → Capital Match → Outcome → Knowledge Asset
```

MIX is not intended to be another contact-centric mortgage CRM. It should identify financing events, preserve relationship context, structure opportunities through ClearClose, route them to suitable lenders or capital providers, and compound the resulting knowledge.

The initial implementation will focus on four vertical packs:

1. Strata Financial Resolution
2. Estate & Elder Law Financing
3. Portfolio Investor Lending
4. Construction & Development Capital

The first production release should prioritize the first two packs because they provide the shortest route to referral-driven revenue and require the least expansion of the existing lender network.

---

## 2. Platform Boundaries

### RIOS

RIOS is the internal operating system responsible for:

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
- lender and capital-source matching
- opportunity collaboration
- case-status visibility
- partner attribution
- outcome reporting
- exchange-level intelligence

---

## 3. Implementation Principles

1. **Glass-box workflows** — every major workflow must be documented, numbered, versioned, and inspectable.
2. **Human approval for regulated decisions** — agents may recommend, summarize, and route; licensed professionals approve advice, submissions, underwriting conclusions, and client communications.
3. **Relationship before transaction** — every opportunity must retain its origin relationship, context, consent basis, and attribution.
4. **Signals create opportunities** — the system should distinguish a raw signal from a qualified financing opportunity.
5. **Outcomes create intelligence** — funded, declined, withdrawn, referred, and restructured outcomes must update lender and workflow knowledge.
6. **Vertical packs are configuration** — vertical logic should be swappable without duplicating the core platform.
7. **Explainable matching** — lender and capital matches must include reasons, missing conditions, policy source, confidence, and review status.
8. **Minimum necessary data** — collect and expose only the client information necessary for the workflow and user role.

---

## 4. Target System Architecture

```text
┌───────────────────────────────────────────────────────────────┐
│ MIX EXPERIENCE LAYER                                          │
│ Partner Portal │ Advisor Workspace │ Operations Dashboard      │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ RIOS APPLICATION SERVICES                                     │
│ Relationships │ Signals │ Opportunities │ Tasks │ Outcomes     │
│ Conversations │ Knowledge │ Consent │ Audit │ Notifications    │
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
│ Lender Match │ Capital Match │ Renewal │ Reactivation          │
└──────────────────────────────┬────────────────────────────────┘
                               │
┌──────────────────────────────▼────────────────────────────────┐
│ DATA AND KNOWLEDGE LAYER                                      │
│ Supabase/Postgres │ pgvector/Qdrant │ Markdown Knowledge Vault │
│ Lender Registry │ Capital Registry │ Workflow Definitions      │
└───────────────────────────────────────────────────────────────┘
```

---

## 5. Core Domain Model

The production schema should support the following first-class objects.

### 5.1 Organization and Workspace

- `organizations`
- `workspaces`
- `users`
- `roles`
- `workspace_memberships`
- `permissions`

### 5.2 Relationship Asset Registry

- `relationships`
- `people`
- `companies`
- `relationship_roles`
- `relationship_strength_events`
- `referral_agreements`
- `referral_attributions`
- `relationship_interactions`

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

### 5.3 Conversation and Evidence

- `conversations`
- `voice_notes`
- `transcripts`
- `summaries`
- `documents`
- `document_extractions`
- `source_citations`
- `consent_records`

Every extracted fact should retain its source and review state.

### 5.4 Signal Registry

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

### 5.5 Opportunity Registry

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

### 5.6 Property and Borrower Records

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

### 5.7 ClearClose Underwriting

- `underwriting_cases`
- `underwriting_versions`
- `underwriting_inputs`
- `underwriting_calculations`
- `underwriting_conditions`
- `underwriting_risk_flags`
- `underwriting_memos`
- `human_approvals`

### 5.8 Lender and Capital Intelligence

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

### 5.9 Outcome and Knowledge Assets

- `outcomes`
- `commissions`
- `advisory_fees`
- `case_studies`
- `lessons_learned`
- `workflow_metrics`
- `agent_evaluations`
- `knowledge_assets`

---

## 6. Vertical Pack Contract

Each vertical pack should be stored as a versioned configuration package rather than embedded directly into application code.

```text
vertical-packs/<pack-slug>/
├── manifest.yaml
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

## 7. Initial Vertical Packs

## 7.1 Strata Financial Resolution

### Target relationships

- strata lawyers
- strata managers
- property managers
- condo realtors
- insurance adjusters
- restoration firms

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
→ Consent and Conflict Check
→ Assessment Notice Uploaded
→ Property and Mortgage Data Captured
→ ClearClose Equity Review
→ Product Path Comparison
→ Licensed Advisor Approval
→ Client Options Report
→ Lender Submission
→ Outcome Recorded
```

## 7.2 Estate & Elder Law Financing

### Target relationships

- estate lawyers
- elder law lawyers
- executors
- accountants
- financial planners
- family representatives

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

## 7.3 Portfolio Investor Lending

### Target relationships

- financial planners
- accountants
- property managers
- real-estate lawyers
- realtors
- investors

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

## 7.4 Construction & Development Capital

### Target relationships

- construction lawyers
- architects
- engineers
- builders
- developers
- development consultants

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

## 8. Agent Workforce

The existing agent specifications should remain, but agent responsibilities should be mapped to the RIOS/MIX domain model.

### 8.1 Relationship Agent

Responsibilities:

- update partner histories
- calculate relationship health
- identify neglected high-value partners
- recommend non-promotional follow-up
- attribute opportunities and outcomes

Prohibited without approval:

- sending regulated advice
- changing referral compensation
- disclosing borrower information

### 8.2 Signal Agent

Responsibilities:

- classify incoming conversations and documents
- create candidate signals
- score urgency, relevance, and confidence
- request human validation when confidence is low

### 8.3 Qualification Agent

Responsibilities:

- verify minimum intake completeness
- identify product pathways
- list missing documents
- flag policy conflicts

### 8.4 ClearClose Underwriting Agent

Responsibilities:

- execute deterministic calculations
- prepare draft underwriting memos
- identify assumptions and missing evidence
- create risk flags and conditions

All calculations must be reproducible independently of an LLM.

### 8.5 Lender Match Agent

Responsibilities:

- compare approved underwriting facts with versioned lender policies
- rank eligible programs
- state reasons for each match
- identify exceptions requiring discussion

### 8.6 Capital Match Agent

Responsibilities:

- route commercial, construction, bridge, and equity requirements
- respect investor mandates and consent boundaries
- prepare anonymized opportunity summaries before disclosure approval

### 8.7 Renewal Agent

Responsibilities:

- monitor maturity dates
- trigger 180/120/90/60/30-day workflows
- request updated borrower data
- identify retention and refinance opportunities

### 8.8 Outcome Learning Agent

Responsibilities:

- compare recommendation with actual outcome
- update lender-performance metrics
- propose policy and workflow changes
- never overwrite approved policy knowledge automatically

---

## 9. ClearClose Module Requirements

## 9.1 Residential Module

Minimum calculations:

- GDS
- TDS
- qualifying payment
- stress-test rate
- LTV
- available equity
- refinance proceeds

## 9.2 Portfolio Module

Minimum calculations:

- aggregate debt
- aggregate property value
- portfolio LTV
- property DSCR
- global DSCR
- liquidity ratio
- renewal concentration

## 9.3 Commercial Module

Minimum calculations:

- NOI
- DSCR
- debt yield
- cap rate
- break-even occupancy
- maximum proceeds by LTV, DSCR, and debt yield

## 9.4 Construction Module

Minimum calculations:

- land and project cost
- LTC
- current/as-complete LTV
- equity invested and remaining
- interest reserve
- contingency ratio
- cost to complete
- exit sensitivity

## 9.5 Underwriting Memo Standard

Every generated memo should include:

1. executive summary
2. transaction request
3. borrower and sponsor profile
4. property/project summary
5. sources and uses
6. calculations
7. strengths
8. risks
9. mitigants
10. assumptions
11. missing information
12. proposed lender/capital path
13. human review and approval record

---

## 10. Product Experiences

## 10.1 Internal Advisor Workspace

First-release views:

- relationship dashboard
- signal inbox
- opportunity pipeline
- ClearClose case workspace
- lender match results
- document checklist
- task queue
- referral attribution
- outcome reporting

## 10.2 Referral Partner Portal

First-release capabilities:

- secure referral submission
- consent acknowledgment
- document upload
- status milestones
- request-for-information responses
- non-sensitive outcome summary
- partner impact dashboard

The portal must not expose lender deliberations, protected borrower information, or internal compliance notes to unauthorized partners.

## 10.3 Operations Dashboard

- pipeline by vertical pack
- opportunities by stage
- aging and stalled files
- partner-sourced revenue
- lender turnaround
- approval and decline reasons
- agent exception queue
- data-quality alerts

---

## 11. Phased Delivery Plan

## Phase 0 — Repository and Product Alignment
**Target:** Week 1

### Deliverables

- approve naming: RIOS / ClearClose / MIX
- reconcile architecture terminology across repository documents
- create architecture decision records
- define environment strategy
- establish issue labels and milestones
- create synthetic demonstration data

### Acceptance criteria

- one canonical glossary
- one canonical system diagram
- no conflicting definition of RIOS
- development, staging, and production environments documented

---

## Phase 1 — Core RIOS Mortgage Foundation
**Target:** Weeks 2–5

### Deliverables

- workspace and role model
- Relationship Asset Registry
- Signal Registry
- Opportunity Registry
- conversation/voice evidence records
- task and audit system
- initial operations dashboard

### Acceptance criteria

- a referral can become a relationship, signal, and opportunity
- every material change creates an audit record
- role-based data access is enforced
- a user can identify the source and owner of each opportunity

---

## Phase 2 — Strata and Estate Vertical Packs
**Target:** Weeks 6–9

### Deliverables

- pack manifests
- specialized intake flows
- document checklists
- signal classifiers
- workflow definitions
- partner-facing submission forms
- output report templates

### Acceptance criteria

- synthetic strata and estate cases can complete the full workflow
- pack-specific fields do not contaminate the core schema
- human approval gates block unauthorized agent actions

---

## Phase 3 — ClearClose Residential Engine
**Target:** Weeks 10–13

### Deliverables

- deterministic calculation service
- versioned underwriting cases
- assumption and evidence tracking
- draft underwriting memo
- HELOC/refinance/reverse/private comparison output
- advisor approval UI

### Acceptance criteria

- calculations pass unit tests against known scenarios
- every result displays input data and assumptions
- no lender recommendation is presented as approved until human review
- memo versions are immutable after approval

---

## Phase 4 — Lender Intelligence and Matching
**Target:** Weeks 14–17

### Deliverables

- Capital Source Registry
- lender program and policy model
- policy effective dates and sources
- explainable match scoring
- exception workflow
- BDM contact routing

### Acceptance criteria

- expired policy versions cannot produce a final match
- every match explains eligibility, risks, and missing conditions
- outcomes can be attributed to lender program and policy version

---

## Phase 5 — Hermes Agent Execution Layer
**Target:** Weeks 18–21

### Deliverables

- agent task contract
- orchestrator routing
- retry and escalation policies
- agent observability
- prompt/version registry
- human review queue

### Acceptance criteria

- agent actions are idempotent where required
- failures create visible exceptions
- agents cannot bypass authorization or approval gates
- each recommendation includes provenance and confidence

---

## Phase 6 — Referral Partner Pilot
**Target:** Weeks 22–25

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
- user feedback converted into prioritized issues

---

## Phase 7 — Portfolio Investor Pack
**Target:** Weeks 26–31

### Deliverables

- multi-property model
- renewal calendar
- portfolio calculations
- portfolio health report
- lender concentration analysis

### Acceptance criteria

- a borrower can own multiple entities and properties
- property-level and global calculations reconcile
- renewal opportunities can be generated automatically

---

## Phase 8 — Construction and Development Pack
**Target:** Weeks 32–39

### Deliverables

- project budget and draws
- sources and uses
- construction underwriting module
- capital stack builder
- debt/equity matching
- anonymized investor summary workflow

### Acceptance criteria

- cost-to-complete and capital-gap analysis are reproducible
- disclosure permissions are enforced
- debt, mezzanine, preferred equity, and JV paths can be compared

---

## Phase 9 — MIX Exchange Network
**Target:** Weeks 40–52

### Deliverables

- controlled deal rooms
- opportunity/capital mandate matching
- network participation model
- exchange analytics
- subscription and access controls
- partner reputation and performance metrics

### Acceptance criteria

- sensitive opportunities remain private by default
- all disclosures are explicit and auditable
- marketplace matching cannot circumvent licensing or referral rules
- platform revenue and transaction attribution are measurable

---

## 12. First 90-Day Build Backlog

### Epic A — Canonical Architecture

- create `docs/GLOSSARY.md`
- create architecture decision records
- reconcile Relationship Intelligence vs Real-Time Intelligence terminology
- document ClearClose service boundary

### Epic B — Core Schema

- add organization/workspace tables
- add relationship tables
- add signal tables
- add opportunity tables
- add consent and source-evidence tables
- add audit events

### Epic C — Opportunity Workflow

- create signal triage
- create opportunity stages
- create task templates
- create approval gates
- create outcome states

### Epic D — Vertical Pack Runtime

- define manifest schema
- load pack configuration
- validate pack versions
- render pack-specific intake
- execute pack-specific workflows

### Epic E — Strata Pack

- implement special-assessment intake
- implement equity/funding-gap analysis
- generate client options report
- create partner referral form

### Epic F — Estate Pack

- implement authority/capacity fields
- implement estate-liquidity intake
- implement beneficiary-buyout analysis
- generate estate liquidity report

### Epic G — ClearClose MVP

- create calculation library
- implement residential ratios
- implement equity analysis
- implement scenario comparison
- implement memo generation
- implement approval/version controls

### Epic H — Quality and Security

- RLS tests
- calculation unit tests
- synthetic fixtures
- audit-log tests
- prompt-injection tests for uploaded documents
- backup and recovery documentation

---

## 13. Definition of Done

A feature is complete only when:

- requirements and acceptance criteria are documented
- data permissions are defined
- happy path and exception path are implemented
- audit events are captured
- automated tests pass
- synthetic examples are included
- user-facing documentation is updated
- agent actions and human approvals are distinguishable
- production monitoring is defined

---

## 14. Governance and Compliance Gates

Before handling live borrower information, complete:

- privacy impact assessment
- consent and disclosure templates
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

---

## 15. Success Metrics

### Adoption

- active internal users
- active referral partners
- voice/conversation capture rate
- intake completion rate

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

## 16. Recommended Release Sequence

```text
Release 0.1 — Canonical architecture and schema
Release 0.2 — Relationship, signal, and opportunity workflow
Release 0.3 — Strata vertical pack
Release 0.4 — Estate & elder law vertical pack
Release 0.5 — ClearClose residential engine
Release 0.6 — Lender registry and explainable matching
Release 0.7 — Hermes agent execution and review queues
Release 0.8 — Referral partner pilot
Release 0.9 — Portfolio investor pack
Release 1.0 — Production-ready Mortgage Intelligence Exchange
Release 1.1 — Construction and development capital
Release 2.0 — Controlled capital exchange network
```

---

## 17. Immediate Next Actions

1. Adopt this document as the implementation baseline.
2. Create the canonical glossary and architecture decision records.
3. audit the current Supabase schema against the core domain model.
4. create the vertical-pack manifest specification.
5. implement the Relationship, Signal, and Opportunity registries.
6. build the Strata Financial Resolution pack first.
7. connect ClearClose calculations only after deterministic tests are defined.
8. run the first pilot with a small, measurable professional referral cohort.

---

## Strategic Position

**RIOS** is the operating system.  
**ClearClose** is the underwriting brain.  
**MIX** is the relationship, mortgage, and capital intelligence exchange.

Together, they create a system that does more than store mortgage contacts: it detects real financing problems, structures solutions, routes opportunities, preserves institutional knowledge, and compounds the value of every professional relationship and funded outcome.
