import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. 引入 Analytics 组件
import { Analytics } from "@vercel/analytics/react"
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import './i18n'; // 引入 i18n 配置

// FIX: 导入 SEO 组件以修复 ReferenceError
import SEO from './components/SEO';

import { LanguageProvider } from './components/LanguageContext'; 
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
  const lenisRef = useRef<Lenis | null>(null);
   
  useEffect(() => {
     const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false,
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
      
      <BrowserRouter>
        {/* LanguageProvider 必须在 Router 内部才能使用 hooks */}
        <LanguageProvider>
          <ScrollToTop />
          <Routes>
            {/* 子域名策略：移除 /:lang 前缀，直接使用根路径 */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* 全局 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
          
          <Analytics />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
