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

### [ ] Prompt 2 - Campfire Tales V1 hardening

Continue the Campfire Tales implementation after the first integrated pass.

Context:

- `campfire-tales` is a kid scout adventure era using Scout Investigators,
  hobbies, Family Credit Rating, Cool, Distress, Adversity, and badges
- V1 uses occupation-like hobby records to reuse the existing character flow
- combat and healing rules are surfaced as UI notes, not a full tracker

Next prompts:

- verify all hobby choice groups create valid specialized skills
- add richer badge selection for "Ability Badge of Choice" hobbies
- add scout backstory fields for Home, Trusted Adult, Obligations, Fears, and
  Campfire Notes
- add a Campfire-specific printable/export sheet path when available
- improve AI Distribution prompts with badge and Family Credit context
- add manual save/load restoration for scout-specific state if full restore is
  implemented later

Validation:

- `npm test`
- `npm run build`
- smoke select `Campfire Tales`, roll a Wanderer, choose a hobby, allocate
  points, inspect Dossier scout panel, and run AI Distribution

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
