// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from './LanguageContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  // 1. 判断是否为首页 (兼容 HashRouter 和 BrowserRouter)
  // 如果你的路由是 /#/about，location.pathname 通常是 /about
  const isHomePage = location.pathname === '/';

  // 2. 核心逻辑：定义何时显示为“透明深色背景模式”
  // 只有在【首页】且【未滚动】时，才透出背景 + 白字
  // 其他所有页面（或滚动后），都强制白底 + 深字
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
        isTransparentMode
          ? 'bg-transparent py-6' // 首页顶部：透明 + 高度大
          : 'bg-white/95 backdrop-blur-md shadow-lg py-4' // 其他页面或滚动后：白底 + 紧凑 + 阴影
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        
        {/* --- Logo --- */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer select-none">
          <img 
            src="/banner/logo(1).png" 
            alt="TOPS LIFE Logo" 
            className={`
              h-9 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105
              ${isTransparentMode ? "brightness-0 invert opacity-100" : ""} 
            `}
            // 解释：isTransparentMode 为 true 时（首页顶部），Logo 变白；否则显示原色
          />
        </Link>

        {/* --- 桌面端导航 --- */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`
                text-base md:text-[17px] font-bold tracking-wide transition-all duration-300 relative group px-1
                ${
                  isTransparentMode
                    ? 'text-white hover:text-sky-200'      // 首页顶部：白字
                    : 'text-slate-800 hover:text-sky-600'  // 其他情况：深黑字 (修复了在白底看不清的问题)
                }
                ${location.pathname === link.path ? (isTransparentMode ? 'text-sky-300' : 'text-sky-600') : ''}
              `}
            >
              {link.name}
              {/* 下划线动画 */}
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

        {/* --- 右侧按钮 & 手机端开关 --- */}
        <div className="flex items-center gap-5">
          {/* 语言切换按钮 */}
          <button 
            onClick={toggleLanguage}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all border hover:scale-105 shadow-sm ${
              isTransparentMode
                ? "border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30" // 首页顶部样式
                : "border-slate-200 bg-white text-slate-800 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300" // 通用样式
            }`}
          >
            <Globe size={16} />
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          
          {/* 汉堡菜单图标 */}
          <button 
            className={`md:hidden transition-colors hover:scale-110 ${isTransparentMode ? 'text-white' : 'text-slate-900'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {/* --- 手机端全屏菜单 (保持不变) --- */}
        <div className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-10 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}>
            <button className="absolute top-8 right-8 text-white/80 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                <X size={40} />
            </button>
            {navLinks.map((link) => (
               <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-3xl font-bold text-white flex items-center gap-4 hover:text-sky-400 transition-colors tracking-wider"
               >
                 {link.name} <ChevronRight size={24} className="text-sky-500" />
               </Link>
            ))}
             <button 
              onClick={() => { toggleLanguage(); setIsMobileOpen(false); }}
              className="mt-10 flex items-center gap-3 px-8 py-3 border-2 border-white/20 rounded-full text-xl font-medium text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <Globe size={24} /> {language === 'zh' ? 'Switch to English' : '切换到中文'}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
