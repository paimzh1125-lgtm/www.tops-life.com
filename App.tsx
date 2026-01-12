import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. 引入 Analytics 组件
import { Analytics } from "@vercel/analytics/react"

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

const Layout = ({ children }: { children?: React.ReactNode }) => {
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
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
             
            {/* 新增：产品详情页路由 */}
            <Route path="/products/:id" element={<ProductDetail />} />
             
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      
      {/* 2. 在这里添加 Analytics 组件 */}
      <Analytics />
      
    </LanguageProvider>
  );
};

export default App;
