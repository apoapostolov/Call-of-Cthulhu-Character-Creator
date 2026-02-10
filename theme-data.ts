import type { ThemeConfig } from './types';

// Single theme definition used by AI prompts; keyed as 'delta-green' for compatibility
// but configured for Call of Cthulhu investigative cosmic horror across eras.
export const THEMES: Record<string, ThemeConfig> = {
  'delta-green': {
    displayName: 'Call of Cthulhu',
    themeClass: 'theme-cthulhu',
    portrait: {
      theme: 'Lovecraftian investigations, cosmic horror, forbidden knowledge, occult rituals',
      setting: 'dusty archives, rain-soaked New England streets, decaying mansions, lonely coastlines, claustrophobic basements',
      atmosphere: 'tense, foreboding, and uncanny—a creeping dread suggesting unseen forces and fragile sanity',
      visualStyle: 'Moody, film-noir inspired painting with subdued palette; dramatic chiaroscuro; subtle film grain; period textures and props',
      additionalDetails: "Investigators wear era-appropriate attire (e.g., 1920s suits, trench coats, practical workwear). Include subtle clues—tattered tomes, strange symbols, seawater stains, candle wax, or unsettling curios. Faces hint at sleepless nights and mounting fear.",
    },
    name: {
      promptDescription: 'for an investigator in a tense, supernatural mystery setting (Call of Cthulhu style).'
    },
  },
};
