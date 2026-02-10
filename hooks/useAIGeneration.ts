import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Profession, Theme, DecadeConfig, AttributeSet, Nationality, ExperienceLevel, Department, SkillPackage, ToastType, DamagedVeteranOption, Disorder, DistinguishingFeatures } from '../types';
import type { AggregatedData } from './useAggregatedData';
import { useNameGeneration } from './ai/useNameGeneration';
import { usePortraitGeneration } from './ai/usePortraitGeneration';
import { getYearFromDecade } from '../utils/date';
import { getPortraitPrompt } from '../prompt-data';
import { THEMES } from '../theme-data';

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
    assignedDisorder: Disorder | null
) => {
    // Basic character details state
    const [gender, setGender] = useState<'male' | 'female' | null>(null);
    const [theme] = useState<Theme>('delta-green'); // This theme is fixed for this app
    const [nationality, setNationality] = useState<Nationality>('American (Unspecified/Mixed)');
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Experienced');
    const [dob, _setDob] = useState<string>('');
    const [dobOverwrittenByCareer, setDobOverwrittenByCareer] = useState(false);
    const [education, setEducation] = useState<string>('');
    const [physicalDescription, setPhysicalDescription] = useState<string | null>(null);
    const [distinguishingFeatures, setDistinguishingFeatures] = useState<DistinguishingFeatures | null>(null);

    const decadeConfig = useMemo(() => aggregatedData.DECADES?.[0], [aggregatedData.DECADES]);

    // Name Generation
    const nameGen = useNameGeneration(showToast, aggregatedData);

    // Portrait Generation
    const portraitGen = usePortraitGeneration(showToast, setPhysicalDescription, setDistinguishingFeatures);
    
    // No career simulation or dossier generation in CoC app

    const setDob = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobOverwrittenByCareer(false); // Manual change resets the flag
    }, []);

    // Allow system rules (e.g., experience packages) to set DOB and mark it as career-adjusted
    const setDobFromCareer = useCallback((newDob: string) => {
        _setDob(newDob);
        setDobOverwrittenByCareer(true);
    }, []);

     useEffect(() => {
        // Set a default DOB when the decade changes and no DOB is present yet
        if (decadeConfig && !dob) {
            const startYear = getYearFromDecade(decadeConfig.name);
            const birthYear = startYear - 25; // Assume a 25-year-old starting investigator
            _setDob(`${birthYear}-07-01`);
            setDobOverwrittenByCareer(false);
        }
    }, [decadeConfig, dob]);

    const currentYear = useMemo(() => decadeConfig ? getYearFromDecade(decadeConfig.name) : 2023, [decadeConfig]);
    const age = useMemo(() => {
        if (!dob) return null;
        try {
            const birthYear = new Date(dob).getFullYear();
            if (isNaN(birthYear) || birthYear < 1900) return null;
            return currentYear - birthYear;
        } catch (e) {
            return null;
        }
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
        reset,
        setDobFromCareer,
        
    };
};
