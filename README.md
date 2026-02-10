# Call of Cthulhu Character Creator (The New Dhole's House)

An interactive, React-based tool that fills the Call of Cthulhu 7e Classic 1920s character sheet PDF. It supports AI-assisted identity and portrait generation, specialized skill mapping, gear blocks, and one-click PDF export with correct field layouts.

This is an unofficial fan project, not affiliated with Chaosium Inc. All trademarks and copyrights are their own.

## Badges

![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Node](https://img.shields.io/badge/node-18%2B-339933)
![Vite](https://img.shields.io/badge/vite-6.x-646CFF)
![TypeScript](https://img.shields.io/badge/typescript-5.x-3178C6)
![React](https://img.shields.io/badge/react-18.x-61DAFB)

## Features

- PDF fill for Classic 1920s sheet, including multi-line text alignment and correct field appearances
- Specialized skills supported and mapped to dedicated PDF fields:
  - Art/Craft (top 2), Language (Other) (up to 3), Science (up to 3), Pilot (1), Survival (1)
  - Fighting specializations (2) excluding Brawl
  - Firearms: Handguns, Rifles/Shotguns, plus one extra specialization slot
- Gear/Possessions columns rendered into editable fields with controlled line spacing
- Identity integration:
  - Gender feeds the Pronouns field as "Male", "Female", or empty
  - Occupation and Age (calculated from Date of Birth) populate the corresponding PDF fields
  - Age bracket selection can auto-generate a plausible Date of Birth for the chosen era
- Cash and Assets totals printed to `Cash` and `Assets1`
- Portrait embedding via PDF button field with explicit priority:
  - Explicitly selected image > headshot crop > full-body portrait > none
- Optional AI-assisted details (name, traits, portrait, backstory) via Google Gemini

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & Run (Dev)

```bash
npm install
npm run dev
```

### Build (Production)

```bash
npm install
npm run build
npm run preview
```

## Character Sheet

This repo includes the Classic 1920s sheet at `public/sheet/coc1920s.pdf`. Production builds copy it to `dist/sheet/coc1920s.pdf`.

You can switch between internal, external, and self-hosted PDF sources in the in-app Settings menu.

## Environment Variables

AI features require a Google Gemini API key (optional).

- Copy `.env.example` to `.env`
- Set `VITE_GEMINI_API_KEY` (or `GEMINI_API_KEY`) to your key

```bash
cp .env.example .env
```

If you do not set a key, the app will still work; AI features will be disabled.

## Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview the production build
- `npm test` - run tests

## Legal

Content is provided for personal, non-commercial use in tabletop role-playing games.

## License

MIT. See `LICENSE`.
