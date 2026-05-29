import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import type { Profession, Theme, DecadeConfig, AttributeSet, Nationality, ExperienceLevel, Department, SkillPackage, ToastType, DamagedVeteranOption, Disorder, DistinguishingFeatures } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { useNameGeneration } from './ai/useNameGeneration';
import { usePortraitGeneration } from './ai/usePortraitGeneration';
import { getEraReferenceYear } from '../utils/date';
import { getAgeAtReferenceYear } from '../utils/campfire-sheet';
import { getPortraitPrompt } from '../prompts/prompt-data';
import { THEMES } from '../data/theme-data';

export const useAIGeneration = (
    characterConcept: string,
    selectedProfession: Profession | null,
    selectedDepartment: Department | null,
    attributes: AttributeSet | null,
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData,
    baseSkills: Record<string, number>,
    skillPackage: SkillPackage | null,
    damagedVeteranOption: DamagedVeteranOption | null,
    assignedDisorder: Disorder | null,
    selectedEra: string
) => {
    // Basic character details state
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [theme] = useState<Theme>('delta-green'); // This theme is fixed for this app
    const [nationality, setNationality] = useState<Nationality>('American (Unspecified/Mixed)');
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Experienced');
    const [dob, _setDob] = useState<string>('');
    const [dobOverwrittenByCareer, setDobOverwrittenByCareer] = useState(false);
    const [dobManuallyEdited, setDobManuallyEdited] = useState(false);
    const [education, setEducation] = useState<string>('');
    const [physicalDescription, setPhysicalDescription] = useState<string | null>(null);
    const [distinguishingFeatures, setDistinguishingFeatures] = useState<DistinguishingFeatures | null>(null);
    const previousEraRef = useRef(selectedEra);

    const decadeConfig = useMemo(() => aggregatedData.DECADES?.[0], [aggregatedData.DECADES]);

    // Name Generation
    const nameGen = useNameGeneration(showToast, aggregatedData);

    // Portrait Generation
    const portraitGen = usePortraitGeneration(showToast, setPhysicalDescription, setDistinguishingFeatures);
    
    // No career simulation or dossier generation in CoC app

    const setDob = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobManuallyEdited(true);
        setDobOverwrittenByCareer(false); // Manual change resets the flag
    }, []);

    // Allow system rules (e.g., experience packages) to set DOB and mark it as career-adjusted
    const setDobFromCareer = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobManuallyEdited(false);
        setDobOverwrittenByCareer(true);
    }, []);

    const setDobFromAgeCategory = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobManuallyEdited(false);
        setDobOverwrittenByCareer(false);
    }, []);

     useEffect(() => {
        if (!decadeConfig) return;
        const eraChanged = previousEraRef.current !== selectedEra;
        previousEraRef.current = selectedEra;

        // Set or rebase automatic DOBs when the era changes, but preserve user edits.
        if (!dob || (eraChanged && !dobManuallyEdited && !dobOverwrittenByCareer)) {
            const startYear = getEraReferenceYear(selectedEra, decadeConfig.name);
            const birthYear = startYear - 25; // Assume a 25-year-old starting investigator
            _setDob(`${birthYear}-07-01`);
            setDobManuallyEdited(false);
            setDobOverwrittenByCareer(false);
        }
    }, [decadeConfig, dob, dobManuallyEdited, dobOverwrittenByCareer, selectedEra]);

    const currentYear = useMemo(() => getEraReferenceYear(selectedEra, decadeConfig?.name), [decadeConfig, selectedEra]);
    const age = useMemo(() => {
        return getAgeAtReferenceYear(dob, currentYear);
    }, [dob, currentYear]);

    const onGenerateRandomNationality = useCallback(() => {
        const totalWeight = aggregatedData.WEIGHTED_NATIONALITIES.reduce((sum, nat) => sum + nat.weight, 0);
        let random = Math.random() * totalWeight;
        for (const nat of aggregatedData.WEIGHTED_NATIONALITIES) {
            if (random < nat.weight) {
                setNationality(nat.name);
                return;
            }
            random -= nat.weight;
        }
        if (aggregatedData.NATIONALITIES.length > 0) {
            setNationality(aggregatedData.NATIONALITIES[0]);
        }
    }, [aggregatedData.WEIGHTED_NATIONALITIES, aggregatedData.NATIONALITIES]);

    const portraitPrompt = useMemo(() => getPortraitPrompt(
        characterConcept, gender, nationality, 
        selectedProfession?.name || "Investigator", 
        selectedProfession?.archetypicalClothing || "practical investigator's attire", 
        THEMES[theme], decadeConfig, attributes,
        skillPackage?.descriptor || null,
        damagedVeteranOption,
        assignedDisorder,
        age
    ), [characterConcept, gender, nationality, selectedProfession, theme, decadeConfig, attributes, skillPackage, damagedVeteranOption, assignedDisorder, age]);
    
    // No dossier prompt in CoC app

    const onGeneratePortrait = useCallback(() => {
        if (!selectedProfession) {
            showToast("Please select a profession first.", 'warning');
            return;
        }
        portraitGen.onGeneratePortrait(portraitPrompt);
    }, [portraitGen, portraitPrompt, selectedProfession, showToast]);

    const hydrate = useCallback((data: any) => {
        nameGen.hydrate({ name: data?.name, codename: data?.codename });
        setGender(data?.gender || null);
        setNationality(data?.nationality || 'American (Unspecified/Mixed)');
        _setDob(data?.dob || '');
        setDobManuallyEdited(Boolean(data?.dob));
        setDobOverwrittenByCareer(false);
        setEducation(data?.education || '');
        portraitGen.hydrate({
            portrait: data?.portrait || null,
            headshot: data?.headshot || null,
            pdfPortraitSrc: data?.pdfPortraitSrc || null,
            physicalDescription: data?.physicalDescription || null,
            distinguishingFeatures: data?.distinguishingFeatures || null,
        });
    }, [nameGen, portraitGen]);
    
    // No dossier generation in CoC app

    // FIX: Added a wrapper function for simulating a career to align with other 'on...' event handlers in this hook.
    // No career simulation in CoC app

    const reset = useCallback(() => {
        nameGen.reset();
        portraitGen.reset();
        // Reset only name/portrait-related state
        setEducation('');
        setPhysicalDescription(null);
        setDistinguishingFeatures(null);
        setDobOverwrittenByCareer(false);
        // DOB is reset by the decade useEffect
    }, [nameGen, portraitGen]);

    return {
        decade: decadeConfig?.name, // Provide read-only access to the current decade name
        gender, setGender,
        theme, // No setter, it's fixed
        nationality, setNationality,
        experienceLevel, setExperienceLevel,
        dob, setDob,
        dobOverwrittenByCareer,
        dobManuallyEdited,
        education,
        physicalDescription,
        distinguishingFeatures,
        characterName: nameGen.characterName,
        isGeneratingName: nameGen.isGeneratingName,
        codename: nameGen.codename,
        isGeneratingCodename: nameGen.isGeneratingCodename,
        onGenerateName: () => nameGen.generateName(gender, characterConcept, nationality),
        onGenerateCodename: () => nameGen.generateCodename(characterConcept, decadeConfig),
        onGenerateRandomNationality,
        ...portraitGen,
        onGeneratePortrait,
        portraitPrompt,
        // No dossier/career in CoC app
        hydrate,
        reset,
        setDobFromCareer,
        setDobFromAgeCategory,
        
    };
};
