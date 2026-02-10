import type { ExperiencePackage } from '../../types';

export const EXPERIENCE_PACKAGES: ExperiencePackage[] = [
  {
    name: 'Civil War Experience',
    description:
      'Veteran of the American Civil War (1861–1865). Hardened by combat and privation; carries physical and psychological scars from the conflict.',
    modifies: {
      // Declarative hints for consumers; actual application is handled in app logic
      derived: { SAN: '-(1D10+5)' },
      dob: 'adjust:civil-war-veteran',
      notes: [
        {
          name: 'War Trauma',
          description:
            'Add an Injury/Scar or a Phobia/Mania associated with the war (e.g., alcoholism, disfigurement, Ballistophobia, Ligyrophobia, Pyrophobia, Hoplomania, Pyromania).',
          source: 'Civil War Experience',
        },
        {
          name: 'Battle Hardened',
          description:
            'Immune to sanity losses from viewing a corpse or gross injury. Keeper may still apply other SAN losses as normal.',
          source: 'Civil War Experience',
        },
      ],
    },
    experiencePoints: {
      total: 70,
      eligibleSkills: [
        'Climb', 'Jump', 'Fighting (Brawl)', 'Fighting (Sword)', 'Firearms (Rifle/Shotgun)',
        'First Aid', 'Listen', 'Stealth', 'Survival', 'Throw'
      ],
    },
  },
];

