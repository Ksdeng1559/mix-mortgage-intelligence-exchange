# Local Mortgage Copilot Workspace

## Purpose

This workspace defines the local-first RIOS Mortgage Copilot module for MIX — Mortgage Intelligence Exchange.

The objective is to create a private, regulated, broker-controlled mortgage intelligence workspace that can run on a local server with Ollama and keep borrower documents, OCR output, extracted data, audit trails, and broker reports contained on the local computer or private server.

This is designed to operate like a regulated broker-side workspace, similar in spirit to a lender submission environment such as Velocity, but focused on pre-submission intelligence, document review, AML intake, and broker decision support.

## Product Position

MIX remains the relationship asset management and opportunity intelligence layer.

Local Mortgage Copilot becomes the private file intelligence and compliance workbench inside MIX.

```text
MIX Opportunity Intelligence
↓
Borrower Intake
↓
Local Mortgage Copilot
↓
Document Intelligence
↓
AML / FINTRAC Intake
↓
Broker Review
↓
Manual Export to Velocity / Filogix / Scarlett / Finmo / Lender Portal
```

## Core Principle

No borrower document leaves the local environment unless the broker explicitly exports it.

Default posture:

- local OCR
- local LLM through Ollama
- local database
- local object storage
- local audit log
- local broker report generation
- no cloud AI by default
- no automatic CRM sync by default
- explicit human approval for exports

## Initial MVP Scope

The first local workspace should include:

1. Secure local document upload
2. Borrower and deal workspace
3. Bank statement intelligence
4. AML / FINTRAC questionnaire capture
5. Risk flag engine
6. Broker summary generator
7. PDF and Excel export
8. Append-only audit log
9. Manual export package for lender submission systems

## Recommended Local Stack

```text
Docker Compose
Next.js frontend
FastAPI backend
PostgreSQL database
MinIO local encrypted object storage
Redis queue
Python worker
Docling / PaddleOCR
Ollama
Local rules engine
Optional local n8n
```

## Workspace Files

- `architecture.md` — deployment and module architecture
- `security-and-compliance.md` — private regulated server controls
- `database/local_mortgage_copilot.sql` — proposed local schema
- `schemas/bank-statement-extraction.schema.json` — first structured extraction contract
- `workflows/WF-DOC-001-bank-statement-intelligence.md` — first document intelligence workflow
- `docker-compose.local.yml` — local server service scaffold

## Near-Term Build Order

1. Stand up local Docker Compose environment
2. Add local borrower/deal/document tables
3. Implement file upload to MinIO
4. Add OCR/parser worker
5. Add Ollama structured extraction
6. Add bank statement rules engine
7. Add broker review UI
8. Add export package generator

## Human-Control Rule

The system may analyze, classify, score, summarize, and draft notes.

The system must not submit a mortgage file, send borrower documents, transmit sensitive information, or make a regulated lending decision without explicit broker review and approval.
