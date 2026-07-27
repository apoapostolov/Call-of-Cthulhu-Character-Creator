import { useEffect, useMemo, useState } from 'react';
import type {
  Occupation,
  Skill,
  ThemeConfig,
  EraID,
  Nationality,
  WeightedNationality,
  DecadeConfig,
  DGItem,
  EquipmentKit,
  EraWealthData,
  ExperiencePackage,
  Talent,
  Archetype,
  LifeEvent,
} from '../types';
import { loadEraData } from '../eras/load-era';
import { loadWeaponsForEra } from '../weapons/to-dgitems';
import { SKILL_SPECIALIZATIONS } from '../data/skill-specializations-data';

export interface AggregatedData {
  OCCUPATIONS: Occupation[];
  SKILLS: Skill[];
  ITEMS: DGItem[];
  /** Price/catalog items only (no weapons). */
  PRICE_ITEMS: DGItem[];
  /** Weapons/armor for the active era. */
  WEAPON_ITEMS: DGItem[];
  /** Classic 1920s weapons (Campfire "all" equipment subtab). */
  CLASSIC_WEAPON_ITEMS: DGItem[];
  /** Classic 1920s price items (Campfire inheritance view). */
  CLASSIC_PRICE_ITEMS: DGItem[];
  EQUIPMENT_KITS: EquipmentKit[];
  WEIGHTED_NATIONALITIES: WeightedNationality[];
  NATIONALITIES: Nationality[];
  THEME: ThemeConfig;
  DECADES: DecadeConfig[];
  WEALTH_DATA: EraWealthData;
  SKILL_SPECIALIZATIONS: Record<string, string[]>;
  PDF_FIELD_MAP: any;
  EXPERIENCE_PACKAGES?: ExperiencePackage[];
  TALENTS?: Talent[];
  ARCHETYPES?: Archetype[];
  LIFE_EVENTS?: LifeEvent[];
  isLoading: boolean;
  loadError: string | null;
}

const EMPTY_THEME: ThemeConfig = {
  displayName: 'Loading…',
  themeClass: '',
  portrait: {
    theme: '',
    setting: '',
    atmosphere: '',
    visualStyle: '',
    additionalDetails: '',
  },
  name: { promptDescription: '' },
};

const EMPTY_WEALTH: EraWealthData = {
  levels: [],
};

function mergeItems(arr: DGItem[]): DGItem[] {
  const seen = new Set<string>();
  const out: DGItem[] = [];
  for (const it of arr) {
    const key = `${it.section || ''}::${it.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(it);
  }
  return out;
}

const EMPTY_AGGREGATED: AggregatedData = {
  OCCUPATIONS: [],
  SKILLS: [],
  ITEMS: [],
  PRICE_ITEMS: [],
  WEAPON_ITEMS: [],
  CLASSIC_WEAPON_ITEMS: [],
  CLASSIC_PRICE_ITEMS: [],
  EQUIPMENT_KITS: [],
  WEIGHTED_NATIONALITIES: [],
  NATIONALITIES: [],
  THEME: EMPTY_THEME,
  DECADES: [],
  WEALTH_DATA: EMPTY_WEALTH,
  SKILL_SPECIALIZATIONS: SKILL_SPECIALIZATIONS,
  PDF_FIELD_MAP: {},
  EXPERIENCE_PACKAGES: [],
  TALENTS: [],
  ARCHETYPES: [],
  LIFE_EVENTS: [],
  isLoading: true,
  loadError: null,
};

export const useAggregatedData = (selectedEra: EraID): AggregatedData => {
  const [payload, setPayload] = useState<AggregatedData>(EMPTY_AGGREGATED);
  const [loadedEra, setLoadedEra] = useState<EraID | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPayload(prev => ({ ...prev, isLoading: true, loadError: null }));

    (async () => {
      try {
        const needsClassicExtras =
          selectedEra === 'campfire-tales' || selectedEra === 'pulp-1930s';

        const [eraData, weapons, regencySpecs, classicBundle] = await Promise.all([
          loadEraData(selectedEra),
          loadWeaponsForEra(selectedEra),
          selectedEra === 'regency'
            ? import('../eras/regency/skill-specializations-data').then(m => m.SKILL_SPECIALIZATIONS)
            : Promise.resolve(SKILL_SPECIALIZATIONS),
          needsClassicExtras || selectedEra === 'campfire-tales'
            ? Promise.all([loadEraData('classic-1920s'), loadWeaponsForEra('classic-1920s')])
            : Promise.resolve(null as null | [Awaited<ReturnType<typeof loadEraData>>, DGItem[]]),
        ]);

        if (cancelled) return;

        const classicPrice = classicBundle?.[0]?.items ?? [];
        const classicWeapons = classicBundle?.[1] ?? [];

        const priceItems = eraData.items || [];
        const items = mergeItems([...weapons, ...priceItems]);

        setPayload({
          OCCUPATIONS: eraData.occupations,
          SKILLS: eraData.skills,
          ITEMS: items,
          PRICE_ITEMS: priceItems,
          WEAPON_ITEMS: weapons,
          CLASSIC_WEAPON_ITEMS: classicWeapons,
          CLASSIC_PRICE_ITEMS: classicPrice,
          EQUIPMENT_KITS: eraData.equipmentKits,
          WEIGHTED_NATIONALITIES: eraData.nationalities,
          NATIONALITIES: [
            ...new Set(
              eraData.nationalities
                .slice()
                .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
                .map(n => n.name),
            ),
          ],
          THEME: eraData.theme,
          DECADES: eraData.decades,
          WEALTH_DATA: eraData.wealthData,
          PDF_FIELD_MAP: eraData.pdfFieldMap,
          EXPERIENCE_PACKAGES: eraData.experiencePackages || [],
          TALENTS: eraData.talents || [],
          ARCHETYPES: eraData.archetypes || [],
          LIFE_EVENTS: eraData.lifeEvents || [],
          SKILL_SPECIALIZATIONS: regencySpecs,
          isLoading: false,
          loadError: null,
        });
        setLoadedEra(selectedEra);
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setPayload(prev => ({
          ...prev,
          isLoading: false,
          loadError: message || 'Failed to load era data',
        }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedEra]);

  // While a new era is loading, keep showing previous data if era id matches, else empty+loading
  return useMemo(() => {
    if (payload.isLoading && loadedEra !== selectedEra) {
      return { ...EMPTY_AGGREGATED, isLoading: true, loadError: payload.loadError };
    }
    return payload;
  }, [payload, loadedEra, selectedEra]);
};
