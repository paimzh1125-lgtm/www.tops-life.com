import React, { useEffect, useRef, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Award,
  Shield,
  Globe2,
  PackageOpen,
  Sprout,
  Factory,
  Flag
} from "lucide-react";

// 假设您有一个语言上下文 (如果没有，可直接使用 'zh' 变量)
import { useLanguage } from "../components/LanguageContext";

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 发展历程数据 (Timeline Data) ---
const HISTORY_DATA = [
  { 
    year: "2011", 
    title: { zh: "淘爱材料科技成立", en: "Tops Life Technology Founded" },
    subtitle: "Start-up",
    desc: { 
      zh: "成立淘爱材料科技 Tops Life Technology，开展软包装业务，提供洁净、控菌软包装研发，设计，验证和制造，产品包括薄膜/袋等。", 
      en: "Established Tops Life Technology. Started soft packaging business, providing R&D, design, validation and manufacturing of clean, bacteria-controlled soft packaging (films/bags)." 
    },
    // 图片备注: 淘爱的logo
    image: "/images/application.png" 
  },
  { 
    year: "2013", 
    title: { zh: "增加医疗器械 OEM 业务", en: "Medical Device OEM Expansion" },
    subtitle: "Expansion",
    desc: { 
      zh: "增加医疗器械OEM业务，提供医疗器械研发，设计，验证和制造，微小注塑和组装。", 
      en: "Expanded into Medical Device OEM business, offering R&D, design, validation, manufacturing, micro-injection molding, and assembly." 
    },
    // 图片备注: 医疗器械OEM能力展示
    image: "/images/application.png" 
  },
  { 
    year: "2018", 
    title: { zh: "永爱生命成立", en: "Tops Life Science Founded" },
    subtitle: "Upgrade",
    desc: { 
      zh: "成立永爱生命 Tops Life Science，全面升级软包装制造能力，确立行业领先地位。", 
      en: "Established Tops Life Science to comprehensively upgrade soft packaging manufacturing capabilities." 
    },
    // 图片备注: 永爱的logo
    image: "/images/application.png" 
  },
  { 
    year: "2021", 
    title: { zh: "成立新材料业务部门", en: "New Materials Dept. Established" },
    subtitle: "Innovation",
    desc: { 
      zh: "成立新材料业务部门拓展业务，涉及特种环保水性油墨，特种纸品包装等行业。", 
      en: "Established New Materials Department covering special eco-friendly water-based inks and special paper packaging industries." 
    },
    // 图片备注: 大豆蛋白新产品
    image: "/images/application.png" 
  },
  { 
    year: "2023", 
    title: { zh: "拓展海外业务", en: "Global Expansion (Hong Kong)" },
    subtitle: "Global",
    desc: { 
      zh: "成立淘爱材料技术(香港)有限公司 Tops Life (Hong Kong) Technology Co.,Limited，进一步拓展海外业务。", 
      en: "Established Tops Life (Hong Kong) Technology Co., Limited to further expand overseas business." 
    },
    // 图片备注: 面向海外市场的图片
    image: "/images/application.png" 
  },
];

// --- 静态文本配置 ---
const LANG = {
  zh: {
    heroTitle: "关于我们",
    heroSub: "从 2011 到未来，专注医疗与新材料的创新之路",
    introTitle: "我们的使命",
    introDesc: "苏州永爱生命 (Tops-Life) 致力于为全球医疗及新材料行业提供卓越的解决方案。从洁净软包装到精密医疗器械，我们始终坚持质量为先。",
    historyTitle: "发展历程",
    historySub: "每一步，都是对品质的承诺",
    stats: [
      { num: "15+", label: "年行业经验" },
      { num: "100k", label: "级洁净车间" },
      { num: "50+", label: "全球合作伙伴" },
    ]
  },
  en: {
    heroTitle: "About Us",
    heroSub: "Innovation in Medical & New Materials since 2011",
    introTitle: "Our Mission",
    introDesc: "Tops-Life is dedicated to providing exceptional solutions for the global medical and new material industries. From clean packaging to precision medical devices, we prioritize quality first.",
    historyTitle: "Our History",
    historySub: "Every step is a promise of quality",
    stats: [
      { num: "15+", label: "Years Exp." },
      { num: "100k", label: "Clean Class" },
      { num: "50+", label: "Global Partners" },
    ]
  }
};

export default function About() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 通用淡入动画
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // 2. 时间轴动画 (交替滑入)
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        gsap.from(item, {
          x: isLeft ? -50 : 50, // 左边元素从左侧进，右边元素从右侧进
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans overflow-x-hidden">
      
      {/* --- Hero Section --- */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* 背景图 (建议换成您的实际 Banner) */}
        <div className="absolute inset-0 bg-slate-800">
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
           {/* 模拟背景纹理 */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        <div className="relative z-20 text-center px-6 max-w-4xl">
           <div className="gsap-fade-up inline-block px-3 py-1 mb-6 border border-sky-400/50 rounded-full text-sky-300 text-sm font-bold tracking-wider uppercase bg-sky-900/30 backdrop-blur-sm">
             Tops Life Technology
           </div>
           <h1 className="gsap-fade-up text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
             {t.heroTitle}
           </h1>
           <p className="gsap-fade-up text-lg md:text-xl text-slate-300 font-light">
             {t.heroSub}
           </p>
        </div>
      </section>

      {/* --- Intro & Stats --- */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="gsap-fade-up">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.introTitle}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {t.introDesc}
            </p>
            <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-sky-600 mb-1">{stat.num}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="gsap-fade-up relative">
             <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-200 relative">
                {/* 这里的图片也可以替换 */}
                <img src="/images/application.png" alt="Office" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-sky-900/10 mix-blend-multiply"></div>
             </div>
             {/* 装饰块 */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-sky-100 rounded-full -z-10"></div>
             <div className="absolute -top-6 -left-6 w-32 h-32 bg-slate-100 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* --- Timeline Section (核心部分) --- */}
      <section className="py-24 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* 标题 */}
            <div className="text-center mb-20 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.historyTitle}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
                <p className="mt-4 text-slate-500">{t.historySub}</p>
            </div>

            <div className="relative">
                {/* 中间垂直线条 (仅在大屏显示) */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

                <div className="space-y-12 md:space-y-0">
                    {HISTORY_DATA.map((item, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={i} className={`timeline-item flex flex-col md:flex-row items-center justify-between md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* 文本区域 */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'} mb-8 md:mb-0 relative`}>
                                    {/* 背景大年份装饰 */}
                                    <div className={`text-6xl md:text-8xl font-bold text-slate-100 mb-2 -mt-4 absolute -z-10 select-none top-0 ${isEven ? 'left-0' : 'right-0'}`}>
                                        {item.year}
                                    </div>
                                    
                                    <div className="relative z-10 pt-4">
                                        <span className="text-sky-600 font-bold text-xl block mb-2 flex items-center gap-2 justify-start md:justify-[inherit]">
                                          <Flag size={18}/> {item.year}
                                        </span>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-2">
                                          {language === 'zh' ? item.title.zh : item.title.en}
                                        </h3>
                                        {/* 子标题标签 */}
                                        <span className="inline-block px-2 py-1 bg-slate-100 text-slate-500 text-xs font-bold uppercase rounded mb-4">
                                            {item.subtitle}
                                        </span>
                                        <p className="text-slate-600 leading-relaxed bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-slate-100 shadow-sm">
                                          {language === 'zh' ? item.desc.zh : item.desc.en}
                                        </p>
                                    </div>
                                </div>

                                {/* 中间圆点 (PC端) */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-sky-50 border-4 border-white shadow-md z-10 hidden md:flex">
                                    <div className="w-3 h-3 bg-sky-500 rounded-full"></div>
                                </div>

                                {/* 图片区域 */}
                                <div className="w-full md:w-5/12 relative group cursor-pointer">
                                    <div className={`overflow-hidden rounded-2xl shadow-lg border-4 border-white bg-white transform transition-transform duration-500 hover:-translate-y-2`}>
                                        <div className="aspect-[16/10] w-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                                            {/* 图片：按照要求引用 */}
                                            <img 
                                                src={item.image} 
                                                alt={typeof item.title === 'string' ? item.title : item.title.zh} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* 图片遮罩，增加高级感 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        </div>
                                    </div>
                                    {/* 装饰性背景块 */}
                                    <div className={`absolute top-4 -z-10 w-full h-full bg-sky-100 rounded-2xl ${isEven ? '-left-4' : '-right-4'}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
         </div>
      </section>

      {/* --- CTA / Footer area --- */}
      <section className="py-20 bg-sky-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 gsap-fade-up">
           <h2 className="text-3xl font-bold mb-6">{language === 'zh' ? '准备好开始合作了吗？' : 'Ready to start a project?'}</h2>
           <button className="px-8 py-3 bg-white text-sky-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-sky-50 transition-all transform hover:scale-105">
             {language === 'zh' ? '联系我们' : 'Contact Us'}
           </button>
        </div>
      </section>

    </div>
  );
}
