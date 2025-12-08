import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 导航链接
  const navLinks = [
    { name: "首页", href: "#/" },
    { name: "关于我们", href: "#/about" },
    { name: "业务板块", href: "#/products" },
    { name: "新闻动态", href: "#/news" },
    { name: "联系我们", href: "#/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3" // 滚动后：白色背景，阴影
          : "bg-transparent py-5" // 顶部：透明背景
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* --- Logo 区域 --- */}
        <a href="#/" className="flex items-center gap-2 group cursor-pointer select-none">
          <img 
            src="/banner/logo(1).png" 
            alt="TOPS LIFE Logo" 
            // 🔴 关键修改：添加了 filter 类
            // brightness-0 invert: 这会让图片变白。
            // 我们只在 "没有滚动 (!scrolled)" 时应用这个效果。
            className={`
              h-8 md:h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105
              ${!scrolled ? "brightness-0 invert opacity-90" : ""} 
            `}
          />
        </a>

        {/* --- 桌面端菜单 --- */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-sky-500 ${
                scrolled ? "text-slate-700" : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}

          {/* 语言切换按钮 */}
          <button
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold transition-all hover:scale-105 ${
              scrolled
                ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200"
                : "border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            }`}
          >
            <Globe size={14} /> EN
          </button>
        </div>

        {/* --- 移动端菜单按钮 --- */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- 移动端下拉菜单 --- */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden border-t border-slate-100">
          {navLinks.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-slate-700 font-medium hover:text-sky-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
