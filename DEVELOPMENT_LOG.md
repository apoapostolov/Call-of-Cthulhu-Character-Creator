# DEVELOPMENT LOG

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
- Validation: `npx tsc --noEmit` and `cmd.exe /c npm run build` passed; build retains the existing Vite large chunk warning.

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
