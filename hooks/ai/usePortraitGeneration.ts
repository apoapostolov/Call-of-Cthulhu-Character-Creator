import { useState, useCallback } from 'react';
import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { ThemeConfig, Emotion, DecadeConfig, ToastType, DistinguishingFeatures, Attribute } from '../../types';
import { cropImage } from '../../utils/image';
import { getHeadshotPrompt, getEmotionalPortraitPrompt, getPhysicalDescriptionPrompt, getDistinguishingFeaturesPrompt } from '../../prompt-data';

export const usePortraitGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    setPhysicalDescription: (desc: string | null) => void,
    setDistinguishingFeatures: (features: DistinguishingFeatures | null) => void
) => {
    const [portrait, setPortrait] = useState<string | null>(null);
    const [headshot, setHeadshot] = useState<string | null>(null);
    const [portraitView, setPortraitView] = useState<'full' | 'headshot'>('full');
    const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
    const [isCroppingHeadshot, setIsCroppingHeadshot] = useState(false);
    const [portraitError, setPortraitError] = useState<string | null>(null);
    const [emotionalPortraits, setEmotionalPortraits] = useState<Record<string, string | null>>({});
    const [generatingEmotion, setGeneratingEmotion] = useState<string | null>(null);
    const [pdfPortraitSrc, setPdfPortraitSrc] = useState<string | null>(null);

    const onSelectPdfPortrait = useCallback((src: string) => {
        setPdfPortraitSrc(src);
    }, []);

    const generateDescriptionAndFeatures = useCallback(async (portraitBase64: string) => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64ImageData = portraitBase64.split(',')[1];
            const mimeType = portraitBase64.match(/data:(.*);/)?.[1] || 'image/png';

            // Step 1: Get description
            const descriptionPrompt = getPhysicalDescriptionPrompt();
            const descriptionResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [{ inlineData: { data: base64ImageData, mimeType } }, { text: descriptionPrompt }] },
            });
            const descriptionText = descriptionResponse.text.trim();
            setPhysicalDescription(descriptionText);

            // Step 2: Get features
            const featuresPrompt = getDistinguishingFeaturesPrompt(descriptionText);
            const featuresResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: featuresPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                feature: { type: Type.STRING },
                                attribute: { type: Type.STRING },
                            },
                            required: ["feature", "attribute"],
                        },
                    },
                },
            });

            const featuresArray: { feature: string; attribute: string }[] = JSON.parse(featuresResponse.text.trim());
            const validAttributes = new Set(['STR', 'CON', 'DEX', 'INT', 'POW', 'CHA']);
            const featuresObject: DistinguishingFeatures = {};
            for (const item of featuresArray) {
                if (item.attribute && item.feature && validAttributes.has(item.attribute)) {
                    featuresObject[item.attribute as Attribute] = item.feature;
                }
            }
            setDistinguishingFeatures(featuresObject);

            // Step 3: Show toast
            showToast("Portrait analyzed for distinguishing features.", 'success');
        } catch (e) {
            console.error('Failed to generate physical description/features:', e);
            setPhysicalDescription(null);
            setDistinguishingFeatures(null);
        }
    }, [showToast, setPhysicalDescription, setDistinguishingFeatures]);

    const onGeneratePortrait = useCallback(async (prompt: string) => {
        if (!prompt) {
          showToast('A prompt is required to generate a portrait.', 'warning');
          return;
        }
    
        setIsGeneratingPortrait(true);
        setPortrait(null);
        setHeadshot(null);
        setPdfPortraitSrc(null);
        setPortraitError(null);
        setEmotionalPortraits({});
        setPortraitView('full');
        setPhysicalDescription(null);
        setDistinguishingFeatures(null);
    
        try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: { numberOfImages: 1, aspectRatio: '9:16', outputMimeType: 'image/png' },
          });
    
          if (!response.generatedImages || response.generatedImages.length === 0) throw new Error("The AI did not return an image.");
          const newPortrait = `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
          setPortrait(newPortrait);
          setPdfPortraitSrc(newPortrait);
          
          // Kick off the background analysis task without waiting for it to complete
          generateDescriptionAndFeatures(newPortrait);

        } catch (error) {
          console.error('Failed to generate portrait:', error);
          setPortraitError(error instanceof Error ? error.message : 'An unexpected error occurred.');
        } finally {
          setIsGeneratingPortrait(false);
        }
    }, [showToast, generateDescriptionAndFeatures, setPhysicalDescription, setDistinguishingFeatures]);

    const onCropHeadshot = useCallback(async () => {
        if (!portrait) {
            showToast("Please generate a main portrait first.", 'warning');
            return;
        }
        setIsCroppingHeadshot(true);
        setPortraitError(null);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64ImageData = portrait.split(',')[1];
            const mimeType = portrait.match(/data:(.*);/)?.[1] || 'image/png';
            const prompt = getHeadshotPrompt();

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [{ inlineData: { data: base64ImageData, mimeType } }, { text: prompt }] },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            x: { type: Type.NUMBER },
                            y: { type: Type.NUMBER },
                            width: { type: Type.NUMBER },
                            height: { type: Type.NUMBER },
                        },
                        required: ["x", "y", "width", "height"],
                    }
                }
            });

            const box = JSON.parse(response.text.trim());
            const croppedImageBase64 = await cropImage(portrait, box);
            setHeadshot(croppedImageBase64);
            setPdfPortraitSrc(croppedImageBase64);
            setEmotionalPortraits({});
            setPortraitView('headshot');

        } catch (e) {
            console.error(`Failed to crop headshot:`, e);
            showToast(`Could not crop the headshot: ${e instanceof Error ? e.message : 'Unknown error'}`, 'error');
        } finally {
            setIsCroppingHeadshot(false);
        }
    }, [portrait, showToast]);
    
    const onGenerateEmotionalPortrait = useCallback(async (emotion: Emotion) => {
        const baseImage = headshot || portrait;
        if (!baseImage) {
            showToast("Please generate a main portrait first.", 'warning');
            return;
        }
        setGeneratingEmotion(emotion.name);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const base64ImageData = baseImage.split(',')[1];
            const mimeType = baseImage.match(/data:(.*);/)?.[1] || 'image/png';
            const prompt = getEmotionalPortraitPrompt(emotion);
    
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [{ inlineData: { data: base64ImageData, mimeType } }, { text: prompt }] },
                config: { responseModalities: [Modality.IMAGE, Modality.TEXT] },
            });
    
            let imageFound = false;
            if (response.candidates && response.candidates[0].content.parts) {
                for (const part of response.candidates[0].content.parts) {
                    if (part.inlineData) {
                        const newPortrait = `data:image/png;base64,${part.inlineData.data}`;
                        setEmotionalPortraits(prev => ({ ...prev, [emotion.name]: newPortrait }));
                        onSelectPdfPortrait(newPortrait);
                        imageFound = true;
                        break;
                    }
                }
            }
            if (!imageFound) throw new Error("The AI response did not contain an image.");
        } catch (e) {
            console.error(`Failed to generate ${emotion.name} portrait:`, e);
            showToast(`Could not generate the '${emotion.name}' portrait.`, 'error');
        } finally {
            setGeneratingEmotion(null);
        }
    }, [portrait, headshot, showToast, onSelectPdfPortrait]);

    const reset = useCallback(() => {
        setPortrait(null);
        setHeadshot(null);
        setPdfPortraitSrc(null);
        setPortraitError(null);
        setEmotionalPortraits({});
        setGeneratingEmotion(null);
        setPortraitView('full');
        setPhysicalDescription(null);
        setDistinguishingFeatures(null);
    }, [setPhysicalDescription, setDistinguishingFeatures]);
    
    return {
        portrait,
        headshot,
        portraitView,
        setPortraitView,
        isGeneratingPortrait,
        isCroppingHeadshot,
        portraitError,
        emotionalPortraits,
        generatingEmotion,
        pdfPortraitSrc,
        onGeneratePortrait,
        onCropHeadshot,
        onGenerateEmotionalPortrait,
        onSelectPdfPortrait,
        reset,
    };
};