# Changelog

All notable changes to this project will be documented in this file.
<!-- markdownlint-disable MD024 -->

## [Unreleased]

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
