// --- MODIFY FILE Navbar.tsx ---

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext'; 

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  // 获取全局语言状态
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  // 根据语言定义导航菜单
  const navLinks = language === 'zh' ? [
    { name: '首页', path: '/' },
    { name: '关于我们', path: '/about' },
    { name: '业务板块', path: '/products' },
    { name: '新闻动态', path: '/news' },
    { name: '联系我们', path: '/contact' },
  ] : [
    { name: 'Home', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'PRODUCTS', path: '/products' },
    { name: 'NEWS', path: '/news' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-tops-dark/80 backdrop-blur-md border-b border-tops-blue/10 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        {/* Logo (保持不变) */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 border-2 border-tops-blue rounded-full flex items-center justify-center relative overflow-hidden">
             <div className="absolute w-full h-full bg-tops-blue/20 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
             <span className="text-tops-blue font-bold text-xl relative z-10">T</span>
          </div>
          <div className="flex flex-col">
            <span className={`font-bold text-lg leading-tight tracking-wide transition-colors text-white`}>
              TOPS LIFE
            </span>
            <span className="text-[10px] text-tops-blue tracking-wider uppercase">Technology</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                location.pathname === link.path ? 'text-tops-blue' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-tops-blue transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
            </Link>
          ))}
        </nav>

        {/* Action & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* 语言切换按钮 */}
          <button 
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-xs text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Globe size={14} /> {language === 'zh' ? 'EN' : 'ZH'}
          </button>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-tops-dark/95 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}>
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMobileOpen(false)}>
                <X size={32} />
            </button>
            {navLinks.map((link, idx) => (
               <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)} // 点击菜单后关闭
                  className="text-2xl font-bold text-white flex items-center gap-3"
                  style={{ animation: isMobileOpen ? `fadeInUp 0.5s forwards ${idx * 0.1}s` : 'none', opacity: 0 }}
               >
                 {link.name} <ChevronRight size={20} className="text-tops-blue" />
               </Link>
            ))}
            {/* 移动端也添加切换语言按钮 */}
            <button 
              onClick={() => { toggleLanguage(); setIsMobileOpen(false); }}
              className="mt-8 flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-lg text-white hover:bg-white/10"
            >
              <Globe size={20} /> Switch to {language === 'zh' ? 'English' : '中文'}
            </button>
        </div>
      </div>
      
      <div className={`absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-tops-blue to-transparent w-full transition-opacity duration-300 ${isScrolled ? 'opacity-50' : 'opacity-0'}`} />
    </header>
  );
};

export default Navbar;
