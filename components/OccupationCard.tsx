import React from 'react';
import type { Occupation } from '../types';
import { QuestionIcon } from './icons/QuestionIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OccupationCardProps {
    occupation: Occupation;
    isSelected: boolean;
    onSelect: () => void;
    onShowInfo: () => void;
    recommendationLevel?: 'BEST CHOICE' | 'RECOMMENDED';
}

const RecommendationPill: React.FC<{ level: 'BEST CHOICE' | 'RECOMMENDED' }> = ({ level }) => {
    const isBest = level === 'BEST CHOICE';
    const text = isBest ? 'BEST CHOICE' : 'SUGGESTED';
    const colors = isBest 
        ? 'bg-[var(--surface-warning)] border-warning text-warning'
        : 'bg-[var(--surface-info)] border-info text-info';
    
    return (
        <div className={`px-2 py-0.5 rounded-full text-xs font-bold border ${colors}`}>
            {text}
        </div>
    );
};

export const OccupationCard: React.FC<OccupationCardProps> = ({ occupation, isSelected, onSelect, onShowInfo, recommendationLevel }) => {

    const borderClasses = isSelected 
        ? 'border-primary ring-2 ring-ring' 
        : `border-border hover:border-primary`;
        
    return (
        <div className={`relative w-full bg-card rounded-lg border-2 transition-all duration-200 ${borderClasses} flex flex-col shadow-sm`}>
            <div className="flex-grow">
                <button
                    onClick={onSelect}
                    className="w-full h-full text-left p-4"
                    aria-pressed={isSelected}
                >
                    <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-bold font-lora text-lg text-primary flex items-center gap-2`}>
                            {occupation.name}
                            {occupation.isNew && occupation.eraId !== 'pulp-1930s' && occupation.eraId !== 'gaslight-1890s' && (
                                <span className="text-[10px] font-black tracking-wide px-1.5 py-0.5 rounded-full bg-[var(--surface-success)] text-success border border-success">NEW</span>
                            )}
                        </h4>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {recommendationLevel && <RecommendationPill level={recommendationLevel} />}
                            <button
                                onClick={(e) => { e.stopPropagation(); onShowInfo(); }}
                                className="text-neutral-400 hover:text-primary transition-colors p-1 -m-1"
                                aria-label="Show occupation details"
                            >
                                <QuestionIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <p className="text-sm text-foreground/80 mt-2 line-clamp-4">{occupation.description}</p>
                </button>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-background p-1 rounded-full pointer-events-none">
                 <div className={`w-8 h-8 rounded-full border-2 grid place-items-center transition-all ${isSelected ? 'border-primary' : 'border-border'}`}>
                    {isSelected && <CheckIcon className="w-5 h-5 text-primary" />}
                </div>
            </div>
        </div>
    );
};
