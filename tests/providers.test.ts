import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAnthropicModels, getAnthropicModelCacheSummaries, splitAnthropicModelsByPromptType } from '../lib/ai/anthropic';
import { fetchDeepSeekModels, getDeepSeekModelCacheSummaries, splitDeepSeekModelsByPromptType } from '../lib/ai/deepseek';
import { fetchOpenAiModels, getOpenAiModelCacheSummaries, isChatOpenAiModelId, splitOpenAiModelsByPromptType } from '../lib/ai/openai';
import { fetchOpenCodeGoModels, getOpenCodeGoModelCacheSummaries, splitOpenCodeGoModelsByPromptType } from '../lib/ai/opencode-go';
import { AI_PROVIDER_OPTIONS } from '../lib/ai/provider-options';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('provider options', () => {
    it('orders providers by popularity with OpenAI first', () => {
        expect(AI_PROVIDER_OPTIONS.map(option => option.value)).toEqual([
            'openai',
            'anthropic',
            'gemini',
            'openrouter',
            'xai',
            'xai-oauth',
            'zhipu',
            'deepseek',
            'opencode-go',
        ]);
    });
});

describe('OpenAI provider models', () => {
    it('exposes the initial cached catalog', () => {
        const models = getOpenAiModelCacheSummaries();

        expect(models.map(model => model.id)).toContain('gpt-4o-mini');
        expect(models.map(model => model.id)).toContain('gpt-4.1');
    });

    it('splits vision-capable chat models', () => {
        const models = getOpenAiModelCacheSummaries();
        const split = splitOpenAiModelsByPromptType(models);

        expect(split.creativeModels.length).toBeGreaterThan(0);
        expect(split.visionModels.length).toBeGreaterThan(0);
        expect(split.imageModels).toEqual([]);
    });

    it('filters non-chat model ids', () => {
        expect(isChatOpenAiModelId('gpt-4o-mini')).toBe(true);
        expect(isChatOpenAiModelId('text-embedding-3-small')).toBe(false);
    });

    it('refreshes from the OpenAI models endpoint', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ data: [{ id: 'gpt-4.1' }, { id: 'text-embedding-3-small' }] }),
        } as Response);

        const models = await fetchOpenAiModels('token');

        expect(fetchMock).toHaveBeenCalledWith('https://api.openai.com/v1/models', {
            headers: {
                Authorization: 'Bearer token',
            },
        });
        expect(models.map(model => model.id)).toEqual(['gpt-4.1']);
    });
});

describe('Anthropic provider models', () => {
    it('exposes the initial cached catalog', () => {
        const models = getAnthropicModelCacheSummaries();

        expect(models.map(model => model.id)).toContain('claude-haiku-4-5');
        expect(models.map(model => model.id)).toContain('claude-sonnet-4-5');
    });

    it('splits vision-capable chat models', () => {
        const models = getAnthropicModelCacheSummaries();
        const split = splitAnthropicModelsByPromptType(models);

        expect(split.creativeModels.length).toBeGreaterThan(0);
        expect(split.visionModels.length).toBeGreaterThan(0);
        expect(split.imageModels).toEqual([]);
    });

    it('refreshes from the Anthropic models endpoint', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ data: [{ id: 'claude-sonnet-4-6', display_name: 'Claude Sonnet 4.6' }] }),
        } as Response);

        const models = await fetchAnthropicModels('token');

        expect(fetchMock).toHaveBeenCalledWith('https://api.anthropic.com/v1/models', {
            headers: expect.objectContaining({
                'x-api-key': 'token',
                'anthropic-version': '2023-06-01',
            }),
        });
        expect(models.map(model => model.id)).toEqual(['claude-sonnet-4-6']);
    });
});

describe('OpenCode Go provider models', () => {
    it('exposes the initial cached catalog', () => {
        const models = getOpenCodeGoModelCacheSummaries();

        expect(models.map(model => model.id)).toContain('qwen3.5-plus');
        expect(models.map(model => model.id)).toContain('deepseek-v4-pro');
    });

    it('treats the catalog as text-only', () => {
        const models = getOpenCodeGoModelCacheSummaries();
        const split = splitOpenCodeGoModelsByPromptType(models);

        expect(split.creativeModels.length).toBeGreaterThan(0);
        expect(split.visionModels).toEqual([]);
        expect(split.imageModels).toEqual([]);
    });

    it('refreshes from the OpenCode Go models endpoint', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ data: [{ id: 'deepseek-v4-flash' }, { id: 'qwen3.7-max' }] }),
        } as Response);

        const models = await fetchOpenCodeGoModels('token');

        expect(fetchMock).toHaveBeenCalledWith('https://opencode.ai/zen/go/v1/models', {
            headers: {
                Authorization: 'Bearer token',
            },
        });
        expect(models.map(model => model.id)).toEqual(['deepseek-v4-flash', 'qwen3.7-max']);
    });
});

describe('DeepSeek provider models', () => {
    it('exposes the initial cached catalog', () => {
        const models = getDeepSeekModelCacheSummaries();

        expect(models.map(model => model.id)).toEqual(['deepseek-v4-flash', 'deepseek-v4-pro']);
    });

    it('treats the catalog as text-only', () => {
        const models = getDeepSeekModelCacheSummaries();
        const split = splitDeepSeekModelsByPromptType(models);

        expect(split.creativeModels.length).toBe(2);
        expect(split.visionModels).toEqual([]);
        expect(split.imageModels).toEqual([]);
    });

    it('refreshes from the DeepSeek models endpoint', async () => {
        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => ({ data: [{ id: 'deepseek-v4-pro' }] }),
        } as Response);

        const models = await fetchDeepSeekModels('token');

        expect(fetchMock).toHaveBeenCalledWith('https://api.deepseek.com/models', {
            headers: {
                Authorization: 'Bearer token',
            },
        });
        expect(models.map(model => model.id)).toEqual(['deepseek-v4-pro']);
    });
});
