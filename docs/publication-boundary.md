# Publication boundary

This repository is a hand-curated showcase, not a mirror of the production
codebase.

## Included

Since 23 Nov 2026 this repository holds the short public layer only: results,
boundaries and judgements, not the recipe.

- The README (English and Chinese), the film, the poster and synthetic screens.
- A static synthetic demo (dependency-free HTML, CSS and JavaScript) with clearly
  labelled made-up records.
- Selected, dated aggregate observations in `operating-snapshot.json`, under a
  fixed numeric/date schema. They are historical acceptance evidence, not a
  live data connection or production record export.
- Public-safe validation and continuous integration for this repository.
- Links and README cards (`media/explorer-replay*.jpg`, `media/walkthrough*.jpg`)
  for the Run Explorer and its narrated walkthrough at <https://lifeops.evanh.dev>,
  which are hosted separately from this repository.

The engineering documents that used to be here (architecture, AI roles,
engineering decisions, verification definitions, the capability map) moved back
to the private repository; they are available on request.

## The Run Explorer exception (approved 21 Nov 2026)

The owner approved one exception to keeping implementation code out of public
view. The Run Explorer replays recorded real runs of the career-materials
pipeline only, on a fictional candidate, employer and form, pinned to one
commit of the private implementation. Since 23 Nov 2026 it shows the checks each
step ran in full, the code that builds prompts or calls the model by signature
only, and each prompt by its opening lines and length; other files, including
the recorder and its scanner, are listed by name only. The narrated walkthrough on the same site shows excerpts from the
same commit and nothing more. Nothing else in the exclusions below changes: no personal records,
no other prompts or orchestration, and no private Git history. The four-screen
demo in this repository is labelled as sample data with preset responses.

## Excluded

- Names, contact histories, calendar entries, applications and personal rules.
- Database dumps, files, reports, logs, message history and screenshots from
  the production system.
- Spreadsheet, calendar, Drive, channel or private-network identifiers.
- Credentials, OAuth configuration, webhook targets and local machine paths.
- Production prompts, source registries and provider-specific orchestration.
- Production Git history.

## Release process

1. Add or update content directly in this public repository.
2. Use synthetic examples instead of transforming production records.
3. Run `npm run validate:public` and `npm test`.
4. Review the complete diff before push.
5. Never add the private repository as a Git remote or automate whole-tree
   synchronisation.

The validator is a guardrail, not a substitute for human review.

## 29 Oct 2026 selection

Generic architecture, stable records/corrections, bounded retrieval, private
notification previews, manual material preparation and support-case practices
are suitable for public evaluation. The snapshot contains counts only; source
messages, source paths, personal experiences, resumes and operational evidence
remain private. The poster was redrawn on 16 Nov 2026 from the synthetic demo
screens and the dated test and snapshot figures; it publishes no personal record
totals. The 8 Oct poster and its record counts remain only in Git history.

Do not market private offline people reports as scraping, preparation as
automatic applications, PWA as a native application, case management as full
enterprise device management, or a calendar interval as uptime. LinkedIn
access is manual-only throughout the implementation.
