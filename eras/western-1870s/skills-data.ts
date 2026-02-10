import type { Skill } from '../../types';

// Western 1870s: modified and new skills (inherited base is Classic 1920s)
export const SKILLS: Skill[] = [
  // Modified skills (provide full replacements so inheritance can exclude originals)
  {
    name: 'Drive Wagon/Coach',
    base: 20,
    description: 'Operate horse-drawn vehicles (wagons, stagecoaches, surreys, traps). Handling in rough terrain and managing teams; difficult maneuvers may require Hard rolls.',
  },
  {
    name: 'Electrical Repair',
    base: 0,
    description: 'Early electrical technology is unfamiliar to most in this era. Work on primitive installations; parts are scarce and improvisation is limited.',
  },
  {
    name: 'Natural World',
    base: 20,
    description: 'Practical knowledge of flora, fauna, weather, and land. People in this era are more familiar with the environment (tracks, forage, animals, crops).',
  },
  {
    name: 'Psychology',
    base: 10,
    description: 'Gauge intentions, stress, and mental state. In the Old West, crude counseling and calming techniques may apply; extended care can steady nerves or lessen phobias (Keeper discretion).',
  },
  {
    name: 'Language (Own)',
    base: 0, // Calculated as EDU%, kept placeholder; base is not used directly
    description: 'Literacy varies widely; below 30% virtually illiterate, 30–49% basic literacy, 50%+ competent. Reflects reading/writing in native tongue for this era.',
  },
  {
    name: 'Ride',
    base: 15,
    description: 'Use and control of horses. Mount, maneuver, and perform riding tasks common to the era; difficult stunts require Hard or Extreme rolls.',
  },

  // New skills
  {
    name: 'Gambling',
    base: 10,
    description: 'Win at cards, dice, and games of chance. Stakes depend on venue wealth (Average/Wealthy/Rich). Must risk appropriate cash to join; outcomes at Keeper discretion.',
  },
  {
    name: 'Language (Indian)',
    base: 1,
    specialty: true,
    description: 'Native American languages vary by tribe. Local tongues may allow Regular rolls; distant languages often require Hard rolls. Use specializations by tribe.',
  },
  {
    name: 'Rope Use',
    base: 5,
    description: 'Knot-tying and lassoing. Entangle targets (oppose with Dodge or Ride if mounted); pulling uses STR vs. STR. Breaking free may require Hard STR/DEX or cutting.',
  },
  {
    name: 'Trap',
    base: 10,
    description: 'Set snares and traps to catch game. Keeper sets scarcity; success yields a catch, failure nets nothing; difficulty increases with poor conditions.',
  },
];
