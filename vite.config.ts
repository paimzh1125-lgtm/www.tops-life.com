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
    target: 'es2015',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000, // 忽略 Three.js 的大文件警告
    rollupOptions: {
      output: {
        // 使用函数进行更精细的控制，确保 vendor-react 尽可能小
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. 巨型库隔离：Three.js 必须单独拆分，避免阻塞首屏
            if (id.includes('three')) return 'vendor-three';
            
            // 2. 动画库隔离
            if (id.includes('gsap') || id.includes('lenis')) return 'vendor-animation';
            
            // 3. UI 组件与图标 (优先匹配，防止 lucide-react 被下方的 react 规则捕获)
            if (id.includes('lucide') || id.includes('swiper')) return 'vendor-ui';

            // 4. 核心依赖合并 (React + Router + i18n + Analytics + Others)
            // 修复: 将 React 核心与其他依赖合并，防止因分包导致的初始化顺序问题 (Uncaught TypeError: Cannot set properties of undefined)
            return 'vendor-core';
          }
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