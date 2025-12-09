import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Menu, X, Globe, ChevronRight } from 'lucide-react'; // 使用统一的图标库

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();

  // 首页透明模式判断
  const isTransparentMode = !isScrolled;

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动处理函数
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // 阻止默认跳转
    setIsMobileOpen(false); // 关闭手机菜单
    
    // 如果是回到顶部
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = language === 'zh' ? [
    { name: '首页', id: 'top' },
    { name: '关于我们', id: 'about' },
    { name: '业务板块', id: 'solutions' },
    { name: '研发实力', id: 'tech' }, // 新增
    { name: '联系我们', id: 'contact' },
  ] : [
    { name: 'Home', id: 'top' },
    { name: 'About', id: 'about' },
    { name: 'Solutions', id: 'solutions' },
    { name: 'R&D', id: 'tech' }, // 新增
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isTransparentMode
          ? 'bg-transparent py-6' 
          : 'bg-white/90 backdrop-blur-md shadow-sm py-4 border-b border-slate-100/50'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" onClick={(e) => scrollToSection(e, 'top')} className="flex items-center gap-2 group cursor-pointer z-50">
          {/* 请确保 public/images/logo.png 存在，或者改成 logo-white.png 用于深色背景 */}
          <img 
            src="public/banner/logo.png" 
            alt="TOPS LIFE Logo" 
            className={`
              h-10 md:h-12 w-auto object-contain transition-all duration-300
              ${isTransparentMode ? "brightness-0 invert opacity-90" : ""} 
            `}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`
                text-[15px] font-medium tracking-wide transition-all duration-300 relative group px-2 py-1
                ${isTransparentMode ? 'text-slate-100 hover:text-white' : 'text-slate-600 hover:text-sky-600'}
              `}
            >
              {link.name}
              {/* 下划线动画 */}
              <span 
                className={`
                  absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 w-0 group-hover:w-full 
                  ${isTransparentMode ? 'bg-white' : 'bg-sky-500'}
                `} 
              />
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 z-50">
          <button 
            onClick={toggleLanguage}
            className={`hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all border hover:scale-105 active:scale-95 ${
              isTransparentMode
                ? "border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20" 
                : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white hover:border-sky-200 hover:text-sky-600 hover:shadow-md"
            }`}
          >
            <Globe size={16} />
            {language === 'zh' ? 'EN' : '中文'}
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden p-2 rounded-full transition-colors ${isTransparentMode ? 'text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100'}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40 transition-transform duration-500 flex flex-col justify-center items-center gap-8 ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {navLinks.map((link) => (
               <a 
                  key={link.id} 
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  className="text-2xl font-bold text-white flex items-center gap-3 hover:text-sky-400 transition-colors tracking-wider"
               >
                 {link.name} <ChevronRight size={20} className="text-sky-500 opacity-0 group-hover:opacity-100" />
               </a>
            ))}
             <button 
              onClick={() => { toggleLanguage(); setIsMobileOpen(false); }}
              className="mt-8 flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-lg font-medium text-white hover:bg-white/10"
            >
              <Globe size={20} /> {language === 'zh' ? 'English' : '切换中文'}
            </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
