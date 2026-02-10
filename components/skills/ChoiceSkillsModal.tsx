import React, { useMemo } from 'react';
import type { Occupation, Skill } from '../../types';
import { SKILL_SPECIALIZATIONS } from '../../skill-specializations-data';
import { useCharacterContext } from '../../context/CharacterContext';

interface ChoiceSkillsModalProps {
  group: NonNullable<Occupation['choiceGroups']>[0];
  groupIndex: number;
  selectedSkills: string[];
  onToggleSkill: (groupIndex: number, skillName: string) => void;
  onClose: () => void;
  allSkills: Skill[];
  fixedOccupationalSkills: string[];
}

export const ChoiceSkillsModal: React.FC<ChoiceSkillsModalProps> = ({ group, groupIndex, selectedSkills, onToggleSkill, onClose, allSkills, fixedOccupationalSkills }) => {
    const isConfirmDisabled = selectedSkills.length !== group.count;
    const { occupationSkillChoices } = useCharacterContext();

    const availableOptions = useMemo(() => {
        if (group.options[0] !== '*') {
            // Try to detect if this group is a specialization set (e.g., Art and Craft, Science, etc.)
            let parentKey: string | null = null;
            for (const key of Object.keys(SKILL_SPECIALIZATIONS)) {
                const set = new Set(SKILL_SPECIALIZATIONS[key]);
                const allIncluded = group.options.every(o => set.has(o));
                if (allIncluded) { parentKey = key; break; }
            }

            const mapped = group.options.map(o => parentKey ? `${parentKey} (${o})` : o);
            return mapped.sort();
        }
        // Handle 'any other skill'
        const fixedAndSpecializationStubs = new Set(
            fixedOccupationalSkills.map(s => s.split(' (')[0])
        );
        return allSkills
            .filter(skill => {
                const baseName = skill.name.split(' (')[0];
                return !fixedAndSpecializationStubs.has(skill.name) && !fixedAndSpecializationStubs.has(baseName)
            })
            .map(skill => skill.name)
            .sort();
    }, [group.options, allSkills, fixedOccupationalSkills]);

    const numCols = availableOptions.length > 16 ? 'lg:grid-cols-4' : availableOptions.length > 4 ? 'md:grid-cols-2' : '';

    // Compute globally chosen skills across groups (exclude current group)
    const globallyChosen = useMemo(() => {
        const set = new Set<string>();
        Object.entries(occupationSkillChoices || {}).forEach(([idx, choices]) => {
            if (Number(idx) === groupIndex) return;
            choices.forEach(name => set.add(name));
        });
        return set;
    }, [occupationSkillChoices, groupIndex]);
    
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-card border-2 border-primary/50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-border bg-card/70 rounded-t-lg">
                    <h2 className="text-2xl font-bold font-lora text-primary">Choose Occupational Skills</h2>
                </header>
                <div className="p-6 overflow-y-auto">
                    <p className="text-muted-foreground mb-4">Select {group.count} skill(s) from the list below. You have selected {selectedSkills.length} of {group.count}.</p>
                    <div className={`grid grid-cols-2 ${numCols} gap-2`}>
                        {availableOptions.map(skillName => {
                            const isSelected = selectedSkills.includes(skillName);
                            // Disable if this option already chosen in another group
                            const alreadyPickedElsewhere = globallyChosen.has(skillName);
                            const isDisabled = (!isSelected && (selectedSkills.length >= group.count)) || alreadyPickedElsewhere;
                            return (
                                <button
                                    key={skillName}
                                    onClick={() => onToggleSkill(groupIndex, skillName)}
                                    disabled={isDisabled}
                                    className={`p-2 rounded-md border text-sm w-full transition-colors duration-200 disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed ${isSelected ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-foreground hover:border-primary/50'}`}
                                >
                                    {skillName}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <footer className="p-4 bg-cream-200 border-t border-border flex justify-end rounded-b-lg">
                    <button onClick={onClose} disabled={isConfirmDisabled} className="bg-primary hover:bg-opacity-80 disabled:bg-neutral-300 text-primary-foreground font-bold py-2 px-6 rounded-lg shadow-sm">
                        Confirm Choices
                    </button>
                </footer>
            </div>
        </div>
    );
};
