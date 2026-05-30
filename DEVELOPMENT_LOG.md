# DEVELOPMENT LOG

## 2026-05-30 - Regency AI prompt period grounding

- Context: tighten the Regency-era AI payloads so name, portrait, and skill
  distribution prompts explicitly reflect Regency England rather than generic
  19th-century British flavor.
- Root cause: the Regency data scaffold existed, but the AI helpers still left
  too much room for modern or vague historical assumptions.
- Files changed: `prompts/prompt-data.ts`, `hooks/useCharacter.ts`,
  `hooks/useAIGeneration.ts`, `hooks/ai/useNameGeneration.ts`,
  `hooks/ai/usePortraitGeneration.ts`, `eras/regency/theme.ts`,
  `eras/regency/decades-data.ts`, and `tests/regency.test.ts`.
- Validation: `npx tsc --noEmit` passed; `npm test` passed with 71 tests.
- Follow-up risk: if the Regency prompt still feels too broad in practice, the
  next refinement should tune the period-specific naming and portrait cues
  further rather than changing the era data model.

## 2026-05-30 - Release v1.0.3 metadata sync

- Context: move the current unreleased notes into the `1.0.3` release and
  align the visible version surfaces with the tag that will be cut.
- Root cause: `1.0.2` was already released, but the top-of-file release notes
  and package metadata still pointed at the previous version.
- Files changed: `CHANGELOG.md`, `package.json`, `package-lock.json`,
  `README.md`, and this log entry.
- Validation: `npm test` passed with 69 tests; `npm run build` passed with the
  existing Vite chunk-size warning; markdown lint passed for the edited docs.
- Follow-up risk: the release tag still needs to be created after validation.

## 2026-05-30 - Regency occupations and skill list implementation

- Context: replace the Regency placeholder data with the chapter's actual
  occupation bands, social-class framing, and adjusted skill list.
- Files changed: `CHANGELOG.md`, `DEVELOPMENT_LOG.md`, `TODO.md`,
  `components/skills/SkillRow.tsx`, `hooks/useAggregatedData.ts`,
  `hooks/useCharacter.ts`, `eras/regency/occupations-data.ts`,
  `eras/regency/skill-specializations-data.ts`, `eras/regency/skills-data.ts`,
  and `tests/regency.test.ts`.
- Changes: added the Regency occupation roster with band-aware credit ranges
  and hobby-style cases, replaced the placeholder Regency skill list with the
  chapter's allowed skills and era-only adjustments, wired Regency-specific
  specialization catalogs into the aggregated data flow, made Regency Dancing
  and Etiquette derive from DEX/5 and INT/5, and taught the UI to treat Pilot
  (Boat) as a flat skill.
- Validation: `npx tsc --noEmit` passed; `npm test` passed with 68 tests;
  `npm run build` passed with the existing Vite chunk-size warning.

## 2026-05-30 - Regency equipment and price list overhaul

- Context: replace the inherited Classic 1920s Regency placeholder catalog
  with period-appropriate Regency England prices, old-money parsing, and
  class/gender-aware equipment kits.
- Files changed: `CHANGELOG.md`, `DEVELOPMENT_LOG.md`, `TODO.md`,
  `components/OccupationInfoModal.tsx`, `components/gear/WealthDisplay.tsx`,
  `eras/manifest.ts`, `eras/regency/equipment-kits.ts`,
  `eras/regency/items-from-prices.ts`, `tests/regency.test.ts`, and
  `utils/money.ts`.
- Changes: replaced the Regency equipment catalog with a Regency-specific
  price list built from the appendix's representative food, clothing, travel,
  leisure, and household costs; switched the Regency manifest to use that
  era-specific catalog instead of inheriting the Classic 1920s price list;
  added old-money parsing for guineas and slash-form pounds/shillings/pence;
  gave Regency the £ display in the wealth card; and rebuilt the equipment
  kits around Regency high-society male/female distinctions plus country,
  household, coachman, and scholarly archetypes.
- Validation: `npx tsc --noEmit` passed; `npm test` passed with 69 tests;
  `npm run build` passed with the existing Vite chunk-size warning.

## 2026-05-30 - Regency era scaffold and manifest ordering

- Context: introduce Regency Cthulhu as the next era epic, with the new era
  positioned before Campfire Tales and the implementation queue preserved in
  `TODO.md`.
- Files changed: `TODO.md`, `CHANGELOG.md`, `DEVELOPMENT_LOG.md`,
  `eras/manifest.ts`, `eras/regency/theme.ts`, `eras/regency/decades-data.ts`,
  `eras/regency/occupations-data.ts`, `eras/regency/skills-data.ts`,
  `eras/regency/prices-data.ts`, `eras/regency/equipment-kits.ts`,
  `eras/regency/pdf-form-fields.ts`, `eras/sheet-config.ts`,
  `hooks/useCharacter.ts`, `index.html`, `tests/regency.test.ts`, and
  `utils/date.ts`.
- Changes: added a Regency era scaffold with its own theme, decade data,
  wealth structure, Regency equipment and weapon tables, placeholder
  occupation/skill modules, classic PDF fallback, era ordering ahead of
  Campfire Tales, Regency-aware AI guidance, and a regression test covering
  the new manifest entry and gear data.
- Validation: `npx tsc --noEmit` passed; `npx -y markdownlint-cli2 --fix
  TODO.md` passed with 0 errors; `npm test` passed with 67 tests; `npm run
  build` passed with the existing Vite chunk-size warning.

## 2026-05-29 - AI Distribution prompt persistence

- Context: keep the submitted character description attached to AI
  Distribution results so reopening the review or loading a save restores the
  exact prompt that was analyzed.
- Files changed: `components/SkillsTab.tsx`, `hooks/useCharacter.ts`,
  `tests/saveLoadIntegration.test.ts`, `CHANGELOG.md`, and
  `DEVELOPMENT_LOG.md`.
- Changes: stored the submitted distribution prompt alongside the saved AI
  review state, restored the prompt into the modal textarea when a review is
  already populated, and added a save/load regression check for the persisted
  prompt text.
- Validation: `npx tsc --noEmit` passed; `npm test` passed with 63 tests.

## 2026-05-29 - TODO template reset

- Context: update the repository TODO file to match the shared defaults
  template rather than a project-specific queue dump.
- Files changed: `TODO.md` and `DEVELOPMENT_LOG.md`.
- Changes: replaced the custom TODO contents with the shared template
  structure from the defaults repo, keeping the format ready for the next
  epic.
- Validation: `npx -y markdownlint-cli2 --fix TODO.md` passed with 0 errors.

## 2026-05-29 - Reset TODO and plan for next epic

- Context: the Campfire Tales prompt queue is complete, and the repository is
  ready to accept a new epic without carrying over stale implementation tasks.
- Files changed: `TODO.md` and `DEVELOPMENT_PLAN.md`.
- Changes: removed the finished Campfire prompt queue, replaced it with a
  reusable next-epic TODO stub, and reset the development plan to a neutral
  landing zone for the next scoped feature cycle.
- Validation: documentation-only update; no runtime validation was run.

## 2026-05-29 - AI Distribution changelog separation

- Context: the 1.0.2 changelog grouped AI Distribution with Campfire Tales,
  but the feature is era-agnostic and belongs in the release notes as a
  separate cross-cutting addition.
- Files changed: `CHANGELOG.md` and `DEVELOPMENT_LOG.md`.
- Changes: removed AI Distribution from the Campfire Tales bullet list and
  added it back as its own release note entry describing the era-aware,
  specialization-aware workflow used across the app.
- Validation: documentation-only update; no runtime validation was run.

## 2026-05-29 - Restore non-Campfire 1.0.2 UX notes

- Context: the 1.0.2 changelog rewrite over-compressed unrelated UI/UX polish
  into the Campfire Tales launch story.
- Files changed: `CHANGELOG.md` and `DEVELOPMENT_LOG.md`.
- Changes: restored the general UI/UX bullets for wealth collapse behavior,
  specialization dropdown width, era-aware birthdate handling, and the shared
  skill label rename so 1.0.2 reflects both the new era and the broader app
  improvements.
- Validation: documentation-only update; no runtime validation was run.

## 2026-05-29 - Campfire Tales 1.0.2 changelog curation

- Context: reshape the 1.0.2 release notes so Campfire Tales reads like a full
  era launch rather than a sequence of incremental Campfire-specific changes.
- Files changed: `CHANGELOG.md` and `DEVELOPMENT_LOG.md`.
- Changes: rewrote the 1.0.2 release entry into a launch-style `Added`
  section with nested sub-bullets that present Campfire Tales as a complete
  scout-investigator era, and removed the Campfire-specific `Changed`
  narrative from that release block.
- Validation: documentation-only update; no runtime validation was run.

## 2026-05-29 - Changelog 1.0.2 curation and release metadata sync

- Context: align the repository's changelog workflow with the shared defaults
  overwrite-first guidance and promote the current unreleased user-facing
  story into a 1.0.2 release entry.
- Files changed: `AGENTS.md`, `CHANGELOG.md`, `RELEASE_CHECKLIST.md`,
  `GITHUB_MANAGEMENT.md`, `README.md`, `package.json`, and `package-lock.json`.
- Changes: rewrote the Unreleased changelog bullets into a curated 1.0.2
  section, updated the local operating contract and release checklist notes
  to mention overwrite-first changelog maintenance, and synced the visible
  version badge plus package metadata to 1.0.2.
- Validation: documentation-only update; no runtime validation was run.

## 2026-05-29 - UI polish and changelog sync

- Context: document the latest visible UI adjustments and keep the release
  notes aligned with the current app state.
- Files changed: `components/gear/WealthDisplay.tsx`,
  `components/skills/SkillRow.tsx`, `components/skills/skill-utils.ts`,
  `CHANGELOG.md`, and `DEVELOPMENT_LOG.md`.
- Changes: added a Hide/Show toggle to the Wealth card, widened
  specialization dropdowns so short options like Horse fill the row more
  consistently, renamed the shared skill group label to Physical & Movement,
  and documented those UI refinements in the changelog.

## 2026-05-29 - Bio birthdate and Campfire Scout Sheet AI polish

- Context: apply Bio feedback for era-aware birthdates, Campfire scout portrait
  ages, and per-field Scout Sheet generation.
- Files changed: `App.tsx`, `components/DossierTab.tsx`,
  `hooks/useAIGeneration.ts`, `hooks/useCharacter.ts`,
  `hooks/usePdfPrinting.ts`, `utils/date.ts`, `CHANGELOG.md`, and
  `DEVELOPMENT_LOG.md`.
- Changes: added a shared era reference-year helper, made automatic DOBs
  source-aware so selected age brackets and Scout Ranks can update DOB without
  overwriting manual edits, removed the 1900 lower bound from AI age
  derivation, passed Campfire scout ages into portrait prompts through DOB, and
  added inline AI-star generate buttons for Scout Sheet backstory fields.
- Decision: Classic 1920s and Campfire Tales use 1925 as the reference year,
  aligned with Chaosium's 1925 Masks of Nyarlathotep campaign anchor.
- Validation: `npx tsc --noEmit` passed in WSL; `cmd.exe /c npm test`
  passed with 54 tests; `cmd.exe /c npm run build` passed with the existing
  Vite large chunk warning.

## 2026-05-29 - Campfire Scout Sheet limits and PDF bug fixes

- Context: fix Bio feedback that Scout Sheet generated descriptions were too
  long, Campfire PDF age could show real-world age, and specialization parents
  could appear as duplicate custom skills.
- Files changed: `components/DossierTab.tsx`, `hooks/useAIGeneration.ts`,
  `hooks/usePdfPrinting.ts`, `prompts/prompt-data.ts`,
  `tests/campfire.test.ts`, `utils/campfire-sheet.ts`, `CHANGELOG.md`, and
  `DEVELOPMENT_LOG.md`.
- Changes: added tested Campfire sheet helpers for strict text truncation,
  era-relative age calculation, and custom skill filtering; capped short
  Scout Sheet/PDF background fields at 170 characters; capped Campfire Notes
  at 510 characters; changed physical-description prompt to 170 characters;
  and excluded fixed sheet skills plus specialization parent skills from
  Campfire custom PDF skill slots.
- Validation: `npx tsc --noEmit` passed in WSL; `cmd.exe /c npm test` passed
  with 57 tests; `cmd.exe /c npm run build` passed with the existing Vite
  large chunk warning.

## 2026-05-29 - Campfire Bio, wealth, AI Distribution, save/load polish

- Context: apply feedback for Bio ordering, Gear wealth initialization, Hobby
  Points card width, retained AI Distribution outcomes, Campfire save/load, and
  Badges tab completion.
- Files changed: `App.tsx`, `components/DossierTab.tsx`,
  `components/SkillsTab.tsx`, `components/skills/SkillsHeader.tsx`,
  `hooks/ai/useNameGeneration.ts`, `hooks/ai/usePortraitGeneration.ts`,
  `hooks/useAIGeneration.ts`, `hooks/useCharacter.ts`,
  `hooks/useSaveSystem.ts`, `tests/saveLoadIntegration.test.ts`, `types.ts`,
  `utils/save-data.ts`, `CHANGELOG.md`, and `DEVELOPMENT_LOG.md`.
- Changes: moved Expressive Portraits above Hobby Notes, retained AI
  Distribution reviews after close/apply until reset/reroll, added save/load
  serialization for AI Distribution and Set-backed fields, implemented
  character restore from save slots, initialized Campfire wealth from Family
  Credit Rating without requiring a hobby, restored centered Hobby Points width,
  and marked Badges complete once the additional ability badge quota is met.
- Validation: `npx tsc --noEmit` passed in WSL; `cmd.exe /c npm test` passed
  with 59 tests; `cmd.exe /c npm run build` passed with the existing Vite
  large chunk warning.

## 2026-05-29 - Campfire Tales rank, skill pool, AI, and PDF audit

- Context: apply Scout Rank, Skills, Badges, and Character Sheet feedback for
  the Campfire Tales rollout.
- Files changed: `App.tsx`, `components/BadgesTab.tsx`,
  `components/SkillsTab.tsx`, `components/StatsTab.tsx`,
  `components/skills/SkillsHeader.tsx`, `eras/campfire-tales/scout-rules.ts`,
  `hooks/useCharacter.ts`, `hooks/usePdfPrinting.ts`,
  `lib/ai/skill-distribution.ts`, `tests/campfire.test.ts`, and
  `tests/skill-distribution.test.ts`.
- Changes: changed Scout Rank selection to preserve hobby/skill state, added a
  warning modal before lowering below already-spent hobby points, removed the
  Campfire Personal Points UI/prompt pool, added era-specific AI Distribution
  payload guidance, locked hobby badges, added Keeper approval for lower rank
  badge exceptions, and wired Campfire PDF export for backstory, conditions,
  earned badges, and corrected derived stat formulas.
- Validation: `npx tsc --noEmit` passed in WSL; `cmd.exe /c npm test` passed
  with 54 tests; `cmd.exe /c npm run build` passed with the existing Vite
  large chunk warning.
- Follow-up risk: the Campfire PDF has Used badge fields, but the app now
  tracks earned badges only, so those sheet fields intentionally remain blank.

## 2026-05-29 - Campfire Tales Gear tab split fix

- Context: correct Campfire Tales equipment tabs after feedback that All
  Equipment was showing the price catalog.
- Files changed: `components/gear/GearTab.tsx`, `CHANGELOG.md`, and
  `DEVELOPMENT_LOG.md`.
- Changes: Campfire Gear now has three subtabs: Scout Equipment, All
  Equipment, and Prices. All Equipment uses the Classic 1920s equipment/weapon
  list, while Prices uses the Classic 1920s price catalog.
- Validation: `npx tsc --noEmit` and `cmd.exe /c npm run build` passed; build
  retains the existing Vite large chunk warning.

## 2026-05-29 - Campfire Tales badge rule polish

- Context: apply badge feedback for Campfire Tales and align the UI with the
  starting scout badge rules.
- Files changed: `components/BadgesTab.tsx`,
  `eras/campfire-tales/scout-rules.ts`, `hooks/useCharacter.ts`,
  `hooks/useSaveSystem.ts`, `tests/campfire.test.ts`, `types.ts`,
  `CHANGELOG.md`, and `TODO.md`.
- Changes: removed Used badge tracking, made rank badges a bounded selection
  up to the scout's current rank, added rank-based ability badge allowances
  from one to four badges, selected the hobby ability badge by default,
  surfaced ability badge skill increases in the description text, and added a
  regression guard for badge summary length.
- Validation: `npm test`, `npx tsc --noEmit`, and `npm run build` passed.
- Follow-up risk: full save load restoration is still broader save-system
  work; badge-specific advancement timing remains Keeper-managed UI state.

## 2026-05-29 - Campfire Tales badge page and equipment split

- Context: continue Prompt 4 and start Prompt 5 polish by separating scout
  badges from the Bio/Dossier page and making Campfire equipment clearer.
- Files changed: `App.tsx`, `components/BadgesTab.tsx`,
  `components/DossierTab.tsx`, `components/gear/GearTab.tsx`,
  `eras/campfire-tales/equipment-kits.ts`, `hooks/useCharacter.ts`,
  `hooks/useSaveSystem.ts`, `tests/campfire.test.ts`, `types.ts`, and
  `TODO.md`.
- Changes: added a Campfire-only Badges tab between Skills and Gear, moved
  badge UI out of Bio, added a full rank/ability badge board, supported
  optional earned ability badges after starting hobby badges, split Campfire
  equipment into Scout Equipment and All Equipment, and rebuilt scout kits
  around the Campfire item catalog.
- Validation: `npm test` and `npx tsc --noEmit` passed.
- Follow-up risk: badge-specific choice rules and print/export badge summaries
  still need Prompt 5 polish.

## 2026-05-29 - Campfire Tales Prompt 4 start

- Context: continue Campfire Tales from sheet-depth work into visual polish,
  badge clarity, and equipment support.
- Files changed: `index.html`, `components/DossierTab.tsx`,
  `components/gear/GearTab.tsx`, `eras/campfire-tales/prices-data.ts`,
  `eras/campfire-tales/equipment-kits.ts`, `eras/manifest.ts`,
  `tests/campfire.test.ts`, and `TODO.md`.
- Changes: added a distinct scout-handbook Campfire color theme, organized
  Distress and Adversity checkboxes into equal-width three-column rows,
  clarified badge tracking with Earned and Used boxes, added scout and
  badge-support equipment, surfaced Campfire scout gear in the Equipment tab,
  and kept inherited Classic 1920s/investigator-armoury price data available.
- Validation: focused `npm test -- tests/campfire.test.ts` and
  `npm run build` passed.
- Follow-up risk: badge rewards are currently starting-character state plus
  used-state tracking; scenario-earned badge management and badge-specific
  specialization choices still need a later Prompt 4/5 pass.

## 2026-05-29 - Campfire Tales Prompt 2 completion

- Context: close the remaining Campfire Tales V1 hardening items and start the
  sheet-depth work for scout investigators.
- Files changed: `components/DossierTab.tsx`, `hooks/useCharacter.ts`,
  `hooks/useSaveSystem.ts`, `lib/ai/skill-distribution.ts`, `types.ts`,
  `tests/campfire.test.ts`, `tests/skill-distribution.test.ts`, `TODO.md`,
  and `DEVELOPMENT_PLAN.md`.
- Changes: added selectable concrete ability badges for hobbies that grant
  "Ability Badge of Choice", added editable scout backstory fields, serialized
  scout badge/backstory state, included badges and backstory in AI
  Distribution analysis/distribution payloads, and added regression coverage
  for Campfire hobby choice integrity and Family Credit Rating floors.
- Validation: focused `npm test -- tests/campfire.test.ts
  tests/skill-distribution.test.ts` and `npx tsc --noEmit` passed.
- Follow-up risk: full load restoration remains a broader save-system issue,
  and Campfire-specific printable/export support still needs a future pass.

## 2026-05-29 - Campfire Tales feedback hardening

- Context: continue the Campfire Tales rollout after manual feedback from the
  running app.
- Files changed: `eras/manifest.ts`, `eras/campfire-tales/scout-rules.ts`,
  `hooks/useCharacter.ts`, `components/gear/WealthDisplay.tsx`, and
  `tests/campfire.test.ts`.
- Changes: moved Campfire Tales to the bottom of the era picker order, changed
  Scout Rank updates to reuse the existing 2D6 raw characteristic rolls, made
  Family Credit Rating default to Average on roll/reset, and wired equipment
  wealth display to Campfire's `Family Credit Rating` skill.
- Validation: `npm test`, `npx tsc --noEmit`, and `npm run build` passed.
- Follow-up risk: Campfire equipment wealth now reads the correct skill, but
  deeper kid-specific equipment assumptions and printable export support still
  need later V1 hardening.

## 2026-05-28 - OpenRouter provider support

- Context: add a real OpenRouter provider path so settings, model refresh, and
  AI generation can use OpenRouter instead of being locked to Gemini-only
  calls.
- Files changed: `context/AiSettingsContext.tsx`, `lib/ai/openrouter.ts`,
  `hooks/useAiRuntime.ts`, `hooks/ai/useNameGeneration.ts`,
  `hooks/ai/usePortraitGeneration.ts`, `hooks/ai/useBackstoryGeneration.ts`,
  `hooks/ai/useTraitsGeneration.ts`, `components/gear/GearTab.tsx`,
  `components/SettingsModal.tsx`, `App.tsx`, `vite.config.ts`, `.env.example`,
  `README.md`, `CHANGELOG.md`, `tests/setup.ts`, and `tests/openrouter.test.ts`.
- Validation: `npm run build`, `npm test`, and `npx -y markdownlint-cli2 --fix
  README.md CHANGELOG.md` all passed.
- Follow-up risk: OpenRouter model names and image-generation response shapes
  can change over time, so the refresh flow and parsing helpers may need
  adjustment if the provider updates its API.

## 2026-05-28 - Reorganize flat app modules

- Context: the repo root had accumulated a large set of flat data, config, and
  prompt modules that made the codebase harder to scan.
- Files changed: moved shared app data into `data/`, moved config modules into
  `config/`, moved prompt helpers into `prompts/`, moved `utils.ts` into
  `utils/index.ts`, moved `GearTab.tsx` into `components/gear/GearTab.tsx`,
  removed the unused root `ManageTab.tsx`, and rewired all affected imports.
- Validation: `npm run build` and `npm test` both passed.
- Follow-up risk: the app now has a more organized module tree, but future new
  flat files should be placed into the appropriate folder instead of the repo
  root.

## 2026-05-28 - Project docs baseline

- Context: bootstrap project-local development docs so future work can follow
  the shared defaults standards instead of relying on implicit conventions.
- Files changed: `AGENTS.md`, `TODO.md`, `DEVELOPMENT_PLAN.md`,
  `DEVELOPMENT_LOG.md`, `RELEASE_CHECKLIST.md`, `SECURITY.md`,
  `GITHUB_MANAGEMENT.md`, `HARD_PROBLEMS.md`, `SELF_REVIEW.md`,
  `DECISION_RECORD_TEMPLATE.md`, `CHANGELOG_TEMPLATE.md`, and `README.md`.
- Validation: `npx -y markdownlint-cli2 --fix AGENTS.md TODO.md
  DEVELOPMENT_PLAN.md DEVELOPMENT_LOG.md RELEASE_CHECKLIST.md SECURITY.md
  GITHUB_MANAGEMENT.md HARD_PROBLEMS.md SELF_REVIEW.md
  DECISION_RECORD_TEMPLATE.md CHANGELOG_TEMPLATE.md README.md` passed.
- Follow-up risk: the app docs may still need another pass once feature work
  reveals any missing runtime or release details.
