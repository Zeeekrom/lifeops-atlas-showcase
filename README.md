# LifeOps Atlas

<p align="right"><strong>English</strong> · <a href="README.zh-CN.md">简体中文</a></p>

> A privacy-safe engineering showcase of a personal operations platform that
> turns fragmented schedules, tasks, relationships and opportunity signals into
> an auditable daily decision system.

[![Public-safe validation](https://github.com/Zeeekrom/lifeops-atlas-showcase/actions/workflows/validate.yml/badge.svg)](https://github.com/Zeeekrom/lifeops-atlas-showcase/actions/workflows/validate.yml)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-3c873a)
![Architecture](https://img.shields.io/badge/architecture-event--driven-164e63)
![Data](https://img.shields.io/badge/demo%20data-synthetic-0f766e)

LifeOps Atlas is a local-first system for coordinating daily actions, calendar
events, professional relationships, opportunities and recurring AI-assisted
research. It was designed to replace opaque prompt-and-spreadsheet workflows
with explicit state, provenance, reconciliation and failure visibility.

This repository is a deliberately sanitised portfolio edition. It contains a
runnable synthetic-data demo and the core architectural decisions, but no
personal data, production prompts, credentials, provider identifiers or
private deployment configuration.

## Real-world operating snapshot

<table>
  <tr>
    <td align="center"><strong>22+ days</strong><br><sub>Shadow operation since 16 Sep 2026</sub></td>
    <td align="center"><strong>245</strong><br><sub>Canonical people</sub></td>
    <td align="center"><strong>95</strong><br><sub>Interactions reconciled</sub></td>
    <td align="center"><strong>108</strong><br><sub>Opportunities tracked</sub></td>
  </tr>
  <tr>
    <td align="center"><strong>91</strong><br><sub>Upcoming events</sub></td>
    <td align="center"><strong>194</strong><br><sub>Deduplicated radar findings</sub></td>
    <td align="center"><strong>19</strong><br><sub>Reports delivered</sub></td>
    <td align="center"><strong>10</strong><br><sub>Ambiguous identities surfaced for review</sub></td>
  </tr>
</table>

Verified operational outcomes:

- The latest mirror check reconciled all 16 expected source tabs with zero
  failed tabs.
- The radar retained 194 structured, deduplicated findings instead of leaving
  discoveries only inside transient chat responses.
- Ten ambiguous identity records were held for explicit review rather than
  silently merged or treated as new people.
- Nineteen structured reports reached the notification lane while preserving
  delivery status for later audit.

_Snapshot captured 8 Oct 2026. These are manually published, selected
aggregates; this public repository has no live connection to the private
production database. The figures describe operating scale and verifiable
system behaviour, not guaranteed career or personal outcomes._

## What the system demonstrates

- A canonical PostgreSQL model for people, interactions, events,
  opportunities, actions, evidence, incidents and automated runs.
- TypeScript/Fastify APIs that separate source ingestion from user-authored
  corrections and system-owned projections.
- A scheduled radar pipeline that records source coverage, failures,
  discoveries and delivery state instead of returning an untraceable answer.
- Read-only calendar and spreadsheet ingestion with deterministic
  reconciliation, deduplication and durable tombstones.
- Persistent AI conversations where messages survive provider outages and
  proposed data changes require explicit confirmation.
- A responsive bilingual dashboard, local recovery controller and mobile
  access through a private network boundary.

## Architecture

```mermaid
flowchart LR
    A[Source adapters] --> B[Raw snapshots]
    B --> C[Evidence ledger]
    C --> D[Reconciliation engine]
    D --> E[(Canonical PostgreSQL state)]
    E --> F[Daily workspace]
    E --> G[Radar orchestrator]
    E --> H[AI conversation worker]
    G --> I[Structured report]
    I --> J[Notification channels]
    F --> K[Audited user corrections]
    K --> D
```

The key boundary is that imported sources are evidence, not truth. Explicit
user corrections outrank stale source rows, and every state change retains its
origin and audit history.

Read the complete public-safe design in [Architecture](docs/architecture.md),
[Engineering decisions](docs/engineering-decisions.md), and
[Publication boundary](docs/publication-boundary.md).

## Run the synthetic demo

The demo has no backend and makes no network requests. Every record is clearly
marked as synthetic.

**[Open the hosted synthetic demo](https://zeeekrom.github.io/lifeops-atlas-showcase/)**

```bash
npm run validate:public
npm test
npm run dev
```

Then open <http://127.0.0.1:4173>.

The demo includes Today, Radar, Networking and Data Quality views, language
switching, drill-down panels and responsive layouts. It is intentionally a
product walkthrough rather than a copy of the private production interface.

## Engineering highlights

| Area | Approach |
| --- | --- |
| Data ownership | Source-owned snapshots, user-owned corrections and system-owned projections are stored separately |
| Reliability | Idempotent jobs, bounded retries, stale-job expiry and classified failures |
| Time | Canonical IANA timezone with daylight-saving regression tests |
| AI safety | Structured outputs, bounded context and confirmation-gated mutations |
| Privacy | Private production repository; synthetic public demo; automated publication scan |
| Operations | Container health checks plus a model-independent local bootstrap controller |

## Public versus private

The production repository remains private because it contains personal domain
rules and connectors tied to real accounts. This public repository does not
share Git history with production and is not an automated mirror. Public
updates are reviewed as an explicit release step and pass the included
publication validator before push.

## Project status

The private system currently runs as a shadow lane beside an existing workflow.
The portfolio edition focuses on the engineering patterns that are reusable in
other personal-operations, CRM and agent-orchestration systems.

No licence is granted for reuse at this time. The repository is public for
technical review and portfolio evaluation.
