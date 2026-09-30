# Changelog

All notable changes to this project will be documented in this file.
<!-- markdownlint-disable MD024 -->

## [Unreleased]

## [1.1.0] - 2026-07-27

Investigator creation asks less of your browser and gives you more choice
about which AI provider handles each optional task.

### Added

- Choose a provider and model separately for creative writing, short text,
  vision, and images. Settings remember each provider's key when you switch.
- Z.ai GLM Coding Plan and xAI Grok join the available providers. SuperGrok
  can use device-code sign-in when the local OAuth proxy is available.

### Changed

- Era data, model catalogs, and print tools load when you need them, so the
  first visit is lighter and skill allocation stays responsive.
- Character saves can be imported from a file or the clipboard and exported
  as downloadable JSON. Load errors are shown instead of failing silently.
- Older Western-era saves migrate to the current era identifier.

### For local hosts

SuperGrok device-code sign-in needs the OAuth proxy used by `npm run dev`.
See the [AI setup notes](docs/SHARED_AI_PROVIDERS_ZHIPU_GROK.md) for provider
keys and static-host requirements.

## [1.0.3] - 2026-05-30

### Added

- Regency Cthulhu now appears in the era picker as a full Regency England
  era, with a distinct period skin, Regency reference-year handling,
  Regency equipment and weapon tables, and a complete manifest/data pathway
  for the era's occupations and skills.
  - Use Regency's landed-gentry social structure, servant careers, and hobby-
    styled occupations with period-aware credit ranges.
  - Build characters from the Regency skill list, including Driving Carriage/
    Cart, Astronomy, Etiquette, Fashion, Gaming, Mesmerism, Natural
    Philosophy, Reassure, Religion, and the era's limited specialization
    families.
  - Play with Regency-era flat Ride, Pilot (Boat), and other skill
    adjustments that replace Classic 1920s assumptions.
  - Shop from a Regency price list written in period currency, using pounds,
    shillings, pence, and guineas instead of the Classic 1920s dollar catalog.
  - Equip Regency investigators with class-aware kits, including separate
    high-society gentleman and gentlewoman loadouts alongside country and
    household archetypes.

### Fixed

- AI Distribution now keeps the submitted character description with the saved
  review and restores it when you reopen the modal or load a saved character.

## [1.0.2] - 2026-05-29

### Added

- Campfire Tales arrives as a full 1920s youth-scout era for Call of Cthulhu,
  letting you play scout-investigators in Westhaven and take them all the way
  from childhood adventures into adulthood-ready investigators.
  - Build young investigators with scout ranks, era-aware age handling, and
    scout-specific characteristic rules.
  - Use Campfire-specific concepts like Cool, Family Credit Rating, Distress,
    Adversity, scout home life, and hobby-driven point allocation.
  - Choose hobbies, rank badges, and ability badges, with badge rewards and
    restrictions tailored to scout play.
  - Equip scout-investigators with Campfire gear, scout kits, and inherited
    1920s catalog support for broader campaign equipment.
  - Track scout-specific backstory fields, trusted adults, obligations, fears,
    and campfire tale hooks alongside the Bio sheet.
  - Export the Campfire Tales sheet with scout badges, conditions, derived
    stats, and the specialized PDF field mapping the era requires.
- A new era-agnostic AI Distribution workflow that analyzes a freeform
  character description and recommends skill allocation using the active
  era's rules, including support for specialization-aware families and
  saved results.

### Changed

- Wealth now collapses into a compact Show/Hide drawer while keeping the
  wealth tier summary visible, specialization dropdowns stretch consistently,
  and the shared skill group label reads Physical & Movement across all eras.
- Character birthdates now use era-appropriate reference years and selected
  age/rank brackets, so portrait generation sees age-appropriate values
  instead of generic adult defaults.

## [1.0.1] - 2026-05-28

### Added

- Provider-aware AI settings with separate API keys and model lists for
  OpenRouter, Gemini, OpenCode Go, and DeepSeek.
- Searchable model dropdowns with refresh support and provider-specific
  defaults for writing, vision, and image generation.
- AI Distribution for skill point allocation from a freeform character description.

### Changed

- Skill distribution now favors specialization entries over parent skills and
  spreads points more evenly across useful adventurer skills.
- AI key handling now prefers browser-saved keys and user-managed environment
  keys instead of hardcoded defaults.

## [1.0.0] - 2026-02-10

### Added

- Classic 1920s (Call of Cthulhu 7e) character creation workflow.
- Internal sheet support via `public/sheets/coc1920s.pdf`.
- PDF export with correct field mapping, multiline handling, and portrait embedding.
- Specialized skill packing for common CoC skill families (Language,
  Art/Craft, Science, Fighting, Firearms).
- Optional AI-assisted details via Google Gemini (names, traits, portraits, backstories).

### Changed

- Distribution package metadata aligned for public release (repo
  name/version and deterministic dependency pinning).
