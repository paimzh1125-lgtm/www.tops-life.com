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

  useEffect(() => {
    const handleScroll = () => {
      //稍微调高滚动触发阈值，避免误触
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
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-4' // 滚动后：增加阴影深度，padding稍微改大一点点让视觉更舒展
          : 'bg-transparent py-6' // 顶部：增加高度，显得更大气
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
              ${!isScrolled ? "brightness-0 invert opacity-100" : ""} 
            `}
          />
        </Link>

        {/* --- 桌面端导航 (重点优化部分) --- */}
        <nav className="hidden md:flex items-center gap-10"> {/* gap-8 -> gap-10 增加间距 */}
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={`
                text-base md:text-[17px] font-bold tracking-wide transition-all duration-300 relative group px-1
                ${
                  isScrolled 
                    ? 'text-slate-800 hover:text-sky-600'  // 颜色更深(slate-800)，对比度更高
                    : 'text-white hover:text-sky-200'      // 顶部纯白
                }
                ${location.pathname === link.path ? (isScrolled ? 'text-sky-600' : 'text-sky-300') : ''}
              `}
            >
              {link.name}
              {/* 下划线动画：加粗了一点点 h-[3px] */}
              <span 
                className={`
                  absolute -bottom-2 left-0 h-[3px] rounded-full transition-all duration-300 w-0 group-hover:w-full 
                  ${isScrolled ? 'bg-sky-500' : 'bg-white'}
                  ${location.pathname === link.path ? 'w-full' : ''}
                `} 
              />
            </Link>
          ))}
        </nav>

        {/* --- 右侧按钮 & 手机端开关 --- */}
        <div className="flex items-center gap-5">
          {/* 语言切换按钮：字体调大 text-xs -> text-sm */}
          <button 
            onClick={toggleLanguage}
            className={`hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all border hover:scale-105 shadow-sm ${
              isScrolled
                ? "border-slate-200 bg-white text-slate-800 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300"
                : "border-white/40 bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
            }`}
          >
            <Globe size={16} /> {/* 图标微调大 */}
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          
          {/* 汉堡菜单图标 */}
          <button 
            className={`md:hidden transition-colors hover:scale-110 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={32} /> : <Menu size={32} />} {/* 图标调大 28->32 */}
          </button>
        </div>

        {/* --- 手机端全屏菜单 --- */}
        <div className={`fixed inset-0 bg-slate-900/98 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-10 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ top: 0, left: 0, height: '100vh', width: '100vw' }}>
            <button className="absolute top-8 right-8 text-white/80 hover:text-white" onClick={() => setIsMobileOpen(false)}>
                <X size={40} />
            </button>
            {navLinks.map((link) => (
               <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  // 手机端字体加大 text-2xl -> text-3xl
                  className="text-3xl font-bold text-white flex items-center gap-4 hover:text-sky-400 transition-colors tracking-wider"
               >
                 {link.name} <ChevronRight size={24} className="text-sky-500" />
               </Link>
            ))}
             {/* 手机端语言切换 */}
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
