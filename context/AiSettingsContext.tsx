import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ensureModelPresent, fetchOpenRouterModels, sortOpenRouterModels, splitModelsByModality, splitModelsByPromptType, type OpenRouterModelSummary } from '../lib/ai/openrouter';
import { OPENROUTER_MODEL_CACHE } from '../data/openrouter-model-cache';

export type AiProviderId = 'openrouter' | 'gemini';

export interface AiSettingsContextType {
    provider: AiProviderId;
    setProvider: (provider: AiProviderId) => void;
    openRouterApiKey: string;
    setOpenRouterApiKey: (apiKey: string) => void;
    openRouterModels: OpenRouterModelSummary[];
    openRouterTextModels: OpenRouterModelSummary[];
    openRouterCreativeModels: OpenRouterModelSummary[];
    openRouterVisionModels: OpenRouterModelSummary[];
    openRouterImageModels: OpenRouterModelSummary[];
    openRouterModelCatalogState: 'idle' | 'loading' | 'ready' | 'error';
    openRouterModelCatalogError: string | null;
    refreshOpenRouterModels: () => Promise<void>;
    openRouterTextModelId: string;
    setOpenRouterTextModelId: (modelId: string) => void;
    openRouterVisionModelId: string;
    setOpenRouterVisionModelId: (modelId: string) => void;
    openRouterImageModelId: string;
    setOpenRouterImageModelId: (modelId: string) => void;
    effectiveOpenRouterApiKey: string;
}

const STORAGE_KEYS = {
    provider: 'ai.provider',
    openRouterApiKey: 'ai.openrouter.apiKey',
    openRouterTextModelId: 'ai.openrouter.textModelId',
    openRouterVisionModelId: 'ai.openrouter.visionModelId',
    openRouterImageModelId: 'ai.openrouter.imageModelId',
    openRouterModelCatalog: 'ai.openrouter.modelCatalog',
};

const FALLBACK_OPENROUTER_TEXT_MODEL: OpenRouterModelSummary = {
    id: 'openai/gpt-5-mini',
    baseName: 'OpenAI GPT-5 Mini',
    name: 'OpenAI GPT-5 Mini',
    description: 'A compact general-purpose model for creative writing and lower-cost text generation.',
    outputModalities: ['text'],
    inputModalities: ['text'],
    mixedPricePerMillionUsd: 1.13,
    priceLabel: '$1.13',
};

const FALLBACK_OPENROUTER_VISION_MODEL: OpenRouterModelSummary = {
    id: 'google/gemini-2.5-flash',
    baseName: 'Google Gemini 2.5 Flash',
    name: 'Google Gemini 2.5 Flash',
    description: 'A multimodal workhorse for vision analysis and general text tasks.',
    outputModalities: ['text'],
    inputModalities: ['text', 'image'],
    mixedPricePerMillionUsd: 1.40,
    priceLabel: '$1.40',
};

const FALLBACK_OPENROUTER_IMAGE_MODEL: OpenRouterModelSummary = {
    id: 'google/gemini-2.5-flash-image',
    baseName: 'Google Nano Banana',
    name: 'Google Nano Banana',
    description: 'Native image generation with contextual understanding and edits.',
    outputModalities: ['text', 'image'],
    inputModalities: ['text', 'image'],
    mixedPricePerMillionUsd: 1.40,
    priceLabel: '$1.40',
};

const DEFAULT_OPENROUTER_MODELS = sortOpenRouterModels(ensureModelPresent(
    ensureModelPresent(OPENROUTER_MODEL_CACHE.map(model => ({
        id: model.id,
        baseName: model.baseName,
        name: model.displayName,
        description: model.description || undefined,
        outputModalities: model.outputModalities as any,
        inputModalities: model.inputModalities,
        mixedPricePerMillionUsd: model.mixedPricePerMillionUsd,
        priceLabel: model.priceLabel,
    })), FALLBACK_OPENROUTER_TEXT_MODEL),
    FALLBACK_OPENROUTER_IMAGE_MODEL,
));

const readStorage = (storage: Storage | undefined, key: string) => {
    if (!storage) return null;
    try {
        return storage.getItem(key);
    } catch {
        return null;
    }
};

const getStoredModelId = (
    storage: Storage | undefined,
    key: string,
    defaultId: string,
    legacyIds: string[] = [],
) => {
    const stored = readStorage(storage, key);
    if (!stored) return defaultId;
    if (legacyIds.includes(stored)) return defaultId;
    return stored;
};

const writeStorage = (storage: Storage | undefined, key: string, value: string | null) => {
    if (!storage) return;
    try {
        if (value == null) storage.removeItem(key);
        else storage.setItem(key, value);
    } catch {
        // ignore storage failures in private mode or restricted browsers
    }
};

const getBuildTimeOpenRouterApiKey = () => (
    String(process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '')
);

const getInitialProvider = (): AiProviderId => {
    const stored = typeof window !== 'undefined' ? readStorage(window.localStorage, STORAGE_KEYS.provider) : null;
    if (stored === 'openrouter' || stored === 'gemini') return stored;
    return getBuildTimeOpenRouterApiKey() ? 'openrouter' : 'gemini';
};

const getInitialModels = (): OpenRouterModelSummary[] => {
    if (typeof window === 'undefined') return DEFAULT_OPENROUTER_MODELS;
    const cached = readStorage(window.localStorage, STORAGE_KEYS.openRouterModelCatalog);
    if (!cached) return DEFAULT_OPENROUTER_MODELS;
    try {
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed)) return DEFAULT_OPENROUTER_MODELS;
        const models = parsed.map((item: unknown) => {
            const model = item as OpenRouterModelSummary;
            return {
                id: String(model?.id || ''),
                baseName: String(model?.baseName || model?.name || model?.id || 'Unknown model'),
                name: String(model?.name || model?.displayName || model?.id || 'Unknown model'),
                description: typeof model?.description === 'string' ? model.description : undefined,
                outputModalities: Array.isArray(model?.outputModalities) ? model.outputModalities : [],
                inputModalities: Array.isArray(model?.inputModalities) ? model.inputModalities : [],
                mixedPricePerMillionUsd: Number(model?.mixedPricePerMillionUsd ?? 0),
                priceLabel: String(model?.priceLabel || '$0.00'),
            } as OpenRouterModelSummary;
        }).filter((model: OpenRouterModelSummary) => Boolean(model.id));
        return sortOpenRouterModels(ensureModelPresent(ensureModelPresent(models, FALLBACK_OPENROUTER_TEXT_MODEL), FALLBACK_OPENROUTER_IMAGE_MODEL));
    } catch {
        return DEFAULT_OPENROUTER_MODELS;
    }
};

const AiSettingsContext = createContext<AiSettingsContextType | null>(null);

export const AiSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [provider, setProviderState] = useState<AiProviderId>(getInitialProvider);
    const [openRouterApiKey, setOpenRouterApiKeyState] = useState<string>(() => {
        if (typeof window === 'undefined') return getBuildTimeOpenRouterApiKey();
        const sessionKey = readStorage(window.sessionStorage, STORAGE_KEYS.openRouterApiKey);
        const localKey = readStorage(window.localStorage, STORAGE_KEYS.openRouterApiKey);
        return sessionKey || localKey || getBuildTimeOpenRouterApiKey();
    });
    const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModelSummary[]>(getInitialModels);
    const [openRouterModelCatalogState, setOpenRouterModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        openRouterModels.length > 0 ? 'ready' : 'idle',
    );
    const [openRouterModelCatalogError, setOpenRouterModelCatalogError] = useState<string | null>(null);
    const [openRouterTextModelId, setOpenRouterTextModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENROUTER_TEXT_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openRouterTextModelId, FALLBACK_OPENROUTER_TEXT_MODEL.id, [
            '~google/gemini-flash-latest',
        ]);
    });
    const [openRouterVisionModelId, setOpenRouterVisionModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENROUTER_VISION_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openRouterVisionModelId, FALLBACK_OPENROUTER_VISION_MODEL.id, [
            '~google/gemini-flash-latest',
        ]);
    });
    const [openRouterImageModelId, setOpenRouterImageModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENROUTER_IMAGE_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openRouterImageModelId, FALLBACK_OPENROUTER_IMAGE_MODEL.id, [
            'google/gemini-3.1-flash-image-preview',
        ]);
    });

    const effectiveOpenRouterApiKey = openRouterApiKey || getBuildTimeOpenRouterApiKey();

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.provider, provider);
    }, [provider]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.sessionStorage, STORAGE_KEYS.openRouterApiKey, openRouterApiKey || null);
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterApiKey, openRouterApiKey || null);
    }, [openRouterApiKey]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterTextModelId, openRouterTextModelId);
    }, [openRouterTextModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterVisionModelId, openRouterVisionModelId);
    }, [openRouterVisionModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterImageModelId, openRouterImageModelId);
    }, [openRouterImageModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterModelCatalog, JSON.stringify(openRouterModels));
    }, [openRouterModels]);

    const setProvider = useCallback((nextProvider: AiProviderId) => {
        setProviderState(nextProvider);
    }, []);

    const setOpenRouterApiKey = useCallback((apiKey: string) => {
        setOpenRouterApiKeyState(apiKey.trim());
    }, []);

    const setOpenRouterTextModelId = useCallback((modelId: string) => {
        setOpenRouterTextModelIdState(modelId);
    }, []);

    const setOpenRouterVisionModelId = useCallback((modelId: string) => {
        setOpenRouterVisionModelIdState(modelId);
    }, []);

    const setOpenRouterImageModelId = useCallback((modelId: string) => {
        setOpenRouterImageModelIdState(modelId);
    }, []);

    const refreshOpenRouterModels = useCallback(async () => {
        if (!effectiveOpenRouterApiKey) {
            throw new Error('Add an OpenRouter API key before refreshing models.');
        }
        setOpenRouterModelCatalogState('loading');
        setOpenRouterModelCatalogError(null);
        try {
            const models = await fetchOpenRouterModels(effectiveOpenRouterApiKey, 'all');
            const normalized = sortOpenRouterModels(ensureModelPresent(ensureModelPresent(models, FALLBACK_OPENROUTER_TEXT_MODEL), FALLBACK_OPENROUTER_IMAGE_MODEL));
            setOpenRouterModels(normalized);
            setOpenRouterModelCatalogState('ready');
        } catch (error) {
            setOpenRouterModelCatalogState('error');
            setOpenRouterModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
        }
    }, [effectiveOpenRouterApiKey]);

    const { creativeModels, visionModels, imageModels } = splitModelsByPromptType(openRouterModels);
    const openRouterTextModels = ensureModelPresent(splitModelsByModality(openRouterModels).textModels, FALLBACK_OPENROUTER_TEXT_MODEL);
    const openRouterCreativeModels = ensureModelPresent(creativeModels, FALLBACK_OPENROUTER_TEXT_MODEL);
    const openRouterVisionModels = ensureModelPresent(visionModels, FALLBACK_OPENROUTER_VISION_MODEL);
    const openRouterImageModels = ensureModelPresent(imageModels, FALLBACK_OPENROUTER_IMAGE_MODEL);

    const value = useMemo<AiSettingsContextType>(() => ({
        provider,
        setProvider,
        openRouterApiKey,
        setOpenRouterApiKey,
        openRouterModels,
        openRouterTextModels,
        openRouterCreativeModels,
        openRouterVisionModels,
        openRouterImageModels,
        openRouterModelCatalogState,
        openRouterModelCatalogError,
        refreshOpenRouterModels,
        openRouterTextModelId,
        setOpenRouterTextModelId,
        openRouterVisionModelId,
        setOpenRouterVisionModelId,
        openRouterImageModelId,
        setOpenRouterImageModelId,
        effectiveOpenRouterApiKey,
    }), [
        provider,
        setProvider,
        openRouterApiKey,
        setOpenRouterApiKey,
        openRouterModels,
        openRouterTextModels,
        openRouterCreativeModels,
        openRouterVisionModels,
        openRouterImageModels,
        openRouterModelCatalogState,
        openRouterModelCatalogError,
        refreshOpenRouterModels,
        openRouterTextModelId,
        setOpenRouterTextModelId,
        openRouterVisionModelId,
        setOpenRouterVisionModelId,
        openRouterImageModelId,
        setOpenRouterImageModelId,
        effectiveOpenRouterApiKey,
    ]);

    return <AiSettingsContext.Provider value={value}>{children}</AiSettingsContext.Provider>;
};

export const useAiSettings = () => {
    const context = useContext(AiSettingsContext);
    if (!context) throw new Error('useAiSettings must be used within an AiSettingsProvider');
    return context;
};
