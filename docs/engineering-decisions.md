# Engineering decisions

## PostgreSQL instead of prompt memory

Mutable state belongs in a database with constraints, provenance and audit
history. Prompts contain behaviour and output contracts, not current personal
facts.

## One-way ingestion instead of two-way cell sync

Two systems editing the same spreadsheet cells cannot be merged safely without
field ownership. Atlas therefore treats imported sheets as source-owned
snapshots and keeps user corrections separately. Reconciliation produces the
working view.

## Durable jobs before model calls

AI quota, authentication and network failures are normal operating states. A
job is persisted before execution, claimed idempotently and completed only
after output validation and database persistence.

## Structured discovery contract

Radar output is not accepted as an arbitrary report. Each discovery includes a
stable identity, module, type, status, evidence, source URL, observation time
and next action. Per-source coverage is stored alongside the result.

## Model output cannot mutate records

Current chat is read-only. Changes use the manual management screens and their
audited record managers, with stable identity and version checks. Earlier
proposal/confirmation UI is not a current capability claim. This keeps model
behaviour outside the system-of-record boundary.

## Local recovery outside the web application

A stopped container cannot start its own dashboard. Local deployments use a
small loopback-only host controller with allowlisted operations and deterministic
health checks. Cloud deployments replace this boundary with hosting-platform
health probes and restart policies.

## Small, versioned knowledge context

Local collections publish a file allowlist. Unchanged hashes reuse the index;
changed files preserve provenance. Query-scoped PostgreSQL text chunks and
lexical ranking are sufficient for the current corpus; a vector database is
not claimed. User experience, others' reports and external news remain distinct.

## Generic notification previews

Push delivery can reach a phone while the private network is disconnected.
Therefore names, task text, counts and report details do not belong in its
preview. A generic notification links back to privately accessible content.

## Explicit preparation boundaries

The career pilot reuses selected upstream modules for material preparation and
ordinary field prefill. It preserves master templates and leaves final submit
to the user. Local support cases and a Bug Log demonstrate application-support
work; they do not imply an enterprise endpoint-management rollout.
