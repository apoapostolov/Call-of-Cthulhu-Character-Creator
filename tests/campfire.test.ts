import { describe, expect, it } from 'vitest';
import { ERAS, thirdPartyData } from '../eras/manifest';
import {
  CAMPFIRE_ABILITY_BADGES,
  CAMPFIRE_RANK_BADGES,
  CAMPFIRE_SKILL_CAP,
  buildCampfireAttributesFromRolls,
  getFamilyCreditStatus,
  getScoutAdditionalAbilityBadgeAllowance,
  getScoutAbilityBadgeAllowance,
  getScoutSkillPointTotal,
  rollCampfireAttributes,
  rollDiceExpression,
} from '../eras/campfire-tales/scout-rules';
import { SKILL_SPECIALIZATIONS } from '../data/skill-specializations-data';
import { responseToSkillPointAssignments } from '../lib/ai/skill-distribution';
import {
  CAMPFIRE_NOTES_TEXT_LIMIT,
  CAMPFIRE_SHEET_TEXT_LIMIT,
  getAgeAtReferenceYear,
  getCampfireCustomSkillEntries,
  limitCampfireSheetText,
} from '../utils/campfire-sheet';

describe('Campfire Tales era', () => {
  it('is registered and resolves through the era manifest', () => {
    expect(ERAS.some(era => era.id === 'campfire-tales' && era.name === 'Campfire Tales')).toBe(true);
    expect(thirdPartyData['campfire-tales']).toBeTruthy();
    expect(thirdPartyData['campfire-tales'].theme.displayName).toBe('Campfire Tales');
  });

  it('uses scout-specific skills instead of adult Credit Rating', () => {
    const skillNames = thirdPartyData['campfire-tales'].skills.map(skill => skill.name);

    expect(skillNames).toContain('Family Credit Rating');
    expect(skillNames).toContain('Reassure');
    expect(skillNames).toContain('Language (Signals)');
    expect(skillNames).toContain('Ride (Bicycle)');
    expect(skillNames).not.toContain('Credit Rating');
  });

  it('uses documented scout rank skill point totals with family credit adjustments', () => {
    expect(getScoutSkillPointTotal('11-12', 'Average')).toBe(200);
    expect(getScoutSkillPointTotal('13-14', 'Penniless')).toBe(270);
    expect(getScoutSkillPointTotal('15-16', 'Poor')).toBe(310);
    expect(getScoutSkillPointTotal('17-18', 'Wealthy')).toBe(330);
    expect(getScoutSkillPointTotal('17-18', 'Rich')).toBe(300);
  });

  it('uses rank-based ability badge allowances', () => {
    expect(getScoutAdditionalAbilityBadgeAllowance('11-12')).toBe(0);
    expect(getScoutAdditionalAbilityBadgeAllowance('13-14')).toBe(1);
    expect(getScoutAdditionalAbilityBadgeAllowance('15-16')).toBe(2);
    expect(getScoutAdditionalAbilityBadgeAllowance('17-18')).toBe(3);
    expect(getScoutAbilityBadgeAllowance('11-12')).toBe(1);
    expect(getScoutAbilityBadgeAllowance('13-14')).toBe(2);
    expect(getScoutAbilityBadgeAllowance('15-16')).toBe(3);
    expect(getScoutAbilityBadgeAllowance('17-18')).toBe(4);
  });

  it('rolls Campfire characteristics from the documented formulas', () => {
    const low = () => 0;
    const high = () => 0.999;

    expect(rollDiceExpression(2, 3, 2, low)).toBe(10);
    expect(rollDiceExpression(2, 3, 2, high)).toBe(30);

    const wandererLow = rollCampfireAttributes('11-12', low);
    const wardenHigh = rollCampfireAttributes('17-18', high);

    expect(wandererLow.STR).toBe(10);
    expect(wandererLow.SIZ).toBe(15);
    expect(wandererLow.EDU).toBe(10);
    expect(wandererLow.CON).toBe(35);
    expect(wandererLow.LUCK).toBe(40);

    expect(wardenHigh.STR).toBe(80);
    expect(wardenHigh.SIZ).toBe(80);
    expect(wardenHigh.EDU).toBe(80);
    expect(wardenHigh.CON).toBe(85);
    expect(wardenHigh.LUCK).toBe(90);
  });

  it('reuses the same Campfire dice results when rank formulas change', () => {
    const rawRolls = {
      STR: 7,
      SIZ: 7,
      EDU: 7,
      CON: 7,
      DEX: 7,
      APP: 7,
      INT: 7,
      POW: 7,
      LUCK: 7,
    };

    const wanderer = buildCampfireAttributesFromRolls(rawRolls, '11-12');
    const warden = buildCampfireAttributesFromRolls(rawRolls, '17-18');

    expect(wanderer.STR).toBe(20);
    expect(warden.STR).toBe(55);
    expect(wanderer.CON).toBe(60);
    expect(warden.CON).toBe(60);
    expect(wanderer.LUCK).toBe(65);
    expect(warden.LUCK).toBe(65);
  });

  it('gates Upstate League behind Rich Family Credit Rating', () => {
    const upstateLeague = thirdPartyData['campfire-tales'].occupations.find(occupation => occupation.name === 'Upstate League');

    expect(upstateLeague?.group).toBe('Scout Hobby');
    expect(upstateLeague?.familyCreditRequirement).toBe('Rich');
    expect(getFamilyCreditStatus('Rich').base).toBe(90);
  });

  it('keeps Campfire hobby choice groups resolvable to existing skills or specialization families', () => {
    const campfireData = thirdPartyData['campfire-tales'];
    const skillNames = new Set(campfireData.skills.map(skill => skill.name));
    const specializationParents = new Set(Object.keys(SKILL_SPECIALIZATIONS));

    for (const hobby of campfireData.occupations) {
      for (const group of hobby.choiceGroups || []) {
        for (const option of group.options) {
          if (option === '*') continue;
          const parentMatch = option.match(/^(.+) \((.+)\)$/);
          if (parentMatch) {
            const [, parent] = parentMatch;
            expect(skillNames.has(option) || skillNames.has(parent) || specializationParents.has(parent)).toBe(true);
            continue;
          }
          const parentForPlainSpecialization = Object.entries(SKILL_SPECIALIZATIONS).find(([, specializations]) => specializations.includes(option))?.[0];
          expect(skillNames.has(option) || !!parentForPlainSpecialization).toBe(true);
        }
      }
    }
  });

  it('uses selectable concrete badges for Ability Badge of Choice hobbies', () => {
    const badgeNames = new Set(CAMPFIRE_ABILITY_BADGES.map(badge => badge.name));
    const abilityChoiceHobbies = thirdPartyData['campfire-tales'].occupations.filter(occupation => (
      occupation.startingBadges || []
    ).includes('Ability Badge of Choice'));

    expect(abilityChoiceHobbies.length).toBeGreaterThan(0);
    expect(badgeNames.has('Photography Badge')).toBe(true);
    expect(badgeNames.has('Ability Badge of Choice')).toBe(false);
  });

  it('keeps badge summaries long enough for the badge grid', () => {
    const minimumSummaryLength = 'Gain a bonus die on Mechanical Repair or another camping-related roll.'.length;
    const allBadges = [...CAMPFIRE_RANK_BADGES, ...CAMPFIRE_ABILITY_BADGES];

    for (const badge of allBadges) {
      expect(badge.benefit.length, `${badge.name} summary is too short`).toBeGreaterThanOrEqual(minimumSummaryLength);
    }
  });

  it('inherits Classic 1920s prices and adds scout badge equipment', () => {
    const itemNames = thirdPartyData['campfire-tales'].items.map(item => item.name);
    const kitNames = thirdPartyData['campfire-tales'].equipmentKits.map(kit => kit.name);

    expect(itemNames).toContain('Bicycle');
    expect(itemNames).toContain('Pocket First Aid Kit');
    expect(itemNames).toContain('Signal Flags');
    expect(itemNames).toContain('Box Camera');
    expect(itemNames).toContain('Flashlight (handheld)');
    expect(kitNames).toContain('BADGE FIELDWORK KIT');
    expect(kitNames).toContain('NATURE & SURVIVAL KIT');
  });

  it('builds Campfire equipment kits only from available item names', () => {
    const itemNames = new Set(thirdPartyData['campfire-tales'].items.map(item => item.name));

    for (const kit of thirdPartyData['campfire-tales'].equipmentKits) {
      for (const itemName of kit.items) {
        expect(itemNames.has(itemName), `${kit.name} references missing item ${itemName}`).toBe(true);
      }
    }
  });

  it('calculates Scout Sheet age against the era year instead of the real current year', () => {
    expect(getAgeAtReferenceYear('1911-07-01', 1925)).toBe(14);
    expect(getAgeAtReferenceYear('1914-02-12', 1925)).toBe(11);
  });

  it('keeps Campfire Sheet generated text within strict field limits', () => {
    expect(CAMPFIRE_NOTES_TEXT_LIMIT).toBe(CAMPFIRE_SHEET_TEXT_LIMIT * 3);
    expect(limitCampfireSheetText('x'.repeat(250))).toHaveLength(CAMPFIRE_SHEET_TEXT_LIMIT);
    expect(limitCampfireSheetText('x'.repeat(600), CAMPFIRE_NOTES_TEXT_LIMIT)).toHaveLength(CAMPFIRE_NOTES_TEXT_LIMIT);
  });

  it('does not duplicate fixed or parent specialization skills in Campfire PDF custom slots', () => {
    const entries = getCampfireCustomSkillEntries(
      {
        Fighting: 25,
        'Fighting (Brawl)': 45,
        'Fighting Brawl': 45,
        Firearms: 10,
        'Firearms (Handgun)': 35,
        Science: 1,
        'Science (Chemistry)': 40,
        Accounting: 55,
      },
      ['Fighting (Brawl)'],
      thirdPartyData['campfire-tales'].skills,
    ).map(([name]) => name);

    expect(entries).not.toContain('Fighting');
    expect(entries).not.toContain('Fighting (Brawl)');
    expect(entries).not.toContain('Fighting Brawl');
    expect(entries).not.toContain('Firearms');
    expect(entries).not.toContain('Science');
    expect(entries).toContain('Firearms (Handgun)');
    expect(entries).toContain('Science (Chemistry)');
    expect(entries).toContain('Accounting');
  });

  it('caps Campfire skill totals at 80 percent', () => {
    const assignments = responseToSkillPointAssignments(
      {
        occupational: [{ skill: 'Library Use', points: 120 }],
        personal: [],
        experience: [],
        archetype: [],
      },
      [
        {
          name: 'Library Use',
          base: 20,
          current: 20,
          occupationalEligible: true,
          personalEligible: false,
          experienceEligible: false,
          archetypeEligible: false,
        },
      ],
      {
        occupational: 120,
        personal: 0,
        experience: 0,
        archetype: 0,
      },
      {
        skillCap: CAMPFIRE_SKILL_CAP,
        occupationalSkillNames: ['Library Use'],
        utilitySkills: ['Library Use'],
      },
    );

    expect((assignments['Library Use']?.occupational || 0) + 20).toBe(80);
  });
});
