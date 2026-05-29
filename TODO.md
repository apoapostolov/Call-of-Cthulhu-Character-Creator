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

### [x] Prompt 2 - Campfire Tales V1 hardening

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
- serialize scout-specific state for saves and exports
- improve AI Distribution prompts with badge, Family Credit, and scout
  backstory context

Completed on 2026-05-29:

- Campfire Tales appears at the bottom of the era list.
- Scout Rank changes reuse the already-rolled raw characteristic dice.
- Family Credit Rating defaults to Average.
- Equipment wealth reads Family Credit Rating.
- Ability Badge of Choice hobbies can choose concrete badges.
- Scout backstory fields are editable and included in AI Distribution payloads.
- Campfire hobby choice groups have regression coverage.

### [ ] Prompt 3 - Campfire Tales sheet depth

Continue the Campfire Tales implementation after Prompt 2 hardening.

Context:

- Scout characteristics, rank points, Family Credit Rating, Cool, badges, and
  backstory fields are now represented in app state
- Ability Badge of Choice is selectable in the Dossier tab and serialized in
  saves/exports
- AI Distribution receives scout backstory, badge, trusted adult, obligation,
  and Family Credit context

Next prompts:

- add richer badge selection for hobbies that grant multiple ability badge
  options or future badge rewards
- make Home, Trusted Adult, Obligations, Fears, and Campfire Notes visible in
  export-facing summaries
- add a Campfire-specific printable/export sheet path when available
- add manual load restoration for scout-specific state if full character
  restoration is implemented later
- audit skill specializations for scout-era parents such as Survival, Pilot,
  Language, Science, Fighting, and Firearms

Validation:

- `npm test`
- `npm run build`
- smoke select `Campfire Tales`, roll a Wanderer, choose a hobby, allocate
  points, inspect Dossier scout panel, and run AI Distribution

### [ ] Prompt 4 - Campfire Tales equipment and badge polish

Continue the Campfire Tales implementation after sheet-depth basics.

Context:

- Campfire Tales now has a distinct scout handbook color theme
- The Badges tab tracks earned badges only, with rank-based ability badge
  allowances
- Distress and Adversity boxes are organized in equal-width rows
- Campfire equipment inherits Classic 1920s/investigator-armoury homebrew
  prices and adds scout/badge gear
- The Equipment tab surfaces scout gear directly for Campfire Tales

Next prompts:

- refine advancement copy for when Keeper-approved scenario-earned ability
  badges are added after character creation
- add optional badge-specific specialization choices for badges like Crafting,
  Public Speaking, Reading, and Survival-style badges where the printed rules
  allow player choice
- consider save/load restoration for selected rank badge and selected ability
  badges when the broader save restoration flow is implemented
- connect badge rewards to a future Scout-Investigator Development Phase flow
- review all scout equipment kit names against the final Campfire item catalog
- consider a compact badge/equipment cross-reference in the Gear tab

Completed on 2026-05-29:

- moved badge management out of Bio and into a Campfire-only Badges tab
- changed Campfire tab ordering to Characteristics, Skills, Badges, Gear, Bio
- added a full badge board for rank and ability badges
- kept rank and hobby starting badges rules-driven by default
- allowed optional earned ability badges to be selected and deselected for
  scenario/development rewards
- split Campfire equipment into Scout Equipment and All Equipment
- rebuilt Campfire kits around scout-book gear and added regression coverage
  ensuring kits reference available item names

### [ ] Prompt 5 - Campfire Tales polish and export readiness

Continue Campfire Tales implementation after the badge/equipment page split.

Context:

- Badges now have a dedicated Campfire-only page
- Scout Equipment lists scout-book gear, while All Equipment exposes Classic
  1920s inherited equipment
- Campfire kits are now built from scout equipment rather than only inherited
  investigator-armoury prices

Next prompts:

- add badge-specific choice handling for Crafting, Public Speaking, Reading,
  Camping/Fishing/Hiking/Wilderness Survival, and other specialty badges
- make badge state visible in print/export summaries
- add a Campfire printable sheet mapping if a dedicated sheet becomes
  available
- polish mobile navigation with five Campfire tabs
- smoke-test the full Campfire flow from rank, hobby, badges, skills, gear,
  and bio through export

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
