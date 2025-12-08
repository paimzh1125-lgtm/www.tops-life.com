// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext'; // 确保路径正确

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  // 1. 获取全局语言状态
  const { language, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由变化时关闭手机菜单
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
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3' // 滚动后：白底
          : 'bg-transparent py-5' // 顶部：透明
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer select-none">
          <img 
            src="/banner/logo(1).png" 
            alt="TOPS LIFE Logo" 
            // 顶部时(!isScrolled) Logo变白，滚动后恢复原色
            className={`
              h-8 md:h-10 w-auto object-contain transition-all duration-300 group-hover:scale-105
              ${!isScrolled ? "brightness-0 invert opacity-90" : ""} 
            `}
          />
        </Link>

        {/* --- 桌面端导航 --- */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`text-sm font-medium transition-all duration-300 relative group ${
                // 滚动后文字变深灰，未滚动文字变白
                isScrolled 
                  ? 'text-slate-600 hover:text-sky-500' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
              {/* 下划线动画 */}
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-sky-500 transition-all duration-300 w-0 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
            </Link>
          ))}
        </nav>

        {/* --- 右侧按钮 & 手机端开关 --- */}
        <div className="flex items-center gap-4">
          {/* 语言切换按钮 */}
          <button 
            onClick={toggleLanguage}
            className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all border hover:scale-105 ${
              isScrolled
                ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <Globe size={14} /> {language === 'zh' ? 'EN' : '中文'}
          </button>
          
          {/* 汉堡菜单图标 */}
          <button 
            className={`md:hidden transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* --- 手机端全屏菜单 --- */}
        <div className={`fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}>
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMobileOpen(false)}>
                <X size={32} />
            </button>
            {navLinks.map((link, idx) => (
               <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-bold text-white flex items-center gap-3 hover:text-sky-400 transition-colors"
               >
                 {link.name} <ChevronRight size={20} className="text-sky-500" />
               </Link>
            ))}
             {/* 手机端语言切换 */}
             <button 
              onClick={() => { toggleLanguage(); setIsMobileOpen(false); }}
              className="mt-8 flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-lg text-white hover:bg-white/10"
            >
              <Globe size={20} /> {language === 'zh' ? 'Switch to English' : '切换到中文'}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
