import type { Skill } from '../types';

export const CAMPFIRE_SHEET_TEXT_LIMIT = 170;
export const CAMPFIRE_NOTES_TEXT_LIMIT = CAMPFIRE_SHEET_TEXT_LIMIT * 3;

export const limitCampfireSheetText = (value: string | null | undefined, maxLength = CAMPFIRE_SHEET_TEXT_LIMIT): string => {
  const text = String(value || '').trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd();
};

export const getAgeAtReferenceYear = (dob: string | null | undefined, referenceYear: number): number | null => {
  if (!dob) return null;
  const match = String(dob).match(/^(\d{1,4})-/);
  if (!match) return null;
  const birthYear = Number(match[1]);
  if (!Number.isFinite(birthYear)) return null;
  const age = referenceYear - birthYear;
  return age >= 0 && age < 200 ? age : null;
};

const normalizeSkillName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const getParentSkillName = (name: string) => name.replace(/\s*\([^)]*\)\s*$/, '').trim();

export const getCampfireCustomSkillEntries = (
  skills: Record<string, number>,
  fixedSkillNames: Iterable<string>,
  allSkills: Skill[] = [],
) => {
  const fixedKeys = new Set(Array.from(fixedSkillNames, normalizeSkillName));
  const specialtyParents = new Set(
    allSkills
      .filter(skill => skill.specialty)
      .map(skill => skill.name.toLowerCase()),
  );
  const parentNamesWithConcreteSpecializations = new Set(
    Object.keys(skills)
      .map(name => name.match(/^(.+?)\s*\(([^)]+)\)\s*$/))
      .filter((match): match is RegExpMatchArray => Boolean(match))
      .map(match => match[1].trim().toLowerCase()),
  );

  return Object.entries(skills)
    .filter(([, value]) => typeof value === 'number')
    .filter(([name]) => !fixedKeys.has(normalizeSkillName(name)))
    .filter(([name]) => !/^language\s*\(/i.test(name))
    .filter(([name]) => {
      const isSpecialization = /\([^)]*\)/.test(name);
      if (isSpecialization) return true;
      const parentName = getParentSkillName(name).toLowerCase();
      return !specialtyParents.has(parentName) && !parentNamesWithConcreteSpecializations.has(parentName);
    })
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);
};
