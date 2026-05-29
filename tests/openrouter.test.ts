import { describe, expect, it } from 'vitest';
import { ensureModelPresent, normalizeOpenRouterModel, sortOpenRouterModels, splitModelsByModality, splitModelsByPromptType } from '../lib/ai/openrouter';

describe('OpenRouter model helpers', () => {
  it('normalizes API model records', () => {
    const model = normalizeOpenRouterModel({
      id: 'google/gemini-3.1-flash-image-preview',
      name: 'Nano Banana 2',
      description: 'Image model',
      pricing: { prompt: '0.0000005', completion: '0.000003' },
      architecture: {
        input_modalities: ['text', 'image'],
        output_modalities: ['text', 'image'],
      },
    });

    expect(model.id).toBe('google/gemini-3.1-flash-image-preview');
    expect(model.baseName).toBe('Nano Banana 2');
    expect(model.name).toContain('$');
    expect(model.outputModalities).toEqual(['text', 'image']);
    expect(model.inputModalities).toEqual(['text', 'image']);
    expect(model.priceLabel).toContain('$');
  });

  it('splits models into text and image buckets', () => {
    const models = [
      {
        id: '~google/gemini-flash-latest',
        name: 'Gemini Flash Latest',
        pricing: { prompt: '0.000001', completion: '0.000002' },
        architecture: {
          output_modalities: ['text'],
          input_modalities: ['text', 'image'],
        },
      },
      {
        id: 'google/gemini-3.1-flash-image-preview',
        name: 'Nano Banana 2',
        pricing: { prompt: '0.0000005', completion: '0.000003' },
        architecture: {
          output_modalities: ['text', 'image'],
          input_modalities: ['text', 'image'],
        },
      },
    ].map(normalizeOpenRouterModel);

    const { textModels, imageModels } = splitModelsByModality(models);

    expect(textModels.map(model => model.id)).toContain('~google/gemini-flash-latest');
    expect(imageModels.map(model => model.id)).toContain('google/gemini-3.1-flash-image-preview');
  });

  it('splits models into creative, vision, and image prompt groups', () => {
    const models = [
      {
        id: 'provider/creative-only',
        name: 'Creative Only',
        pricing: { prompt: '0.000001', completion: '0.000002' },
        architecture: {
          output_modalities: ['text'],
          input_modalities: ['text'],
        },
      },
      {
        id: 'provider/vision-capable',
        name: 'Vision Capable',
        pricing: { prompt: '0.000001', completion: '0.000002' },
        architecture: {
          output_modalities: ['text'],
          input_modalities: ['text', 'image'],
        },
      },
      {
        id: 'provider/image-gen',
        name: 'Image Gen',
        pricing: { prompt: '0.0000005', completion: '0.000003' },
        architecture: {
          output_modalities: ['image'],
          input_modalities: ['text', 'image'],
        },
      },
    ].map(normalizeOpenRouterModel);

    const { creativeModels, visionModels, imageModels } = splitModelsByPromptType(models);

    expect(creativeModels.map(model => model.id)).toEqual([
      'provider/creative-only',
      'provider/vision-capable',
    ]);
    expect(visionModels.map(model => model.id)).toContain('provider/vision-capable');
    expect(imageModels.map(model => model.id)).toContain('provider/image-gen');
  });

  it('keeps fallback defaults present in model lists', () => {
    const fallback = {
      id: 'openai/gpt-5-mini',
      name: 'OpenAI GPT-5 Mini',
      baseName: 'OpenAI GPT-5 Mini',
      priceLabel: '$1.13',
      mixedPricePerMillionUsd: 1.13,
      outputModalities: ['text'],
      inputModalities: ['text'],
    } as ReturnType<typeof normalizeOpenRouterModel>;

    const models = ensureModelPresent([], fallback);
    expect(models[0].id).toBe(fallback.id);
  });

  it('sorts models by provider, model, then cost', () => {
    const models = sortOpenRouterModels([
      {
        id: 'zeta/model-b',
        baseName: 'Model B',
        name: 'Model B — $0.20 / 1M mixed',
        priceLabel: '$0.20',
        mixedPricePerMillionUsd: 0.2,
        outputModalities: ['text'],
        inputModalities: ['text'],
      },
      {
        id: 'alpha/model-c',
        baseName: 'Model C',
        name: 'Model C — $0.10 / 1M mixed',
        priceLabel: '$0.10',
        mixedPricePerMillionUsd: 0.1,
        outputModalities: ['text'],
        inputModalities: ['text'],
      },
      {
        id: 'alpha/model-a',
        baseName: 'Model A',
        name: 'Model A — $0.30 / 1M mixed',
        priceLabel: '$0.30',
        mixedPricePerMillionUsd: 0.3,
        outputModalities: ['text'],
        inputModalities: ['text'],
      },
      {
        id: 'alpha/model-a',
        baseName: 'Model A',
        name: 'Model A — $0.05 / 1M mixed',
        priceLabel: '$0.05',
        mixedPricePerMillionUsd: 0.05,
        outputModalities: ['text'],
        inputModalities: ['text'],
      },
    ] as ReturnType<typeof normalizeOpenRouterModel>[]);

    expect(models.map(model => `${model.id}:${model.priceLabel}`)).toEqual([
      'alpha/model-a:$0.05',
      'alpha/model-a:$0.30',
      'alpha/model-c:$0.10',
      'zeta/model-b:$0.20',
    ]);
  });
});
