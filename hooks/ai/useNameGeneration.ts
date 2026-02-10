import { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { Nationality, DecadeConfig, ToastType } from '../../types';
import { getNameAndCodenamePrompt, getNamePrompt, getCodenamePrompt } from '../../prompt-data';
import type { AggregatedData } from '../useAggregatedData';

export const useNameGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    aggregatedData: AggregatedData
) => {
    const [characterName, setCharacterName] = useState('');
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const [codename, setCodename] = useState('');
    const [isGeneratingCodename, setIsGeneratingCodename] = useState(false);

    const generateBothLogic = async (
        gender: 'male' | 'female' | null,
        characterConcept: string,
        nationality: Nationality,
        decadeConfig: DecadeConfig | undefined
    ) => {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');
        
        let finalNationality = nationality;
        if (nationality !== 'American' && !nationality.includes('American') && Math.random() < 0.15) {
            finalNationality = 'American'; 
        }

        const prompt = getNameAndCodenamePrompt(selectedGender, characterConcept, finalNationality, decadeConfig);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        codename: { type: Type.STRING },
                    },
                    required: ["name", "codename"],
                },
            },
        });
        return JSON.parse(response.text.trim());
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
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const selectedGender = gender ?? (Math.random() > 0.5 ? 'male' : 'female');

            let finalNationality = nationality;
            if (nationality !== 'American' && !nationality.includes('American') && Math.random() < 0.15) {
                finalNationality = 'American';
            }

            const prompt = getNamePrompt(selectedGender, characterConcept, finalNationality);
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: { name: { type: Type.STRING } },
                        required: ["name"],
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
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
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = getCodenamePrompt(characterConcept, decadeConfig);
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: { codename: { type: Type.STRING } },
                        required: ["codename"],
                    },
                },
            });
            const result = JSON.parse(response.text.trim());
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
