# MIX Interpretable Context and Relationship Graph

**Status:** Build standard v1.0  
**Applies to:** RIOS, ClearClose, MIX, Hermes agents, and all vertical packs

---

## 1. Purpose

MIX must not treat relationships as flat CRM records. A relationship is a living network of people, organizations, properties, conversations, obligations, opportunities, capital sources, decisions, and outcomes.

The platform therefore uses two complementary methods:

1. **Interpretable Context Methodology** — human-readable, versioned context that explains what the system knows, where it came from, why it matters, and how agents may use it.
2. **Relationship Graph Method** — graph-based representation of entities and their connections so RIOS can reason across referral paths, ownership, influence, obligations, opportunities, lender fit, and prior outcomes.

The objective is not merely to retrieve similar text. The system must be able to answer:

- Who introduced this borrower, and through which professional relationship?
- Which lawyer, accountant, planner, lender representative, property, company, trust, or estate is connected to the opportunity?
- What events changed the strength, urgency, or risk of the relationship?
- Which prior cases are structurally similar?
- Which lender has previously funded this borrower type, property type, and transaction structure?
- What evidence supports each inferred relationship or recommendation?

---

## 2. Core Operating Model

```text
Source Evidence
→ Interpretable Context
→ Graph Assertion
→ Human or Rule Validation
→ Agent Reasoning
→ Action
→ Outcome
→ Updated Context and Graph
```

Every graph edge must be explainable. Every important inference must point back to source evidence, a deterministic rule, a human decision, or a measured outcome.

---

## 3. Interpretable Context Methodology

Interpretable context is organized into small, numbered, readable context units rather than opaque prompts or untraceable model memory.

Each context unit should contain:

```yaml
context_id: CTX-REL-000123
context_type: relationship_observation
subject: person:borrower-001
predicate: referred_by
object: organization:estate-law-firm-017
summary: The borrower was introduced by the estate lawyer after a probate liquidity discussion.
source_refs:
  - conversation:CONV-00421
  - referral_form:REF-00119
confidence: 0.94
status: human_verified
valid_from: 2026-06-12
valid_to: null
sensitivity: restricted
workspace_id: WS-001
created_by: agent:relationship-agent
reviewed_by: user:licensed-advisor-01
```

### Required properties

- **Atomic:** one meaningful assertion per context unit.
- **Source-linked:** every assertion points to evidence.
- **Time-aware:** observation date and validity period are distinct.
- **Confidence-aware:** extracted or inferred facts include confidence.
- **Reviewable:** status identifies whether the assertion is proposed, verified, disputed, superseded, or expired.
- **Scoped:** workspace, client, opportunity, consent, and privacy scope are explicit.
- **Readable:** a professional can understand it without inspecting application code.
- **Versioned:** corrections do not silently overwrite history.

### Context lifecycle

```text
proposed
→ machine_extracted
→ human_verified
→ active
→ disputed / superseded / expired
```

### Context hierarchy

```text
00-system/
01-organization/
02-relationships/
03-conversations/
04-signals/
05-opportunities/
06-underwriting/
07-lenders-capital/
08-decisions/
09-outcomes/
10-lessons/
```

This hierarchy may be represented in version-controlled Markdown for human inspection while operational state remains in Postgres and relationship structure is projected into the graph layer.

---

## 4. Relationship Graph Ontology

## 4.1 Node types

### People and organizations

- `Person`
- `Organization`
- `ProfessionalPractice`
- `Household`
- `Trust`
- `Estate`
- `Corporation`
- `Partnership`

### Real-estate and financial entities

- `Property`
- `Mortgage`
- `LoanFacility`
- `DevelopmentProject`
- `Portfolio`
- `CapitalSource`
- `LenderProgram`
- `LenderPolicy`

### Activity and intelligence

- `Conversation`
- `Document`
- `ContextAssertion`
- `Signal`
- `Opportunity`
- `UnderwritingCase`
- `Decision`
- `Submission`
- `Outcome`
- `KnowledgeAsset`
- `Workflow`
- `AgentRun`

## 4.2 Edge types

### Professional and relationship edges

- `KNOWS`
- `ADVISES`
- `REPRESENTS`
- `REFERRED`
- `INTRODUCED_BY`
- `WORKS_AT`
- `MEMBER_OF`
- `RELATED_TO`
- `TRUSTED_BY`
- `COLLABORATED_WITH`

### Ownership and obligation edges

- `OWNS`
- `BENEFICIARY_OF`
- `EXECUTOR_OF`
- `DIRECTOR_OF`
- `GUARANTEES`
- `BORROWS_FROM`
- `SECURED_BY`
- `HAS_MORTGAGE`
- `HAS_LIEN`
- `OWES`

### Intelligence and workflow edges

- `MENTIONED_IN`
- `SUPPORTED_BY`
- `CONTRADICTED_BY`
- `GENERATED_SIGNAL`
- `CREATED_OPPORTUNITY`
- `PARTY_TO`
- `UNDERWRITTEN_AS`
- `MATCHED_TO`
- `SUBMITTED_TO`
- `DECIDED_BY`
- `RESULTED_IN`
- `LEARNED_FROM`

### Policy and eligibility edges

- `ELIGIBLE_FOR`
- `INELIGIBLE_FOR`
- `REQUIRES`
- `EXCEPTION_TO`
- `GOVERNED_BY`
- `VALID_DURING`

## 4.3 Edge properties

Every material edge should include:

```yaml
edge_id: EDGE-000451
relationship_type: REFERRED
source_refs:
  - conversation:CONV-00421
confidence: 0.94
verification_status: human_verified
valid_from: 2026-06-12
valid_to: null
strength: 0.72
sensitivity: restricted
workspace_id: WS-001
created_by: agent:relationship-agent
```

Relationship strength must not be a single unexplained AI score. It should be calculated from visible factors such as:

- recency
- frequency
- reciprocity
- referral count
- funded outcomes
- response time
- trust events
- unresolved issues
- consent and disclosure limits

---

## 5. Example Relationship Graph

```text
[Estate Lawyer]
      │ REFERRED
      ▼
[Borrower] ── OWNS ──> [Condo Property]
      │                    │
      │ PARTY_TO           │ HAS_SPECIAL_ASSESSMENT
      ▼                    ▼
[Estate Liquidity Opportunity] <── GENERATED_SIGNAL ── [Assessment Notice]
      │
      ├── UNDERWRITTEN_AS ──> [ClearClose Case]
      │
      ├── MATCHED_TO ──> [Credit Union Program]
      │
      └── RESULTED_IN ──> [Funded Outcome]
                              │
                              └── LEARNED_FROM ──> [Lender Knowledge Asset]
```

This structure allows MIX to understand both the transaction and the relationship network that produced it.

---

## 6. Storage Architecture

### Recommended initial architecture

Use a polyglot model without introducing an enterprise graph dependency too early:

```text
Supabase / Postgres
- system of record
- permissions and row-level security
- transactional workflows
- context assertions
- graph nodes and edges
- audit records

Postgres graph projection
- graph_nodes
- graph_edges
- graph_edge_evidence
- recursive SQL queries
- materialized relationship paths

Qdrant or pgvector
- semantic retrieval over conversations, documents, and context units
- never the source of truth for relationships

Markdown context vault
- numbered, readable workflow definitions
- ontology and policy definitions
- agent instructions
- version controlled in Git

Optional later graph engine
- Apache AGE, Kuzu, Memgraph, or Neo4j only when graph query scale justifies it
```

### Important distinction

- **Postgres** stores authoritative facts and workflow state.
- **The graph layer** stores and queries explicit relationships.
- **The vector layer** retrieves semantically similar evidence.
- **Markdown context** explains rules, workflows, and organizational meaning.

Vector similarity must never be treated as proof that a relationship exists.

---

## 7. Core Graph Tables

```sql
create table graph_nodes (
  id uuid primary key,
  workspace_id uuid not null,
  node_type text not null,
  canonical_entity_id uuid,
  label text not null,
  properties jsonb not null default '{}'::jsonb,
  sensitivity text not null default 'internal',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table graph_edges (
  id uuid primary key,
  workspace_id uuid not null,
  from_node_id uuid not null references graph_nodes(id),
  to_node_id uuid not null references graph_nodes(id),
  edge_type text not null,
  confidence numeric(5,4),
  verification_status text not null default 'proposed',
  strength numeric(5,4),
  valid_from timestamptz,
  valid_to timestamptz,
  properties jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table graph_edge_evidence (
  edge_id uuid not null references graph_edges(id),
  evidence_type text not null,
  evidence_id uuid not null,
  excerpt text,
  created_at timestamptz not null default now(),
  primary key (edge_id, evidence_type, evidence_id)
);

create table context_assertions (
  id uuid primary key,
  workspace_id uuid not null,
  subject_node_id uuid not null references graph_nodes(id),
  predicate text not null,
  object_node_id uuid references graph_nodes(id),
  literal_value jsonb,
  summary text not null,
  confidence numeric(5,4),
  status text not null default 'proposed',
  valid_from timestamptz,
  valid_to timestamptz,
  sensitivity text not null default 'internal',
  supersedes_id uuid references context_assertions(id),
  created_at timestamptz not null default now()
);
```

Row-level security must apply to graph nodes, graph edges, evidence, and context assertions.

---

## 8. Graph Construction Workflow

```text
1. Capture conversation, document, form, or event
2. Extract candidate entities
3. Resolve entities against canonical records
4. Create proposed context assertions
5. Create proposed graph nodes and edges
6. Attach evidence and confidence
7. Apply deterministic validation rules
8. Route sensitive or low-confidence assertions to human review
9. Activate verified graph relationships
10. Recalculate relationship paths and opportunity signals
11. Record every agent and human decision
```

### Entity-resolution safeguards

The system must not merge records based only on name similarity. Use multiple signals:

- verified email
- verified phone
- organization
- address
- professional licence identifier
- property identifier
- explicit human confirmation

Ambiguous matches remain separate until reviewed.

---

## 9. Relationship Intelligence Queries

The initial graph layer should answer:

1. Which professional partners are connected to funded opportunities?
2. Which referral paths produce the highest-quality cases?
3. Who is connected to a borrower, property, company, trust, or estate?
4. Which lenders and programs have funded structurally similar cases?
5. Which relationships have become inactive despite prior value?
6. Where are there unresolved obligations, conflicts, or consent restrictions?
7. Which opportunities share a common property, beneficial owner, guarantor, or advisor?
8. Which capital providers are within one or two trusted introductions of the opportunity sponsor?
9. What evidence supports the graph path used in an agent recommendation?
10. How did a funded or declined outcome change the network?

---

## 10. Agent Context Assembly

Agents should not receive a raw database dump. RIOS should build a bounded, interpretable context package for each task.

```yaml
task_id: TASK-0091
objective: Prepare an estate liquidity triage summary
actor_role: licensed_mortgage_advisor
vertical_pack: estate-elder-law
context_scope:
  primary_nodes:
    - opportunity:OPP-0012
    - borrower:PERSON-0044
    - estate:ESTATE-0007
  graph_depth: 2
  allowed_edge_types:
    - PARTY_TO
    - OWNS
    - EXECUTOR_OF
    - REFERRED
    - HAS_MORTGAGE
    - SUPPORTED_BY
  evidence_required: true
  include_disputed_context: true
  exclude_sensitivity:
    - legal_privilege_restricted
human_approval_required: true
```

Every agent output should separate:

- verified facts
- inferred relationships
- missing information
- contradictions
- recommended action
- confidence
- cited evidence

---

## 11. Vertical Pack Integration

Each vertical pack should extend the graph ontology.

### Strata pack

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

### Estate and elder law pack

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

### Portfolio investor pack

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

### Construction pack

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

---

## 12. Implementation Sequence

### Phase 1 — Ontology and context standard

- approve node and edge dictionary
- create context assertion schema
- create evidence and verification statuses
- define graph privacy rules
- add canonical Markdown templates

### Phase 2 — Postgres graph foundation

- add graph tables
- add row-level security policies
- create entity-resolution service
- create edge-evidence API
- add graph visualization for one-hop and two-hop paths

### Phase 3 — Relationship Agent

- extract candidate relationships from conversations
- create proposed assertions
- build human verification queue
- calculate transparent relationship strength

### Phase 4 — Opportunity graph

- connect signals, opportunities, parties, properties, and referral sources
- show origin path for each opportunity
- detect duplicate and related opportunities

### Phase 5 — Lender and capital graph

- connect policies, programs, BDMs, prior submissions, and outcomes
- support explainable lender matching
- capture exception and policy-version history

### Phase 6 — Outcome learning

- connect funded and declined outcomes to people, programs, policies, and workflows
- produce knowledge assets without automatically rewriting approved rules

---

## 13. Acceptance Criteria

The graph and context layer are complete when:

- every active edge has evidence or an explicit human assertion
- every inferred edge shows confidence and verification state
- users can trace an opportunity to its originating relationship and signal
- users can inspect the context used by an agent
- graph permissions prevent unauthorized relationship discovery
- entity merges are reversible and audited
- graph paths used in recommendations are displayed
- disputed and superseded facts remain visible in history
- vector retrieval is never presented as verified relationship evidence
- outcomes update graph metrics and knowledge assets

---

## 14. Strategic Result

With this methodology, MIX becomes more than a mortgage workflow platform.

It becomes a **Relationship and Capital Intelligence Graph** in which every conversation, professional connection, property, obligation, opportunity, lender decision, and outcome becomes an interpretable, reusable organizational asset.

The graph answers **who and how things are connected**.  
Interpretable context explains **what those connections mean and why the system believes them**.  
ClearClose determines **whether the opportunity is financeable**.  
Hermes agents determine **what work should happen next**, subject to human governance.
