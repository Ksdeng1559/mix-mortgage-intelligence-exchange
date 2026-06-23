# Security and Compliance Posture

## Operating Principle

The Local Mortgage Copilot workspace is designed for a private mortgage file environment.

Borrower documents, extracted text, transaction data, AML notes, and broker reports should remain inside the local computer or private server unless the broker explicitly exports them.

## Default Controls

- Local-first processing
- Local database
- Local file storage
- Local Ollama model calls
- Human approval before export
- Append-only audit log
- Role-based access
- Encrypted backups
- Retention rules per brokerage policy

## Data Categories

| Data Type | Local Storage | External Transmission Default |
|---|---:|---:|
| Borrower identity documents | Yes | Disabled |
| Bank statements | Yes | Disabled |
| OCR text | Yes | Disabled |
| Extracted transactions | Yes | Disabled |
| AML questionnaire answers | Yes | Disabled |
| Risk flags | Yes | Disabled |
| Broker reports | Yes | Manual export only |
| CRM summary fields | Optional | Disabled by default |

## Human Approval Gates

Human review is required before:

- sending borrower documents externally
- exporting a lender package
- syncing data to a CRM
- using a cloud model fallback
- emailing a borrower or lender
- marking a compliance file complete

## Audit Events

The workspace should record:

- user login
- borrower created
- deal created
- document uploaded
- document viewed
- OCR started/completed
- LLM extraction started/completed
- rules engine completed
- risk flag created/resolved
- broker report generated
- export package generated
- external sync approved

## Retention Model

Each deal should support:

- funded date
- closed date
- retention start date
- retention end date
- archive status
- legal hold flag
- deletion approval status

## Suggested Local Hardening

- Full disk encryption
- Strong local admin password
- Unique app users
- Local network or VPN-only access
- Encrypted daily backup
- Separate backup location
- No shared generic accounts
- Least-privilege file access
- Periodic export review

## Compliance Boundary

The system provides broker support, file intelligence, document extraction, and workflow tracking.

It does not replace licensed broker judgment, lender underwriting, required disclosures, FINTRAC obligations, BCFSA obligations, or lender submission requirements.
