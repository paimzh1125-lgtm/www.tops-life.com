import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. 引入 Analytics 组件
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { HelmetProvider } from 'react-helmet-async';
import './i18n'; // 引入 i18n 配置
import { useTranslation } from 'react-i18next';

// FIX: 导入 SEO 组件以修复 ReferenceError
import SEO from './components/SEO';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/index';
import About from './pages/About';
import Products from './pages/Products';
// 引入新创建的详情页
import ProductDetail from './pages/ProductDetail';
import News from './pages/News';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Layout = () => {
  useEffect(() => {
     const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-tops-dark bg-tops-white selection:bg-tops-blue selection:text-white">
      <Navbar />
      <main className="flex-grow z-10 relative">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

// 语言状态同步组件 (Task 2: 适配多语言)
const LanguageWrapper = ({ lang }: { lang: 'zh' | 'en' }) => {
  const { i18n } = useTranslation();
  
  React.useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      {/* 全局 SEO 配置 (处理默认 Title 和 Meta) */}
      <SEO />
      
      {/* 移除 LanguageProvider 以避免与 react-i18next 状态冲突导致死循环 (#185) */}
        <ScrollToTop />
        <Routes>
          {/* Task 2: 英文路由 (默认) */}
          <Route path="/" element={<LanguageWrapper lang="en" />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="news" element={<News />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Route>

          {/* Task 2: 中文路由 (/zh 前缀) */}
          <Route path="/zh" element={<LanguageWrapper lang="zh" />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="news" element={<News />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Route>

          {/* 全局 404 重定向到英文首页 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        <Analytics />
        <SpeedInsights />
    </HelmetProvider>
  );
};

export default App;
