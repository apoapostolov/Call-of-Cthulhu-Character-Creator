import type { WeightedNationality } from '../../types';

// Late Victorian England (1890s) demographics and British Empire
export const NATIONALITIES: WeightedNationality[] = [
  { name: 'English', weight: 75 },
  { name: 'Scottish', weight: 10 },
  { name: 'Irish', weight: 8 },
  { name: 'Welsh', weight: 5 },
  // British colonies and territories by prominence
  { name: 'Indian (British Raj)', weight: 8 },
  { name: 'Canadian', weight: 3 },
  { name: 'Australian', weight: 2 },
  { name: 'South African', weight: 2 },
  { name: 'New Zealander', weight: 1 },
  { name: 'Egyptian', weight: 1 },
  { name: 'West Indian', weight: 1 },
  { name: 'Burmese', weight: 1 },
  { name: 'Ceylonese (Sri Lankan)', weight: 1 },
  { name: 'Malayan', weight: 1 },
  { name: 'Hong Kong Chinese', weight: 1 },
  { name: 'Singaporean', weight: 1 },
  { name: 'Nigerian', weight: 0.5 },
  { name: 'Kenyan', weight: 0.5 },
];

