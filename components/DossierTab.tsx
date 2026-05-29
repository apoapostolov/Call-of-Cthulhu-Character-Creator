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
    const {
        ai,
        aggregatedData,
        experienceNotes,
        selectedExperiencePackage,
        selectedTalents,
        occupationNotes,
        selectedOccupation,
        isCampfireEra,
        familyCreditStatus,
        scoutBackstory,
        updateScoutBackstory,
        distressBoxes,
        adversityBoxes,
        toggleDistressBox,
        toggleAdversityBox,
        campfireDistressBoxes,
        campfireAdversityBoxes,
    } = useCharacterContext();
    
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
                    <h3 className="text-xl font-bold text-primary mb-2">{isCampfireEra ? 'Hobby Notes' : 'Occupation Notes'}{selectedOccupation ? ` - ${selectedOccupation.name}` : ''}</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {occupationNotes.map((n) => (
                            <li key={n.name}><span className="font-semibold">{n.name}:</span> <span className="text-muted-foreground">{n.description}</span></li>
                        ))}
                    </ul>
                </div>
            )}

            {isCampfireEra && (
                <div className="bg-card p-4 rounded-lg border border-border mb-8 space-y-5">
                    <div>
                        <h3 className="text-xl font-bold text-primary mb-1">Scout Sheet</h3>
                        <p className="text-sm text-muted-foreground">Family Credit Rating: <span className="font-semibold text-foreground">{familyCreditStatus || 'Average'}</span></p>
                    </div>
                    <div>
                        <h4 className="font-bold text-primary mb-2">Scout Backstory</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[
                                ['home', 'Home & Family'],
                                ['trustedAdult', 'Trusted Adult'],
                                ['obligations', 'Obligations'],
                                ['fears', 'Fears'],
                            ].map(([field, label]) => (
                                <label key={field} className="text-sm">
                                    <span className="block font-semibold text-muted-foreground mb-1">{label}</span>
                                    <textarea
                                        value={(scoutBackstory as any)?.[field] || ''}
                                        onChange={(event) => updateScoutBackstory(field as any, event.target.value)}
                                        rows={2}
                                        className="w-full bg-background border border-border rounded-md px-3 py-2"
                                    />
                                </label>
                            ))}
                            <label className="text-sm md:col-span-2">
                                <span className="block font-semibold text-muted-foreground mb-1">Campfire Notes</span>
                                <textarea
                                    value={scoutBackstory?.notes || ''}
                                    onChange={(event) => updateScoutBackstory('notes', event.target.value)}
                                    rows={3}
                                    className="w-full bg-background border border-border rounded-md px-3 py-2"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-bold text-primary mb-2">Distress</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {campfireDistressBoxes.map((boxName: string) => (
                                    <label key={boxName} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-center text-sm">
                                        <input type="checkbox" checked={!!distressBoxes?.[boxName]} onChange={() => toggleDistressBox(boxName)} />
                                        {boxName}
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Failed Cool rolls check a box. At three boxes, the scout is distressed.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-primary mb-2">Adversity</h4>
                            <div className="grid grid-cols-3 gap-2">
                                {campfireAdversityBoxes.map((boxName: string) => (
                                    <label key={boxName} className="flex min-h-10 items-center justify-center gap-2 rounded-md border border-border px-3 py-2 text-center text-sm">
                                        <input type="checkbox" checked={!!adversityBoxes?.[boxName]} onChange={() => toggleAdversityBox(boxName)} />
                                        {boxName}
                                    </label>
                                ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Three adversities add one penalty die to Cool; all five add two.</p>
                        </div>
                    </div>
                    <div className="rounded-md border border-border p-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Campfire rules:</span> Cool replaces Sanity; failed Cool can become Fawn, Fight, Flight, Flop, or Freeze. Assisted fighting maneuvers can add up to +3 Build. Ignore major wounds. At 0 HP a scout is unconscious; a single wound equal to max HP means Dying. First Aid or Medicine heals 1D4, natural rest heals 2 HP/day, and Cheating Death spends all Luck with a 30 point minimum.
                    </div>
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
