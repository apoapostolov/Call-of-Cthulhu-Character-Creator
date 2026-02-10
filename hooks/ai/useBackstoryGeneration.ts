import { useState, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { ToastType } from '../../types';

export const useBackstoryGeneration = (
    showToast: (msg: string, type?: ToastType) => void
) => {
    const [backstory, setBackstory] = useState<string | null>(null);
    const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);

    const onGenerateBackstory = useCallback(async (prompt: string) => {
        setIsGeneratingBackstory(true);
        setBackstory(null);
        try {
            if (!prompt) {
                throw new Error("Prompt for dossier generation is missing.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });

            setBackstory(response.text.trim());
        } catch (e) {
            console.error("Dossier generation failed:", e);
            showToast("Could not generate dossier. Please try again.", 'error');
        } finally {
            setIsGeneratingBackstory(false);
        }
    }, [showToast]);

    const reset = useCallback(() => {
        setBackstory(null);
        setIsGeneratingBackstory(false);
    }, []);

    return {
        backstory,
        isGeneratingBackstory,
        onGenerateBackstory,
        reset,
    };
};
