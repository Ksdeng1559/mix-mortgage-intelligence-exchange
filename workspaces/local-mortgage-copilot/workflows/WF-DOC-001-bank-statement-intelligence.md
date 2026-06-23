# WF-DOC-001 — Bank Statement Intelligence

## Objective

Extract, normalize, validate, and summarize bank statement data inside the local Mortgage Copilot workspace so the broker can review income, deposits, NSF activity, overdrafts, source-of-funds issues, and submission notes without sending borrower documents outside the local environment.

## Trigger

A document is uploaded and classified as `bank_statement`.

## Required Context

- borrower record
- deal record
- uploaded document record
- local security mode
- bank statement JSON schema
- local mortgage rules engine thresholds

## Preconditions

- document file exists in local object storage
- document belongs to an active deal
- broker or authorized user has permission to process the file
- local OCR/parser service is available
- Ollama service is available

## Procedure

1. Create `mix_local_document_jobs` record with status `queued`.
2. Load file from local object storage.
3. Determine whether PDF has embedded text, tables, scanned image pages, or mixed content.
4. Run PDF parser for embedded text and table structure.
5. Run OCR for scanned pages or low-confidence pages.
6. Normalize extracted text and table fragments.
7. Call Ollama with the bank-statement extraction schema.
8. Validate returned JSON against `bank-statement-extraction.schema.json`.
9. Write extraction to `mix_local_document_extractions`.
10. Write parsed transactions to `mix_local_bank_transactions`.
11. Run deterministic validation rules.
12. Create risk flags for exceptions.
13. Mark broker review required when thresholds are triggered.
14. Generate draft broker summary.
15. Write all material actions to `mix_local_audit_log`.

## Decision Rules

### Document Confidence

- Overall confidence below `0.85` requires broker review.
- OCR confidence below `0.80` requires broker review.
- Table extraction confidence below `0.80` requires broker review.

### Statement Completeness

- Missing statement period requires broker review.
- Date gaps inside a 90-day review window require broker review.
- Missing pages require broker review.

### Balance Validation

- If opening balance plus credits minus debits does not reconcile to closing balance within tolerance, create a `balance_mismatch` risk flag.

### NSF / Overdraft

- Any NSF item creates an `nsf_detected` risk flag.
- Any overdraft creates an `overdraft_detected` risk flag.
- More than two NSF or overdraft events in the review period creates a high-severity flag.

### Large Deposits

- Any deposit above the configured threshold creates a `large_deposit` flag.
- Large deposits require source-of-funds notes before report approval.

### Recurring Income

- Recurring income requires at least two matching deposit events.
- Unclear income source requires broker review.

## Output Contract

```json
{
  "document_id": "uuid",
  "extraction_id": "uuid",
  "document_type": "bank_statement",
  "institution_name": "string",
  "statement_period": {
    "start_date": "YYYY-MM-DD",
    "end_date": "YYYY-MM-DD"
  },
  "summary": {
    "average_monthly_income": 0,
    "total_credits": 0,
    "total_debits": 0,
    "nsf_count": 0,
    "overdraft_count": 0,
    "large_deposit_count": 0
  },
  "risk_flags": [
    {
      "flag_type": "string",
      "severity": "info|low|medium|high|critical",
      "title": "string",
      "detail": "string"
    }
  ],
  "confidence": {
    "overall": 0,
    "ocr": 0,
    "table_extraction": 0,
    "transaction_parsing": 0
  },
  "broker_review_required": true
}
```

## Human Approval

Broker review is required before:

- accepting extracted income
- approving source-of-funds notes
- resolving risk flags
- generating a final broker report
- exporting the document package

## Write-Back Rules

Allowed:

- extraction JSON
- parsed transactions
- confidence scores
- risk flags
- draft broker notes
- audit events

Not allowed without broker approval:

- external transmission
- CRM sync
- lender portal upload
- borrower email
- final submission notes

## Success Metrics

- 90%+ extraction success for clean digital statements
- all NSF and overdraft events surfaced to broker
- all configured large deposits flagged
- broker can generate a useful draft summary in under five minutes
- every document processing action has an audit event
