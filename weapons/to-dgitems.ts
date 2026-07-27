import type { DGItem, EraID } from '../types';
import { normalizeItemName } from '../utils';

type WeaponRec = {
  name: string;
  skill: string;
  specialization: string | null;
  damage: string;
  base_range: string;
  base_range_yards: number | null;
  uses_per_round: string;
  uses_per_round_int: number | null;
  mag: string;
  mag_int: number | null;
  cost: { c1920s?: number | null; modern?: number | null; gaslight?: number | null; darkAges?: number | null };
  malfunction: string;
  eras: string[];
  category: string;
  source: { book: string; page: number | null };
  impale?: boolean;
  min_str_dex?: string | null;
  hands?: string;
  length?: string | null;
};

type ShieldRec = {
  name: string;
  armor: string;
  damage: string;
  min_str_dex: string | null;
  cost: { darkAges: number | null };
  category: string;
};

type ArmorRec = {
  name: string;
  armor: string;
  rounds_to_don: number | null;
  cost: { darkAges: number | null };
  category: string;
};

const weaponsCache = new Map<EraID, DGItem[]>();
const weaponsInflight = new Map<EraID, Promise<DGItem[]>>();

function formatPrice(n: number | null): string {
  if (n == null) return '-';
  return `$${n.toFixed(2)}`;
}

function normalizeWeaponSectionName(raw: string): string {
  let s = raw
    .replace(/^Table\s+XVII:\s+Weapons\s+[^\w]*\s*/i, '')
    .trim();
  s = s
    .replace(/^00\s+Weapons\s+[^\w]*\s*/i, '')
    .trim();
  s = s.replace(/\s*\([ivxIVX]+\)\s*$/i, '').trim();
  s = s.replace(/\*+\s*$/i, '').trim();
  s = s.replace(/\s*\([ivxIVX]+\)\s*$/i, '').trim();
  return s || 'Misc';
}

function mapWeaponToDGItem(w: WeaponRec, era: '1920s' | 'modern' | 'gaslight' | 'darkAges'): DGItem {
  const section = normalizeWeaponSectionName(w.category);
  const skill = w.skill + (w.specialization ? ` (${w.specialization})` : '');
  const range = w.base_range_yards != null ? `${w.base_range_yards} yd` : (w.base_range || '-');
  const rof = w.uses_per_round_int != null ? String(w.uses_per_round_int) : (w.uses_per_round || '-');
  const mag = w.mag_int != null ? String(w.mag_int) : (w.mag || '-');
  let price: string;
  if (era === 'gaslight' || era === 'darkAges') {
    const pence = era === 'gaslight' ? w.cost.gaslight : w.cost.darkAges;
    if (pence == null) {
      price = '-';
    } else {
      price = `${pence}d`;
    }
  } else {
    price = era === 'modern' ? formatPrice(w.cost.modern ?? null) : formatPrice(w.cost.c1920s ?? null);
  }
  const item: DGItem = {
    section,
    name: normalizeItemName(w.name),
    price,
    sourceType: 'core',
    sourceName: w.source?.book || 'Call of Cthulhu 7th Edition Core Rulebook',
    sourcePage: w.source?.page ?? null,
    skill,
    damage: w.damage,
    range,
    uses: rof,
    ammoCapacity: mag,
    armorPiercing: w.malfunction || '-',
  } as DGItem;

  if (era === 'darkAges' && 'impale' in w && 'hands' in w && 'length' in w && 'min_str_dex' in w) {
    item.impale = w.impale;
    item.hands = w.hands || undefined;
    item.length = w.length || undefined;
    item.minStrDex = w.min_str_dex || undefined;
  }

  return item;
}

function mapShieldToDGItem(s: ShieldRec): DGItem {
  const pence = s.cost.darkAges;
  const price = pence == null ? '-' : `${pence}d`;

  const item: DGItem = {
    section: 'Shields',
    name: normalizeItemName(s.name),
    price,
    sourceType: 'core',
    sourceName: 'Call of Cthulhu Dark Ages',
    sourcePage: null,
    damage: s.damage,
    armorPiercing: s.armor,
    description: s.min_str_dex ? `Min STR/DEX: ${s.min_str_dex}` : undefined,
  } as DGItem;
  return item;
}

function mapArmorToDGItem(a: ArmorRec): DGItem {
  const pence = a.cost.darkAges;
  const price = pence == null ? '-' : `${pence}d`;

  const roundsText = a.rounds_to_don != null ? `${a.rounds_to_don}` : '-';
  const item: DGItem = {
    section: 'Armor',
    name: normalizeItemName(a.name),
    price,
    sourceType: 'core',
    sourceName: 'Call of Cthulhu Dark Ages',
    sourcePage: null,
    armorPiercing: a.armor,
    uses: roundsText,
    description: a.rounds_to_don != null ? `Takes ${a.rounds_to_don} round${a.rounds_to_don !== 1 ? 's' : ''} to don` : undefined,
  } as DGItem;
  return item;
}

async function buildWeaponsForEra(eraId: EraID): Promise<DGItem[]> {
  if (eraId === 'western-1880s') {
    const mod = await import('../eras/western-1870s/weapons-data');
    return (mod.WEAPONS_WESTERN_1870S as WeaponRec[]).map(w => mapWeaponToDGItem(w, '1920s'));
  }
  if (eraId === 'gaslight-1890s') {
    const mod = await import('../eras/gaslight-1890s/weapons-data');
    return (mod.WEAPONS_GASLIGHT as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'gaslight'));
  }
  if (eraId === 'dark-ages-1000s') {
    const mod = await import('../eras/dark-ages-1000s/weapons-data');
    const weapons = (mod.WEAPONS_DARK_AGES as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'darkAges'));
    const shields = mod.SHIELDS_DARK_AGES.map(s => mapShieldToDGItem(s));
    const armor = mod.ARMOR_DARK_AGES.map(a => mapArmorToDGItem(a));
    return [...weapons, ...shields, ...armor];
  }
  if (eraId === 'classic-1920s' || eraId === 'pulp-1930s' || eraId === 'campfire-tales') {
    const mod = await import('../eras/classic-1920s/weapons-data');
    return (mod.WEAPONS_1920S as WeaponRec[]).map(w => mapWeaponToDGItem(w, '1920s'));
  }
  if (eraId === 'regency') {
    const mod = await import('../eras/regency/weapons-data');
    return mod.WEAPONS_REGENCY as DGItem[];
  }
  if (eraId === 'modern-2000s') {
    const mod = await import('../eras/modern-2000s/weapons-data');
    return (mod.WEAPONS_MODERN as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'modern'));
  }
  // Default: classic 1920s weapons
  const mod = await import('../eras/classic-1920s/weapons-data');
  return (mod.WEAPONS_1920S as WeaponRec[]).map(w => mapWeaponToDGItem(w, '1920s'));
}

/** Async weapons loader with session cache. */
export async function loadWeaponsForEra(eraId: EraID): Promise<DGItem[]> {
  const id = (eraId || 'classic-1920s') as EraID;
  if (weaponsCache.has(id)) return weaponsCache.get(id)!;
  const inflight = weaponsInflight.get(id);
  if (inflight) return inflight;
  const promise = buildWeaponsForEra(id)
    .then(items => {
      weaponsCache.set(id, items);
      weaponsInflight.delete(id);
      return items;
    })
    .catch(err => {
      weaponsInflight.delete(id);
      throw err;
    });
  weaponsInflight.set(id, promise);
  return promise;
}

/**
 * Sync accessor for cached weapons only.
 * Prefer `loadWeaponsForEra` / aggregated data in UI code.
 */
export function getWeaponsForEra(eraId: EraID): DGItem[] {
  return weaponsCache.get(eraId) || [];
}
