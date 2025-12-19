import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight, Award, Zap, Building2, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const News: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // --- 1. 动画初始化 ---
  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, [language]);

  // --- 2. 内容数据配置 (已整合新文案并扩充细节) ---
  const content = {
    zh: {
      title: "新闻动态",
      subtitle: "见证 TOPS LIFE 的每一步成长与突破",
      list: [
        { 
          year: "2025", 
          date: "01月",
          tag: "可持续发展",
          title: "荣获法国 EcoVadis 可持续发展评分", 
          desc: "托普斯在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
          icon: <Leaf className="w-5 h-5" />,
          isHighlight: true // 高亮最新新闻
        },
        { 
          year: "2024", 
          date: "年度创新",
          tag: "产品研发",
          title: "成功开发三层易揭自封袋", 
          desc: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
          icon: <Zap className="w-5 h-5" />
        },
        { 
          year: "2023", 
          date: "年度基建",
          tag: "产能升级",
          title: "升级扩建 ISO Class 7 洁净室", 
          desc: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
          icon: <Building2 className="w-5 h-5" />
        },
        { 
          year: "2019", 
          date: "03月",
          tag: "质量体系",
          title: "取得 ISO 13485 & 9001 双重认证", 
          desc: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
          icon: <Award className="w-5 h-5" />
        }
      ]
    },
    en: {
      title: "News Center",
      subtitle: "Witness every step of growth and breakthrough at TOPS LIFE",
      list: [
        { 
          year: "2025", 
          date: "Jan",
          tag: "Sustainability",
          title: "Achieved EcoVadis Sustainability Rating", 
          desc: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our Corporate Social Responsibility (CSR) journey.",
          icon: <Leaf className="w-5 h-5" />,
          isHighlight: true
        },
        { 
          year: "2024", 
          date: "Innovation",
          tag: "R&D",
          title: "Developed 3-Layer Easy-Peel Self-Sealing Bag", 
          desc: "Innovatively solved the storage and contamination issues of cell culture flasks after opening. This product significantly improves the convenience and safety of sterile laboratory operations.",
          icon: <Zap className="w-5 h-5" />
        },
        { 
          year: "2023", 
          date: "Expansion",
          tag: "Upgrade",
          title: "Upgraded to ISO Class 7 Cleanroom", 
          desc: "Completed the expansion of our ISO Class 7 (100,000 class) cleanroom. Introduced advanced air purification and monitoring systems to ensure the strictest production environment for high-end medical devices.",
          icon: <Building2 className="w-5 h-5" />
        },
        { 
          year: "2019", 
          date: "Mar",
          tag: "Quality",
          title: "Obtained ISO 13485 & 9001 Certificates", 
          desc: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain, ensuring top-tier safety and reliability.",
          icon: <Award className="w-5 h-5" />
        }
      ]
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* 1. Header Hero */}
      <section className="pt-32 pb-16 bg-white relative">
        <div className="container mx-auto px-6 text-center relative z-10">
            <span className="text-sky-600 font-bold tracking-widest uppercase mb-4 block animate-pulse">News & Events</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">{t.title}</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        {/* 背景装饰线 */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </section>

      {/* 2. Timeline News List */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          
          {/* 中间的时间轴线 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 h-full z-0"></div>

          <div className="space-y-12 relative z-10">
            {t.list.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`news-item flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* 年份/日期节点 */}
                  <div className="w-full md:w-1/2 flex md:justify-end justify-start pl-12 md:pl-0 md:pr-12 relative">
                     {/* 时间轴圆点 */}
                     <div className={`absolute left-0 md:left-auto md:right-0 top-6 w-4 h-4 rounded-full border-4 border-white shadow-sm transform -translate-x-[9px] md:translate-x-[9px] z-20 
                        ${item.isHighlight ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-300'}`}>
                     </div>
                     
                     {/* 日期显示 */}
                     <div className={`flex flex-col ${isEven ? 'md:items-start' : 'md:items-end'} items-start`}>
                        <span className={`text-4xl font-extrabold tracking-tighter ${item.isHighlight ? 'text-sky-600' : 'text-slate-300 group-hover:text-slate-400'} transition-colors`}>
                          {item.year}
                        </span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded mt-1">
                          {item.date}
                        </span>
                     </div>
                  </div>

                  {/* 内容卡片 */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-12 md:pr-0">
                    <div className={`group relative bg-white p-8 rounded-2xl border transition-all duration-300 
                        ${item.isHighlight 
                          ? 'border-sky-200 shadow-xl shadow-sky-100/50 hover:-translate-y-1' 
                          : 'border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-sky-100'
                        }`}>
                        
                        {/* 标签 */}
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

      {/* 3. Bottom Gradient */}
      <div className="h-24 bg-gradient-to-t from-white to-slate-50 relative z-10"></div>
    </div>
  );
};

export default News;
