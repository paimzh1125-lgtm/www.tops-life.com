import React, { useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  Award, 
  Zap, 
  Building2, 
  Leaf, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Mail, 
  Newspaper,
  Calendar
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 类型定义 ---
interface NewsItem {
  year: string;
  date: string;
  tag: string;
  title: string;
  desc: string;
  icon: JSX.Element;
  isHighlight?: boolean;
}

interface ResourceItem {
  title: string;
  type: string;
  size: string;
  icon: JSX.Element;
}

const News: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. 动画逻辑优化 (更克制、更快速) ---
  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      // 列表整体容器入场
      const items = gsap.utils.toArray<HTMLElement>(".news-row");
      
      gsap.fromTo(items, 
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { 
            trigger: ".news-list-container", 
            start: "top 80%",
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
    return () => ctx.revert();
  }, [language]);

  // --- 2. 数据内容 ---
  const content = useMemo(() => ({
    zh: {
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
      list: [
        { 
          year: "2025", date: "01月", tag: "可持续发展", title: "荣获法国 EcoVadis 可持续发展评分", 
          desc: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
          icon: <Leaf className="w-4 h-4" />, isHighlight: true 
        },
        { 
          year: "2024", date: "年度创新", tag: "产品研发", title: "成功开发三层易揭自封袋", 
          desc: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
          icon: <Zap className="w-4 h-4" />
        },
        { 
          year: "2023", date: "年度基建", tag: "产能升级", title: "升级扩建 ISO Class 7 洁净室", 
          desc: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
          icon: <Building2 className="w-4 h-4" />
        },
        { 
          year: "2019", date: "03月", tag: "质量体系", title: "取得 ISO 13485 & 9001 双重认证", 
          desc: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
          icon: <Award className="w-4 h-4" />
        }
      ] as NewsItem[],
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
      }
    },
    en: {
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
      list: [
        { 
          year: "2025", date: "Jan", tag: "Sustainability", title: "Achieved EcoVadis Sustainability Rating", 
          desc: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our CSR journey.",
          icon: <Leaf className="w-4 h-4" />, isHighlight: true
        },
        { 
          year: "2024", date: "Innovation", tag: "R&D", title: "Developed 3-Layer Easy-Peel Self-Sealing Bag", 
          desc: "Innovatively solved storage and contamination issues for cell culture flasks. This product significantly improves safety and convenience in sterile labs.",
          icon: <Zap className="w-4 h-4" />
        },
        { 
          year: "2023", date: "Expansion", tag: "Upgrade", title: "Upgraded to ISO Class 7 Cleanroom", 
          desc: "Completed the expansion of our ISO Class 7 cleanroom. Introduced advanced air purification systems to ensure the strictest production environment.",
          icon: <Building2 className="w-4 h-4" />
        },
        { 
          year: "2019", date: "Mar", tag: "Quality", title: "Obtained ISO 13485 & 9001 Certificates", 
          desc: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain.",
          icon: <Award className="w-4 h-4" />
        }
      ] as NewsItem[],
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
      }
    }
  }), []);

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* 1. Hero Section (增强版：增加数据锚点) */}
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
              
              {/* 右侧数据展示 (增加 B2B 专业感) */}
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

      {/* 2. Timeline News List (新布局：左轴右文) */}
      <section className="py-20 relative bg-slate-50/50">
        <div className="container mx-auto px-6 max-w-4xl news-list-container">
          
          {/* 顶部工具栏 (模拟筛选，增加页面厚度) */}
          <div className="flex justify-between items-center mb-12 border-b border-slate-200 pb-4">
             <h2 className="text-xl font-bold text-slate-800">Timeline</h2>
             <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                <span className="text-sky-600 font-bold cursor-pointer border-b-2 border-sky-600 pb-4 -mb-4.5">All</span>
                <span className="hover:text-sky-600 cursor-pointer transition-colors">Corporate</span>
                <span className="hover:text-sky-600 cursor-pointer transition-colors">Products</span>
                <span className="hover:text-sky-600 cursor-pointer transition-colors">Events</span>
             </div>
          </div>

          <div className="space-y-0 relative">
            {/* 这里的线贯穿始终 */}
            <div className="absolute left-[88px] md:left-[104px] top-2 bottom-0 w-px bg-slate-200 z-0"></div>

            {t.list.map((item, i) => (
              <div key={i} className="news-row flex gap-6 md:gap-10 group relative z-10 pb-12 last:pb-0">
                  
                  {/* 左侧：时间锚点 */}
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

                  {/* 右侧：内容卡片 (横向布局) */}
                  <div className="flex-1 min-w-0">
                      <div className={`p-6 rounded-xl border bg-white transition-all duration-300 relative overflow-hidden group/card
                          ${item.isHighlight 
                            ? 'border-sky-200 shadow-md shadow-sky-100/30 hover:-translate-y-0.5' 
                            : 'border-slate-100 shadow-sm hover:shadow-md hover:border-sky-100 hover:-translate-y-0.5'
                          }`}>
                          
                          {/* 装饰背景：仅高亮卡片显示 */}
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

      {/* 3. 资源下载 (卡片样式微调) */}
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

      {/* 4. 订阅模块 (保持不变，只是间距微调) */}
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

    </div>
  );
};

export default News;
