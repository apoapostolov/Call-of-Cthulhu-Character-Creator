import type { DecadeConfig } from '../../types';
import { parseJsonLike } from './json';

export type SkillDistributionPoolId = 'occupational' | 'personal' | 'experience' | 'archetype';

export type SkillPointAssignments = Record<string, {
    occupational: number;
    personal: number;
    experience: number;
    archetype: number;
}>;

export interface SkillDistributionPoolSummary {
    total: number;
    spent: number;
    remaining: number;
    formula: string;
    calculation: string;
}

export interface SkillDistributionSkillSummary {
    name: string;
    base: number;
    current: number;
    occupationalEligible: boolean;
    personalEligible: boolean;
    experienceEligible: boolean;
    archetypeEligible: boolean;
    description?: string;
}

export interface SkillDistributionPayload {
    era: {
        id: string;
        name: string;
        displayName: string;
    };
    eraContext: {
        displayName: string;
        name: string;
        setting: string;
        mood: string;
        technology: string;
        fashion: string;
    };
    occupation: {
        name: string;
        description: string;
        group: string;
        skillPoints: string;
        special?: string | null;
        suggestedContacts?: string | null;
        archetypicalClothing?: string | null;
        obligations?: string | null;
        trustedAdult?: string | null;
        startingBadges?: string[];
        selectedAbilityBadges?: string[];
        scoutBackstory?: {
            home: string;
            trustedAdult: string;
            obligations: string;
            fears: string;
            notes: string;
        };
        occupationalSkills: string[];
        choiceGroups?: Array<{ count: number; options: string[] }>;
        selectedChoices: Record<number, string[]>;
    };
    description: string;
    rules: {
        untrainedMax: number;
        trainedMin: number;
        professionalMin: number;
        expertMin: number;
    };
    distribution: {
        signatureSkillTarget: string;
        secondarySkillTarget: string;
        supportSkillTarget: string;
        supportPointBand: { min: number; max: number };
        maxHighSkillCount: number;
        utilitySkills: string[];
        minimumCreditRating?: number;
        eraSpecificGuidance?: string[];
    };
    pools: Partial<Record<SkillDistributionPoolId, SkillDistributionPoolSummary>>;
    activePools?: SkillDistributionPoolId[];
    skills: SkillDistributionSkillSummary[];
    specializations: Record<string, string[]>;
    analysis?: SkillDistributionAnalysis;
}

export interface SkillDistributionAnalysis {
    summary: string;
    themes: string[];
    likelyCoreSkills: string[];
    likelySupportSkills: string[];
    likelySpecializations: string[];
    combatProfile: string;
    literacyNotes: string;
    cautions: string[];
}

export const buildEraContext = (decades: DecadeConfig[], eraName: string) => {
    const first = decades[0];
    if (!first) {
        return {
            displayName: eraName,
            name: eraName,
            setting: '',
            mood: '',
            technology: '',
            fashion: '',
        };
    }

    return {
        displayName: first.displayName,
        name: first.name,
        setting: `${first.prompt.artStyle} ${first.prompt.looks}`.trim(),
        mood: first.prompt.politicsAndMood,
        technology: first.prompt.technology,
        fashion: first.prompt.fashion,
    };
};

export interface SkillDistributionAllocation {
    skill: string;
    points: number;
}

export interface SkillDistributionApplyOptions {
    skillCap: number;
    occupationalSkillNames?: string[];
    utilitySkills?: string[];
    specializationsCatalog?: Record<string, string[]>;
    minimumCreditRating?: number;
    creditRatingSkillName?: string;
}

export interface SkillDistributionResponse {
    rationale?: string;
    occupational: SkillDistributionAllocation[];
    personal: SkillDistributionAllocation[];
    experience: SkillDistributionAllocation[];
    archetype: SkillDistributionAllocation[];
}

export const buildSkillDistributionAnalysisPrompt = (payload: SkillDistributionPayload) => {
    return `You are interpreting a Call of Cthulhu character concept from prose. Analyze the brief deeply and return JSON only.

${stringifyEraContext(payload.eraContext)}

Occupation:
- Name: ${payload.occupation.name}
- Group: ${payload.occupation.group}
- Description: ${payload.occupation.description}
- Obligations: ${payload.occupation.obligations || 'None'}
- Trusted Adult: ${payload.occupation.trustedAdult || 'None'}
- Starting Badges: ${payload.occupation.startingBadges?.join(', ') || 'None'}
- Selected Ability Badges: ${payload.occupation.selectedAbilityBadges?.join(', ') || 'None'}
- Scout Home: ${payload.occupation.scoutBackstory?.home || 'None'}
- Scout Fears: ${payload.occupation.scoutBackstory?.fears || 'None'}
- Scout Notes: ${payload.occupation.scoutBackstory?.notes || 'None'}
- Occupational Skills: ${payload.occupation.occupationalSkills.join(', ')}

Character brief:
${payload.description}

Era context guidance:
- Use the era context to infer what is normal, plausible, or anachronistic for this character.
- Let the setting and technology inform which skills make sense to emphasize or downplay.
- Match combat, literacy, travel, communication, and social expectations to the era.
- In Campfire Tales, interpret the concept as a kid scout mystery protagonist: use hobby, badges, home life, fears, trusted adults, squad usefulness, and age-appropriate limits when choosing skill emphasis.
${stringifyEraSpecificGuidance(payload.distribution.eraSpecificGuidance)}

Skill guidance:
- Treat exact specialized skills as real skills, not just the parent. For example: use Fighting (Brawl) for martial arts, Firearms (Handgun) for handgun training, and Firearms (Rifle/Shotgun) for long guns.
- Prefer exact specialized entries when the concept points there.
- Read the prose for profession, hobbies, training, social class, education, combat comfort, technical knowledge, and literacy.
- Identify which skills should be treated as core, supporting, and incidental.

Return only JSON in this exact shape:
{
  "summary": "short interpretation of the character concept",
  "themes": ["theme 1", "theme 2"],
  "likelyCoreSkills": ["Fighting (Brawl)"],
  "likelySupportSkills": ["Library Use"],
  "likelySpecializations": ["Firearms (Handgun)"],
  "combatProfile": "civilian | lightly_armed | combat_ready | specialist",
  "literacyNotes": "short note about literacy / education / writing",
  "cautions": ["things to avoid over-investing in"]
}`;
};

const sanitizePoints = (value: unknown) => {
    const num = Number(value);
    if (!Number.isFinite(num) || num <= 0) return 0;
    return Math.floor(num);
};

const normalizeAllocations = (value: unknown): SkillDistributionAllocation[] => {
    if (!Array.isArray(value)) return [];
    return value
        .map((item: any) => ({
            skill: String(item?.skill || item?.name || '').trim(),
            points: sanitizePoints(item?.points ?? item?.value ?? item?.amount),
        }))
        .filter(entry => Boolean(entry.skill) && entry.points > 0);
};

export const normalizeSkillDistributionResponse = (value: unknown): SkillDistributionResponse => {
    const parsed: any = parseJsonLike(value) || {};
    return {
        rationale: typeof parsed?.rationale === 'string' ? parsed.rationale.trim() : undefined,
        occupational: normalizeAllocations(parsed?.occupational),
        personal: normalizeAllocations(parsed?.personal),
        experience: normalizeAllocations(parsed?.experience),
        archetype: normalizeAllocations(parsed?.archetype),
    };
};

export const normalizeSkillDistributionAnalysis = (value: unknown): SkillDistributionAnalysis => {
    const parsed: any = parseJsonLike(value) || {};
    const asStringArray = (input: unknown) => Array.isArray(input)
        ? input.map(entry => String(entry).trim()).filter(Boolean)
        : [];

    return {
        summary: typeof parsed?.summary === 'string' ? parsed.summary.trim() : '',
        themes: asStringArray(parsed?.themes),
        likelyCoreSkills: asStringArray(parsed?.likelyCoreSkills),
        likelySupportSkills: asStringArray(parsed?.likelySupportSkills),
        likelySpecializations: asStringArray(parsed?.likelySpecializations),
        combatProfile: typeof parsed?.combatProfile === 'string' ? parsed.combatProfile.trim() : '',
        literacyNotes: typeof parsed?.literacyNotes === 'string' ? parsed.literacyNotes.trim() : '',
        cautions: asStringArray(parsed?.cautions),
    };
};

const stringifySkillList = (skills: SkillDistributionSkillSummary[]) => skills
    .map(skill => {
        const eligibility: string[] = [];
        if (skill.occupationalEligible) eligibility.push('occupational');
        if (skill.personalEligible) eligibility.push('personal');
        if (skill.experienceEligible) eligibility.push('experience');
        if (skill.archetypeEligible) eligibility.push('archetype');
        return `${skill.name}: base ${skill.base}, current ${skill.current}, eligible pools: ${eligibility.join(', ') || 'none'}`;
    })
    .join('\n');

const stringifyPoolSummary = (label: string, pool: SkillDistributionPoolSummary) => (
    `${label}: total ${pool.total}, spent ${pool.spent}, remaining ${pool.remaining}, formula ${pool.formula || 'n/a'}`
);

const stringifyOptionalPoolSummary = (label: string, pool: SkillDistributionPoolSummary | undefined) => (
    pool ? stringifyPoolSummary(label, pool) : ''
);

const stringifySpecializationCatalog = (specializations: Record<string, string[]>) => (
    Object.entries(specializations)
        .filter(([, values]) => values.length > 0)
        .map(([base, values]) => `${base}: ${values.join(', ')}`)
        .join('\n')
);

const stringifyUtilitySkills = (utilitySkills: string[]) => utilitySkills.length ? utilitySkills.join(', ') : 'None';

const stringifyEraSpecificGuidance = (guidance?: string[]) => (
    guidance?.length
        ? guidance.map(line => `- ${line}`).join('\n')
        : '- Use the era context to keep the distribution plausible and useful.'
);

const stringifyEraContext = (eraContext: SkillDistributionPayload['eraContext']) => [
    `Era: ${eraContext.displayName} (${eraContext.name})`,
    `Setting cues: ${eraContext.setting || 'n/a'}`,
    `Mood: ${eraContext.mood || 'n/a'}`,
    `Fashion: ${eraContext.fashion || 'n/a'}`,
    `Technology: ${eraContext.technology || 'n/a'}`,
].join('\n');

const stringifyAnalysis = (analysis: SkillDistributionAnalysis) => {
    const sections = [
        analysis.summary ? `Summary: ${analysis.summary}` : '',
        analysis.themes.length ? `Themes: ${analysis.themes.join(', ')}` : '',
        analysis.likelyCoreSkills.length ? `Likely core skills: ${analysis.likelyCoreSkills.join(', ')}` : '',
        analysis.likelySupportSkills.length ? `Likely support skills: ${analysis.likelySupportSkills.join(', ')}` : '',
        analysis.likelySpecializations.length ? `Likely specializations: ${analysis.likelySpecializations.join(', ')}` : '',
        analysis.combatProfile ? `Combat profile: ${analysis.combatProfile}` : '',
        analysis.literacyNotes ? `Literacy notes: ${analysis.literacyNotes}` : '',
        analysis.cautions.length ? `Cautions: ${analysis.cautions.join(', ')}` : '',
    ].filter(Boolean);
    return sections.join('\n');
};

export const buildSkillDistributionPrompt = (payload: SkillDistributionPayload) => {
    const activePools = payload.activePools || (Object.keys(payload.pools) as SkillDistributionPoolId[]);
    const occupationChoices = payload.occupation.choiceGroups?.length
        ? payload.occupation.choiceGroups.map((group, index) => {
            const choices = payload.occupation.selectedChoices[index] || [];
            return `Choice group ${index + 1}: pick ${group.count} from [${group.options.join(', ')}]. Selected: [${choices.join(', ')}]`;
        }).join('\n')
        : 'No occupation choice groups.';

return `You are allocating Call of Cthulhu skill points for a character sheet.

${stringifyEraContext(payload.eraContext)}

Occupation:
- Name: ${payload.occupation.name}
- Group: ${payload.occupation.group}
- Skill Points Formula: ${payload.occupation.skillPoints}
- Special: ${payload.occupation.special || 'None'}
- Suggested Contacts: ${payload.occupation.suggestedContacts || 'None'}
- Archetypical Clothing: ${payload.occupation.archetypicalClothing || 'None'}
- Obligations: ${payload.occupation.obligations || 'None'}
- Trusted Adult: ${payload.occupation.trustedAdult || 'None'}
- Starting Badges: ${payload.occupation.startingBadges?.join(', ') || 'None'}
- Selected Ability Badges: ${payload.occupation.selectedAbilityBadges?.join(', ') || 'None'}
- Scout Home: ${payload.occupation.scoutBackstory?.home || 'None'}
- Scout Fears: ${payload.occupation.scoutBackstory?.fears || 'None'}
- Scout Notes: ${payload.occupation.scoutBackstory?.notes || 'None'}
- Occupational Skills: ${payload.occupation.occupationalSkills.join(', ')}

Occupation choice groups:
${occupationChoices}

Character brief:
${payload.description}

Era context guidance:
- Use the era context to infer what is normal, plausible, or anachronistic for this character.
- Let the setting and technology inform which skills make sense to emphasize or downplay.
- Match combat, literacy, travel, communication, and social expectations to the era.
- In Campfire Tales, treat the occupation as a scout hobby: favor kid-scale competence, squad teamwork, outdoors usefulness, curiosity, obligations, trusted adults, Family Credit Rating, and Cool rather than adult professional optimization.
${stringifyEraSpecificGuidance(payload.distribution.eraSpecificGuidance)}

Character analysis:
${payload.analysis ? stringifyAnalysis(payload.analysis) : 'Not yet analyzed.'}

Distribution policy:
- Signature skills target: ${payload.distribution.signatureSkillTarget}
- Secondary skills target: ${payload.distribution.secondarySkillTarget}
- Support skills target: ${payload.distribution.supportSkillTarget}
- Support point band: ${payload.distribution.supportPointBand.min}-${payload.distribution.supportPointBand.max} points
- Maximum high-skill count: ${payload.distribution.maxHighSkillCount}
- Common adventurer workhorse skills: ${stringifyUtilitySkills(payload.distribution.utilitySkills)}
- ${payload.era.id === 'campfire-tales' ? 'Family Credit Rating' : 'Credit Rating'} floor for this concept: ${typeof payload.distribution.minimumCreditRating === 'number' ? `${payload.distribution.minimumCreditRating}%` : 'not specified'}. Treat it as a hard floor and fund it before lower-priority filler.

Call of Cthulhu rules guidance:
- 0-19% is untrained. This represents someone with little reliable ability beyond raw intuition or minimal exposure.
- 20-49% is trained. This is a competent hobbyist, apprentice, or regular practitioner.
- 50%+ is professional. At this level the character can plausibly practice this skill as part of their job.
- 70%+ is highly competent or expert.
- 90%+ is exceptional mastery.
- Build a believable investigator first, not an optimized character build.
- Keep skills aligned with the character's profession, hobbies, trainings, life history, achievements, and the era.
- Prefer a broad spread of competence: many supporting skills should land in the 20-40 range, with core occupational skills around 40-60.
- Use 60-70 sparingly for true signature skills; avoid going above 70 unless the brief clearly describes an elite specialist.
- Do not dump most of a pool into one or two skills unless the concept absolutely demands a specialist.
- Treat 70% as a practical ceiling for starting investigators. Most skills should stay below 50%, and only one or two signature skills should approach 60-70%.
- Use 5-10 point nudges on adjacent skills to round out the concept, especially when they are plausibly related to the character description.
- Spread the remaining points in a ranked order: first the obvious occupational skills, then the strongest adjacent skills, then the useful background/support skills.
- Give at least some attention to common adventurer workhorse skills when they are eligible, even if the character brief is narrow: Spot Hidden, Listen, First Aid, Library Use, Psychology, Stealth, Dodge, Climb, Jump, Throw, Credit Rating, and combat fundamentals like Fighting or Firearms.
- If a workhorse skill fits the era and occupation, it should usually receive at least a small 5-10 point bump before obscure filler skills.
- Credit Rating or Family Credit Rating should always support the character’s profession, family situation, and social lifestyle. Never leave it at an implausibly low value for an ordinary or respectable concept, and raise it enough to match the expected class and comfort level.
- If the character is an academic, craftsman, or technical professional, distribute points across several related skills rather than overloading only one.
- Avoid bad investments unless the concept truly calls for them: Language (Own), niche foreign languages, obscure academic filler, and narrow crafts should usually get little or no investment.
- Never spend points on Language (Own) if the current base is already around 20-25% or higher. Only raise it if the character concept implies poor literacy or unusually weak reading/writing, and then only to the minimum needed to become functional.
- If you must raise a weak literacy score, aim for roughly 20-25% rather than pushing it higher.
- Before spending on niche skills, make sure the character already has strong investigation, social, and practical coverage.
- Specialized skills are written as Base (Specialization).
- If a specialized entry exists in the skill list, prefer that exact entry over the unspecialized parent.
- Never allocate points to the unspecialized parent of a skill family if specializations exist in the skill list or catalog. Always choose a specialization instead.
- Treat Language (Other), Pilot, Science, and Survival the same way: always resolve them to a concrete specialization, never leave the parent as the target skill.
- Use specializations to fit the concept when they make the character more precise, especially for combat, technical work, languages, and arts/crafts.
- Most investigators should have at least one combat-capable skill, usually Firearms (Handgun or Rifle/Shotgun) or Fighting (Brawl or another fitting specialization), unless the concept is clearly fully civilian and non-combative.
- A fully civilian character can still have Dodge or another defensive or practical combat-adjacent skill, but do not leave the sheet with no plausible way to survive trouble if the concept is ordinary or field-facing.
- Use the exact skill names provided in the list below.
- Do not invent new skills.
- Spend exactly the points available in each active pool.
- Ensure the finished sheet has a few strong anchors and several useful supporting skills so the character can contribute in investigation, social, practical, and survival scenes.
- Leave no points unspent in any active pool unless the pool total is zero.

Pool totals:
${[
    stringifyOptionalPoolSummary('Occupational', payload.pools.occupational),
    stringifyOptionalPoolSummary('Personal', payload.pools.personal),
    stringifyOptionalPoolSummary('Experience', payload.pools.experience),
    stringifyOptionalPoolSummary('Archetype', payload.pools.archetype),
].filter(Boolean).join('\n')}

Skills:
${stringifySkillList(payload.skills)}

Specialization catalog:
${stringifySpecializationCatalog(payload.specializations)}

Return only JSON in this exact shape:
{
  "rationale": "short explanation",
  "occupational": [{ "skill": "Persuade", "points": 20 }],
${activePools.includes('personal') ? '  "personal": [{ "skill": "Library Use", "points": 10 }],' : '  "personal": [],'}
${activePools.includes('experience') ? '  "experience": [{ "skill": "Spot Hidden", "points": 10 }],' : '  "experience": [],'}
${activePools.includes('archetype') ? '  "archetype": [{ "skill": "Dodge", "points": 10 }]' : '  "archetype": []'}
}

Active pool names: ${activePools.join(', ')}.
Skill names must match the provided list exactly.`;
};

const getSkillBaseName = (skillName: string) => skillName.split(' (')[0];
const isSpecializationSkillName = (skillName: string) => skillName.includes(' (');
const isPlaceholderSpecializationSkillName = (skillName: string) => skillName === 'Language (Other)';

const SPECIALIZATION_PREFERENCES: Record<string, string[]> = {
    Fighting: ['Brawl'],
    Firearms: ['Handgun', 'Rifle/Shotgun'],
    Pilot: ['Boat', 'Airplane', 'Helicopter', 'Balloon'],
    Science: ['Chemistry', 'Forensics', 'Biology', 'Physics'],
    Survival: ['Plains', 'Jungle', 'Desert', 'Sea', 'Arctic'],
};

const getSpecializationBaseNames = (
    skillSummaries: SkillDistributionSkillSummary[],
    specializationsCatalog: Record<string, string[]>,
) => {
    const baseNames = new Set<string>(Object.keys(specializationsCatalog).map(getSkillBaseName));
    for (const skill of skillSummaries) {
        if (isSpecializationSkillName(skill.name)) {
            baseNames.add(getSkillBaseName(skill.name));
        }
    }
    return baseNames;
};

const pickSpecializationName = (
    baseName: string,
    specializationsCatalog: Record<string, string[]>,
    availableSkillNames: Set<string>,
) => {
    const candidates = [
        ...(SPECIALIZATION_PREFERENCES[baseName] || []),
        ...(specializationsCatalog[baseName] || []),
    ];
    const allowedCandidates = new Set(candidates);

    for (const specialization of candidates) {
        const fullName = `${baseName} (${specialization})`;
        if (availableSkillNames.has(fullName)) return fullName;
    }

    const firstAvailable = Array.from(availableSkillNames)
        .filter(name => name.startsWith(`${baseName} (`))
        .filter(name => {
            const specialization = name.slice(baseName.length + 2, -1).trim();
            return allowedCandidates.has(specialization);
        })
        .sort((left, right) => left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }))[0];
    return firstAvailable || `${baseName} (${candidates[0] || 'Specialty'})`;
};

export const rewriteSkillAllocationsToSpecializations = (
    response: SkillDistributionResponse,
    skillSummaries: SkillDistributionSkillSummary[],
    specializationsCatalog: Record<string, string[]>,
    availableSkillNames: Set<string>,
) => {
    const specializationBaseNames = getSpecializationBaseNames(skillSummaries, specializationsCatalog);
    const rewriteAllocation = (allocation: SkillDistributionAllocation) => {
        const baseName = getSkillBaseName(allocation.skill);
        const hasSpecializations = specializationBaseNames.has(baseName);
        if (!hasSpecializations) {
            return allocation;
        }
        if (allocation.skill.includes('(') && !isPlaceholderSpecializationSkillName(allocation.skill)) {
            return allocation;
        }
        return {
            ...allocation,
            skill: pickSpecializationName(baseName, specializationsCatalog, availableSkillNames),
        };
    };

    return {
        rationale: response.rationale,
        occupational: response.occupational.map(rewriteAllocation),
        personal: response.personal.map(rewriteAllocation),
        experience: response.experience.map(rewriteAllocation),
        archetype: response.archetype.map(rewriteAllocation),
    };
};

const getSkillCurrentTotal = (
    skill: SkillDistributionSkillSummary,
    assignments: SkillPointAssignments,
) => {
    const assigned = assignments[skill.name] || { occupational: 0, personal: 0, experience: 0, archetype: 0 };
    return skill.base + assigned.occupational + assigned.personal + assigned.experience + assigned.archetype;
};

const isEligibleForPool = (skill: SkillDistributionSkillSummary, pool: SkillDistributionPoolId) => {
    if (pool === 'occupational') return skill.occupationalEligible;
    if (pool === 'personal') return skill.personalEligible;
    if (pool === 'experience') return skill.experienceEligible;
    return skill.archetypeEligible;
};

const applyPoolAllocations = (
    assignments: SkillPointAssignments,
    pool: SkillDistributionPoolId,
    allocations: SkillDistributionAllocation[],
    skillSummaries: SkillDistributionSkillSummary[],
    poolTotal: number,
) => {
    const allowedSkills = new Set(
        skillSummaries
            .filter(skill => isEligibleForPool(skill, pool))
            .map(skill => skill.name),
    );
    const sanitized = allocations
        .filter(entry => allowedSkills.has(entry.skill))
        .map(entry => ({ ...entry, points: sanitizePoints(entry.points) }))
        .filter(entry => entry.points > 0);

    const totalRequested = sanitized.reduce((sum, entry) => sum + entry.points, 0);
    if (totalRequested === 0) return;

    const normalizedAllocations = totalRequested <= poolTotal
        ? sanitized
        : (() => {
            const scale = poolTotal / totalRequested;
            const scaled = sanitized.map(entry => {
                const raw = entry.points * scale;
                return {
                    ...entry,
                    scaled: Math.floor(raw),
                    remainder: raw - Math.floor(raw),
                };
            });
            let used = scaled.reduce((sum, entry) => sum + entry.scaled, 0);
            const ordered = [...scaled].sort((left, right) => right.remainder - left.remainder);
            for (const entry of ordered) {
                if (used >= poolTotal) break;
                entry.scaled += 1;
                used += 1;
            }
            return scaled.map(({ skill, scaled }) => ({ skill, points: scaled }));
        })();

    for (const entry of normalizedAllocations) {
        if (!assignments[entry.skill]) {
            assignments[entry.skill] = { occupational: 0, personal: 0, experience: 0, archetype: 0 };
        }
        assignments[entry.skill][pool] += entry.points;
    }
};

const fillPoolShortfall = (
    assignments: SkillPointAssignments,
    pool: SkillDistributionPoolId,
    skillSummaries: SkillDistributionSkillSummary[],
    poolTotal: number,
    skillCap: number,
    occupationalSkillNames: Set<string>,
    utilitySkills: Set<string>,
) => {
    const totalSpent = skillSummaries.reduce((sum, skill) => {
        const current = assignments[skill.name] || { occupational: 0, personal: 0, experience: 0, archetype: 0 };
        return sum + current[pool];
    }, 0);
    let remaining = Math.max(0, poolTotal - totalSpent);
    if (remaining <= 0) return;

    const eligible = skillSummaries
        .filter(skill => isEligibleForPool(skill, pool))
        .map(skill => {
            const baseName = getSkillBaseName(skill.name);
            const hasSpecializationChildren = skillSummaries.some(other => other.name !== skill.name && other.name.startsWith(`${baseName} (`));
            const isCoreOccupational = pool === 'occupational'
                && (occupationalSkillNames.has(skill.name) || occupationalSkillNames.has(baseName));
            const isSpecialization = skill.name.includes(' (');
            const isUtility = utilitySkills.has(skill.name) || utilitySkills.has(baseName);
            const currentTotal = getSkillCurrentTotal(skill, assignments);
            return {
                skill,
                baseName,
                currentTotal,
                hasSpecializationChildren,
                priority: pool === 'occupational'
                    ? (isCoreOccupational ? 0 : (isUtility ? 1 : (isSpecialization ? 2 : 3)))
                    : (isUtility ? 0 : 1),
            };
        })
        .filter(candidate => !candidate.hasSpecializationChildren || isSpecializationSkillName(candidate.skill.name))
        .sort((left, right) => (
            left.priority - right.priority ||
            left.currentTotal - right.currentTotal ||
            left.skill.name.localeCompare(right.skill.name)
        ));

    if (eligible.length === 0) return;

    while (remaining > 0) {
        let progressed = false;
        for (const candidate of eligible) {
            if (remaining <= 0) break;
            const currentTotal = getSkillCurrentTotal(candidate.skill, assignments);
            if (currentTotal >= skillCap) continue;

            if (!assignments[candidate.skill.name]) {
                assignments[candidate.skill.name] = { occupational: 0, personal: 0, experience: 0, archetype: 0 };
            }
            assignments[candidate.skill.name][pool] += 1;
            remaining -= 1;
            progressed = true;
        }

        if (!progressed) break;
    }
};

const ensureMinimumCreditRating = (
    assignments: SkillPointAssignments,
    skillSummaries: SkillDistributionSkillSummary[],
    minimumCreditRating: number,
    occupationalSkillNames: Set<string>,
    utilitySkills: Set<string>,
    creditRatingSkillName = 'Credit Rating',
) => {
    if (minimumCreditRating <= 0) return;

    const targetName = creditRatingSkillName;
    const targetSummary = skillSummaries.find(skill => skill.name === targetName);
    if (!targetSummary || !isEligibleForPool(targetSummary, 'occupational')) return;

    const currentTarget = getSkillCurrentTotal(targetSummary, assignments);
    let needed = Math.max(0, minimumCreditRating - currentTarget);
    if (needed <= 0) return;

    if (!assignments[targetName]) {
        assignments[targetName] = { occupational: 0, personal: 0, experience: 0, archetype: 0 };
    }

    const donorPools: SkillDistributionPoolId[] = ['occupational', 'personal', 'experience', 'archetype'];
    for (const donorPool of donorPools) {
        if (needed <= 0) break;
        if (!isEligibleForPool(targetSummary, donorPool)) continue;

        const donors = skillSummaries
            .filter(skill => skill.name !== targetName && isEligibleForPool(skill, donorPool))
            .map(skill => {
                const baseName = getSkillBaseName(skill.name);
                const donorPoints = (assignments[skill.name] || { occupational: 0, personal: 0, experience: 0, archetype: 0 })[donorPool];
                const isCoreOccupational = donorPool === 'occupational' && (occupationalSkillNames.has(skill.name) || occupationalSkillNames.has(baseName));
                const isSpecialization = skill.name.includes(' (');
                const isUtility = utilitySkills.has(skill.name) || utilitySkills.has(baseName);
                return {
                    skill,
                    donorPoints,
                    priority: donorPool === 'occupational'
                        ? (isCoreOccupational ? 0 : (isSpecialization ? 1 : (isUtility ? 2 : 3)))
                        : (isUtility ? 0 : (isSpecialization ? 1 : 2)),
                };
            })
            .filter(candidate => candidate.donorPoints > 0)
            .sort((left, right) => (
                left.priority - right.priority ||
                right.donorPoints - left.donorPoints ||
                left.skill.name.localeCompare(right.skill.name)
            ));

        for (const donor of donors) {
            if (needed <= 0) break;
            const donorAssignment = assignments[donor.skill.name];
            if (!donorAssignment || donorAssignment[donorPool] <= 0) continue;

            const transferable = Math.min(needed, donorAssignment[donorPool]);
            donorAssignment[donorPool] -= transferable;
            assignments[targetName][donorPool] += transferable;
            needed -= transferable;
        }
    }
};

export const responseToSkillPointAssignments = (
    response: SkillDistributionResponse,
    skillSummaries: SkillDistributionSkillSummary[],
    poolTotals: Record<SkillDistributionPoolId, number>,
    options: SkillDistributionApplyOptions,
) => {
    const assignments: SkillPointAssignments = {};
    const occupationalSkillNames = new Set(options.occupationalSkillNames || []);
    const utilitySkills = new Set(options.utilitySkills || []);
    const specializationsCatalog = options.specializationsCatalog || {};
    const expandedSkillSummaries = [...skillSummaries];
    const existingSkillNames = new Set(skillSummaries.map(skill => skill.name));
    const specializationBaseNames = getSpecializationBaseNames(expandedSkillSummaries, specializationsCatalog);

    for (const [baseName, specializations] of Object.entries(specializationsCatalog)) {
        if (!specializations.length) continue;
        const parentSkill = skillSummaries.find(skill => skill.name === baseName || skill.name.startsWith(`${baseName} (`));
        const parentSummary = parentSkill || skillSummaries.find(skill => getSkillBaseName(skill.name) === baseName);
        if (!parentSummary) continue;

        for (const specialization of specializations) {
            const specializationName = `${baseName} (${specialization})`;
            if (existingSkillNames.has(specializationName)) continue;
            expandedSkillSummaries.push({
                name: specializationName,
                base: parentSummary.base,
                current: parentSummary.base,
                occupationalEligible: parentSummary.occupationalEligible,
                personalEligible: parentSummary.personalEligible,
                experienceEligible: parentSummary.experienceEligible,
                archetypeEligible: parentSummary.archetypeEligible,
                description: parentSummary.description,
            });
            existingSkillNames.add(specializationName);
        }
    }

    const resolveSpecializationTarget = (skillName: string) => {
        const baseName = getSkillBaseName(skillName);
        if (skillName.includes('(') && !isPlaceholderSpecializationSkillName(skillName)) return skillName;
        if (!specializationBaseNames.has(baseName)) return skillName;
        const candidate = pickSpecializationName(baseName, specializationsCatalog, existingSkillNames);
        return candidate;
    };

    const transformedResponse: SkillDistributionResponse = {
        rationale: response.rationale,
        occupational: response.occupational.map(entry => ({ ...entry, skill: resolveSpecializationTarget(entry.skill) })),
        personal: response.personal.map(entry => ({ ...entry, skill: resolveSpecializationTarget(entry.skill) })),
        experience: response.experience.map(entry => ({ ...entry, skill: resolveSpecializationTarget(entry.skill) })),
        archetype: response.archetype.map(entry => ({ ...entry, skill: resolveSpecializationTarget(entry.skill) })),
    };

    applyPoolAllocations(assignments, 'occupational', transformedResponse.occupational, expandedSkillSummaries, poolTotals.occupational);
    applyPoolAllocations(assignments, 'personal', transformedResponse.personal, expandedSkillSummaries, poolTotals.personal);
    applyPoolAllocations(assignments, 'experience', transformedResponse.experience, expandedSkillSummaries, poolTotals.experience);
    applyPoolAllocations(assignments, 'archetype', transformedResponse.archetype, expandedSkillSummaries, poolTotals.archetype);

    fillPoolShortfall(assignments, 'occupational', expandedSkillSummaries, poolTotals.occupational, options.skillCap, occupationalSkillNames, utilitySkills);
    fillPoolShortfall(assignments, 'personal', expandedSkillSummaries, poolTotals.personal, options.skillCap, occupationalSkillNames, utilitySkills);
    fillPoolShortfall(assignments, 'experience', expandedSkillSummaries, poolTotals.experience, options.skillCap, occupationalSkillNames, utilitySkills);
    fillPoolShortfall(assignments, 'archetype', expandedSkillSummaries, poolTotals.archetype, options.skillCap, occupationalSkillNames, utilitySkills);
    ensureMinimumCreditRating(assignments, expandedSkillSummaries, options.minimumCreditRating || 0, occupationalSkillNames, utilitySkills, options.creditRatingSkillName);

    return assignments;
};
