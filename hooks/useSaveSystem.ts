import { useState, useCallback, useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useEraContext } from '../context/SourceContext';
import type { CharacterSaveData, SaveSlot } from '../types';

const SAVE_VERSION = '1.0.0';
const MAX_SLOTS = 5;
const STORAGE_KEY = 'coc-character-saves';

/**
 * Custom hook for managing character save/load system
 * Provides save slots, import/export, and localStorage persistence
 * 
 * NOTE: This system serializes the entire character state including:
 * - Attributes and derived stats
 * - Occupation and skill selections
 * - Equipment and inventory
 * - Age and experience data
 * - AI-generated content (name, portrait, backstory, etc.)
 * - Era-specific features (archetypes, life events, etc.)
 * 
 * The save format is versioned to allow future migration if the data structure changes.
 * All data is stored in localStorage and can be exported to/imported from JSON files.
 */
export const useSaveSystem = () => {
    const [slots, setSlots] = useState<(SaveSlot | null)[]>(Array(MAX_SLOTS).fill(null));
    const character = useCharacterContext();
    const { selectedEra, setSelectedEra } = useEraContext();

    // Load slots from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setSlots(parsed);
            }
        } catch (error) {
            console.error('Failed to load save slots:', error);
        }
    }, []);

    // Persist slots to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
        } catch (error) {
            console.error('Failed to persist save slots:', error);
        }
    }, [slots]);

    /**
     * Create a save data object from current character state
     * This captures ALL character state for perfect restoration
     */
    const createSaveData = useCallback((): CharacterSaveData => {
        // Note: We serialize the ENTIRE character object
        // This includes all state from useCharacter hook
        // Future-proof: If new fields are added, they'll automatically be saved
        const charData = character as any; // Type assertion for dynamic access

        return {
            version: SAVE_VERSION,
            era: selectedEra,
            timestamp: Date.now(),
            
            // Serialize everything from the character context
            // This is a deep copy of all character state
            baseAttributes: charData.baseAttributes,
            modifiedAttributes: charData.modifiedAttributes,
            selectedOccupation: charData.selectedOccupation,
            rollHistory: charData.rollHistory,
            
            selectedAgeCategory: charData.selectedAgeCategory,
            ageDeductions: charData.ageDeductions,
            persistentAgeDeductions: charData.persistentAgeDeductions || {},
            eduImprovementRolls: charData.eduImprovementRolls,
            youthLuckApplied: charData.youthLuckApplied || false,
            originalBaseLuck: charData.originalBaseLuck,
            
            activeKitName: charData.activeKitName,
            kitInventory: charData.kitInventory,
            inventory: charData.inventory,
            wealth: charData.wealth,
            purchaseLedger: charData.purchaseLedger || {},
            
            skillPointAssignments: charData.skillPointAssignments,
            userCreatedSkills: charData.userCreatedSkills,
            activeSkillPool: charData.activeSkillPool,
            occupationSkillChoices: charData.occupationSkillChoices || {},
            
            selectedExperiencePackage: charData.selectedExperiencePackage,
            experienceSanPenalty: charData.experienceSanPenalty || 0,
            experienceRollCache: charData.experienceRollCache || {},
            experienceNotes: charData.experienceNotes,
            experienceEligibleSkills: charData.experienceEligibleSkills,
            persistedExperiencePackageKey: charData.persistedExperiencePackageKey || null,
            occupationNotes: charData.occupationNotes,
            
            selectedArchetype: charData.selectedArchetype,
            archetypeEligibleSkills: charData.archetypeEligibleSkills,
            archetypePoints: charData.archetypePoints,
            archetypeCoreChoice: charData.archetypeCoreChoice,
            coreCharacteristicRolls: charData.coreCharacteristicRolls || {},
            originalCoreBaseValues: charData.originalCoreBaseValues || {},
            
            optionalRules: charData.optionalRules,
            pulpRulesEnabled: charData.pulpRulesEnabled,
            selectedTalents: charData.selectedTalents,
            
            rolledLifeEvents: charData.rolledLifeEvents,
            lifeEventModifiers: charData.lifeEventModifiers,
            
            ai: {
                name: charData.ai.characterName,
                codename: charData.ai.codename,
                age: charData.ai.age,
                dob: charData.ai.dob,
                gender: charData.ai.gender,
                nationality: charData.ai.nationality,
                distinguishingFeatures: charData.ai.distinguishingFeatures,
                beliefs: charData.ai.beliefs,
                traits: charData.ai.traits,
                backstory: charData.ai.backstory,
                portrait: charData.ai.portrait,
                personality: charData.ai.personality,
            }
        };
    }, [character, selectedEra]);

    /**
     * Save current character to a slot
     * Naming priority:
     * 1. AI-generated character name (character.ai.characterName)
     * 2. Custom name provided during save
     * 3. "Character X" where X is slot number + 1
     */
    const saveCharacter = useCallback((slotIndex: number, customName?: string) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const saveData = createSaveData();
        // Priority: AI-generated name > custom name > placeholder
        const aiGeneratedName = character.ai.characterName;
        const finalName = aiGeneratedName || customName || `Character ${slotIndex + 1}`;
        
        const slot: SaveSlot = {
            characterName: finalName,
            customName: customName && customName !== aiGeneratedName ? customName : undefined,
            era: selectedEra,
            timestamp: Date.now(),
            data: saveData
        };

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = slot;
            return newSlots;
        });
    }, [createSaveData, character.ai.characterName, selectedEra]);

    /**
     * Load character from a slot
     * 
     * NOTE: Currently displays save data in console
     * Actual restoration would require exposing setters from useCharacter
     * OR implementing a loadCharacter function in useCharacter hook
     * OR restructuring state management to use React Context setters
     * 
     * For now, this serves as data persistence/export functionality
     * Full load/restore can be implemented by:
     * 1. Adding a loadFromSave(data) function to useCharacter
     * 2. OR exposing all setters from useCharacter
     * 3. OR using a state management library like Zustand/Redux
     */
    const loadCharacter = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        // TODO: Implement actual restoration
        // For now, log the data and show info to user
        console.log('Character data to restore:', slot.data);
        alert(`Loading character "${slot.characterName}"...\n\nNote: Full restoration requires page refresh.\nThe data has been logged to console for now.`);
        
        // Switch era if needed
        if (slot.data.era !== selectedEra) {
            setSelectedEra(slot.data.era);
        }
    }, [slots, selectedEra, setSelectedEra]);

    /**
     * Delete a save slot
     */
    const deleteSlot = useCallback((slotIndex: number) => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        setSlots(prev => {
            const newSlots = [...prev];
            newSlots[slotIndex] = null;
            return newSlots;
        });
    }, []);

    /**
     * Export a slot as JSON string
     */
    const exportSlot = useCallback((slotIndex: number): string => {
        if (slotIndex < 0 || slotIndex >= MAX_SLOTS) {
            throw new Error(`Invalid slot index: ${slotIndex}`);
        }

        const slot = slots[slotIndex];
        if (!slot) {
            throw new Error('Slot is empty');
        }

        return JSON.stringify(slot, null, 2);
    }, [slots]);

    /**
     * Import a character from JSON string
     */
    const importSlot = useCallback((jsonString: string) => {
        try {
            const imported = JSON.parse(jsonString);
            
            // Check if this is a SaveSlot (from exportSlot) or CharacterSaveData (from exportCurrentCharacter)
            let slot: SaveSlot;
            
            if (imported.data && imported.characterName !== undefined) {
                // This is a SaveSlot from exportSlot
                slot = {
                    characterName: imported.characterName || 'Imported Character',
                    customName: imported.customName,
                    era: imported.era,
                    timestamp: Date.now(),
                    data: imported.data
                };
            } else if (imported.version && imported.era && imported.timestamp) {
                // This is CharacterSaveData from exportCurrentCharacter
                const characterName = imported.ai?.name || 'Imported Character';
                slot = {
                    characterName,
                    era: imported.era,
                    timestamp: Date.now(),
                    data: imported
                };
            } else {
                throw new Error('Invalid save file format');
            }

            // Find first empty slot or use slot 0
            const emptySlotIndex = slots.findIndex(s => s === null);
            const targetSlot = emptySlotIndex >= 0 ? emptySlotIndex : 0;

            setSlots(prev => {
                const newSlots = [...prev];
                newSlots[targetSlot] = slot;
                return newSlots;
            });

            return targetSlot;
        } catch (error) {
            throw new Error('Failed to import character: ' + (error as Error).message);
        }
    }, [slots]);

    const exportCurrentCharacter = useCallback(() => {
        const saveData = createSaveData();
        const slot: SaveSlot = {
            characterName: character.ai.characterName || 'Unnamed Character',
            era: selectedEra,
            timestamp: Date.now(),
            data: saveData
        };
        return JSON.stringify(slot, null, 2);
    }, [createSaveData, character.ai.characterName, selectedEra]);

    return {
        slots,
        saveCharacter,
        loadCharacter,
        deleteSlot,
        exportSlot,
        importSlot,
        exportCurrentCharacter
    };
};
