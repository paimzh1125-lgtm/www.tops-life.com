// --- MODIFY FILE App.tsx ---

import React, { useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 引入刚刚创建的 Provider
import { LanguageProvider } from './components/LanguageContext'; 

import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/index';
import About from './pages/About';
import Products from './pages/Products';
import News from './pages/News';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

// ... (ScrollToTop 组件保持不变) ...
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ... (Layout 组件保持不变) ...
const Layout = ({ children }: { children?: React.ReactNode }) => {
  // ... (Lenis 代码保持不变) ...
  const lenisRef = useRef<Lenis | null>(null);
  
  useEffect(() => {
     // ... (原有 Lenis 初始化代码) ...
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
      <ParticleBackground />
      <Navbar /> {/* Navbar 现在在 Provider 内部了 */}
      <main className="flex-grow z-10 relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    //在这里包裹 LanguageProvider
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
      </HashRouter>
    </LanguageProvider>
  );
};

export default App;
