# DEVELOPMENT PLAN

## Current Focus

- **Optimization epic complete** (2026-07-27) — see
  `docs/OPTIMIZATION_PROPOSAL.md` outcome table
- Product: finish Regency reputation + export (TODO Prompts 3–4)
- Optional polish only (not planned): full `strict` TS, ESLint package,
  further shrinking of `useCharacter` orchestration

## Scope And Boundaries

- what this pass owns: performance, architecture hygiene, and test graph
  cleanliness described in the optimization proposal
- what this pass does not own: new eras, full UI redesign, replacing pdf-lib

## Working Rules

- Keep the plan focused on the next executable work.
- Update the plan when scope, sequencing, or ownership changes.
- Keep the plan concise enough that an executor can act on it without hidden
  context.
- Use absolute dates in any decision notes or revisions.

## Decision Log

- 2026-05-28: create local operating docs first so future feature work starts
  from the same standards baseline.
- 2026-05-29: treat Campfire Tales as a 1920s-adjacent scout era that reuses
  occupation-like hobby flow while adding rank-based points, Family Credit
  Rating, Cool, badges, Distress, Adversity, and scout backstory state.
- 2026-05-29: reset the plan to a next-epic landing zone after Campfire Tales
  1.0.2 shipped.
- 2026-07-27: start optimization epic from `docs/OPTIMIZATION_PROPOSAL.md`.
  Canonical western selectedEra id is `western-1880s` (data folder remains
  `eras/western-1870s/`). Prefer pure React memo/context before adding a store.

## Risks And Blockers

- Wave B lazy-load must not break offline/save-load or PDF field maps
- Portrait/API key UX must stay settings-driven for public builds
