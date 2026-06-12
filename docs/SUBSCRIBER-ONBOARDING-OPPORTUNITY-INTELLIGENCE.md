# MIX Subscriber Onboarding and Opportunity Intelligence

**Status:** Product and implementation specification v1.0  
**Applies to:** MIX onboarding, RIOS context assembly, Relationship Graph, vertical-pack recommendation, and subscriber activation

---

## 1. Purpose

Subscriber onboarding is not merely account setup.

It is the process through which RIOS learns:

- who the subscriber is
- what expertise and credentials they possess
- which markets and client types they serve
- which relationships and professional networks they already have
- what financing problems they are positioned to solve
- which lender, product, capital, and referral resources they can access
- what revenue goals, time constraints, capacity, and risk limits they have
- which niches and opportunities best fit their actual business position

The onboarding process must produce a **Subscriber Intelligence Profile** and a prioritized **Opportunity Intelligence Plan**.

---

## 2. Core Onboarding Flow

```text
Subscriber Registration
→ Consent and Data Boundaries
→ Guided Business Interview
→ Document and Data Import
→ Interpretable Context Extraction
→ Subscriber Business Graph
→ Capability and Relationship Mapping
→ Market and Signal Analysis
→ Niche Hypothesis Generation
→ Opportunity Scoring
→ Human Review
→ Recommended Vertical Pack
→ 90-Day Opportunity Plan
→ Ongoing Learning
```

---

## 3. Required Onboarding Outputs

Every completed onboarding should generate:

1. **Subscriber Intelligence Profile**
2. **Subscriber Business Graph**
3. **Capability Map**
4. **Relationship Leverage Map**
5. **Market and Client Segment Map**
6. **Top Niche Opportunities**
7. **Opportunity Evidence Pack**
8. **Capability Gap Analysis**
9. **Recommended Vertical Pack or Packs**
10. **90-Day Opportunity Activation Plan**
11. **Initial Relationship Actions**
12. **Baseline Metrics and Learning Objectives**

---

## 4. Subscriber Intelligence Profile

The profile should include the following interpretable context domains.

### 4.1 Identity and Business Model

- subscriber name
- business name
- role and licensing status
- geographic markets
- business model
- revenue sources
- current service lines
- current technology stack
- team structure
- delivery capacity

### 4.2 Expertise and Credentials

- mortgage specialties
- commercial or construction experience
- reverse mortgage experience
- self-employed borrower experience
- portfolio investor experience
- professional designations
- language capabilities
- industry knowledge
- case-study evidence

### 4.3 Existing Client Base

- primary client types
- borrower profiles
- property types
- average transaction size
- repeat-client characteristics
- underserved client groups
- current pipeline composition

### 4.4 Relationship Network

- lawyers
- financial planners
- accountants
- realtors
- property managers
- builders
- developers
- lender representatives
- private lenders
- investors
- past clients
- professional associations

### 4.5 Products and Capital Access

- lender relationships
- credit union access
- alternative lender access
- MIC and private-lender access
- reverse mortgage access
- commercial lender access
- construction capital access
- investor and JV relationships

### 4.6 Goals and Constraints

- annual and 90-day revenue targets
- preferred transaction types
- maximum active-file capacity
- marketing budget
- geographic limits
- compliance constraints
- risk tolerance
- undesirable client or deal types
- preferred referral channels

---

## 5. Onboarding Data Sources

The subscriber may provide:

- guided interview responses
- voice interview transcript
- CRM contacts
- calendar history
- email metadata or approved communications
- lender lists
- funded-deal history
- declined-deal history
- website and service descriptions
- case studies
- referral partner list
- marketing materials
- pipeline export
- professional credentials
- business goals

All imported data must respect explicit consent, workspace scope, purpose limitation, and minimum-necessary access.

---

## 6. Interpretable Context Requirements

Every material onboarding conclusion must be stored as a context assertion.

Example:

```yaml
context_id: CTX-SUB-00031
context_type: subscriber_capability
subject: subscriber:SUB-001
predicate: specializes_in
object: niche:self-employed-financing
summary: The subscriber has completed 18 self-employed borrower files and maintains active accountant referral relationships.
source_refs:
  - interview:INT-001
  - funded_case_summary:CASESET-003
  - relationship_graph_path:PATH-102
confidence: 0.91
status: human_verified
valid_from: 2026-06-12
sensitivity: internal
```

A niche recommendation must never be generated as an unexplained score. The subscriber must be able to inspect the evidence and reasoning.

---

## 7. Subscriber Business Graph

### 7.1 Subscriber-specific nodes

- `Subscriber`
- `SubscriberBusiness`
- `Credential`
- `Capability`
- `ServiceOffering`
- `ClientSegment`
- `GeographicMarket`
- `RevenueGoal`
- `CapacityConstraint`
- `ReferralChannel`
- `NicheHypothesis`
- `OpportunityTheme`
- `ActivationPlan`

### 7.2 Subscriber-specific edges

- `OPERATES`
- `LICENSED_FOR`
- `HAS_CAPABILITY`
- `OFFERS`
- `SERVES`
- `ACTIVE_IN_MARKET`
- `CONNECTED_TO`
- `HAS_ACCESS_TO`
- `GENERATES_REVENUE_FROM`
- `CONSTRAINED_BY`
- `WELL_POSITIONED_FOR`
- `HAS_GAP_IN`
- `RECOMMENDED_FOR`
- `ACTIVATED_BY`

### 7.3 Example graph

```text
[Subscriber]
   ├── HAS_CAPABILITY ──> [Reverse Mortgage Expertise]
   ├── CONNECTED_TO ──> [Estate Lawyer Network]
   ├── ACTIVE_IN_MARKET ──> [British Columbia]
   ├── HAS_ACCESS_TO ──> [Reverse Mortgage Lenders]
   └── HAS_GOAL ──> [Increase Referral Revenue]

These paths support:

[Subscriber] ── WELL_POSITIONED_FOR ──> [Estate and Elder Law Financing Niche]
```

---

## 8. Niche Discovery Model

RIOS should generate niche hypotheses from the intersection of:

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

### Example

A subscriber with:

- reverse mortgage expertise
- three estate-law relationships
- access to alternative and private capital
- experience with seniors and property equity
- a goal to build referral business

may receive:

> **Recommended niche:** Estate and Elder Law Financing  
> **Reason:** High capability fit, existing trusted referral paths, strong product access, recurring liquidity problems, and manageable implementation complexity.

---

## 9. Opportunity Scoring

Each niche hypothesis should receive a transparent score composed of visible factors.

### Suggested factors

- capability fit
- relationship fit
- market problem intensity
- signal availability
- product and capital access
- revenue potential
- time to first opportunity
- competitive differentiation
- operational complexity
- compliance complexity
- subscriber interest
- delivery capacity

### Example score output

```yaml
niche: strata-financial-resolution
overall_score: 82
components:
  capability_fit: 16/20
  relationship_fit: 18/20
  market_problem_intensity: 15/15
  capital_access: 10/10
  revenue_potential: 9/10
  time_to_first_opportunity: 8/10
  operational_readiness: 4/10
  compliance_readiness: 2/5
recommendation: pilot
confidence: 0.86
```

Scores must be accompanied by evidence, gaps, assumptions, and a recommended validation step.

---

## 10. Top Niche Opportunity Report

Each recommended niche should include:

- niche definition
- target client
- target referral partners
- core business problem
- trigger signals
- why the niche fits the subscriber
- supporting graph paths
- relevant experience and assets
- product and capital access
- competitive advantage
- revenue hypothesis
- time-to-opportunity estimate
- required capabilities
- capability gaps
- recommended offer
- recommended vertical pack
- first validation actions
- success metrics

---

## 11. Relationship Leverage Map

The onboarding process should identify:

- high-trust relationships
- underdeveloped referral relationships
- dormant but historically valuable relationships
- missing relationship categories
- one-hop and two-hop introduction paths
- partners connected to multiple relevant client segments
- relationships associated with funded outcomes
- relationships requiring consent or disclosure restrictions

Example output:

```text
Priority Relationship Cluster: Estate and Elder Law

Direct relationships:
- 2 estate lawyers
- 1 financial planner
- 1 accountant

Second-degree access:
- 4 executors
- 11 high-equity senior households
- 2 care-planning professionals

Recommended action:
Create an Estate Liquidity Review offer and validate it with the two estate lawyers.
```

---

## 12. Capability Gap Analysis

RIOS should identify what prevents the subscriber from entering or scaling a niche.

Gap categories:

- knowledge
- lender access
- product access
- referral access
- compliance readiness
- workflow readiness
- technology
- content and positioning
- proof and case studies
- operational capacity

Each gap should include:

- severity
- evidence
- impact
- recommended remedy
- owner
- target completion date

---

## 13. Recommended Vertical Pack

Based on the onboarding analysis, RIOS should recommend one of the existing packs or propose a new pack hypothesis.

Initial packs:

- Strata Financial Resolution
- Estate and Elder Law Financing
- Portfolio Investor Lending
- Construction and Development Capital

The recommendation should be classified as:

- `activate_now`
- `pilot_first`
- `develop_capability`
- `defer`
- `not_recommended`

---

## 14. 90-Day Opportunity Activation Plan

### Days 1–30: Validate

- confirm top niche
- verify key context assertions
- complete missing relationship records
- interview priority partners
- validate the problem and offer
- configure the vertical pack
- establish baseline metrics

### Days 31–60: Activate

- launch referral offer
- run targeted relationship outreach
- publish niche-specific content
- process first pilot opportunities
- capture objections and missing capabilities
- refine ClearClose requirements

### Days 61–90: Systematize

- measure opportunity conversion
- formalize partner workflow
- add lender and capital relationships
- document case studies
- automate repeatable actions
- decide whether to scale, revise, or stop

---

## 15. Initial Onboarding Questions

The onboarding interview should cover:

### Business

- What services generate most of your current revenue?
- Which client problems are you best at solving?
- Which transactions do you prefer or avoid?
- What are your 90-day and annual goals?

### Expertise

- Which borrower, property, and transaction types have you handled successfully?
- What professional or market knowledge differentiates you?
- Which case outcomes are most representative of your expertise?

### Relationships

- Which professional groups already refer business to you?
- Which relationships have produced funded opportunities?
- Which relationships are valuable but inactive?
- Who can introduce you to additional clients, lenders, or capital providers?

### Markets

- Which geographic markets and property types do you understand?
- What recurring financing problems do you observe?
- Which market events create urgency?

### Capacity

- How many new opportunities can you manage?
- Which workflows create bottlenecks?
- Which work should remain human-controlled?

### Capital and Products

- Which lenders and programs can you access?
- Where do you have strong exception or BDM relationships?
- Which transaction types lack capital coverage?

---

## 16. Agent Responsibilities

### Onboarding Interview Agent

- conducts the guided interview
- asks adaptive follow-up questions
- separates facts from interpretations
- creates proposed context assertions

### Subscriber Context Agent

- consolidates interview, documents, CRM, and case history
- resolves contradictions
- creates the Subscriber Intelligence Profile

### Relationship Mapping Agent

- builds the subscriber's professional relationship graph
- proposes relationship strength factors
- flags missing and ambiguous entities

### Niche Discovery Agent

- generates niche hypotheses
- maps hypotheses to evidence
- identifies assumptions and validation requirements

### Opportunity Scoring Agent

- applies transparent scoring rules
- ranks niche opportunities
- identifies confidence and gaps

### Activation Planning Agent

- creates the 90-day plan
- assigns actions, metrics, and review gates
- recommends the initial vertical pack

All recommendations require subscriber review before activation.

---

## 17. Product Experience

The onboarding dashboard should show:

1. progress through onboarding
2. verified and unverified context
3. subscriber business graph
4. relationship clusters
5. capability map
6. niche opportunity cards
7. evidence and scoring details
8. capability gaps
9. recommended vertical pack
10. 90-day activation plan
11. approval and edit controls

The subscriber must be able to correct, reject, or supersede context before it becomes active.

---

## 18. Database Additions

Suggested tables:

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

These records should be linked to context assertions and graph nodes rather than becoming isolated profile fields.

---

## 19. Acceptance Criteria

Onboarding is complete when:

- the subscriber has reviewed the core intelligence profile
- key facts and relationships have evidence and verification states
- the subscriber business graph has been created
- at least three niche hypotheses have been evaluated where appropriate
- the top recommendation includes a transparent score and evidence
- capability gaps have been identified
- a vertical pack recommendation has been made
- a 90-day activation plan has been approved
- baseline metrics have been recorded
- the subscriber can correct or reject system conclusions
- all data use complies with consent and workspace boundaries

---

## 20. Strategic Result

MIX onboarding becomes a personalized business-discovery process.

The subscriber does not simply receive access to software. They receive:

- a map of their business
- a map of their relationships
- an explanation of their strongest market position
- prioritized niche opportunities
- a practical path to validate and activate those opportunities

This allows RIOS to continuously improve its understanding of the subscriber and identify new opportunities as relationships, markets, capabilities, and outcomes change.
