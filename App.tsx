import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. 引入 Analytics 组件
import { Analytics } from "@vercel/analytics/react";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入 i18n 配置

// FIX: 导入 SEO 组件以修复 ReferenceError
import SEO from './components/SEO';

import { LanguageProvider } from './components/LanguageContext'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// --- 性能优化：路由懒加载 (Lazy Loading) ---
// 只有当用户访问这些路由时，才会加载对应的 JS 文件
const Home = lazy(() => import('./pages/index'));
const About = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const News = lazy(() => import('./pages/News'));
const Contact = lazy(() => import('./pages/Contact'));

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 简单的加载占位符 (Loading Spinner)
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-slate-50">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-sky-500 rounded-full animate-spin"></div>
  </div>
);

const Layout = () => {
  const lenisRef = useRef<Lenis | null>(null);
   
  useEffect(() => {
     const lenis = new Lenis({
      duration: 1.2,
      // Smooth scrolling configuration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
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

const App: React.FC = () => {
  return (
    <HelmetProvider>
      {/* 全局 SEO 配置 (处理默认 Title 和 Meta) */}
      <SEO />
      
      {/* LanguageProvider 必须在 Router 内部才能使用 hooks */}
      <LanguageProvider>
        <ScrollToTop />
        <Routes>
          {/* 子域名策略：移除 /:lang 前缀，直接使用根路径 */}
          <Route element={<Layout />}>
            {/* 使用 Suspense 包裹懒加载的路由 */}
            <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
            <Route path="/products" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
            <Route path="/products/:id" element={<Suspense fallback={<PageLoader />}><ProductDetail /></Suspense>} />
            <Route path="/news" element={<Suspense fallback={<PageLoader />}><News /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><Contact /></Suspense>} />

            {/* 全局 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        
        <Analytics />
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
