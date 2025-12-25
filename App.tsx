import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ⬇️ 1. 新增：引入 Vercel 监控组件
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

// 引入你的组件
import { LanguageProvider } from './components/LanguageContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 引入页面
import Home from './pages/index';
import About from './pages/About';
import Products from './pages/Products';
import News from './pages/News';
import Contact from './pages/Contact';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// 滚动到顶部组件
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 布局组件 (包含 Lenis 平滑滚动)
const Layout = ({ children }: { children?: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
    // Lenis 初始化
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

    // 集成 GSAP ScrollTrigger
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
      <ParticleBackground />
      <Navbar />
      <main className="flex-grow z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>

        {/* ⬇️ 2. 新增：将监控组件放在这里 */}
        <Analytics />
        <SpeedInsights />
        
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
