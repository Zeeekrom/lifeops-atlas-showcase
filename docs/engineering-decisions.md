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

## Human confirmation for mutations

The assistant may propose a change, but the user confirms it through the same
audited API used by manual dashboard edits. This keeps provider behaviour
outside the system-of-record boundary.

## Local recovery outside the web application

A stopped container cannot start its own dashboard. Local deployments use a
small loopback-only host controller with allowlisted operations and deterministic
health checks. Cloud deployments replace this boundary with hosting-platform
health probes and restart policies.
