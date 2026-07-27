import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
    const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    const openRouterApiKey = env.VITE_OPENROUTER_API_KEY || env.OPENROUTER_API_KEY || '';
    const openAiApiKey = env.VITE_OPENAI_API_KEY || env.OPENAI_API_KEY || '';
    const anthropicApiKey = env.VITE_ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';
    const zhipuApiKey = env.VITE_ZHIPU_API_KEY || env.ZHIPU_API_KEY || env.VITE_ZAI_API_KEY || env.ZAI_API_KEY || '';
    const xaiApiKey = env.VITE_XAI_API_KEY || env.XAI_API_KEY || '';
    return {
      server: {
        port: 3001,
        host: '0.0.0.0',
        // /mnt/c does not always emit inotify events — poll so HMR works from WSL.
        watch: {
          usePolling: true,
          interval: 300,
        },
        hmr: {
          overlay: true,
        },
        // Browser SPA cannot call auth.x.ai (CORS). Proxy OAuth device/token calls.
        // Production static hosts need an equivalent reverse proxy for /__xai_oauth.
        proxy: {
          '/__xai_oauth': {
            target: 'https://auth.x.ai',
            changeOrigin: true,
            secure: true,
            rewrite: (p) => p.replace(/^\/__xai_oauth/, ''),
          },
        },
      },
      preview: {
        // Same OAuth proxy for `vite preview` smoke tests.
        proxy: {
          '/__xai_oauth': {
            target: 'https://auth.x.ai',
            changeOrigin: true,
            secure: true,
            rewrite: (p: string) => p.replace(/^\/__xai_oauth/, ''),
          },
        },
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
        'process.env.ZHIPU_API_KEY': JSON.stringify(zhipuApiKey),
        'process.env.VITE_ZHIPU_API_KEY': JSON.stringify(zhipuApiKey),
        'process.env.XAI_API_KEY': JSON.stringify(xaiApiKey),
        'process.env.VITE_XAI_API_KEY': JSON.stringify(xaiApiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        rollupOptions: {
          output: {
            // Split heavy vendor/data modules so the browser can cache and
            // parallel-fetch them; pair with React.lazy for tab code.
            manualChunks(id) {
              if (id.includes('node_modules/pdf-lib')) return 'pdf-lib';
              if (id.includes('node_modules/@google/genai')) return 'google-genai';
              if (id.includes('openrouter-model-cache')) return 'openrouter-models';
              if (id.includes('prices-homebrew')) return 'prices-homebrew';
              if (id.includes('classic-1920s/prices-official')) return 'prices-official-1920s';
            },
          },
        },
        chunkSizeWarningLimit: 600,
      },
    };
});
