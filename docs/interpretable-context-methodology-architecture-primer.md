# Interpretable Context Methodology Architecture Primer

## Filesystem-as-Framework for AI Workflows

### Version
1.0

### Purpose

This document defines the Interpretable Context Methodology (ICM) architecture pattern for building AI-assisted workflows using folders, Markdown files, and staged context contracts instead of heavy orchestration frameworks.

ICM is designed for workflows that require:

- Human oversight
- Auditability
- Repeatable outputs
- Clear state management
- Multi-stage AI production
- Git-friendly context control

For RIOS, MIX, LeadSniperAI, and Mortgage Intelligence Exchange, ICM should be treated as the **context architecture layer** that sits above AI models, MCP tools, n8n automations, Supabase, GitHub, and CRM systems.

---

## 1. Core Principle

### The Filesystem Is the Framework

ICM treats the filesystem as the primary orchestration layer.

Instead of hiding workflow state inside code, memory objects, agent classes, or dashboards, ICM stores all workflow logic and outputs in folders and plain-text files.

The result is a glass-box architecture.

Every instruction, input, output, and review point can be inspected directly by opening a file.

---

## 2. Why This Matters

Modern AI workflows often become too complex too quickly.

Traditional orchestration frameworks such as LangChain, CrewAI, AutoGen, and similar tools are powerful, but they can create unnecessary abstraction for sequential business workflows.

They often require:

- Developer knowledge
- Logging systems
- Deployment cycles
- Custom state management
- Debugging through traces
- Hidden prompt and memory layers

ICM solves this by making workflow state visible.

The system state is simply the filesystem state.

If a stage fails, the user opens the relevant folder and reads the inputs, outputs, and stage contract.

---

## 3. Unix Principles Applied to AI

ICM adapts three classic Unix principles for AI workflows.

### 3.1 One Stage, One Job

Each folder represents one workflow stage.

Each stage performs one clear transformation.

Example:

```text
01_research/
02_signal_detection/
03_solution_mapping/
04_outreach_generation/
```

This reduces context drift and prevents the model from attempting too many tasks at once.

### 3.2 Output Becomes Input

The output of one stage becomes the input of the next stage.

Example:

```text
01_research/output/research-summary.md
        ↓
02_signal_detection/input/research-summary.md
        ↓
02_signal_detection/output/signal-report.md
```

The filesystem becomes a physical pipe-and-filter system.

### 3.3 Plain Text Is the Interface

Markdown is the default interface.

Prompts, rules, reference files, briefs, drafts, and audits are stored as `.md` files.

This makes the system:

- Human-readable
- Git-compatible
- Portable
- Diffable
- Easy to edit
- Easy for AI agents to consume

---

## 4. ICM vs Traditional Agent Frameworks

| Dimension | Traditional Framework | ICM |
|---|---|---|
| Control surface | Code, classes, chains, agents | Folders and Markdown |
| State inspection | Logs, traces, dashboards | Open the folder and read the files |
| Workflow change | Edit code and redeploy | Rename, add, or edit folders/files |
| Skill required | Developer | Operator with structured thinking |
| Best use case | Real-time loops, concurrency, automated retries | Sequential, high-quality, human-reviewed workflows |
| Debugging | Post-hoc trace analysis | Direct inspection of inputs and outputs |
| Portability | Environment-dependent | Folder can be zipped, cloned, or committed |

ICM does not eliminate frameworks.

It reduces unnecessary framework usage where the workflow is primarily sequential, interpretive, or human-reviewed.

---

## 5. The Five-Layer Context Hierarchy

ICM prevents context pollution by separating global instructions, routing logic, stage contracts, stable references, and working artifacts.

### Layer 0: Global Identity

#### File

```text
CLAUDE.md
```

#### Purpose

Defines the workspace identity.

It answers:

```text
Where am I?
What is this workspace?
What is the global operating model?
```

#### Example Use

For MIX:

```text
You are operating inside the Mortgage Intelligence Exchange workspace.
This workspace converts market, borrower, professional, and referral context into mortgage opportunity intelligence.
```

---

### Layer 1: Workspace Routing

#### File

```text
CONTEXT.md
```

#### Purpose

Directs the agent to the correct stage.

It answers:

```text
Where do I go?
Which folder should handle this task?
Which resources are shared across the workspace?
```

#### Example

```text
If the task involves identifying mortgage opportunity signals, route to 03_signal_detection.
If the task involves creating outreach, route to 06_outreach_generation.
If the task involves compliance review, route to 08_compliance_review.
```

---

### Layer 2: Stage Contract

#### File

```text
/stage-folder/CONTEXT.md
```

#### Purpose

Defines exactly what the stage does.

It answers:

```text
What do I read?
What do I do?
What do I produce?
How do I verify quality?
```

Each stage contract should include:

1. Inputs
2. Process
3. Outputs
4. Audit checklist

#### Example

```text
03_signal_detection/CONTEXT.md
```

```markdown
# Stage: Signal Detection

## Inputs
Read:
- ../02_context_research/output/research-summary.md
- ../reference/signal-taxonomy.md
- ../reference/vertical-pack-mortgage.md

## Process
Identify business, borrower, property, referral, and timing signals.
Classify each signal by urgency, revenue potential, and product fit.

## Outputs
Write:
- output/signal-report.md

## Audit
Before finalizing, confirm:
- Every signal is tied to source context
- Every signal has a suggested mortgage or GTM opportunity
- No unsupported claim is included
```

---

### Layer 3: Reference Material

#### Folder

```text
/reference/
```

#### Purpose

Stores stable rules, frameworks, standards, brand voice, compliance guides, and vertical knowledge.

This is the factory.

The agent should internalize this material as rules and constraints.

#### Examples

```text
reference/
├── mortgage-products.md
├── bcfsa-compliance.md
├── brand-voice.md
├── vertical-pack-accountants.md
├── vertical-pack-realtors.md
├── lender-guidelines.md
└── outreach-style-guide.md
```

Reference files should stay focused and concise.

Recommended size:

```text
Under 200 lines per reference file
```

---

### Layer 4: Working Artifacts

#### Folder

```text
/stage-folder/input/
/stage-folder/output/
```

#### Purpose

Stores the actual material being processed.

This is the product.

Examples:

```text
client-brief.md
research-notes.md
signal-report.md
outreach-draft.md
compliance-review.md
```

Working artifacts change from run to run.

They should not become permanent rules unless promoted into Layer 3 reference material.

---

## 6. Factory vs Product

A critical ICM rule is to separate stable instructions from temporary outputs.

| Type | Layer | Purpose | Example |
|---|---|---|---|
| Factory | Layer 3 | Stable rules and constraints | Brand voice, lender rules, compliance guides |
| Product | Layer 4 | Per-run artifacts | Research notes, drafts, signal reports |

Agents should learn from the factory, not from low-quality intermediate outputs.

This prevents quality decay across stages.

---

## 7. Stage Folder Pattern

Every stage should follow a predictable structure.

```text
01_research/
├── CONTEXT.md
├── input/
├── output/
└── notes/
```

Recommended pattern:

```text
workspace/
├── CLAUDE.md
├── CONTEXT.md
├── reference/
│   ├── brand-voice.md
│   ├── compliance.md
│   └── vertical-pack.md
│
├── 01_discovery/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 02_research/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 03_signal_detection/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 04_solution_mapping/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 05_outreach_generation/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
└── 06_review/
    ├── CONTEXT.md
    ├── input/
    └── output/
```

---

## 8. Rules for Good Stage Design

A good ICM stage should follow these rules:

- One stage, one job
- Stage `CONTEXT.md` should be under 80 lines
- Reference files should be under 200 lines
- Inputs must be explicitly named
- Outputs must have exact file names
- The stage should not read the entire workspace
- The stage should include a quality audit
- The stage should avoid circular dependencies
- The stage should not invent missing source material
- Human review points should be clearly marked

---

## 9. Selective Section Routing

Agents should not load entire folders or large documents unless necessary.

Instead, stage contracts should specify exact files or sections.

Poor instruction:

```text
Read everything in the reference folder.
```

Better instruction:

```text
Read:
- reference/brand-voice.md#tone-rules
- reference/mortgage-products.md#alternative-financing
- reference/bcfsa-compliance.md#advertising-claims
```

This reduces token waste and improves output quality.

---

## 10. Human-in-the-Loop Design

ICM assumes humans are part of the workflow.

Every output is an edit surface.

A human can open a file, edit a sentence, correct an assumption, add missing context, or approve the stage before the next stage runs.

The next stage treats that edited file as ground truth.

---

## 11. Intervention Pattern

ICM works best with a U-shaped human review model.

### Stage 1: High Human Input

Humans provide:

- Direction
- Judgment
- Constraints
- Strategic intent
- Creative angle

### Middle Stages: Lower Human Input

AI performs constrained execution.

These stages work well when:

- References are clear
- Inputs are clean
- Stage contracts are precise

### Final Stage: High Human Review

Humans verify:

- Accuracy
- Brand alignment
- Compliance
- Business logic
- Final quality

---

## 12. Governance Rules

ICM workspaces should follow these governance principles.

### 12.1 Docs Over Outputs

Agents should learn from stable reference documents, not from prior outputs.

Prior outputs may contain errors.

Stable reference files should be the source of truth.

### 12.2 One-Way Dependencies

A later stage can read an earlier stage.

An earlier stage should not read a later stage.

Example:

```text
04_solution_mapping can read 03_signal_detection.
03_signal_detection should not read 04_solution_mapping.
```

### 12.3 Canonical Source Rule

Every rule should have one home.

Do not duplicate the same rule across multiple files.

### 12.4 Output Provenance

Where possible, important outputs should identify which source or reference influenced them.

Example:

```text
Signal: High special levy financing need
Source: strata-research-summary.md
Reference: mortgage-products.md#heloc-refinance-second-mortgage
```

---

## 13. ICM for RIOS / MIX / LeadSniperAI

For the ecosystem, ICM should be used as the context operating layer.

### Recommended Architecture

```text
RIOS / MIX Platform
│
├── Supabase
├── n8n
├── MCP tools
├── Unipile
├── GitHub
├── CRM
├── Claude Code / Codex
│
└── ICM Workspaces
    ├── Mortgage Intelligence Exchange
    ├── LeadSniperAI GTM Workspace
    ├── RIOS RevOps Workspace
    ├── Professional Alliance Network Workspace
    └── Compliance Evidence Workspace
```

ICM should not replace n8n, Supabase, MCP, or APIs.

Instead, ICM organizes the context, rules, stage logic, and human review process.

---

## 14. Example: MIX ICM Workspace

```text
mix-icm-workspace/
├── CLAUDE.md
├── CONTEXT.md
├── reference/
│   ├── mortgage-products.md
│   ├── lender-guidelines.md
│   ├── bcfsa-compliance.md
│   ├── partner-network.md
│   ├── vertical-packs.md
│   └── outreach-style-guide.md
│
├── 01_lead_intake/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 02_context_research/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 03_signal_detection/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 04_problem_identification/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 05_solution_mapping/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 06_outreach_generation/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
├── 07_compliance_review/
│   ├── CONTEXT.md
│   ├── input/
│   └── output/
│
└── 08_partner_reporting/
    ├── CONTEXT.md
    ├── input/
    └── output/
```

---

## 15. Example: LeadSniperAI GTM Workspace

```text
leadsniper-icm-workspace/
├── CLAUDE.md
├── CONTEXT.md
├── reference/
│   ├── gtm-signal-taxonomy.md
│   ├── vertical-packs.md
│   ├── outreach-rules.md
│   ├── crm-enrichment-rules.md
│   └── qualification-framework.md
│
├── 01_business_discovery/
├── 02_public_context_research/
├── 03_signal_scoring/
├── 04_opportunity_classification/
├── 05_offer_mapping/
├── 06_outreach_generation/
├── 07_reply_interpretation/
├── 08_crm_update/
└── 09_client_report/
```

---

## 16. When to Use ICM

Use ICM when the workflow is:

- Sequential
- Context-heavy
- Business-rule heavy
- Human-reviewed
- Repeatable
- Vertical-specific
- Compliance-sensitive
- Git-friendly
- Agent-assisted

Good examples:

- Mortgage opportunity research
- GTM campaign generation
- Referral partner intelligence
- Investor outreach packets
- Compliance review
- Legal document preparation
- Sales enablement systems
- Client reporting
- Knowledge product production

---

## 17. When Not to Use ICM Alone

ICM should not be the only system when you need:

- High-volume real-time automation
- Parallel agent swarms
- Complex event-driven workflows
- API-heavy transactional operations
- Automated retries
- Long-running background jobs
- Realtime inbox synchronization

In those cases, pair ICM with:

- n8n
- Supabase
- MCP
- Queue workers
- APIs
- Webhooks
- Cron jobs
- Agent runtimes

---

## 18. Recommended Hybrid Stack

For RIOS and MIX:

```text
ICM = context architecture
n8n = workflow automation
Supabase = system of record
MCP = tool access layer
Claude Code = workspace-aware implementation
Codex = code implementation and testing
GitHub = version control and audit trail
CRM = operational surface
```

This gives the platform both:

- Human-readable intelligence architecture
- Production-grade automation infrastructure

---

## 19. Implementation Checklist

Before using an ICM workspace, confirm:

- Workspace has `CLAUDE.md`
- Workspace has root `CONTEXT.md`
- Each stage has its own `CONTEXT.md`
- Each stage has one clear job
- Inputs are explicitly defined
- Outputs are explicitly named
- Reference files are concise
- No circular references exist
- Human checkpoints are identified
- Output folders are excluded from Git where appropriate
- Stage audits are included
- Compliance-sensitive stages have review gates

---

## 20. Final Summary

ICM is a practical architecture for managing AI context.

It shifts the center of gravity away from code-heavy orchestration and toward structured, visible, editable context.

The core idea is simple:

```text
Folders define stages.
Markdown defines instructions.
Files define state.
Humans edit outputs.
Agents execute transformations.
Git tracks the system.
```

For RIOS, MIX, Mortgage Intelligence Exchange, and LeadSniperAI, ICM should become the standard pattern for building vertical-specific AI workspaces.

It gives the platform a durable advantage:

- Faster iteration
- Better observability
- Lower engineering friction
- Stronger human control
- Better compliance posture
- Easier vertical replication
- Cleaner agent collaboration

ICM is not the whole technology stack.

It is the operating architecture for context.
