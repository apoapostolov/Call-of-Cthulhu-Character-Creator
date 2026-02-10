// nationality-data.ts
import type { WeightedNationality } from '../../types';

// Approximate 1920s US ancestry/demographic distribution (weights sum to ~100)
export const NATIONALITIES: WeightedNationality[] = [
  { name: 'American (English/British ancestry)', weight: 24 },
  { name: 'American (German ancestry)', weight: 21 },
  { name: 'American (Irish ancestry)', weight: 12 },
  { name: 'American (Italian ancestry)', weight: 6 },
  { name: 'American (Eastern European ancestry)', weight: 6 }, // Polish, Russian, Baltic, etc.
  { name: 'American (Scandinavian ancestry)', weight: 5 }, // Swedish, Norwegian, Danish
  { name: 'American (Scottish ancestry)', weight: 3 },
  { name: 'American (French/Canadian ancestry)', weight: 3 },
  { name: 'American (Dutch ancestry)', weight: 2 },
  { name: 'American (Central European ancestry)', weight: 3 }, // Austrian, Hungarian, Czech/Slovak
  { name: 'African American', weight: 10 },
  { name: 'Mexican American', weight: 1 },
  { name: 'Asian American', weight: 1 },
  { name: 'Native American', weight: 1 },
  { name: 'American (Unspecified/Mixed)', weight: 2 },
];
