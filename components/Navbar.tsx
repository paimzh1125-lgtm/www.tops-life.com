import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --- Icons ---
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

// --- Types ---
interface NavProps {
  isHomePage: boolean;
  isScrolled: boolean;
  navLinks: { name: string; path: string }[];
  switchTarget: string;
  language: string;
  t: any;
}

// --- Desktop Navigation Component (md:block) ---
const DesktopNav: React.FC<NavProps> = ({ isHomePage, isScrolled, navLinks, switchTarget, language, t }) => {
  // Desktop Logic: Transparent only on Home when at the top. Otherwise White/Blur.
  const isTransparentMode = isHomePage && !isScrolled;

  return (
    <div className={`hidden md:block fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isTransparentMode
        ? 'bg-transparent py-6'
        : 'bg-white/95 backdrop-blur-md shadow-sm py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Go to homepage">
          <img
            src="/banner/logo.png"
            alt={t('alt.logo')}
            className={`h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
              isTransparentMode ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[15px] font-bold tracking-wide transition-all duration-300 relative group px-1 ${
                isTransparentMode ? 'text-white hover:text-sky-200' : 'text-slate-800 hover:text-sky-600'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-2 left-0 h-[3px] rounded-full transition-all duration-300 w-0 group-hover:w-full ${
                isTransparentMode ? 'bg-white' : 'bg-sky-500'
              }`} />
            </Link>
          ))}
        </nav>

        {/* Language Switch */}
        <a
          href={switchTarget}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all border hover:scale-105 ${
            isTransparentMode
              ? "border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
              : "border-slate-200 bg-white text-slate-800 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
          }`}
        >
          <Icons.Globe />
          {language === 'zh' ? 'EN' : '中文'}
        </a>
      </div>
    </div>
  );
};

// --- Mobile Navigation Component (md:hidden) ---
const MobileNav: React.FC<NavProps> = ({ isHomePage, navLinks, switchTarget, language, t }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mobile Logic (The Fix):
  // 1. Home Page: Fixed + Transparent (Overlays Hero Image)
  // 2. Subpages: Sticky + Blue Gradient (Pushes content down, no overlap)
  const containerClass = isHomePage
    ? 'fixed top-0 left-0 w-full bg-transparent py-6'
    : 'sticky top-0 left-0 w-full bg-gradient-to-r from-blue-800 to-sky-600 shadow-md py-4';

  return (
    <div className={`md:hidden z-50 transition-all duration-300 ${containerClass}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        {/* Logo - Always White on Mobile for contrast against Dark BG or Dark Hero Image */}
        <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <img
            src="/banner/logo.png"
            alt={t('alt.logo')}
            className="h-9 w-auto object-contain brightness-0 invert"
          />
        </Link>

        {/* Hamburger Button */}
        <button
          className="text-white transition-transform hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      {/* Full Screen Menu Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-b from-blue-900 to-slate-900 z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-white flex items-center gap-3 hover:text-sky-400 transition-colors tracking-wider"
          >
            {link.name} <div className="text-sky-500"><Icons.ChevronRight /></div>
          </Link>
        ))}
        <a
          href={switchTarget}
          className="mt-8 flex items-center gap-2 px-6 py-2 border border-white/20 rounded-full text-lg font-bold text-white hover:bg-white/10 hover:border-white/40 transition-all"
        >
          <Icons.Globe /> {language === 'zh' ? 'EN' : '中文'}
        </a>
      </div>
    </div>
  );
};

// --- Main Navbar Controller ---
const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const switchTarget = useMemo(() => {
    const host = window.location.host;
    const path = location.pathname;
    const search = location.search;
    const hash = location.hash;

    if (language === 'zh') {
      const newHost = host.replace('cn.', 'www.');
      return `https://${newHost}${path}${search}${hash}`;
    } else {
      const newHost = host.includes('www.') ? host.replace('www.', 'cn.') : `cn.${host}`;
      return `https://${newHost}${path}${search}${hash}`;
    }
  }, [language, location.pathname, location.search, location.hash]);

  const props = { isHomePage, isScrolled, navLinks, switchTarget, language, t };

  return (
    <header>
      <DesktopNav {...props} />
      <MobileNav {...props} />
    </header>
  );
};

export default Navbar;
