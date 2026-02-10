import React from 'react';
import { ResetIcon } from '../icons/ResetIcon';
import { Tooltip } from '../Tooltip';

type PointsPool = {
    total: number;
    spent: number;
    remaining: number;
    formula: string;
    calculation: string;
};

interface SkillsHeaderProps {
    archetypePoints?: PointsPool | null;
    occupationalPoints: PointsPool;
    personalPoints: PointsPool;
    experiencePoints?: (PointsPool & { title?: string }) | null;
    onReset: () => void;
    pointStep: number;
    onPointStepToggle: () => void;
    groupSkills: boolean;
    onGroupToggle: () => void;
    activeSkillPool: 'archetype' | 'occupational' | 'personal' | 'experience';
    onSkillPoolToggle: (pool: 'archetype' | 'occupational' | 'personal' | 'experience') => void;
}

const PointPoolDisplay: React.FC<{ title: string; points: PointsPool; className: string; isActive: boolean; onClick: () => void; }> = ({ title, points, className, isActive, onClick }) => {
    const hasFormula = !!points.formula;
    const hasCalc = !!points.calculation;
    const isExperience = title === 'Experience Points';
    const tooltipContent = (isExperience ? hasCalc : (hasFormula || hasCalc)) ? (
        <div className="text-xs text-left">
            {!isExperience && hasFormula && (<p className="font-bold">Formula: {points.formula}</p>)}
            {hasCalc && (
                isExperience
                    ? <p><span className="font-bold">Pick from:</span> {points.calculation}</p>
                    : <p>Calculation: {points.calculation}</p>
            )}
        </div>
    ) : undefined;

    return (
        <Tooltip content={tooltipContent}>
            <button
                onClick={onClick}
                className={`h-full p-3 pt-4 rounded-lg border-2 border-t-4 text-center w-full transition-all duration-200 relative ${className} ${isActive ? 'ring-2 ring-primary/80 shadow-lg' : 'opacity-75 hover:opacity-100'}`}
                aria-pressed={isActive}
            >
                 {isActive && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[9px] font-bold uppercase px-2 py-0.5 rounded-b-sm tracking-wider">
                        SPENDING
                    </div>
                )}
                <div className="font-bold uppercase text-sm">{title}</div>
                <div className={`font-mono transition-all ${isActive ? 'text-4xl font-extrabold' : 'text-3xl font-bold'}`}>{points.remaining}</div>
                <div className="text-xs font-mono">of {points.total}</div>
            </button>
        </Tooltip>
    );
};

export const SkillsHeader: React.FC<SkillsHeaderProps> = ({ archetypePoints, occupationalPoints, personalPoints, experiencePoints, onReset, pointStep, onPointStepToggle, groupSkills, onGroupToggle, activeSkillPool, onSkillPoolToggle }) => {
    const showExperience = !!(experiencePoints && experiencePoints.total > 0);
    const showArchetype = !!(archetypePoints && archetypePoints.total > 0);
    const gridColsClass = showArchetype && showExperience
        ? 'grid-cols-4'
        : (showArchetype || showExperience) ? 'grid-cols-3' : 'grid-cols-2';
    return (
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div className="flex-grow">
                <h2 className="text-3xl font-bold font-lora text-primary-800">Skill Allocation</h2>
                <div className={`grid ${gridColsClass} gap-4 mt-4 items-stretch`}>
                    {showArchetype && (
                        <PointPoolDisplay
                            title="Archetype Points"
                            points={archetypePoints!}
                            className="bg-primary-100/70 border-primary-300 text-primary-800"
                            isActive={activeSkillPool === 'archetype'}
                            onClick={() => onSkillPoolToggle('archetype')}
                        />
                    )}
                    <PointPoolDisplay
                        title="Occupation Points"
                        points={occupationalPoints}
                        className="bg-success-100/70 border-success-300 text-success-800"
                        isActive={activeSkillPool === 'occupational'}
                        onClick={() => onSkillPoolToggle('occupational')}
                    />
                    <PointPoolDisplay
                        title="Personal Points"
                        points={personalPoints}
                        className="bg-info-100/70 border-info-300 text-info-800"
                        isActive={activeSkillPool === 'personal'}
                        onClick={() => onSkillPoolToggle('personal')}
                    />
                    {showExperience && (
                        <PointPoolDisplay
                            title={`Experience Points`}
                            points={experiencePoints!}
                            className="bg-warning-100/70 border-warning-300 text-warning-800"
                            isActive={activeSkillPool === 'experience'}
                            onClick={() => onSkillPoolToggle('experience')}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col items-stretch md:items-end gap-3 flex-shrink-0">
                <div className="flex items-center justify-end gap-3 text-sm">
                    <span className="font-bold text-muted-foreground">Group Skills:</span>
                    <button onClick={onGroupToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring ${groupSkills ? 'bg-primary' : 'bg-secondary'}`} aria-label="Toggle skill grouping">
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${groupSkills ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <div className="flex items-center justify-end gap-3 text-sm">
                     <span className="font-bold text-muted-foreground">{pointStep} Point{pointStep > 1 ? 's' : ''} per Click:</span>
                    <button onClick={onPointStepToggle} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card focus:ring-ring ${pointStep === 5 ? 'bg-primary' : 'bg-secondary'}`} aria-label="Toggle point allocation step">
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pointStep === 5 ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
                <button onClick={onReset} className="flex items-center justify-center gap-2 bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-2 px-3 rounded-lg text-sm transition-colors border-b-2 border-black/20">
                    <ResetIcon className="h-4 w-4" /> Reset All Points
                </button>
            </div>
        </div>
    );
};
