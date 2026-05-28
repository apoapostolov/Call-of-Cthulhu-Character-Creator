import { useState, useCallback } from 'react';
import type { ToastType } from '../../types';
import { useAiRuntime } from '../useAiRuntime';

export const useBackstoryGeneration = (
    showToast: (msg: string, type?: ToastType) => void
) => {
    const [backstory, setBackstory] = useState<string | null>(null);
    const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
    const { generateText } = useAiRuntime();

    const onGenerateBackstory = useCallback(async (prompt: string) => {
        setIsGeneratingBackstory(true);
        setBackstory(null);
        try {
            if (!prompt) {
                throw new Error("Prompt for dossier generation is missing.");
            }
            setBackstory(await generateText({ prompt }));
        } catch (e) {
            console.error("Dossier generation failed:", e);
            showToast("Could not generate dossier. Please try again.", 'error');
        } finally {
            setIsGeneratingBackstory(false);
        }
    }, [generateText, showToast]);

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
