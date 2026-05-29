import React, { useState } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useAiRuntime } from '../hooks/useAiRuntime';
import { getScoutRank } from '../eras/campfire-tales/scout-rules';
import { ExpressivePortraitsStudio } from './draft/ExpressivePortraitsStudio';
import { CharacterDetailsColumn } from './draft/CharacterDetailsColumn';
import { PortraitStudio } from './draft/PortraitStudio';
import { AiStarsIcon } from './icons/AiStarsIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import type { ScoutBackstoryFields } from '../types';
import {
    CAMPFIRE_NOTES_TEXT_LIMIT,
    CAMPFIRE_SHEET_TEXT_LIMIT,
    limitCampfireSheetText,
} from '../utils/campfire-sheet';

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
        selectedAgeCategory,
    } = useCharacterContext();
    const { generateText } = useAiRuntime();
    const [generatingScoutField, setGeneratingScoutField] = useState<keyof ScoutBackstoryFields | null>(null);
    const [scoutFieldError, setScoutFieldError] = useState<string | null>(null);
    
    const showExpressivePortraits = !!(ai.headshot && !ai.isGeneratingPortrait && !ai.isCroppingHeadshot);

    const cleanGeneratedScoutText = (value: string, maxLength: number) => limitCampfireSheetText(
        value
            .replace(/^```(?:text)?/i, '')
            .replace(/```$/i, '')
            .split('\n')
            .map(line => line.trim())
            .filter(Boolean)
            .slice(0, 2)
            .join('\n')
            .trim(),
        maxLength,
    );

    const handleGenerateScoutField = async (field: keyof ScoutBackstoryFields, label: string) => {
        if (!selectedOccupation) return;
        setGeneratingScoutField(field);
        setScoutFieldError(null);
        try {
            const rank = getScoutRank(selectedAgeCategory);
            const currentValue = scoutBackstory?.[field] || '';
            const maxLength = field === 'notes' ? CAMPFIRE_NOTES_TEXT_LIMIT : CAMPFIRE_SHEET_TEXT_LIMIT;
            const fieldDirection: Record<keyof ScoutBackstoryFields, string> = {
                home: 'Create a warm, specific two-line Home & Family detail. Reflect the Family Credit Rating, ordinary 1920s life, and the scout hobby.',
                trustedAdult: 'Create a trusted adult with a plausible 1920s name, relationship, and a few words about why the scout trusts them.',
                obligations: 'Create two concise lines of practical duties or promises tied to the scout hobby and family situation.',
                fears: 'Create two concise lines describing a kid-appropriate fear or worry. It may hint at something strange, but should remain subtle.',
                notes: 'Create one short Campfire Tales story hook: a 1920s kid-scary goosebump tale, low-key secretly Lovecraftian, suitable for a scout to tell by firelight.',
            };
            const prompt = [
                'Write only the finished field text. No title, no bullets, no markdown.',
                'Limit the response to two short lines.',
                `Strict maximum length: ${maxLength} characters. This limit is mandatory.`,
                fieldDirection[field],
                `Scout rank: ${rank.name}, age bracket ${rank.ages}.`,
                `Hobby: ${selectedOccupation.name}.`,
                `Hobby description: ${selectedOccupation.description || 'None provided.'}`,
                `Hobby obligations: ${selectedOccupation.obligations || 'None provided.'}`,
                `Trusted adult suggestion: ${selectedOccupation.trustedAdult || 'None provided.'}`,
                `Starting badges: ${(selectedOccupation.startingBadges || []).join(', ') || 'None provided.'}`,
                `Family Credit Rating: ${familyCreditStatus || 'Average'}.`,
                `Existing Home & Family: ${scoutBackstory?.home || 'blank'}.`,
                `Existing Trusted Adult: ${scoutBackstory?.trustedAdult || 'blank'}.`,
                `Existing Obligations: ${scoutBackstory?.obligations || 'blank'}.`,
                `Existing Fears: ${scoutBackstory?.fears || 'blank'}.`,
                `Existing Campfire Notes: ${scoutBackstory?.notes || 'blank'}.`,
                currentValue
                    ? `Improve or deepen the current ${label} without contradicting it: ${currentValue}`
                    : `Generate the ${label} field from scratch.`,
            ].join('\n');
            const generated = cleanGeneratedScoutText(await generateText({
                prompt,
                purpose: 'simple',
                temperature: 0.75,
                maxTokens: 180,
            }), maxLength);
            if (generated) {
                updateScoutBackstory(field, generated);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Could not generate that field.';
            setScoutFieldError(message);
        } finally {
            setGeneratingScoutField(null);
        }
    };

    const scoutBackstoryFields: Array<[keyof ScoutBackstoryFields, string, number, string]> = [
        ['home', 'Home & Family', 2, 'Generate Home & Family'],
        ['trustedAdult', 'Trusted Adult', 2, 'Generate Trusted Adult'],
        ['obligations', 'Obligations', 2, 'Generate Obligations'],
        ['fears', 'Fears', 2, 'Generate Fears'],
    ];

    const renderScoutTextarea = (field: keyof ScoutBackstoryFields, label: string, rows: number, buttonLabel: string, className = '') => (
        <label className={`text-sm ${className}`}>
            <span className="block font-semibold text-muted-foreground mb-1">{label}</span>
            <div className="relative">
                <textarea
                    value={(scoutBackstory as any)?.[field] || ''}
                    onChange={(event) => updateScoutBackstory(field, event.target.value)}
                    rows={rows}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 pr-12 pb-10"
                />
                <button
                    type="button"
                    onClick={() => handleGenerateScoutField(field, label)}
                    disabled={generatingScoutField !== null || !selectedOccupation}
                    className="absolute bottom-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 disabled:cursor-wait disabled:opacity-60"
                    aria-label={buttonLabel}
                    title={buttonLabel}
                >
                    {generatingScoutField === field ? <SpinnerIcon className="h-4 w-4" /> : <AiStarsIcon className="h-4 w-4" />}
                </button>
            </div>
        </label>
    );

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
                        {scoutFieldError && (
                            <p className="mb-3 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                                {scoutFieldError}
                            </p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {scoutBackstoryFields.map(([field, label, rows, buttonLabel]) => (
                                <React.Fragment key={field}>
                                    {renderScoutTextarea(field, label, rows, buttonLabel)}
                                </React.Fragment>
                            ))}
                            {renderScoutTextarea('notes', 'Campfire Notes', 3, 'Generate Campfire Notes', 'md:col-span-2')}
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
