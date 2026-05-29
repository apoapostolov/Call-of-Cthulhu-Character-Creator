# DEVELOPMENT PLAN

## Current Focus

- harden the Campfire Tales era into a complete V1 scout-investigator flow
- canonical implementation areas: `eras/campfire-tales/`,
  `hooks/useCharacter.ts`, `components/StatsTab.tsx`,
  `components/SkillsTab.tsx`, `components/DossierTab.tsx`, and
  `lib/ai/skill-distribution.ts`

## Scope And Boundaries

- what this pass owns: Campfire Tales era mechanics, scout sheet state,
  badge/backstory support, AI Distribution context, and tests
- what this pass does not own: a full combat tracker, a dedicated official
  Campfire PDF mapping, or broader save-system redesign beyond serializing new
  scout state

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

## Risks And Blockers

- no active blockers
- no Campfire-specific PDF form mapping is available yet, so printable/export
  support still falls back to existing generic sheet behavior
- full character load restoration remains broader than Campfire and should be
  handled as its own save-system pass
