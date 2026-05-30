import type { Skill } from '../../types';
import { SKILLS as CLASSIC_SKILLS } from '../classic-1920s/skills-data';

const excluded = new Set([
  'Computer Use',
  'Drive Auto',
  'Electrical Repair',
  'Electronics',
  'Hypnosis',
  'Operate Heavy Machinery',
  'Pilot',
  'Psychoanalysis',
  'Ride',
  'Science',
]);

const overriddenDescriptions: Record<string, Partial<Skill>> = {
  Dancing: {
    base: 0,
    description: 'Move gracefully and impressively in Regency society. Base value is DEX/5.',
  },
  'Drive Carriage/Cart': {
    name: 'Drive Carriage/Cart',
    base: 20,
    description: 'Drive horse-drawn transport of all kinds, from carts to coaches.',
  },
  Etiquette: {
    base: 0,
    description: 'Know the proper forms of address, social expectations, and polite behavior. Base value is INT/5.',
  },
  Fashion: {
    base: 10,
    description: "Know the season's styles and how to dress for the occasion.",
  },
  Gaming: {
    base: 10,
    description: 'Play Regency card games and understand betting, bluffing, and table etiquette.',
  },
  Mesmerism: {
    base: 1,
    description: 'Induce trance, suggestibility, and mental calm by force of personality and will.',
  },
  'Natural Philosophy': {
    name: 'Natural Philosophy',
    base: 1,
    description: 'Study the natural world through observation, reasoning, and period science.',
  },
  Reassure: {
    base: 0,
    description: 'Comfort and steady another character through calm speech and humane attention. Base value is APP/5.',
  },
  Religion: {
    base: 10,
    description: 'Understand doctrine, practice, and theological tradition in a Regency context.',
  },
  Ride: {
    base: 5,
    specialty: false,
    description: 'Ride and control a horse or other mount. In Regency, this is a flat skill rather than a specialization.',
  },
  'Pilot (Boat)': {
    name: 'Pilot (Boat)',
    base: 1,
    specialty: false,
    description: 'Operate small boats and river craft. This is the only common Pilot skill available in Regency.',
  },
};

const additions: Skill[] = [
  {
    name: 'Astronomy',
    base: 1,
    description: 'Study the heavens for navigation, observation, and a little astrology or meteorology.',
  },
  {
    name: 'Dancing',
    base: 0,
    description: 'Move gracefully and impressively in Regency society. Base value is DEX/5.',
  },
  {
    name: 'Drive Carriage/Cart',
    base: 20,
    description: 'Drive horse-drawn transport of all kinds, from carts to coaches.',
  },
  {
    name: 'Etiquette',
    base: 0,
    description: 'Know the proper forms of address, social expectations, and polite behavior. Base value is INT/5.',
  },
  {
    name: 'Fashion',
    base: 10,
    description: "Know the season's styles and how to dress for the occasion.",
  },
  {
    name: 'Gaming',
    base: 10,
    description: 'Play Regency card games and understand betting, bluffing, and table etiquette.',
  },
  {
    name: 'Mesmerism',
    base: 1,
    description: 'Induce trance, suggestibility, and mental calm by force of personality and will.',
  },
  {
    name: 'Natural Philosophy',
    base: 1,
    description: 'Study the natural world through observation, reasoning, and period science.',
  },
  {
    name: 'Pilot (Boat)',
    base: 1,
    specialty: false,
    description: 'Operate small boats and river craft. This is the only common Pilot skill available in Regency.',
  },
  {
    name: 'Reassure',
    base: 0,
    description: 'Comfort and steady another character through calm speech and humane attention. Base value is APP/5.',
  },
  {
    name: 'Religion',
    base: 10,
    description: 'Understand doctrine, practice, and theological tradition in a Regency context.',
  },
  {
    name: 'Ride',
    base: 5,
    specialty: false,
    description: 'Ride and control a horse or other mount. In Regency, this is a flat skill rather than a specialization.',
  },
  {
    name: 'Animal Handling',
    base: 5,
    description: 'Work with horses, livestock, and other animals common in a pre-automotive society.',
  },
  {
    name: 'Artillery',
    base: 1,
    specialty: true,
    description: 'Operate cannon and battlefield ordnance. Rare, but available to military characters.',
  },
  {
    name: 'Demolitions',
    base: 1,
    description: 'Handle explosives and controlled destruction. Still rare, but possible in Regency settings.',
  },
  {
    name: 'Read Lips',
    base: 1,
    description: 'Decipher a conversation by watching lips and body language from a distance.',
  },
  {
    name: 'Lore',
    base: 1,
    specialty: true,
    description: 'Specialized knowledge about a place, household, or subject relevant to a Regency character.',
  },
];

export const SKILLS: Skill[] = [
  ...CLASSIC_SKILLS
    .filter((skill) => !excluded.has(skill.name))
    .map((skill) => {
      const override = overriddenDescriptions[skill.name];
      if (!override) return skill;
      return { ...skill, ...override };
    }),
  ...additions,
].sort((a, b) => a.name.localeCompare(b.name));
