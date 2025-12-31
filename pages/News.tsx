import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Award, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  Newspaper,
  Calendar
} from 'lucide-react';
import { ALL_NEWS, CategoryType } from '../data/news';

gsap.registerPlugin(ScrollTrigger);

// --- 类型定义 ---

interface ResourceItem {
  title: string;
  type: string;
  size: string;
  icon: JSX.Element;
  link?: string; // 预留下载链接字段
}

const News: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // --- 新增：筛选状态管理 ---
  const [activeCategory, setActiveCategory] = useState<CategoryType>('All');

  // --- 1. 动画逻辑 (增加对 activeCategory 的监听) ---
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 当筛选变化时，短暂延迟后刷新 ScrollTrigger，确保滚动位置准确
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      // 列表项入场动画
      const items = gsap.utils.toArray<HTMLElement>(".news-row");
      
      // 先重置状态，防止筛选切换时样式残留
      gsap.set(items, { clearProps: "all" });

      gsap.fromTo(items, 
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { 
            trigger: ".news-list-container", 
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // 资源卡片动画
      gsap.from(".resource-card", {
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: "#resources-section", start: "top 85%" }
      });

    }, containerRef);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [language, activeCategory]); // 依赖项加入 activeCategory

  // --- 2. 数据内容 (已为每条新闻添加 category) ---
  const content = useMemo(() => ({
    zh: {
      metaTitle: "新闻动态 | 永爱生命 - 行业资讯与企业新闻",
      metaDesc: "关注 Tops-Life 最新企业动态、展会信息及医疗行业技术趋势。了解我们在可持续发展与医疗制造领域的最新突破。",
      hero: {
        label: "新闻中心",
        title: "企业动态与行业洞察",
        subtitle: "关注 TOPS LIFE 的最新发展，了解我们在医疗制造领域的创新突破。",
        stats: [
          { value: "15+", label: "年行业经验" },
          { value: "50+", label: "技术专利" },
          { value: "Global", label: "服务全球客户" },
        ]
      },
      // === 在这里维护资源下载 ===
      resources: {
        title: "媒体资源中心",
        subtitle: "获取官方资料、品牌素材及企业宣传册",
        items: [
          { title: "2025 企业宣传册", type: "PDF Document", size: "4.2 MB", icon: <FileText className="w-6 h-6" /> },
          { title: "ISO 13485 认证证书", type: "PDF Document", size: "1.8 MB", icon: <Award className="w-6 h-6" /> },
          { title: "TOPS LIFE 品牌标志", type: "PNG / SVG Kit", size: "5.5 MB", icon: <ImageIcon className="w-6 h-6" /> },
        ] as ResourceItem[]
      },
      newsletter: {
        title: "订阅我们的最新动态",
        desc: "输入您的邮箱，第一时间获取新材料技术突破与行业洞察。",
        placeholder: "请输入您的电子邮箱...",
        btn: "订阅"
      },
      filters: {
        all: "全部",
        corporate: "企业动态",
        products: "产品发布",
        events: "展会活动"
      }
    },
    en: {
      metaTitle: "News & Insights | Tops Life Technology",
      metaDesc: "Stay updated with Tops-Life's latest corporate news, event information, and insights into medical manufacturing and sustainability.",
      hero: {
        label: "News Center",
        title: "Latest Updates & Insights",
        subtitle: "Follow the latest developments at TOPS LIFE and discover our innovations in medical manufacturing.",
        stats: [
          { value: "15+", label: "Years Experience" },
          { value: "50+", label: "Patents" },
          { value: "Global", label: "Service Network" },
        ]
      },
      resources: {
        title: "Media Resources",
        subtitle: "Access official brochures, brand assets, and certificates.",
        items: [
          { title: "2025 Corporate Brochure", type: "PDF Document", size: "4.2 MB", icon: <FileText className="w-6 h-6" /> },
          { title: "ISO 13485 Certificate", type: "PDF Document", size: "1.8 MB", icon: <Award className="w-6 h-6" /> },
          { title: "Brand Logo Kit", type: "PNG / SVG Kit", size: "5.5 MB", icon: <ImageIcon className="w-6 h-6" /> },
        ] as ResourceItem[]
      },
      newsletter: {
        title: "Subscribe to Our Newsletter",
        desc: "Get the latest updates on material innovation and industry insights directly to your inbox.",
        placeholder: "Enter your email address...",
        btn: "Subscribe"
      },
      filters: {
        all: "All",
        corporate: "Corporate",
        products: "Products",
        events: "Events"
      }
    }
  }), []);

  const t = language === 'zh' ? content.zh : content.en;

  // --- 3. 筛选逻辑 ---
  // 将原始数据转换为当前语言的显示格式
  const displayList = useMemo(() => {
    return ALL_NEWS.map(item => ({
      ...item,
      date: language === 'zh' ? item.dateLabel_zh : item.dateLabel_en,
      tag: language === 'zh' ? item.tag_zh : item.tag_en,
      title: language === 'zh' ? item.title_zh : item.title_en,
      desc: language === 'zh' ? item.desc_zh : item.desc_en,
    }));
  }, [language]);

  const filteredList = useMemo(() => {
    if (activeCategory === 'All') return displayList;
    return displayList.filter(item => item.category === activeCategory);
  }, [activeCategory, displayList]);

  // 筛选按钮配置
  const filterTabs = [
    { key: 'All', label: t.filters.all },
    { key: 'Corporate', label: t.filters.corporate },
    { key: 'Products', label: t.filters.products },
    { key: 'Events', label: t.filters.events },
  ];

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

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="max-w-2xl">
                 <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-wider mb-6">
                    <Calendar className="w-3 h-3" /> {t.hero.label}
                 </span>
                 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                    {t.hero.title}
                 </h1>
                 <p className="text-lg text-slate-500 leading-relaxed">
                    {t.hero.subtitle}
                 </p>
              </div>
              
              <div className="flex gap-8 md:gap-12 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-12">
                 {t.hero.stats.map((stat, idx) => (
                    <div key={idx}>
                       <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                       <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* 2. Timeline News List */}
      <section className="py-20 relative bg-slate-50/50 min-h-[600px]">
        <div className="container mx-auto px-6 max-w-4xl news-list-container">
          
          {/* 顶部工具栏 (筛选功能已实现) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 border-b border-slate-200 pb-0 gap-4">
             <h2 className="text-xl font-bold text-slate-800 pb-4">Timeline</h2>
             
             {/* 筛选按钮组 */}
             <div className="flex gap-6 text-sm font-medium text-slate-500 overflow-x-auto w-full sm:w-auto scrollbar-hide">
                {filterTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key as CategoryType)}
                    className={`relative pb-4 transition-colors whitespace-nowrap
                      ${activeCategory === tab.key 
                        ? 'text-sky-600 font-bold' 
                        : 'hover:text-sky-600'
                      }`}
                  >
                    {tab.label}
                    {/* 选中时的下划线动画 */}
                    {activeCategory === tab.key && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-600 rounded-t-full -mb-[1px]"></span>
                    )}
                  </button>
                ))}
             </div>
          </div>

          <div className="space-y-0 relative">
            {/* 贯穿线 */}
            <div className="absolute left-[88px] md:left-[104px] top-2 bottom-0 w-px bg-slate-200 z-0"></div>

            {/* 当没有新闻时的空状态提示 */}
            {filteredList.length === 0 && (
              <div className="py-12 text-center text-slate-400">
                <p>暂无该分类下的新闻动态</p>
              </div>
            )}

            {filteredList.map((item, i) => (
              <div key={i} className="news-row flex gap-6 md:gap-10 group relative z-10 pb-12 last:pb-0">
                  
                  {/* 左侧：时间 */}
                  <div className="w-16 md:w-20 flex-shrink-0 text-right pt-1">
                      <span className={`block text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${item.isHighlight ? 'text-sky-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                        {item.year}
                      </span>
                      <span className="block text-xs font-bold text-slate-400 uppercase mt-1">
                        {item.date}
                      </span>
                  </div>

                  {/* 中间：轴点 */}
                  <div className="relative flex flex-col items-center flex-shrink-0 w-4">
                      <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm z-10 transition-all duration-300 mt-2.5
                          ${item.isHighlight ? 'bg-sky-500 ring-2 ring-sky-100 scale-110' : 'bg-slate-300 group-hover:bg-sky-400'}`}>
                      </div>
                  </div>

                  {/* 右侧：内容卡片 */}
                  <div className="flex-1 min-w-0">
                      <div className={`p-6 rounded-xl border bg-white transition-all duration-300 relative overflow-hidden group/card
                          ${item.isHighlight 
                            ? 'border-sky-200 shadow-md shadow-sky-100/30 hover:-translate-y-0.5' 
                            : 'border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 hover:-translate-y-0.5'
                          }`}>
                          
                          {/* 装饰背景：高亮卡片 */}
                          {item.isHighlight && (
                             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-50/50 to-transparent rounded-bl-[4rem] -z-0 pointer-events-none"></div>
                          )}

                          <div className="relative z-10">
                              <div className="flex flex-wrap items-center gap-3 mb-3">
                                   <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider
                                      ${item.isHighlight ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-500'}`}>
                                      {item.icon} {item.tag}
                                   </span>
                              </div>
                              
                              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover/card:text-sky-600 transition-colors">
                                {item.title}
                              </h3>
                              
                              <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-0 group-hover/card:line-clamp-none transition-all">
                                {item.desc}
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 媒体资源中心 (已预留，数据在 content.resources 中配置) */}
      <section id="resources-section" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <Newspaper className="text-sky-500 w-6 h-6" /> {t.resources.title}
                 </h2>
                 <p className="text-slate-500 text-sm">{t.resources.subtitle}</p>
              </div>
              <button className="text-sm font-bold text-slate-600 hover:text-sky-600 flex items-center gap-2 hover:gap-3 transition-all">
                 View All <ArrowRight size={16} />
              </button>
           </div>

           {/* 资源列表：后续添加新资源时，只需在 content.resources.items 数组中增加对象即可 */}
           <div className="grid md:grid-cols-3 gap-6">
              {t.resources.items.map((res, idx) => (
                 <div key={idx} className="resource-card group bg-slate-50 hover:bg-white p-6 rounded-xl border border-slate-100 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/20 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-2.5 bg-white rounded-lg shadow-sm text-sky-600 border border-slate-100 group-hover:scale-110 transition-transform">
                          {res.icon}
                       </div>
                       <Download className="w-5 h-5 text-slate-300 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-sky-700 transition-colors truncate">{res.title}</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase mt-2">
                       <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{res.type}</span>
                       <span>{res.size}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* 4. 订阅模块 */}
      <section className="py-20 relative overflow-hidden bg-slate-900 text-white">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10 text-center max-w-xl">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-6 border border-white/10">
               <Mail className="w-5 h-5 text-sky-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.newsletter.title}</h2>
            <p className="text-slate-400 mb-8 text-sm leading-relaxed">
               {t.newsletter.desc}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder={t.newsletter.placeholder} 
                 className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:bg-white/10 transition-all"
               />
               <button className="px-8 py-3 bg-sky-600 hover:bg-sky-500 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-sky-900/50 hover:shadow-sky-500/20">
                  {t.newsletter.btn}
               </button>
            </form>
         </div>
      </section>

    </main>
  );
};

export default News;
