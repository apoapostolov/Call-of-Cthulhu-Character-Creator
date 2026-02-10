import type { Era, EraID, Occupation, Skill, ThemeConfig, WeightedNationality, DecadeConfig, DGItem, EquipmentKit, EraWealthData } from '../types';
import { normalizeItemName } from '../utils';

// Data Imports
// Classic 1920s
import { OCCUPATIONS as o_classic_1920s } from './classic-1920s/occupations-data';
import { SKILLS as s_classic_1920s } from './classic-1920s/skills-data';
import { THEME as t_classic_1920s } from './classic-1920s/theme';
import { NATIONALITIES as n_classic_1920s } from './classic-1920s/nationality-data';
import { DECADES as d_classic_1920s } from './classic-1920s/decades-data';
import { PDF_FIELD_MAP as p_classic_1920s } from './classic-1920s/pdf-form-fields';
import { ITEMS_FROM_PRICES as ip_classic_1920s } from './classic-1920s/items-from-prices';
import { EQUIPMENT_KITS as ek_classic_1920s } from './classic-1920s/equipment-kits';
import { WEALTH_DATA as w_classic_1920s } from './classic-1920s/prices-data';
// Raw 1920s price items for inheritance transforms
import { PRICES_OFFICIAL as P1920_OFFICIAL } from './classic-1920s/prices-official';
import { PRICES_HOMEBREW as P1920_HOMEBREW } from './classic-1920s/prices-homebrew';
// Pulp
import { OCCUPATIONS as o_pulp } from './pulp-1930s/occupations-data';
import { SKILLS as s_pulp } from './pulp-1930s/skills-data';
import { THEME as t_pulp } from './pulp-1930s/theme';
import { NATIONALITIES as n_pulp } from './pulp-1930s/nationality-data';
import { DECADES as d_pulp } from './pulp-1930s/decades-data';
import { PDF_FIELD_MAP as p_pulp } from './pulp-1930s/pdf-form-fields';
// import { ITEMS_FROM_PRICES as ip_classic_1920s_pulp } from './pulp-1930s/items-from-prices';
import { EQUIPMENT_KITS as ek_pulp } from './pulp-1930s/equipment-kits';
import { WEALTH_DATA as w_pulp } from './pulp-1930s/prices-data';
import { TALENTS as talents_pulp } from './pulp-1930s/talents-data';
import { ARCHETYPES as archetypes_pulp } from './pulp-1930s/archetypes-data';
// Gaslight
import { OCCUPATIONS as o_gaslight } from './gaslight-1890s/occupations-data';
import { SKILLS as s_gaslight } from './gaslight-1890s/skills-data';
import { THEME as t_gaslight } from './gaslight-1890s/theme';
import { NATIONALITIES as n_gaslight } from './gaslight-1890s/nationality-data';
import { DECADES as d_gaslight } from './gaslight-1890s/decades-data';
import { PDF_FIELD_MAP as p_gaslight } from './gaslight-1890s/pdf-form-fields';
import { ITEMS_FROM_PRICES as ip_gaslight } from './gaslight-1890s/items-from-prices';
import { EQUIPMENT_KITS as ek_gaslight } from './gaslight-1890s/equipment-kits';
import { WEALTH_DATA as w_gaslight } from './gaslight-1890s/prices-data';
import { TALENTS as talents_gaslight } from './gaslight-1890s/talents-data';
import { GASLIGHT_CREDIT_RATING_OVERRIDES, getCreditRatingOverride } from './gaslight-1890s/credit-rating-overrides';
// Dark Ages
import { OCCUPATIONS as o_dark_ages } from './dark-ages-1000s/occupations-data';
import { SKILLS as s_dark_ages } from './dark-ages-1000s/skills-data';
import { THEME as t_dark_ages } from './dark-ages-1000s/theme';
import { NATIONALITIES as n_dark_ages } from './dark-ages-1000s/nationality-data';
import { DECADES as d_dark_ages } from './dark-ages-1000s/decades-data';
import { PDF_FIELD_MAP as p_dark_ages } from './dark-ages-1000s/pdf-form-fields';
import { ITEMS_FROM_PRICES as ip_dark_ages } from './dark-ages-1000s/items-from-prices';
import { EQUIPMENT_KITS as ek_dark_ages } from './dark-ages-1000s/equipment-kits';
import { LIFE_EVENTS as life_events_dark_ages } from './dark-ages-1000s/lifeevents-data';
import { WEALTH_DATA as w_dark_ages } from './dark-ages-1000s/prices-data';
// Western
import { OCCUPATIONS as o_western } from './western-1870s/occupations-data';
import { SKILLS as s_western } from './western-1870s/skills-data';
import { THEME as t_western } from './western-1870s/theme';
import { NATIONALITIES as n_western } from './western-1870s/nationality-data';
import { DECADES as d_western } from './western-1870s/decades-data';
import { PDF_FIELD_MAP as p_western } from './western-1870s/pdf-form-fields';
import { ITEMS_FROM_PRICES as ip_western } from './western-1870s/items-from-prices';
import { EQUIPMENT_KITS as ek_western } from './western-1870s/equipment-kits';
import { WEALTH_DATA as w_western } from './western-1870s/prices-data';
import { EXPERIENCE_PACKAGES as xp_western } from './western-1870s/experience-packages-data';
import { TALENTS as talents_western } from './western-1870s/talents-data';
// Modern
import { OCCUPATIONS as o_modern } from './modern-2000s/occupations-data';
import { SKILLS as s_modern } from './modern-2000s/skills-data';
import { THEME as t_modern } from './modern-2000s/theme';
import { NATIONALITIES as n_modern } from './modern-2000s/nationality-data';
import { DECADES as d_modern } from './modern-2000s/decades-data';
import { PDF_FIELD_MAP as p_modern } from './modern-2000s/pdf-form-fields';
import { ITEMS_FROM_PRICES as ip_modern } from './modern-2000s/items-from-prices';
import { EQUIPMENT_KITS as ek_modern } from './modern-2000s/equipment-kits';
import { WEALTH_DATA as w_modern } from './modern-2000s/prices-data';


// --- Single Source of Truth for available eras ---
export const ERAS: Era[] = [
    { id: 'classic-1920s', name: 'Classic 1920s', isDefault: true, publisher: 'Chaosium', theme: 'Lovecraftian Horror', setting: 'Roaring Twenties' },
    { id: 'pulp-1930s', name: 'Pulp 1930s', publisher: 'Chaosium', theme: 'Action-Adventure Horror', setting: 'Pulp Cthulhu' },
    { id: 'modern-2000s', name: 'Modern Day', publisher: 'Chaosium', theme: 'Modern Horror', setting: 'Present Day' },
    { id: 'gaslight-1890s', name: 'Gaslight 1890s', publisher: 'Chaosium', theme: 'Victorian Horror', setting: 'Cthulhu by Gaslight' },
    // Swap positions: Western 1870s appears before Dark Ages 1000s
    { id: 'western-1880s', name: 'Western 1870s', publisher: 'Chaosium', theme: 'Weird West Horror', setting: 'Down Darker Trails' },
    { id: 'dark-ages-1000s', name: 'Dark Ages 1000s', publisher: 'Chaosium', theme: 'Medieval Horror', setting: 'Cthulhu Dark Ages' },
];

export const ERA_IDS = ERAS.map(s => s.id) as EraID[];

// --- Manifest Structure ---
interface EraData {
    occupations: Occupation[];
    skills: Skill[];
    theme: ThemeConfig;
    nationalities: WeightedNationality[];
    decades: DecadeConfig[];
    items: DGItem[];
    equipmentKits: EquipmentKit[];
    wealthData: EraWealthData;
    pdfFieldMap: any;
    experiencePackages?: any[];
    talents?: any[];
    archetypes?: any[];
    lifeEvents?: any[];
}

function composeEra(base: EraData, override: Partial<EraData>): EraData {
    return {
        occupations: [...(base.occupations || []), ...(override.occupations || [])],
        skills: [...(base.skills || []), ...(override.skills || [])],
        theme: override.theme || base.theme,
        nationalities: override.nationalities || base.nationalities,
        decades: override.decades || base.decades,
        // Items are passed in fully formed (e.g., price lists for the era)
        items: override.items || base.items,
        equipmentKits: override.equipmentKits || base.equipmentKits,
        wealthData: override.wealthData || base.wealthData,
        pdfFieldMap: override.pdfFieldMap || base.pdfFieldMap,
    };
}

// Generic inheritance helpers
function mergeUniqueByName<T extends { name: string }>(...lists: T[][]): T[] {
    const out: T[] = [];
    const seen = new Set<string>();
    for (const list of lists) {
        for (const it of list) {
            if (!it || !it.name) continue;
            if (seen.has(it.name)) continue;
            seen.add(it.name);
            out.push(it);
        }
    }
    return out;
}

// -------- Prices inheritance + transforms --------
type InheritRule = { 
  base?: EraID; 
  excludeNames?: string[]; 
  includeNames?: string[]; 
  transforms?: string[];
  /** Apply credit rating overrides to inherited occupations */
  creditRatingOverrides?: boolean;
};

const RAW_PRICES: Record<EraID, any[]> = {
  'classic-1920s': [...(P1920_OFFICIAL as any[]), ...(P1920_HOMEBREW as any[])],
  'pulp-1930s': [],
  'modern-2000s': [],
  'gaslight-1890s': [],
  'dark-ages-1000s': [],
  'western-1880s': [],
};

function filterByName<T extends { name: string }>(list: T[], names?: string[], invert = false): T[] {
  if (!names || names.length === 0) return invert ? [] : list;
  const set = new Set(names);
  return list.filter(x => invert ? set.has(x.name) : !set.has(x.name));
}

// Price transforms registry
function roundToNickel(cents: number): number { return Math.round(cents / 5) * 5; }
function toCentsFromDollarStr(s: string): number | null { const m = s.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/); return m ? Math.round(parseFloat(m[1]) * 100) : null; }
function toCentsFromCentStr(s: string): number | null { const m = s.match(/([0-9]+)\s*¢/); return m ? parseInt(m[1], 10) : null; }
function formatCents(c: number): string { return c < 100 ? `${c}¢` : `$${(c/100).toFixed(2)}`; }
function adjustPriceTextInflate(s: string | undefined, fallbackCents: number | null | undefined, factor: number): { priceText?: string; priceCents?: number | null } {
  if (!s || !s.trim()) {
    const base = typeof fallbackCents === 'number' ? fallbackCents : null;
    const adj = base != null ? roundToNickel(Math.max(1, Math.round(base * factor))) : null;
    return adj != null ? { priceText: formatCents(adj), priceCents: adj } : {};
  }
  const str = s.trim();
  const mRange = str.match(/\$?([0-9]+(?:\.[0-9]{1,2})?)\s*-\s*\$?([0-9]+(?:\.[0-9]{1,2})?)/);
  if (mRange) {
    const a = Math.round(parseFloat(mRange[1]) * 100);
    const b = Math.round(parseFloat(mRange[2]) * 100);
    const aAdj = roundToNickel(Math.round(a * factor));
    const bAdj = roundToNickel(Math.round(b * factor));
    return { priceText: `${formatCents(Math.min(aAdj,bAdj))}-${formatCents(Math.max(aAdj,bAdj))}`, priceCents: null };
  }
  const dollars = toCentsFromDollarStr(str);
  if (dollars != null) { const adj = roundToNickel(Math.round(dollars * factor)); return { priceText: formatCents(adj), priceCents: adj }; }
  const cents = toCentsFromCentStr(str);
  if (cents != null) { const adj = roundToNickel(Math.round(cents * factor)); return { priceText: formatCents(adj), priceCents: adj }; }
  const base = typeof fallbackCents === 'number' ? fallbackCents : null;
  const adj = base != null ? roundToNickel(Math.max(1, Math.round(base * factor))) : null;
  return adj != null ? { priceText: formatCents(adj), priceCents: adj } : { priceText: str, priceCents: null };
}

const PRICE_TRANSFORMS: Record<string, (items: any[]) => any[]> = {
  inflate1936: (items: any[]) => {
    const factor = 0.82; // 1936 vs mid-1920s
    return items.map(it => ({
      ...it,
      ...adjustPriceTextInflate(it.priceText, it.priceCents, factor),
    }));
  }
};

function applyPriceTransforms(items: any[], transforms?: string[]): any[] {
  if (!transforms || transforms.length === 0) return items;
  return transforms.reduce((acc, t) => PRICE_TRANSFORMS[t] ? PRICE_TRANSFORMS[t](acc) : acc, items);
}

function mapPriceItemsToDG(items: any[]): DGItem[] {
  return items.map((it) => ({
    section: it.section || 'Miscellaneous',
    name: normalizeItemName(it.name),
    description: it.description || undefined,
    price: it.priceText || (typeof it.priceCents === 'number' ? `$${(it.priceCents/100).toFixed(2)}` : undefined),
    sourceType: it.sourceType || 'core',
    sourceName: it.sourceName || null,
    sourcePage: it.sourcePage ?? null,
  } as DGItem));
}

function resolvePriceItems(eraId: EraID, rule?: InheritRule): DGItem[] {
  if (!rule || !rule.base) {
    // Use precomputed items for the era
    switch (eraId) {
      case 'classic-1920s': return mapPriceItemsToDG(RAW_PRICES['classic-1920s']);
      default: return [];
    }
  }
  const baseItems = RAW_PRICES[rule.base] || [];
  const filtered = filterByName(baseItems, rule.excludeNames);
  const transformed = applyPriceTransforms(filtered, rule.transforms);
  return mapPriceItemsToDG(transformed);
}

// --- Declarative inheritance (prepared) ---
const RAW_OCCUPATIONS: Record<EraID, Occupation[]> = {
  'classic-1920s': o_classic_1920s, 'pulp-1930s': o_pulp, 'modern-2000s': o_modern,
  'gaslight-1890s': o_gaslight, 'dark-ages-1000s': o_dark_ages, 'western-1880s': o_western,
};
function resolveOccs(eraId: EraID, rule?: InheritRule): Occupation[] {
  const raw = (RAW_OCCUPATIONS[eraId] || []).map(o => ({ ...o, eraId }));
  if (!rule || !rule.base) return raw;
  const base = (RAW_OCCUPATIONS[rule.base] || []).map(o => ({ ...o, eraId: rule.base }));
  const baseFiltered = filterByName(base, rule.excludeNames);
  
  // Apply credit rating overrides if enabled
  const processedBase = rule.creditRatingOverrides 
    ? baseFiltered.map(occupation => {
        const override = getCreditRatingOverride(occupation.name);
        if (override) {
          return {
            ...occupation,
            creditRatingRange: { min: override.min, max: override.max }
          };
        }
        return occupation;
      })
    : baseFiltered;
  
  // Overwrite-by-name: map base by name, then apply raw entries on top (replace), track which names are new vs overrides
  const byName = new Map<string, Occupation>();
  processedBase.forEach(o => byName.set(o.name, o));
  // If includeNames not provided, include ALL raw entries; otherwise, include only the named ones
  const additions = (rule.includeNames && rule.includeNames.length > 0)
    ? filterByName(raw, rule.includeNames, true)
    : raw;
  const newNames = new Set<string>();
  additions.forEach(o => {
    const existed = byName.has(o.name);
    byName.set(o.name, { ...o, isNew: !existed });
  });
  return Array.from(byName.values());
}

// Skills inheritance (prepared)
const RAW_SKILLS: Record<EraID, Skill[]> = {
  'classic-1920s': s_classic_1920s, 'pulp-1930s': s_pulp, 'modern-2000s': s_modern,
  'gaslight-1890s': s_gaslight, 'dark-ages-1000s': s_dark_ages, 'western-1880s': s_western,
};
function resolveSkills(eraId: EraID, rule?: InheritRule): Skill[] {
  const raw = RAW_SKILLS[eraId] || [];
  if (!rule || !rule.base) return raw;
  const base = RAW_SKILLS[rule.base] || [];
  const baseFiltered = filterByName(base, rule.excludeNames);
  const additions = filterByName(raw, rule.includeNames, true);
  return mergeUniqueByName(baseFiltered, additions);
}

// --- The Manifest ---
export const thirdPartyData: Record<EraID, EraData> = {
    'classic-1920s': {
        occupations: resolveOccs('classic-1920s'),
        skills: resolveSkills('classic-1920s'),
        theme: t_classic_1920s,
        nationalities: n_classic_1920s,
        decades: d_classic_1920s,
        items: ip_classic_1920s,
        equipmentKits: ek_classic_1920s,
        wealthData: w_classic_1920s,
        pdfFieldMap: p_classic_1920s,
    },
  'pulp-1930s': {
    // Inherit Classic 1920s and overwrite by name; include all Pulp additions (no filters)
    occupations: resolveOccs('pulp-1930s', { base: 'classic-1920s' }),
    skills: resolveSkills('pulp-1930s', { base: 'classic-1920s', excludeNames: [], includeNames: ['Hypnosis'] }),
        theme: t_pulp,
        nationalities: n_pulp,
        decades: d_pulp,
        items: resolvePriceItems('pulp-1930s', { base: 'classic-1920s', transforms: ['inflate1936'] }),
        equipmentKits: ek_pulp,
        wealthData: w_pulp,
    pdfFieldMap: p_pulp,
    talents: talents_pulp,
    archetypes: archetypes_pulp,
    },
    'gaslight-1890s': { 
        occupations: resolveOccs('gaslight-1890s', { 
            base: 'classic-1920s', 
            creditRatingOverrides: true 
        }), 
        skills: s_gaslight, 
        theme: t_gaslight, 
        nationalities: n_gaslight, 
        decades: d_gaslight, 
        items: ip_gaslight, 
        equipmentKits: ek_gaslight, 
        wealthData: w_gaslight, 
        pdfFieldMap: p_gaslight, 
        talents: talents_gaslight 
    },
    'dark-ages-1000s': { occupations: o_dark_ages, skills: s_dark_ages, theme: t_dark_ages, nationalities: n_dark_ages, decades: d_dark_ages, items: ip_dark_ages, equipmentKits: ek_dark_ages, wealthData: w_dark_ages, pdfFieldMap: p_dark_ages, lifeEvents: life_events_dark_ages },
    'western-1880s': { occupations: o_western, skills: resolveSkills('western-1880s', { base: 'classic-1920s', includeNames: ['Drive Wagon/Coach', 'Electrical Repair', 'Natural World', 'Psychology', 'Language (Own)', 'Ride', 'Gambling', 'Language (Indian)', 'Rope Use', 'Trap'], excludeNames: ['Drive Auto', 'Electrical Repair', 'Natural World', 'Psychology', 'Language (Own)', 'Ride'] }), theme: t_western, nationalities: n_western, decades: d_western, items: ip_western, equipmentKits: ek_western, wealthData: w_western, pdfFieldMap: p_western, experiencePackages: xp_western, talents: talents_western },
    // Modern occupations inherit 1920s + include modern additions (e.g., Hacker)
    'modern-2000s': { occupations: resolveOccs('modern-2000s', { base: 'classic-1920s', includeNames: ['Hacker'] }), skills: resolveSkills('modern-2000s', { base: 'classic-1920s', includeNames: ['Computer Use', 'Electronics'] }), theme: t_modern, nationalities: n_modern, decades: d_modern, items: ip_modern, equipmentKits: ek_modern, wealthData: w_modern, pdfFieldMap: p_modern },
};
