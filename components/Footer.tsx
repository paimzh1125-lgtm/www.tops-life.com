import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Facebook } from 'lucide-react'; // 引入 Linkedin 等图标

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-100 relative z-10 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
               {/* 这里的 Logo 最好用彩色的 */}
               <img src="/images/logo.png" alt="Tops Life" className="h-8" />
               <span className="text-xl font-bold text-slate-800">TOPS LIFE</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。
            </p>
            <div className="flex gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md duration-300">
                <Linkedin size={18} />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center hover:bg-[#07C160] hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-md duration-300">
                <Mail size={18} />
              </div>
            </div>
          </div>
          
          {/* Quick Links - 改为锚点跳转 */}
          <div>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">快速链接</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}} className="hover:text-sky-500 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">首页</a></li>
              <li><a href="#about" className="hover:text-sky-500 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">关于我们</a></li>
              <li><a href="#solutions" className="hover:text-sky-500 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">业务板块</a></li>
              <li><a href="#contact" className="hover:text-sky-500 transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">联系我们</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">联系方式</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="mt-0.5 text-sky-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-slate-900 transition-colors">江苏省苏州市苏州工业园区<br/>方泾路 8 号</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-sky-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-slate-900 transition-colors">+86 0512-66185798</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-sky-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:text-slate-900 transition-colors">pai.ma@tops-life.com</span>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">认证资质</h4>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-3 py-1.5 border border-sky-100 bg-sky-50 rounded text-sky-600">ISO 9001</span>
              <span className="px-3 py-1.5 border border-sky-100 bg-sky-50 rounded text-sky-600">ISO 13485</span>
              <span className="px-3 py-1.5 border border-sky-100 bg-sky-50 rounded text-sky-600">Class 100k Cleanroom</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2025 Suzhou Tops Life Technology Co., Ltd. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-sky-500 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-sky-500 transition-colors">条款与条件</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
