import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'zh' | 'en';
  const [showQR, setShowQR] = useState(false);
  
  const t = useMemo(() => ({
    zh: {
      about: "关于我们",
      products: "产品中心",
      companyName: "永爱生命",
      brandB: "淘爱材料",
      news: "新闻动态",
      contact: "联系我们",
      address: "江苏省苏州市苏州工业园区方泾路 8 号",
      copyright: "© 2025 永爱生命 版权所有",
      desc: "致力于为全球医疗器械及生命科学领域提供高标准的软包装、精密注塑及可持续材料解决方案。",
      icp: "苏ICP备17054569号-2",
      privacy: "隐私政策",
      terms: "使用条款",
      qrTitle: "关注永爱生命公众号",
      qrDesc: "扫一扫 获取更多产品资讯",
      productLinks: [
        { name: "医用软包装", link: `/products#packaging` },
        { name: "精密注塑", link: `/products#molding` },
        { name: "生物基材料", link: `/products#material` }
      ],
      aboutLinks: [
        { name: "公司简介", link: `/about` },
        { name: "新闻中心", link: `/news` },
        { name: "联系我们", link: `/contact` }
      ]
    },
    en: {
      about: "About Us",
      products: "Products",
      companyName: "Tops Life Science",
      brandB: "Tops Life Technology",
      news: "News",
      contact: "Contact Us",
      address: "No. 8 Fangjing Road, SIP, Suzhou, Jiangsu, China",
      copyright: "© 2025 Tops Life Science. All Rights Reserved.",
      desc: "Dedicated to providing high-standard flexible packaging, precision molding, and sustainable material solutions for the global medical device and life science sectors.",
      icp: "Suzhou ICP No.",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      qrTitle: "Follow Our WeChat",
      qrDesc: "Scan to get latest updates",
      productLinks: [
        { name: "Medical Packaging", link: `/products#packaging` },
        { name: "Injection Molding", link: `/products#molding` },
        { name: "Bio-Materials", link: `/products#material` }
      ],
      aboutLinks: [
        { name: "Company Profile", link: `/about` },
        { name: "News Center", link: `/news` },
        { name: "Contact Us", link: `/contact` }
      ]
    }
  })[language], [language]);

  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-100 font-sans" {...({ itemScope: true, itemType: "https://schema.org/WPFooter" } as any)}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Brand & Logo */}
          <div className="col-span-1 md:col-span-1">
            {/* Dual Brand Area (双品牌展示区) */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-6">
              {/* Brand A: Tops Life */}
              <Link to="/" className="flex flex-col items-center md:items-start group transition-opacity hover:opacity-80">
                <img src="/images/yongai.jpg" alt="Tops Life" className="h-16 mb-2 object-contain" />
                <h3 className="text-sm font-bold text-slate-900">{t.companyName}</h3>
              </Link>

              {/* Divider (仅在桌面端显示) */}
              <div className="hidden md:block h-10 w-px bg-slate-200"></div>

              {/* Brand B: Taoai */}
              <Link to="/" className="flex flex-col items-center md:items-start group transition-opacity hover:opacity-80">
                <img src="/images/taoai.png" alt="Taoai Material" className="h-16 mb-2 object-contain" />
                <h3 className="text-sm font-bold text-slate-900">{t.brandB}</h3>
              </Link>
            </div>
            
            <p className="text-sm leading-relaxed mb-6">{t.desc}</p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href="https://www.linkedin.com/company/tops-life" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-400 hover:text-sky-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              
              {/* WeChat with Hover/Click QR Code */}
              <div 
                className="relative group cursor-pointer text-slate-400 hover:text-sky-600 transition-colors"
                onMouseEnter={() => setShowQR(true)}
                onMouseLeave={() => setShowQR(false)}
                onClick={() => setShowQR(!showQR)}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="WeChat">
                  <path d="M8.696 14.93c-4.225 0-7.65-3.15-7.65-7.035 0-3.886 3.425-7.036 7.65-7.036 4.224 0 7.649 3.15 7.649 7.036 0 3.885-3.425 7.036-7.65 7.036zm10.917 2.07c0-.28-.023-.556-.066-.826.54-.83.86-1.805.86-2.847 0-3.09-2.76-5.595-6.165-5.595-3.404 0-6.164 2.505-6.164 5.595 0 3.09 2.76 5.596 6.164 5.596.72 0 1.41-.11 2.055-.31l2.355 1.245-.585-1.858z"/>
                </svg>
                
                {/* QR Code Popup (Optimized Size & Layout) */}
                <div 
                  className={`absolute bottom-full left-0 md:left-1/2 md:-translate-x-1/2 mb-4 z-50 transition-all duration-300 transform origin-bottom ${
                    showQR ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-64 md:w-72 flex flex-col items-center">
                    <button 
                      className="absolute top-3 right-3 text-slate-300 hover:text-slate-500 md:hidden"
                      onClick={() => setShowQR(false)}
                    >
                      <X size={18} />
                    </button>
                    
                    <h5 className="text-slate-900 font-bold mb-4 text-sm tracking-tight">{t.qrTitle}</h5>
                    
                    {/* QR Code Container with proper padding (Quiet Zone) */}
                    <div className="bg-white p-2 rounded-xl border border-slate-50 shadow-inner">
                      <img 
                        src="/images/gzh.png" 
                        alt="WeChat QR" 
                        className="w-48 h-48 md:w-52 md:h-52 object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    <p className="mt-4 text-[11px] text-slate-400 font-medium leading-relaxed uppercase tracking-wider">
                      {t.qrDesc}
                    </p>
                    
                    {/* Decorative Triangle Arrow */}
                    <div className="absolute -bottom-2 left-4 md:left-1/2 md:-translate-x-1/2 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links - Products */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">{t.products}</h4>
            <ul className="space-y-3 text-sm">
              {t.productLinks.map((item, index) => (
                <li key={index}><Link to={item.link} className="hover:text-sky-600 transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links - About */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">{t.about}</h4>
            <ul className="space-y-3 text-sm">
              {t.aboutLinks.map((item, index) => (
                <li key={index}><Link to={item.link} className="hover:text-sky-600 transition-colors">{item.name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">{t.contact}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin size={18} className="mt-0.5 shrink-0 text-sky-500" />
                <span {...({ itemProp: "address" } as any)}>{t.address}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={18} className="shrink-0 text-sky-500" />
                <a href="mailto:Topslife@tops-life.com" className="hover:text-sky-600 transition-colors" {...({ itemProp: "email" } as any)}>Topslife@tops-life.com</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={18} className="shrink-0 text-sky-500" />
                <a href="tel:+86051266185798" className="hover:text-sky-600 transition-colors font-mono" {...({ itemProp: "telephone" } as any)}>+86 0512-66185798</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            <p>{t.copyright}</p>
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="mt-1 block hover:text-sky-600 transition-colors">{t.icp}</a>
          </div>
          <div className="flex gap-6">
             <span className="hover:text-sky-600 transition-colors cursor-pointer">{t.privacy}</span>
             <span className="hover:text-sky-600 transition-colors cursor-pointer">{t.terms}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

