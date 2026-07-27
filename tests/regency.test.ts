import { beforeAll, describe, expect, it } from 'vitest';
import { ERAS, loadEraData } from '../eras/manifest';
import type { EraData } from '../eras/load-era';
import { SKILL_SPECIALIZATIONS as REGENCY_SKILL_SPECIALIZATIONS } from '../eras/regency/skill-specializations-data';
import { SHEET_CONFIG } from '../eras/sheet-config';
import { loadWeaponsForEra } from '../weapons/to-dgitems';
import { parsePriceToCents } from '../utils/money';
import { buildEraContext, buildSkillDistributionPrompt } from '../lib/ai/skill-distribution';
import { getNamePrompt, getPhysicalDescriptionPrompt, getPortraitPrompt } from '../prompts/prompt-data';

describe('Regency era scaffold', () => {
  let regency: EraData;

  beforeAll(async () => {
    regency = await loadEraData('regency');
  });

  it('is registered before Campfire Tales in the era manifest', () => {
    const regencyIndex = ERAS.findIndex(era => era.id === 'regency');
    const campfireIndex = ERAS.findIndex(era => era.id === 'campfire-tales');

    expect(regencyIndex).toBeGreaterThan(-1);
    expect(campfireIndex).toBeGreaterThan(-1);
    expect(regencyIndex).toBeLessThan(campfireIndex);
  });

  it('resolves through the era manifest with Regency-specific theme and decade data', () => {
        expect(regency).toBeTruthy();
    expect(regency.theme.displayName).toBe('Regency Cthulhu');
    expect(regency.decades[0]?.name).toBe('1810s');
    expect(regency.decades[0]?.displayName).toContain('Regency');
    expect(regency.occupations.some(occupation => occupation.name === 'Gentleman')).toBe(true);
    expect(regency.occupations.some(occupation => occupation.name === 'Servant (Housemaid)')).toBe(true);
    expect(regency.occupations.some(occupation => occupation.name === 'Driver (Carriage)')).toBe(true);
    expect(regency.occupations.every(occupation => occupation.creditRatingRange.max <= 100)).toBe(true);
    expect(regency.occupations.find(occupation => occupation.name === 'Gentleman')?.skillPoints).toContain('APP × 2');
    expect(regency.skills.some(skill => skill.name === 'Astronomy')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Drive Carriage/Cart')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Etiquette')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Natural Philosophy')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Pilot (Boat)')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Ride')).toBe(true);
    expect(regency.skills.some(skill => skill.name === 'Pilot')).toBe(false);
    expect(regency.skills.some(skill => skill.name === 'Drive Auto')).toBe(false);
    expect(regency.skills.some(skill => skill.name === 'Electrical Repair')).toBe(false);
    expect(regency.skills.some(skill => skill.name === 'Science')).toBe(false);
    expect(regency.skills.some(skill => skill.name === 'Psychoanalysis')).toBe(false);
    expect(regency.skills.filter(skill => skill.name === 'Ride')).toHaveLength(1);
    expect(regency.equipmentKits.length).toBeGreaterThan(0);
    expect(regency.items.some(item => item.name === 'Calling Cards')).toBe(true);
    expect(regency.items.some(item => item.name === 'Book (Minerva Press)')).toBe(true);
    expect(regency.items.some(item => item.name === 'Flashlight (handheld)')).toBe(false);
    expect(regency.equipmentKits.some(kit => kit.name === 'GENTLEMAN OF THE TON KIT')).toBe(true);
    expect(regency.equipmentKits.some(kit => kit.name === 'GENTLEWOMAN OF THE TON KIT')).toBe(true);
    expect(regency.wealthData.levels[0]?.name).toBe('Penniless');
  });

  it('exposes a Regency equipment list in the Gear tab weapon table', async () => {
    const weapons = await loadWeaponsForEra('regency');

    expect(weapons.length).toBeGreaterThan(0);
    expect(weapons.some(item => item.name === 'Rapier')).toBe(true);
    expect(weapons.some(item => item.section === 'Carriages & Chases')).toBe(true);
  });

  it('uses a Regency-specific specialization catalog', () => {
    expect(REGENCY_SKILL_SPECIALIZATIONS.Fighting).toContain('Rapier');
    expect(REGENCY_SKILL_SPECIALIZATIONS.Firearms).toContain('Pistol');
    expect(REGENCY_SKILL_SPECIALIZATIONS.Pilot).toEqual(['Boat']);
  });

  it('uses the classic sheet fallback until a Regency PDF is introduced', () => {
    expect(SHEET_CONFIG.sheets['regency']?.defaultSheet).toBe('/sheets/coc1920s.pdf');
  });

  it('parses Regency period guineas and old money strings', () => {
    expect(parsePriceToCents('1 guinea')).toBe(252);
    expect(parsePriceToCents('half a guinea')).toBe(126);
    expect(parsePriceToCents('50 guineas')).toBe(12600);
    expect(parsePriceToCents('£3/13s/6d')).toBe(882);
  });

  it('pushes Regency context into the bio prompts', () => {
    
    const decade = regency.decades[0];

    expect(getNamePrompt('female', 'gentlewoman investigator', 'British', decade)).toContain('Regency England');
    expect(getPhysicalDescriptionPrompt(decade?.displayName)).toContain('early 19th-century clothing cues');

    const portraitPrompt = getPortraitPrompt(
      'gentlewoman investigator',
      'female',
      'British',
      'Lady Investigator',
      'empire-waist gown and pelisse',
      regency.theme,
      decade,
      null,
      null,
      null,
      null,
      26,
    );

    expect(portraitPrompt).toContain('Regency Cue');
    expect(portraitPrompt).toContain('Season');
    expect(portraitPrompt).toContain('townhouses');
  });

  it('pushes Regency context into the skill distribution prompt', () => {
    
    const decade = regency.decades[0];
    const prompt = buildSkillDistributionPrompt({
      era: {
        id: 'regency',
        name: decade?.name || '1810s',
        displayName: decade?.displayName || 'Regency England',
      },
      eraContext: buildEraContext(regency.decades, decade?.name || '1810s'),
      occupation: {
        name: 'Gentleman',
        description: 'A landed gentleman of means.',
        group: 'Upper Class',
        skillPoints: 'EDU × 2 + APP × 2',
        selectedChoices: {},
        occupationalSkills: ['Accounting', 'Etiquette', 'Persuade'],
      },
      description: 'A polite heir with horses, letters, and a place in society.',
      distribution: {
        signatureSkillTarget: '1-2 core skills around 50-70%',
        secondarySkillTarget: '2-4 supporting skills around 20-40%',
        supportSkillTarget: 'several 5-10 point adjacent skills where the concept supports them',
        supportPointBand: { min: 5, max: 10 },
        maxHighSkillCount: 2,
        utilitySkills: ['Etiquette', 'Ride', 'Dancing'],
        eraSpecificGuidance: ['Treat the era as Regency England, roughly 1811-1820, with the Prince Regent, the London Season, country houses, balls, assemblies, chaperones, and strict social rank.'],
      },
      rules: {
        untrainedMax: 19,
        trainedMin: 20,
        professionalMin: 50,
        expertMin: 70,
      },
      pools: {
        occupational: {
          total: 120,
          spent: 0,
          remaining: 120,
          formula: 'EDU × 2 + APP × 2',
          calculation: '120',
        },
        personal: {
          total: 40,
          spent: 0,
          remaining: 40,
          formula: 'Personal',
          calculation: '40',
        },
      },
      activePools: ['occupational', 'personal'],
      skills: [
        {
          name: 'Etiquette',
          base: 10,
          current: 10,
          occupationalEligible: true,
          personalEligible: true,
          experienceEligible: false,
          archetypeEligible: false,
          description: 'Manners.',
        },
        {
          name: 'Ride',
          base: 5,
          current: 5,
          occupationalEligible: true,
          personalEligible: true,
          experienceEligible: false,
          archetypeEligible: false,
          description: 'Horse riding.',
        },
      ],
      specializations: REGENCY_SKILL_SPECIALIZATIONS,
    });

    expect(prompt).toContain('Regency England');
    expect(prompt).toContain('London Season');
    expect(prompt).toContain('chaperones');
  });
});
