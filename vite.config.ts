import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import prerender from '@prerenderer/rollup-plugin';
import jsdomRenderer from '@prerenderer/renderer-jsdom';
// @ts-ignore
import webfontDownload from 'vite-plugin-webfont-dl';
import { NEWS_DATABASE } from './newsData';

const newsRoutes = Object.keys(NEWS_DATABASE).map((slug) => `/news/${slug}`);

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-core': ['react', 'react-dom', 'react-router-dom', 'react-i18next', 'i18next', 'i18next-browser-languagedetector'],
          'animation-lib': ['gsap', '@studio-freight/lenis'],
          'ui-lib': ['lucide-react'],
          'analytics': ['@vercel/analytics', '@vercel/speed-insights'],
          'swiper-vendor': ['swiper'],
          'three-vendor': ['three'],
        },
      },
    },
  },
  plugins: [
    react(),
    webfontDownload(),
    prerender({
      // 1. 指定需要预渲染的静态路由
      routes: [
        '/', 
        '/about', 
        '/products', 
        '/news', 
        '/contact',
        ...newsRoutes
      ],
      
      // 2. 配置 JSDOM 渲染器 (更轻量，无需下载浏览器，安装最稳定)
      renderer: new jsdomRenderer({
        renderAfterTime: 5000, // Increase to 5s to ensure React fully mounts in JSDOM
      }),

      // 3. 构建后处理 (Critical SEO Fix)
      postProcess(renderedRoute) {
        // 移除 index.html 模板中默认的 <title>，避免与 React Helmet 生成的标题重复
        renderedRoute.html = renderedRoute.html.replace(
          /<title>Vite App<\/title>/i,
          ''
        );
        return renderedRoute;
      },
    }),
  ],
});