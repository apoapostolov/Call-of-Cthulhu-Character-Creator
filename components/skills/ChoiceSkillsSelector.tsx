import React from 'react';
import type { Occupation } from '../../types';
import { ResetIcon } from '../icons/ResetIcon';
import { CheckCircleIcon } from '../icons/CheckCircleIcon';
import { useEraContext } from '../../context/SourceContext';
import { useCharacterContext } from '../../context/CharacterContext';

interface ChoiceSkillsSelectorProps {
    occupation: Occupation;
    selectedChoices: Record<number, string[]>;
    onOpenModal: (groupIndex: number) => void;
    onReset: () => void;
}

export const ChoiceSkillsSelector: React.FC<ChoiceSkillsSelectorProps> = ({ occupation, selectedChoices, onOpenModal, onReset }) => {
    const { selectedEra } = useEraContext();
    const { pulpRulesEnabled, setPulpRulesEnabled } = useCharacterContext();
    const isPulpEra = selectedEra === 'pulp-1930s';
    const isWesternEra = (selectedEra === 'western-1870s' || selectedEra === 'western-1880s');

    return (
        <div>
             <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-6 mb-4">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-bold font-lora text-primary-800">Skill Selection</h2>
                    <p className="text-muted-foreground mt-1 break-words">Your chosen occupation requires you to select some of your occupational skills. Make your selections below to unlock your skill points.</p>
                </div>
                <div className="flex items-center gap-3 md:self-start shrink-0">
                    <button onClick={onReset} className="shrink-0 flex items-center justify-center gap-2 bg-secondary hover:bg-opacity-80 text-secondary-foreground font-bold py-2 px-3 rounded-lg text-sm transition-colors border border-border">
                        <ResetIcon className="h-4 w-4" /> Reset All Selections
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {occupation.choiceGroups?.map((group, index) => {
                    const choices = selectedChoices[index] || [];
                    const isComplete = choices.length === group.count;
                    return (
                        <div key={index} className={`p-4 rounded-lg border bg-card ${isComplete ? 'border-success-300' : 'border-border'} shadow-sm`}>
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-bold text-primary">Choice: Select {group.count} Skill{group.count > 1 ? 's' : ''}</h3>
                                {isComplete && <CheckCircleIcon className="h-6 w-6 text-success-600" />}
                            </div>
                            <p className="text-sm text-muted-foreground italic my-2">
                                Options: {group.options[0] === '*' ? 'Any Skill' : group.options.join(', ')}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="flex-grow min-h-[40px] bg-card p-2 rounded-md border border-border flex items-center flex-wrap gap-2">
                                    {choices.length > 0 ? choices.map(skill => (
                                        <span key={skill} className="bg-primary text-primary-foreground text-sm font-semibold px-2 py-1 rounded-md border border-primary">{skill}</span>
                                    )) : <span className="text-sm text-muted-foreground">No skills selected yet.</span>}
                                </div>
                                <button onClick={() => onOpenModal(index)} className="bg-primary hover:bg-opacity-80 text-primary-foreground font-bold py-2 px-4 rounded-lg flex-shrink-0 border border-primary/60 shadow-sm">
                                    {isComplete ? 'Change' : 'Choose'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
