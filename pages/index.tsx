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
  PackageOpen,
  DraftingCompass,
  Sprout,
  CheckCircle2,
  TrendingUp
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 保持原有组件引入
import ParticleBackground from "../components/ParticleBackground";
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `banner/${id}.jpg`, // 确保你有这些图片，或者替换为占位符
}));

// --- 增加一点渐变色文字组件 ---
const GradientText = ({ children, className = "" }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 ${className}`}>
    {children}
  </span>
);

const LANG = {
  zh: {
    nav: ["首页", "关于我们", "解决方案", "研发实力", "联系"],
    who: "关于我们",
    company: "苏州永爱生命科技有限公司",
    intro: "苏州永爱生命科技有限公司是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。",
    more: "探索详情",
    values: "核心价值观",
    stats: [
      { num: "15+", label: "年行业经验" },
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
    ctaBtn: "联系我们要约",
  },
  en: {
    nav: ["Home", "About", "Solutions", "R&D", "Contact"],
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro: "A technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials.",
    more: "Discover More",
    values: "Core Values",
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
  const [lang, setLang] = useState("zh");
  const t = LANG[lang];
  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动以改变导航栏样式
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 通用淡入上浮
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // 视差效果 (Parallax)
      const parallaxEls = document.querySelectorAll(".gsap-parallax");
      parallaxEls.forEach((el) => {
        gsap.to(el, {
          y: -50,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 }
        });
      });
      
      // 数字增长动画 (简单模拟)
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        const raw = counter.innerText;
        // 这里只是简单的触发，如果需要真实数字增长可以使用 countup.js
        gsap.from(counter, {
          textContent: 0,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          stagger: 1,
          scrollTrigger: { trigger: counter, start: "top 85%" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* Dynamic Background Blobs (增加背景丰富度) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] mix-blend-multiply animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] mix-blend-multiply animate-float [animation-delay:2s]"></div>
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-cyan-100/30 rounded-full blur-[80px] mix-blend-multiply animate-float [animation-delay:4s]"></div>
      </div>

      {/* Floating Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className={`font-bold text-2xl tracking-tighter ${scrolled ? "text-slate-900" : "text-white"} transition-colors`}>
            TOPS LIFE <span className="text-blue-500">TECH</span>
          </div>
          
          <div className="hidden md:flex gap-8 items-center">
            {t.nav.map((item, i) => (
              <a key={i} href="#" className={`text-sm font-medium hover:text-blue-500 transition-colors ${scrolled ? "text-slate-600" : "text-white/90"}`}>{item}</a>
            ))}
            <button onClick={() => setLang(lang === "zh" ? "en" : "zh")} className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${scrolled ? "border-slate-200 bg-slate-100 text-slate-900" : "border-white/30 bg-white/10 text-white backdrop-blur-sm"}`}>
              <Globe size={14} /> {lang === "zh" ? "EN" : "中"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="h-screen relative overflow-hidden z-10">
        <Swiper modules={[Autoplay, EffectFade, Pagination, Navigation]} autoplay={{ delay: 6000 }} effect="fade" speed={1200} loop pagination={{ clickable: true }} className="h-full w-full">
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-slate-900">
                  <img src={s.image} alt={t.slides[i].title} className="w-full h-full object-cover opacity-80 animate-ken-burns" />
                </div>
                {/* 叠加更高级的渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-20">
                    <div className="overflow-hidden mb-4">
                      <div className="animate-slide-up-fade [animation-delay:100ms] inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-md text-blue-300 text-xs font-bold uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span> {lang === 'zh' ? '创新医疗科技' : 'Innovative MedTech'}
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up-fade [animation-delay:300ms]">
                      {t.slides[i].title.split("，")[0]}<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
                        {t.slides[i].title.split("，")[1] || ""}
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-light leading-relaxed animate-slide-up-fade [animation-delay:500ms]">
                      {t.slides[i].subtitle}
                    </p>
                    <div className="flex gap-4 animate-slide-up-fade [animation-delay:700ms]">
                      <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] flex items-center gap-2 group">
                        {t.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="px-8 py-4 bg-white/5 border border-white/20 backdrop-blur-md hover:bg-white hover:text-slate-900 text-white rounded-full font-medium transition-all">
                        {lang === 'zh' ? '联系我们' : 'Contact Us'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Intro Section - 破格布局 */}
      <section className="relative py-24 lg:py-32 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative gsap-fade-up">
            {/* 装饰性背景框 */}
            <div className="absolute -top-10 -left-10 w-2/3 h-full border-[12px] border-slate-100 rounded-3xl -z-10"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img src="banner/3.jpg" alt="About" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              {/* 悬浮数据卡片 */}
              <div className="absolute bottom-6 right-6 lg:-right-10 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/50 max-w-xs animate-float">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-blue-100 rounded-full text-blue-600"><TrendingUp size={24} /></div>
                  <div>
                    <div className="text-sm text-slate-500 uppercase font-bold tracking-wider">Quality Rate</div>
                    <div className="text-2xl font-bold text-slate-900">99.9%</div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-snug">Continuous improvement in every single production step.</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 gsap-fade-up">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">{t.who}</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {t.company.substring(0, 4)}<GradientText>{t.company.substring(4)}</GradientText>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              <Suspense fallback="...">
                <RevealText text={t.intro} />
              </Suspense>
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 counter-number">{stat.num}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - Bento Grid Style */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up group relative p-1 rounded-3xl bg-gradient-to-b from-white to-slate-50 hover:from-blue-100 hover:to-blue-50 transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
                <div className="bg-white h-full rounded-[20px] p-8 relative overflow-hidden z-10 flex flex-col">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : idx === 1 ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-1">{item.desc}</p>
                  
                  <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                    {t.more} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Strength - Dark Mode Section (反差设计) */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden z-10">
        {/* Abstract Background Tech Lines */}
        <div className="absolute inset-0 opacity-10">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0" stroke="white" strokeWidth="0.5" />
             <path d="M0 80 L80 0" stroke="white" strokeWidth="0.5" />
             <path d="M20 100 L100 20" stroke="white" strokeWidth="0.5" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 gsap-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-blue-600 rounded-lg"><Beaker size={24} className="text-white" /></span>
                <span className="text-blue-400 font-bold tracking-widest uppercase">R&D Center</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">{t.tech}</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 border-l-2 border-blue-600 pl-6">{t.techDesc}</p>
              
              <div className="space-y-6">
                {/* Tech Highlights */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1 text-blue-400"><Activity /></div>
                  <div>
                    <h4 className="font-bold text-lg">ISO 13485 Certified</h4>
                    <p className="text-sm text-slate-400 mt-1">Full compliance with international medical device standards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="mt-1 text-teal-400"><Layers /></div>
                  <div>
                    <h4 className="font-bold text-lg">Class 100,000 Cleanroom</h4>
                    <p className="text-sm text-slate-400 mt-1">Controlled environment for sterile manufacturing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Visuals - Collage */}
            <div className="lg:col-span-7 relative h-[500px] gsap-fade-up">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl z-10 gsap-parallax">
                 <img src="banner/4.jpg" className="w-full h-full object-cover" alt="Lab" />
                 <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden border-4 border-slate-700 shadow-2xl z-20">
                 <img src="banner/1.jpg" className="w-full h-full object-cover" alt="Production" />
              </div>
              {/* Decorative Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-600/80 blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Application - Carousel or Cards */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12 gsap-fade-up">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{t.marketTitle}</h2>
              <p className="text-slate-500">Covering key sectors in life sciences and beyond.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:gap-4 transition-all">
              View All Industries <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                <img src={`banner/${(i % 5) + 1}.jpg`} alt={m} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-10 h-1 bg-blue-500 mb-4 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                    <h3 className="text-2xl font-bold text-white mb-2">{m}</h3>
                    <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 translate-y-2 group-hover:translate-y-0">
                      Providing specialized solutions for {m} with high standards of safety and efficiency.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">{t.cta}</h2>
          <button className="px-10 py-4 bg-white text-blue-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-100 hover:scale-105 transition-all duration-300">
            {t.ctaBtn}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-white font-bold text-2xl tracking-tight mb-6">TOPS LIFE <span className="text-blue-500">TECH</span></div>
            <p className="max-w-sm mb-6">{t.intro}</p>
            <div className="flex gap-4">
               {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"><Globe size={18}/></div>)}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-3">
              {t.solutions.map((s,i) => <li key={i} className="hover:text-blue-400 cursor-pointer transition-colors">{s.title}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>Suzhou, China</li>
              <li>info@topslife.com</li>
              <li>+86 512 1234 5678</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} {t.company}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>

      {/* Styles for Animations */}
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
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
