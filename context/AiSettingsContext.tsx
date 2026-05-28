import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ensureModelPresent, fetchOpenRouterModels, sortOpenRouterModels, splitModelsByPromptType, type OpenRouterModelSummary } from '../lib/ai/openrouter';
import { fetchGeminiModels, getGeminiModelCacheSummaries, splitGeminiModelsByPromptType, sortGeminiModels } from '../lib/ai/gemini';
import { fetchOpenCodeGoModels, getOpenCodeGoModelCacheSummaries, splitOpenCodeGoModelsByPromptType } from '../lib/ai/opencode-go';
import { fetchDeepSeekModels, getDeepSeekModelCacheSummaries, splitDeepSeekModelsByPromptType } from '../lib/ai/deepseek';
import { OPENROUTER_MODEL_CACHE } from '../data/openrouter-model-cache';
import { GEMINI_MODEL_CACHE } from '../data/gemini-model-cache';

export type AiProviderId = 'openrouter' | 'gemini' | 'opencode-go' | 'deepseek';

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
    openCodeGoApiKey: 'ai.opencode-go.apiKey',
    deepSeekApiKey: 'ai.deepseek.apiKey',
    openRouterTextModelId: 'ai.openrouter.textModelId',
    openRouterSimpleModelId: 'ai.openrouter.simpleModelId',
    openRouterVisionModelId: 'ai.openrouter.visionModelId',
    openRouterImageModelId: 'ai.openrouter.imageModelId',
    geminiTextModelId: 'ai.gemini.textModelId',
    geminiSimpleModelId: 'ai.gemini.simpleModelId',
    geminiVisionModelId: 'ai.gemini.visionModelId',
    geminiImageModelId: 'ai.gemini.imageModelId',
    openCodeGoTextModelId: 'ai.opencode-go.textModelId',
    openCodeGoSimpleModelId: 'ai.opencode-go.simpleModelId',
    openCodeGoVisionModelId: 'ai.opencode-go.visionModelId',
    openCodeGoImageModelId: 'ai.opencode-go.imageModelId',
    deepSeekTextModelId: 'ai.deepseek.textModelId',
    deepSeekSimpleModelId: 'ai.deepseek.simpleModelId',
    deepSeekVisionModelId: 'ai.deepseek.visionModelId',
    deepSeekImageModelId: 'ai.deepseek.imageModelId',
    openRouterModelCatalog: 'ai.openrouter.modelCatalog',
    geminiModelCatalog: 'ai.gemini.modelCatalog',
    openCodeGoModelCatalog: 'ai.opencode-go.modelCatalog',
    deepSeekModelCatalog: 'ai.deepseek.modelCatalog',
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

const DEFAULT_OPENCODE_GO_MODELS = getOpenCodeGoModelCacheSummaries();
const DEFAULT_DEEPSEEK_MODELS = getDeepSeekModelCacheSummaries();

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

const FALLBACK_OPENCODE_GO_SIMPLE_MODEL: OpenRouterModelSummary = {
    id: 'qwen3.5-plus',
    baseName: 'Qwen 3.5 Plus',
    name: 'Qwen 3.5 Plus — $0.00 / 1M mixed',
    description: 'Balanced OpenCode Go model for broad, everyday use.',
    outputModalities: ['text'],
    inputModalities: ['text'],
    mixedPricePerMillionUsd: 0,
    priceLabel: '$0.00',
};

const FALLBACK_OPENCODE_GO_TEXT_MODEL: OpenRouterModelSummary = {
    id: 'deepseek-v4-pro',
    baseName: 'DeepSeek V4 Pro',
    name: 'DeepSeek V4 Pro — $0.00 / 1M mixed',
    description: 'Higher-capability DeepSeek V4 model available through OpenCode Go.',
    outputModalities: ['text'],
    inputModalities: ['text'],
    mixedPricePerMillionUsd: 0,
    priceLabel: '$0.00',
};

const FALLBACK_DEEPSEEK_SIMPLE_MODEL: OpenRouterModelSummary = {
    id: 'deepseek-v4-flash',
    baseName: 'DeepSeek V4 Flash',
    name: 'DeepSeek V4 Flash — $0.21 / 1M mixed',
    description: 'Fast, economical DeepSeek V4 model with 1M context.',
    outputModalities: ['text'],
    inputModalities: ['text'],
    mixedPricePerMillionUsd: 0.21,
    priceLabel: '$0.21',
};

const FALLBACK_DEEPSEEK_TEXT_MODEL: OpenRouterModelSummary = {
    id: 'deepseek-v4-pro',
    baseName: 'DeepSeek V4 Pro',
    name: 'DeepSeek V4 Pro — $0.65 / 1M mixed',
    description: 'Higher-capability DeepSeek V4 model with 1M context and stronger reasoning.',
    outputModalities: ['text'],
    inputModalities: ['text'],
    mixedPricePerMillionUsd: 0.6525,
    priceLabel: '$0.65',
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
const getBuildTimeOpenCodeGoApiKey = () => String(process.env.OPENCODE_GO_API_KEY || process.env.VITE_OPENCODE_GO_API_KEY || '');
const getBuildTimeDeepSeekApiKey = () => String(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '');

const getInitialProvider = (): AiProviderId => {
    const stored = typeof window !== 'undefined' ? readStorage(window.localStorage, STORAGE_KEYS.provider) : null;
    if (stored === 'openrouter' || stored === 'gemini' || stored === 'opencode-go' || stored === 'deepseek') return stored;
    if (getBuildTimeOpenRouterApiKey()) return 'openrouter';
    if (getBuildTimeGeminiApiKey()) return 'gemini';
    if (getBuildTimeOpenCodeGoApiKey()) return 'opencode-go';
    if (getBuildTimeDeepSeekApiKey()) return 'deepseek';
    return 'openrouter';
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

const getInitialOpenCodeGoModels = (): OpenRouterModelSummary[] => {
    if (typeof window === 'undefined') return DEFAULT_OPENCODE_GO_MODELS;
    const cached = readStorage(window.localStorage, STORAGE_KEYS.openCodeGoModelCatalog);
    if (!cached) return DEFAULT_OPENCODE_GO_MODELS;
    try {
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed)) return DEFAULT_OPENCODE_GO_MODELS;
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
        return sortOpenRouterModels(models);
    } catch {
        return DEFAULT_OPENCODE_GO_MODELS;
    }
};

const getInitialDeepSeekModels = (): OpenRouterModelSummary[] => {
    if (typeof window === 'undefined') return DEFAULT_DEEPSEEK_MODELS;
    const cached = readStorage(window.localStorage, STORAGE_KEYS.deepSeekModelCatalog);
    if (!cached) return DEFAULT_DEEPSEEK_MODELS;
    try {
        const parsed = JSON.parse(cached);
        if (!Array.isArray(parsed)) return DEFAULT_DEEPSEEK_MODELS;
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
        return sortOpenRouterModels(models);
    } catch {
        return DEFAULT_DEEPSEEK_MODELS;
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
    const [openCodeGoApiKey, setOpenCodeGoApiKeyState] = useState<string>(() => {
        if (typeof window === 'undefined') return getBuildTimeOpenCodeGoApiKey();
        const sessionKey = readStorage(window.sessionStorage, STORAGE_KEYS.openCodeGoApiKey);
        const localKey = readStorage(window.localStorage, STORAGE_KEYS.openCodeGoApiKey);
        return sessionKey || localKey || getBuildTimeOpenCodeGoApiKey();
    });
    const [deepSeekApiKey, setDeepSeekApiKeyState] = useState<string>(() => {
        if (typeof window === 'undefined') return getBuildTimeDeepSeekApiKey();
        const sessionKey = readStorage(window.sessionStorage, STORAGE_KEYS.deepSeekApiKey);
        const localKey = readStorage(window.localStorage, STORAGE_KEYS.deepSeekApiKey);
        return sessionKey || localKey || getBuildTimeDeepSeekApiKey();
    });

    const [openRouterModels, setOpenRouterModels] = useState<OpenRouterModelSummary[]>(getInitialOpenRouterModels);
    const [geminiModels, setGeminiModels] = useState<OpenRouterModelSummary[]>(getInitialGeminiModels);
    const [openCodeGoModels, setOpenCodeGoModels] = useState<OpenRouterModelSummary[]>(getInitialOpenCodeGoModels);
    const [deepSeekModels, setDeepSeekModels] = useState<OpenRouterModelSummary[]>(getInitialDeepSeekModels);
    const [openRouterModelCatalogState, setOpenRouterModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        openRouterModels.length > 0 ? 'ready' : 'idle',
    );
    const [geminiModelCatalogState, setGeminiModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        geminiModels.length > 0 ? 'ready' : 'idle',
    );
    const [openCodeGoModelCatalogState, setOpenCodeGoModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        openCodeGoModels.length > 0 ? 'ready' : 'idle',
    );
    const [deepSeekModelCatalogState, setDeepSeekModelCatalogState] = useState<'idle' | 'loading' | 'ready' | 'error'>(
        deepSeekModels.length > 0 ? 'ready' : 'idle',
    );
    const [openRouterModelCatalogError, setOpenRouterModelCatalogError] = useState<string | null>(null);
    const [geminiModelCatalogError, setGeminiModelCatalogError] = useState<string | null>(null);
    const [openCodeGoModelCatalogError, setOpenCodeGoModelCatalogError] = useState<string | null>(null);
    const [deepSeekModelCatalogError, setDeepSeekModelCatalogError] = useState<string | null>(null);

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

    const [openCodeGoTextModelId, setOpenCodeGoTextModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENCODE_GO_TEXT_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openCodeGoTextModelId, FALLBACK_OPENCODE_GO_TEXT_MODEL.id);
    });
    const [openCodeGoSimpleModelId, setOpenCodeGoSimpleModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_OPENCODE_GO_SIMPLE_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openCodeGoSimpleModelId, FALLBACK_OPENCODE_GO_SIMPLE_MODEL.id);
    });
    const [openCodeGoVisionModelId, setOpenCodeGoVisionModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return '';
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openCodeGoVisionModelId, '');
    });
    const [openCodeGoImageModelId, setOpenCodeGoImageModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return '';
        return getStoredModelId(window.localStorage, STORAGE_KEYS.openCodeGoImageModelId, '');
    });

    const [deepSeekTextModelId, setDeepSeekTextModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_DEEPSEEK_TEXT_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.deepSeekTextModelId, FALLBACK_DEEPSEEK_TEXT_MODEL.id);
    });
    const [deepSeekSimpleModelId, setDeepSeekSimpleModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return FALLBACK_DEEPSEEK_SIMPLE_MODEL.id;
        return getStoredModelId(window.localStorage, STORAGE_KEYS.deepSeekSimpleModelId, FALLBACK_DEEPSEEK_SIMPLE_MODEL.id);
    });
    const [deepSeekVisionModelId, setDeepSeekVisionModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return '';
        return getStoredModelId(window.localStorage, STORAGE_KEYS.deepSeekVisionModelId, '');
    });
    const [deepSeekImageModelId, setDeepSeekImageModelIdState] = useState<string>(() => {
        if (typeof window === 'undefined') return '';
        return getStoredModelId(window.localStorage, STORAGE_KEYS.deepSeekImageModelId, '');
    });

    const providerApiKey = provider === 'openrouter'
        ? openRouterApiKey
        : provider === 'gemini'
            ? geminiApiKey
            : provider === 'opencode-go'
                ? openCodeGoApiKey
                : deepSeekApiKey;
    const providerModelCatalogState = provider === 'openrouter'
        ? openRouterModelCatalogState
        : provider === 'gemini'
            ? geminiModelCatalogState
            : provider === 'opencode-go'
                ? openCodeGoModelCatalogState
                : deepSeekModelCatalogState;
    const providerModelCatalogError = provider === 'openrouter'
        ? openRouterModelCatalogError
        : provider === 'gemini'
            ? geminiModelCatalogError
            : provider === 'opencode-go'
                ? openCodeGoModelCatalogError
                : deepSeekModelCatalogError;

    const openRouterCreativeModels = useMemo(() => splitModelsByPromptType(openRouterModels).creativeModels, [openRouterModels]);
    const openRouterVisionModels = useMemo(() => splitModelsByPromptType(openRouterModels).visionModels, [openRouterModels]);
    const openRouterImageModels = useMemo(() => splitModelsByPromptType(openRouterModels).imageModels, [openRouterModels]);

    const geminiPromptModelSets = useMemo(() => splitGeminiModelsByPromptType(geminiModels), [geminiModels]);
    const geminiSimpleModels = useMemo(() => sortModelsByPrice(geminiPromptModelSets.creativeModels), [geminiPromptModelSets]);
    const geminiCreativeModels = useMemo(() => geminiPromptModelSets.creativeModels, [geminiPromptModelSets]);
    const geminiVisionModels = useMemo(() => geminiPromptModelSets.visionModels, [geminiPromptModelSets]);
    const geminiImageModels = useMemo(() => geminiPromptModelSets.imageModels, [geminiPromptModelSets]);

    const openCodeGoPromptModelSets = useMemo(() => splitOpenCodeGoModelsByPromptType(openCodeGoModels), [openCodeGoModels]);
    const openCodeGoSimpleModels = useMemo(() => sortModelsByPrice(openCodeGoPromptModelSets.creativeModels), [openCodeGoPromptModelSets]);
    const openCodeGoCreativeModels = useMemo(() => openCodeGoPromptModelSets.creativeModels, [openCodeGoPromptModelSets]);
    const openCodeGoVisionModels = useMemo(() => openCodeGoPromptModelSets.visionModels, [openCodeGoPromptModelSets]);
    const openCodeGoImageModels = useMemo(() => openCodeGoPromptModelSets.imageModels, [openCodeGoPromptModelSets]);

    const deepSeekPromptModelSets = useMemo(() => splitDeepSeekModelsByPromptType(deepSeekModels), [deepSeekModels]);
    const deepSeekSimpleModels = useMemo(() => sortModelsByPrice(deepSeekPromptModelSets.creativeModels), [deepSeekPromptModelSets]);
    const deepSeekCreativeModels = useMemo(() => deepSeekPromptModelSets.creativeModels, [deepSeekPromptModelSets]);
    const deepSeekVisionModels = useMemo(() => deepSeekPromptModelSets.visionModels, [deepSeekPromptModelSets]);
    const deepSeekImageModels = useMemo(() => deepSeekPromptModelSets.imageModels, [deepSeekPromptModelSets]);

    const providerSimpleModels = provider === 'openrouter'
        ? openRouterSimpleModels
        : provider === 'gemini'
            ? geminiSimpleModels
            : provider === 'opencode-go'
                ? openCodeGoSimpleModels
                : deepSeekSimpleModels;
    const providerCreativeModels = provider === 'openrouter'
        ? openRouterCreativeModels
        : provider === 'gemini'
            ? geminiCreativeModels
            : provider === 'opencode-go'
                ? openCodeGoCreativeModels
                : deepSeekCreativeModels;
    const providerVisionModels = provider === 'openrouter'
        ? openRouterVisionModels
        : provider === 'gemini'
            ? geminiVisionModels
            : provider === 'opencode-go'
                ? openCodeGoVisionModels
                : deepSeekVisionModels;
    const providerImageModels = provider === 'openrouter'
        ? openRouterImageModels
        : provider === 'gemini'
            ? geminiImageModels
            : provider === 'opencode-go'
                ? openCodeGoImageModels
                : deepSeekImageModels;

    const providerSimpleModelId = provider === 'openrouter'
        ? openRouterSimpleModelId
        : provider === 'gemini'
            ? geminiSimpleModelId
            : provider === 'opencode-go'
                ? openCodeGoSimpleModelId
                : deepSeekSimpleModelId;
    const providerTextModelId = provider === 'openrouter'
        ? openRouterTextModelId
        : provider === 'gemini'
            ? geminiTextModelId
            : provider === 'opencode-go'
                ? openCodeGoTextModelId
                : deepSeekTextModelId;
    const providerVisionModelId = provider === 'openrouter'
        ? openRouterVisionModelId
        : provider === 'gemini'
            ? geminiVisionModelId
            : provider === 'opencode-go'
                ? openCodeGoVisionModelId
                : deepSeekVisionModelId;
    const providerImageModelId = provider === 'openrouter'
        ? openRouterImageModelId
        : provider === 'gemini'
            ? geminiImageModelId
            : provider === 'opencode-go'
                ? openCodeGoImageModelId
                : deepSeekImageModelId;

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
        writeStorage(window.sessionStorage, STORAGE_KEYS.openCodeGoApiKey, openCodeGoApiKey || null);
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoApiKey, openCodeGoApiKey || null);
    }, [openCodeGoApiKey]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.sessionStorage, STORAGE_KEYS.deepSeekApiKey, deepSeekApiKey || null);
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekApiKey, deepSeekApiKey || null);
    }, [deepSeekApiKey]);

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
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoTextModelId, openCodeGoTextModelId);
    }, [openCodeGoTextModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoSimpleModelId, openCodeGoSimpleModelId);
    }, [openCodeGoSimpleModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoVisionModelId, openCodeGoVisionModelId);
    }, [openCodeGoVisionModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoImageModelId, openCodeGoImageModelId);
    }, [openCodeGoImageModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekTextModelId, deepSeekTextModelId);
    }, [deepSeekTextModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekSimpleModelId, deepSeekSimpleModelId);
    }, [deepSeekSimpleModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekVisionModelId, deepSeekVisionModelId);
    }, [deepSeekVisionModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekImageModelId, deepSeekImageModelId);
    }, [deepSeekImageModelId]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openRouterModelCatalog, JSON.stringify(openRouterModels));
    }, [openRouterModels]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.geminiModelCatalog, JSON.stringify(geminiModels));
    }, [geminiModels]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.openCodeGoModelCatalog, JSON.stringify(openCodeGoModels));
    }, [openCodeGoModels]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        writeStorage(window.localStorage, STORAGE_KEYS.deepSeekModelCatalog, JSON.stringify(deepSeekModels));
    }, [deepSeekModels]);

    const setProvider = useCallback((nextProvider: AiProviderId) => {
        setProviderState(nextProvider);
    }, []);

    const setProviderApiKey = useCallback((apiKey: string) => {
        const trimmed = apiKey.trim();
        if (provider === 'openrouter') setOpenRouterApiKeyState(trimmed);
        else if (provider === 'gemini') setGeminiApiKeyState(trimmed);
        else if (provider === 'opencode-go') setOpenCodeGoApiKeyState(trimmed);
        else setDeepSeekApiKeyState(trimmed);
    }, [provider]);

    const setProviderTextModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') setOpenRouterTextModelIdState(modelId);
        else if (provider === 'gemini') setGeminiTextModelIdState(modelId);
        else if (provider === 'opencode-go') setOpenCodeGoTextModelIdState(modelId);
        else setDeepSeekTextModelIdState(modelId);
    }, [provider]);

    const setProviderVisionModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') setOpenRouterVisionModelIdState(modelId);
        else if (provider === 'gemini') setGeminiVisionModelIdState(modelId);
        else if (provider === 'opencode-go') setOpenCodeGoVisionModelIdState(modelId);
        else setDeepSeekVisionModelIdState(modelId);
    }, [provider]);

    const setProviderImageModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') setOpenRouterImageModelIdState(modelId);
        else if (provider === 'gemini') setGeminiImageModelIdState(modelId);
        else if (provider === 'opencode-go') setOpenCodeGoImageModelIdState(modelId);
        else setDeepSeekImageModelIdState(modelId);
    }, [provider]);

    const setProviderSimpleModelId = useCallback((modelId: string) => {
        if (provider === 'openrouter') setOpenRouterSimpleModelIdState(modelId);
        else if (provider === 'gemini') setGeminiSimpleModelIdState(modelId);
        else if (provider === 'opencode-go') setOpenCodeGoSimpleModelIdState(modelId);
        else setDeepSeekSimpleModelIdState(modelId);
    }, [provider]);

    const refreshProviderModels = useCallback(async () => {
        if (!providerApiKey) {
            throw new Error(`Add a ${provider === 'openrouter' ? 'OpenRouter' : provider === 'gemini' ? 'Gemini' : provider === 'opencode-go' ? 'OpenCode Go' : 'DeepSeek'} API key before refreshing models.`);
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

            if (provider === 'gemini') {
                setGeminiModelCatalogState('loading');
                setGeminiModelCatalogError(null);
                const models = await fetchGeminiModels(providerApiKey);
                setGeminiModels(models.length > 0 ? models : DEFAULT_GEMINI_MODELS);
                const refreshedModels = models.length > 0 ? models : DEFAULT_GEMINI_MODELS;
                if (!refreshedModels.some(model => model.id === geminiSimpleModelId)) {
                    setGeminiSimpleModelIdState(FALLBACK_GEMINI_SIMPLE_MODEL.id);
                }
                if (!refreshedModels.some(model => model.id === geminiTextModelId)) {
                    setGeminiTextModelIdState(FALLBACK_GEMINI_TEXT_MODEL.id);
                }
                setGeminiModelCatalogState('ready');
                return;
            }

            if (provider === 'opencode-go') {
                setOpenCodeGoModelCatalogState('loading');
                setOpenCodeGoModelCatalogError(null);
                const models = await fetchOpenCodeGoModels(providerApiKey);
                const refreshedModels = models.length > 0 ? models : DEFAULT_OPENCODE_GO_MODELS;
                setOpenCodeGoModels(refreshedModels);
                if (!refreshedModels.some(model => model.id === openCodeGoSimpleModelId)) {
                    setOpenCodeGoSimpleModelIdState(FALLBACK_OPENCODE_GO_SIMPLE_MODEL.id);
                }
                if (!refreshedModels.some(model => model.id === openCodeGoTextModelId)) {
                    setOpenCodeGoTextModelIdState(FALLBACK_OPENCODE_GO_TEXT_MODEL.id);
                }
                setOpenCodeGoModelCatalogState('ready');
                return;
            }

            setDeepSeekModelCatalogState('loading');
            setDeepSeekModelCatalogError(null);
            const models = await fetchDeepSeekModels(providerApiKey);
            const refreshedModels = models.length > 0 ? models : DEFAULT_DEEPSEEK_MODELS;
            setDeepSeekModels(refreshedModels);
            if (!refreshedModels.some(model => model.id === deepSeekSimpleModelId)) {
                setDeepSeekSimpleModelIdState(FALLBACK_DEEPSEEK_SIMPLE_MODEL.id);
            }
            if (!refreshedModels.some(model => model.id === deepSeekTextModelId)) {
                setDeepSeekTextModelIdState(FALLBACK_DEEPSEEK_TEXT_MODEL.id);
            }
            setDeepSeekModelCatalogState('ready');
        } catch (error) {
            if (provider === 'openrouter') {
                setOpenRouterModelCatalogState('error');
                setOpenRouterModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
                return;
            }
            if (provider === 'gemini') {
                setGeminiModelCatalogState('error');
                setGeminiModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
                return;
            }
            if (provider === 'opencode-go') {
                setOpenCodeGoModelCatalogState('error');
                setOpenCodeGoModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
                return;
            }
            setDeepSeekModelCatalogState('error');
            setDeepSeekModelCatalogError(error instanceof Error ? error.message : 'Failed to refresh models.');
        }
    }, [
        deepSeekSimpleModelId,
        deepSeekTextModelId,
        openCodeGoSimpleModelId,
        openCodeGoTextModelId,
        openRouterImageModelId,
        openRouterSimpleModelId,
        openRouterTextModelId,
        openRouterVisionModelId,
        provider,
        providerApiKey,
        geminiSimpleModelId,
        geminiTextModelId,
    ]);

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
        openRouterApiKey,
        geminiApiKey,
        openCodeGoApiKey,
        deepSeekApiKey,
        openRouterModels,
        geminiModels,
        openCodeGoModels,
        deepSeekModels,
        openRouterModelCatalogState,
        geminiModelCatalogState,
        openCodeGoModelCatalogState,
        deepSeekModelCatalogState,
        openRouterModelCatalogError,
        geminiModelCatalogError,
        openCodeGoModelCatalogError,
        deepSeekModelCatalogError,
        openRouterSimpleModelId,
        openRouterTextModelId,
        openRouterVisionModelId,
        openRouterImageModelId,
        geminiSimpleModelId,
        geminiTextModelId,
        geminiVisionModelId,
        geminiImageModelId,
        openCodeGoSimpleModelId,
        openCodeGoTextModelId,
        openCodeGoVisionModelId,
        openCodeGoImageModelId,
        deepSeekSimpleModelId,
        deepSeekTextModelId,
        deepSeekVisionModelId,
        deepSeekImageModelId,
    ]);

    return <AiSettingsContext.Provider value={value}>{children}</AiSettingsContext.Provider>;
};

export const useAiSettings = () => {
    const context = useContext(AiSettingsContext);
    if (!context) throw new Error('useAiSettings must be used within an AiSettingsProvider');
    return context;
};
