/**
 * Credit Rating overrides for 1920s occupations when used in Gaslight Era
 * Based on "Cthulhu by Gaslight Investigator's Guide"
 */

export interface CreditRatingOverride {
  /** The name of the occupation to override */
  occupationName: string;
  /** New minimum credit rating */
  min: number;
  /** New maximum credit rating */
  max: number;
}

/**
 * Credit rating adjustments for 1920s occupations in Gaslight Era
 * These occupations from the 1920s Investigator Handbook are suitable for Gaslight
 * but need adjusted credit ratings to reflect Victorian era economic conditions
 */
export const GASLIGHT_CREDIT_RATING_OVERRIDES: CreditRatingOverride[] = [
  // Working Class
  { occupationName: 'Actor', min: 9, max: 50 },
  { occupationName: 'Animal Trainer', min: 1, max: 15 },
  { occupationName: 'Asylum Attendant', min: 1, max: 9 },
  { occupationName: 'Bartender', min: 1, max: 9 },
  { occupationName: 'Pub Landlord', min: 10, max: 35 },
  { occupationName: 'Pub Landlady', min: 10, max: 35 },
  { occupationName: 'Boxer', min: 5, max: 20 },
  { occupationName: 'Wrestler', min: 5, max: 20 },
  { occupationName: 'Engineer', min: 15, max: 30 },
  { occupationName: 'Entertainer', min: 1, max: 50 },
  { occupationName: 'Farmer', min: 9, max: 30 },
  { occupationName: 'Hobo', min: 0, max: 5 },
  { occupationName: 'Tramp', min: 0, max: 5 },
  { occupationName: 'Hospital Orderly', min: 5, max: 9 },
  { occupationName: 'Mechanic', min: 9, max: 30 },
  { occupationName: 'Musician', min: 1, max: 50 },
  { occupationName: 'Nurse', min: 5, max: 15 },
  { occupationName: 'Sex Worker', min: 1, max: 15 },
  { occupationName: 'Sailor', min: 5, max: 15 },
  { occupationName: 'Salesperson', min: 5, max: 15 },
  
  // Middle Class
  { occupationName: 'Accountant', min: 20, max: 40 },
  // Note: Actor already covered above for working class variant
  { occupationName: 'Archaeologist', min: 10, max: 40 },
  { occupationName: 'Architect', min: 20, max: 50 },
  { occupationName: 'Big Game Hunter', min: 20, max: 50 },
  { occupationName: 'Book Dealer', min: 20, max: 40 },
  { occupationName: 'Editor', min: 10, max: 40 },
  { occupationName: 'Librarian', min: 5, max: 20 },
  { occupationName: 'Missionary', min: 1, max: 30 },
  { occupationName: 'Museum Curator', min: 9, max: 30 },
  // Note: Musician already covered above, middle class variant uses same range 9-50
  // Note: Nurse middle class variant
  { occupationName: 'Pharmacist', min: 20, max: 50 },
  { occupationName: 'Photographer', min: 9, max: 35 },
  { occupationName: 'Professor', min: 7, max: 50 },
  { occupationName: 'Teacher', min: 7, max: 20 },
  { occupationName: 'Governess', min: 7, max: 20 },
  { occupationName: 'Researcher', min: 9, max: 30 },
  { occupationName: 'Secretary', min: 5, max: 30 },
  { occupationName: 'Clerk', min: 5, max: 30 },
  { occupationName: 'Student', min: 5, max: 60 }
];

/**
 * Helper function to find credit rating override for an occupation
 */
export function getCreditRatingOverride(occupationName: string): CreditRatingOverride | undefined {
  return GASLIGHT_CREDIT_RATING_OVERRIDES.find(override => 
    override.occupationName.toLowerCase() === occupationName.toLowerCase()
  );
}