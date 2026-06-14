# MIX Contextual Outreach Engine

## Purpose

The MIX Contextual Outreach Engine is the outreach intelligence layer for Mortgage Intelligence Exchange.

It allows Claude Code, Hermes Agent, Codex, ChatGPT, and future RIOS agents to perform cold email, warm email, referral partner outreach, reactivation outreach, and ecosystem-building outreach using vertical context and interpretive context.

The objective is not simply to personalize email. The objective is to identify where a meaningful mortgage, lending, referral, or professional-services relationship may exist.

## Core Thesis

Most outreach fails because it personalizes fields instead of interpreting context.

Basic outreach uses:

- first name
- company name
- job title
- industry
- homepage summary

MIX outreach uses:

- entity context
- vertical context
- mortgage context
- interpretive context
- problem context
- solution context
- relationship context
- timing signals
- trust signals

The email is the final artifact. The intelligence model comes first.

## Operating Model

```text
Lead or Contact
  ↓
Entity Research
  ↓
Website and Web Collection
  ↓
Vertical Context Matching
  ↓
Mortgage-Relevance Analysis
  ↓
Problem Detection
  ↓
Solution Mapping
  ↓
Referral Opportunity Scoring
  ↓
Outreach Drafting
  ↓
Human Review or Approved Send Workflow
  ↓
Reply Capture
  ↓
Learning Loop
```

## Tool and Agent Roles

| Tool or Agent | Role |
|---|---|
| Exa | Entity discovery and external intelligence |
| Tavily | Market intelligence, current web research, regulatory and market updates |
| Scrapling | Website collection and public page extraction |
| Firecrawl | AI-ready website content extraction |
| TinyFish | Change detection and business signal monitoring |
| Claude | Deep interpretation, architecture, prompts, and implementation design |
| Claude Code | Codebase implementation |
| Codex | Code edits, implementation tasks, refactors, tests |
| Hermes Agent | Repeatable execution workforce and outreach workflow operator |
| ChatGPT | Strategy, drafting, vertical pack creation, and review |
| Supabase | System of record for entities, contacts, scores, messages, and outcomes |
| Qdrant or Pinecone | Semantic memory and similarity retrieval |
| DuckDB or MotherDuck | Research staging, analytics, and scoring analysis |
| Resend | Transactional and approved outbound email delivery |
| Instantly or Smartlead | Cold email sequencing where appropriate |
| Twilio | SMS, MMS, and voice follow-up where compliant |

## Context Layers

### 1. Entity Context

Facts about the specific person, company, or organization.

Examples:

- company name
- website
- city or market
- services
- leadership
- customer segment
- offers
- public content
- public proof points
- reviews
- partnerships
- recent growth indicators

### 2. Vertical Context

The common problems, risks, opportunities, language, economics, and referral patterns for the prospect's industry.

MIX priority verticals:

- realtors
- accountants
- lawyers
- financial planners
- employee benefits advisors
- insurance advisors
- builders and developers
- property managers
- local business owners

### 3. Mortgage Context

How the prospect's clients may intersect with mortgage, lending, refinancing, debt, home equity, property transfer, or real estate wealth decisions.

Examples:

- self-employed mortgage qualification
- incorporated business-owner financing
- reverse mortgage and retirement income
- HELOC planning
- debt consolidation refinancing
- construction financing
- commercial lending
- partner buyouts
- acquisition financing
- estate and property transfer financing
- first-time buyer education
- investor financing

### 4. Interpretive Context

The agent's reasoned interpretation of what the business is trying to accomplish and what may be constraining progress.

Interpretive questions:

- What does this business actually do?
- Who do they serve?
- What outcome are they promising?
- What are they likely trying to grow?
- What constraints are visible?
- What recent change suggests timing?
- What mortgage, lending, referral, or partner opportunity may exist?

### 5. Problem Context

The agent identifies a likely business or client problem based on entity context, vertical context, and mortgage context.

Examples:

- realtor clients losing deals due to weak financing preparation
- accountant clients needing financing for acquisitions, partner buyouts, or commercial property
- financial planner clients needing home-equity or retirement-income options
- lawyer clients needing financing support during estate, family, probate, or property-transfer matters
- employee benefits clients needing employee homeownership or financial wellness education
- builders and developers needing construction or takeout financing relationships

### 6. Solution Context

The agent maps the problem to a relevant relationship solution.

Examples:

- mortgage referral partnership
- self-employed borrower financing support
- commercial lending support
- reverse mortgage education
- construction financing support
- home-equity strategy consultation
- buyer pre-approval education
- referral ecosystem collaboration
- client webinar or workshop

### 7. Relationship Context

The agent determines whether the outreach should be positioned as:

- cold prospecting
- warm referral
- strategic partnership
- reactivation
- education
- collaboration
- referral ecosystem invitation
- client support extension

## Vertical Outreach Patterns

### Realtor

Entity signal:

- active listings
- growing team
- move-up buyer focus
- investor focus
- first-time buyer education
- luxury or downsizer segment

Common problems:

- deal fallout from financing
- inconsistent pre-approval quality
- buyer education gaps
- referral inconsistency
- client retention after closing

Mortgage solution:

- mortgage broker partnership
- pre-approval support
- buyer financing education
- investment property financing
- refinance and move-up strategy support

Outreach angle:

```text
It looks like your team is active with move-up buyers in the local market. Many of those clients run into financing questions before they are ready to write. I was curious whether you currently have a mortgage partner supporting that early-stage buyer education.
```

### Accountant

Entity signal:

- serves incorporated business owners
- offers tax planning
- offers advisory, bookkeeping, CFO, or succession services
- publishes business-owner content

Common problems:

- clients need financing beyond accounting advice
- business acquisition or partner buyout situations
- commercial property purchases
- tax-sensitive refinancing decisions
- succession and estate planning overlap

Mortgage solution:

- self-employed mortgage support
- commercial lending support
- refinance and debt consolidation support
- acquisition or partner buyout financing support

Outreach angle:

```text
Many owner-managed businesses eventually require financing for acquisitions, partner buyouts, commercial property purchases, or debt restructuring. I was curious whether your firm currently has a trusted lending partner when those situations arise.
```

### Financial Planner

Entity signal:

- retirement planning focus
- estate planning content
- affluent client base
- insurance or tax planning alignment
- retirement income planning

Common problems:

- clients need retirement income options
- asset retention concerns
- home equity not integrated into planning
- estate transfer and debt management questions

Mortgage solution:

- reverse mortgage education
- HELOC strategy
- refinance planning
- real estate wealth planning
- home-equity planning

Outreach angle:

```text
Many retirees are starting to ask how home equity fits into retirement income planning. I was curious whether reverse mortgage and home-equity strategies are something your clients are asking about today.
```

### Lawyer

Entity signal:

- real estate law
- family law
- estate law
- probate
- business law
- property transfer work

Common problems:

- clients need financing support during property transfers
- estate settlement liquidity issues
- family separation and refinance needs
- probate and ownership changes
- business-owner financing needs

Mortgage solution:

- refinance support
- estate and probate lending support
- property transfer financing
- separation or buyout financing
- commercial mortgage referrals

Outreach angle:

```text
We often encounter clients who need legal support during refinancing, estate settlements, property transfers, or separation-related buyouts. I noticed your practice works in areas that overlap with those situations and thought there may be a practical way to support one another's clients.
```

### Employee Benefits Advisor

Entity signal:

- serves employers with 10 to 50 employees
- focuses on retention, compensation, executive benefits, or financial wellness
- supports small and mid-sized businesses

Common problems:

- employers want stronger retention tools
- employees face housing affordability pressure
- benefits advisors need value-added education
- business owners may need personal and commercial financing support

Mortgage solution:

- employee mortgage education
- homebuyer workshops
- refinancing education
- executive mortgage planning
- business-owner lending support

Outreach angle:

```text
Many employers are looking for practical financial wellness benefits that help employees with housing and debt decisions. I was curious whether mortgage education or homeownership workshops would be useful as a value-added benefit for your employer clients.
```

### Builder or Developer

Entity signal:

- active projects
- rezoning applications
- land acquisition
- multifamily or townhouse focus
- construction pipeline

Common problems:

- construction capital
- takeout financing
- presale buyer financing
- investor financing
- project feasibility constraints

Mortgage solution:

- construction financing relationships
- commercial mortgage support
- buyer financing pipeline
- investor and takeout financing support

Outreach angle:

```text
I noticed your work appears to involve residential development and project activity. Financing tends to become relevant at several stages, from construction capital to buyer qualification and takeout planning. I was curious whether you currently have a lending partner supporting those conversations.
```

## Scoring Model

Agents should score each outreach opportunity before drafting.

Suggested scores:

- Entity Fit Score: 0-100
- Vertical Problem Fit Score: 0-100
- Mortgage Relevance Score: 0-100
- Solution Fit Score: 0-100
- Referral Potential Score: 0-100
- Relationship Potential Score: 0-100
- Timing Signal Score: 0-100
- Trust Signal Score: 0-100
- Outreach Readiness Score: 0-100

Recommended rule:

Do not send automated outreach when Outreach Readiness Score is below 70 unless a human explicitly approves.

## Outreach Type Decision

### Cold Outreach

Use when no prior relationship exists.

Tone:

- concise
- useful
- specific
- professional
- low-pressure

Call to action:

- ask a relevant question
- invite a short conversation
- offer a useful resource

### Warm Outreach

Use when there is prior contact, shared context, referral, or known relationship.

Tone:

- familiar but professional
- reference known relationship context
- avoid pretending to know more than the data supports

Call to action:

- suggest reconnection
- share a relevant observation
- invite collaboration

### Referral Partner Outreach

Use when the goal is ecosystem building.

Tone:

- relationship-first
- mutual value
- client benefit
- long-term collaboration

Call to action:

- explore fit
- compare client needs
- discuss referral alignment

### Reactivation Outreach

Use when the contact exists in CRM but has gone quiet.

Tone:

- helpful
- timely
- context-aware
- not guilt-based

Call to action:

- ask if the issue is still relevant
- provide updated context
- offer a next step

## Drafting Rules

Agents must avoid:

- fake compliments
- vague personalization
- saying "I loved your website"
- overclaiming research
- pretending a relationship exists
- aggressive urgency
- misleading scarcity
- spammy formatting
- unsupported claims
- private, gated, confidential, or sensitive data

Agents should use:

- one specific observed fact
- one interpreted business implication
- one relevant problem or opportunity
- one simple question or next step

Preferred structure:

```text
Observation
Interpretation
Relevant problem or opportunity
Simple question
```

Example:

```text
I noticed your firm has been publishing more content for incorporated business owners.
Those clients often run into financing questions around property purchases, refinancing, acquisitions, or partner buyouts.
I was curious whether you currently have a trusted lending partner for those conversations.
```

## Compliance and Safety Notes

Agents must follow applicable laws and platform rules, including CASL, CAN-SPAM, privacy laws, sending platform terms, and professional compliance requirements.

For Canadian outreach, agents should pay special attention to consent, identification, unsubscribe requirements, truthful sender identity, and appropriate business relevance.

Do not scrape or use private, gated, confidential, or unlawfully obtained information.

Do not bypass access controls.

Do not fabricate claims, relationships, testimonials, results, rates, approvals, or proof.

For regulated industries such as mortgage, finance, insurance, legal, and health-related services, do not create advice, guarantees, or misleading performance claims.

Mortgage outreach must avoid implying approval, guaranteed rates, guaranteed savings, or legal/tax/financial advice unless properly reviewed and supported.

## Data Model Suggestions

### companies

- id
- name
- website_url
- industry
- vertical_pack
- location
- entity_context_json
- interpretive_context_json
- mortgage_context_json
- problem_context_json
- solution_context_json
- relationship_context_json
- created_at
- updated_at

### people

- id
- company_id
- first_name
- last_name
- role
- email
- phone
- linkedin_url
- relationship_status
- consent_status
- source
- created_at
- updated_at

### outreach_opportunities

- id
- company_id
- person_id
- outreach_type
- observed_fact
- interpreted_need
- mapped_problem
- mapped_solution
- relationship_angle
- entity_fit_score
- vertical_problem_fit_score
- mortgage_relevance_score
- solution_fit_score
- referral_potential_score
- relationship_potential_score
- timing_signal_score
- trust_signal_score
- outreach_readiness_score
- recommended_next_action
- created_at

### outreach_messages

- id
- opportunity_id
- channel
- subject
- body
- status
- human_review_required
- approved_by
- sent_at
- reply_status
- outcome
- created_at

### outreach_learning_events

- id
- message_id
- event_type
- event_value
- notes
- created_at

## Agent Instructions for Claude Code

Claude Code should use this document as a product and implementation specification.

Recommended tasks:

1. Create database tables for companies, people, outreach opportunities, outreach messages, and learning events.
2. Create service modules for entity research, website collection, vertical context matching, mortgage relevance scoring, opportunity scoring, and outreach drafting.
3. Add environment variables for Exa, Tavily, Scrapling or crawler service, Firecrawl, TinyFish, Supabase, Resend, and sequencing tools.
4. Implement human review gates before sending outreach.
5. Add audit logs for every generated and sent message.
6. Add integration tests for scoring and message generation.

## Agent Instructions for Codex

Codex should use this document to implement precise code changes.

Recommended tasks:

- generate schema migrations
- implement TypeScript types
- build API routes
- create reusable prompt templates
- add tests
- refactor outreach services
- create queue jobs for research and drafting
- add email sending integration after approval

## Agent Instructions for Hermes Agent

Hermes should use this document as an execution playbook.

Recommended tasks:

- run daily research jobs
- monitor target verticals
- enrich new CRM contacts
- generate outreach opportunity records
- flag high-readiness opportunities
- prepare weekly relationship opportunity reports
- send approved drafts only when the workflow permits

## Agent Instructions for ChatGPT

ChatGPT should use this document for:

- strategy design
- vertical pack creation
- outreach angle review
- message drafting
- campaign planning
- testing variants
- interpreting reply patterns
- improving scoring rules

## Vertical Pack Template

Each MIX vertical pack should include:

- vertical name
- target partner type
- common business objectives
- common constraints
- common client problems
- common trigger events
- mortgage relevance patterns
- common language patterns
- solution mappings
- referral opportunities
- compliance considerations
- sample outreach angles
- scoring adjustments

## Product Positioning

This engine turns outreach from mail-merge personalization into mortgage relationship intelligence.

The system is not only asking:

"How do we personalize this email?"

It is asking:

"What client problem is visible, what mortgage or lending solution may be relevant, and does this relationship create value for both sides?"

That is the difference between generic cold email and MIX-powered contextual outreach.
