import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
    const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    const openRouterApiKey = env.VITE_OPENROUTER_API_KEY || env.OPENROUTER_API_KEY || '';
    const openAiApiKey = env.VITE_OPENAI_API_KEY || env.OPENAI_API_KEY || '';
    const anthropicApiKey = env.VITE_ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';
    return {
      server: {
        port: 3001,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        // Some components use `process.env.API_KEY` directly in the browser; Vite replaces this at build time.
        'process.env.API_KEY': JSON.stringify(geminiApiKey),
        'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'process.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'process.env.OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
        'process.env.VITE_OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
        'process.env.OPENAI_API_KEY': JSON.stringify(openAiApiKey),
        'process.env.VITE_OPENAI_API_KEY': JSON.stringify(env.VITE_OPENAI_API_KEY || ''),
        'process.env.ANTHROPIC_API_KEY': JSON.stringify(anthropicApiKey),
        'process.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(env.VITE_ANTHROPIC_API_KEY || ''),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
