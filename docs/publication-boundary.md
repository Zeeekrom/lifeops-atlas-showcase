# Publication boundary

This repository is a hand-curated showcase, not a mirror of the production
codebase.

## Included

- High-level architecture and engineering trade-offs.
- A static dashboard implemented with dependency-free HTML, CSS and JavaScript.
- Clearly labelled synthetic records.
- Public-safe validation and continuous integration.
- Generic descriptions of adapters, reconciliation, scheduling and AI safety.

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
