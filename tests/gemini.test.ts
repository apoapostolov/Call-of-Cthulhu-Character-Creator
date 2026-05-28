import { describe, expect, it, vi } from 'vitest';
import { GEMINI_MODEL_CACHE } from '../data/gemini-model-cache';
import { fetchGeminiModels, getGeminiModelCacheSummaries, normalizeGeminiModel, sortGeminiModels, splitGeminiModelsByPromptType } from '../lib/ai/gemini';

describe('Gemini model helpers', () => {
  it('normalizes the cached model records with price labels', () => {
    const cachedModel = GEMINI_MODEL_CACHE.find(entry => entry.id === 'gemini-2.5-flash-lite');
    expect(cachedModel).toBeDefined();
    const model = normalizeGeminiModel(cachedModel);

    expect(model.id).toBe('gemini-2.5-flash-lite');
    expect(model.baseName).toBe('Gemini 2.5 Flash-Lite');
    expect(model.name).toContain('$0.25');
    expect(model.priceLabel).toBe('$0.25');
    expect(model.mixedPricePerMillionUsd).toBe(0.25);
  });

  it('sorts Gemini models by model name and cost', () => {
    const models = sortGeminiModels([
      normalizeGeminiModel({
        id: 'gemini-2.5-pro',
        baseName: 'Gemini 2.5 Pro',
        mixedPricePerMillionUsd: 5.63,
        inputModalities: ['text'],
        outputModalities: ['text'],
      }),
      normalizeGeminiModel({
        id: 'gemini-2.5-flash',
        baseName: 'Gemini 2.5 Flash',
        mixedPricePerMillionUsd: 1.4,
        inputModalities: ['text'],
        outputModalities: ['text'],
      }),
      normalizeGeminiModel({
        id: 'gemini-2.5-flash-lite',
        baseName: 'Gemini 2.5 Flash-Lite',
        mixedPricePerMillionUsd: 0.25,
        inputModalities: ['text'],
        outputModalities: ['text'],
      }),
    ]);

    expect(models.map(model => model.id)).toEqual([
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
      'gemini-2.5-pro',
    ]);
  });

  it('splits Gemini models into the creative, vision, and image lanes', () => {
    const { creativeModels, visionModels, imageModels } = splitGeminiModelsByPromptType(getGeminiModelCacheSummaries());

    expect(creativeModels.map(model => model.id)).toContain('gemini-2.5-flash');
    expect(visionModels.map(model => model.id)).toContain('gemini-2.5-flash');
    expect(imageModels.map(model => model.id)).toContain('gemini-2.5-flash-image');
  });

  it('pulls Gemini models from the live models.list endpoint', async () => {
    const originalFetch = global.fetch;
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          models: [
            {
              name: 'models/gemini-2.5-flash',
              displayName: 'Gemini 2.5 Flash',
              description: 'Flash model',
              supportedActions: ['generateContent'],
            },
          ],
          nextPageToken: 'next-page',
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          models: [
            {
              name: 'models/gemini-2.5-flash-image',
              displayName: 'Gemini 2.5 Flash Image',
              description: 'Image model',
              supportedActions: ['generateContent', 'generateImages'],
            },
          ],
        }),
      });

    global.fetch = fetchMock as any;

    try {
      const models = await fetchGeminiModels('test-key');

      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(models.map(model => model.id)).toEqual([
        'gemini-2.5-flash',
        'gemini-2.5-flash-image',
      ]);
      expect(models[0].priceLabel).toBe('$1.40');
      expect(models[1].priceLabel).toBe('$0.17');
    } finally {
      global.fetch = originalFetch;
    }
  });
});
