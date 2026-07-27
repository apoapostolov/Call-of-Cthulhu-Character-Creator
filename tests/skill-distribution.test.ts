import { describe, expect, it } from 'vitest';
import {
    buildEraContext,
    buildSkillDistributionAnalysisPrompt,
    buildSkillDistributionPrompt,
    normalizeSkillDistributionAnalysis,
    normalizeSkillDistributionResponse,
    responseToSkillPointAssignments,
} from '../lib/ai/skill-distribution';
import { SKILL_SPECIALIZATIONS } from '../data/skill-specializations-data';
import { loadEraData } from '../eras/manifest';

describe('skill distribution helpers', () => {
    const payload = {
        era: {
            id: 'modern',
            name: 'Modern',
            displayName: 'Modern Era',
        },
        eraContext: buildEraContext([
            {
                name: '2000s',
                displayName: 'The 2000s',
                prompt: {
                    artStyle: 'Digital grit',
                    fashion: 'Cargo pants and tactical layers',
                    looks: 'Practical, early-2000s style',
                    mannerisms: 'Direct and security-conscious',
                    politicsAndMood: 'Post-9/11 vigilance and surveillance',
                    technology: 'Internet, smartphones, broadband, flip phones',
                },
            },
        ], '2000s'),
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
        distribution: {
            signatureSkillTarget: '1-2 core skills around 50-70%',
            secondarySkillTarget: '2-4 supporting skills around 20-40%',
            supportSkillTarget: 'several 5-10 point adjacent skills where the concept supports them',
            supportPointBand: { min: 5, max: 10 },
            maxHighSkillCount: 2,
            utilitySkills: ['Spot Hidden', 'Listen', 'First Aid', 'Library Use', 'Psychology'],
        },
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
        specializations: {
            Fighting: ['Brawl', 'Sword'],
            Firearms: ['Handgun', 'Rifle/Shotgun'],
            Language: ['French', 'German'],
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

    it('builds an analysis prompt that asks for exact specialization interpretation', () => {
        const prompt = buildSkillDistributionAnalysisPrompt(payload);

        expect(prompt).toContain('Analyze the brief deeply');
        expect(prompt).toContain('Era: The 2000s (2000s)');
        expect(prompt).toContain('Fighting (Brawl)');
        expect(prompt).toContain('Firearms (Handgun)');
        expect(prompt).toContain('Read the prose for profession, hobbies, training');
    });

    it('explains the Ride bicycle and horse split in the prompt', () => {
        const prompt = buildSkillDistributionPrompt(payload);

        expect(prompt).toContain('Ride (Bicycle) is a flat skill');
        expect(prompt).toContain('Ride (Horse) is the specialization');
    });

    it('includes Call of Cthulhu guidance in the prompt', () => {
        const prompt = buildSkillDistributionPrompt(payload);

        expect(prompt).toContain('Era: The 2000s (2000s)');
        expect(prompt).toContain('Technology: Internet, smartphones, broadband, flip phones');
        expect(prompt).toContain('0-19% is untrained');
        expect(prompt).toContain('20-49% is trained');
        expect(prompt).toContain('50%+ is professional');
        expect(prompt).toContain('Build a believable investigator first');
        expect(prompt).toContain('Distribution policy');
        expect(prompt).toContain('Support point band: 5-10 points');
        expect(prompt).toContain('Prefer a broad spread of competence');
        expect(prompt).toContain('Do not dump most of a pool into one or two skills');
        expect(prompt).toContain('Treat 70% as a practical ceiling');
        expect(prompt).toContain('Use 5-10 point nudges on adjacent skills');
        expect(prompt).toContain('Avoid bad investments unless the concept truly calls for them');
        expect(prompt).toContain('Never spend points on Language (Own)');
        expect(prompt).toContain('Specialized skills are written as Base (Specialization)');
        expect(prompt).toContain('Most investigators should have at least one combat-capable skill');
        expect(prompt).toContain('Common adventurer workhorse skills');
        expect(prompt).toContain('Spot Hidden, Listen, First Aid, Library Use, Psychology');
        expect(prompt).toContain('Fighting: Brawl, Sword');
        expect(prompt).toContain('Former boxer turned private eye');
        expect(prompt).toContain('Spend exactly the points available in each active pool');
    });

    it('omits the Personal pool from Campfire Tales prompts when inactive', () => {
        const campfirePayload = {
            ...payload,
            era: { id: 'campfire-tales', name: 'Campfire Tales', displayName: 'Campfire Tales' },
            activePools: ['occupational'],
            pools: {
                occupational: payload.pools.occupational,
            },
            distribution: {
                ...payload.distribution,
                eraSpecificGuidance: ['There is no Personal Interest pool in Campfire Tales; spend only the scout hobby point pool.'],
            },
        } satisfies Parameters<typeof buildSkillDistributionPrompt>[0];

        const prompt = buildSkillDistributionPrompt(campfirePayload);

        expect(prompt).toContain('There is no Personal Interest pool in Campfire Tales');
        expect(prompt).toContain('Occupational: total 120');
        expect(prompt).not.toContain('Personal: total');
        expect(prompt).toContain('"personal": []');
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

    it('normalizes the analysis response', () => {
        const analysis = normalizeSkillDistributionAnalysis(JSON.stringify({
            summary: 'A tough private investigator.',
            themes: ['investigation', 'streetwise'],
            likelyCoreSkills: ['Fighting (Brawl)'],
            likelySupportSkills: ['Library Use'],
            likelySpecializations: ['Firearms (Handgun)'],
            combatProfile: 'combat_ready',
            literacyNotes: 'Well educated.',
            cautions: ['Do not overinvest in Language (Own)'],
        }));

        expect(analysis.summary).toBe('A tough private investigator.');
        expect(analysis.themes).toEqual(['investigation', 'streetwise']);
        expect(analysis.likelyCoreSkills).toEqual(['Fighting (Brawl)']);
        expect(analysis.likelySpecializations).toEqual(['Firearms (Handgun)']);
        expect(analysis.cautions).toEqual(['Do not overinvest in Language (Own)']);
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
            [
                {
                    name: 'Persuade',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Library Use',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 120,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Persuade', 'Library Use'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        expect(assignments.Persuade.occupational + assignments['Library Use'].occupational).toBe(115);
        expect(assignments.Persuade.occupational).toBeGreaterThan(0);
        expect(assignments['Library Use'].occupational).toBeGreaterThan(0);
    });

    it('ignores skills that are not allowed in the current sheet when no eligible fallback exists', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Forbidden Skill', points: 20 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Persuade',
                    base: 10,
                    current: 10,
                    occupationalEligible: false,
                    personalEligible: false,
                    experienceEligible: false,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 20,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Persuade'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        expect(assignments).toEqual({});
    });

    it('fills a pool shortfall using eligible skills', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Persuade', points: 10 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Persuade',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Library Use',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 30,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Persuade', 'Library Use'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        const totalOccupational = (assignments.Persuade?.occupational || 0) + (assignments['Library Use']?.occupational || 0);
        expect(totalOccupational).toBe(30);
    });

    it('rewrites parent skill allocations to a specialization when one exists on the sheet', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Fighting', points: 10 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Fighting',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Fighting (Brawl)',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 10,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Fighting'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        expect(assignments.Fighting?.occupational || 0).toBe(0);
        expect(assignments['Fighting (Brawl)']?.occupational || 0).toBe(10);
    });

    it('rewrites firearm allocations to a specialization when one exists on the sheet', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Firearms', points: 12 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Firearms',
                    base: 20,
                    current: 20,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Firearms (Handgun)',
                    base: 20,
                    current: 20,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 12,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Firearms'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        expect(assignments.Firearms?.occupational || 0).toBe(0);
        expect(assignments['Firearms (Handgun)']?.occupational || 0).toBe(12);
    });

    it('rewrites Language (Other) to a concrete language specialization', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [{ skill: 'Language (Other)', points: 8 }],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Language (Other)',
                    base: 0,
                    current: 0,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 8,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Language (Other)'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
                specializationsCatalog: {
                    Language: ['French', 'German'],
                },
            },
        );

        expect(assignments['Language (Other)']?.occupational || 0).toBe(0);
        expect((assignments['Language (French)']?.occupational || 0) + (assignments['Language (German)']?.occupational || 0)).toBe(8);
    });

    it('rewrites Pilot, Science, and Survival to concrete specializations', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [
                    { skill: 'Pilot', points: 5 },
                    { skill: 'Science', points: 5 },
                    { skill: 'Survival', points: 5 },
                ],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Pilot',
                    base: 0,
                    current: 0,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Science',
                    base: 0,
                    current: 0,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Survival',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 15,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Pilot', 'Science', 'Survival'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
                specializationsCatalog: {
                    Pilot: ['Boat'],
                    Science: ['Chemistry'],
                    Survival: ['Plains'],
                },
            },
        );

        expect(assignments.Pilot?.occupational || 0).toBe(0);
        expect(assignments.Science?.occupational || 0).toBe(0);
        expect(assignments.Survival?.occupational || 0).toBe(0);
        expect(assignments['Pilot (Boat)']?.occupational || 0).toBe(5);
        expect(assignments['Science (Chemistry)']?.occupational || 0).toBe(5);
        expect(assignments['Survival (Plains)']?.occupational || 0).toBe(5);
    });

    it('raises Credit Rating to the minimum lifestyle floor by rebalancing occupational points', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [
                    { skill: 'Library Use', points: 20 },
                    { skill: 'Persuade', points: 20 },
                ],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Credit Rating',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Library Use',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Persuade',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 40,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Credit Rating', 'Library Use', 'Persuade'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid', 'Credit Rating'],
                minimumCreditRating: 30,
            },
        );

        expect(assignments['Credit Rating']?.occupational || 0).toBe(20);
        expect((assignments['Credit Rating']?.occupational || 0) + 10).toBeGreaterThanOrEqual(30);
        expect((assignments['Library Use']?.occupational || 0) + (assignments.Persuade?.occupational || 0) + (assignments['Credit Rating']?.occupational || 0)).toBe(40);
    });

    it('can raise Family Credit Rating for Campfire Tales lifestyle floors', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [
                    { skill: 'Library Use', points: 20 },
                    { skill: 'Reassure', points: 20 },
                ],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Family Credit Rating',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: false,
                    experienceEligible: false,
                    archetypeEligible: false,
                },
                {
                    name: 'Library Use',
                    base: 20,
                    current: 20,
                    occupationalEligible: true,
                    personalEligible: false,
                    experienceEligible: false,
                    archetypeEligible: false,
                },
                {
                    name: 'Reassure',
                    base: 10,
                    current: 10,
                    occupationalEligible: true,
                    personalEligible: false,
                    experienceEligible: false,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 40,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 99,
                occupationalSkillNames: ['Family Credit Rating', 'Library Use', 'Reassure'],
                utilitySkills: ['Family Credit Rating', 'Library Use', 'Reassure'],
                minimumCreditRating: 40,
                creditRatingSkillName: 'Family Credit Rating',
            },
        );

        expect(assignments['Family Credit Rating']?.occupational || 0).toBe(15);
        expect((assignments['Family Credit Rating']?.occupational || 0) + 25).toBeGreaterThanOrEqual(40);
    });

    it('never fills a specialization family parent when a child specialization exists', () => {
        const assignments = responseToSkillPointAssignments(
            {
                occupational: [],
                personal: [],
                experience: [],
                archetype: [],
            },
            [
                {
                    name: 'Fighting',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
                {
                    name: 'Fighting (Brawl)',
                    base: 25,
                    current: 25,
                    occupationalEligible: true,
                    personalEligible: true,
                    experienceEligible: true,
                    archetypeEligible: false,
                },
            ],
            {
                occupational: 5,
                personal: 0,
                experience: 0,
                archetype: 0,
            },
            {
                skillCap: 75,
                occupationalSkillNames: ['Fighting'],
                utilitySkills: ['Spot Hidden', 'Listen', 'First Aid'],
            },
        );

        expect(assignments.Fighting?.occupational || 0).toBe(0);
        expect(assignments['Fighting (Brawl)']?.occupational || 0).toBe(5);
    });

    it('treats Ride as a horse specialization with one dropdown option', async () => {
        expect(SKILL_SPECIALIZATIONS.Ride).toEqual(['Horse']);
        const classic = await loadEraData('classic-1920s');
        const gaslight = await loadEraData('gaslight-1890s');
        const western = await loadEraData('western-1880s');
        expect(classic.skills.find(skill => skill.name === 'Ride')?.specialty).toBe(true);
        expect(gaslight.skills.find(skill => skill.name === 'Ride')?.specialty).toBe(true);
        expect(western.skills.find(skill => skill.name === 'Ride')?.specialty).toBe(true);
    });
});
