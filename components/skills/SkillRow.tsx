import React, { useState } from 'react';
import type { Skill as SkillType } from '../../types';
import { useCharacterContext } from '../../context/CharacterContext';
import { Tooltip } from '../Tooltip';
import { CheckIcon } from '../icons/CheckIcon';
import { ModifierPill } from '../ModifierPill';

interface SkillRowProps {
    skill: SkillType;
    baseValue: number;
    isOccupational: boolean;
    assignedPoints: { occupational: number; personal: number; experience?: number; archetype?: number };
    onPointChange: (amount: number) => void;
    canIncrement: boolean;
    canDecrement: boolean;
    availableSpecializations: string[];
    onAddSpecialization: (displayName: string, specializationBase: string, subType: string) => void;
    onDeleteSpecialization: (skillName: string) => void;
    pointStep: number;
    activeSkillPool: 'archetype' | 'occupational' | 'personal' | 'experience';
    isEligibleForActivePool: boolean;
    lifeEventChange?: number;
    lifeEventSource?: string;
}

export const SkillRow: React.FC<SkillRowProps> = ({ skill, baseValue, isOccupational, assignedPoints, onPointChange, canIncrement, canDecrement, availableSpecializations, onAddSpecialization, onDeleteSpecialization, pointStep, activeSkillPool, isEligibleForActivePool, lifeEventChange, lifeEventSource }) => {
    const { aggregatedData, allSkillsWithCalculatedBases, effectiveOccupationalSkills } = useCharacterContext();
    const [isSpecializing, setIsSpecializing] = useState(false);
    const [selectedSubType, setSelectedSubType] = useState('');

    // Only apply life event modifier if it's non-zero (which means it's Dark Ages era)
    const totalValue = baseValue + assignedPoints.occupational + assignedPoints.personal + (assignedPoints.experience || 0) + (assignedPoints.archetype || 0) + ((lifeEventChange && lifeEventChange !== 0) ? lifeEventChange : 0);

    const isParentSpecializationSkill = skill.specialty === true;
    const isSpecialization = !skill.specialty && skill.name.includes('(');
    const baseNameForSpec = isSpecialization ? skill.name.split(' (')[0] : '';
    const parentSpecialtyExists = isSpecialization
        ? aggregatedData.SKILLS.some(s => s.specialty && (s.name === baseNameForSpec || s.stub === baseNameForSpec))
        : false;
    const isOccSpecialization = isSpecialization && (effectiveOccupationalSkills.has(skill.name));

    const isSelectableByPool = isEligibleForActivePool;
    const showPointButtons = isSelectableByPool && !isParentSpecializationSkill;
    const showAddSpecializationButton = isParentSpecializationSkill;

    const handleConfirmSpecialization = () => {
        if (selectedSubType) {
            onAddSpecialization(skill.name, skill.stub || skill.name, selectedSubType);
            setIsSpecializing(false);
            setSelectedSubType('');
        }
    };

    // Build skill tooltip with life events
    const hasLifeEvent = lifeEventChange && lifeEventChange !== 0;
    const skillTooltip = skill.description;
    const lifeEventInfo = hasLifeEvent && lifeEventSource
        ? `\n\nLife Events: ${lifeEventSource} (${lifeEventChange > 0 ? '+' : ''}${lifeEventChange})`
        : '';
    const fullTooltip = skillTooltip + lifeEventInfo;

    return (
        <div className={`shadow-sm rounded-md border transition-all duration-300 ${isOccupational ? 'border-success-300' : 'border-border'} ${!isSelectableByPool ? 'bg-muted opacity-30' : 'bg-background'}`}>
            <div className="flex items-center justify-between p-2">
                <Tooltip content={<div className="text-xs whitespace-pre-wrap">{fullTooltip}</div>}>
                    <div 
                        className={`font-bold flex items-center ${!isSelectableByPool ? 'text-muted-foreground' : ''} ${hasLifeEvent ? 'cursor-help' : ''}`}
                        style={hasLifeEvent ? { color: '#355e3b' } : (isOccupational ? { color: undefined } : undefined)}
                    >
                        <span className={isOccupational && !hasLifeEvent ? 'text-success-800' : ''}>{skill.name}</span>
                        {skill.specialty && <i className="fa-solid fa-list ml-2 text-xs text-muted-foreground" title="This skill has specializations"></i>}
                    </div>
                </Tooltip>
                <div className="flex items-center gap-2">
                    <div className="text-xl font-mono w-16 text-center py-1 rounded">
                        {totalValue}%
                    </div>
                    {showPointButtons && (
                        <>
                            <button onClick={() => onPointChange(-pointStep)} disabled={!canDecrement} className="w-8 h-8 bg-card hover:bg-danger-200/50 rounded text-danger-700 font-bold text-xl disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center shadow-sm border border-border">-</button>
                            <button onClick={() => onPointChange(pointStep)} disabled={!canIncrement} className="w-8 h-8 bg-card hover:bg-success-200/50 rounded text-success-700 font-bold text-xl disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed flex items-center justify-center shadow-sm border border-border">+</button>
                        </>
                    )}
                </div>
            </div>
            {isSelectableByPool && showAddSpecializationButton && (
                <div className="p-2 pt-0">
                    {!isSpecializing ? (
                        <button onClick={() => setIsSpecializing(true)} className="w-full text-center py-1 px-3 rounded-md bg-accent/20 hover:bg-accent/30 text-accent-800 font-semibold border border-accent/40 transition-colors text-sm">
                            Add Specialization...
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-cream-200 p-2 rounded-md border border-secondary-400">
                            <select
                                value={selectedSubType}
                                onChange={(e) => setSelectedSubType(e.target.value)}
                                className="bg-card border border-border rounded-md p-1.5 text-sm text-foreground focus:ring-1 focus:ring-ring focus:border-primary hover:border-primary max-w-[280px] truncate"
                                title={selectedSubType || 'Select specialization'}
                            >
                                <option value="">Select...</option>
                                {availableSpecializations.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                            </select>
                            <button onClick={handleConfirmSpecialization} disabled={!selectedSubType} className="p-1.5 bg-primary hover:bg-opacity-80 text-primary-foreground rounded-md disabled:bg-neutral-300 flex-shrink-0"><CheckIcon className="h-4 w-4" /></button>
                            <button onClick={() => setIsSpecializing(false)} className="p-1.5 bg-muted hover:bg-danger-200 text-muted-foreground hover:text-danger-800 rounded-md flex-shrink-0"><i className="fa-solid fa-xmark h-4 w-4"></i></button>
                        </div>
                    )}
                </div>
            )}
            {isSelectableByPool && isSpecialization && (totalValue === baseValue) && skill.name !== 'Language (Own)' && parentSpecialtyExists && !isOccSpecialization && (
                <div className="p-2 pt-0">
                    <button onClick={() => onDeleteSpecialization(skill.name)} className="w-full text-center py-1 px-3 rounded-md bg-card hover:bg-danger-200/50 text-danger-800 font-semibold border border-border hover:border-danger-400/50 transition-colors text-sm">
                        Delete Specialization
                    </button>
                </div>
            )}
        </div>
    );
};
