import { useCallback } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { useAiSettings } from '../context/AiSettingsContext';
import { fetchOpenRouterChatCompletion } from '../lib/ai/openrouter';
import { fetchOpenAiCompatibleChatCompletion } from '../lib/ai/openai-compatible';
import { getBuildTimeApiKeyForProvider } from '../lib/ai/provider-keys';

const OPENCODE_GO_API_BASE = 'https://opencode.ai/zen/go/v1';
const DEEPSEEK_API_BASE = 'https://api.deepseek.com';

const getBuildTimeGeminiApiKey = () => String(
    process.env.API_KEY
    || process.env.GEMINI_API_KEY
    || process.env.VITE_GEMINI_API_KEY
    || '',
);

const getGeminiClient = (apiKey: string) => {
    if (!apiKey) {
        throw new Error('Add a Gemini API key to use the Gemini provider.');
    }
    return new GoogleGenAI({ apiKey });
};

const extractText = (response: any) => String(response?.text || '').trim();

const imageDataUrlToParts = (imageDataUrl: string, prompt: string) => {
    const base64ImageData = imageDataUrl.split(',')[1];
    const mimeType = imageDataUrl.match(/data:(.*);/)?.[1] || 'image/png';
    return {
        parts: [
            { inlineData: { data: base64ImageData, mimeType } },
            { text: prompt },
        ],
    };
};

const extractImageDataUrl = (response: any) => {
    if (response?.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
            }
        }
    }
    return null;
};

export const useAiRuntime = () => {
    const {
        provider,
        providerApiKey,
        providerSimpleModelId,
        providerTextModelId,
        providerVisionModelId,
        providerImageModelId,
    } = useAiSettings();
    const resolvedProviderApiKey = providerApiKey || getBuildTimeApiKeyForProvider(provider);
    const geminiApiKey = resolvedProviderApiKey || getBuildTimeGeminiApiKey();
    const isOpenAiCompatibleProvider = provider === 'opencode-go' || provider === 'deepseek';

    const generateText = useCallback(async (params: {
        prompt: string;
        json?: boolean;
        imageDataUrl?: string | null;
        temperature?: number;
        maxTokens?: number;
        systemPrompt?: string;
        modelOverride?: string;
        purpose?: 'simple' | 'creative';
    }) => {
        const selectedTextModelId = params.purpose === 'simple' ? providerSimpleModelId : providerTextModelId;
        const messages: Array<{
            role: 'system' | 'user' | 'assistant';
            content: string | Array<{ type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } }>;
        }> = [];
        if (params.systemPrompt) {
            messages.push({ role: 'system', content: params.systemPrompt });
        }
        if (params.imageDataUrl) {
            messages.push({
                role: 'user',
                content: [
                    { type: 'text', text: params.prompt },
                    { type: 'image_url', image_url: { url: params.imageDataUrl } },
                ],
            });
        } else {
            messages.push({ role: 'user', content: params.prompt });
        }
        if (provider === 'openrouter') {
            if (!resolvedProviderApiKey) {
                throw new Error('Add an OpenRouter API key in Settings.');
            }

            const result = await fetchOpenRouterChatCompletion({
                apiKey: resolvedProviderApiKey,
                model: params.modelOverride || (params.imageDataUrl ? providerVisionModelId : selectedTextModelId),
                messages,
                responseFormat: params.json ? { type: 'json_object' } : undefined,
                temperature: params.temperature,
                maxTokens: params.maxTokens,
            });
            return result.content;
        }

        if (provider === 'opencode-go' || provider === 'deepseek') {
            if (!resolvedProviderApiKey) {
                throw new Error(`Add a ${provider === 'opencode-go' ? 'OpenCode Go' : 'DeepSeek'} API key in Settings.`);
            }
            if (params.imageDataUrl) {
                throw new Error(`Vision prompts are not available with the ${provider === 'opencode-go' ? 'OpenCode Go' : 'DeepSeek'} provider.`);
            }

            const result = await fetchOpenAiCompatibleChatCompletion({
                baseUrl: provider === 'opencode-go' ? OPENCODE_GO_API_BASE : DEEPSEEK_API_BASE,
                apiKey: resolvedProviderApiKey,
                model: params.modelOverride || selectedTextModelId,
                messages,
                responseFormat: params.json ? { type: 'json_object' } : undefined,
                temperature: params.temperature,
                maxTokens: params.maxTokens,
            });
            return result.content;
        }

        const ai = getGeminiClient(geminiApiKey);
        const config = params.json
            ? { responseMimeType: 'application/json' as const }
            : undefined;

        const contents = params.imageDataUrl
            ? imageDataUrlToParts(params.imageDataUrl, params.prompt)
            : params.prompt;

        const response = await ai.models.generateContent({
            model: params.modelOverride || (params.imageDataUrl ? providerVisionModelId : selectedTextModelId),
            contents,
            config,
        });

        return extractText(response);
    }, [geminiApiKey, provider, providerApiKey, providerSimpleModelId, providerTextModelId, providerVisionModelId, resolvedProviderApiKey]);

    const generateImage = useCallback(async (params: {
        prompt: string;
        aspectRatio?: string;
        referenceImageDataUrl?: string | null;
        modelOverride?: string;
    }) => {
        if (provider === 'openrouter') {
            if (!resolvedProviderApiKey) {
                throw new Error('Add an OpenRouter API key in Settings.');
            }

            const messages = params.referenceImageDataUrl
                ? [{
                    role: 'user' as const,
                    content: [
                        { type: 'text' as const, text: params.prompt },
                        { type: 'image_url' as const, image_url: { url: params.referenceImageDataUrl } },
                    ],
                }]
                : [{ role: 'user' as const, content: params.prompt }];

            const result = await fetchOpenRouterChatCompletion({
                apiKey: resolvedProviderApiKey,
                model: params.modelOverride || providerImageModelId,
                messages,
                modalities: ['image', 'text'],
                imageConfig: params.aspectRatio ? { aspect_ratio: params.aspectRatio } : undefined,
            });

            const image = result.images[0];
            if (!image) {
                throw new Error('The model did not return an image.');
            }
            return image;
        }

        if (isOpenAiCompatibleProvider) {
            throw new Error(`Image generation is not available with the ${provider === 'opencode-go' ? 'OpenCode Go' : 'DeepSeek'} provider.`);
        }

        const ai = getGeminiClient(geminiApiKey);
        if (params.referenceImageDataUrl) {
            const response = await ai.models.generateContent({
                model: params.modelOverride || providerImageModelId,
                contents: imageDataUrlToParts(params.referenceImageDataUrl, params.prompt),
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            const image = extractImageDataUrl(response);
            if (!image) {
                throw new Error('The AI did not return an image.');
            }
            return image;
        }

        const response = await ai.models.generateImages({
            model: params.modelOverride || providerImageModelId,
            prompt: params.prompt,
            config: {
                numberOfImages: 1,
                aspectRatio: params.aspectRatio || '1:1',
                outputMimeType: 'image/png',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error('The AI did not return an image.');
        }

        return `data:image/png;base64,${response.generatedImages[0].image.imageBytes}`;
    }, [geminiApiKey, provider, providerImageModelId, isOpenAiCompatibleProvider, providerApiKey, resolvedProviderApiKey]);

    const analyzeImage = useCallback(async (params: {
        prompt: string;
        imageDataUrl: string;
        json?: boolean;
        modelOverride?: string;
    }) => {
        if (provider === 'openrouter') {
            if (!resolvedProviderApiKey) {
                throw new Error('Add an OpenRouter API key in Settings.');
            }

            const result = await fetchOpenRouterChatCompletion({
                apiKey: resolvedProviderApiKey,
                model: params.modelOverride || providerVisionModelId,
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: 'text', text: params.prompt },
                            { type: 'image_url', image_url: { url: params.imageDataUrl } },
                        ],
                    },
                ],
                responseFormat: params.json ? { type: 'json_object' } : undefined,
            });
            return result.content;
        }

        if (isOpenAiCompatibleProvider) {
            throw new Error(`Image analysis is not available with the ${provider === 'opencode-go' ? 'OpenCode Go' : 'DeepSeek'} provider.`);
        }

        const ai = getGeminiClient(geminiApiKey);
        const base64ImageData = params.imageDataUrl.split(',')[1];
        const mimeType = params.imageDataUrl.match(/data:(.*);/)?.[1] || 'image/png';
        const response = await ai.models.generateContent({
            model: params.modelOverride || providerVisionModelId,
            contents: { parts: [{ inlineData: { data: base64ImageData, mimeType } }, { text: params.prompt }] },
            config: params.json ? { responseMimeType: 'application/json' } : undefined,
        });

        return extractText(response);
    }, [geminiApiKey, provider, providerApiKey, providerVisionModelId, isOpenAiCompatibleProvider, resolvedProviderApiKey]);

    return {
        provider,
        generateText,
        generateImage,
        analyzeImage,
        providerTextModelId,
        providerSimpleModelId,
        providerVisionModelId,
        providerImageModelId,
        providerApiKey,
        resolvedProviderApiKey,
    };
};
