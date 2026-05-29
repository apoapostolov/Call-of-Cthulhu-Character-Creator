import type { AttributeSet, AgeCategory } from '../../types';

export type ScoutRankId = '11-12' | '13-14' | '15-16' | '17-18';
export type FamilyCreditStatus = 'Penniless' | 'Poor' | 'Average' | 'Wealthy' | 'Rich';

export interface ScoutRankConfig {
  id: ScoutRankId;
  name: 'Wanderer' | 'Rover' | 'Ranger' | 'Warden';
  ages: string;
  skillPoints: number;
  badge: string;
}

export const CAMPFIRE_ERA_ID = 'campfire-tales';

export const SCOUT_RANKS: ScoutRankConfig[] = [
  { id: '11-12', name: 'Wanderer', ages: '11-12', skillPoints: 200, badge: 'Wanderer Badge' },
  { id: '13-14', name: 'Rover', ages: '13-14', skillPoints: 250, badge: 'Rover Badge' },
  { id: '15-16', name: 'Ranger', ages: '15-16', skillPoints: 300, badge: 'Ranger Badge' },
  { id: '17-18', name: 'Warden', ages: '17-18', skillPoints: 350, badge: 'Warden Badge' },
];

export const getScoutAbilityBadgeAllowance = (rankId: AgeCategory | null | undefined) => {
  const rank = getScoutRank(rankId);
  const index = SCOUT_RANKS.findIndex(entry => entry.id === rank.id);
  return Math.max(1, index + 1);
};

export const CAMPFIRE_FAMILY_CREDIT: Array<{
  status: FamilyCreditStatus;
  minRoll: number;
  maxRoll: number;
  base: number;
  pointAdjustment: number;
  home: string;
  possessions: string;
}> = [
  {
    status: 'Penniless',
    minRoll: 1,
    maxRoll: 1,
    base: 0,
    pointAdjustment: 20,
    home: 'No fixed home, or lodging with relatives, friends, charity, or the state.',
    possessions: 'Nothing but worn clothes and empty pockets.',
  },
  {
    status: 'Poor',
    minRoll: 2,
    maxRoll: 15,
    base: 5,
    pointAdjustment: 10,
    home: 'Basic, crowded, or unstable, with adults struggling to provide.',
    possessions: 'Hand-me-down clothes, perhaps a battered bicycle, and bits of string.',
  },
  {
    status: 'Average',
    minRoll: 16,
    maxRoll: 85,
    base: 25,
    pointAdjustment: 0,
    home: 'Comfortable and ordinary, with school supplies, family routines, and enough to get by.',
    possessions: 'A bicycle, school clothes, pocketknife, candy, and a folded comics page.',
  },
  {
    status: 'Wealthy',
    minRoll: 86,
    maxRoll: 99,
    base: 60,
    pointAdjustment: -20,
    home: 'Large and comfortable, with a car, some domestic help, and possibly a country place.',
    possessions: 'A shiny bicycle, nice clothes, wristwatch, and a prized keepsake.',
  },
  {
    status: 'Rich',
    minRoll: 100,
    maxRoll: 100,
    base: 90,
    pointAdjustment: -50,
    home: 'A large house behind walls or gates, private school expectations, staff, and influence.',
    possessions: 'Fine clothes, expensive pocket money, and possessions that are hard to hide.',
  },
];

export const CAMPFIRE_DISTRESS_BOXES = ['Stressed', 'Jumpy', 'Upset'] as const;
export const CAMPFIRE_ADVERSITY_BOXES = ['Cold', 'Hunger', 'Lost', 'Overburdened', 'Sore'] as const;

export const CAMPFIRE_RANK_BADGES = [
  {
    name: 'Wayfarer Scout Badge',
    benefit: 'Spend Luck to help improve another scout’s roll, reflecting fellowship and teamwork.',
  },
  {
    name: 'Wanderer Badge',
    benefit: 'Once per scenario, convert your own allowed failed roll into a success when plausible.',
  },
  {
    name: 'Rover Badge',
    benefit: 'Once per scenario, refresh Luck by rolling (2D6+6) x 5 and using that result.',
  },
  {
    name: 'Ranger Badge',
    benefit: 'Once per scenario, take one bonus die on your own skill roll before rolling dice.',
  },
  {
    name: 'Warden Badge',
    benefit: 'Once per scenario, give one bonus die to another scout before that roll is made.',
  },
];

export const CAMPFIRE_ABILITY_BADGES = [
  { name: 'Animal Friendship Badge', skill: 'Animal Handling', increase: 10, benefit: 'Understand one simple message or intent from a dog, cat, or similar animal.' },
  { name: 'Boating Badge', skill: 'Pilot (Boat)', increase: 10, benefit: 'Gain a bonus die on Pilot (Boat), Swim, or another water-related roll.' },
  { name: 'Camping Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on Mechanical Repair or another camping-related roll.' },
  { name: 'Cycling Badge', skill: 'Ride (Bicycle)', increase: 10, benefit: 'Gain a bonus die on Ride (Bicycle) or a bicycle repair and chase roll.' },
  { name: 'Climbing Badge', skill: 'Climb', increase: 10, benefit: 'Gain a bonus die on one Climb roll or another climbing-related danger.' },
  { name: 'Crafting Badge', skill: 'Art and Craft', increase: 10, benefit: 'Gain a bonus die on Art/Craft or another making-and-mending project for camp.' },
  { name: 'First Aid Badge', skill: 'First Aid', increase: 10, benefit: 'Automatically grant 4 HP recovery once per scenario without a skill roll.' },
  { name: 'Fishing Badge', skill: 'Survival', increase: 10, benefit: 'Catch enough fish for the squad dinner when in a suitable outdoor location.' },
  { name: 'Hiking Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on one CON roll or another hiking-related trail challenge.' },
  { name: 'Orienteering Badge', skill: 'Navigate', increase: 10, benefit: 'Gain a bonus die on Navigate or another outdoor navigation and map roll.' },
  { name: 'Knot-Tying Badge', skill: 'Climb', increase: 10, benefit: 'Knots stay tied unless cut or deliberately untied, plus a rope bonus die.' },
  { name: 'Photography Badge', skill: 'Art and Craft (Photography)', increase: 10, benefit: 'Gain a bonus die on photography or automatically capture one useful photo.' },
  { name: 'Public Speaking Badge', skill: 'Persuade', increase: 10, benefit: 'Gain a bonus die on one social roll or sway one otherwise neutral adult.' },
  { name: 'Nature Badge', skill: 'Natural World', increase: 10, benefit: 'Gain a bonus die on Natural World or another nature and outdoors roll.' },
  { name: 'Radio Badge', skill: 'Electrical Repair', increase: 10, benefit: 'Gain a bonus die on Electrical Repair, radio work, or careful listening.' },
  { name: 'Swimming Badge', skill: 'Swim', increase: 10, benefit: 'Gain a bonus die on Swim or related river, lake, or water survival danger.' },
  { name: 'Weather Badge', skill: 'Science (Meteorology)', increase: 10, benefit: 'Correctly forecast the next 24 hours of weather for the scout squad outing.' },
  { name: 'Reading Badge', skill: 'Language (Own)', increase: 10, benefit: 'Gain a bonus die on Language or understand one non-Mythos word or phrase.' },
  { name: 'Signals & Codes Badge', skill: 'Language (Signals)', increase: 10, benefit: 'Raise Language (Signals) to at least 30%, or gain a related bonus die.' },
  { name: 'Wilderness Survival Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on Survival or another outdoors and wilderness emergency roll.' },
];

const d6 = (rng: () => number) => Math.floor(rng() * 6) + 1;
const roll2d6Raw = (rng: () => number) => d6(rng) + d6(rng);

export type CampfireRawRolls = Record<keyof AttributeSet, number>;

export const rollDiceExpression = (dice: number, plus: number, multiplier: number, rng: () => number = Math.random) => {
  let total = plus;
  for (let i = 0; i < dice; i += 1) total += d6(rng);
  return total * multiplier;
};

export const getScoutRank = (rankId: AgeCategory | null | undefined) => (
  SCOUT_RANKS.find(rank => rank.id === rankId) || SCOUT_RANKS[0]
);

export const getScoutSkillPointTotal = (rankId: AgeCategory | null | undefined, familyStatus?: FamilyCreditStatus | null) => {
  const base = getScoutRank(rankId).skillPoints;
  const status = CAMPFIRE_FAMILY_CREDIT.find(entry => entry.status === familyStatus);
  return Math.max(0, base + (status?.pointAdjustment || 0));
};

export const rollFamilyCreditStatus = (rng: () => number = Math.random): FamilyCreditStatus => {
  const roll = Math.floor(rng() * 100) + 1;
  return CAMPFIRE_FAMILY_CREDIT.find(entry => roll >= entry.minRoll && roll <= entry.maxRoll)?.status || 'Average';
};

export const getFamilyCreditStatus = (status?: FamilyCreditStatus | null) => (
  CAMPFIRE_FAMILY_CREDIT.find(entry => entry.status === status) || CAMPFIRE_FAMILY_CREDIT[2]
);

export const rollCampfireRawRolls = (rng: () => number = Math.random): CampfireRawRolls => ({
  STR: roll2d6Raw(rng),
  CON: roll2d6Raw(rng),
  DEX: roll2d6Raw(rng),
  APP: roll2d6Raw(rng),
  POW: roll2d6Raw(rng),
  LUCK: roll2d6Raw(rng),
  INT: roll2d6Raw(rng),
  EDU: roll2d6Raw(rng),
  SIZ: roll2d6Raw(rng),
});

export const buildCampfireAttributesFromRolls = (
  rawRolls: CampfireRawRolls,
  rankId: AgeCategory | null | undefined,
): AttributeSet => {
  const rank = getScoutRank(rankId);
  const rankRolls: Record<ScoutRankId, Pick<AttributeSet, 'STR' | 'SIZ' | 'EDU'>> = {
    '11-12': {
      STR: (rawRolls.STR + 3) * 2,
      SIZ: (rawRolls.SIZ + 3) * 3,
      EDU: (rawRolls.EDU + 3) * 2,
    },
    '13-14': {
      STR: (rawRolls.STR + 3) * 3,
      SIZ: (rawRolls.SIZ + 5) * 3,
      EDU: (rawRolls.EDU + 3) * 3,
    },
    '15-16': {
      STR: (rawRolls.STR + 4) * 4,
      SIZ: (rawRolls.SIZ + 5) * 4,
      EDU: (rawRolls.EDU + 4) * 4,
    },
    '17-18': {
      STR: (rawRolls.STR + 4) * 5,
      SIZ: (rawRolls.SIZ + 4) * 5,
      EDU: (rawRolls.EDU + 4) * 5,
    },
  };

  return {
    ...rankRolls[rank.id],
    CON: (rawRolls.CON + 5) * 5,
    DEX: (rawRolls.DEX + 5) * 5,
    APP: (rawRolls.APP + 5) * 5,
    INT: (rawRolls.INT + 5) * 5,
    POW: (rawRolls.POW + 5) * 5,
    LUCK: (rawRolls.LUCK + 6) * 5,
  };
};

export const rollCampfireAttributes = (rankId: AgeCategory | null | undefined, rng: () => number = Math.random): AttributeSet => (
  buildCampfireAttributesFromRolls(rollCampfireRawRolls(rng), rankId)
);

export const deriveCampfireRawRollsFromAttributes = (
  attributes: AttributeSet,
  rankId: AgeCategory | null | undefined,
): CampfireRawRolls => {
  const rank = getScoutRank(rankId);
  const rankFormula: Record<ScoutRankId, Record<'STR' | 'SIZ' | 'EDU', { plus: number; multiplier: number }>> = {
    '11-12': { STR: { plus: 3, multiplier: 2 }, SIZ: { plus: 3, multiplier: 3 }, EDU: { plus: 3, multiplier: 2 } },
    '13-14': { STR: { plus: 3, multiplier: 3 }, SIZ: { plus: 5, multiplier: 3 }, EDU: { plus: 3, multiplier: 3 } },
    '15-16': { STR: { plus: 4, multiplier: 4 }, SIZ: { plus: 5, multiplier: 4 }, EDU: { plus: 4, multiplier: 4 } },
    '17-18': { STR: { plus: 4, multiplier: 5 }, SIZ: { plus: 4, multiplier: 5 }, EDU: { plus: 4, multiplier: 5 } },
  };
  const clampRaw = (value: number) => Math.max(2, Math.min(12, Math.round(value)));
  const invertRanked = (attr: 'STR' | 'SIZ' | 'EDU') => {
    const formula = rankFormula[rank.id][attr];
    return clampRaw((attributes[attr] / formula.multiplier) - formula.plus);
  };
  const invertCommon = (attr: keyof AttributeSet, plus: number) => clampRaw((attributes[attr] / 5) - plus);

  return {
    STR: invertRanked('STR'),
    SIZ: invertRanked('SIZ'),
    EDU: invertRanked('EDU'),
    CON: invertCommon('CON', 5),
    DEX: invertCommon('DEX', 5),
    APP: invertCommon('APP', 5),
    INT: invertCommon('INT', 5),
    POW: invertCommon('POW', 5),
    LUCK: invertCommon('LUCK', 6),
  };
};
