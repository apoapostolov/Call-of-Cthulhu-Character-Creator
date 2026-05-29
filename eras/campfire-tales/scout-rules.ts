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
    benefit: 'Spend Luck to improve a roll made by another squad member.',
  },
  {
    name: 'Wanderer Badge',
    benefit: 'Once per scenario, convert one allowed failed roll into a success.',
  },
  {
    name: 'Rover Badge',
    benefit: 'Once per scenario, refresh Luck by rolling (2D6+6) x 5.',
  },
  {
    name: 'Ranger Badge',
    benefit: 'Once per scenario, take one bonus die on one of your own skill rolls.',
  },
  {
    name: 'Warden Badge',
    benefit: 'Once per scenario, give one bonus die to another scout.',
  },
];

export const CAMPFIRE_ABILITY_BADGES = [
  { name: 'Animal Friendship Badge', skill: 'Animal Handling', increase: 10, benefit: 'Understand one simple message from a dog or similar animal.' },
  { name: 'Boating Badge', skill: 'Pilot (Boat)', increase: 10, benefit: 'Gain a bonus die on Pilot (Boat), Swim, or another water-related roll.' },
  { name: 'Camping Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on Mechanical Repair or another camping-related roll.' },
  { name: 'Cycling Badge', skill: 'Ride (Bicycle)', increase: 10, benefit: 'Gain a bonus die on Ride (Bicycle) or a cycling-related repair roll.' },
  { name: 'Climbing Badge', skill: 'Climb', increase: 10, benefit: 'Gain a bonus die on one Climb or climbing-related roll.' },
  { name: 'Crafting Badge', skill: 'Art and Craft', increase: 10, benefit: 'Gain a bonus die on one Art/Craft or making-and-mending roll.' },
  { name: 'First Aid Badge', skill: 'First Aid', increase: 10, benefit: 'Automatically grant 4 HP recovery once per scenario.' },
  { name: 'Fishing Badge', skill: 'Survival', increase: 10, benefit: 'Catch enough fish for the squad dinner in a suitable location.' },
  { name: 'Hiking Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on one CON or hiking-related roll.' },
  { name: 'Orienteering Badge', skill: 'Navigate', increase: 10, benefit: 'Gain a bonus die on Navigate or another outdoor navigation roll.' },
  { name: 'Knot-Tying Badge', skill: 'Climb', increase: 10, benefit: 'Tied knots stay tied unless cut or deliberately untied.' },
  { name: 'Photography Badge', skill: 'Art and Craft (Photography)', increase: 10, benefit: 'Gain a bonus die on photography, or automatically capture one photo.' },
  { name: 'Public Speaking Badge', skill: 'Persuade', increase: 10, benefit: 'Gain a bonus die on one social roll, or sway a neutral adult.' },
  { name: 'Nature Badge', skill: 'Natural World', increase: 10, benefit: 'Gain a bonus die on Natural World or a nature/outdoors roll.' },
  { name: 'Radio Badge', skill: 'Electrical Repair', increase: 10, benefit: 'Gain a bonus die on Electrical Repair, radio work, or careful listening.' },
  { name: 'Swimming Badge', skill: 'Swim', increase: 10, benefit: 'Gain a bonus die on Swim or related water survival.' },
  { name: 'Weather Badge', skill: 'Science (Meteorology)', increase: 10, benefit: 'Correctly forecast the next 24 hours of weather.' },
  { name: 'Reading Badge', skill: 'Language (Own)', increase: 10, benefit: 'Gain a bonus die on Language or understand one non-Mythos phrase.' },
  { name: 'Signals & Codes Badge', skill: 'Language (Signals)', increase: 10, benefit: 'Raise Language (Signals) to at least 30%, and gain a related bonus.' },
  { name: 'Wilderness Survival Badge', skill: 'Survival', increase: 10, benefit: 'Gain a bonus die on Survival or another outdoors roll.' },
];

const d6 = (rng: () => number) => Math.floor(rng() * 6) + 1;
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

export const rollCampfireAttributes = (rankId: AgeCategory | null | undefined, rng: () => number = Math.random): AttributeSet => {
  const rank = getScoutRank(rankId);
  const common = () => rollDiceExpression(2, 5, 5, rng);
  const rankRolls: Record<ScoutRankId, Pick<AttributeSet, 'STR' | 'SIZ' | 'EDU'>> = {
    '11-12': {
      STR: rollDiceExpression(2, 3, 2, rng),
      SIZ: rollDiceExpression(2, 3, 3, rng),
      EDU: rollDiceExpression(2, 3, 2, rng),
    },
    '13-14': {
      STR: rollDiceExpression(2, 3, 3, rng),
      SIZ: rollDiceExpression(2, 5, 3, rng),
      EDU: rollDiceExpression(2, 3, 3, rng),
    },
    '15-16': {
      STR: rollDiceExpression(2, 4, 4, rng),
      SIZ: rollDiceExpression(2, 5, 4, rng),
      EDU: rollDiceExpression(2, 4, 4, rng),
    },
    '17-18': {
      STR: rollDiceExpression(2, 4, 5, rng),
      SIZ: rollDiceExpression(2, 4, 5, rng),
      EDU: rollDiceExpression(2, 4, 5, rng),
    },
  };

  return {
    ...rankRolls[rank.id],
    CON: common(),
    DEX: common(),
    APP: common(),
    INT: common(),
    POW: common(),
    LUCK: rollDiceExpression(2, 6, 5, rng),
  };
};

