import type { AiProviderId } from '../../context/AiSettingsContext';

export const getBuildTimeApiKeyForProvider = (provider: AiProviderId) => {
    if (provider === 'openrouter') {
        return String(process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '');
    }
    if (provider === 'gemini') {
        return String(process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '');
    }
    if (provider === 'opencode-go') {
        return String(process.env.OPENCODE_GO_API_KEY || process.env.VITE_OPENCODE_GO_API_KEY || '');
    }
    return String(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '');
};
