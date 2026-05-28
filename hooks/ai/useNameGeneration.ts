import { useState, useCallback } from 'react';
import type { Nationality, DecadeConfig, ToastType } from '../../types';
import { getNameAndCodenamePrompt, getNamePrompt, getCodenamePrompt } from '../../prompts/prompt-data';
import type { AggregatedData } from '../useAggregatedData';
import { useAiRuntime } from '../useAiRuntime';

export const useNameGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData
) => {
    const [characterName, setCharacterName] = useState('');
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const [codename, setCodename] = useState('');
    const [isGeneratingCodename, setIsGeneratingCodename] = useState(false);
    const { generateText } = useAiRuntime();

    const generateBothLogic = async (
        gender: 'male' | 'female' | null,
        characterConcept: string,
        nationality: Nationality,
        decadeConfig: DecadeConfig | undefined
    ) => {
        const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
        
        let finalNationality = nationality;
        if (nationality !== 'American' && !nationality.includes('American') && Math.random() < 0.15) {
            finalNationality = 'American'; 
        }

        const prompt = getNameAndCodenamePrompt(selectedGender, characterConcept, finalNationality, decadeConfig);
        return JSON.parse(await generateText({ prompt, json: true, purpose: 'simple' }));
    };

    const generateBoth = useCallback(async (
        gender: 'male' | 'female' | null,
        characterConcept: string,
        nationality: Nationality,
        decadeConfig: DecadeConfig | undefined
    ) => {
        if (!characterConcept) {
            showToast("A character profession is needed to generate details.", 'warning');
            return;
        }
        setIsGeneratingName(true);
        setIsGeneratingCodename(true);
        try {
            const result = await generateBothLogic(gender, characterConcept, nationality, decadeConfig);
            setCharacterName(result.name);
            setCodename(result.codename);
        } catch (e) {
            console.error("Name/Codename generation failed:", e);
            showToast("Could not generate details. Please try again.", 'error');
        } finally {
            setIsGeneratingName(false);
            setIsGeneratingCodename(false);
        }
    }, [showToast]);
    
    const generateBothAndReturn = useCallback(async (
        gender: 'male' | 'female' | null,
        characterConcept: string,
        nationality: Nationality,
        decadeConfig: DecadeConfig | undefined
    ): Promise<{name: string, codename: string} | null> => {
        if (!characterConcept) {
            showToast("A character profession is needed to generate details.", 'warning');
            return null;
        }
        setIsGeneratingName(true);
        setIsGeneratingCodename(true);
        try {
            const result = await generateBothLogic(gender, characterConcept, nationality, decadeConfig);
            setCharacterName(result.name);
            setCodename(result.codename);
            return result;
        } catch (e) {
            console.error("Name/Codename generation failed:", e);
            showToast("Could not generate details. Please try again.", 'error');
            return null;
        } finally {
            setIsGeneratingName(false);
            setIsGeneratingCodename(false);
        }
    }, [showToast]);


    const generateName = useCallback(async (
        gender: 'male' | 'female' | null,
        characterConcept: string,
        nationality: Nationality
    ) => {
        if (!characterConcept) {
            showToast("A character profession is needed to generate details.", 'warning');
            return;
        }
        setIsGeneratingName(true);
        try {
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');

            let finalNationality = nationality;
            if (nationality !== 'American' && !nationality.includes('American') && Math.random() < 0.15) {
                finalNationality = 'American';
            }

            const prompt = getNamePrompt(selectedGender, characterConcept, finalNationality);
            const result = JSON.parse(await generateText({ prompt, json: true, purpose: 'simple' }));
            setCharacterName(result.name);
        } catch (e) {
            console.error("Name generation failed:", e);
            showToast("Could not generate name. Please try again.", 'error');
        } finally {
            setIsGeneratingName(false);
        }
    }, [showToast]);

    const generateCodename = useCallback(async (
        characterConcept: string,
        decadeConfig: DecadeConfig | undefined
    ) => {
        if (!characterConcept) {
            showToast("A character profession is needed to generate details.", 'warning');
            return;
        }
        setIsGeneratingCodename(true);
        try {
            const prompt = getCodenamePrompt(characterConcept, decadeConfig);
            const result = JSON.parse(await generateText({ prompt, json: true, purpose: 'simple' }));
            setCodename(result.codename);
        } catch (e) {
            console.error("Codename generation failed:", e);
            showToast("Could not generate codename. Please try again.", 'error');
        } finally {
            setIsGeneratingCodename(false);
        }
    }, [showToast]);


    const reset = useCallback(() => {
        setCharacterName('');
        setCodename('');
    }, []);

    return {
        characterName,
        isGeneratingName,
        codename,
        isGeneratingCodename,
        generateBoth,
        generateName,
        generateCodename,
        generateBothAndReturn,
        reset,
    };
};
