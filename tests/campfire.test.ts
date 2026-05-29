import { describe, expect, it } from 'vitest';
import { ERAS, thirdPartyData } from '../eras/manifest';
import {
  getFamilyCreditStatus,
  getScoutSkillPointTotal,
  rollCampfireAttributes,
  rollDiceExpression,
} from '../eras/campfire-tales/scout-rules';

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

  it('gates Upstate League behind Rich Family Credit Rating', () => {
    const upstateLeague = thirdPartyData['campfire-tales'].occupations.find(occupation => occupation.name === 'Upstate League');

    expect(upstateLeague?.group).toBe('Scout Hobby');
    expect(upstateLeague?.familyCreditRequirement).toBe('Rich');
    expect(getFamilyCreditStatus('Rich').base).toBe(90);
  });
});

