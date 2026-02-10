

import React, { useMemo, useEffect, useState } from 'react';
import { useCharacterContext } from '../../context/CharacterContext';
import { GenderSelector } from './GenderSelector';
import { DiceIcon } from '../icons/DiceIcon';
import { SpinnerIcon } from '../icons/SpinnerIcon';
import { RefreshIcon } from '../icons/RefreshIcon';
import type { Department } from '../../types';
import { Tooltip } from '../Tooltip';
import { SimpleSelect } from '../ui/SimpleSelect';

interface CharacterDetailsColumnProps {
    selectedDepartment: Department | null;
    dob: string;
    setDob: (dob: string) => void;
    dobOverwrittenByCareer: boolean;
}

const DetailCard: React.FC<{title: string; step?: number; children: React.ReactNode}> = ({ title, step, children }) => (
    <div className="bg-card/50 p-4 rounded-lg border border-border">
        <h3 className="text-lg font-bold text-primary mb-3 border-b border-border pb-2">
            {step && <span className="text-primary/60 mr-2">{step}.</span>}
            {title}
        </h3>
        {children}
    </div>
);

const NationalitySelector: React.FC<{
    nationalities: string[], 
    selected: string, 
    onChange: (nat: string) => void,
    onRandomize: () => void
}> = ({nationalities, selected, onChange, onRandomize}) => (
    <div className="flex items-stretch gap-2">
        <SimpleSelect options={nationalities} value={selected} onChange={onChange} className="flex-1" />
        <button
            onClick={onRandomize}
            className="w-10 h-10 p-2 rounded-lg bg-secondary hover:bg-opacity-80 text-secondary-foreground transition-colors flex-shrink-0 flex items-center justify-center border-b-4 border-black/20"
            aria-label="Randomize Nationality"
            title="Randomize Nationality (Weighted)"
        >
            <DiceIcon className="h-5 w-5" />
        </button>
    </div>
);


export const CharacterDetailsColumn: React.FC<CharacterDetailsColumnProps> = ({ selectedDepartment, dob, setDob, dobOverwrittenByCareer }) => {
    const { ai, aggregatedData } = useCharacterContext();

    return (
        <div className="space-y-6">
            <DetailCard title="Select Gender" step={1}>
                <GenderSelector gender={ai.gender} onGenderChange={ai.setGender} />
            </DetailCard>

            <DetailCard title="Select Nationality" step={2}>
                 <NationalitySelector 
                    nationalities={aggregatedData.NATIONALITIES}
                    selected={ai.nationality}
                    onChange={ai.setNationality}
                    onRandomize={ai.onGenerateRandomNationality}
                />
            </DetailCard>

            <DetailCard title="Identity Details" step={3}>
                <div>
                    <label className="block text-sm font-bold text-muted-foreground mb-2">Name</label>
                    <div className="flex items-center gap-2">
                        <div className="rounded-md border border-border h-10 px-3 flex items-center flex-1 max-w-md">
                            <span className="text-foreground font-semibold text-lg truncate" title={ai.characterName || undefined}>
                                {ai.characterName || '...'}
                            </span>
                        </div>
                        <button 
                            onClick={ai.onGenerateName} 
                            disabled={ai.isGeneratingName}
                            className="w-10 h-10 p-2 rounded-lg bg-secondary hover:bg-opacity-80 disabled:bg-neutral-300 disabled:cursor-wait text-secondary-foreground transition-colors flex-shrink-0 flex items-center justify-center border-b-4 border-black/20"
                            aria-label="Reroll Name"
                            title="Reroll Name"
                        >
                            {ai.isGeneratingName ? <SpinnerIcon className="h-5 w-5"/> : <DiceIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border/50">
                     <label className="block text-sm font-bold text-muted-foreground mb-2">Date of Birth</label>
                     {dobOverwrittenByCareer && (
                        <p className="text-xs text-muted-foreground italic mb-2">
                            Date of Birth overwritten by Career Simulation.
                        </p>
                     )}
                    <input
                        type="date"
                        value={dob || ''}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full bg-card border border-border rounded-md p-2 text-foreground focus:ring-2 focus:ring-ring focus:border-primary hover:border-primary"
                    />
                </div>
            </DetailCard>
        </div>
    );
};
