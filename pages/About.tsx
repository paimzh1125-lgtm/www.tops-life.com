import React, { useEffect, Suspense, lazy, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Beaker,
  Activity,
  Layers,
  PackageOpen,
  DraftingCompass,
  Sprout,
  TrendingUp,
  CheckCircle2,
  Globe2
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLanguage } from "../components/LanguageContext";

// 懒加载组件
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

// 模拟图片数据
const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`, 
}));

// 渐变文字组件 - 优化了渐变色值，更接近医疗科技蓝
const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 ${className}`}>
    {children}
  </span>
);

const LANG = {
  zh: {
    who: "关于我们",
    // 拆分公司名以便做样式区分
    companyPrefix: "苏州永爱",
    companySuffix: "生命科技有限公司",
    intro: "苏州永爱 Tops-Life 成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应等领域的创新型企业。公司在医疗行业、特种纸、油墨行业等多个领域的各类组件方面拥有丰富经验，生产流程与解决方案涵盖多元化产品及服务。秉持 “质量为先，服务市场与应用” 的理念，公司聚焦三大核心业务：洁净软包装、新材料及医疗器械。",
    more: "探索详情",
    stats: [
      { num: "15+", label: "年行业深耕" },
      { num: "100k", label: "级洁净车间" },
      { num: "50+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务解决方案",
    solutions: [
      {
        title: "医疗软包装解决方案",
        desc: "提供高性能无菌屏障系统。包括医用吸塑盒、特卫强(Tyvek)盖材及透析纸包装，确保全生命周期无菌安全。",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "精密医疗注塑件",
        desc: "依托全电动注塑工艺与 ISO 13485 体系，制造公差微米级的关键医疗零部件。广泛应用于微创手术器械。",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的革新性生物基材料。为纸张涂布、水性油墨及工业包装领域提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "技术实力",
    techDesc: "融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
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
  },
  en: {
    who: "Who We Are",
    companyPrefix: "Suzhou Tops Life",
    companySuffix: " Technology Co., Ltd.",
    intro: "Established in 2011, Suzhou Tops-Life is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials. We adhere to the philosophy of 'Quality First' to provide safer and more efficient solutions for global clients.",
    more: "Discover More",
    stats: [
      { num: "15+", label: "Years Exp." },
      { num: "100k", label: "Clean Class" },
      { num: "50+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Business Solutions",
    solutions: [
      {
        title: "Medical Soft Packaging",
        desc: "High-performance sterile barrier systems including blister packs and Tyvek lids, ensuring lifecycle safety.",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "Precision Injection Molding",
        desc: "Micron-level precision components manufactured under ISO 13485. Essential for surgical instruments.",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "Soy Protein Polymers",
        desc: "Innovative bio-based materials derived from non-GMO soy. A biodegradable green alternative.",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "Technical Strength",
    techDesc: "Integrating polymer science, materials engineering, and precision molding expertise.",
    slides: [
      { title: "Empowering Life Science", subtitle: "Building robust sterile barriers for the safety of every medical delivery." },
      { title: "Precision Redefined", subtitle: "Micron-level injection molding reshaping medical manufacturing standards." },
      { title: "Material Innovation", subtitle: "Leading the future of bio-based technology with sustainable polymer solutions." },
      { title: "Purity & Excellence", subtitle: "Strict controlled environments carrying the promise of superior quality." },
      { title: "Driven by Intelligence", subtitle: "Delivering trusted value globally with traceable manufacturing systems." },
    ],
    marketTitle: "Market Applications",
    market: ["Medical Devices", "Pharma", "Advanced Materials", "Bio Polymers"],
    cta: "Ready to start your next project?",
    ctaBtn: "Contact Us",
  },
};

export default function Home() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 优化动画：更平滑的上浮效果
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      // 视差效果优化
      const parallaxEls = document.querySelectorAll(".gsap-parallax");
      parallaxEls.forEach((el) => {
        gsap.to(el, {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 } // 增加 scrub 延迟，更顺滑
        });
      });
      
      // 数字增长动画
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        gsap.from(counter, {
          textContent: 0,
          duration: 1.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: counter, start: "top 85%" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); 

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* 动态背景装饰 (优化版) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-sky-100/30 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-50/40 rounded-full blur-[100px] animate-float [animation-delay:2s]"></div>
      </div>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden z-10">
        <Swiper 
          modules={[Autoplay, EffectFade, Pagination, Navigation]} 
          autoplay={{ delay: 6000, disableOnInteraction: false }} 
          effect="fade" 
          speed={1000} 
          loop 
          pagination={{ clickable: true, dynamicBullets: true }} 
          className="h-full w-full"
        >
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                {/* 图片层 */}
                <div className="absolute inset-0 bg-slate-900">
                  <img src={s.image} alt={t.slides[i].title} className="w-full h-full object-cover opacity-80 animate-ken-burns" />
                </div>
                {/* 渐变遮罩层 - 优化为更高级的深蓝渐变 */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-16">
                    <div className="overflow-hidden mb-6">
                      <div className="animate-slide-up-fade [animation-delay:100ms] inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-400/30 bg-sky-900/30 backdrop-blur-md text-sky-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-sky-900/20">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span> 
                        {language === 'zh' ? '创新 · 精密 · 关爱' : 'Innovation · Precision · Care'}
                      </div>
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up-fade [animation-delay:300ms]">
                      {t.slides[i].title.split("，")[0]}<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-100 to-white">
                        {t.slides[i].title.split("，")[1] || ""}
                      </span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10 font-light leading-relaxed animate-slide-up-fade [animation-delay:500ms] border-l-2 border-sky-500 pl-6">
                      {t.slides[i].subtitle}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 animate-slide-up-fade [animation-delay:700ms]">
                      <button className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-medium transition-all hover:shadow-[0_4px_20px_rgba(14,165,233,0.4)] flex items-center gap-2 group transform active:scale-95">
                        {t.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="px-8 py-4 bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white hover:text-sky-900 text-white rounded-full font-medium transition-all transform active:scale-95">
                        {language === 'zh' ? '联系我们' : 'Contact Us'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Intro Section - 优化重点：复刻参考图排版 */}
      <section className="relative py-24 lg:py-32 overflow-hidden z-10 bg-white">
        {/* 背景地图纹理装饰 */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none">
          <Globe2 className="w-full h-full text-sky-900" strokeWidth={0.5} />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* 左侧：图片组合 */}
          <div className="order-2 lg:order-1 relative gsap-fade-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img src="banner/3.jpg" alt="About Factory" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
              {/* 装饰性浮层 */}
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent pointer-events-none"></div>
            </div>
            {/* 浮动数据卡片 */}
            <div className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-50 animate-float max-w-xs z-20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-sky-50 rounded-full text-sky-600">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">2011</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Since Established</div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：文案内容 (重点优化区域) */}
          <div className="order-1 lg:order-2 gsap-fade-up">
            {/* 视觉引导线标题 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[2px] bg-sky-500"></div>
              <h2 className="text-sm font-bold text-sky-600 uppercase tracking-widest">{t.who}</h2>
            </div>
            
            {/* 复合标题：黑色 + 蓝色高亮 */}
            <h3 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 mb-8 leading-tight tracking-tight">
              {t.companyPrefix}<span className="text-sky-600">{t.companySuffix}</span>
            </h3>
            
            <p className="text-slate-600 text-lg leading-relaxed text-justify mb-8">
              <Suspense fallback="...">
                <RevealText text={t.intro} />
              </Suspense>
            </p>
            
            {/* 列表特性 */}
            <div className="flex flex-col gap-3 mb-8">
               <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-sky-500" /> <span>ISO 13485 质量体系认证</span>
               </div>
               <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 size={18} className="text-sky-500" /> <span>十万级洁净生产环境</span>
               </div>
            </div>

            {/* 数据统计行 */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                    <span className="counter-number">{stat.num.replace(/\D/g,'')}</span>
                    <span className="text-xl text-sky-500">{stat.num.replace(/\d/g,'')}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - 清爽风格 + 悬停效果 */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
            <div className="w-16 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up group relative bg-white rounded-[2rem] p-8 shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 border border-slate-100 hover:-translate-y-2 overflow-hidden">
                {/* 背景装饰圆 */}
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full group-hover:bg-sky-50 transition-colors duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg transition-transform duration-500 group-hover:rotate-6 ${
                    idx === 0 ? 'bg-gradient-to-br from-sky-400 to-blue-500' : 
                    idx === 1 ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : 
                    'bg-gradient-to-br from-emerald-400 to-teal-500'
                  }`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-8 min-h-[80px]">{item.desc}</p>
                  
                  <div className="flex items-center text-sm font-bold text-slate-300 group-hover:text-sky-600 transition-colors uppercase tracking-wider cursor-pointer">
                    {t.more} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Strength - 科技感增强 */}
      <section className="py-24 lg:py-32 bg-slate-900 text-white relative overflow-hidden z-10">
        {/* 背景科技线条 */}
        <div className="absolute inset-0 opacity-10">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0" stroke="white" strokeWidth="0.2" />
             <path d="M-20 100 L80 0" stroke="white" strokeWidth="0.2" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 gsap-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-sky-500/20 border border-sky-500/30 rounded-lg text-sky-400"><Beaker size={24} /></span>
                <span className="text-sky-400 font-bold tracking-widest uppercase">R&D Center</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                {t.tech} <span className="text-sky-500">.</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-10 border-l-4 border-sky-500 pl-6">{t.techDesc}</p>
              
              <div className="space-y-6">
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1 text-sky-400 group-hover:scale-110 transition-transform"><Activity /></div>
                  <div>
                    <h4 className="font-bold text-lg text-white">ISO 13485 Certified</h4>
                    <p className="text-sm text-slate-400 mt-1">Full compliance with international medical device standards.</p>
                  </div>
                </div>
                <div className="group flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1 text-cyan-400 group-hover:scale-110 transition-transform"><Layers /></div>
                  <div>
                    <h4 className="font-bold text-lg text-white">Class 100,000 Cleanroom</h4>
                    <p className="text-sm text-slate-400 mt-1">Controlled environment for sterile manufacturing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Visuals */}
            <div className="lg:col-span-7 relative h-[500px] gsap-fade-up">
               {/* 主图 */}
              <div className="absolute top-0 right-0 w-[85%] h-[80%] rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl z-10">
                 <img src="banner/4.jpg" className="w-full h-full object-cover" alt="Lab" />
                 <div className="absolute inset-0 bg-sky-900/20 mix-blend-overlay"></div>
              </div>
              {/* 次图 - 视差移动 */}
              <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl z-20 gsap-parallax">
                 <img src="banner/1.jpg" className="w-full h-full object-cover" alt="Production" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Application */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gsap-fade-up gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t.marketTitle}</h2>
              <p className="text-slate-500 max-w-lg">Covering key sectors in life sciences with high-standard solutions.</p>
            </div>
            <button className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:gap-3 transition-all">
              View All Industries <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500">
                <img src={`banner/${(i % 5) + 1}.jpg`} alt={m} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-2">{m}</h3>
                    <div className="w-8 h-1 bg-sky-500 rounded-full mb-3 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    <p className="text-slate-300 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      Professional solutions for {m}.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-sky-600">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-[50%] -left-[20%] w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/30 to-transparent rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-[50%] -right-[20%] w-[800px] h-[800px] bg-gradient-to-tl from-blue-800/40 to-transparent rounded-full blur-[100px]"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight drop-shadow-sm">{t.cta}</h2>
          <button className="px-12 py-5 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300">
            {t.ctaBtn}
          </button>
        </div>
      </section>

      {/* 全局样式补充 */}
      <style>{`
        @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-ken-burns { animation: ken-burns 25s ease-out infinite alternate; }
        
        @keyframes slide-up-fade { 
          0% { opacity: 0; transform: translateY(30px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-slide-up-fade { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes float { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(-20px) scale(1.05); } 
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
