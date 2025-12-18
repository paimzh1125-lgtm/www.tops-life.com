import React, { useEffect, Suspense, lazy, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Microscope,   // 研发
  Activity,     // 活跃/标准
  Layers,       // 层级/洁净
  PackageOpen,  // 包装
  DraftingCompass, // 精密制造
  Sprout,       // 环保
  CheckCircle2, // 列表勾选
  Globe2,       // 全球化
  Award,        // 资质
  ShieldCheck   // 安全
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLanguage } from "../components/LanguageContext";

// 懒加载非首屏组件以优化性能
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

// 模拟 Banner 数据
const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`, 
}));

// 语言包配置
const LANG = {
  zh: {
    heroTag: "创新医疗科技合作伙伴",
    // 拆分标题颜色：前深后蓝
    companyPrefix: "苏州永爱",
    companySuffix: "生命科技有限公司",
    aboutTitle: "关于我们",
    aboutDesc: "苏州永爱 Tops-Life 成立于 2011 年，专注软包装、医疗器械及新材料供应。我们以“质量为先”为理念，依托 ISO 13485 体系与十万级洁净车间，为全球生命科学领域提供安全、精密、环保的解决方案。",
    aboutStats: [
      { num: "15", suffix: "+", label: "年行业经验" },
      { num: "100", suffix: "k", label: "级洁净车间" },
      { num: "50", suffix: "+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务解决方案",
    solutionsSubtitle: "以专业技术满足不同业务需求，提供一站式支持",
    solutions: [
      {
        title: "医疗软包装",
        desc: "高性能无菌屏障系统，含吸塑盒与特卫强盖材，确保器械全生命周期无菌安全。",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "精密医疗注塑",
        desc: "依托全电动注塑工艺，制造微米级公差的关键零部件，广泛应用于微创手术器械。",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的革新性生物基材料，为工业包装提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
      }
    ],
    techTitle: "研发与技术实力",
    techDesc: "融合高分子科学与精密成型技术，配备自动化产线及内部实验室。",
    slides: [
      { title: "赋能生命科学，筑造坚实无菌屏障", subtitle: "高性能软包装解决方案，守护每一次安全交付。" },
      { title: "微米级精密成型，重塑医疗制造标准", subtitle: "全流程 ISO 13485 认证，提供极致稳定与精准。" },
      { title: "探索材料边界，引领生物基科技未来", subtitle: "源于自然的创新聚合物技术，提供可持续方案。" },
      { title: "严苛洁净环境，承载卓越品质承诺", subtitle: "从容应对生命科学行业最严格的挑战。" },
      { title: "智造驱动未来，交付全球可信赖价值", subtitle: "构建透明可追溯体系，做值得托付的长期伙伴。" },
    ],
    marketTitle: "应用领域",
    marketDesc: "覆盖生命科学关键领域，提供高标准产品支持",
    market: ["医疗器械", "制药生产", "新材料", "大豆蛋白聚合物"],
    ctaTitle: "准备好开启下一个项目了吗？",
    ctaBtn: "联系我们",
    moreBtn: "了解更多"
  },
  en: {
    heroTag: "Innovative MedTech Partner",
    companyPrefix: "Suzhou Tops Life",
    companySuffix: " Technology Co., Ltd.",
    aboutTitle: "Who We Are",
    aboutDesc: "Established in 2011, Suzhou Tops-Life specializes in medical soft packaging, precision injection, and biomaterials. Guided by 'Quality First' and ISO 13485 standards, we deliver safe, precise, and eco-friendly solutions to the global life sciences industry.",
    aboutStats: [
      { num: "15", suffix: "+", label: "Years Exp." },
      { num: "100", suffix: "k", label: "Clean Class" },
      { num: "50", suffix: "+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Solutions",
    solutionsSubtitle: "Professional technologies for diverse business needs.",
    solutions: [
      {
        title: "Medical Soft Packaging",
        desc: "High-performance sterile barrier systems ensuring lifecycle safety for medical devices.",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "Precision Injection",
        desc: "Micron-level precision components manufactured under ISO 13485 for surgical instruments.",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "Soy Protein Polymers",
        desc: "Innovative bio-based materials providing biodegradable alternatives for industrial packaging.",
        icon: <Sprout size={32} />,
      }
    ],
    techTitle: "R&D Strength",
    techDesc: "Integrating polymer science and precision molding with automated production lines.",
    slides: [
      { title: "Empowering Life Science", subtitle: "Building robust sterile barriers for safety." },
      { title: "Precision Redefined", subtitle: "Micron-level injection molding reshaping standards." },
      { title: "Material Innovation", subtitle: "Leading the future with sustainable polymer solutions." },
      { title: "Purity & Excellence", subtitle: "Strict controlled environments for superior quality." },
      { title: "Driven by Intelligence", subtitle: "Delivering trusted value globally." },
    ],
    marketTitle: "Market Applications",
    marketDesc: "Supporting key sectors in life sciences.",
    market: ["Medical Devices", "Pharma", "Advanced Materials", "Bio Polymers"],
    ctaTitle: "Ready to start your next project?",
    ctaBtn: "Contact Us",
    moreBtn: "Learn More"
  },
};

export default function Home() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 通用淡入上浮动画
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // 2. 视差滚动效果 (Parallax)
      const parallaxEls = document.querySelectorAll(".gsap-parallax");
      parallaxEls.forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 }
        });
      });
      
      // 3. 数字增长动画 (Counter) - 增加交互感
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        const targetRaw = counter.getAttribute('data-target') || "0";
        const targetValue = parseInt(targetRaw, 10);
        
        gsap.fromTo(counter, 
          { textContent: 0 },
          {
            textContent: targetValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: counter, start: "top 90%" },
            onUpdate: function() {
              // 确保显示为整数
              this.targets()[0].textContent = Math.ceil(this.targets()[0].textContent);
            }
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); 

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* 背景光晕 - 减少视觉干扰，保持洁净感 */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-sky-100/40 rounded-full blur-[100px] opacity-60"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden z-10 group">
        <Swiper 
          modules={[Autoplay, EffectFade, Pagination, Navigation]} 
          autoplay={{ delay: 6000, disableOnInteraction: false }} 
          effect="fade" 
          speed={1200} 
          loop 
          pagination={{ clickable: true, dynamicBullets: true }} 
          className="h-full w-full"
        >
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                {/* 图片层 + Ken Burns 效果 */}
                <div className="absolute inset-0 bg-slate-900 overflow-hidden">
                  <img src={s.image} alt={t.slides[i].title} className="w-full h-full object-cover opacity-90 animate-ken-burns" />
                </div>
                {/* 渐变遮罩 - 优化文字可读性 */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-16">
                    {/* Tag */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-900/40 backdrop-blur-md text-sky-300 text-xs font-bold uppercase tracking-widest shadow-lg mb-6 animate-slide-up-fade [animation-delay:100ms]">
                         <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                         {t.heroTag}
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up-fade [animation-delay:300ms]">
                      {t.slides[i].title.split("，")[0]}<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-200">
                        {t.slides[i].title.split("，")[1] || ""}
                      </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10 font-light leading-relaxed animate-slide-up-fade [animation-delay:500ms] border-l-2 border-sky-500 pl-6">
                      {t.slides[i].subtitle}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 animate-slide-up-fade [animation-delay:700ms]">
                      <button className="px-8 py-3.5 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-medium transition-all hover:shadow-[0_4px_20px_rgba(14,165,233,0.4)] flex items-center gap-2 transform active:scale-95">
                        {t.moreBtn} <ArrowRight size={18} />
                      </button>
                      <button className="px-8 py-3.5 bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white hover:text-sky-900 text-white rounded-full font-medium transition-all active:scale-95">
                        {t.ctaBtn}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* About Section - 优化：双栏布局，视觉聚焦 */}
      <section className="relative py-24 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* 左侧：图片展示 (增加悬停互动) */}
          <div className="relative order-2 lg:order-1 gsap-fade-up group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="banner/3.jpg" 
                alt="Factory Environment" 
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 will-change-transform" 
              />
              {/* 装饰性光泽 */}
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/10 to-transparent pointer-events-none"></div>
            </div>
            {/* 悬浮认证卡片 */}
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-xl shadow-xl border border-slate-100 flex items-center gap-4 animate-float hidden md:flex">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-full"><Award size={24}/></div>
              <div>
                <div className="font-bold text-slate-800 text-lg">ISO 13485</div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Certified</div>
              </div>
            </div>
          </div>

          {/* 右侧：文本内容 (信息分层) */}
          <div className="order-1 lg:order-2 gsap-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-1 bg-sky-500 rounded-full"></div>
              <span className="text-sky-600 font-bold uppercase tracking-widest text-sm">{t.aboutTitle}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {t.companyPrefix}<span className="text-sky-600">{t.companySuffix}</span>
            </h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8 text-justify">
              <Suspense fallback="...">
                <RevealText text={t.aboutDesc} />
              </Suspense>
            </p>

            {/* 统计数据 - 动态增长 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              {t.aboutStats.map((stat, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 flex items-baseline justify-center md:justify-start">
                    <span className="counter-number" data-target={stat.num}>0</span>
                    <span className="text-sky-600 text-2xl ml-0.5">{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - 简洁卡片网格 */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
            <p className="text-slate-500 text-lg">{t.solutionsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/40 transition-all duration-300 border border-slate-100 hover:-translate-y-2">
                {/* Icon Container with Hover Effect */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                    idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-blue-600' : 'bg-emerald-500'
                  }`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 text-sm">{item.desc}</p>
                
                <a href="#" className="inline-flex items-center text-sm font-bold text-slate-400 group-hover:text-sky-600 transition-colors uppercase tracking-wider">
                  {t.moreBtn} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Section - 深色对比，突出科技感 */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden z-10">
        {/* 背景科技纹理 - 低透明度 */}
        <div className="absolute inset-0 opacity-[0.03]">
           <Globe2 className="w-full h-full text-white transform scale-150" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="gsap-fade-up">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 border border-sky-500/30 rounded-lg text-sky-400 mb-6">
                <Microscope size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">R&D Center</span>
             </div>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t.techTitle}</h2>
             <p className="text-slate-400 text-lg leading-relaxed mb-8">{t.techDesc}</p>
             
             <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Activity className="text-sky-400" />
                  <div>
                    <h4 className="font-bold text-white">ISO 13485 Certified</h4>
                    <p className="text-sm text-slate-400">International Medical Standard</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <Layers className="text-emerald-400" />
                  <div>
                    <h4 className="font-bold text-white">Class 100k Cleanroom</h4>
                    <p className="text-sm text-slate-400">Strict Controlled Environment</p>
                  </div>
                </div>
             </div>
          </div>

          <div className="relative h-[400px] lg:h-[500px] gsap-fade-up">
             {/* 视差图片组合 */}
             <div className="absolute top-0 right-0 w-[85%] h-[80%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-10 group">
                <img src="banner/4.jpg" alt="Lab Research" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay"></div>
             </div>
             <div className="absolute bottom-0 left-0 w-[50%] h-[50%] rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl z-20 gsap-parallax">
                <img src="banner/1.jpg" alt="Production Line" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>
      </section>

      {/* Market Application - 图片网格 */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 gsap-fade-up">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t.marketTitle}</h2>
              <p className="text-slate-500">{t.marketDesc}</p>
            </div>
            <button className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 transition-colors px-4 py-2 rounded-lg hover:bg-sky-50">
              {t.moreBtn} <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md">
                <img 
                  src={`public/images/application/${(i % 4) + 1}.png`} 
                  alt={m} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold text-white mb-2">{m}</h3>
                    <div className="w-8 h-1 bg-sky-500 rounded-full mb-2 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 简约有力 */}
      <section className="py-20 bg-sky-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-600"></div>
        {/* 装饰圆 */}
        <div className="absolute -top-[50%] -right-[10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px]"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight">{t.ctaTitle}</h2>
          <button className="px-10 py-4 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300">
            {t.ctaBtn}
          </button>
        </div>
      </section>

      {/* CSS Animations */}
      <style>{`
        @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-ken-burns { animation: ken-burns 25s ease-out infinite alternate; }
        
        @keyframes slide-up-fade { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-slide-up-fade { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }
        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
