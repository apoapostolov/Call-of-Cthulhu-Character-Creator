export type AiProviderId = 'openai' | 'anthropic' | 'openrouter' | 'gemini' | 'opencode-go' | 'deepseek';

export interface AiProviderOption {
    value: AiProviderId;
    label: string;
}

/** Providers ordered by typical popularity / direct usage. */
export const AI_PROVIDER_OPTIONS: AiProviderOption[] = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'gemini', label: 'Google Gemini' },
    { value: 'openrouter', label: 'OpenRouter' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'opencode-go', label: 'OpenCode Go' },
];

export const AI_PROVIDER_IDS = AI_PROVIDER_OPTIONS.map(option => option.value);

export const isAiProviderId = (value: string): value is AiProviderId => (
    AI_PROVIDER_IDS.includes(value as AiProviderId)
);

export const getAiProviderLabel = (provider: AiProviderId) => (
    AI_PROVIDER_OPTIONS.find(option => option.value === provider)?.label || provider
);