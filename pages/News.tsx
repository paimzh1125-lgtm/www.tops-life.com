import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Calendar
} from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

type CategoryType = 'All' | 'Corporate' | 'Products' | 'Events';

export const ALL_NEWS = [
  { 
    id: 1,
    year: "2025", 
    dateLabel_zh: "01月", 
    dateLabel_en: "Jan",
    tag_zh: "可持续发展", 
    tag_en: "Sustainability",
    title_zh: "荣获法国 EcoVadis 可持续发展银牌认证", 
    title_en: "Achieved EcoVadis Sustainability Silver Rating",
    desc_zh: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
    desc_en: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our CSR journey.",
    category: "Corporate"
  },
  { 
    id: 2,
    year: "2024", 
    dateLabel_zh: "年度创新", 
    dateLabel_en: "Innovation",
    tag_zh: "产品研发", 
    tag_en: "R&D",
    title_zh: "成功开发三层易揭自封袋", 
    title_en: "Developed 3-Layer Easy-Peel Self-Sealing Bag",
    desc_zh: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
    desc_en: "Innovatively solved storage and contamination issues for cell culture flasks. This product significantly improves safety and convenience in sterile labs.",
    category: "Products"
  },
  { 
    id: 3,
    year: "2023", 
    dateLabel_zh: "年度基建", 
    dateLabel_en: "Expansion",
    tag_zh: "产能升级", 
    tag_en: "Upgrade",
    title_zh: "升级扩建 ISO Class 7 洁净室", 
    title_en: "Upgraded to ISO Class 7 Cleanroom",
    desc_zh: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
    desc_en: "Completed the expansion of our ISO Class 7 cleanroom. Introduced advanced air purification systems to ensure the strictest production environment.",
    category: "Corporate"
  },
  { 
    id: 4,
    year: "2019", 
    dateLabel_zh: "03月", 
    dateLabel_en: "Mar",
    tag_zh: "质量体系", 
    tag_en: "Quality",
    title_zh: "取得 ISO 13485 & 9001 双重认证", 
    title_en: "Obtained ISO 13485 & 9001 Certificates",
    desc_zh: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
    desc_en: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain.",
    category: "Corporate"
  }
];

gsap.registerPlugin(ScrollTrigger);

const News: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');

  // Content Config
  const content = {
    zh: {
      metaTitle: "新闻动态 | 永爱生命 - 行业资讯与企业新闻",
      metaDesc: "关注 Tops-Life 最新企业动态、展会信息及医疗行业技术趋势。了解我们在可持续发展与医疗制造领域的最新突破。",
      hero: {
        label: "新闻中心",
        title: "企业动态与行业洞察",
        desc: "探索 Tops-Life 的最新发展、技术突破以及我们在全球医疗健康领域的足迹。"
      },
      filters: { all: "全部", corporate: "企业动态", products: "产品发布", events: "展会活动" },
      readMore: "阅读全文"
    },
    en: {
      metaTitle: "News & Insights | Tops Life Technology",
      metaDesc: "Stay updated with Tops-Life's latest corporate news, event information, and insights into medical manufacturing and sustainability.",
      hero: {
        label: "News Center",
        title: "Latest Updates & Insights",
        desc: "Explore Tops-Life's latest developments, technological breakthroughs, and our footprint in global healthcare."
      },
      filters: { all: "All", corporate: "Corporate", products: "Products", events: "Events" },
      readMore: "Read More"
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  // --- SEO 配置 ---
  useEffect(() => {
    document.title = t.metaTitle;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t.metaDesc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('#')[0]);
  }, [language, t.metaTitle, t.metaDesc]);

  // Filter Logic
  const filteredNews = useMemo(() => {
    if (activeCategory === 'All') return ALL_NEWS;
    return ALL_NEWS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".gsap-fade-up", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: ".news-grid", start: "top 80%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 font-sans">
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
         <div className="container mx-auto px-6 text-center">
            <span className="text-sky-600 font-bold tracking-widest uppercase text-sm mb-4 block">{t.hero.label}</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t.hero.title}</h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">{t.hero.desc}</p>
         </div>
      </section>

      {/* Content */}
      <section className="py-16 container mx-auto px-6">
         {/* Filters */}
         <div className="flex flex-wrap justify-center gap-4 mb-12">
            {(['All', 'Corporate', 'Products', 'Events'] as CategoryType[]).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? t.filters.all : 
                 cat === 'Corporate' ? t.filters.corporate :
                 cat === 'Products' ? t.filters.products : t.filters.events}
              </button>
            ))}
         </div>

         {/* Grid */}
         <div className="news-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <article key={item.id} className="gsap-fade-up bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                 <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-bold uppercase rounded-full">
                      {language === 'zh' ? item.tag_zh : item.tag_en}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-sky-600 transition-colors">
                      <Calendar size={14} />
                      <span>{item.year} {language === 'zh' ? item.dateLabel_zh : item.dateLabel_en}</span>
                    </div>
                 </div>
                 <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                   {language === 'zh' ? item.title_zh : item.title_en}
                 </h3>
                 <p className="text-slate-500 mb-6 line-clamp-3 leading-relaxed">
                   {language === 'zh' ? item.desc_zh : item.desc_en}
                 </p>
                 <button className="flex items-center gap-2 text-sky-600 font-bold text-sm group-hover:gap-3 transition-all">
                   {t.readMore} <ArrowRight size={16} />
                 </button>
              </article>
            ))}
         </div>
      </section>
    </main>
  );
};

export default News;