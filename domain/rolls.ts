/**
 * Pure characteristic roll + damage/build helpers for CoC 7e (and Campfire).
 * Extracted from useCharacter for testability and a thinner hook surface.
 */

export const roll3d6 = () =>
  Math.floor(Math.random() * 6) + 1
  + Math.floor(Math.random() * 6) + 1
  + Math.floor(Math.random() * 6) + 1;

export const roll2d6plus6 = () =>
  Math.floor(Math.random() * 6) + 1
  + Math.floor(Math.random() * 6) + 1
  + 6;

/** Pulp core characteristic roll: (1d6 + 13) × 5 */
export const roll1d6plus13x5 = () => (Math.floor(Math.random() * 6) + 1 + 13) * 5;

export const getDamageBonusAndBuild = (
  str: number,
  siz: number,
): { damageBonus: string; build: number } => {
  const total = str + siz;
  if (total <= 64) return { damageBonus: '-2', build: -2 };
  if (total <= 84) return { damageBonus: '-1', build: -1 };
  if (total <= 124) return { damageBonus: 'None', build: 0 };
  if (total <= 164) return { damageBonus: '+1D4', build: 1 };
  if (total <= 204) return { damageBonus: '+1D6', build: 2 };
  if (total <= 284) return { damageBonus: '+2D6', build: 3 };
  if (total <= 364) return { damageBonus: '+3D6', build: 4 };
  if (total <= 444) return { damageBonus: '+4D6', build: 5 };
  return { damageBonus: '+5D6', build: 6 };
};

export const getCampfireDamageBonusAndBuild = (
  str: number,
  siz: number,
): { damageBonus: string; build: number } => {
  const total = str + siz;
  if (total <= 64) return { damageBonus: '-2', build: -2 };
  if (total <= 84) return { damageBonus: '-1', build: -1 };
  if (total <= 124) return { damageBonus: 'None', build: 0 };
  return { damageBonus: '+1D4', build: 1 };
};
