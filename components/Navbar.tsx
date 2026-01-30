// src/components/Navbar.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- 简单的内部 SVG 图标组件，替代 lucide-react ---
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
  ),
  X: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  Globe: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  ChevronRight: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  )
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const isHomePage = location.pathname === '/';
  const isTransparentMode = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // 使用 useMemo 优化导航链接数组，确保语言切换时正确更新
  const navLinks = useMemo(() => {
    return language === 'zh' ? [
      { name: '首页', path: '/' },
      { name: '关于我们', path: '/about' },
      { name: '解决方案', path: '/products' },
      { name: '新闻动态', path: '/news' },
      { name: '联系我们', path: '/contact' },
    ] : [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Solutions', path: '/products' },
      { name: 'News', path: '/news' },
      { name: 'Contact', path: '/contact' },
    ];
  }, [language]);

  // Language Switch Logic (Subpath Routing)
  const switchTarget = useMemo(() => {
    const host = window.location.host;
    const path = location.pathname;
    const search = location.search;
    const hash = location.hash;

    if (language === 'zh') {
      // cn.tops-life.com -> www.tops-life.com (Rule 1, 2, 3)
      const newHost = host.replace('cn.', 'www.');
      return `https://${newHost}${path}${search}${hash}`;
    } else {
      // www.tops-life.com -> cn.tops-life.com (Rule 1, 2, 3)
      const newHost = host.includes('www.') ? host.replace('www.', 'cn.') : `cn.${host}`;
      return `https://${newHost}${path}${search}${hash}`;
    }
  }, [language, location.pathname, location.search, location.hash]);

  return (
    <header 
      className={`${isHomePage ? 'fixed' : 'sticky'} top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparentMode
          ? 'bg-transparent py-6' 
          : 'bg-slate-900 shadow-lg py-4 md:bg-white/95 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer select-none" aria-label="Go to homepage">
          <img 
            src="/banner/logo.png" 
            alt={t('alt.logo')} 
            className={`
              h-9 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105
              ${isTransparentMode ? "brightness-0 invert opacity-100" : "brightness-0 invert md:brightness-100 md:invert-0"} 
            `}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`
                text-[15px] font-bold tracking-wide transition-all duration-300 relative group px-1
                ${isTransparentMode ? 'text-white hover:text-sky-200' : 'text-slate-800 hover:text-sky-600'}
                ${location.pathname === link.path ? (isTransparentMode ? 'text-sky-300' : 'text-sky-600') : ''}
              `}
            >
              {link.name}
              <span 
                className={`
                  absolute -bottom-2 left-0 h-[3px] rounded-full transition-all duration-300 w-0 group-hover:w-full 
                  ${isTransparentMode ? 'bg-white' : 'bg-sky-500'}
                  ${location.pathname === link.path ? 'w-full' : ''}
                `} 
              />
            </Link>
          ))}
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-5">
          <a 
            href={switchTarget}
            aria-label={language === 'zh' ? "Switch to English" : "切换到中文"}
            className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all border hover:scale-105 ${
              isTransparentMode
                ? "border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30" 
                : "border-slate-200 bg-white text-slate-800 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
            }`}
          >
            <Icons.Globe />
            {language === 'zh' ? 'EN' : '中文'}
          </a>
          
          <button 
            className={`md:hidden transition-colors hover:scale-110 text-white`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} 
          style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}
        >
            <button 
              className="absolute top-8 right-8 text-white/80 hover:text-white" 
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
                <Icons.X />
            </button>
            {navLinks.map((link) => (
               <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-bold text-white flex items-center gap-3 hover:text-sky-400 transition-colors tracking-wider"
               >
                 {link.name} <div className="text-sky-500"><Icons.ChevronRight /></div>
               </Link>
            ))}
             <a 
              href={switchTarget}
              onClick={() => setIsMobileOpen(false)}
              aria-label={language === 'zh' ? "Switch to English" : "切换到中文"}
              className="mt-8 flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full text-lg font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Icons.Globe /> {language === 'zh' ? 'EN' : '中文'}
            </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
