import { describe, expect, it } from 'vitest';
import { buildSkillDistributionPrompt, normalizeSkillDistributionResponse, responseToSkillPointAssignments } from '../lib/ai/skill-distribution';

describe('skill distribution helpers', () => {
    const payload = {
        era: {
            id: 'modern',
            name: 'Modern',
            displayName: 'Modern Era',
        },
        occupation: {
            name: 'Detective',
            description: 'A hard-boiled investigator.',
            group: 'Investigative',
            skillPoints: 'EDU x 4 + STR x 2',
            special: 'Knows everyone in the precinct',
            suggestedContacts: 'Police, journalists',
            archetypicalClothing: 'Worn trench coat',
            occupationalSkills: ['Accounting', 'Library Use', 'Persuade'],
            selectedChoices: {},
        },
        description: 'Former boxer turned private eye who likes reading and tinkering with locks.',
        rules: {
            untrainedMax: 19,
            trainedMin: 20,
            professionalMin: 50,
            expertMin: 70,
        },
        pools: {
            occupational: {
                total: 120,
                spent: 0,
                remaining: 120,
                formula: 'EDU x 4 + STR x 2',
                calculation: '120',
            },
            personal: {
                total: 60,
                spent: 0,
                remaining: 60,
                formula: '5 points per skill',
                calculation: '60',
            },
            experience: {
                total: 20,
                spent: 0,
                remaining: 20,
                formula: 'Experience',
                calculation: '20',
            },
            archetype: {
                total: 0,
                spent: 0,
                remaining: 0,
                formula: '',
                calculation: '',
            },
        },
        skills: [
            {
                name: 'Persuade',
                base: 10,
                current: 10,
                occupationalEligible: true,
                personalEligible: true,
                experienceEligible: true,
                archetypeEligible: false,
                description: 'Influence others.',
            },
            {
                name: 'Library Use',
                base: 25,
                current: 25,
                occupationalEligible: true,
                personalEligible: true,
                experienceEligible: true,
                archetypeEligible: false,
                description: 'Find information.',
            },
        ],
    } satisfies Parameters<typeof buildSkillDistributionPrompt>[0];

    it('includes Call of Cthulhu guidance in the prompt', () => {
        const prompt = buildSkillDistributionPrompt(payload);

        expect(prompt).toContain('0-19% is untrained');
        expect(prompt).toContain('20-49% is trained');
        expect(prompt).toContain('50%+ is professional');
        expect(prompt).toContain('Former boxer turned private eye');
        expect(prompt).toContain('Spend exactly the points available in each pool');
    });

    it('normalizes response values from common model shapes', () => {
        const response = normalizeSkillDistributionResponse(JSON.stringify({
            rationale: 'Fits the brief.',
            occupational: [{ name: 'Persuade', value: '30' }],
            personal: [{ skill: 'Library Use', amount: 15 }],
            experience: [{ skill: 'Persuade', points: 5 }],
            archetype: [{ skill: 'Unknown', points: 12 }],
        }));

        expect(response.rationale).toBe('Fits the brief.');
        expect(response.occupational).toEqual([{ skill: 'Persuade', points: 30 }]);
        expect(response.personal).toEqual([{ skill: 'Library Use', points: 15 }]);
        expect(response.experience).toEqual([{ skill: 'Persuade', points: 5 }]);
        expect(response.archetype).toEqual([{ skill: 'Unknown', points: 12 }]);
    });

    it('scales allocations down to available pool totals', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [
                    { skill: 'Persuade', points: 90 },
                    { skill: 'Library Use', points: 90 },
                ],
                personal: [],
                experience: [],
                archetype: [],
            },
            ['Persuade', 'Library Use'],
            {
                occupational: 120,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
        );

        expect(assignments.Persuade.occupational + assignments['Library Use'].occupational).toBe(120);
        expect(assignments.Persuade.occupational).toBeGreaterThan(0);
        expect(assignments['Library Use'].occupational).toBeGreaterThan(0);
    });

    it('ignores skills that are not allowed in the current sheet', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Forbidden Skill', points: 20 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            ['Persuade'],
            {
                occupational: 20,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
        );

        expect(assignments).toEqual({});
    });
});
