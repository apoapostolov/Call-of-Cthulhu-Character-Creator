import { describe, expect, it } from 'vitest';
import {
  getCampfireDamageBonusAndBuild,
  getDamageBonusAndBuild,
  roll2d6plus6,
  roll3d6,
} from '../domain/rolls';
import { deriveMinimumCreditRating } from '../domain/skill-distribution-profile';
import type { Occupation } from '../types';

describe('domain/rolls', () => {
  it('rolls classic dice bands', () => {
    for (let i = 0; i < 20; i++) {
      const a = roll3d6();
      const b = roll2d6plus6();
      expect(a).toBeGreaterThanOrEqual(3);
      expect(a).toBeLessThanOrEqual(18);
      expect(b).toBeGreaterThanOrEqual(8);
      expect(b).toBeLessThanOrEqual(18);
    }
  });

  it('maps STR+SIZ totals to damage bonus and build', () => {
    expect(getDamageBonusAndBuild(40, 40)).toEqual({ damageBonus: '-1', build: -1 });
    expect(getDamageBonusAndBuild(50, 50)).toEqual({ damageBonus: 'None', build: 0 });
    expect(getDamageBonusAndBuild(70, 70)).toEqual({ damageBonus: '+1D4', build: 1 });
  });

  it('caps Campfire damage bonus at +1D4', () => {
    expect(getCampfireDamageBonusAndBuild(90, 90)).toEqual({ damageBonus: '+1D4', build: 1 });
  });
});

describe('domain/skill-distribution-profile', () => {
  const baseOccupation = {
    name: 'Professor',
    group: 'Academic',
    description: 'A respectable academic',
    creditRatingRange: { min: 20, max: 70 },
  } as Occupation;

  it('raises minimum Credit Rating for wealthy descriptions', () => {
    const floor = deriveMinimumCreditRating(baseOccupation, 'A wealthy industrialist heir');
    expect(floor).toBeGreaterThanOrEqual(35);
    expect(floor).toBeLessThanOrEqual(70);
  });

  it('stays near occupation floor for struggling laborers', () => {
    const laborer = {
      ...baseOccupation,
      name: 'Laborer',
      group: 'Manual Labor',
      creditRatingRange: { min: 9, max: 30 },
    } as Occupation;
    const floor = deriveMinimumCreditRating(laborer, 'A poor struggling tenant farmer');
    expect(floor).toBeGreaterThanOrEqual(9);
    expect(floor).toBeLessThanOrEqual(20);
  });
});
