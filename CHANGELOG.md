# Changelog

All notable changes to this project will be documented in this file.
<!-- markdownlint-disable MD024 -->

## [Unreleased]

### Added

- Campfire Tales scout support for selectable ability badges, editable scout
  backstory notes, and AI Distribution context for badges, Family Credit, and
  scout home life.
- Inline AI generation buttons for Campfire Tales Scout Sheet text fields,
  including hobby-aware home, trusted adult, obligations, fears, and campfire
  tale prompts.
- Campfire Tales scout and badge equipment in inherited 1920s equipment lists
  and quick kits.
- A Campfire-only Badges tab with rank badges, all ability badges, starting
  hobby badge defaults, rank-based ability badge allowances, and earned badge
  tracking.

### Changed

- Wealth now has a compact Hide/Show toggle in the upper-right corner so the
  detailed cash and assets rows can collapse while keeping the wealth tier
  summary visible.
- Specialization dropdowns now stretch to a consistent width within the skill
  row, so short options like Horse no longer render as tiny controls.
- The shared skill group label changed from Physical & Locomotion to Physical
  & Movement across all eras.
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
- Campfire Tales rank changes now preserve selected hobbies and other tab
  state, warn before lowering below already-spent hobby points, hide the
  unavailable Personal Points pool, and use Campfire-specific AI Distribution
  payloads without Personal points.
- Campfire Tales badge advancement now locks the hobby badge, counts only
  additional rank-granted ability badges, and asks for Keeper approval before
  selecting a lower rank badge than the scout's current rank.
- Campfire Tales PDF export now fills scout backstory, distress/adversity,
  earned badges, and corrected kid-scale derived stat mappings.
- Campfire Tales Gear now separates Scout Equipment, All Equipment, and Prices
  so the inherited 1920s equipment and price catalogs are distinct.
- Character birthdates now use era-appropriate reference years and selected
  age/rank brackets, so Campfire portrait generation sees scout ages instead
  of generic adult defaults.
- Campfire Tales Scout Sheet generation and PDF export now strictly cap short
  background fields at 170 characters, allow Campfire Notes up to 510
  characters, calculate scout age against the era year, and avoid duplicating
  specialization parent skills in custom PDF skill slots.
- Expressive Portraits now appear above Hobby Notes in Bio, Campfire wealth can
  initialize from rolled Family Credit Rating before hobby selection, the
  centered Hobby Points card keeps the normal pool-card width, AI Distribution
  reviews remain available after closing/applying, Campfire saves restore full
  era state, and Badges completion reflects the additional badge quota.

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
