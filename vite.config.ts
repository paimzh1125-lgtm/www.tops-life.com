import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import prerender from '@prerenderer/rollup-plugin';
import jsdomRenderer from '@prerenderer/renderer-jsdom';

export default defineConfig({
  plugins: [
    react(),
    viteCompression(),
    prerender({
      // 1. 指定需要预渲染的静态路由
      routes: ['/', '/about', '/products', '/news', '/contact'],
      
      // 2. 配置 JSDOM 渲染器 (更轻量，无需系统依赖，完美适配 Vercel)
      renderer: new jsdomRenderer({
        // 等待 1000ms 确保 React 组件挂载和初始数据加载完成
        renderAfterTime: 1000,
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