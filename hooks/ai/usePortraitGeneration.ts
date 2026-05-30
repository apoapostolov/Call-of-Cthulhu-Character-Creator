import { useState, useCallback } from 'react';
import type { ThemeConfig, Emotion, DecadeConfig, ToastType, DistinguishingFeatures, Attribute } from '../../types';
import { cropImage } from '../../utils/image';
import { getHeadshotPrompt, getEmotionalPortraitPrompt, getPhysicalDescriptionPrompt, getDistinguishingFeaturesPrompt } from '../../prompts/prompt-data';
import { useAiRuntime } from '../useAiRuntime';
import { parseJsonLike } from '../../lib/ai/json';

export const usePortraitGeneration = (
    showToast: (msg: string, type?: ToastType) => void,
    setPhysicalDescription: (desc: string | null) => void,
    setDistinguishingFeatures: (features: DistinguishingFeatures | null) => void,
    decadeConfig?: DecadeConfig,
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
    const { generateImage, analyzeImage } = useAiRuntime();

    const onSelectPdfPortrait = useCallback((src: string) => {
        setPdfPortraitSrc(src);
    }, []);

    const generateDescriptionAndFeatures = useCallback(async (portraitBase64: string) => {
        try {
            const descriptionPrompt = getPhysicalDescriptionPrompt(decadeConfig?.displayName);
            const descriptionText = await analyzeImage({ prompt: descriptionPrompt, imageDataUrl: portraitBase64 });
            setPhysicalDescription(descriptionText);

            const featuresPrompt = getDistinguishingFeaturesPrompt(descriptionText);
            const featuresArray: { feature: string; attribute: string }[] = parseJsonLike(
                await analyzeImage({ prompt: featuresPrompt, imageDataUrl: portraitBase64, json: true }),
            );
            const validAttributes = new Set(['STR', 'CON', 'DEX', 'INT', 'POW', 'APP']);
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
          const newPortrait = await generateImage({ prompt, aspectRatio: '9:16' });
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
            const prompt = getHeadshotPrompt();
            const box = parseJsonLike(await analyzeImage({ prompt, imageDataUrl: portrait, json: true }));
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
            const prompt = getEmotionalPortraitPrompt(emotion);
            const newPortrait = await generateImage({
                prompt,
                referenceImageDataUrl: baseImage,
                aspectRatio: '9:16',
            });
            setEmotionalPortraits(prev => ({ ...prev, [emotion.name]: newPortrait }));
            onSelectPdfPortrait(newPortrait);
        } catch (e) {
            console.error(`Failed to generate ${emotion.name} portrait:`, e);
            showToast(`Could not generate the '${emotion.name}' portrait.`, 'error');
        } finally {
            setGeneratingEmotion(null);
        }
    }, [generateImage, portrait, headshot, showToast, onSelectPdfPortrait]);

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

    const hydrate = useCallback((data: {
        portrait?: string | null;
        headshot?: string | null;
        pdfPortraitSrc?: string | null;
        physicalDescription?: string | null;
        distinguishingFeatures?: DistinguishingFeatures | null;
    } | null | undefined) => {
        setPortrait(data?.portrait || null);
        setHeadshot(data?.headshot || null);
        setPdfPortraitSrc(data?.pdfPortraitSrc || data?.headshot || data?.portrait || null);
        setPortraitView(data?.headshot ? 'headshot' : 'full');
        setPortraitError(null);
        setEmotionalPortraits({});
        setGeneratingEmotion(null);
        setPhysicalDescription(data?.physicalDescription || null);
        setDistinguishingFeatures(data?.distinguishingFeatures || null);
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
        hydrate,
        reset,
    };
};
