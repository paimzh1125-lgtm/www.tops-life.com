import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // 开启 Gzip 压缩，大幅减少传输体积
        viteCompression({
          algorithm: 'gzip',
          ext: '.gz',
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // 生产环境移除 console
        minify: 'esbuild',
        rollupOptions: {
          output: {
            // 手动分包策略：将依赖拆分为独立文件
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'gsap-vendor': ['gsap', 'gsap/ScrollTrigger'],
              'ui-vendor': ['lucide-react', '@studio-freight/lenis'],
              'i18n-vendor': ['i18next', 'react-i18next'],
            }
          }
        },
        // 提高警告阈值，避免分包后因为包大小产生的警告干扰
        chunkSizeWarningLimit: 1000
      },
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
      },
    };
});
