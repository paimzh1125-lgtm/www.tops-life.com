import React, { useEffect, useRef } from 'react';
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
  Image as ImageIcon, // 重命名避免冲突
  Mail,
  Newspaper
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const News: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. 动画初始化 ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 新闻列表动画
      const items = document.querySelectorAll(".news-item");
      items.forEach((item, index) => {
        gsap.fromTo(item, 
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: index * 0.1,
            scrollTrigger: { trigger: item, start: "top 85%" }
          }
        );
      });

      // 资源板块动画
      gsap.from(".resource-card", {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: "#resources-section", start: "top 80%" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]);

  // --- 2. 内容数据 ---
  const content = {
    zh: {
      title: "新闻动态",
      subtitle: "见证 TOPS LIFE 的每一步成长与突破",
      // 新闻列表
      list: [
        { 
          year: "2025", date: "01月", tag: "可持续发展", title: "荣获法国 EcoVadis 可持续发展评分", 
          desc: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
          icon: <Leaf className="w-5 h-5" />, isHighlight: true 
        },
        { 
          year: "2024", date: "年度创新", tag: "产品研发", title: "成功开发三层易揭自封袋", 
          desc: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
          icon: <Zap className="w-5 h-5" />
        },
        { 
          year: "2023", date: "年度基建", tag: "产能升级", title: "升级扩建 ISO Class 7 洁净室", 
          desc: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
          icon: <Building2 className="w-5 h-5" />
        },
        { 
          year: "2019", date: "03月", tag: "质量体系", title: "取得 ISO 13485 & 9001 双重认证", 
          desc: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
          icon: <Award className="w-5 h-5" />
        }
      ],
      // [新增] 资源下载配置
      resources: {
        title: "媒体资源中心",
        subtitle: "获取官方资料、品牌素材及企业宣传册",
        items: [
          { title: "2025 企业宣传册", type: "PDF Document", size: "4.2 MB", icon: <FileText className="w-8 h-8" /> },
          { title: "ISO 13485 认证证书", type: "PDF Document", size: "1.8 MB", icon: <Award className="w-8 h-8" /> },
          { title: "TOPS LIFE 品牌标志", type: "PNG / SVG Kit", size: "5.5 MB", icon: <ImageIcon className="w-8 h-8" /> },
        ]
      },
      // [新增] 订阅配置
      newsletter: {
        title: "订阅我们的最新动态",
        desc: "输入您的邮箱，第一时间获取新材料技术突破与行业洞察。",
        placeholder: "请输入您的电子邮箱...",
        btn: "订阅"
      }
    },
    en: {
      title: "News Center",
      subtitle: "Witness every step of growth and breakthrough at TOPS LIFE",
      list: [
        { 
          year: "2025", date: "Jan", tag: "Sustainability", title: "Achieved EcoVadis Sustainability Rating", 
          desc: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our Corporate Social Responsibility (CSR) journey.",
          icon: <Leaf className="w-5 h-5" />, isHighlight: true
        },
        { 
          year: "2024", date: "Innovation", tag: "R&D", title: "Developed 3-Layer Easy-Peel Self-Sealing Bag", 
          desc: "Innovatively solved the storage and contamination issues of cell culture flasks after opening. This product significantly improves the convenience and safety of sterile laboratory operations.",
          icon: <Zap className="w-5 h-5" />
        },
        { 
          year: "2023", date: "Expansion", tag: "Upgrade", title: "Upgraded to ISO Class 7 Cleanroom", 
          desc: "Completed the expansion of our ISO Class 7 (100,000 class) cleanroom. Introduced advanced air purification and monitoring systems to ensure the strictest production environment for high-end medical devices.",
          icon: <Building2 className="w-5 h-5" />
        },
        { 
          year: "2019", date: "Mar", tag: "Quality", title: "Obtained ISO 13485 & 9001 Certificates", 
          desc: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain, ensuring top-tier safety and reliability.",
          icon: <Award className="w-5 h-5" />
        }
      ],
      resources: {
        title: "Media Resources",
        subtitle: "Access official brochures, brand assets, and certificates.",
        items: [
          { title: "2025 Corporate Brochure", type: "PDF Document", size: "4.2 MB", icon: <FileText className="w-8 h-8" /> },
          { title: "ISO 13485 Certificate", type: "PDF Document", size: "1.8 MB", icon: <Award className="w-8 h-8" /> },
          { title: "Brand Logo Kit", type: "PNG / SVG Kit", size: "5.5 MB", icon: <ImageIcon className="w-8 h-8" /> },
        ]
      },
      newsletter: {
        title: "Subscribe to Our Newsletter",
        desc: "Get the latest updates on material innovation and industry insights directly to your inbox.",
        placeholder: "Enter your email address...",
        btn: "Subscribe"
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="pt-32 pb-16 bg-white relative">
        <div className="container mx-auto px-6 text-center relative z-10">
            <span className="text-sky-600 font-bold tracking-widest uppercase mb-4 block animate-pulse">News & Events</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t.title}</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </section>

      {/* 2. Timeline News List */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 h-full z-0"></div>

          <div className="space-y-12 relative z-10">
            {t.list.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`news-item flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 flex md:justify-end justify-start pl-12 md:pl-0 md:pr-12 relative">
                     <div className={`absolute left-0 md:left-auto md:right-0 top-6 w-4 h-4 rounded-full border-4 border-white shadow-sm transform -translate-x-[9px] md:translate-x-[9px] z-20 
                        ${item.isHighlight ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'}`}>
                     </div>
                     <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} items-start`}>
                        <span className={`text-4xl font-extrabold tracking-tighter ${item.isHighlight ? 'text-sky-600' : 'text-slate-300 group-hover:text-slate-400'} transition-colors`}>
                          {item.year}
                        </span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded mt-1">
                          {item.date}
                        </span>
                     </div>
                  </div>

                  <div className="w-full md:w-1/2 pl-12 md:pl-12 md:pr-0">
                    <div className={`group relative bg-white p-8 rounded-2xl border transition-all duration-300 
                        ${item.isHighlight 
                          ? 'border-sky-200 shadow-xl shadow-sky-100/50 hover:-translate-y-1' 
                          : 'border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-sky-100'
                        }`}>
                        <div className="flex justify-between items-start mb-4">
                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                              ${item.isHighlight ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                              {item.icon} {item.tag}
                           </span>
                           {item.isHighlight && (
                             <span className="flex h-3 w-3 relative">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                             </span>
                           )}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-sky-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          {item.desc}
                        </p>
                        <div className="flex items-center text-sky-600 font-bold text-sm cursor-pointer group/btn">
                           <span className="border-b-2 border-transparent group-hover/btn:border-sky-600 transition-all">Read Story</span>
                           <ArrowRight className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- [新增] 3. 媒体资源中心 (增加页面厚度与实用性) --- */}
      <section id="resources-section" className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-6xl">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3">
                    <Newspaper className="text-sky-500" /> {t.resources.title}
                 </h2>
                 <p className="text-slate-500 max-w-lg">{t.resources.subtitle}</p>
              </div>
              <button className="text-sky-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                 View All Downloads <ArrowRight size={18} />
              </button>
           </div>

           <div className="grid md:grid-cols-3 gap-8">
              {t.resources.items.map((res, idx) => (
                 <div key={idx} className="resource-card group bg-slate-50 hover:bg-sky-50 p-8 rounded-2xl border border-slate-100 hover:border-sky-100 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                       <div className="p-3 bg-white rounded-xl shadow-sm text-sky-600 group-hover:scale-110 transition-transform">
                          {res.icon}
                       </div>
                       <Download className="text-slate-300 group-hover:text-sky-500 transition-colors" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-1 group-hover:text-sky-700 transition-colors">{res.title}</h3>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400 mt-3">
                       <span className="bg-white px-2 py-1 rounded border border-slate-200">{res.type}</span>
                       <span>{res.size}</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* --- [新增] 4. 订阅动态 (增加互动性) --- */}
      <section className="py-24 relative overflow-hidden bg-slate-900 text-white">
         <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
            <div className="inline-flex items-center justify-center p-3 bg-sky-500/20 rounded-full mb-6">
               <Mail className="w-6 h-6 text-sky-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.newsletter.title}</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
               {t.newsletter.desc}
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
               <input 
                 type="email" 
                 placeholder={t.newsletter.placeholder} 
                 className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
               />
               <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full transition-all shadow-lg shadow-sky-900/50">
                  {t.newsletter.btn}
               </button>
            </form>
            <p className="text-xs text-slate-500 mt-6">
               {language === 'zh' ? '我们承诺保护您的隐私，绝不发送垃圾邮件。' : 'We respect your privacy. No spam, ever.'}
            </p>
         </div>
      </section>

    </div>
  );
};

export default News;
