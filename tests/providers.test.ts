import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchDeepSeekModels, getDeepSeekModelCacheSummaries, splitDeepSeekModelsByPromptType } from '../lib/ai/deepseek';
import { fetchOpenCodeGoModels, getOpenCodeGoModelCacheSummaries, splitOpenCodeGoModelsByPromptType } from '../lib/ai/opencode-go';

afterEach(() => {
    vi.restoreAllMocks();
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
