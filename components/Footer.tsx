import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from './LanguageContext'; // 引入我们刚才做好的“大脑”

const Footer: React.FC = () => {
  const { language } = useLanguage(); // 获取当前语言状态

  // 定义双语内容字典
  const content = {
    zh: {
      slogan: "致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。",
      headers: { links: "快速链接", contact: "联系方式", cert: "认证资质" },
      links: [
        { name: "首页", url: "/" },
        { name: "关于我们", url: "/about" },
        { name: "业务板块", url: "/products" },
        { name: "新闻动态", url: "/news" }
      ],
      address: "江苏省苏州市苏州工业园区方泾路 8 号",
      privacy: "隐私政策",
      terms: "条款与条件"
    },
    en: {
      slogan: "Committed to advancing medical safety, enhancing packaging performance, and developing sustainable biomaterial solutions.",
      headers: { links: "Quick Links", contact: "Contact Us", cert: "Certifications" },
      links: [
        { name: "Home", url: "/" },
        { name: "About Us", url: "/about" },
        { name: "Products", url: "/products" },
        { name: "News", url: "/news" }
      ],
      address: "No. 8 Fangjing Road, SIP, Suzhou, Jiangsu, China",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions"
    }
  };

  const t = content[language]; // 根据语言取出对应内容

  return (
    <footer className="bg-white text-slate-700 py-12 border-t border-slate-300 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Logo与标语 */}
          <div className="md:col-span-1">
            <img src="/banner/logo.png" alt="Tops Life" className="h-8" />
            <h3 className="text-tops-blue text-xl font-bold mb-4">TOPS LIFE</h3>
            <p className="text-sm leading-relaxed mb-4">{t.slogan}</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-tops-blue hover:text-white transition-colors cursor-pointer">In</div>
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-tops-blue hover:text-white transition-colors cursor-pointer">Wx</div>
            </div>
          </div>
          
          {/* 快速链接 */}
          <div>
            <h4 className="text-tops-dark font-semibold mb-4">{t.headers.links}</h4>
            <ul className="space-y-2 text-sm">
              {t.links.map((link, index) => (
                <li key={index}><a href={link.url} className="hover:text-tops-blue transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h4 className="text-tops-dark font-semibold mb-4">{t.headers.contact}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-tops-blue shrink-0" />
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-tops-blue shrink-0" />
                <span>+86 0512-66185798</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-tops-blue shrink-0" />
                <span>topslife@tops-life.com</span>
              </li>
            </ul>
          </div>

          {/* 资质 */}
          <div>
            <h4 className="text-tops-dark font-semibold mb-4">{t.headers.cert}</h4>
            <div className="flex gap-3 text-xs">
              <span className="px-3 py-1 border border-slate-300 rounded text-tops-blue font-medium">ISO 9001</span>
              <span className="px-3 py-1 border border-slate-300 rounded text-tops-blue font-medium">ISO 13485</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2025 Suzhou Tops Life Technology Co., Ltd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-tops-blue transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-tops-blue transition-colors">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
