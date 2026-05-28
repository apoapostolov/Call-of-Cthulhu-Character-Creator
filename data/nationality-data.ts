// nationality-data.ts
import type { WeightedNationality } from './types';

// Weights are based on the approximate demographic and ancestry distribution of the United States circa 2020.
// This provides a more representative random selection for a US-based Delta Green setting.
export const NATIONALITIES: WeightedNationality[] = [
    { name: 'Hispanic American', weight: 18 },
    { name: 'American (German)', weight: 13 },
    { name: 'African American', weight: 13 },
    { name: 'American (Irish)', weight: 10 },
    { name: 'American (English/British)', weight: 8 },
    { name: 'Asian American', weight: 6 },
    { name: 'American (Italian)', weight: 5 },
    { name: 'American (Eastern European)', weight: 5 }, // e.g., Polish, Russian
    { name: 'American (French/Canadian)', weight: 3 },
    { name: 'Native American', weight: 1 },
    { name: 'Middle Eastern American', weight: 1 },
    { name: 'American (Unspecified/Mixed)', weight: 17 }, // Represents those who identify as "American" or have mixed heritage
];
