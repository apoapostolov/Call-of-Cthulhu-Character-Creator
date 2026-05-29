import type { Skill } from '../../types';
import { SKILLS as CLASSIC_SKILLS } from '../classic-1920s/skills-data';

const scoutOverrides: Record<string, Partial<Skill>> = {
  'Credit Rating': {
    name: 'Family Credit Rating',
    base: 25,
    description: 'The scout-investigator family affluence, home life, and likely possessions.',
  },
  'Drive Auto': {
    base: 10,
    description: 'Operate an automobile only when age and story circumstances make it appropriate.',
  },
  Firearms: {
    base: 10,
    description: 'Use firearms, with scout investigators beginning at half normal base values.',
  },
  Medicine: {
    base: 1,
    description: 'Adult medical training, normally available only with Keeper permission.',
  },
  'Operate Heavy Machinery': {
    base: 1,
    description: 'Operate adult industrial equipment, normally only with Keeper permission.',
  },
  Psychoanalysis: {
    base: 1,
    description: 'Adult therapeutic care, normally only with Keeper permission.',
  },
};

export const SKILLS: Skill[] = [
  ...CLASSIC_SKILLS
    .filter(skill => skill.name !== 'Credit Rating')
    .map(skill => ({ ...skill, ...(scoutOverrides[skill.name] || {}) })),
  {
    name: 'Family Credit Rating',
    base: 25,
    description: 'The scout-investigator family affluence, home life, and likely possessions.',
  },
  {
    name: 'Reassure',
    base: 0,
    description: 'Calm and comfort someone else. Base is one-fifth APP; it can erase one Distress check once per scenario.',
  },
  {
    name: 'Language (Signals)',
    base: 1,
    description: 'Semaphore and Morse code for communicating across distance or barriers.',
  },
  {
    name: 'Ride (Bicycle)',
    base: 20,
    description: 'Ride, maneuver, pursue, or escape on a bicycle.',
  },
];

