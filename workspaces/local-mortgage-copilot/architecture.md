# Local Mortgage Copilot Architecture

## Goal

Create a local-first mortgage intelligence workspace that runs on a broker-owned computer or private server and processes borrower documents inside the local environment.

## Logical Architecture

```text
Browser UI
  ↓
Next.js Mortgage Copilot Workspace
  ↓
FastAPI Local API
  ↓
PostgreSQL + MinIO + Redis
  ↓
Document Worker
  ↓
Docling / PaddleOCR / Table Parser
  ↓
Ollama Local LLM
  ↓
Python Rules Engine
  ↓
Broker Review + Export Package
```

## Core Services

### Next.js Workspace UI

- borrower workspace
- deal workspace
- document upload
- extraction status
- AML questionnaire
- document checklist
- risk flag review
- report export controls

### FastAPI Local API

- authentication and sessions
- borrower, deal, and document records
- local file upload routing
- document job creation
- extraction result storage
- audit event creation
- report generation endpoints

### Document Worker

- consume processing jobs
- classify uploaded files
- run PDF parsing
- run OCR when required
- call Ollama for structured extraction
- validate extracted JSON
- run mortgage rules
- write confidence scores and risk flags

### Ollama Layer

Ollama should be used as the local reasoning layer.

Recommended task split:

| Task | Model Direction |
|---|---|
| Text reasoning | llama3.1, llama3.2, mistral, phi4 |
| Visual document understanding | qwen2.5vl or successor vision model |
| JSON normalization | smaller structured-output model |

The model output is not the final source of truth. Rules and broker review remain required.

### Rules Engine

Initial bank-statement checks:

- opening and closing balance math
- date gaps
- missing pages
- NSF count
- overdraft count
- large deposits
- recurring income deposits
- transfer patterns
- name/address mismatch
- broker review requirement

## Deployment Modes

### Mode A — Single Broker Desktop

- localhost only
- Docker Desktop
- encrypted local disk
- single broker user
- manual backup

### Mode B — Private Office Server

- LAN or VPN access
- Linux server
- role-based users
- encrypted backups
- local DNS or private domain

### Mode C — Controlled Private Server

- controlled user access
- append-only audit logs
- encrypted backup target
- export approvals
- retention policies

## Data Flow

```text
1. Broker creates borrower/deal workspace
2. Broker uploads borrower documents
3. File lands in local object storage
4. API creates a document processing job
5. Worker extracts text, tables, and OCR
6. Worker calls Ollama using a schema-bound prompt
7. Result is validated against the JSON schema
8. Rules engine produces flags and confidence
9. Broker reviews extraction and exceptions
10. Broker approves report or export package
11. Audit log records each step
```

## Integration Boundary

Allowed by default:

- local database
- local object storage
- local Ollama
- local report export

Disabled by default:

- cloud model fallback
- CRM sync
- automatic email send
- automatic lender portal upload
- automatic borrower communication

Integrations can be added later as explicit broker-approved connector actions.
