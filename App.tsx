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
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
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

// 根路径重定向: / -> /zh 或 /en
const RootRedirect = () => {
  const { i18n } = useTranslation();
  const dest = i18n.language.startsWith('en') ? '/en' : '/zh';
  return <Navigate to={dest} replace />;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* LanguageProvider 必须在 Router 内部才能使用 hooks */}
        <LanguageProvider>
          <ScrollToTop />
          <Routes>
            {/* 1. 根路径重定向 */}
            <Route path="/" element={<RootRedirect />} />

            {/* 2. 语言路由 (/:lang) */}
            <Route path="/:lang" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="news" element={<News />} />
              <Route path="contact" element={<Contact />} />
              
              {/* 捕获语言路径下的 404 */}
              <Route path="*" element={<Navigate to="" replace />} />
            </Route>

            {/* 3. 全局 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          
          <Analytics />
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
