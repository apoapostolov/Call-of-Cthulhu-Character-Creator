import type { WeightedNationality } from '../../types';

// 1870s Wild West US demographics - immigrants and settlers
export const NATIONALITIES: WeightedNationality[] = [
  { name: 'American (native-born white)', weight: 35 },
  { name: 'German immigrant', weight: 18 },
  { name: 'Irish immigrant', weight: 15 },
  { name: 'English immigrant', weight: 10 },
  { name: 'African American (freedman)', weight: 8 },
  { name: 'Chinese immigrant', weight: 5 },
  { name: 'Mexican/Tejano', weight: 4 },
  { name: 'Scandinavian immigrant', weight: 3 },
  { name: 'Italian immigrant', weight: 2 },
  // Native American tribes - most prominent in the West, sorted after other nationalities
  { name: 'Lakota Sioux', weight: 3 },
  { name: 'Cheyenne', weight: 2 },
  { name: 'Apache', weight: 2 },
  { name: 'Comanche', weight: 2 },
  { name: 'Navajo', weight: 2 },
  { name: 'Crow', weight: 1 },
  { name: 'Pawnee', weight: 1 },
  { name: 'Shoshone', weight: 1 },
];

