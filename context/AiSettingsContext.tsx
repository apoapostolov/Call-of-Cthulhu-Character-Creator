import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ensureModelPresent, fetchOpenRouterModels, sortOpenRouterModels, splitModelsByPromptType, type OpenRouterModelSummary } from '../lib/ai/openrouter';
import { fetchGeminiModels, getGeminiModelCacheSummaries, splitGeminiModelsByPromptType, sortGeminiModels } from '../lib/ai/gemini';
import { OPENROUTER_MODEL_CACHE } from '../data/openrouter-model-cache';
import { GEMINI_MODEL_CACHE } from '../data/gemini-model-cache';

export type AiProviderId = 'openrouter' | 'gemini';

export interface AiSettingsContextType {
    provider: AiProviderId;
    setProvider: (provider: AiProviderId) => void;
    providerApiKey: string;
    setProviderApiKey: (apiKey: string) => void;
    providerSimpleModels: OpenRouterModelSummary[];
    providerCreativeModels: OpenRouterModelSummary[];
    providerVisionModels: OpenRouterModelSummary[];
    providerImageModels: OpenRouterModelSummary[];
    providerModelCatalogState: 'idle' | 'loading' | 'ready' | 'error';
    providerModelCatalogError: string | null;
    refreshProviderModels: () => Promise<void>;
    providerSimpleModelId: string;
    setProviderSimpleModelId: (modelId: string) => void;
    providerTextModelId: string;
    setProviderTextModelId: (modelId: string) => void;
    providerVisionModelId: string;
    setProviderVisionModelId: (modelId: string) => void;
    providerImageModelId: string;
    setProviderImageModelId: (modelId: string) => void;
}

const STORAGE_KEYS = {
    provider: 'ai.provider',
    openRouterApiKey: 'ai.openrouter.apiKey',
    geminiApiKey: 'ai.gemini.apiKey',
    openRouterTextModelId: 'ai.openrouter.textModelId',
    openRouterSimpleModelId: 'ai.openrouter.simpleModelId',
    openRouterVisionModelId: 'ai.openrouter.visionModelId',
    openRouterImageModelId: 'ai.openrouter.imageModelId',
    geminiTextModelId: 'ai.gemini.textModelId',
    geminiSimpleModelId: 'ai.gemini.simpleModelId',
    geminiVisionModelId: 'ai.gemini.visionModelId',
    geminiImageModelId: 'ai.gemini.imageModelId',
    openRouterModelCatalog: 'ai.openrouter.modelCatalog',
    geminiModelCatalog: 'ai.gemini.modelCatalog',
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

const FALLBACK_OPENROUTER_SIMPLE_MODEL: OpenRouterModelSummary = FALLBACK_OPENROUTER_TEXT_MODEL;

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

const DEFAULT_GEMINI_MODELS = getGeminiModelCacheSummaries().length > 0
    ? getGeminiModelCacheSummaries()
    : GEMINI_MODEL_CACHE.map(model => ({
        id: model.id,
        baseName: model.baseName,
        name: model.displayName,
        description: model.description || undefined,
        outputModalities: model.outputModalities as any,
        inputModalities: model.inputModalities,
        mixedPricePerMillionUsd: model.mixedPricePerMillionUsd,
        priceLabel: model.priceLabel,
    }));

const FALLBACK_GEMINI_SIMPLE_MODEL: OpenRouterModelSummary = {
    id: 'gemini-3.1-flash-live-preview',
    baseName: 'Gemini 3.1 Flash Live Preview',
    name: 'Gemini 3.1 Flash Live Preview',
    description: 'Live preview model optimized for low-latency, interactive tasks and real-time experiences.',
    outputModalities: ['text', 'audio'],
    inputModalities: ['text', 'audio', 'video'],
    mixedPricePerMillionUsd: 0,
    priceLabel: '$0.00',
};

const FALLBACK_GEMINI_TEXT_MODEL: OpenRouterModelSummary = {
    id: 'gemini-3.1-pro-preview',
    baseName: 'Gemini 3.1 Pro Preview',
    name: 'Gemini 3.1 Pro Preview',
    description: 'Preview model for high-capability multimodal reasoning, writing, and analysis.',
    outputModalities: ['text'],
    inputModalities: ['text', 'image', 'video', 'audio', 'pdf'],
    mixedPricePerMillionUsd: 0,
    priceLabel: '$0.00',
};

const FALLBACK_GEMINI_VISION_MODEL: OpenRouterModelSummary = {
    id: 'gemini-3.1-flash-live-preview',
    baseName: 'Gemini 3.1 Flash Live Preview',
    name: 'Gemini 3.1 Flash Live Preview',
    description: 'Live preview model optimized for low-latency, interactive tasks and real-time experiences.',
    outputModalities: ['text'],
    inputModalities: ['text', 'audio', 'video'],
    mixedPricePerMillionUsd: 0,
    priceLabel: '$0.00',
};

const FALLBACK_GEMINI_IMAGE_MODEL: OpenRouterModelSummary = {
    id: 'gemini-2.5-flash-image',
    baseName: 'Gemini 2.5 Flash Image',
    name: 'Gemini 2.5 Flash Image',
    description: 'Native image generation model optimized for speed, flexibility, and contextual understanding.',
    outputModalities: ['text', 'image'],
    inputModalities: ['text', 'image'],
    mixedPricePerMillionUsd: 0.17,
    priceLabel: '$0.17',
};

const DEFAULT_GEMINI_TEXT_MODELS = ensureModelPresent(
    ensureModelPresent(DEFAULT_GEMINI_MODELS.filter(model => model.outputModalities.includes('text')), FALLBACK_GEMINI_TEXT_MODEL),
    FALLBACK_GEMINI_TEXT_MODEL,
);

const DEFAULT_GEMINI_IMAGE_MODELS = ensureModelPresent(
    ensureModelPresent(DEFAULT_GEMINI_MODELS.filter(model => model.outputModalities.includes('image')), FALLBACK_GEMINI_IMAGE_MODEL),
    FALLBACK_GEMINI_IMAGE_MODEL,
);

const DEFAULT_GEMINI_VISION_MODELS = ensureModelPresent(
    ensureModelPresent(DEFAULT_GEMINI_TEXT_MODELS.filter(model => model.inputModalities.includes('image')), FALLBACK_GEMINI_VISION_MODEL),
    FALLBACK_GEMINI_VISION_MODEL,
);

const sortModelsByPrice = (models: OpenRouterModelSummary[]) => (
    [...models].sort((left, right) => {
        const priceCompare = left.mixedPricePerMillionUsd - right.mixedPricePerMillionUsd;
        if (priceCompare !== 0) return priceCompare;
        const nameCompare = left.baseName.localeCompare(right.baseName, undefined, { numeric: true, sensitivity: 'base' });
        if (nameCompare !== 0) return nameCompare;
        return left.id.localeCompare(right.id, undefined, { numeric: true, sensitivity: 'base' });
    })
);

const getCheapestModel = (models: OpenRouterModelSummary[], fallback: OpenRouterModelSummary) => sortModelsByPrice(ensureModelPresent(models, fallback))[0] || fallback;

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

const getBuildTimeOpenRouterApiKey = () => String(process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '');
const getBuildTimeGeminiApiKey = () => String(process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '');

const getInitialProvider = (): AiProviderId => {
    const stored = typeof window !== 'undefined' ? readStorage(window.localStorage, STORAGE_KEYS.provider) : null;
    if (stored === 'openrouter' || stored === 'gemini') return stored;
    return getBuildTimeOpenRouterApiKey() ? 'openrouter' : 'gemini';
};

const getInitialOpenRouterModels = (): OpenRouterModelSummary[] => {
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

const getInitialGeminiModels = (): OpenRouterModelSummary[] => {
    if (typeof window === 'undefined') return DEFAULT_GEMINI_MODELS;
    const cached = readStorage(window.localStorage, STORAGE_KEYS.geminiModelCatalog);
    if (!cached) return DEFAULT_GEMINI_MODELS;
    try {
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed)) return DEFAULT_GEMINI_MODELS;
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
        return sortGeminiModels(models);
    } catch {
        return DEFAULT_GEMINI_MODELS;
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

    const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
        if (typeof window === 'undefined') return getBuildTimeGeminiApiKey();
        const sessionKey = readStorage(window.sessionStorage, STORAGE_KEYS.geminiApiKey);
        const localKey = readStorage(window.localStorage, STORAGE_KEYS.geminiApiKey);
        return sessionKey || localKey || getBuildTimeGeminiApiKey();
    });

    const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModelSummary[]>(getInitialOpenRouterModels);
    const [geminiModels, setGeminiModels] = useState<OpenRouterModelSummary[]>(getInitialGeminiModels);
    const [openRouterModelCatalogState, setOpenRouterModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        openRouterModels.length > 0 ? 'ready' : 'idle',
    );
    const [geminiModelCatalogState, setGeminiModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        geminiModels.length > 0 ? 'ready' : 'idle',
    );
    const [openRouterModelCatalogError, setOpenRouterModelCatalogError] = useState<string | null>(null);
    const [geminiModelCatalogError, setGeminiModelCatalogError] = useState<string | null>(null);

    const openRouterSimpleModels = useMemo(() => sortModelsByPrice(splitModelsByPromptType(openRouterModels).creativeModels), [openRouterModels]);
    const [openRouterTextModelId, setOpenRouterTextModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENROUTER_TEXT_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openRouterTextModelId, FALLBACK_OPENROUTER_TEXT_MODEL.id, [
            '~google/gemini-flash-latest',
        ]);
    });
    const [openRouterSimpleModelId, setOpenRouterSimpleModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENROUTER_SIMPLE_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openRouterSimpleModelId, FALLBACK_OPENROUTER_SIMPLE_MODEL.id);
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

    const [geminiTextModelId, setGeminiTextModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_GEMINI_TEXT_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.geminiTextModelId, FALLBACK_GEMINI_TEXT_MODEL.id);
    });
    const [geminiSimpleModelId, setGeminiSimpleModelIdState] = useState<string>(() => {
        const defaultId = FALLBACK_GEMINI_SIMPLE_MODEL.id;
        if (typeof window === 'undefined') return defaultId;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.geminiSimpleModelId, defaultId);
    });
    const [geminiVisionModelId, setGeminiVisionModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_GEMINI_VISION_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.geminiVisionModelId, FALLBACK_GEMINI_VISION_MODEL.id);
    });
    const [geminiImageModelId, setGeminiImageModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_GEMINI_IMAGE_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.geminiImageModelId, FALLBACK_GEMINI_IMAGE_MODEL.id);
    });

    const providerApiKey = provider === 'openrouter' ? openRouterApiKey : geminiApiKey;
    const providerModelCatalogState = provider === 'openrouter' ? openRouterModelCatalogState : geminiModelCatalogState;
    const providerModelCatalogError = provider === 'openrouter' ? openRouterModelCatalogError : geminiModelCatalogError;

    const openRouterCreativeModels = useMemo(() => splitModelsByPromptType(openRouterModels).creativeModels, [openRouterModels]);
    const openRouterVisionModels = useMemo(() => splitModelsByPromptType(openRouterModels).visionModels, [openRouterModels]);
    const openRouterImageModels = useMemo(() => splitModelsByPromptType(openRouterModels).imageModels, [openRouterModels]);

    const geminiPromptModelSets = useMemo(() => splitGeminiModelsByPromptType(geminiModels), [geminiModels]);
    const geminiSimpleModels = useMemo(() => sortModelsByPrice(geminiPromptModelSets.creativeModels), [geminiPromptModelSets]);
    const geminiCreativeModels = useMemo(() => geminiPromptModelSets.creativeModels, [geminiPromptModelSets]);
    const geminiVisionModels = useMemo(() => geminiPromptModelSets.visionModels, [geminiPromptModelSets]);
    const geminiImageModels = useMemo(() => geminiPromptModelSets.imageModels, [geminiPromptModelSets]);

    const providerSimpleModels = provider === 'openrouter' ? openRouterSimpleModels : geminiSimpleModels;
    const providerCreativeModels = provider === 'openrouter' ? openRouterCreativeModels : geminiCreativeModels;
    const providerVisionModels = provider === 'openrouter' ? openRouterVisionModels : geminiVisionModels;
    const providerImageModels = provider === 'openrouter' ? openRouterImageModels : geminiImageModels;

    const providerSimpleModelId = provider === 'openrouter' ? openRouterSimpleModelId : geminiSimpleModelId;
    const providerTextModelId = provider === 'openrouter' ? openRouterTextModelId : geminiTextModelId;
    const providerVisionModelId = provider === 'openrouter' ? openRouterVisionModelId : geminiVisionModelId;
    const providerImageModelId = provider === 'openrouter' ? openRouterImageModelId : geminiImageModelId;

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
        writeStorage(window.sessionStorage, STORAGE_KEYS.geminiApiKey, geminiApiKey || null);
        writeStorage(window.localStorage, STORAGE_KEYS.geminiApiKey, geminiApiKey || null);
    }, [geminiApiKey]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterTextModelId, openRouterTextModelId);
    }, [openRouterTextModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterSimpleModelId, openRouterSimpleModelId);
    }, [openRouterSimpleModelId]);

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
        writeStorage(window.localStorage, STORAGE_KEYS.geminiTextModelId, geminiTextModelId);
    }, [geminiTextModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.geminiSimpleModelId, geminiSimpleModelId);
    }, [geminiSimpleModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.geminiVisionModelId, geminiVisionModelId);
    }, [geminiVisionModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.geminiImageModelId, geminiImageModelId);
    }, [geminiImageModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterModelCatalog, JSON.stringify(openRouterModels));
    }, [openRouterModels]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.geminiModelCatalog, JSON.stringify(geminiModels));
    }, [geminiModels]);

    const setProvider = useCallback((nextProvider: AiProviderId) => {
        setProviderState(nextProvider);
    }, []);

    const setProviderApiKey = useCallback((apiKey: string) => {
        if (provider === 'openrouter') {
            setOpenRouterApiKeyState(apiKey.trim());
        } else {
            setGeminiApiKeyState(apiKey.trim());
        }
    }, [provider]);

    const setProviderTextModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') {
            setOpenRouterTextModelIdState(modelId);
        } else {
            setGeminiTextModelIdState(modelId);
        }
    }, [provider]);

    const setProviderVisionModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') {
            setOpenRouterVisionModelIdState(modelId);
        } else {
            setGeminiVisionModelIdState(modelId);
        }
    }, [provider]);

    const setProviderImageModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') {
            setOpenRouterImageModelIdState(modelId);
        } else {
            setGeminiImageModelIdState(modelId);
        }
    }, [provider]);

    const setProviderSimpleModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') {
            setOpenRouterSimpleModelIdState(modelId);
        } else {
            setGeminiSimpleModelIdState(modelId);
        }
    }, [provider]);

    const refreshProviderModels = useCallback(async () => {
        if (!providerApiKey) {
            throw new Error(`Add a ${provider === 'openrouter' ? 'OpenRouter' : 'Gemini'} API key before refreshing models.`);
        }
        try {
            if (provider === 'openrouter') {
                setOpenRouterModelCatalogState('loading');
                setOpenRouterModelCatalogError(null);
                const models = await fetchOpenRouterModels(providerApiKey, 'all');
                const normalized = sortOpenRouterModels(ensureModelPresent(ensureModelPresent(models, FALLBACK_OPENROUTER_TEXT_MODEL), FALLBACK_OPENROUTER_IMAGE_MODEL));
                setOpenRouterModels(normalized);
                if (!normalized.some(model => model.id === openRouterSimpleModelId)) {
                    setOpenRouterSimpleModelIdState(FALLBACK_OPENROUTER_SIMPLE_MODEL.id);
                }
                setOpenRouterModelCatalogState('ready');
                return;
            }

            setGeminiModelCatalogState('loading');
            setGeminiModelCatalogError(null);
            const models = await fetchGeminiModels(providerApiKey);
            setGeminiModels(models.length > 0 ? models : DEFAULT_GEMINI_MODELS);
            const refreshedModels = models.length > 0 ? models : DEFAULT_GEMINI_MODELS;
            if (!refreshedModels.some(model => model.id === geminiSimpleModelId)) {
                setGeminiSimpleModelIdState(FALLBACK_GEMINI_SIMPLE_MODEL.id);
            }
            setGeminiModelCatalogState('ready');
        } catch (error) {
            if (provider === 'openrouter') {
                setOpenRouterModelCatalogState('error');
                setOpenRouterModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
                return;
            }
            setGeminiModelCatalogState('error');
            setGeminiModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
        }
    }, [provider, providerApiKey]);

    const value = useMemo<AiSettingsContextType>(() => ({
        provider,
        setProvider,
        providerApiKey,
        setProviderApiKey,
        providerSimpleModels,
        providerCreativeModels,
        providerVisionModels,
        providerImageModels,
        providerModelCatalogState,
        providerModelCatalogError,
        refreshProviderModels,
        providerSimpleModelId,
        setProviderSimpleModelId,
        providerTextModelId,
        setProviderTextModelId,
        providerVisionModelId,
        setProviderVisionModelId,
        providerImageModelId,
        setProviderImageModelId,
    }), [
        provider,
        setProvider,
        providerApiKey,
        setProviderApiKey,
        providerSimpleModels,
        providerCreativeModels,
        providerVisionModels,
        providerImageModels,
        providerModelCatalogState,
        providerModelCatalogError,
        refreshProviderModels,
        providerSimpleModelId,
        setProviderSimpleModelId,
        providerTextModelId,
        setProviderTextModelId,
        providerVisionModelId,
        setProviderVisionModelId,
        providerImageModelId,
        setProviderImageModelId,
    ]);

    return <AiSettingsContext.Provider value={value}>{children}</AiSettingsContext.Provider>;
};

export const useAiSettings = () => {
    const context = useContext(AiSettingsContext);
    if (!context) throw new Error('useAiSettings must be used within an AiSettingsProvider');
    return context;
};
