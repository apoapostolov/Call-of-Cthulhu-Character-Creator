# TODO - Call of Cthulhu Character Creator

## Current Focus

- keep the project-local operating docs aligned with the app's current
  behavior and release state
- canonical files: `AGENTS.md`, `DEVELOPMENT_PLAN.md`, `DEVELOPMENT_LOG.md`,
  and `CHANGELOG.md`

## Scope And Boundaries

- owns repository documentation, validation notes, and execution-ready work
  prompts
- does not own feature design decisions unless those decisions change the
  docs or release notes

## Active Prompt Queue

### [ ] Prompt 1 - Keep docs synchronized

Review the repository docs before and after implementation work so the local
standards stay accurate.

Context:

- this repo uses era-specific data under `eras/`, optional Gemini features,
  and PDF export assets under `public/sheets/`
- the repo-local standards expect `AGENTS.md`, `TODO.md`,
  `DEVELOPMENT_PLAN.md`, `DEVELOPMENT_LOG.md`, and `CHANGELOG.md` to stay in
  sync

Inputs:

- `README.md`
- `package.json`
- `DEVELOPMENT_PLAN.md`
- `DEVELOPMENT_LOG.md`
- `CHANGELOG.md`

Outputs:

- updated docs that match the current app behavior and workflow

Validation:

- `npm test`
- `npm run build`
- markdown lint on any edited `.md` files

Delegation notes:

- keep changes factual and repo-specific
- do not invent release notes or user-visible claims that are not backed by the
  current code

## Decision Log

- 2026-05-28: create project-local operating docs before the next code change
  so future work has an explicit source hierarchy and validation path.

## Risks And Blockers

- no active blockers
- documentation may still need refreshes when app behavior or release scope
  changes
