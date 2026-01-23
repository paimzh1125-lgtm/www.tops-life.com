import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const language = i18n.language as 'zh' | 'en';
  
  const t = {
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
      brandB: "Taoai Material",
      news: "News",
      contact: "Contact Us",
      address: "No. 8 Fangjing Road, SIP, Suzhou, Jiangsu, China",
      copyright: "© 2025 Tops Life Science. All Rights Reserved.",
      desc: "Dedicated to providing high-standard flexible packaging, precision molding, and sustainable material solutions for the global medical device and life science sectors.",
      icp: "Suzhou ICP No. XXXXXXXX",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
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
  }[language];

  return (
    <footer className="bg-white text-slate-600 py-12 border-t border-slate-100 font-sans">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          {/* Brand & Logo */}
          <div className="col-span-1 md:col-span-1">
            {/* Dual Brand Area (双品牌展示区) */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-6 mb-6">
              {/* Brand A: Tops Life */}
              <div className="flex flex-col items-center md:items-start">
                <img src="/images/yongai.jpg" alt="Tops Life" className="h-16 mb-2 object-contain" />
                <h3 className="text-sm font-bold text-slate-900">{t.companyName}</h3>
              </div>

              {/* Divider (仅在桌面端显示) */}
              <div className="hidden md:block h-10 w-px bg-slate-200"></div>

              {/* Brand B: Taoai */}
              <div className="flex flex-col items-center md:items-start">
                <img src="/images/taoai.png" alt="Taoai Material" className="h-16 mb-2 object-contain" />
                <h3 className="text-sm font-bold text-slate-900">{t.brandB}</h3>
              </div>
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
              
              {/* WeChat with Hover QR Code */}
              <div className="relative group cursor-pointer text-slate-400 hover:text-sky-600 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="WeChat">
                  <path d="M8.696 14.93c-4.225 0-7.65-3.15-7.65-7.035 0-3.886 3.425-7.036 7.65-7.036 4.224 0 7.649 3.15 7.649 7.036 0 3.885-3.425 7.036-7.65 7.036zm10.917 2.07c0-.28-.023-.556-.066-.826.54-.83.86-1.805.86-2.847 0-3.09-2.76-5.595-6.165-5.595-3.404 0-6.164 2.505-6.164 5.595 0 3.09 2.76 5.596 6.164 5.596.72 0 1.41-.11 2.055-.31l2.355 1.245-.585-1.858z"/>
                </svg>
                
                {/* QR Code Popup (悬停显示) */}
                <div className="absolute bottom-full left-0 mb-3 hidden group-hover:block z-50">
                  <div className="bg-white p-2 rounded-lg shadow-xl">
                    <img src="/images/gzh.png" alt="WeChat QR" className="w-32 h-32 object-contain" />
                    {/* 小三角箭头 */}
                    <div className="absolute -bottom-1 left-2 w-3 h-3 bg-white rotate-45"></div>
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
                <span>{t.address}</span>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Mail size={18} className="shrink-0 text-sky-500" />
                <a href="mailto:Topslife@tops-life.com" className="hover:text-sky-600 transition-colors">Topslife@tops-life.com</a>
              </li>
              <li className="flex items-center gap-3 justify-center md:justify-start">
                <Phone size={18} className="shrink-0 text-sky-500" />
                <span>+86 0512-66185798</span>
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
