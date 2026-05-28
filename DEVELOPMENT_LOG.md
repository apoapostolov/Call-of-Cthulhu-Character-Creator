# DEVELOPMENT LOG

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
