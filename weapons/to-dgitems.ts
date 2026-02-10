import type { DGItem, EraID } from '../types';
import { normalizeItemName } from '../utils';
import { WEAPONS_MODERN } from '../eras/modern-2000s/weapons-data';
import { WEAPONS_1920S } from '../eras/classic-1920s/weapons-data';
import { WEAPONS_WESTERN_1870S } from '../eras/western-1870s/weapons-data';
import { WEAPONS_GASLIGHT } from '../eras/gaslight-1890s/weapons-data';
import { WEAPONS_DARK_AGES, SHIELDS_DARK_AGES, ARMOR_DARK_AGES } from '../eras/dark-ages-1000s/weapons-data';

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

function formatPrice(n: number | null): string {
  if (n == null) return '-';
  return `$${n.toFixed(2)}`;
}

function normalizeWeaponSectionName(raw: string): string {
  // Remove table prefix and any dash-like separator
  let s = raw
    .replace(/^Table\s+XVII:\s+Weapons\s+[^\w]*\s*/i, '')
    .trim();
  // Remove any legacy added prefix if present
  s = s
    .replace(/^00\s+Weapons\s+[^\w]*\s*/i, '')
    .trim();
  // Strip trailing table legends like (i), (ii), etc.
  s = s.replace(/\s*\([ivxIVX]+\)\s*$/i, '').trim();
  // Strip trailing asterisks used as footnote markers
  s = s.replace(/\*+\s*$/i, '').trim();
  // In case asterisks followed legends (e.g., "Handguns (i)*"), strip legends again
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
    // Gaslight and Dark Ages use pence, format simply as "Xd"
    const pence = era === 'gaslight' ? w.cost.gaslight : w.cost.darkAges;
    if (pence == null) {
      price = '-';
    } else {
      price = `${pence}d`;
    }
  } else {
    price = era === 'modern' ? formatPrice(w.cost.modern) : formatPrice(w.cost.c1920s);
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

  // Add Dark Ages specific properties
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

  // Shields have: Armor, Bash Damage, STR/DEX requirement, Cost
  // Use armorPiercing for Armor value, damage for bash damage
  const item: DGItem = {
    section: 'Shields',
    name: normalizeItemName(s.name),
    price,
    sourceType: 'core',
    sourceName: 'Call of Cthulhu Dark Ages',
    sourcePage: null,
    damage: s.damage, // Shield bash damage
    armorPiercing: s.armor, // Shield armor value (displayed as "AP")
    description: s.min_str_dex ? `Min STR/DEX: ${s.min_str_dex}` : undefined,
  } as DGItem;
  return item;
}

function mapArmorToDGItem(a: ArmorRec): DGItem {
  const pence = a.cost.darkAges;
  const price = pence == null ? '-' : `${pence}d`;

  // Armor has: Armor value and Rounds to don
  // Use armorPiercing for Armor value, uses for rounds to don
  const roundsText = a.rounds_to_don != null ? `${a.rounds_to_don}` : '-';
  const item: DGItem = {
    section: 'Armor',
    name: normalizeItemName(a.name),
    price,
    sourceType: 'core',
    sourceName: 'Call of Cthulhu Dark Ages',
    sourcePage: null,
    armorPiercing: a.armor, // Armor value (displayed as "AP")
    uses: roundsText, // Rounds to don (displayed as "Uses")
    description: a.rounds_to_don != null ? `Takes ${a.rounds_to_don} round${a.rounds_to_don !== 1 ? 's' : ''} to don` : undefined,
  } as DGItem;
  return item;
}

export function getWeaponsForEra(eraId: EraID): DGItem[] {
  if (eraId === 'western-1870s' || eraId === 'western-1880s') {
    // Use dedicated Western set; do NOT include standard 1920s weapons
    return (WEAPONS_WESTERN_1870S as WeaponRec[]).map(w => mapWeaponToDGItem(w, '1920s'));
  }
  if (eraId === 'gaslight-1890s') {
    // Use dedicated Gaslight weapons with Victorian pricing
    return (WEAPONS_GASLIGHT as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'gaslight'));
  }
  if (eraId === 'dark-ages-1000s') {
    // Use dedicated Dark Ages weapons with medieval pricing (in pence)
    const weapons = (WEAPONS_DARK_AGES as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'darkAges'));
    const shields = SHIELDS_DARK_AGES.map(s => mapShieldToDGItem(s));
    const armor = ARMOR_DARK_AGES.map(a => mapArmorToDGItem(a));
    return [...weapons, ...shields, ...armor];
  }
  if (eraId === 'classic-1920s' || eraId === 'pulp-1930s') {
    return (WEAPONS_1920S as WeaponRec[]).map(w => mapWeaponToDGItem(w, '1920s'));
  }
  if (eraId === 'modern-2000s') {
    return (WEAPONS_MODERN as WeaponRec[]).map(w => mapWeaponToDGItem(w, 'modern'));
  }
  return [];
}
