// app/layout.tsx   ← 完整最终版（已包含完美移动端响应式）
import './globals.css';
import { Globe, Menu, X } from 'lucide-react';
import type { Metadata } from 'next';
import { useState, useEffect } from 'react';

export const metadata: Metadata = {
  title: '苏州永爱生物科技有限公司',
  description: '医用高性能软包装 | 精密注塑 | 可持续生物材料',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="zh">
      <body className="antialiased">
        {/* 透明悬浮导航栏 */}
        <header className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md">
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

              {/* 桌面端菜单 */}
              <nav className="hidden lg:flex items-center gap-10">
                {['首页', '关于我们', '业务板块', '新闻动态', '联系我们'].map((item) => (
                  <a
                    key={item}
                    href={item === '首页' ? '/' : `/${item.replace('首页', '').toLowerCase().replace(/[^\w]/g, '-')}`}
                    className="text-white/90 text-lg font-medium hover:text-[#40C4FF] transition relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-[#40C4FF] after:transition-all hover:after:w-full"
                  >
                    {item}
                  </a>
                ))}
              </nav>

              {/* 语言切换 + 移动端汉堡菜单 */}
              <div className="flex items-center gap-4">
                {/* 语言切换（手机上也保留） */}
                <button
                  onClick={() => document.dispatchEvent(new CustomEvent('toggle-lang'))}
                  className="bg-white/20 backdrop-blur-lg text-white px-5 py-2.5 rounded-full hover:bg-white/30 transition flex items-center gap-2 font-medium text-sm"
                >
                  <Globe size={18} />
                  EN
                </button>

                {/* 移动端汉堡菜单按钮 */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden text-white p-2"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>

            {/* 移动端下拉菜单 */}
            <div className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <nav className="flex flex-col py-6 px-8 space-y-6">
                {['首页', '关于我们', '业务板块', '新闻动态', '联系我们'].map((item) => (
                  <a
                    key={item}
                    href={item === '首页' ? '/' : `/${item.replace('首页', '').toLowerCase().replace(/[^\w]/g, '-')}`}
                    className="text-white text-xl font-medium hover:text-[#40C4FF] transition text-left"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
