import React, { useState, useEffect, useMemo } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { ExpressivePortraitsStudio } from './draft/ExpressivePortraitsStudio';
import { CharacterDetailsColumn } from './draft/CharacterDetailsColumn';
import { PortraitStudio } from './draft/PortraitStudio';

interface DossierTabProps {
    onShowPromptInfo: () => void;
    dob: string;
    setDob: (dob: string) => void;
    dobOverwrittenByCareer: boolean;
}

export const DossierTab: React.FC<DossierTabProps> = ({ onShowPromptInfo, dob, setDob, dobOverwrittenByCareer }) => {
    const { ai, aggregatedData, experienceNotes, selectedExperiencePackage, selectedTalents, occupationNotes, selectedOccupation } = useCharacterContext();
    
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    return (
        <div className="bg-card p-6 rounded-lg border border-border shadow-xl shadow-primary-900/15 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-lora text-primary text-center mb-2">Investigator Bio</h2>
            <p className="text-muted-foreground text-center mb-8">
                Finalize your investigator's identity, then use AI to generate a portrait and official dossier.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <CharacterDetailsColumn
                    selectedDepartment={null} // This is a defunct DG concept
                    dob={dob} 
                    setDob={setDob}
                    dobOverwrittenByCareer={dobOverwrittenByCareer}
                />
                <div className="space-y-6">
                     <PortraitStudio
                        portrait={ai.portrait}
                        headshot={ai.headshot}
                        portraitView={ai.portraitView}
                        setPortraitView={ai.setPortraitView}
                        portraitError={ai.portraitError}
                        isGeneratingPortrait={ai.isGeneratingPortrait}
                        onGeneratePortrait={ai.onGeneratePortrait}
                        isCroppingHeadshot={ai.isCroppingHeadshot}
                        onCropHeadshot={ai.onCropHeadshot}
                        pdfPortraitSrc={ai.pdfPortraitSrc}
                        onSelectPdfPortrait={ai.onSelectPdfPortrait}
                        characterName={ai.characterName}
                        onShowPromptInfo={onShowPromptInfo}
                    />
                </div>
            </div>
            
            {selectedExperiencePackage && experienceNotes && experienceNotes.length > 0 && (
                <div className="bg-card p-4 rounded-lg border border-border mb-8">
                    <h3 className="text-xl font-bold text-primary mb-2">Experience Notes{selectedExperiencePackage ? ` - ${selectedExperiencePackage.name}` : ''}</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {experienceNotes.map((n) => (
                            <li key={n.name}><span className="font-semibold">{n.name}:</span> <span className="text-muted-foreground">{n.description}</span></li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedOccupation && occupationNotes && occupationNotes.length > 0 && (
                <div className="bg-card p-4 rounded-lg border border-border mb-8">
                    <h3 className="text-xl font-bold text-primary mb-2">Occupation Notes{selectedOccupation ? ` - ${selectedOccupation.name}` : ''}</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {occupationNotes.map((n) => (
                            <li key={n.name}><span className="font-semibold">{n.name}:</span> <span className="text-muted-foreground">{n.description}</span></li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedTalents && selectedTalents.length > 0 && (
                <div className="bg-card p-4 rounded-lg border border-border mb-8">
                    <h3 className="text-xl font-bold text-primary mb-2">Talents</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {selectedTalents.map((name) => {
                            const t = (aggregatedData.TALENTS || []).find(x => x.name === name);
                            return (
                                <li key={name}>
                                    <span className="font-semibold">{name}:</span>
                                    {t ? (
                                        <>
                                            <span className="text-muted-foreground"> {t.description}</span>
                                            {(t.source || t.page) && (
                                                <span className="italic text-muted-foreground"> ({[t.source, t.page].filter(Boolean).join(', ')})</span>
                                            )}
                                        </>
                                    ) : null}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

            {showExpressivePortraits && (
                <ExpressivePortraitsStudio
                    pdfPortraitSrc={ai.pdfPortraitSrc}
                    onSelectPdfPortrait={ai.onSelectPdfPortrait}
                    emotionalPortraits={ai.emotionalPortraits}
                    generatingEmotion={ai.generatingEmotion}
                    onGenerateEmotionalPortrait={ai.onGenerateEmotionalPortrait}
                    characterName={ai.characterName}
                />
            )}
        </div>
    );
};
