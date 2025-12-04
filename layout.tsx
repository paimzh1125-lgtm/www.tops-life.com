// app/layout.tsx
import './globals.css';
import { Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '苏州永爱生物科技有限公司',
  description: '医用高性能软包装 | 精密注塑 | 可持续生物材料',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {/* 透明悬浮导航栏 */}
        <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
          <div className="bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md pointer-events-auto">
            <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
              {/* Logo */}
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  T
                </div>
                <span className="text-white text-2xl font-bold tracking-wider group-hover:text-cyan-400 transition">
                  TOPS LIFE
                </span>
              </a>

              {/* 导航菜单 */}
              <nav className="hidden md:flex items-center gap-10">
                <a href="/" className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full relative">
                  首页
                </a>
                <a href="/about" className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full relative">
                  关于我们
                </a>
                <a href="/products" className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full relative">
                  业务板块
                </a>
                <a href="/news" className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full relative">
                  新闻动态
                </a>
                <a href="/contact" className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full relative">
                  联系我们
                </a>
              </nav>

              {/* 语言切换按钮 */}
              <button
                onClick={() => document.dispatchEvent(new CustomEvent('toggle-lang'))}
                className="bg-white/20 backdrop-blur-lg text-white px-5 py-2.5 rounded-full hover:bg-white/30 transition flex items-center gap-2 font-medium"
              >
                <Globe size={18} />
                EN
              </button>
            </div>
          </div>
        </header>

        {/* 页面内容 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
