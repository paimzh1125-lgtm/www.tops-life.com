import React, { useEffect, Suspense, lazy, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Activity,       // ISO/标准
  Layers,         // 洁净室
  PackageOpen,    // 软包装
  DraftingCompass,// 精密制造
  Sprout,         // 新材料
  CheckCircle2,   // 列表勾选
  Globe2,         // 背景装饰
  Microscope,     // 研发
  Award,          // 资质
  FileText,       // 增加：文档/规格书图标
  Phone           // 增加：电话图标
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLanguage } from "../components/LanguageContext";

// 懒加载组件
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

// 模拟 Hero Banner 图片数据 (保持原路径)
const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`, 
}));

// 语言包配置
const LANG = {
  zh: {
    who: "关于我们",
    companyPrefix: "永爱",
    companySuffix: "生命科技有限公司",
    intro: "永爱 Tops-Life 成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应等领域的创新型企业。公司在医疗行业、特种纸、油墨行业等多个领域的各类组件方面拥有丰富经验。秉持 “质量为先” 的理念，我们聚焦洁净软包装、精密注塑及生物基新材料三大核心业务，致力于为全球客户提供更安全、更环保、更高效的解决方案。",
    more: "探索详情",
    stats: [
      { num: "14+", label: "年行业经验" },
      { num: "10k", label: "级洁净车间" },
      { num: "50+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务板块",
    solutionsDesc: "以 ISO 13485 体系为基石，提供从材料研发到精密制造的一站式服务。",
    solutions: [
      {
        title: "医疗软包装解决方案",
        desc: "提供高性能无菌屏障系统，包括医用级吸塑盒与特卫强盖材，确保器械全生命周期无菌安全。",
        icon: <PackageOpen size={32} />,
        link: "#packaging"
      },
      {
        title: "精密医疗注塑",
        desc: "依托全电动注塑工艺与微米级模具技术，制造高精度医疗零部件，广泛应用于微创手术器械。",
        icon: <DraftingCompass size={32} />,
        link: "#molding"
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的革新性生物基材料，为工业包装及印刷领域提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
        link: "#biomaterial"
      }
    ],
    tech: "研发与技术实力",
    techDesc: "融合高分子科学、材料工程及精密成型专业知识，配备十万级洁净室及内部物理实验室。",
    slides: [
      { title: "赋能生命科学，筑造坚实无菌屏障", subtitle: "以高性能软包装解决方案，守护药品与医疗器械的每一次安全交付。" },
      { title: "微米级精密成型，重塑医疗制造标准", subtitle: "全流程 ISO 13485 认证，为关键医疗部件提供极致的稳定与精准。" },
      { title: "探索材料边界，引领生物基科技未来", subtitle: "源于自然的创新聚合物技术，为全球工业提供可持续的高性能方案。" },
      { title: "严苛洁净环境，承载卓越品质承诺", subtitle: "持续拓展制造能力边界，从容应对生命科学行业最严格的挑战。" },
      { title: "智造驱动未来，交付全球可信赖价值", subtitle: "构建透明、可追溯的质量体系，成为全球客户值得托付的长期伙伴。" },
    ],
    marketTitle: "应用领域",
    marketDesc: "深入洞察行业需求，覆盖生命科学与工业应用的关键领域。",
    market: ["医疗器械包装", "制药生产耗材", "工业环保材料", "生物基聚合物"],
    cta: "准备好开启下一个项目了吗？",
    ctaDesc: "我们的工程师团队随时准备为您提供技术咨询与样品支持。",
    ctaBtn: "联系我们",
  },
  en: {
    who: "About Us",
    companyPrefix: "Suzhou Tops Life",
    companySuffix: " Technology Co., Ltd.",
    intro: "Established in 2011, Suzhou Tops-Life is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials. With extensive experience across medical and specialty paper industries, we adhere to 'Quality First' philosophy to deliver safer, more efficient solutions globally.",
    more: "Discover More",
    stats: [
      { num: "14+", label: "Years Exp." },
      { num: "10k", label: "Clean Class" },
      { num: "50+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Solutions",
    solutionsDesc: "One-stop service from material R&D to precision manufacturing based on ISO 13485.",
    solutions: [
      {
        title: "Medical Soft Packaging",
        desc: "High-performance sterile barrier systems including blister packs and Tyvek lids, ensuring lifecycle safety.",
        icon: <PackageOpen size={32} />,
        link: "#packaging"
      },
      {
        title: "Precision Injection Molding",
        desc: "Micron-level precision components manufactured under ISO 13485. Essential for surgical instruments.",
        icon: <DraftingCompass size={32} />,
        link: "#molding"
      },
      {
        title: "Soy Protein Polymers",
        desc: "Innovative bio-based materials derived from non-GMO soy. A biodegradable green alternative.",
        icon: <Sprout size={32} />,
        link: "#biomaterial"
      }
    ],
    tech: "R&D Strength",
    techDesc: "Integrating polymer science, materials engineering, and precision molding expertise.",
    slides: [
      { title: "Empowering Life Science", subtitle: "Building robust sterile barriers for the safety of every medical delivery." },
      { title: "Precision Redefined", subtitle: "Micron-level injection molding reshaping medical manufacturing standards." },
      { title: "Material Innovation", subtitle: "Leading the future of bio-based technology with sustainable polymer solutions." },
      { title: "Purity & Excellence", subtitle: "Strict controlled environments carrying the promise of superior quality." },
      { title: "Driven by Intelligence", subtitle: "Delivering trusted value globally with traceable manufacturing systems." },
    ],
    marketTitle: "Market Applications",
    marketDesc: "Deep industry insights covering key areas of life sciences and industrial applications.",
    market: ["Medical Devices", "Pharma Production", "Eco Materials", "Bio Polymers"],
    cta: "Ready to start your next project?",
    ctaDesc: "Our engineering team is ready to provide technical consultation and samples.",
    ctaBtn: "Contact Us",
  },
};

export default function Home() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 淡入上浮效果 (Staggered Fade Up)
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { 
            trigger: el, 
            start: "top 85%",
            toggleActions: "play none none reverse" // 允许回滚时反向动画，或改为 "play none none none" 只播放一次
          },
        });
      });

      // 2. 视差效果 (Parallax)
      const parallaxEls = document.querySelectorAll(".gsap-parallax");
      parallaxEls.forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.2 }
        });
      });
      
      // 3. 数字滚动动画 (Counter Animation) - 修复 0 问题
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        // 获取原始数值 (例如 "15")
        const targetNum = parseInt(counter.textContent || "0", 10);
        
        gsap.from(counter, {
          textContent: 0, 
          duration: 2,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { 
            trigger: counter, 
            start: "top 90%",
            once: true // 关键：只执行一次，避免反复滚动看到 0
          },
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); 

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* 极简背景装饰 */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-sky-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-float"></div>
         <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-50/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-float [animation-delay:2s]"></div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <section className="h-screen relative overflow-hidden z-10">
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
                {/* 图片 */}
                <div className="absolute inset-0 bg-slate-900">
                  <img src={s.image} alt={t.slides[i].title} className="w-full h-full object-cover opacity-90 animate-ken-burns" />
                </div>
                {/* 渐变遮罩 - 优化可读性 */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-12">
                    {/* Tagline */}
                    <div className="overflow-hidden mb-6">
                      <div className="animate-slide-up-fade [animation-delay:100ms] inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/20 bg-sky-900/40 backdrop-blur-md text-sky-300 text-xs font-bold uppercase tracking-widest shadow-lg">
                         <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
                         {language === 'zh' ? '创新医疗科技合作伙伴' : 'Innovative MedTech Partner'}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up-fade [animation-delay:300ms]">
                      {t.slides[i].title.split("，")[0]}<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                        {t.slides[i].title.split("，")[1] || ""}
                      </span>
                    </h1>
                    
                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10 font-light leading-relaxed animate-slide-up-fade [animation-delay:500ms] border-l-4 border-sky-500 pl-6">
                      {t.slides[i].subtitle}
                    </p>
                    
                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 animate-slide-up-fade [animation-delay:700ms]">
                      <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-medium transition-all hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] flex items-center gap-2 group active:scale-95">
                        {t.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="relative py-24 lg:py-32 bg-white z-10 overflow-hidden">
        {/* 背景装饰：网格与地球 */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
           <Globe2 className="w-full h-full text-slate-900" strokeWidth={0.5} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* 左侧图片区 */}
          <div className="order-2 lg:order-1 relative gsap-fade-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white shadow-slate-200/50">
              <img src="banner/outsight.jpg" alt="Factory Environment" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000" />
            </div>
            
            {/* 浮动数据卡片 */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-white/95 backdrop-blur p-6 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-50 animate-float max-w-xs z-20 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-50 rounded-full text-sky-600">
                  <Award size={28} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">ISO 13485</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Certified Quality</div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧内容区 */}
          <div className="order-1 lg:order-2 gsap-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[3px] bg-sky-500 inline-block rounded-full"></span>
              <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">{t.who}</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 mb-6 leading-tight">
              {t.companyPrefix}<span className="text-sky-600">{t.companySuffix}</span>
            </h3>
            
            <p className="text-slate-600 text-[1.05rem] leading-[1.8] text-justify mb-8">
              <Suspense fallback="...">
                <RevealText text={t.intro} />
              </Suspense>
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
               <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 size={18} className="text-sky-500 shrink-0" /> <span>医疗级洁净车间</span>
               </div>
               <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CheckCircle2 size={18} className="text-sky-500 shrink-0" /> <span>全流程质量追溯</span>
               </div>
            </div>

            {/* 关键数据 - 修复 BUG */}
            <div className="flex gap-10 pt-8 border-t border-slate-100">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                    {/* 直接渲染数字，GSAP 会从 0 动画到这个数字 */}
                    <span className="counter-number">{stat.num.replace(/\D/g,'')}</span>
                    <span className="text-lg text-sky-500 ml-0.5">{stat.num.replace(/\d/g,'')}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTIONS SECTION ================= */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full"></div>
            <p className="mt-6 text-slate-500 text-lg">{t.solutionsDesc}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 border border-slate-100 hover:-translate-y-2 overflow-hidden flex flex-col">
                {/* 悬停背景装饰 */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50/50 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                
                <div className="relative z-10 flex-1">
                  {/* 图标 */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 ${
                      idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-indigo-600' : 'bg-teal-500'
                    }`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">{item.desc}</p>
                </div>

                <div className="relative z-10 pt-6 border-t border-slate-50 mt-auto">
                  <a href={item.link || "#"} className="flex items-center text-sm font-bold text-slate-400 group-hover:text-sky-600 transition-colors uppercase tracking-wider">
                    {t.more} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= R&D SECTION ================= */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0" stroke="white" strokeWidth="0.2" />
             <path d="M-20 100 L80 0" stroke="white" strokeWidth="0.2" />
             <rect x="0" y="0" width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 gsap-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-sky-500/20 border border-sky-500/30 rounded-lg text-sky-400"><Microscope size={24} /></span>
                <span className="text-sky-400 font-bold tracking-widest uppercase">R&D Center</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {t.tech} <span className="text-sky-500">.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 border-l-4 border-sky-500 pl-6">{t.techDesc}</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
                  <Activity className="text-sky-400 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-bold text-lg text-white">ISO 13485 Certified</h4>
                    <p className="text-sm text-slate-400">国际医疗器械质量管理体系认证</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default group">
                  <Layers className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                  <div>
                    <h4 className="font-bold text-lg text-white">Class 100,000 Cleanroom</h4>
                    <p className="text-sm text-slate-400">高标准洁净生产环境</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[450px] gsap-fade-up">
              <div className="absolute top-0 right-0 w-[90%] h-[85%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
                 <img src="banner/4.jpg" className="w-full h-full object-cover" alt="Lab Research" />
                 <div className="absolute inset-0 bg-sky-900/30 mix-blend-overlay"></div>
              </div>
              {/* 装饰浮层 - 实验室数据 */}
              <div className="absolute bottom-8 -left-4 w-[40%] bg-white text-slate-900 p-6 rounded-xl shadow-xl z-20 hidden md:block animate-float">
                 <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold text-sky-600">99.9%</span>
                    <Activity size={20} className="text-slate-300 mb-1"/>
                 </div>
                 <div className="text-sm font-bold text-slate-800">Quality Assurance</div>
                 <div className="w-full h-1 bg-slate-100 rounded-full mt-3 overflow-hidden">
                    <div className="h-full w-[99%] bg-sky-500"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MARKET APPLICATION ================= */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gsap-fade-up gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t.marketTitle}</h2>
              <p className="text-slate-500 max-w-lg">{t.marketDesc}</p>
            </div>
            <button className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:gap-3 transition-all px-4 py-2 rounded-lg hover:bg-sky-50">
              {language === 'zh' ? '查看所有行业' : 'View All Industries'} <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                {/* UPDATE: Image Path changed to /images/application1.png ... 
                   Ensuring paths match user request 
                */}
                <img 
                  src={`/images/application${i + 1}.png`} 
                  alt={m} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* 渐变层 */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{m}</h3>
                    <div className="w-10 h-1 bg-sky-500 rounded-full mb-3 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <p className="text-slate-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 leading-snug">
                       High standard solutions for {m}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 relative overflow-hidden bg-sky-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        {/* 动态背景 */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-600 to-blue-700 z-0"></div>
        <div className="absolute -top-[50%] -right-[10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px]"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-sm">{t.cta}</h2>
          <p className="text-sky-100 text-lg mb-10 max-w-2xl mx-auto">{t.ctaDesc}</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button className="px-10 py-4 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
               <Phone size={20} /> {t.ctaBtn}
             </button>
             <button className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-full text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
               <FileText size={20} /> {language === 'zh' ? '索取产品手册' : 'Get Brochure'}
             </button>
          </div>
        </div>
      </section>

      {/* CSS 动画定义 */}
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
          50% { transform: translateY(-15px); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
