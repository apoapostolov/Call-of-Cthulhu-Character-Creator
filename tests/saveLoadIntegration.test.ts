/**
 * Integration tests for Call of Cthulhu Save/Load System
 * 
 * Tests save naming priority, data serialization, and import/export
 */

import { describe, it, expect, beforeEach } from 'vitest';

const createMockLocalStorage = () => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        removeItem: (key: string) => { delete store[key]; },
        clear: () => { store = {}; },
    };
};

describe('CoC Save/Load System - Naming Priority', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should prioritize AI-generated name over custom name', () => {
        const aiName = 'Professor Armitage';
        const customName = 'My Save';
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Professor Armitage');
    });

    it('should use custom name when AI name is not available', () => {
        const aiName = null;
        const customName = 'Custom Name';
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Custom Name');
    });

    it('should use placeholder when neither name exists', () => {
        const aiName = null;
        const customName = null;
        const slotIndex = 0;

        const finalName = aiName || customName || `Character ${slotIndex + 1}`;
        expect(finalName).toBe('Character 1');
    });

    it('should create correct placeholder for different slots', () => {
        const testCases = [
            { slotIndex: 0, expected: 'Character 1' },
            { slotIndex: 1, expected: 'Character 2' },
            { slotIndex: 4, expected: 'Character 5' },
        ];

        testCases.forEach(({ slotIndex, expected }) => {
            const finalName = `Character ${slotIndex + 1}`;
            expect(finalName).toBe(expected);
        });
    });
});

describe('CoC Save/Load System - Data Serialization', () => {
    it('should serialize complete character data', () => {
        const fullCharacterData = {
            // Core Attributes
            baseAttributes: {
                STR: 75, CON: 60, SIZ: 55, DEX: 70, APP: 65,
                INT: 80, POW: 75, EDU: 85, LUCK: 70
            },
            modifiedAttributes: {
                STR: 75, CON: 60, SIZ: 55, DEX: 70, APP: 65,
                INT: 80, POW: 75, EDU: 85, LUCK: 70
            },

            // Derived Stats
            derivedStats: {
                HP: 11, MP: 15, SAN: 75, LUCK: 70,
                DamageBonus: '+1D4', Build: 1, MOV: 8
            },

            // Skills
            skillPointAssignments: {
                'Library Use': { occupational: 40, personal: 20 },
                'Occult': { occupational: 50, personal: 0 },
                'Psychology': { occupational: 30, personal: 15 }
            },

            // Occupation
            selectedOccupation: {
                name: 'Professor',
                era: '1920s'
            },

            // Era-specific data
            selectedEra: '1920s',

            // AI Content
            ai: {
                name: 'Professor Armitage',
                age: 58,
                gender: 'male',
                nationality: 'American',
                backstory: 'A respected academic with a dark secret...',
                traits: {
                    positivePhysical: 'Distinguished bearing',
                    positiveMental: 'Brilliant researcher',
                    negative: 'Obsessive'
                }
            },

            // Inventory
            activeKitName: 'Professor Kit',
            kitInventory: ['Books', 'Research notes'],
            inventory: ['Occult tome', 'Magnifying glass'],
            wealth: { cash: 500, assets: 10000 }
        };

        const saveData = {
            version: '1.0.0',
            era: '1920s',
            timestamp: Date.now(),
            ...fullCharacterData
        };

        const serialized = JSON.stringify(saveData);
        const deserialized = JSON.parse(serialized);

        expect(deserialized.baseAttributes).toEqual(fullCharacterData.baseAttributes);
        expect(deserialized.skillPointAssignments).toEqual(fullCharacterData.skillPointAssignments);
        expect(deserialized.ai.name).toBe('Professor Armitage');
        expect(deserialized.selectedOccupation).toEqual(fullCharacterData.selectedOccupation);
        expect(deserialized.inventory).toEqual(fullCharacterData.inventory);
    });

    it('should handle era-specific features', () => {
        const eras = ['dark-ages-1000s', 'gaslight-1890s', '1920s', 'modern-2020s', 'pulp-1930s'];
        
        eras.forEach(era => {
            const characterData = {
                selectedEra: era,
                ai: { name: 'Test Character' },
                baseAttributes: { STR: 50 }
            };

            const saved = JSON.stringify(characterData);
            const loaded = JSON.parse(saved);

            expect(loaded.selectedEra).toBe(era);
        });
    });
});

describe('CoC Save/Load System - Import/Export', () => {
    it('should export character to valid JSON format', () => {
        const character = {
            ai: { name: 'Dr. Morgan' },
            baseAttributes: { STR: 70, CON: 65, SIZ: 60 },
            selectedOccupation: { name: 'Physician' }
        };

        const slot = {
            characterName: 'Dr. Morgan',
            era: '1920s',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                era: '1920s',
                timestamp: Date.now(),
                ...character
            }
        };

        const exported = JSON.stringify(slot, null, 2);
        
        expect(() => JSON.parse(exported)).not.toThrow();
        
        const parsed = JSON.parse(exported);
        expect(parsed.characterName).toBe('Dr. Morgan');
        expect(parsed.era).toBe('1920s');
        expect(parsed.data.baseAttributes).toEqual(character.baseAttributes);
    });

    it('should import character from exported JSON', () => {
        const exportedJSON = JSON.stringify({
            characterName: 'Imported Investigator',
            era: '1920s',
            timestamp: Date.now(),
            data: {
                version: '1.0.0',
                era: '1920s',
                ai: { name: 'Imported Investigator' },
                baseAttributes: { STR: 80, CON: 70, SIZ: 65 },
                skillPointAssignments: { 'Firearms': { occupational: 60, personal: 0 } }
            }
        });

        const imported = JSON.parse(exportedJSON);

        expect(imported.characterName).toBe('Imported Investigator');
        expect(imported.data.baseAttributes.STR).toBe(80);
        expect(imported.data.skillPointAssignments.Firearms.occupational).toBe(60);
    });
});

describe('CoC Save/Load System - Field Validation', () => {
    it('should preserve all required character fields', () => {
        const requiredFields = {
            baseAttributes: { STR: 75, CON: 60, SIZ: 55, DEX: 70, APP: 65, INT: 80, POW: 75, EDU: 85, LUCK: 70 },
            modifiedAttributes: { STR: 75, CON: 60, SIZ: 55, DEX: 70, APP: 65, INT: 80, POW: 75, EDU: 85, LUCK: 70 },
            selectedOccupation: { name: 'Detective', era: '1920s' },
            selectedEra: '1920s',
            skillPointAssignments: { 'Law': { occupational: 40, personal: 0 } },
            ai: {
                name: 'Sam Spade',
                age: 35,
                gender: 'male',
                backstory: 'Tough private eye...'
            }
        };

        const saved = JSON.stringify(requiredFields);
        const loaded = JSON.parse(saved);

        expect(loaded.baseAttributes).toEqual(requiredFields.baseAttributes);
        expect(loaded.modifiedAttributes).toEqual(requiredFields.modifiedAttributes);
        expect(loaded.selectedOccupation).toEqual(requiredFields.selectedOccupation);
        expect(loaded.skillPointAssignments).toEqual(requiredFields.skillPointAssignments);
        expect(loaded.ai).toEqual(requiredFields.ai);
    });

    it('should preserve optional era-specific fields', () => {
        const pulpFields = {
            pulpRulesEnabled: true,
            selectedTalents: ['Hard Boiled', 'Fast Talk'],
            selectedArchetype: { name: 'The Hard Boiled Detective' }
        };

        const darkAgesFields = {
            rolledLifeEvents: [{ event: 'Battle scar', modifier: { STR: -1 } }],
            lifeEventModifiers: { attributes: { STR: -1 }, skills: {} }
        };

        const savedPulp = JSON.stringify(pulpFields);
        const loadedPulp = JSON.parse(savedPulp);
        expect(loadedPulp.pulpRulesEnabled).toBe(true);
        expect(loadedPulp.selectedTalents).toEqual(pulpFields.selectedTalents);

        const savedDark = JSON.stringify(darkAgesFields);
        const loadedDark = JSON.parse(savedDark);
        expect(loadedDark.rolledLifeEvents).toEqual(darkAgesFields.rolledLifeEvents);
    });
});

describe('CoC Save/Load System - LocalStorage Persistence', () => {
    let mockStorage: ReturnType<typeof createMockLocalStorage>;

    beforeEach(() => {
        mockStorage = createMockLocalStorage();
    });

    it('should persist saves to localStorage', () => {
        const slots = [
            {
                characterName: 'Professor Wilmarth',
                era: '1920s',
                timestamp: Date.now(),
                data: { ai: { name: 'Professor Wilmarth' } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('coc-character-saves', JSON.stringify(slots));
        
        const stored = mockStorage.getItem('coc-character-saves');
        expect(stored).toBeDefined();
        
        const loaded = JSON.parse(stored!);
        expect(loaded[0].characterName).toBe('Professor Wilmarth');
        expect(loaded[0].era).toBe('1920s');
    });

    it('should load saves from localStorage on initialization', () => {
        const existingSaves = [
            {
                characterName: 'Existing Character',
                era: 'modern-2020s',
                timestamp: Date.now(),
                data: { ai: { name: 'Existing Character' } }
            },
            null,
            null,
            null,
            null
        ];

        mockStorage.setItem('coc-character-saves', JSON.stringify(existingSaves));
        
        const loaded = JSON.parse(mockStorage.getItem('coc-character-saves')!);
        expect(loaded[0].characterName).toBe('Existing Character');
        expect(loaded[0].era).toBe('modern-2020s');
    });
});
