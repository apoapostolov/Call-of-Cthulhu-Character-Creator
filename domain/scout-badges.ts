/**
 * Pure Campfire Tales badge helpers (extracted from useCharacter).
 */
import type { AgeCategory, Occupation } from '../types';
import {
  getScoutAdditionalAbilityBadgeAllowance,
  getScoutRank,
  SCOUT_RANKS,
} from '../eras/campfire-tales/scout-rules';

export const resolveScoutBadges = (
  rankBadge: string,
  selectedAbilityBadges: string[] = [],
) => {
  const resolved = [
    'Wayfarer Scout Badge',
    rankBadge,
    ...selectedAbilityBadges,
  ];
  return Array.from(new Set(resolved.filter(Boolean)));
};

export const getDefaultScoutAbilityBadges = (
  occupation: Occupation | null | undefined,
  limit = 1,
) => (
  occupation?.startingBadges
    ?.filter(badgeName => badgeName !== 'Ability Badge of Choice')
    .slice(0, Math.min(1, limit)) || []
);

export const getScoutAbilityBadgeLimit = (
  occupation: Occupation | null | undefined,
  rankId: AgeCategory | null | undefined,
) => (
  Math.max(1, getDefaultScoutAbilityBadges(occupation, 1).length)
  + getScoutAdditionalAbilityBadgeAllowance(rankId)
);

export const trimScoutAbilityBadgesForRules = (
  badges: string[],
  occupation: Occupation | null | undefined,
  rankId: AgeCategory | null | undefined,
) => {
  const hobbyBadges = getDefaultScoutAbilityBadges(occupation, 1);
  const hobbyBadgeSet = new Set(hobbyBadges);
  const extras = badges.filter(badge => !hobbyBadgeSet.has(badge));
  return Array.from(new Set([
    ...hobbyBadges,
    ...extras.slice(0, getScoutAdditionalAbilityBadgeAllowance(rankId)),
  ]));
};

export const getEligibleScoutRankBadges = (rankId: AgeCategory | null | undefined) => {
  const rank = getScoutRank(rankId);
  const rankIndex = SCOUT_RANKS.findIndex(entry => entry.id === rank.id);
  return SCOUT_RANKS.slice(0, rankIndex + 1).map(entry => entry.badge);
};
