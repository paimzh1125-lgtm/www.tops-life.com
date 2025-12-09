import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-700 py-12 border-t border-slate-300 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-1">
            <h3 className="text-tops-blue text-xl font-bold mb-4">TOPS LIFE</h3>
            <p className="text-sm leading-relaxed mb-4">
              致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。
            </p>
            <div className="flex gap-4">
              {/* 社交媒体图标 */}
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-tops-blue hover:text-white transition-colors cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-tops-blue hover:text-white transition-colors cursor-pointer">Wx</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-tops-dark font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#/" className="hover:text-tops-blue transition-colors">首页</a></li>
              <li><a href="#/about" className="hover:text-tops-blue transition-colors">关于我们</a></li>
              <li><a href="#/products" className="hover:text-tops-blue transition-colors">业务板块</a></li>
              <li><a href="#/news" className="hover:text-tops-blue transition-colors">新闻动态</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-tops-dark font-semibold mb-4">联系方式</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-tops-blue shrink-0" />
                <span>江苏省苏州市苏州工业园区<br/>方泾路 8 号</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-tops-blue shrink-0" />
                <span>+86 0512-66185798</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-tops-blue shrink-0" />
                <span>Topslife@tops-life.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-tops-dark font-semibold mb-4">认证资质</h4>
            <div className="flex gap-3 text-xs">
              <span className="px-3 py-1 border border-slate-300 rounded text-tops-blue">ISO 9001</span>
              <span className="px-3 py-1 border border-slate-300 rounded text-tops-blue">ISO 13485</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2025 Suzhou Tops Life Technology Co., Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#/privacy-policy" className="hover:text-tops-blue transition-colors">隐私政策</a>
            <a href="#/terms-and-conditions" className="hover:text-tops-blue transition-colors">条款与条件</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
