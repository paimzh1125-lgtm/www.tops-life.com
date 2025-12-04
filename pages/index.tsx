import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Settings,
  Beaker,
  Activity,
  Layers,
  Microscope,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 假设 ParticleBackground 路径正确
import ParticleBackground from "../components/ParticleBackground";
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`,
}));

// 图标映射
const ICONS = {
  safety: ShieldCheck,
  sustainable: Leaf,
  quality: CheckCircle2 => Settings, // 替换为更合适的图标
  tech: Microscope,
};

const LANG = {
  zh: {
    who: "关于我们要",
    company: "苏州永爱生命科技有限公司",
    intro:
      "苏州永爱生命科技有限公司是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。",
    more: "了解更多",
    values: "核心价值观",
    safety: "极致安全",
    safetyDesc: "严格遵循最高医疗级规范，确保患者安全，符合全球监管要求。",
    sustainable: "绿色环保",
    sustainableDesc: "可持续理念融入材料研发，提供生物基环保解决方案。",
    quality: "精密质控",
    qualityDesc: "遵循 ISO 9001 及 ISO 13485，全流程可追溯的质量管理体系。",
    tech: "技术实力",
    techDesc:
      "技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
    lab1: "10万级洁净室生产环境",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物实验室",
    slides: [
      {
        title: "无菌。可靠。为医疗安全匠心打造。",
        subtitle: "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。",
      },
      {
        title: "面向关键医用部件的先进注塑成型技术",
        subtitle: "通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。",
      },
      {
        title: "助力未来生物材料发展的可持续大豆蛋白",
        subtitle: "非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业。",
      },
      {
        title: "科研级生产环境",
        subtitle: "持续扩展制造能力，以满足生命科学行业严格要求。",
      },
      {
        title: "先进产线与质量体系",
        subtitle: "稳定、可追溯的质量体系，为全球客户提供高等级产品。",
      },
    ],
    marketTitle: "应用领域",
    market: ["医疗器械", "制药生产", "新材料", "大豆蛋白聚合物"],
    marketDesc: [
      "无菌包装、精密部件",
      "药品包装、阻隔薄膜",
      "环保生物材料",
      "纸张/纸板涂布、水性油墨",
    ],
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro:
      "Suzhou Tops Life Technology Co., Ltd. is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials.",
    more: "Learn More",
    values: "Core Values",
    safety: "Safety First",
    safetyDesc:
      "Compliant with the highest medical standards to ensure patient safety.",
    sustainable: "Sustainability",
    sustainableDesc: "Bio-based sustainable material solutions.",
    quality: "Quality Control",
    qualityDesc: "ISO 9001 & ISO 13485 certified traceable processes.",
    tech: "Technical Strength",
    techDesc:
      "Our team integrates polymer science, materials engineering, and precision molding expertise.",
    lab1: "Class 100,000 Cleanroom",
    lab2: "High-precision electric injection molding",
    lab3: "Full QC & microbiology laboratories",
    slides: [
      {
        title: "Sterile. Reliable.",
        subtitle: "High-performance packaging ensuring safety across production.",
      },
      {
        title: "Advanced Injection Molding",
        subtitle: "ISO 13485 certified processes delivering reliability.",
      },
      {
        title: "Sustainable Biomaterials",
        subtitle:
          "Non-GMO soy protein solutions for coatings and water-based inks.",
      },
      {
        title: "Research-grade Manufacturing",
        subtitle: "Expanding capabilities for strict quality.",
      },
      {
        title: "Advanced Production & Quality",
        subtitle: "Stable and traceable global supply.",
      },
    ],
    marketTitle: "Market Applications",
    market: [
      "Medical Devices",
      "Pharmaceutical Manufacturing",
      "Advanced Materials",
      "Soy Protein Polymers",
    ],
    marketDesc: [
      "Sterile packaging, precision components",
      "Pharma packaging & films",
      "Eco-friendly biomaterials",
      "Paper coating, water-based inks",
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState("zh");
  const t = LANG[lang];
  const containerRef = useRef(null);

  // GSAP Animation Init
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 通用的淡入上浮动画
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // 视差背景效果 (如果有需要)
    }, containerRef);

    return () => ctx.revert();
  }, [lang]); // Re-run when lang changes

  return (
    <div
      ref={containerRef}
      className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900"
    >
      {/* --- Language Switcher (Floating) --- */}
      <button
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-white/40 text-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex gap-2 items-center group"
      >
        <Globe
          size={18}
          className="text-blue-600 group-hover:rotate-12 transition-transform"
        />
        <span className="font-medium tracking-wide">
          {lang === "zh" ? "EN / 中文" : "中文 / EN"}
        </span>
      </button>

      {/* --- Hero Section --- */}
      <section className="h-screen relative overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          effect="fade"
          speed={1000}
          loop
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active !bg-blue-500 !w-8",
          }}
          className="h-full w-full group"
        >
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full overflow-hidden">
                {/* Image with Slow Zoom Effect */}
                <div className="absolute inset-0 w-full h-full animate-ken-burns">
                  <img
                    src={s.image}
                    alt={t.slides[i].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center px-6">
                  <div className="max-w-5xl w-full text-center text-white">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight opacity-0 animate-slide-up-fade [animation-delay:300ms] [animation-fill-mode:forwards]">
                      {t.slides[i].title}
                    </h1>
                    <p className="text-lg md:text-2xl opacity-0 animate-slide-up-fade [animation-delay:600ms] [animation-fill-mode:forwards] max-w-3xl mx-auto font-light text-slate-200">
                      {t.slides[i].subtitle}
                    </p>
                    <div className="mt-10 opacity-0 animate-slide-up-fade [animation-delay:900ms] [animation-fill-mode:forwards]">
                      <button className="px-8 py-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-blue-900 transition-all duration-300 font-medium">
                        {t.more}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- Who We Are (Intro) --- */}
      <section className="relative py-32 overflow-hidden">
        {/* Particle Background Layer */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
           <ParticleBackground />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="gsap-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/80 border border-blue-100 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              {t.who}
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              {t.company}
            </h2>
            <div className="h-1 w-20 bg-blue-600 mb-8 rounded-full"></div>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              <Suspense fallback={<span>...</span>}>
                <RevealText text={t.intro} />
              </Suspense>
            </p>
            <button className="group flex items-center gap-3 text-blue-600 font-semibold hover:gap-5 transition-all">
              {t.more} <ArrowRight size={20} />
            </button>
          </div>

          {/* Decorative Image/Graphic Area */}
          <div className="relative gsap-fade-up hidden lg:block">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative">
               {/* 这里的图片建议替换为一张代表公司的静态图，或者使用 slide 1 作为占位 */}
               <img src="banner/1.jpg" alt="Company" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"/>
               <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs animate-float">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <Leaf size={24} />
                    </div>
                    <div className="font-bold text-slate-800">{t.sustainable}</div>
                </div>
                <p className="text-sm text-slate-500">{t.sustainableDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Values (Cards) --- */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.values}</h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Safety */}
            <div className="gsap-fade-up group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.safety}</h3>
              <p className="text-slate-600 leading-relaxed">{t.safetyDesc}</p>
            </div>

            {/* Card 2: Sustainability */}
            <div className="gsap-fade-up group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 delay-100">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <Leaf size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.sustainable}</h3>
              <p className="text-slate-600 leading-relaxed">{t.sustainableDesc}</p>
            </div>

            {/* Card 3: Quality */}
            <div className="gsap-fade-up group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 delay-200">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Settings size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">{t.quality}</h3>
              <p className="text-slate-600 leading-relaxed">{t.qualityDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Technical Strength (Dark Section) --- */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-12 gap-16">
          {/* Text Content */}
          <div className="lg:col-span-5 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 flex items-center gap-3">
              <Beaker className="text-blue-400" size={36}/> {t.tech}
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-blue-500 pl-6">
              {t.techDesc}
            </p>
            
            <div className="space-y-6">
              {[t.lab1, t.lab2, t.lab3].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                    {idx === 0 ? <Activity size={20}/> : idx === 1 ? <Layers size={20}/> : <Microscope size={20}/>}
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full gsap-fade-up">
              <div className="space-y-4 pt-12">
                  <div className="h-64 rounded-2xl overflow-hidden">
                      <img src="banner/3.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Lab 1"/>
                  </div>
                  <div className="h-40 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center p-6 text-center border border-white/10">
                      <div className="text-4xl font-bold text-blue-400">ISO</div>
                  </div>
              </div>
              <div className="space-y-4">
                  <div className="h-40 rounded-2xl overflow-hidden bg-blue-600 flex items-center justify-center p-6 text-center">
                      <div className="text-white font-bold text-xl">100,000+ <br/><span className="text-sm opacity-80 font-normal">Class Cleanroom</span></div>
                  </div>
                  <div className="h-64 rounded-2xl overflow-hidden">
                      <img src="banner/4.jpg" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" alt="Lab 2"/>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* --- Market Applications --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 gsap-fade-up">
            {t.marketTitle || "Industry Applications"}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer">
                {/* Background Image (Using slides as placeholders if needed, or colored bg) */}
                <img src={`banner/${(i % 5) + 1}.jpg`} alt={m} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors duration-300" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-2">{m}</h3>
                    <div className="h-0.5 w-12 bg-blue-500 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <p className="text-sm text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                      {t.marketDesc[i]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-slate-900 font-bold text-xl tracking-tight">
             TOPS LIFE <span className="text-blue-600">TECH</span>
           </div>
           <p className="text-slate-500 text-sm">
             © {new Date().getFullYear()} {t.company}. All rights reserved.
           </p>
        </div>
      </footer>
      
      {/* Global CSS for custom animations (Injecting styles for simplicity) */}
      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-ken-burns {
          animation: ken-burns 20s ease-out infinite alternate;
        }
        @keyframes slide-up-fade {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up-fade {
          /* animation defined in inline styles per element */
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
