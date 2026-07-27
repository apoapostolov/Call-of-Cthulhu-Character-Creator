/**
 * Lazy era data loader.
 *
 * Each era's occupations/skills/prices are dynamic-imported only when that era
 * (or a dependent base era) is requested. Results are cached for the session.
 */
import type {
  EraID,
  Occupation,
  Skill,
  ThemeConfig,
  WeightedNationality,
  DecadeConfig,
  DGItem,
  EquipmentKit,
  EraWealthData,
} from '../types';
import { normalizeItemName } from '../utils';
import { loadWeaponsForEra } from '../weapons/to-dgitems';

export interface EraData {
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

type InheritRule = {
  base?: EraID;
  excludeNames?: string[];
  includeNames?: string[];
  transforms?: string[];
  creditRatingOverrides?: boolean;
};

const eraCache = new Map<EraID, EraData>();
const eraInflight = new Map<EraID, Promise<EraData>>();

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

function filterByName<T extends { name: string }>(list: T[], names?: string[], invert = false): T[] {
  if (!names || names.length === 0) return invert ? [] : list;
  const set = new Set(names);
  return list.filter(x => (invert ? set.has(x.name) : !set.has(x.name)));
}

function roundToNickel(cents: number): number {
  return Math.round(cents / 5) * 5;
}
function toCentsFromDollarStr(s: string): number | null {
  const m = s.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/);
  return m ? Math.round(parseFloat(m[1]) * 100) : null;
}
function toCentsFromCentStr(s: string): number | null {
  const m = s.match(/([0-9]+)\s*¢/);
  return m ? parseInt(m[1], 10) : null;
}
function formatCents(c: number): string {
  return c < 100 ? `${c}¢` : `$${(c / 100).toFixed(2)}`;
}
function adjustPriceTextInflate(
  s: string | undefined,
  fallbackCents: number | null | undefined,
  factor: number,
): { priceText?: string; priceCents?: number | null } {
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
    return {
      priceText: `${formatCents(Math.min(aAdj, bAdj))}-${formatCents(Math.max(aAdj, bAdj))}`,
      priceCents: null,
    };
  }
  const dollars = toCentsFromDollarStr(str);
  if (dollars != null) {
    const adj = roundToNickel(Math.round(dollars * factor));
    return { priceText: formatCents(adj), priceCents: adj };
  }
  const cents = toCentsFromCentStr(str);
  if (cents != null) {
    const adj = roundToNickel(Math.round(cents * factor));
    return { priceText: formatCents(adj), priceCents: adj };
  }
  const base = typeof fallbackCents === 'number' ? fallbackCents : null;
  const adj = base != null ? roundToNickel(Math.max(1, Math.round(base * factor))) : null;
  return adj != null ? { priceText: formatCents(adj), priceCents: adj } : { priceText: str, priceCents: null };
}

const PRICE_TRANSFORMS: Record<string, (items: any[]) => any[]> = {
  inflate1936: (items: any[]) => {
    const factor = 0.82;
    return items.map(it => ({
      ...it,
      ...adjustPriceTextInflate(it.priceText, it.priceCents, factor),
    }));
  },
};

function applyPriceTransforms(items: any[], transforms?: string[]): any[] {
  if (!transforms || transforms.length === 0) return items;
  return transforms.reduce((acc, t) => (PRICE_TRANSFORMS[t] ? PRICE_TRANSFORMS[t](acc) : acc), items);
}

function mapPriceItemsToDG(items: any[]): DGItem[] {
  return items.map(
    it =>
      ({
        section: it.section || 'Miscellaneous',
        name: normalizeItemName(it.name),
        description: it.description || undefined,
        price:
          it.priceText ||
          (typeof it.priceCents === 'number' ? `$${(it.priceCents / 100).toFixed(2)}` : undefined),
        sourceType: it.sourceType || 'core',
        sourceName: it.sourceName || null,
        sourcePage: it.sourcePage ?? null,
      }) as DGItem,
  );
}

function resolveOccs(
  eraId: EraID,
  rawByEra: Record<string, Occupation[]>,
  rule?: InheritRule,
  creditOverride?: (name: string) => { min: number; max: number } | undefined,
): Occupation[] {
  const raw = (rawByEra[eraId] || []).map(o => ({ ...o, eraId }));
  if (!rule || !rule.base) return raw;
  const base = (rawByEra[rule.base] || []).map(o => ({ ...o, eraId: rule.base }));
  let baseFiltered = filterByName(base, rule.excludeNames);
  if (rule.creditRatingOverrides && creditOverride) {
    baseFiltered = baseFiltered.map(occupation => {
      const override = creditOverride(occupation.name);
      if (override) {
        return {
          ...occupation,
          creditRatingRange: { min: override.min, max: override.max },
        };
      }
      return occupation;
    });
  }
  const byName = new Map<string, Occupation>();
  baseFiltered.forEach(o => byName.set(o.name, o));
  const additions =
    rule.includeNames && rule.includeNames.length > 0
      ? filterByName(raw, rule.includeNames, true)
      : raw;
  additions.forEach(o => {
    const existed = byName.has(o.name);
    byName.set(o.name, { ...o, isNew: !existed });
  });
  return Array.from(byName.values());
}

function resolveSkills(
  eraId: EraID,
  rawByEra: Record<string, Skill[]>,
  rule?: InheritRule,
): Skill[] {
  const raw = rawByEra[eraId] || [];
  if (!rule || !rule.base) return raw;
  const base = rawByEra[rule.base] || [];
  const baseFiltered = filterByName(base, rule.excludeNames);
  const additions = filterByName(raw, rule.includeNames, true);
  return mergeUniqueByName(baseFiltered, additions);
}

async function loadClassicPriceRaw(): Promise<any[]> {
  const [official, homebrew] = await Promise.all([
    import('./classic-1920s/prices-official'),
    import('./classic-1920s/prices-homebrew'),
  ]);
  return [...(official.PRICES_OFFICIAL as any[]), ...(homebrew.PRICES_HOMEBREW as any[])];
}

async function buildClassic1920s(): Promise<EraData> {
  const [
    occupations,
    skills,
    theme,
    nationalities,
    decades,
    items,
    kits,
    wealth,
    pdf,
  ] = await Promise.all([
    import('./classic-1920s/occupations-data'),
    import('./classic-1920s/skills-data'),
    import('./classic-1920s/theme'),
    import('./classic-1920s/nationality-data'),
    import('./classic-1920s/decades-data'),
    import('./classic-1920s/items-from-prices'),
    import('./classic-1920s/equipment-kits'),
    import('./classic-1920s/prices-data'),
    import('./classic-1920s/pdf-form-fields'),
  ]);
  return {
    occupations: resolveOccs('classic-1920s', { 'classic-1920s': occupations.OCCUPATIONS }),
    skills: resolveSkills('classic-1920s', { 'classic-1920s': skills.SKILLS }),
    theme: theme.THEME,
    nationalities: nationalities.NATIONALITIES,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
  };
}

async function buildPulp1930s(): Promise<EraData> {
  const [classic, occs, skills, theme, nats, decades, kits, wealth, pdf, talents, archetypes, rawPrices] =
    await Promise.all([
      loadEraData('classic-1920s'),
      import('./pulp-1930s/occupations-data'),
      import('./pulp-1930s/skills-data'),
      import('./pulp-1930s/theme'),
      import('./pulp-1930s/nationality-data'),
      import('./pulp-1930s/decades-data'),
      import('./pulp-1930s/equipment-kits'),
      import('./pulp-1930s/prices-data'),
      import('./pulp-1930s/pdf-form-fields'),
      import('./pulp-1930s/talents-data'),
      import('./pulp-1930s/archetypes-data'),
      loadClassicPriceRaw(),
    ]);
  const rawOccs = {
    'classic-1920s': classic.occupations.map(o => ({ ...o, eraId: 'classic-1920s' as EraID })),
    'pulp-1930s': occs.OCCUPATIONS,
  };
  const rawSkills = {
    'classic-1920s': classic.skills,
    'pulp-1930s': skills.SKILLS,
  };
  return {
    occupations: resolveOccs('pulp-1930s', rawOccs, { base: 'classic-1920s' }),
    skills: resolveSkills('pulp-1930s', rawSkills, {
      base: 'classic-1920s',
      excludeNames: [],
      includeNames: ['Hypnosis'],
    }),
    theme: theme.THEME,
    nationalities: nats.NATIONALITIES,
    decades: decades.DECADES,
    items: mapPriceItemsToDG(applyPriceTransforms(rawPrices, ['inflate1936'])),
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
    talents: talents.TALENTS,
    archetypes: archetypes.ARCHETYPES,
  };
}

async function buildModern2000s(): Promise<EraData> {
  const [classic, occs, skills, theme, nats, decades, items, kits, wealth, pdf] = await Promise.all([
    loadEraData('classic-1920s'),
    import('./modern-2000s/occupations-data'),
    import('./modern-2000s/skills-data'),
    import('./modern-2000s/theme'),
    import('./modern-2000s/nationality-data'),
    import('./modern-2000s/decades-data'),
    import('./modern-2000s/items-from-prices'),
    import('./modern-2000s/equipment-kits'),
    import('./modern-2000s/prices-data'),
    import('./modern-2000s/pdf-form-fields'),
  ]);
  const rawOccs = {
    'classic-1920s': classic.occupations,
    'modern-2000s': occs.OCCUPATIONS,
  };
  const rawSkills = {
    'classic-1920s': classic.skills,
    'modern-2000s': skills.SKILLS,
  };
  return {
    occupations: resolveOccs('modern-2000s', rawOccs, {
      base: 'classic-1920s',
      includeNames: ['Hacker'],
    }),
    skills: resolveSkills('modern-2000s', rawSkills, {
      base: 'classic-1920s',
      includeNames: ['Computer Use', 'Electronics'],
    }),
    theme: theme.THEME,
    nationalities: nats.NATIONALITIES,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
  };
}

async function buildGaslight1890s(): Promise<EraData> {
  const [classic, occs, skills, theme, nats, decades, items, kits, wealth, pdf, talents, credit] =
    await Promise.all([
      loadEraData('classic-1920s'),
      import('./gaslight-1890s/occupations-data'),
      import('./gaslight-1890s/skills-data'),
      import('./gaslight-1890s/theme'),
      import('./gaslight-1890s/nationality-data'),
      import('./gaslight-1890s/decades-data'),
      import('./gaslight-1890s/items-from-prices'),
      import('./gaslight-1890s/equipment-kits'),
      import('./gaslight-1890s/prices-data'),
      import('./gaslight-1890s/pdf-form-fields'),
      import('./gaslight-1890s/talents-data'),
      import('./gaslight-1890s/credit-rating-overrides'),
    ]);
  const rawOccs = {
    'classic-1920s': classic.occupations,
    'gaslight-1890s': occs.OCCUPATIONS,
  };
  return {
    occupations: resolveOccs(
      'gaslight-1890s',
      rawOccs,
      { base: 'classic-1920s', creditRatingOverrides: true },
      credit.getCreditRatingOverride,
    ),
    skills: skills.SKILLS,
    theme: theme.THEME,
    nationalities: nats.NATIONALITIES,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
    talents: talents.TALENTS,
  };
}

async function buildDarkAges(): Promise<EraData> {
  const [occs, skills, theme, nats, decades, items, kits, wealth, pdf, life] = await Promise.all([
    import('./dark-ages-1000s/occupations-data'),
    import('./dark-ages-1000s/skills-data'),
    import('./dark-ages-1000s/theme'),
    import('./dark-ages-1000s/nationality-data'),
    import('./dark-ages-1000s/decades-data'),
    import('./dark-ages-1000s/items-from-prices'),
    import('./dark-ages-1000s/equipment-kits'),
    import('./dark-ages-1000s/prices-data'),
    import('./dark-ages-1000s/pdf-form-fields'),
    import('./dark-ages-1000s/lifeevents-data'),
  ]);
  return {
    occupations: occs.OCCUPATIONS,
    skills: skills.SKILLS,
    theme: theme.THEME,
    nationalities: nats.NATIONALITIES,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
    lifeEvents: life.LIFE_EVENTS,
  };
}

async function buildWestern(): Promise<EraData> {
  const [classic, occs, skills, theme, nats, decades, items, kits, wealth, pdf, xp, talents] =
    await Promise.all([
      loadEraData('classic-1920s'),
      import('./western-1870s/occupations-data'),
      import('./western-1870s/skills-data'),
      import('./western-1870s/theme'),
      import('./western-1870s/nationality-data'),
      import('./western-1870s/decades-data'),
      import('./western-1870s/items-from-prices'),
      import('./western-1870s/equipment-kits'),
      import('./western-1870s/prices-data'),
      import('./western-1870s/pdf-form-fields'),
      import('./western-1870s/experience-packages-data'),
      import('./western-1870s/talents-data'),
    ]);
  const rawSkills = {
    'classic-1920s': classic.skills,
    'western-1880s': skills.SKILLS,
  };
  return {
    occupations: occs.OCCUPATIONS,
    skills: resolveSkills('western-1880s', rawSkills, {
      base: 'classic-1920s',
      includeNames: [
        'Drive Wagon/Coach',
        'Electrical Repair',
        'Natural World',
        'Psychology',
        'Language (Own)',
        'Ride',
        'Gambling',
        'Language (Indian)',
        'Rope Use',
        'Trap',
      ],
      excludeNames: [
        'Drive Auto',
        'Electrical Repair',
        'Natural World',
        'Psychology',
        'Language (Own)',
        'Ride',
      ],
    }),
    theme: theme.THEME,
    nationalities: nats.NATIONALITIES,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
    experiencePackages: xp.EXPERIENCE_PACKAGES,
    talents: talents.TALENTS,
  };
}

async function buildRegency(): Promise<EraData> {
  const [classic, occs, skills, theme, decades, items, kits, wealth, pdf] = await Promise.all([
    loadEraData('classic-1920s'),
    import('./regency/occupations-data'),
    import('./regency/skills-data'),
    import('./regency/theme'),
    import('./regency/decades-data'),
    import('./regency/items-from-prices'),
    import('./regency/equipment-kits'),
    import('./regency/prices-data'),
    import('./regency/pdf-form-fields'),
  ]);
  return {
    occupations: occs.OCCUPATIONS,
    skills: skills.SKILLS,
    theme: theme.THEME,
    nationalities: classic.nationalities,
    decades: decades.DECADES,
    items: items.ITEMS_FROM_PRICES,
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: wealth.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
  };
}

async function buildCampfire(): Promise<EraData> {
  const [classic, occs, skills, theme, decades, kits, prices, pdf, rawPrices] = await Promise.all([
    loadEraData('classic-1920s'),
    import('./campfire-tales/hobbies-data'),
    import('./campfire-tales/skills-data'),
    import('./campfire-tales/theme'),
    import('./campfire-tales/decades-data'),
    import('./campfire-tales/equipment-kits'),
    import('./campfire-tales/prices-data'),
    import('./campfire-tales/pdf-form-fields'),
    loadClassicPriceRaw(),
  ]);
  const inheritedPrices = mapPriceItemsToDG(rawPrices);
  return {
    occupations: resolveOccs('campfire-tales', { 'campfire-tales': occs.OCCUPATIONS }),
    skills: resolveSkills('campfire-tales', { 'campfire-tales': skills.SKILLS }),
    theme: theme.THEME,
    nationalities: classic.nationalities,
    decades: decades.DECADES,
    items: mergeUniqueByName(inheritedPrices, prices.SCOUT_PRICE_ITEMS),
    equipmentKits: kits.EQUIPMENT_KITS,
    wealthData: prices.WEALTH_DATA,
    pdfFieldMap: pdf.PDF_FIELD_MAP,
  };
}

async function buildEra(eraId: EraID): Promise<EraData> {
  switch (eraId) {
    case 'classic-1920s':
      return buildClassic1920s();
    case 'pulp-1930s':
      return buildPulp1930s();
    case 'modern-2000s':
      return buildModern2000s();
    case 'gaslight-1890s':
      return buildGaslight1890s();
    case 'dark-ages-1000s':
      return buildDarkAges();
    case 'western-1880s':
      return buildWestern();
    case 'regency':
      return buildRegency();
    case 'campfire-tales':
      return buildCampfire();
    default:
      return buildClassic1920s();
  }
}

/** Load and cache era data (idempotent; concurrent callers share one promise). */
export async function loadEraData(eraId: EraID): Promise<EraData> {
  const id = (eraId || 'classic-1920s') as EraID;
  if (eraCache.has(id)) return eraCache.get(id)!;
  const inflight = eraInflight.get(id);
  if (inflight) return inflight;

  const promise = buildEra(id)
    .then(data => {
      eraCache.set(id, data);
      eraInflight.delete(id);
      return data;
    })
    .catch(err => {
      eraInflight.delete(id);
      throw err;
    });
  eraInflight.set(id, promise);
  return promise;
}

export function getCachedEraData(eraId: EraID): EraData | null {
  return eraCache.get(eraId) || null;
}

/** Test helper: load several eras and return a Record like the old thirdPartyData. */
export async function loadEraDataMap(ids: EraID[]): Promise<Record<EraID, EraData>> {
  const entries = await Promise.all(ids.map(async id => [id, await loadEraData(id)] as const));
  return Object.fromEntries(entries) as Record<EraID, EraData>;
}

/** Merge weapons into era items (used by aggregated view). */
export async function loadEraDataWithWeapons(eraId: EraID): Promise<EraData & { weapons: DGItem[] }> {
  const [data, weapons] = await Promise.all([loadEraData(eraId), loadWeaponsForEra(eraId)]);
  return { ...data, weapons };
}
