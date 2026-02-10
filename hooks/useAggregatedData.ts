import { useMemo } from 'react';
import type { Occupation, Skill, ThemeConfig, EraID, Nationality, WeightedNationality, DecadeConfig, DGItem, EquipmentKit, EraWealthData, ExperiencePackage, Talent, Archetype, LifeEvent } from '../types';
import { thirdPartyData } from '../eras/manifest';
import { getWeaponsForEra } from '../weapons/to-dgitems';
import { SKILL_SPECIALIZATIONS } from '../skill-specializations-data';

export interface AggregatedData {
    OCCUPATIONS: Occupation[];
    SKILLS: Skill[];
    ITEMS: DGItem[];
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
}

export const useAggregatedData = (selectedEra: EraID): AggregatedData => {
    const aggregatedData = useMemo(() => {
        const eraData = thirdPartyData[selectedEra] || thirdPartyData['classic-1920s']; // Fallback to default
        
        const weaponItems = getWeaponsForEra(selectedEra);
        // De-duplicate by section+name to avoid collisions between sources
        const mergeItems = (arr: DGItem[]) => {
            const seen = new Set<string>();
            const out: DGItem[] = [];
            for (const it of arr) {
                const key = `${it.section || ''}::${it.name}`;
                if (seen.has(key)) continue;
                seen.add(key);
                out.push(it);
            }
            return out;
        };
        return {
            OCCUPATIONS: eraData.occupations,
            SKILLS: eraData.skills,
            ITEMS: mergeItems([...weaponItems, ...eraData.items]),
            EQUIPMENT_KITS: eraData.equipmentKits,
            WEIGHTED_NATIONALITIES: eraData.nationalities,
            // Order nationalities by descending weight for dropdown ranking
            NATIONALITIES: [...new Set(
                eraData.nationalities
                    .slice()
                    .sort((a, b) => (b.weight ?? 0) - (a.weight ?? 0))
                    .map(n => n.name)
            )],
            THEME: eraData.theme,
            DECADES: eraData.decades,
            WEALTH_DATA: eraData.wealthData,
            PDF_FIELD_MAP: eraData.pdfFieldMap,
            EXPERIENCE_PACKAGES: (eraData as any).experiencePackages || [],
            TALENTS: (eraData as any).talents || [],
            ARCHETYPES: (eraData as any).archetypes || [],
            LIFE_EVENTS: (eraData as any).lifeEvents || [],
            // Global Data
            SKILL_SPECIALIZATIONS: SKILL_SPECIALIZATIONS,
        };
    }, [selectedEra]);

    return aggregatedData;
};
