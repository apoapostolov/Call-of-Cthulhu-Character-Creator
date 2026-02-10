import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useEraContext } from '../context/SourceContext';
import { parsePriceToCents } from '../utils/money';
import type { Occupation, AttributeSet, Attribute, ToastType, DGItem, Skill, AgeCategory, ExperiencePackage, ExperienceNote, Talent, Archetype } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { useAIGeneration } from './useAIGeneration';
import { parseSkillPointFormula } from '../utils';
import { AGE_CATEGORIES } from '../age.config';

const roll3d6 = () => Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
const roll2d6plus6 = () => Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + 6;
// Pulp core characteristic roll: (1d6 + 13) × 5
const roll1d6plus13x5 = () => (Math.floor(Math.random() * 6) + 1 + 13) * 5;

const getDamageBonusAndBuild = (str: number, siz: number): { damageBonus: string, build: number } => {
    const total = str + siz;
    if (total <= 64) return { damageBonus: '-2', build: -2 };
    if (total <= 84) return { damageBonus: '-1', build: -1 };
    if (total <= 124) return { damageBonus: 'None', build: 0 };
    if (total <= 164) return { damageBonus: '+1D4', build: 1 };
    if (total <= 204) return { damageBonus: '+1D6', build: 2 };
    if (total <= 284) return { damageBonus: '+2D6', build: 3 };
    if (total <= 364) return { damageBonus: '+3D6', build: 4 };
    if (total <= 444) return { damageBonus: '+4D6', build: 5 };
    return { damageBonus: '+5D6', build: 6 };
};

type SkillPointAssignments = Record<string, { occupational: number; personal: number; experience?: number; archetype?: number }>;

export const useCharacter = (setToastMessage: (msg: string | null, type?: ToastType) => void, aggregatedData: AggregatedData) => {
    const { selectedEra } = useEraContext();
    const [baseAttributes, setBaseAttributes] = useState<AttributeSet | null>(null);
    const [modifiedAttributes, setModifiedAttributes] = useState<AttributeSet | null>(null);
    const [selectedOccupation, setSelectedOccupation] = useState<Occupation | null>(null);
    const [rollHistory, setRollHistory] = useState<AttributeSet[]>([]);
    
    // Age-related state
    const [selectedAgeCategory, setSelectedAgeCategory] = useState<AgeCategory | null>(null);
    const [ageDeductions, setAgeDeductions] = useState<{ required: number; applied: Record<string, number> }>({ required: 0, applied: {} });
    const [persistentAgeDeductions, setPersistentAgeDeductions] = useState<Record<string, number>>({});
    const [eduImprovementRolls, setEduImprovementRolls] = useState<number[]>([]);
    const [youthLuckApplied, setYouthLuckApplied] = useState(false);
    
    const [activeKitName, setActiveKitName] = useState<string | null>(null);
    const [kitInventory, setKitInventory] = useState<DGItem[]>([]);
    const [inventory, setInventory] = useState<DGItem[]>([]);
    const [originalBaseLuck, setOriginalBaseLuck] = useState<number | null>(null);
    // Wealth state (in cents)
    const [wealth, setWealth] = useState<{ dailyCash: number; totalCash: number; assets: number } | null>(null);
    // Track cash debited per item for refund on removal
    const [purchaseLedger, setPurchaseLedger] = useState<Record<string, number>>({});

    const [skillPointAssignments, setSkillPointAssignments] = useState<SkillPointAssignments>({});
    const [userCreatedSkills, setUserCreatedSkills] = useState<Skill[]>([]);
    const [activeSkillPool, setActiveSkillPool] = useState<'archetype' | 'occupational' | 'personal' | 'experience'>('occupational');
    const [occupationSkillChoices, setOccupationSkillChoices] = useState<Record<number, string[]>>({});

    // Experience package state (era-dependent)
    const [selectedExperiencePackage, setSelectedExperiencePackage] = useState<ExperiencePackage | null>(null);
    const [experienceSanPenalty, setExperienceSanPenalty] = useState<number>(0);
    const [experienceRollCache, setExperienceRollCache] = useState<Record<string, { sanPenalty?: number }>>({});
    const [experienceNotes, setExperienceNotes] = useState<ExperienceNote[]>([]);
    const [experienceEligibleSkills, setExperienceEligibleSkills] = useState<Set<string>>(new Set());
    const [persistedExperiencePackageKey, setPersistedExperiencePackageKey] = useState<string | null>(null);
    // Occupation notes (specials)
    const [occupationNotes, setOccupationNotes] = useState<ExperienceNote[]>([]);
    // Archetype state (Pulp 1930s)
    const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
    const [archetypeEligibleSkills, setArchetypeEligibleSkills] = useState<Set<string>>(new Set());
    const [archetypePoints, setArchetypePoints] = useState<{ total: number; spent: number; remaining: number; formula: string; calculation: string } | null>(null);
    const [archetypeCoreChoice, setArchetypeCoreChoice] = useState<Attribute | null>(null);
    // Persisted core characteristic rolls across selections/era switches (per-attribute)
    const [coreCharacteristicRolls, setCoreCharacteristicRolls] = useState<Partial<Record<Attribute, number>>>({});
    // Track original base values for any core characteristics we replace so we can restore when leaving Pulp / deselecting archetype
    const [originalCoreBaseValues, setOriginalCoreBaseValues] = useState<Partial<Record<Attribute, number>>>({});
    // Optional Rules state (per toggle id) — placed early for availability
    const [optionalRules, setOptionalRules] = useState<Record<string, boolean>>({});
    const setOptionalRuleEnabled = useCallback((id: string, enabled: boolean) => {
        setOptionalRules(prev => ({ ...prev, [id]: enabled }));
    }, []);
    // Pulp rules + Talents state
    const [pulpRulesEnabled, setPulpRulesEnabled] = useState<boolean>(false);
    const [selectedTalents, setSelectedTalents] = useState<string[]>([]);
    // Life Events state (Dark Ages)
    const [rolledLifeEvents, setRolledLifeEvents] = useState<any[]>([]);
    const [lifeEventModifiers, setLifeEventModifiers] = useState<{
        attributes: Partial<Record<Attribute, number>>;
        derivedStats: Partial<Record<'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK', number>>;
        skills: Record<string, number>;
    }>({ attributes: {}, derivedStats: {}, skills: {} });
    // Max talents per era (default 3), can be overridden by Archetype rules
    const maxTalents = useMemo(() => {
        const isPulpEra = selectedEra === 'pulp-1930s';
        const isGaslightEra = selectedEra === 'gaslight-1890s';
        const eraDefault = (isPulpEra || isGaslightEra || selectedEra === 'western-1870s' || selectedEra === 'western-1880s') ? 2 : 3;
        let limit = typeof selectedArchetype?.talentRules?.limit === 'number' ? (selectedArchetype!.talentRules!.limit as number) : eraDefault;
        // Pulp 1930s: Hardboiled optional rule reduces max talents by 1 (e.g., 2 -> 1)
        const hardboiled = isPulpEra && !!optionalRules['pulp-increased-hp'];
        if (hardboiled) {
            limit = Math.max(0, limit - 1);
        }
        return limit;
    }, [selectedEra, selectedArchetype, optionalRules]);
    const toggleTalent = useCallback((name: string) => {
        setSelectedTalents(prev => prev.includes(name) ? prev.filter(n => n !== name) : (prev.length >= maxTalents ? prev : [...prev, name]));
    }, [maxTalents]);
    const randomizeTalentFrom = useCallback((list: Talent[]) => {
        const pool = list.filter(t => !selectedTalents.includes(t.name));
        if (pool.length === 0) return null;
        const pick = pool[Math.floor(Math.random() * pool.length)].name;
        setSelectedTalents(prev => prev.length >= maxTalents ? prev : [...prev, pick]);
        return pick;
    }, [selectedTalents, maxTalents]);

    // Ensure we never exceed the current era's limit
    useEffect(() => {
        setSelectedTalents(prev => {
            if (prev.length <= maxTalents) return prev;
            // Trim by removing the most recently added talents first (end of array is the last-selected)
            return prev.slice(0, maxTalents);
        });
    }, [maxTalents]);

    // Life Events: Calculate event count based on age
    const lifeEventCount = useMemo(() => {
        if (!selectedAgeCategory) return 1; // Default to 1
        const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);
        if (!ageConfig) return 1;
        
        // Youth (15-19) and Adult (20-39) get 1 event
        // Each bracket above Adult adds 1 more
        const ageIndex = AGE_CATEGORIES.findIndex(c => c.label === selectedAgeCategory);
        if (ageIndex <= 1) return 1; // Youth or Adult
        return ageIndex; // Middle Age = 2, Experienced = 3, etc.
    }, [selectedAgeCategory]);

    // Roll life events
    const handleRollLifeEvents = useCallback(() => {
        const availableEvents = aggregatedData.LIFE_EVENTS || [];
        if (availableEvents.length === 0) return;
        
        const rollD20 = () => Math.floor(Math.random() * 20) + 1;
        const events: any[] = [];
        const usedRolls = new Set<number>();
        const modifiers: { 
            attributes: Partial<Record<Attribute, number>>; 
            derivedStats: Partial<Record<'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK', number>>;
            skills: Record<string, number> 
        } = {
            attributes: {},
            derivedStats: {},
            skills: {}
        };
        
        const rollEvent = (excludeRolls: Set<number>) => {
            // Try up to 100 times to find an unused event
            for (let attempts = 0; attempts < 100; attempts++) {
                const roll = rollD20() + rollD20(); // 2d20
                if (excludeRolls.has(roll)) continue;
                
                const event = availableEvents.find(e => e.roll === roll);
                if (!event) continue;
                
                // Mark this roll as used
                excludeRolls.add(roll);
                
                // Apply modifiers
                if (event.modifiers.attributes) {
                    Object.entries(event.modifiers.attributes).forEach(([attr, value]) => {
                        if (value !== undefined && typeof value === 'number') {
                            modifiers.attributes[attr as Attribute] = (modifiers.attributes[attr as Attribute] || 0) + value;
                        }
                    });
                }
                if (event.modifiers.derivedStats) {
                    Object.entries(event.modifiers.derivedStats).forEach(([stat, value]) => {
                        if (value !== undefined && typeof value === 'number') {
                            modifiers.derivedStats[stat as 'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK'] = 
                                (modifiers.derivedStats[stat as 'HP' | 'SAN' | 'MP' | 'MOV' | 'LUCK'] || 0) + value;
                        }
                    });
                }
                if (event.modifiers.skills) {
                    Object.entries(event.modifiers.skills).forEach(([skill, value]) => {
                        if (typeof value === 'number') {
                            modifiers.skills[skill] = (modifiers.skills[skill] || 0) + value;
                        }
                    });
                }
                
                return event;
            }
            return null;
        };
        
        let eventsToRoll = lifeEventCount;
        while (eventsToRoll > 0) {
            const event = rollEvent(usedRolls);
            if (event) {
                // Check for roll-twice special - if found, replace this event with 2 new ones
                if (event.special === 'roll-twice') {
                    // Roll two additional events instead of keeping the "roll-twice" event
                    eventsToRoll += 2; // Add 2 more to roll (will decrement 1 at end of loop)
                    // Don't add the roll-twice event itself to the results
                } else {
                    events.push(event);
                }
            }
            eventsToRoll--;
        }
        
        setRolledLifeEvents(events);
        setLifeEventModifiers(modifiers);
    }, [aggregatedData.LIFE_EVENTS, lifeEventCount]);

    // Handle life event specialization selection
    const handleLifeEventSpecialization = useCallback((eventIndex: number, skillName: string, specialization: string) => {
        setRolledLifeEvents(prev => {
            const updated = [...prev];
            if (updated[eventIndex]) {
                updated[eventIndex] = {
                    ...updated[eventIndex],
                    selectedSpecialization: specialization
                };
            }
            return updated;
        });

        // Update skill modifiers to include the specialized skill
        setLifeEventModifiers(prev => {
            const fullSkillName = `${skillName} (${specialization})`;
            return {
                ...prev,
                skills: {
                    ...prev.skills,
                    [fullSkillName]: (prev.skills[fullSkillName] || 0) + 10
                }
            };
        });
    }, []);

    // (moved optional rules above)

    // Persist optional rules by era
    const OPTIONAL_RULES_STORAGE_KEY = 'optionalRulesByEra';
    // Load when era changes
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(OPTIONAL_RULES_STORAGE_KEY);
            if (raw) {
                const map = JSON.parse(raw) as Record<string, Record<string, boolean>>;
                setOptionalRules(map[selectedEra] || {});
            } else {
                setOptionalRules({});
            }
        } catch {
            setOptionalRules({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEra]);
    // Save on change
    useEffect(() => {
        try {
            const raw = window.localStorage.getItem(OPTIONAL_RULES_STORAGE_KEY);
            const map = raw ? (JSON.parse(raw) as Record<string, Record<string, boolean>>) : {};
            map[selectedEra] = optionalRules || {};
            window.localStorage.setItem(OPTIONAL_RULES_STORAGE_KEY, JSON.stringify(map));
        } catch {
            // ignore storage failures
        }
    }, [optionalRules, selectedEra]);

    // --- Luck persistence per era ---
    const LUCK_BY_ERA_STORAGE_KEY = 'luckByEra';
    const persistLuckForEra = useCallback((eraId: string, luck: number) => {
        try {
            const raw = window.localStorage.getItem(LUCK_BY_ERA_STORAGE_KEY);
            const map = raw ? (JSON.parse(raw) as Record<string, number>) : {};
            map[eraId] = luck;
            window.localStorage.setItem(LUCK_BY_ERA_STORAGE_KEY, JSON.stringify(map));
        } catch {
            // ignore storage failures
        }
    }, []);
    const readPersistedLuckForEra = useCallback((eraId: string): number | null => {
        try {
            const raw = window.localStorage.getItem(LUCK_BY_ERA_STORAGE_KEY);
            if (!raw) return null;
            const map = JSON.parse(raw) as Record<string, number>;
            const v = map[eraId];
            return (typeof v === 'number' && v > 0) ? v : null;
        } catch {
            return null;
        }
    }, []);

    // When era changes, if a Luck value was persisted for that era, apply it to base attributes
    useEffect(() => {
        const stored = readPersistedLuckForEra(selectedEra);
        if (stored != null) {
            setBaseAttributes(prev => prev ? { ...prev, LUCK: stored } : prev);
            setOriginalBaseLuck(stored);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedEra]);

    useEffect(() => {
        if (!baseAttributes) {
            setModifiedAttributes(null);
            return;
        }

        let tempAttrs = { ...baseAttributes };
        const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);

        if (ageConfig) {
            // Apply automatic penalties
            tempAttrs.APP -= ageConfig.appPenalty;
            tempAttrs.EDU -= ageConfig.eduPenalty;
            
            // Apply manual deductions
            for (const attr in ageDeductions.applied) {
                const deduction = ageDeductions.applied[attr];
                tempAttrs[attr as keyof AttributeSet] -= deduction;
            }

            // Apply EDU gains
            const checksAvailable = ageConfig.eduChecks;
            const applicableGains = eduImprovementRolls.slice(0, checksAvailable);
            const totalGain = applicableGains.reduce<number>((sum, roll) => sum + roll, 0);
            tempAttrs.EDU += totalGain;
            tempAttrs.EDU = Math.min(99, tempAttrs.EDU);
        }

        // Ensure stats don't drop below 1
        for (const key in tempAttrs) {
            const attrKey = key as keyof AttributeSet;
            if (tempAttrs[attrKey] < 1) {
                tempAttrs[attrKey] = 1;
            }
        }

        // Apply Archetype core characteristic effect (Pulp era only)
        const isPulpEra = (selectedEra === 'pulp-1930s');
        if (isPulpEra && selectedArchetype && archetypeCoreChoice) {
            const boosted = coreCharacteristicRolls[archetypeCoreChoice];
            if (typeof boosted === 'number' && boosted > (tempAttrs[archetypeCoreChoice] || 0)) {
                (tempAttrs as any)[archetypeCoreChoice] = boosted;
            }
        }

        // Apply Life Event modifiers (Dark Ages only)
        const isDarkAges = selectedEra === 'dark-ages-1000s';
        if (isDarkAges && lifeEventModifiers.attributes) {
            for (const attr in lifeEventModifiers.attributes) {
                const modifier = lifeEventModifiers.attributes[attr as Attribute];
                if (modifier && typeof modifier === 'number') {
                    tempAttrs[attr as keyof AttributeSet] += modifier;
                    // Ensure stats don't drop below 1 or exceed 99
                    tempAttrs[attr as keyof AttributeSet] = Math.max(1, Math.min(99, tempAttrs[attr as keyof AttributeSet]));
                }
            }
        }

        setModifiedAttributes(tempAttrs);

    }, [baseAttributes, selectedAgeCategory, ageDeductions, eduImprovementRolls, selectedEra, selectedArchetype, archetypeCoreChoice, coreCharacteristicRolls, lifeEventModifiers]);

    // When Archetype core is chosen, roll once per attribute and persist the result
    useEffect(() => {
        if (!selectedArchetype || !archetypeCoreChoice) return;
        setCoreCharacteristicRolls(prev => {
            if (prev[archetypeCoreChoice] != null) return prev;
            const roll = roll1d6plus13x5();
            return { ...prev, [archetypeCoreChoice]: roll };
        });
    }, [selectedArchetype, archetypeCoreChoice]);

    // Apply replacement of the base attribute with max(base, reroll) in Pulp era, and remember original for restoration
    useEffect(() => {
        if (!baseAttributes) return;
        const isPulpEra = (selectedEra === 'pulp-1930s');
        if (!isPulpEra || !selectedArchetype || !archetypeCoreChoice) return;

        const core = archetypeCoreChoice;
        const currentBase = baseAttributes[core];
        // Ensure we have a persisted roll (create if missing)
        let roll = coreCharacteristicRolls[core];
        if (roll == null) {
            const newRoll = roll1d6plus13x5();
            roll = newRoll;
            setCoreCharacteristicRolls(prev => (prev[core] == null ? { ...prev, [core]: newRoll } : prev));
        }
        const chosen = Math.max(currentBase, roll as number);

        // Save original base once
        setOriginalCoreBaseValues(prev => (prev[core] == null ? { ...prev, [core]: currentBase } : prev));
        // Apply to base if different
        if (currentBase !== chosen) {
            setBaseAttributes(prev => (prev ? { ...prev, [core]: chosen } : prev));
        }
    }, [baseAttributes, selectedEra, selectedArchetype, archetypeCoreChoice, coreCharacteristicRolls]);

    // Restore original base values when leaving Pulp or when archetype is cleared
    useEffect(() => {
        const isPulpEra = (selectedEra === 'pulp-1930s');
        const shouldRestore = !isPulpEra || !selectedArchetype;
        if (!shouldRestore) return;
        if (!baseAttributes) return;
        const keys = Object.keys(originalCoreBaseValues) as Attribute[];
        if (keys.length === 0) return;
        const restoreMap = keys.reduce<Partial<AttributeSet>>((acc, k) => {
            const val = originalCoreBaseValues[k];
            if (typeof val === 'number') acc[k] = val;
            return acc;
        }, {});
        // If there is anything to restore and values differ, set and clear originals
        const needsRestore = keys.some(k => typeof originalCoreBaseValues[k] === 'number' && baseAttributes[k] !== originalCoreBaseValues[k]);
        if (needsRestore) {
            setBaseAttributes(prev => (prev ? { ...prev, ...(restoreMap as AttributeSet) } : prev));
        }
        // Clear originals after attempting restore
        if (keys.length > 0) setOriginalCoreBaseValues({});
    }, [selectedEra, selectedArchetype, baseAttributes, originalCoreBaseValues]);

    // Provide UI-friendly info for tooltip/highlight
    const coreCharacteristicInfo = useMemo(() => {
        const isPulpEra = (selectedEra === 'pulp-1930s');
        if (!isPulpEra || !selectedArchetype || !archetypeCoreChoice) {
            return { attribute: null, active: false } as {
                attribute: Attribute | null; active: boolean; archetypeName?: string; roll?: number; originalBase?: number; boostedValue?: number;
            };
        }
        const attr = archetypeCoreChoice;
        const roll = coreCharacteristicRolls[attr];
        const originalBase = originalCoreBaseValues[attr];
        const boostedValue = modifiedAttributes ? modifiedAttributes[attr] : undefined;
        return {
            attribute: attr,
            active: true,
            archetypeName: selectedArchetype.name,
            roll,
            originalBase,
            boostedValue
        } as const;
    }, [selectedEra, selectedArchetype, archetypeCoreChoice, coreCharacteristicRolls, originalCoreBaseValues, modifiedAttributes]);

    const allSkillsWithCalculatedBases = useMemo(() => {
        const baseSkills = [...aggregatedData.SKILLS, ...userCreatedSkills];
        if (!modifiedAttributes) return baseSkills;

        return baseSkills.map(skill => {
            if (skill.name === 'Dodge') {
                return { ...skill, base: Math.floor(modifiedAttributes.DEX / 2) };
            }
            if (skill.name === 'Language (Own)') {
                return { ...skill, base: modifiedAttributes.EDU };
            }
            if (skill.name === 'Credit Rating') {
                return { ...skill, base: selectedOccupation?.creditRatingRange.min ?? 0 };
            }
            return skill;
        });
    }, [aggregatedData.SKILLS, userCreatedSkills, modifiedAttributes, selectedOccupation]);
    
    const allOccupationChoicesMade = useMemo(() => {
        if (!selectedOccupation?.choiceGroups) return true;
        return selectedOccupation.choiceGroups.every((group, index) => {
            return (occupationSkillChoices[index]?.length || 0) === group.count;
        });
    }, [selectedOccupation, occupationSkillChoices]);
    
    const effectiveOccupationalSkills = useMemo(() => {
        if (!selectedOccupation) return new Set<string>();
        const skills = new Set(selectedOccupation.occupationalSkills);
        Object.values(occupationSkillChoices).forEach((choices: string[]) => {
            choices.forEach(choice => skills.add(choice));
        });
        // Ensure Fighting (Brawl) is considered available anywhere Fighting is present
        if (skills.has('Fighting')) {
            skills.add('Fighting (Brawl)');
        }
        return skills;
    }, [selectedOccupation, occupationSkillChoices]);

    const occupationalSkillPoints = useMemo(() => {
        if (!selectedOccupation || !modifiedAttributes || !allOccupationChoicesMade) {
            return { total: 0, spent: 0, remaining: 0, formula: '', calculation: '' };
        }
        const { total, calculation } = parseSkillPointFormula(selectedOccupation.skillPoints, modifiedAttributes);
        const spent = Object.values(skillPointAssignments).reduce<number>((sum, s: { occupational: number; personal: number }) => sum + s.occupational, 0);
        return { total, spent, remaining: total - spent, formula: selectedOccupation.skillPoints, calculation };
    }, [selectedOccupation, modifiedAttributes, skillPointAssignments, allOccupationChoicesMade]);
    
    const personalSkillPoints = useMemo(() => {
        if (!modifiedAttributes) return { total: 0, spent: 0, remaining: 0, formula: 'INT × 2', calculation: '' };
        const total = modifiedAttributes.INT * 2;
        const spent = Object.values(skillPointAssignments).reduce<number>((sum, s: { occupational: number; personal: number }) => sum + s.personal, 0);
        const formula = 'INT × 2';
        const calculation = `INT (${modifiedAttributes.INT}) × 2 = ${total}`;
        return { total, spent, remaining: total - spent, formula, calculation };
    }, [modifiedAttributes, skillPointAssignments]);

    const skills = useMemo(() => {
        const result: Record<string, number> = {};
        allSkillsWithCalculatedBases.forEach(s => {
            const assignment = skillPointAssignments[s.name] || { occupational: 0, personal: 0, experience: 0 } as any;
            result[s.name] = s.base + assignment.occupational + assignment.personal + (assignment.experience || 0) + (assignment.archetype || 0);
        });
        // Ensure Fighting (Brawl) shows with the Fighting base if not explicitly present
        if (!result['Fighting (Brawl)']) {
            const baseFighting = allSkillsWithCalculatedBases.find(x => x.name === 'Fighting');
            if (baseFighting) {
                const assign = skillPointAssignments['Fighting (Brawl)'] || { occupational: 0, personal: 0, experience: 0, archetype: 0 } as any;
                result['Fighting (Brawl)'] = baseFighting.base + assign.occupational + assign.personal + (assign.experience || 0) + (assign.archetype || 0);
            }
        }
        return result;
    }, [allSkillsWithCalculatedBases, skillPointAssignments]);
    
    const derivedStats = useMemo(() => {
        if (!modifiedAttributes) return null;
        const { damageBonus, build } = getDamageBonusAndBuild(modifiedAttributes.STR, modifiedAttributes.SIZ);
        let mov = 8;
        if (modifiedAttributes.DEX < modifiedAttributes.SIZ && modifiedAttributes.STR < modifiedAttributes.SIZ) mov = 7;
        else if (modifiedAttributes.DEX > modifiedAttributes.SIZ && modifiedAttributes.STR > modifiedAttributes.SIZ) mov = 9;
        const baseSAN = modifiedAttributes.POW;
        const sanAfterPackage = Math.max(0, baseSAN - (experienceSanPenalty || 0));
        const isWesternEra = (selectedEra === 'western-1870s' || selectedEra === 'western-1880s');
        const isPulpEra = (selectedEra === 'pulp-1930s');
        const increasedHp = (isWesternEra && !!optionalRules['western-increased-hp']) || (isPulpEra && !!optionalRules['pulp-increased-hp']);
        
        // Apply Life Event modifiers to derived stats (Dark Ages only)
        const isDarkAges = selectedEra === 'dark-ages-1000s';
        const lifeEventMOV = isDarkAges ? (lifeEventModifiers.derivedStats?.MOV || 0) : 0;
        const lifeEventLUCK = isDarkAges ? (lifeEventModifiers.derivedStats?.LUCK || 0) : 0;
        const lifeEventHP = isDarkAges ? (lifeEventModifiers.derivedStats?.HP || 0) : 0;
        const lifeEventSAN = isDarkAges ? (lifeEventModifiers.derivedStats?.SAN || 0) : 0;
        const lifeEventMP = isDarkAges ? (lifeEventModifiers.derivedStats?.MP || 0) : 0;
        
        return {
            HP: Math.floor((modifiedAttributes.CON + modifiedAttributes.SIZ) / (increasedHp ? 5 : 10)) + lifeEventHP,
            MP: Math.floor(modifiedAttributes.POW / 5) + lifeEventMP,
            SAN: sanAfterPackage + lifeEventSAN,
            LUCK: modifiedAttributes.LUCK + lifeEventLUCK,
            DamageBonus: damageBonus,
            Build: build,
            MOV: mov + lifeEventMOV,
        };
    }, [modifiedAttributes, experienceSanPenalty, optionalRules, selectedEra, lifeEventModifiers]);
    
    const ai = useAIGeneration(
        selectedOccupation?.name || 'Investigator',
        selectedOccupation, null, modifiedAttributes, setToastMessage, aggregatedData, 
        skills, null, null, null
    );

    // When occupation changes, update occupation notes from any special and suggestedContacts
    useEffect(() => {
        const notes: ExperienceNote[] = [];
        if (selectedOccupation?.special) {
            // Parse gaslight occupation special text for social class and additional notes
            const specialText = selectedOccupation.special;
            
            // Extract social class (e.g., "**Working Class**:", "**Any Class**:")
            const socialClassMatch = specialText.match(/^\*\*([^*]+)\*\*:\s*/);
            if (socialClassMatch) {
                const socialClassName = socialClassMatch[1];
                const remainingText = specialText.replace(socialClassMatch[0], '');
                
                // Split by additional note patterns (e.g., "**Note**:", "**Note (Pulp Cthulhu)**:")
                const noteParts = remainingText.split(/(\*\*Note[^*]*\*\*:\s*)/);
                
                // First part is the social class description
                if (noteParts[0]?.trim()) {
                    notes.push({ 
                        name: socialClassName, 
                        description: noteParts[0].trim(), 
                        source: selectedOccupation.source || 'Social Class' 
                    });
                }
                
                // Process additional notes
                for (let i = 1; i < noteParts.length; i += 2) {
                    if (noteParts[i] && noteParts[i + 1]) {
                        const noteTitle = noteParts[i].replace(/^\*\*/, '').replace(/\*\*:\s*$/, '');
                        const noteDescription = noteParts[i + 1].trim();
                        if (noteDescription) {
                            notes.push({ 
                                name: noteTitle, 
                                description: noteDescription, 
                                source: selectedOccupation.source || 'Occupation Note' 
                            });
                        }
                    }
                }
            } else {
                // Fallback for occupations without social class format
                notes.push({ name: selectedOccupation.name, description: selectedOccupation.special, source: selectedOccupation.source || 'Occupation Special' });
            }
        }
        if (selectedOccupation?.suggestedContacts) {
            notes.push({ name: 'Suggested Contacts', description: selectedOccupation.suggestedContacts, source: selectedOccupation.source || 'Pulp 1930s' });
        }
        setOccupationNotes(notes);
    }, [selectedOccupation]);
    
    const handleOccupationSkillChoice = useCallback((groupIndex: number, skillName: string) => {
        setOccupationSkillChoices(prev => {
            const newChoicesForGroup = prev[groupIndex] ? [...prev[groupIndex]] : [];
            const choiceGroup = selectedOccupation?.choiceGroups?.[groupIndex];
            if (!choiceGroup) return prev;
            const isSelected = newChoicesForGroup.includes(skillName);
            if (isSelected) {
                return { ...prev, [groupIndex]: newChoicesForGroup.filter(s => s !== skillName) };
            } else if (newChoicesForGroup.length < choiceGroup.count) {
                return { ...prev, [groupIndex]: [...newChoicesForGroup, skillName] };
            }
            return prev;
        });

        const isAdding = !((occupationSkillChoices[groupIndex] || []).includes(skillName));
        if (isAdding && skillName.includes('(')) {
            const match = skillName.match(/(.+) \((\w+)\)$/);
            if (match) {
                const [, baseName, subType] = match;
                if (allSkillsWithCalculatedBases.some(s => s.name === skillName)) return;

                const parentSkill = aggregatedData.SKILLS.find(s => s.specialty && (s.name === baseName || s.stub === baseName));
                if (parentSkill) {
                    const newSkill: Skill = {
                        name: skillName,
                        base: parentSkill.base,
                        specialty: false,
                        shortName: subType,
                        description: parentSkill.description
                    };
                    setUserCreatedSkills(prev => [...prev, newSkill]);
                }
            }
        }
    }, [selectedOccupation, occupationSkillChoices, allSkillsWithCalculatedBases, aggregatedData.SKILLS]);

    // --- Experience Package integration ---
    const experiencePoints = useMemo(() => {
        const total = selectedExperiencePackage?.experiencePoints?.total ?? 0;
        if (total <= 0) return { total: 0, spent: 0, remaining: 0, formula: '', calculation: '', title: '' };
        const spent = Object.values(skillPointAssignments).reduce<number>((sum, s: { occupational: number; personal: number; experience?: number }) => sum + (s.experience || 0), 0);
        const elig = selectedExperiencePackage?.experiencePoints?.eligibleSkills || [];
        return {
            total,
            spent,
            remaining: Math.max(0, total - spent),
            formula: 'Experience Points',
            // Store only the list; the hover renderer will prepend a bold label
            calculation: elig.length ? elig.join(', ') : '',
            title: ''
        };
    }, [selectedExperiencePackage, skillPointAssignments]);

    const handleSkillPointChange = useCallback((skillName: string, amount: number) => {
        setSkillPointAssignments(prev => {
            const baseName = skillName.split(' (')[0];
            const isOccupationalSkill = effectiveOccupationalSkills.has(skillName) || effectiveOccupationalSkills.has(baseName);
            const current = prev[skillName] || { occupational: 0, personal: 0, experience: 0, archetype: 0 };
            let newOccupational = current.occupational;
            let newPersonal = current.personal;
            let newExperience = current.experience || 0;
            let newArchetype = current.archetype || 0;
            
            const baseSkill = allSkillsWithCalculatedBases.find(s => s.name === skillName);
            const baseSkillValue = baseSkill?.base ?? 0;
            // Determine cap: Use occupation's maximum credit rating, with fallbacks
            const occupationMaxCR = selectedOccupation?.creditRatingRange?.max ?? 0;
            // Fallback to traditional caps if no occupation or invalid CR max
            const isPulpEra = (selectedEra === 'pulp-1930s');
            const isGaslightEra = (selectedEra === 'gaslight-1890s');
            const traditionalCap = (pulpRulesEnabled || isPulpEra || isGaslightEra) ? 95 : 75;
            const cap = (occupationMaxCR > 0) ? occupationMaxCR : traditionalCap;

            if (amount > 0) {
                const maxAddable = cap - (baseSkillValue + newOccupational + newPersonal + newExperience + newArchetype);
                let remainingToAdd = Math.min(amount, maxAddable);
                if (remainingToAdd <= 0) return prev;

                if (activeSkillPool === 'occupational' && isOccupationalSkill && occupationalSkillPoints.remaining > 0) {
                    const toAdd = Math.min(remainingToAdd, occupationalSkillPoints.remaining);
                    newOccupational += toAdd;
                } else if (activeSkillPool === 'personal' && personalSkillPoints.remaining > 0 && baseName !== 'Cthulhu Mythos' && skillName !== 'Cthulhu Mythos') {
                    const toAdd = Math.min(remainingToAdd, personalSkillPoints.remaining);
                    newPersonal += toAdd;
                } else if (activeSkillPool === 'experience' && experiencePoints.remaining > 0 && (experienceEligibleSkills.has(skillName) || experienceEligibleSkills.has(baseName))) {
                    const toAdd = Math.min(remainingToAdd, experiencePoints.remaining);
                    newExperience += toAdd;
                } else if (activeSkillPool === 'archetype' && (archetypePoints?.remaining ?? 0) > 0 && (archetypeEligibleSkills.has(skillName) || archetypeEligibleSkills.has(baseName))) {
                    const toAdd = Math.min(remainingToAdd, archetypePoints!.remaining);
                    newArchetype += toAdd;
                }
            } else {
                let remainingToRemove = Math.abs(amount);
                const personalToRemove = Math.min(remainingToRemove, newPersonal);
                newPersonal -= personalToRemove;
                remainingToRemove -= personalToRemove;
                if (remainingToRemove > 0 && newArchetype > 0) {
                    const archToRemove = Math.min(remainingToRemove, newArchetype);
                    newArchetype -= archToRemove;
                    remainingToRemove -= archToRemove;
                }
                if (remainingToRemove > 0 && newExperience > 0) {
                    const expToRemove = Math.min(remainingToRemove, newExperience);
                    newExperience -= expToRemove;
                    remainingToRemove -= expToRemove;
                }
                if (remainingToRemove > 0 && newOccupational > 0) {
                    const occupationalToRemove = Math.min(remainingToRemove, newOccupational);
                    newOccupational -= occupationalToRemove;
                }
            }
            if ((newOccupational + newPersonal + newExperience + newArchetype) === 0) {
                const newAssignments = { ...prev };
                delete newAssignments[skillName];
                return newAssignments;
            }
            return { ...prev, [skillName]: { occupational: newOccupational, personal: newPersonal, experience: newExperience, archetype: newArchetype } };
        });
    }, [activeSkillPool, occupationalSkillPoints, personalSkillPoints, allSkillsWithCalculatedBases, effectiveOccupationalSkills, experiencePoints, experienceEligibleSkills, archetypePoints, archetypeEligibleSkills, pulpRulesEnabled, selectedEra]);
    
    // Compute archetype points remaining by summing allocations on eligible skills
    useEffect(() => {
        if (!selectedArchetype) { setArchetypePoints(null); return; }
        const total = selectedArchetype.pool.total;
        let spent = 0;
        const elig = archetypeEligibleSkills;
        for (const [name, a] of Object.entries(skillPointAssignments) as [string, { occupational: number; personal: number; experience?: number; archetype?: number } ][]) {
            const base = name.split(' (')[0];
            if (elig.has(name) || elig.has(base)) {
                spent += (a.archetype || 0);
            }
        }
    const remaining = Math.max(0, total - spent);
    // Provide a helpful tooltip listing eligible skills
    const calcList = Array.from(archetypeEligibleSkills).sort().join(', ');
    setArchetypePoints({ total, spent, remaining, formula: 'Archetype Points', calculation: calcList });
    }, [selectedArchetype, skillPointAssignments, archetypeEligibleSkills]);

    const handleSelectArchetype = useCallback((arch: Archetype | null) => {
        setSelectedArchetype(arch);
        if (!arch) {
            setArchetypeEligibleSkills(new Set());
            setArchetypeCoreChoice(null);
            setArchetypePoints(null);
            return;
        }
        // Normalize eligible skill names and stubs
        const norm = new Set<string>();
        for (const s of arch.pool.eligibleSkills) {
            const trimmed = s.trim();
            norm.add(trimmed);
            const base = trimmed.split(' (')[0].replace('Language Other', 'Language (Other)').trim();
            norm.add(base);
        }
        setArchetypeEligibleSkills(norm);
        setArchetypeCoreChoice(arch.coreCharacteristics.length === 1 ? arch.coreCharacteristics[0] : null);
    }, []);

    const handleSkillsReset = useCallback(() => {
        setSkillPointAssignments({});
        setUserCreatedSkills([]);
        setOccupationSkillChoices({});
        setActiveSkillPool('occupational');
    }, []);

    const handleAddSpecialization = useCallback((displayName: string, specializationBase: string, subType: string) => {
        const name = `${specializationBase} (${subType})`;
        if (userCreatedSkills.some(s => s.name === name) || aggregatedData.SKILLS.some(s => s.name === name)) {
            setToastMessage(`Specialization '${name}' already exists.`, 'warning');
            return;
        }
        const baseSkill = aggregatedData.SKILLS.find(s => s.name === displayName);
        const newSkill: Skill = {
            name, base: baseSkill?.base ?? 1, specialty: false, shortName: subType, description: baseSkill?.description
        };
        setUserCreatedSkills(prev => [...prev, newSkill]);
        
        // Migrate life event modifier from base skill to first specialization
        if (lifeEventModifiers.skills[displayName]) {
            const baseModifier = lifeEventModifiers.skills[displayName];
            // Check if this is the first specialization of this base skill
            const existingSpecializations = [...userCreatedSkills, ...aggregatedData.SKILLS]
                .filter(s => s.name.startsWith(`${specializationBase} (`));
            
            if (existingSpecializations.length === 0) {
                // This is the first specialization - migrate the modifier
                setLifeEventModifiers(prev => {
                    const newSkills = { ...prev.skills };
                    // Remove modifier from base skill
                    delete newSkills[displayName];
                    // Add modifier to specialized skill
                    newSkills[name] = baseModifier;
                    return { ...prev, skills: newSkills };
                });
                
                // Update rolled life events to reflect the migration
                setRolledLifeEvents(prev => prev.map(event => {
                    if (event.modifiers?.skills?.[displayName]) {
                        return {
                            ...event,
                            modifiers: {
                                ...event.modifiers,
                                skills: {
                                    ...event.modifiers.skills,
                                    [name]: event.modifiers.skills[displayName],
                                    [displayName]: undefined
                                }
                            }
                        };
                    }
                    return event;
                }));
            }
        }
    }, [userCreatedSkills, aggregatedData.SKILLS, setToastMessage, lifeEventModifiers]);

    const handleDeleteSpecialization = useCallback((skillName: string) => {
        setUserCreatedSkills(prev => prev.filter(s => s.name !== skillName));
        setSkillPointAssignments(prev => {
            const newAssignments = { ...prev };
            delete newAssignments[skillName];
            return newAssignments;
        });
    }, []);

    const aiReset = ai.reset;
    const reset = useCallback(() => {
        aiReset();
        setActiveKitName(null); setKitInventory([]); setInventory([]);
        setWealth(null); setPurchaseLedger({});
        handleSkillsReset();
        setSelectedTalents([]);
        setSelectedAgeCategory(null);
        setAgeDeductions({ required: 0, applied: {} });
        setPersistentAgeDeductions({});
        setEduImprovementRolls([]);
        setYouthLuckApplied(false);
        setOriginalBaseLuck(null);
        // Reset experience package state
        setSelectedExperiencePackage(null);
        setExperienceSanPenalty(0);
        setExperienceNotes([]);
        setExperienceEligibleSkills(new Set());
        // Archetype
        setSelectedArchetype(null);
        setArchetypeEligibleSkills(new Set());
        setArchetypePoints(null);
        setArchetypeCoreChoice(null);
        // Do not clear coreCharacteristicRolls here to persist across rerolls; only clear on full app reload
    }, [aiReset, handleSkillsReset]);

    const handleSelectAgeCategory = useCallback((category: AgeCategory | null) => {
        setSelectedAgeCategory(category);
        
        if (!baseAttributes) return;
        if (!category) {
            setAgeDeductions({ required: 0, applied: {} });
            return;
        }
    
        const config = AGE_CATEGORIES.find(c => c.label === category);
        if (!config) return;
        // If leaving Youth (no luck bonus), restore original base Luck if available
        if (!config.luckBonus && originalBaseLuck !== null) {
            setBaseAttributes(prev => prev ? { ...prev, LUCK: originalBaseLuck } : null);
        }
        
        const newApplied: Record<string, number> = {};
        let appliedCount = 0;
        const deductionPool = config.deductions.pool;
        
        for (const attr of deductionPool) {
            const persistentValue = persistentAgeDeductions[attr as keyof typeof persistentAgeDeductions] || 0;
            if (persistentValue > 0) {
                const canApply = Math.min(persistentValue, config.deductions.total - appliedCount);
                if (canApply > 0) {
                    newApplied[attr] = canApply;
                    appliedCount += canApply;
                }
            }
        }
        
        setAgeDeductions({ required: config.deductions.total, applied: newApplied });

        // Trigger Youth Luck reroll only once enough deductions are applied
        if (config.luckBonus && !youthLuckApplied) {
            const appliedSoFar = Object.values(newApplied).reduce<number>((sum, v: number) => sum + v, 0);
            if (appliedSoFar >= config.deductions.total) {
                const reroll = ((selectedEra === 'pulp-1930s' ? roll2d6plus6() : roll3d6()) * 5);
                const original = (originalBaseLuck ?? modifiedAttributes?.LUCK) || 0;
                const chosen = Math.max(original, reroll);
                setBaseAttributes(prev => (prev ? { ...prev, LUCK: chosen } : null));
                persistLuckForEra(selectedEra, chosen);
                setYouthLuckApplied(true);
                setToastMessage(`Youth Luck reroll: current ${original}, reroll ${reroll}; kept ${chosen}`, 'success');
            }
        }
    
        // If leaving Youth (no luck bonus), restore original base Luck if available
        if (!config.luckBonus && originalBaseLuck !== null) {
            setBaseAttributes(prev => prev ? { ...prev, LUCK: originalBaseLuck } : null);
            persistLuckForEra(selectedEra, originalBaseLuck);
        }

    }, [baseAttributes, youthLuckApplied, setToastMessage, persistentAgeDeductions, originalBaseLuck]);

    const handleRoll = useCallback(() => {
        if (baseAttributes) setRollHistory(prev => [baseAttributes, ...prev].slice(0, 9));
        reset();
        const rollLuckForEra = () => (selectedEra === 'pulp-1930s' ? roll2d6plus6() : roll3d6()) * 5;
        const newAttributes: AttributeSet = {
            STR: roll3d6() * 5, CON: roll3d6() * 5, DEX: roll3d6() * 5, APP: roll3d6() * 5, POW: roll3d6() * 5,
            LUCK: rollLuckForEra(), INT: roll2d6plus6() * 5, EDU: roll2d6plus6() * 5, SIZ: roll2d6plus6() * 5,
        };
        setBaseAttributes(newAttributes);
        setOriginalBaseLuck(newAttributes.LUCK);
        // Persist Luck for this era so switching away/back reuses it
        persistLuckForEra(selectedEra, newAttributes.LUCK);
        setSelectedOccupation(null);
        ai.onGenerateRandomNationality();
        handleSelectAgeCategory('20-39');
    }, [ai, baseAttributes, reset, handleSelectAgeCategory, persistLuckForEra, selectedEra]);

    const handleRestoreRoll = useCallback((rollToRestore: AttributeSet) => {
        reset();
        setBaseAttributes(rollToRestore);
        setOriginalBaseLuck(rollToRestore.LUCK);
        // Persist restored Luck for this era
        persistLuckForEra(selectedEra, rollToRestore.LUCK);
        setSelectedOccupation(null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setToastMessage("Restored previous characteristic roll.", 'success');
        handleSelectAgeCategory('20-39');
    }, [reset, setToastMessage, handleSelectAgeCategory, persistLuckForEra, selectedEra]);

    const handleAgeAttributeDeduct = useCallback((attr: 'STR' | 'CON' | 'DEX' | 'SIZ', action?: 'add' | 'remove') => {
        const totalApplied = Object.values(ageDeductions.applied).reduce<number>((sum, val: number) => sum + val, 0);
        const required = ageDeductions.required || 0;
        // Never allow adding beyond the requirement
        const isAddingDeduction = action
            ? (action === 'add' && totalApplied < required)
            : (totalApplied < required);

        if (isAddingDeduction) {
            if (modifiedAttributes && modifiedAttributes[attr] <= 1) {
                setToastMessage(`${attr} cannot be reduced below 1.`, 'warning');
                return;
            }
            const newAppliedValue = (ageDeductions.applied[attr] || 0) + 1;
            const nextTotalApplied = totalApplied + 1;

            setAgeDeductions(prev => ({
                ...prev,
                applied: {
                    ...prev.applied,
                    [attr]: newAppliedValue
                }
            }));
            setPersistentAgeDeductions(prev => ({
                ...prev,
                [attr]: Math.max(prev[attr] || 0, newAppliedValue)
            }));

            // If Youth category and deductions now satisfied, trigger reroll once
            const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);
            if (ageConfig?.luckBonus && !youthLuckApplied && nextTotalApplied >= required) {
                const reroll = ((selectedEra === 'pulp-1930s' ? roll2d6plus6() : roll3d6()) * 5);
                const original = (originalBaseLuck ?? modifiedAttributes?.LUCK) || 0;
                const chosen = Math.max(original, reroll);
                setBaseAttributes(prev => (prev ? { ...prev, LUCK: chosen } : null));
                persistLuckForEra(selectedEra, chosen);
                setYouthLuckApplied(true);
                setToastMessage(`Youth Luck reroll: current ${original}, reroll ${reroll}; kept ${chosen}`, 'success');
            }
        } else {
            // Return one point from this attribute if any applied
            const currentAppliedForAttr = ageDeductions.applied[attr] || 0;
            if (currentAppliedForAttr <= 0) return;
            const newAppliedValue = currentAppliedForAttr - 1;
            setAgeDeductions(prev => ({
                ...prev,
                applied: {
                    ...prev.applied,
                    [attr]: newAppliedValue
                }
            }));
            // If dropping below required and we had applied Youth luck, roll back
            const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);
            const nextTotalApplied = totalApplied - 1;
            if (ageConfig?.luckBonus && youthLuckApplied && nextTotalApplied < required) {
                setBaseAttributes(prev => (prev ? { ...prev, LUCK: (originalBaseLuck ?? prev.LUCK) } : null));
                setYouthLuckApplied(false);
                setToastMessage('Youth Luck bonus rolled back until requirements are met again.', 'info');
            }
        }

    }, [ageDeductions, setToastMessage, modifiedAttributes, selectedAgeCategory, youthLuckApplied, originalBaseLuck]);
    
    const handleEduImprovementCheck = useCallback(() => {
        if (!modifiedAttributes) return;
        
        const ageConfig = AGE_CATEGORIES.find(c => c.label === selectedAgeCategory);
        if (!ageConfig || eduImprovementRolls.length >= ageConfig.eduChecks) return;

        const roll = Math.floor(Math.random() * 100) + 1;
        const currentEdu = modifiedAttributes.EDU;
        
        if (roll > currentEdu) {
            const gain = Math.floor(Math.random() * 10) + 1;
            setEduImprovementRolls(prev => [...prev, gain]);
            setToastMessage(`EDU check succeeded! (+${gain} EDU)`, 'success');
        } else {
            setEduImprovementRolls(prev => [...prev, 0]);
            setToastMessage(`EDU check failed (rolled ${roll} vs ${currentEdu}).`, 'info');
        }
    }, [eduImprovementRolls, modifiedAttributes, selectedAgeCategory, setToastMessage]);

    const setOccupation = useCallback((occupationName: string) => {
        const occupation = aggregatedData.OCCUPATIONS.find(p => p.name === occupationName) || null;
        
        handleSkillsReset();
        ai.reset();
        setSelectedOccupation(occupation);
        setWealth(null); setPurchaseLedger({}); setInventory([]); setActiveKitName(null); setKitInventory([]);

        if (occupation) {
            const newSpecializations: Skill[] = [];
            const specializationStrings = occupation.occupationalSkills.filter(s => s.includes('('));
            
            specializationStrings.forEach(specString => {
                const match = specString.match(/(.+) \((\w+)\)$/);
                if (match) {
                    const [, baseName, subType] = match;
                    
                    const existingSkills = [...aggregatedData.SKILLS, ...newSpecializations];
                    if (existingSkills.some(s => s.name === specString)) return;

                    const parentSkill = aggregatedData.SKILLS.find(s => s.specialty && (s.name === baseName || s.stub === baseName));
                    if(parentSkill) {
                        const newSkill: Skill = {
                            name: specString,
                            base: parentSkill.base,
                            specialty: false,
                            shortName: subType,
                            description: parentSkill.description
                        };
                        newSpecializations.push(newSkill);
                    }
                }
            });

            if (newSpecializations.length > 0) {
                setUserCreatedSkills(prev => [...prev, ...newSpecializations]);
            }
        }
    }, [aggregatedData.OCCUPATIONS, aggregatedData.SKILLS, ai, handleSkillsReset]);

    // Reset wealth when era/wealth data changes
    useEffect(() => {
        setWealth(null);
    }, [aggregatedData.WEALTH_DATA]);

    // Initialize wealth from Credit Rating (or Status for Dark Ages)
    useEffect(() => {
        if (!wealth && selectedOccupation && modifiedAttributes) {
            // Dark Ages uses Status instead of Credit Rating
            const isDarkAges = selectedEra === 'dark-ages-1000s';
            const wealthSkillName = isDarkAges ? 'Status' : 'Credit Rating';
            
            const wealthSkillValue = ((): number => {
                const result: Record<string, number> = {} as any;
                allSkillsWithCalculatedBases.forEach(s => {
                    const assignment = (skillPointAssignments as any)[s.name] || { occupational: 0, personal: 0 };
                    result[s.name] = s.base + assignment.occupational + assignment.personal;
                });
                return result[wealthSkillName] || 0;
            })();
            const levels = aggregatedData.WEALTH_DATA?.levels || [];
            const level = levels.find(l => wealthSkillValue >= l.minCR && wealthSkillValue <= l.maxCR);
            if (level) {
                // For Dark Ages, values are already in pence (no conversion needed)
                // For other eras, multiply by 100 to convert to cents
                const multiplier = isDarkAges ? 1 : 100;
                const daily = Math.round((level.spendingLevel(wealthSkillValue) || 0) * multiplier);
                const cash = Math.round((level.cash(wealthSkillValue) || 0) * multiplier);
                const assetsVal = level.assets(wealthSkillValue);
                const assets = Math.round(((typeof assetsVal === 'number' ? assetsVal : 0) || 0) * multiplier);
                setWealth({ dailyCash: daily, totalCash: cash, assets });
            }
        }
    }, [wealth, selectedOccupation, modifiedAttributes, aggregatedData.WEALTH_DATA, allSkillsWithCalculatedBases, skillPointAssignments, selectedEra]);
    
    const setEquipmentKit = useCallback((kitName: string) => {
        const newKit = aggregatedData.EQUIPMENT_KITS.find(k => k.name === kitName);
        if (activeKitName === kitName) {
             setActiveKitName(null); setKitInventory([]);
        } else if (newKit) {
            const newKitItems = newKit.items.map(itemName => aggregatedData.ITEMS.find(i => i.name === itemName)).filter((item): item is DGItem => !!item);
            setActiveKitName(kitName); setKitInventory(newKitItems);
            setToastMessage(`Equipped ${newKit.name}.`, 'success');
        }
    }, [activeKitName, aggregatedData.EQUIPMENT_KITS, aggregatedData.ITEMS, setToastMessage]);

    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        const itemData = e.dataTransfer.getData("application/json");
        if (itemData) {
            const item: DGItem = JSON.parse(itemData);
            if (!inventory.some(i => i.name === item.name) && !kitInventory.some(i => i.name === item.name)) {
                // Determine price and apply purchasing rules
                let canAdd = true;
                let debit = 0; // cents to subtract from totalCash
                const cents = parsePriceToCents(item.price);
                const priceCents = cents ?? 0;
                if (wealth) {
                    if (priceCents <= wealth.dailyCash) {
                        // Free purchase, no debit
                    } else if (priceCents <= wealth.totalCash) {
                        debit = priceCents;
                    } else {
                        canAdd = false;
                        setToastMessage('Insufficient funds to purchase this item.', 'error');
                    }
                }

                if (canAdd) {
                    if (debit > 0 && wealth) {
                        setWealth(prev => prev ? { ...prev, totalCash: prev.totalCash - debit } : prev);
                        setPurchaseLedger(prev => ({ ...prev, [item.name]: debit }));
                    }
                    setInventory(prev => [...prev, item]);
                }
            }
        }
    }, [inventory, kitInventory, wealth]);

    const handleDeleteItem = useCallback((itemName: string) => {
        setInventory(prev => prev.filter(i => i.name !== itemName));
        // Refund any debited cash for this item
        setPurchaseLedger(prev => {
            const debit = prev[itemName] || 0;
            if (debit > 0) setWealth(w => w ? { ...w, totalCash: w.totalCash + debit } : w);
            const n = { ...prev }; delete n[itemName]; return n;
        });
    }, []);

    const handleAssignPrice = useCallback((itemName: string, newPriceText: string): boolean => {
        const newCents = parsePriceToCents(newPriceText);
        if (newCents == null || newCents < 0) {
            setToastMessage('Invalid price.', 'error');
            return false;
        }
        // Update wealth based on delta from previous debit
        const oldDebit = purchaseLedger[itemName] || 0;
        const daily = wealth?.dailyCash ?? 0;
        const requiredDebit = newCents <= daily ? 0 : newCents;
        const delta = requiredDebit - oldDebit;
        if (delta > 0) {
            // Need to spend more
            if (!wealth || wealth.totalCash < delta) {
                setToastMessage('Insufficient funds to pay the updated price.', 'error');
                return false;
            }
            setWealth(prev => prev ? { ...prev, totalCash: prev.totalCash - delta } : prev);
        } else if (delta < 0) {
            // Refund the difference
            setWealth(prev => prev ? { ...prev, totalCash: prev.totalCash + (-delta) } : prev);
        }
        // Update ledger entry
        setPurchaseLedger(prev => ({ ...prev, [itemName]: requiredDebit }));
        // Update inventory item's displayed price
        setInventory(prev => prev.map(i => i.name === itemName ? { ...i, price: newPriceText } : i));
        setToastMessage('Price updated.', 'success');
        return true;
    }, [wealth, purchaseLedger, setToastMessage]);

    const convertAssetsToCash = useCallback((amountCents: number) => {
        if (!wealth || amountCents <= 0) return false;
        if (amountCents > wealth.assets) return false;
        setWealth(prev => prev ? { dailyCash: prev.dailyCash, totalCash: prev.totalCash + amountCents, assets: prev.assets - amountCents } : prev);
        return true;
    }, [wealth]);

    const handleSelectExperiencePackage = useCallback((pkg: ExperiencePackage | null) => {
        setSelectedExperiencePackage(pkg);
        setExperienceNotes(pkg?.modifies?.notes || []);
        // Eligible skills (normalize names and base stubs for specialties)
        const rawElig = pkg?.experiencePoints?.eligibleSkills || [];
        const normSet = new Set<string>();
        rawElig.forEach((name) => {
            if (!name) return;
            const trimmed = String(name).trim();
            normSet.add(trimmed);
            const base = trimmed.split(' (')[0].trim();
            normSet.add(base);
        });
        setExperienceEligibleSkills(normSet);
        // Persist the chosen package key (stub or name) across era switches; clear when deselecting
        const keyForPkg = pkg ? ((((pkg as any).stub) as string) || pkg.name) : null;
        setPersistedExperiencePackageKey(keyForPkg);
        // Roll SAN penalty if specified like '-(1D10+5)'; persist first roll per package key (stub or name)
        let penalty = 0;
        const sanMod = pkg?.modifies?.derived?.SAN;
        if (pkg && sanMod && /1D10\s*\+\s*5/i.test(sanMod)) {
            const key = (((pkg as any).stub as string) || pkg.name);
            const cached = experienceRollCache[key]?.sanPenalty;
            if (typeof cached === 'number') {
                penalty = cached;
            } else {
                const roll = (Math.floor(Math.random() * 10) + 1) + 5; // 1..10 + 5
                penalty = roll;
                setExperienceRollCache(prev => ({ ...prev, [key]: { ...(prev[key] || {}), sanPenalty: roll } }));
            }
        }
        setExperienceSanPenalty(penalty);

        // Adjust DOB for Civil War Experience only when in eras that support packages
        if (pkg?.name && pkg.name.toLowerCase().includes('civil war')) {
            try {
                // Pick an enlistment age 17-30 at 1861, set DOB accordingly
                const enlistAge = 17 + Math.floor(Math.random() * 14); // 17..30
                const birthYear = 1861 - enlistAge;
                const month = Math.floor(Math.random() * 12) + 1;
                const day = Math.floor(Math.random() * 28) + 1;
                const dob = `${birthYear}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
                ai.setDobFromCareer(dob);
            } catch {}
        }
        setActiveSkillPool('experience');
    }, [ai]);

    // Disable experience package effects if current era has no packages; re-enable if returning
    useEffect(() => {
        const hasPackages = (aggregatedData.EXPERIENCE_PACKAGES || []).length > 0;
        const available = (aggregatedData.EXPERIENCE_PACKAGES || []);
        if (!hasPackages && (selectedExperiencePackage || experienceSanPenalty || experienceNotes.length > 0)) {
            // Clear
            setSelectedExperiencePackage(null);
            setExperienceSanPenalty(0);
            setExperienceNotes([]);
            setExperienceEligibleSkills(new Set());
            // Also clear any experience allocations
            setSkillPointAssignments(prev => {
                const out: SkillPointAssignments = {} as any;
                const entries = Object.entries(prev) as [string, { occupational: number; personal: number; experience?: number }][];
                for (const [k, v] of entries) {
                    if ((v.experience || 0) > 0 || v.occupational > 0 || v.personal > 0) {
                        out[k] = { occupational: v.occupational, personal: v.personal };
                    }
                }
                return out;
            });
            if (activeSkillPool === 'experience') setActiveSkillPool('occupational');
        } else if (hasPackages) {
            // Attempt to re-apply previously selected package (by stub or name) if present
            const currentKey = ((((selectedExperiencePackage as any)?.stub) as string) || selectedExperiencePackage?.name) || null;
            const targetKey = currentKey || persistedExperiencePackageKey;
            if (targetKey) {
                const match = available.find(p => ((((p as any).stub) as string) || p.name) === targetKey);
                if (match && (!selectedExperiencePackage || ((((selectedExperiencePackage as any).stub) as string) || selectedExperiencePackage.name) !== targetKey)) {
                    handleSelectExperiencePackage(match);
                }
                if (!match && selectedExperiencePackage) {
                    setSelectedExperiencePackage(null);
                    setExperienceSanPenalty(0);
                    setExperienceNotes([]);
                    setExperienceEligibleSkills(new Set());
                }
            }
        }
    }, [aggregatedData.EXPERIENCE_PACKAGES, selectedExperiencePackage, experienceSanPenalty, experienceNotes, activeSkillPool, persistedExperiencePackageKey, handleSelectExperiencePackage]);

    return {
        attributes: modifiedAttributes,
        modifiedAttributes,
        derivedStats, selectedOccupation, setOccupation, ai,
        handleRoll, rollHistory, handleRestoreRoll, aggregatedData,
        setEquipmentKit, activeKitName, kitInventory, inventory,
        handleDrop, handleDeleteItem,
        handleAssignPrice,
        wealth, convertAssetsToCash,
        skills, occupationalSkillPoints, personalSkillPoints, skillPointAssignments, handleSkillPointChange,
        handleSkillsReset,
    activeSkillPool, setActiveSkillPool,
        userCreatedSkills, handleAddSpecialization, handleDeleteSpecialization,
        allSkillsWithCalculatedBases,
        allOccupationChoicesMade, occupationSkillChoices, handleOccupationSkillChoice, effectiveOccupationalSkills,
        isDeceased: false,
        selectedSpecialTrainings: new Set(), handleToggleSpecialTraining: () => {},
        // Experience package
        selectedExperiencePackage, handleSelectExperiencePackage,
        experiencePoints,
        experienceEligibleSkills,
        experienceNotes,
        occupationNotes,
    // Archetype
    selectedArchetype, handleSelectArchetype, archetypePoints, archetypeEligibleSkills, archetypeCoreChoice, setArchetypeCoreChoice,
        coreCharacteristicInfo,
        // Pulp rules & Talents
    pulpRulesEnabled, setPulpRulesEnabled,
    selectedTalents, toggleTalent, randomizeTalentFrom, maxTalents,
        // Optional Rules
        optionalRules, setOptionalRuleEnabled,
        // Age related exports
        selectedAgeCategory, handleSelectAgeCategory,
        ageDeductions, handleAgeAttributeDeduct,
        eduImprovementRolls, handleEduImprovementCheck,
        // Life Events exports
        rolledLifeEvents, lifeEventModifiers, handleRollLifeEvents, handleLifeEventSpecialization, lifeEventCount
    };
};
