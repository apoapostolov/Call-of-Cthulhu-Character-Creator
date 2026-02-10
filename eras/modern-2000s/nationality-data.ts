import type { WeightedNationality } from '../../types';

// Early 2000s US demographics based on 2000 Census data
export const NATIONALITIES: WeightedNationality[] = [
  { name: 'White American (non-Hispanic)', weight: 69 },
  { name: 'Hispanic / Latino', weight: 13 },
  { name: 'African American', weight: 12 },
  { name: 'Asian American', weight: 4 },
  { name: 'Native American', weight: 1 },
  { name: 'Pacific Islander', weight: 0.2 },
  { name: 'Two or more races', weight: 0.8 },
];

