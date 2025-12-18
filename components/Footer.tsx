import React from 'react';
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react'; // 引入图标
import { useLanguage } from './LanguageContext';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  // 页脚内容字典
  const t = {
    zh: {
      desc: "致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。",
      quickLinks: "快速链接",
      contact: "联系方式",
      cert: "认证资质",
      address: "江苏省苏州市苏州工业园区方泾路 8 号",
      rights: "© 2025 苏州永爱生命科技有限公司 保留所有权利。",
      privacy: "隐私政策",
      terms: "条款与条件",
      links: [
        { name: "首页", url: "/" },
        { name: "关于我们", url: "/about" },
        { name: "业务板块", url: "/products" },
        { name: "新闻动态", url: "/news" }
      ]
    },
    en: {
      desc: "Committed to advancing medical safety, enhancing packaging performance, and developing sustainable biomaterial solutions.",
      quickLinks: "Quick Links",
      contact: "Contact Us",
      cert: "Certifications",
      address: "No. 8 Fangjing Road, SIP, Suzhou, Jiangsu, China",
      rights: "© 2025 Suzhou Tops Life Technology Co., Ltd. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" },
        { name: "Products", url: "/products" },
        { name: "News", url: "/news" }
      ]
    }
  }[language];

  return (
    <footer className="bg-white text-slate-600 py-16 border-t border-slate-200 relative z-10 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <img src="/banner/logo.png" alt="Tops Life" className="h-8" />
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              {t.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-tops-blue hover:text-white transition-all duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-tops-blue hover:text-white transition-all duration-300">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Links */}
          <div>
            <h4 className="text-tops-dark font-bold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-3 text-sm">
              {t.links.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="hover:text-tops-blue transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-tops-blue transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-tops-dark font-bold mb-6">{t.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <MapPin size={18} className="mt-0.5 text-tops-blue/80 group-hover:text-tops-blue transition-colors shrink-0" />
                <span className="group-hover:text-slate-900 transition-colors">{t.address}</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone size={18} className="text-tops-blue/80 group-hover:text-tops-blue transition-colors shrink-0" />
                <span className="group-hover:text-slate-900 transition-colors">+86 0512-66185798</span>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail size={18} className="text-tops-blue/80 group-hover:text-tops-blue transition-colors shrink-0" />
                <span className="group-hover:text-slate-900 transition-colors">topslife@tops-life.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Certs */}
          <div>
            <h4 className="text-tops-dark font-bold mb-6">{t.cert}</h4>
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold text-tops-blue bg-slate-50">ISO 9001</div>
              <div className="px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold text-tops-blue bg-slate-50">ISO 13485</div>
              <div className="px-3 py-1.5 border border-slate-200 rounded text-xs font-semibold text-tops-blue bg-slate-50">Class 10k</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>{t.rights}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-tops-blue transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-tops-blue transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
