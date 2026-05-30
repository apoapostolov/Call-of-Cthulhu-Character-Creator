import { describe, expect, it } from 'vitest';
import { ERAS, thirdPartyData } from '../eras/manifest';
import { SKILL_SPECIALIZATIONS as REGENCY_SKILL_SPECIALIZATIONS } from '../eras/regency/skill-specializations-data';
import { SHEET_CONFIG } from '../eras/sheet-config';
import { getWeaponsForEra } from '../weapons/to-dgitems';
import { parsePriceToCents } from '../utils/money';

describe('Regency era scaffold', () => {
  it('is registered before Campfire Tales in the era manifest', () => {
    const regencyIndex = ERAS.findIndex(era => era.id === 'regency');
    const campfireIndex = ERAS.findIndex(era => era.id === 'campfire-tales');

    expect(regencyIndex).toBeGreaterThan(-1);
    expect(campfireIndex).toBeGreaterThan(-1);
    expect(regencyIndex).toBeLessThan(campfireIndex);
  });

  it('resolves through the era manifest with Regency-specific theme and decade data', () => {
    const regency = thirdPartyData['regency'];

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

  it('exposes a Regency equipment list in the Gear tab weapon table', () => {
    const weapons = getWeaponsForEra('regency');

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
});
