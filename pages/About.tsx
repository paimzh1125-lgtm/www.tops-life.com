import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Activity,
  Layers,
  PackageOpen,
  DraftingCompass,
  Sprout,
  CheckCircle2,
  Globe2,
  Microscope,
  Award,
  Target,
  Heart,
  Leaf,
  Flag,
  History
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLanguage } from "../components/LanguageContext";

// 懒加载组件
const RevealText = lazy(() => import("../components/RevealText"));

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 数据配置 ---

// 1. 模拟 Banner 图片
const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`, 
}));

// 2. 发展历程数据 (已精简文案)
const HISTORY_DATA = [
  { 
    year: "2011", 
    title: { zh: "淘爱材料科技成立", en: "Founded Tops Life Tech" },
    subtitle: "Start-up",
    // 删减：只保留核心业务描述
    desc: { 
      zh: "开展洁净软包装研发与制造业务，确立薄膜与袋类产品线。", 
      en: "Started clean soft packaging R&D and manufacturing business." 
    },
    image: "images/application1.png" 
  },
  { 
    year: "2013", 
    title: { zh: "增加医疗器械 OEM", en: "Medical Device OEM" },
    subtitle: "Expansion",
    desc: { 
      zh: "新增微小注塑与组装产线，具备医疗器械全流程制造能力。", 
      en: "Added micro-injection molding and assembly lines for medical devices." 
    },
    image: "images/application1.png" 
  },
  { 
    year: "2018", 
    title: { zh: "永爱生命成立", en: "Tops Life Science" },
    subtitle: "Upgrade",
    desc: { 
      zh: "成立苏州永爱生命，全面升级软包装制造体系，确立行业领先地位。", 
      en: "Established Suzhou Tops Life Science to upgrade packaging systems." 
    },
    image: "images/application1.png" 
  },
  { 
    year: "2021", 
    title: { zh: "新材料部门成立", en: "New Materials Dept." },
    subtitle: "Innovation",
    desc: { 
      zh: "拓展环保水性油墨与纸品包装业务，推出大豆蛋白创新产品。", 
      en: "Expanded into eco-friendly inks and launched soy protein products." 
    },
    image: "images/application1.png" 
  },
  { 
    year: "2023", 
    title: { zh: "拓展海外业务", en: "Global Expansion" },
    subtitle: "Global",
    desc: { 
      zh: "成立香港公司 (Tops Life HK)，正式布局全球市场。", 
      en: "Established Hong Kong branch to expand into the global market." 
    },
    image: "images/application1.png" 
  },
];

// 3. 语言包配置
const LANG = {
  zh: {
    who: "关于我们",
    companyPrefix: "苏州永爱",
    companySuffix: "生命科技有限公司",
    intro: "苏州永爱 Tops-Life 成立于 2011 年，专注软包装、医疗器械及新材料。秉持“质量为先”理念，聚焦洁净软包装、新材料及医疗器械三大业务，为全球客户提供安全、高效的解决方案。", // 简介也稍微精简了一下
    more: "探索详情",
    stats: [
      { num: "15+", label: "年行业经验" },
      { num: "100k", label: "级洁净车间" },
      { num: "50+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务解决方案",
    solutions: [
      {
        title: "医疗软包装",
        desc: "高性能无菌屏障系统，包括医用吸塑盒及特卫强(Tyvek)盖材，确保无菌安全。",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "精密医疗注塑",
        desc: "依托全电动注塑与 ISO 13485 体系，制造公差微米级的关键医疗零部件。",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的生物基材料，为工业包装提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "研发与技术实力",
    techDesc: "融合高分子科学与精密成型技术，配备自动化生产线及研发实验室。",
    slides: [
      { title: "赋能生命科学，筑造坚实无菌屏障", subtitle: "以高性能软包装解决方案，守护药品与医疗器械的每一次安全交付。" },
      { title: "微米级精密成型，重塑医疗制造标准", subtitle: "全流程 ISO 13485 认证，为关键医疗部件提供极致的稳定与精准。" },
      { title: "探索材料边界，引领生物基科技未来", subtitle: "源于自然的创新聚合物技术，为全球工业提供可持续的高性能方案。" },
      { title: "严苛洁净环境，承载卓越品质承诺", subtitle: "持续拓展制造能力边界，从容应对生命科学行业最严格的挑战。" },
      { title: "智造驱动未来，交付全球可信赖价值", subtitle: "构建透明、可追溯的质量体系，成为全球客户值得托付的长期伙伴。" },
    ],
    marketTitle: "应用领域",
    market: ["医疗器械", "制药生产", "新材料", "大豆蛋白聚合物"],
    cta: "准备好开启下一个项目了吗？",
    ctaBtn: "联系我们",
    historyTitle: "发展历程",
    values: {
        vision: { title: "愿景 Vision", desc: "成为全球生命科学及新材料领域的领军企业。" },
        mission: { title: "使命 Mission", desc: "提供安全创新产品，助力健康与可持续发展。" },
        concept: { title: "理念 Values", desc: "技术改善生活，尊重环境，合作共赢。" }
    }
  },
  en: {
    who: "About Us",
    companyPrefix: "Suzhou Tops Life",
    companySuffix: " Technology Co., Ltd.",
    intro: "Established in 2011, Suzhou Tops-Life specializes in medical packaging, precision components, and biomaterials. Adhering to 'Quality First', we focus on Clean Packaging, New Materials, and Medical Devices, delivering safe solutions globally.",
    more: "Discover More",
    stats: [
      { num: "15+", label: "Years Exp." },
      { num: "100k", label: "Clean Class" },
      { num: "50+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Solutions",
    solutions: [
      {
        title: "Medical Packaging",
        desc: "High-performance sterile barrier systems ensuring lifecycle safety.",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "Precision Injection",
        desc: "Micron-level precision components manufactured under ISO 13485.",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "Soy Polymers",
        desc: "Innovative bio-based materials. A biodegradable green alternative.",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "R&D Strength",
    techDesc: "Integrating polymer science and precision molding expertise.",
    slides: [
      { title: "Empowering Life Science", subtitle: "Building robust sterile barriers for safety." },
      { title: "Precision Redefined", subtitle: "Micron-level injection molding reshaping standards." },
      { title: "Material Innovation", subtitle: "Leading the future with sustainable polymers." },
      { title: "Purity & Excellence", subtitle: "Strict controlled environments for quality." },
      { title: "Driven by Intelligence", subtitle: "Delivering trusted value globally." },
    ],
    marketTitle: "Market Applications",
    market: ["Medical Devices", "Pharma", "Advanced Materials", "Bio Polymers"],
    cta: "Ready to start your next project?",
    ctaBtn: "Contact Us",
    historyTitle: "Our History",
    values: {
        vision: { title: "Vision", desc: "To be a global leader in life sciences and new materials." },
        mission: { title: "Mission", desc: "Delivering safe, innovative products for health." },
        concept: { title: "Values", desc: "Technology for life, environmental respect, win-win." }
    }
  },
};

export default function About() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 基础淡入
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // 头部
      gsap.from(".header-fade", {
        y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out"
      });

      // 数字滚动
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        const targetText = counter.textContent;
        gsap.from(counter, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: counter, start: "top 90%" },
          onUpdate: function() {
            // @ts-ignore
            this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent);
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [language]); 

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* 极简背景 */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
      </div>

      {/* Hero Section */}
      <section className="h-[85vh] relative overflow-hidden z-10">
        <Swiper 
          modules={[Autoplay, EffectFade, Pagination, Navigation]} 
          autoplay={{ delay: 6000, disableOnInteraction: false }} 
          effect="fade" 
          speed={1000} 
          loop 
          pagination={{ clickable: true, dynamicBullets: true }} 
          className="h-full w-full group"
        >
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                <img src={s.image} alt={t.slides[i].title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-sky-400/30 bg-sky-900/40 backdrop-blur-md text-sky-300 text-xs font-bold uppercase">
                         <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
                         Since 2011
                    </div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight leading-tight">
                      {t.slides[i].title}
                    </h1>
                    <p className="text-base md:text-lg text-slate-200 max-w-2xl mb-8 font-light">
                      {t.slides[i].subtitle}
                    </p>
                    <button className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-medium transition-all flex items-center gap-2">
                        {t.more} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Intro Section - 紧凑版 */}
      <section className="relative py-20 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 relative gsap-fade-up">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img src="banner/3.jpg" alt="Factory" className="w-full h-auto object-cover" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h3 className="header-fade text-2xl md:text-4xl font-extrabold text-slate-900 mb-6">
              {t.companyPrefix}<span className="text-sky-600">{t.companySuffix}</span>
            </h3>
            
            <div className="header-fade text-slate-600 leading-relaxed text-justify mb-8">
              <Suspense fallback={<p>{t.intro}</p>}>
                  {RevealText ? <RevealText text={t.intro} /> : <p>{t.intro}</p>}
              </Suspense>
            </div>
            
            <div className="header-fade flex gap-8 pt-6 border-t border-slate-100">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 flex items-baseline">
                    <span className="counter-number">{stat.num.replace(/\D/g,'')}</span>
                    <span className="text-sky-500 ml-0.5">{stat.num.replace(/\d/g,'')}</span>
                  </div>
                  <div className="text-xs text-slate-400 uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- History Timeline (横向滑动，节省空间) --- */}
      <section className="py-20 bg-slate-50 relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10 gsap-fade-up">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">{t.historyTitle}</h2>
                    <div className="h-1 w-12 bg-sky-500 mt-2 rounded-full"></div>
                </div>
                {/* 装饰图标 */}
                <History className="text-slate-200 w-12 h-12" strokeWidth={1} />
            </div>

            <div className="gsap-fade-up">
                <Swiper
                    slidesPerView={1.1}
                    spaceBetween={20}
                    breakpoints={{
                        640: { slidesPerView: 2.2, spaceBetween: 20 },
                        1024: { slidesPerView: 3.2, spaceBetween: 30 },
                    }}
                    className="pb-10"
                >
                    {HISTORY_DATA.map((item, i) => (
                        <SwiperSlide key={i} className="h-auto">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-slate-100 h-full flex flex-col group">
                                {/* 图片区 - 限制高度 */}
                                <div className="h-40 relative overflow-hidden bg-slate-100">
                                    <img 
                                        src={item.image} 
                                        alt="milestone" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    />
                                    <div className="absolute top-0 left-0 bg-sky-600 text-white px-3 py-1 rounded-br-lg text-sm font-bold shadow-md z-10">
                                        {item.year}
                                    </div>
                                </div>
                                
                                {/* 内容区 */}
                                <div className="p-6 flex-1 flex flex-col relative">
                                    {/* 年份水印 */}
                                    <span className="absolute right-4 bottom-4 text-6xl font-bold text-slate-100 -z-0 select-none">{item.year}</span>
                                    
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">
                                        {language === 'zh' ? item.title.zh : item.title.en}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed relative z-10">
                                        {language === 'zh' ? item.desc.zh : item.desc.en}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
         </div>
      </section>

      {/* Solutions - 卡片式 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 gsap-fade-up">
            <h2 className="text-3xl font-bold text-slate-900">{t.solutionsTitle}</h2>
            <p className="mt-4 text-slate-500 text-sm">One-stop solutions for medical & new materials.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-slate-100 group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Strength */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div className="gsap-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <Microscope className="text-sky-400" size={24} />
                <span className="text-sky-400 font-bold tracking-widest uppercase text-sm">R&D Center</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t.tech}</h2>
              <p className="text-slate-400 text-lg mb-8 border-l-4 border-sky-500 pl-4">{t.techDesc}</p>
              
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <Award className="text-sky-400 mb-2" size={20} />
                    <div className="font-bold text-sm">ISO 13485</div>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <Layers className="text-cyan-400 mb-2" size={20} />
                    <div className="font-bold text-sm">Class 100k</div>
                  </div>
              </div>
            </div>

            <div className="relative h-[350px] gsap-fade-up hidden lg:block">
               <img src="banner/4.jpg" className="w-full h-full object-cover rounded-xl opacity-80" alt="Lab" />
            </div>
        </div>
      </section>

      {/* Values Grid - 紧凑型 */}
      <section className="py-20 container mx-auto px-6 bg-slate-50">
         <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <Target className="text-sky-600 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{t.values.vision.title}</h3>
                <p className="text-slate-500 text-sm">{t.values.vision.desc}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <Heart className="text-rose-500 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{t.values.mission.title}</h3>
                <p className="text-slate-500 text-sm">{t.values.mission.desc}</p>
            </div>
            <div className="bg-sky-900 text-white p-8 rounded-2xl shadow-lg">
                <Leaf className="text-green-400 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">{t.values.concept.title}</h3>
                <p className="text-slate-300 text-sm">{t.values.concept.desc}</p>
            </div>
         </div>
      </section>

      {/* Market - 仅保留图片网格 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-bold text-slate-900">{t.marketTitle}</h2>
             <span className="text-sky-600 font-medium text-sm cursor-pointer hover:underline">View All</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.market.map((m, i) => (
              <div key={i} className="relative h-48 rounded-xl overflow-hidden group">
                <img src={`banner/${(i % 5) + 1}.jpg`} alt={m} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white font-bold">{m}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - 简化版 */}
      <section className="py-16 bg-sky-600 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">{t.cta}</h2>
          <button className="px-8 py-3 bg-white text-sky-700 font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
            {t.ctaBtn}
          </button>
        </div>
      </section>
    </div>
  );
}
