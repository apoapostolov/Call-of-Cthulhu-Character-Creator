# Changelog

All notable changes to this project will be documented in this file.
<!-- markdownlint-disable MD024 -->

## [Unreleased]

### Added

- Campfire Tales scout support for selectable ability badges, editable scout
  backstory notes, and AI Distribution context for badges, Family Credit, and
  scout home life.
- Campfire Tales scout and badge equipment in inherited 1920s equipment lists
  and quick kits.
- A Campfire-only Badges tab with rank badges, all ability badges, starting
  hobby badge defaults, rank-based ability badge allowances, and earned badge
  tracking.

### Changed

- Campfire Tales rank changes now reuse the existing characteristic dice
  instead of rerolling attributes, and equipment wealth now reads Family Credit
  Rating.
- Campfire Tales now has its own scout-handbook color theme, plus clearer
  Distress, Adversity, and badge tracking layouts.
- Campfire Tales navigation now inserts Badges as step 3, making Gear step 4
  and Bio step 5, and its equipment list is split into Scout Equipment and All
  Equipment.
- Campfire Tales badge cards now include skill increases in the description
  text, remove used-state tracking, and keep summaries visually balanced.

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
