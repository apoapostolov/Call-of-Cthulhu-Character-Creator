import React, { useState, useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useEraContext } from '../context/SourceContext';
import { SkillsHeader } from './skills/SkillsHeader';
import { SkillRow } from './skills/SkillRow';
import { SKILL_GROUPS } from './skills/skill-utils';
import type { Skill } from '../types';
import { ChoiceSkillsSelector } from './skills/ChoiceSkillsSelector';
import { ChoiceSkillsModal } from './skills/ChoiceSkillsModal';

export const SkillsTab: React.FC = () => {
    const { selectedEra } = useEraContext();
    const { 
        attributes,
        selectedOccupation,
        occupationalSkillPoints,
        personalSkillPoints,
        archetypePoints,
        experiencePoints,
        skillPointAssignments,
        handleSkillPointChange,
        handleSkillsReset,
        handleAddSpecialization,
        handleDeleteSpecialization,
        aggregatedData,
        activeSkillPool,
        setActiveSkillPool,
        allSkillsWithCalculatedBases,
        allOccupationChoicesMade,
        effectiveOccupationalSkills,
        occupationSkillChoices,
        handleOccupationSkillChoice,
        experienceEligibleSkills,
        archetypeEligibleSkills,
        pulpRulesEnabled,
        lifeEventModifiers,
        rolledLifeEvents,
    } = useCharacterContext();

    const [skillPointStep, setSkillPointStep] = useState(1);
    const [groupSkills, setGroupSkills] = useState(false);
    const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false);
    const [activeChoiceGroupIndex, setActiveChoiceGroupIndex] = useState<number | null>(null);

    const allSkills = useMemo(() => {
        return allSkillsWithCalculatedBases.sort((a,b) => a.name.localeCompare(b.name));
    }, [allSkillsWithCalculatedBases]);

    if (!selectedOccupation || !attributes) {
        return (
            <div className="space-y-6 max-w-4xl mx-auto bg-card p-6 rounded-lg border border-border shadow-xl shadow-primary-900/15">
                <h2 className="text-3xl font-bold font-lora text-primary text-center">Skill Allocation</h2>
                <p className="text-center text-lg text-muted-foreground py-8">
                    Please select an occupation on the "Characteristics" tab to begin allocating skill points.
                </p>
            </div>
        );
    }
    
    const handleOpenChoiceModal = (index: number) => {
        setActiveChoiceGroupIndex(index);
        setIsChoiceModalOpen(true);
    };

    const handleCloseChoiceModal = () => {
        setIsChoiceModalOpen(false);
        setActiveChoiceGroupIndex(null);
    };
    
    // If a parent specialty skill is occupational (e.g., Language (Other) or Science),
    // then all of its specializations should count as occupational.
    const occupationalParentStubs = useMemo(() => {
        const stubs = new Set<string>();
        aggregatedData.SKILLS.forEach(s => {
            if (s.specialty) {
                if (effectiveOccupationalSkills.has(s.name)) {
                    const stub = s.stub || s.name.split(' (')[0];
                    stubs.add(stub);
                }
            }
        });
        return stubs;
    }, [aggregatedData.SKILLS, effectiveOccupationalSkills]);

    const renderSkillRow = (skill: Skill) => {
        const assignment = skillPointAssignments[skill.name] || { occupational: 0, personal: 0, experience: 0, archetype: 0 };
        const totalValue = skill.base + assignment.occupational + assignment.personal + (assignment.experience || 0) + (assignment.archetype || 0);
        const cap = (pulpRulesEnabled || selectedEra === 'pulp-1930s' || selectedEra === 'gaslight-1890s') ? 95 : 75;
        const baseName = skill.name.split(' (')[0];
        const isOccByParentStub = skill.name.includes('(') && occupationalParentStubs.has(baseName);
        const isOccupationalSkill = effectiveOccupationalSkills.has(skill.name) || effectiveOccupationalSkills.has(baseName) || isOccByParentStub;
        const hasOccPoints = isOccupationalSkill && occupationalSkillPoints.remaining > 0;
        const isEligibleForPersonal = baseName !== 'Cthulhu Mythos' && skill.name !== 'Cthulhu Mythos';
        const hasPersPoints = personalSkillPoints.remaining > 0 && isEligibleForPersonal;
        const hasExpPoints = (experiencePoints?.remaining ?? 0) > 0;
        const hasArchPoints = (archetypePoints?.remaining ?? 0) > 0;
        const isEligibleForExperience = experienceEligibleSkills.has(skill.name) || experienceEligibleSkills.has(baseName);
        const isEligibleForArchetype = archetypeEligibleSkills.has(skill.name) || archetypeEligibleSkills.has(baseName);
        const canIncrementFromPool =
            (activeSkillPool === 'personal' && hasPersPoints) ||
            (activeSkillPool === 'occupational' && hasOccPoints) ||
            (activeSkillPool === 'experience' && hasExpPoints && isEligibleForExperience) ||
            (activeSkillPool === 'archetype' && hasArchPoints && isEligibleForArchetype);
        const canIncrement = canIncrementFromPool && totalValue < cap;

        const specializationKey = skill.stub || skill.name;
        const availableSubTypes = aggregatedData.SKILL_SPECIALIZATIONS[specializationKey]
            ?.filter(sub => !allSkills.some(s => s.name === `${specializationKey} (${sub})`)) || [];

        // Life Event modifiers (Dark Ages only)
        const isDarkAges = selectedEra === 'dark-ages-1000s';
        const lifeEventChange = isDarkAges ? (lifeEventModifiers.skills[skill.name] || 0) : 0;
        const lifeEventSource = (isDarkAges && lifeEventChange !== 0)
            ? rolledLifeEvents
                .filter(e => e.modifiers?.skills?.[skill.name])
                .map(e => e.name)
                .join(', ')
            : undefined;

        return (
                <SkillRow
                    key={skill.name}
                    skill={skill}
                    baseValue={skill.base}
                    isOccupational={isOccupationalSkill}
                    assignedPoints={assignment}
                    onPointChange={(amount) => handleSkillPointChange(skill.name, amount)}
                    canIncrement={canIncrement}
                    canDecrement={assignment.occupational > 0 || assignment.personal > 0 || (assignment.experience || 0) > 0 || (assignment.archetype || 0) > 0}
                    availableSpecializations={availableSubTypes}
                    onAddSpecialization={handleAddSpecialization}
                    onDeleteSpecialization={handleDeleteSpecialization}
                    pointStep={skillPointStep}
                    activeSkillPool={activeSkillPool}
                    lifeEventChange={lifeEventChange}
                    lifeEventSource={lifeEventSource}
                    isEligibleForActivePool={
                        activeSkillPool === 'personal'
                            ? isEligibleForPersonal
                            : activeSkillPool === 'occupational'
                                ? isOccupationalSkill
                                : activeSkillPool === 'experience'
                                    ? isEligibleForExperience
                                    : (activeSkillPool === 'archetype' && isEligibleForArchetype)
                    }
                />
            );
    };

    const renderSkillColumns = (skillsToRender: Skill[]) => {
        const columnSize = Math.ceil(skillsToRender.length / 3);
        const columns = [
            skillsToRender.slice(0, columnSize),
            skillsToRender.slice(columnSize, columnSize * 2),
            skillsToRender.slice(columnSize * 2)
        ];

        return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
                {columns.map((columnSkills, colIndex) => (
                    <div key={colIndex} className="space-y-2">
                        {columnSkills.map(skill => renderSkillRow(skill))}
                    </div>
                ))}
            </div>
        );
    };
    
    const activeChoiceGroup = activeChoiceGroupIndex !== null ? selectedOccupation.choiceGroups?.[activeChoiceGroupIndex] : null;

    // Choose the best pool on entry with priority: Archetype > Occupational > Personal > Experience
    // Preference order: in-progress (spent > 0 and remaining > 0), then any with remaining > 0.
    const chooseBestAvailablePool = React.useCallback(() => {
        const pools: Array<{ key: 'archetype' | 'occupational' | 'personal' | 'experience'; points: any | null | undefined }> = [
            { key: 'archetype', points: archetypePoints },
            { key: 'occupational', points: occupationalSkillPoints },
            { key: 'personal', points: personalSkillPoints },
            { key: 'experience', points: experiencePoints },
        ];
        // First, pools that are in-progress
        for (const p of pools) {
            const total = p.points?.total ?? 0;
            const spent = p.points?.spent ?? 0;
            const remaining = p.points?.remaining ?? 0;
            if (total > 0 && spent > 0 && remaining > 0) return p.key;
        }
        // Next, any pool with remaining>0 (skip unused totals=0 or exhausted remaining=0)
        for (const p of pools) {
            const total = p.points?.total ?? 0;
            const remaining = p.points?.remaining ?? 0;
            if (total > 0 && remaining > 0) return p.key;
        }
        return activeSkillPool; // default: don't change
    }, [archetypePoints, occupationalSkillPoints, personalSkillPoints, experiencePoints, activeSkillPool]);

    // On entering the tab (after occupation choices), default once per mount.
    const didInitPoolRef = React.useRef(false);
    React.useEffect(() => {
        if (!allOccupationChoicesMade) return;
        if (didInitPoolRef.current) return;
        const best = chooseBestAvailablePool();
        setActiveSkillPool(best);
        didInitPoolRef.current = true;
        // Intentionally exclude dependencies that would re-run this beyond initial mount/ready
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allOccupationChoicesMade]);

    // If the current pool becomes exhausted and others remain, switch to the next available based on priority.
    React.useEffect(() => {
        if (!allOccupationChoicesMade) return; // pools not active yet
    const archRemain = archetypePoints?.remaining ?? 0;
    const occRemain = occupationalSkillPoints?.remaining ?? 0;
    const perRemain = personalSkillPoints?.remaining ?? 0;
    const expRemain = experiencePoints?.remaining ?? 0;

        const remainingByPool: Record<typeof activeSkillPool, number> = {
            archetype: archRemain,
            occupational: occRemain,
            personal: perRemain,
            experience: expRemain,
        } as const;

        // Only auto-switch if the currently selected pool is exhausted (remaining <= 0)
        if ((remainingByPool[activeSkillPool] || 0) <= 0) {
            const best = chooseBestAvailablePool();
            if (best !== activeSkillPool) setActiveSkillPool(best);
        }
    }, [activeSkillPool, archetypePoints?.remaining, occupationalSkillPoints?.remaining, personalSkillPoints?.remaining, experiencePoints?.remaining, allOccupationChoicesMade, chooseBestAvailablePool, setActiveSkillPool]);

    return (
        <div className="space-y-6 max-w-4xl mx-auto bg-card p-6 rounded-lg border border-border shadow-xl shadow-primary-900/15">
             {isChoiceModalOpen && activeChoiceGroup && (
                <ChoiceSkillsModal
                    group={activeChoiceGroup}
                    groupIndex={activeChoiceGroupIndex!}
                    selectedSkills={occupationSkillChoices[activeChoiceGroupIndex!] || []}
                    onToggleSkill={handleOccupationSkillChoice}
                    onClose={handleCloseChoiceModal}
                    allSkills={allSkills}
                    fixedOccupationalSkills={selectedOccupation.occupationalSkills}
                />
            )}
            {!allOccupationChoicesMade ? (
                <ChoiceSkillsSelector
                    occupation={selectedOccupation}
                    selectedChoices={occupationSkillChoices}
                    onOpenModal={handleOpenChoiceModal}
                    onReset={handleSkillsReset}
                />
            ) : (
                <SkillsHeader
                    occupationalPoints={occupationalSkillPoints}
                    personalPoints={personalSkillPoints}
                    archetypePoints={archetypePoints && archetypePoints.total > 0 ? archetypePoints : undefined}
                    experiencePoints={experiencePoints && experiencePoints.total > 0 ? experiencePoints : undefined}
                    onReset={handleSkillsReset}
                    pointStep={skillPointStep}
                    onPointStepToggle={() => setSkillPointStep(s => s === 1 ? 5 : 1)}
                    groupSkills={groupSkills}
                    onGroupToggle={() => setGroupSkills(g => !g)}
                    activeSkillPool={activeSkillPool}
                    onSkillPoolToggle={setActiveSkillPool}
                />
            )}

            {groupSkills ? (
                SKILL_GROUPS.map(group => {
                    const groupSkillsList = allSkills.filter(s => {
                        const baseName = s.name.split(' (')[0];
                        return group.skills.includes(s.name) || group.skills.includes(baseName);
                    });

                    if (groupSkillsList.length === 0) return null;
                    
                    return (
                        <div key={group.name}>
                            <h3 className="text-xl font-lora font-semibold text-primary-800 mb-3 border-b-2 border-border pb-2">{group.name}</h3>
                            {renderSkillColumns(groupSkillsList)}
                        </div>
                    );
                })
            ) : (
                renderSkillColumns(allSkills)
            )}
        </div>
    );
};
