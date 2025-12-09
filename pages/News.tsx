// src/pages/News.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';

// --- SVG Icons (无依赖) ---
const Icons = {
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Calendar: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Tag: () => <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  Mail: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
};

const News: React.FC = () => {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  // --- 数据源 (中英) ---
  const content = {
    zh: {
      hero: {
        title: "新闻中心",
        subtitle: "企业动态与行业洞察",
        desc: "追踪 TOPS LIFE 的最新发展，了解我们在可持续发展、技术创新及全球市场拓展方面的每一步。"
      },
      categories: ["全部动态", "公司新闻", "产品发布", "展会活动"],
      // 新闻列表
      items: [
        { 
          id: 1,
          date: "2025-01-15",
          year: "2025", month: "01", day: "15",
          category: "企业荣誉",
          title: "荣获 EcoVadis 可持续发展银牌认证",
          desc: "托普斯在环境、劳工与人权、商业道德及可持续采购方面的卓越表现获得国际权威机构认可，标志着公司 ESG 战略取得重要里程碑。",
          isFeatured: true, // 标记为头条
          img: "/banner/outsligth.jpg" // 假设有一张新闻配图，复用之前的路径或新闻图
        },
        { 
          id: 2,
          date: "2023-05-20",
          year: "2023", month: "05", day: "20",
          category: "战略扩张",
          title: "香港淘爱成立，全面加速全球化布局",
          desc: "为更好地服务海外客户，建立全球供应链网络，托普斯正式在香港设立分公司，作为国际业务的核心枢纽。",
          isFeatured: false
        },
        { 
          id: 3,
          date: "2021-05-10",
          year: "2021", month: "05", day: "10",
          category: "业务拓展",
          title: "成立新材料研发中心，进军环保油墨领域",
          desc: "正式拓展环保水性油墨及功能性纸品包装业务，致力于通过技术创新减少包装行业的碳足迹。",
          isFeatured: false
        },
        { 
          id: 4,
          date: "2019-10-08",
          year: "2019", month: "10", day: "08",
          category: "产能升级",
          title: "全新 10 万级洁净车间正式投入运营",
          desc: "新车间配备全电动注塑机与自动化组装线，大幅提升了医用精密部件的生产能力，以满足日益增长的全球订单需求。",
          isFeatured: false
        },
        { 
          id: 5,
          date: "2019-03-15",
          year: "2019", month: "03", day: "15",
          category: "体系认证",
          title: "取得 ISO 13485 & ISO 9001 双体系证书",
          desc: "质量管理体系获得国际标准认证，为医疗产品的安全性与合规性提供了坚实的保障。",
          isFeatured: false
        }
      ],
      contact: {
        title: "媒体垂询",
        desc: "如需获取媒体资料包或进行采访预约，请联系品牌部。",
        email: "pr@topslife.com"
      }
    },
    en: {
      hero: {
        title: "Newsroom",
        subtitle: "Company Updates & Insights",
        desc: "Stay updated with TOPS LIFE's latest developments in sustainability, technological innovation, and global expansion."
      },
      categories: ["All", "Corporate", "Products", "Events"],
      items: [
        { 
          id: 1,
          date: "Jan 15, 2025",
          year: "2025", month: "Jan", day: "15",
          category: "Awards",
          title: "Awarded EcoVadis Silver Medal for Sustainability",
          desc: "Recognized for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A major milestone in our ESG strategy.",
          isFeatured: true,
          img: "/banner/outsligth.jpg"
        },
        { 
          id: 2,
          date: "May 20, 2023",
          year: "2023", month: "May", day: "20",
          category: "Expansion",
          title: "TOPS HK Established to Accelerate Global Reach",
          desc: "To better serve overseas clients and build a global supply chain, TOPS LIFE officially established a Hong Kong branch as a hub for international business.",
          isFeatured: false
        },
        { 
          id: 3,
          date: "May 10, 2021",
          year: "2021", month: "May", day: "10",
          category: "New Business",
          title: "New Materials R&D Center Established",
          desc: "Officially expanded into eco-friendly water-based inks and functional paper packaging, aiming to reduce the carbon footprint through innovation.",
          isFeatured: false
        },
        { 
          id: 4,
          date: "Oct 08, 2019",
          year: "2019", month: "Oct", day: "08",
          category: "Capacity",
          title: "New Class 100,000 Cleanroom Operational",
          desc: "Equipped with all-electric injection molding machines and automated assembly lines, significantly boosting capacity for medical precision components.",
          isFeatured: false
        },
        { 
          id: 5,
          date: "Mar 15, 2019",
          year: "2019", month: "Mar", day: "15",
          category: "Certification",
          title: "ISO 13485 & ISO 9001 Certified",
          desc: "Achieved international quality management system certifications, ensuring the safety and compliance of our medical products.",
          isFeatured: false
        }
      ],
      contact: {
        title: "Media Contact",
        desc: "For press kits or interview requests, please contact our Brand Department.",
        email: "pr@topslife.com"
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;
  const featuredNews = t.items.find(i => i.isFeatured) || t.items[0];
  const recentNews = t.items.filter(i => i.id !== featuredNews.id);

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans">
      
      {/* 1. Header Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="container mx-auto px-6 relative z-10 text-center">
            <span className="text-sky-600 font-bold tracking-[0.2em] uppercase mb-4 block animate-fade-in">
                {t.hero.subtitle}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                {t.hero.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t.hero.desc}
            </p>
        </div>
        {/* 装饰背景 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-100 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl"></div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        
        {/* 2. Featured News (头条新闻) */}
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-1 bg-sky-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">{language === 'zh' ? '最新发布' : 'Featured Story'}</h2>
            </div>

            <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 grid md:grid-cols-2">
                <div className="relative overflow-hidden h-64 md:h-auto">
                    <img 
                        src={featuredNews.img} 
                        alt={featuredNews.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070'; }}
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold uppercase rounded-full tracking-wider">
                            {featuredNews.category}
                        </span>
                        <span className="text-slate-400 text-sm flex items-center gap-1">
                            <Icons.Calendar /> {featuredNews.date}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">
                        {featuredNews.title}
                    </h3>
                    <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3">
                        {featuredNews.desc}
                    </p>
                    <Link to="/contact" className="inline-flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
                        {language === 'zh' ? '阅读全文' : 'Read Full Story'} <Icons.ArrowRight />
                    </Link>
                </div>
            </div>
        </div>

        {/* 3. Recent News List (近期动态列表) */}
        <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column: News List */}
            <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-1 bg-slate-300 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-slate-900">{language === 'zh' ? '往期回顾' : 'Recent Updates'}</h2>
                </div>

                <div className="space-y-6">
                    {recentNews.map((item, i) => (
                        <div 
                          key={i} 
                          className="group bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
                        >
                           {/* Date Badge */}
                           <div className="flex-shrink-0 flex md:flex-col items-center justify-center min-w-[70px] h-full gap-2 md:gap-0 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
                              <span className="text-3xl font-bold text-slate-300 group-hover:text-sky-500 transition-colors leading-none">
                                {item.year}
                              </span>
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded mt-1">
                                {item.month}
                              </span>
                           </div>
                           
                           {/* Content */}
                           <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                  <span className="text-sky-600 font-semibold text-xs uppercase flex items-center gap-1">
                                    <Icons.Tag /> {item.category}
                                  </span>
                              </div>
                              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                                {item.desc}
                              </p>
                              {/* Read More Link (Pseudo) */}
                              <div className="text-sky-600 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300 flex items-center gap-1 cursor-pointer">
                                 {language === 'zh' ? '了解更多' : 'Read more'} <Icons.ArrowRight />
                              </div>
                           </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Sidebar (Press Contact & Filter) */}
            <div className="lg:col-span-1 space-y-8">
                
                {/* Media Contact Card */}
                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Icons.Mail /> {t.contact.title}
                        </h3>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            {t.contact.desc}
                        </p>
                        <a href={`mailto:${t.contact.email}`} className="inline-block w-full text-center py-3 bg-white/10 hover:bg-white text-white hover:text-slate-900 rounded-lg font-bold transition-all border border-white/20">
                            {t.contact.email}
                        </a>
                    </div>
                    {/* Decor */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl"></div>
                </div>

                {/* Categories (Visual Only) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                        {language === 'zh' ? '分类浏览' : 'Filter by Category'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {t.categories.map((cat, idx) => (
                            <button key={idx} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${idx === 0 ? 'bg-sky-50 text-sky-700' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

        </div>
      </div>
    </div>
  );
};

export default News;
