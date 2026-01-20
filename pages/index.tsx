import React, { useEffect, useRef, useMemo, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  PackageOpen,
  DraftingCompass,
  Sprout,
  CheckCircle2,
  Globe2,
  Microscope,
  Award,
  Activity,
  Layers,
  ShieldCheck,
  Calendar
} from "lucide-react";

// Data
import { ALL_NEWS } from "./News";
import SEO from "../components/SEO";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Typewriter Component (打字机组件) ---
const Typewriter = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "", 
  showCursor = true,
  onComplete 
}: { 
  text: string; 
  speed?: number; 
  delay?: number; 
  className?: string; 
  showCursor?: boolean;
  onComplete?: () => void;
}) => {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    setDisplay('');
    setStarted(false);
    const startTimeout = setTimeout(() => {
      setStarted(true);
      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          setDisplay(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(timer);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {display}
      {showCursor && started && display.length < text.length && (
        <span className="animate-pulse ml-1 inline-block w-1 h-[1em] bg-current align-middle opacity-80"></span>
      )}
    </span>
  );
};

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  
  // 0: Start, 1: Main Title Done, 2: Sub Title Done
  const [typingStage, setTypingStage] = useState(0);

  // 智能处理标题分行与渐变色逻辑 (优化：支持中英文逗号混用，更稳健)
  const heroTitleParts = useMemo(() => {
    const title = t('home.hero.title') || "";
    const parts = title.split(/,|，/);
    return {
      main: parts[0],
      sub: (parts[1] || "").trim() // 去除可能存在的多余空格
    };
  }, [t]);

  // Reset animation when language changes
  useEffect(() => {
    setTypingStage(0);
  }, [language]);

  // 按钮入场动画 (当副标题打字完成后触发)
  useEffect(() => {
    if (typingStage >= 2) {
      gsap.to(".hero-buttons", {
        y: 0, opacity: 1, duration: 0.8, delay: 0.5, ease: "power3.out"
      });
    } else {
      // 重置状态 (语言切换时)
      gsap.set(".hero-buttons", { y: 20, opacity: 0 });
    }
  }, [typingStage]);

  // GSAP Animations with Mobile Check
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use matchMedia to skip heavy animations on mobile
      const mm = gsap.matchMedia();

      // Hero Parallax Effect (视差滚动)
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 30, // 向下移动 30%
          ease: "none",
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      
      mm.add("(min-width: 768px)", () => {
        const fadeUps = document.querySelectorAll(".gsap-fade-up");
        fadeUps.forEach((el) => {
          gsap.fromTo(el, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { 
              trigger: el, 
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
          });
        });

        const counters = document.querySelectorAll(".counter-number");
        counters.forEach(counter => {
          gsap.from(counter, {
            textContent: 0,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: counter, start: "top 90%" },
          });
        });
      });
      
      // Simpler animations for mobile
      mm.add("(max-width: 767px)", () => {
        const fadeUps = document.querySelectorAll(".gsap-fade-up");
        fadeUps.forEach((el) => {
          gsap.fromTo(el, { opacity: 0 }, {
            opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); 

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* Dynamic SEO Management */}
      <SEO 
        title={t('home.metaTitle')} 
        description={t('home.metaDesc')} 
      />
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content"
        className="fixed top-0 left-0 p-3 bg-sky-600 text-white transform -translate-y-full transition-transform focus:translate-y-0 z-[100] outline-none ring-2 ring-white"
      >
        {t('home.skipLink')}
      </a>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-float"></div>
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-float [animation-delay:2s]"></div>
      </div>

      <main id="main-content">
        
        {/* === Hero Section (Static Image, Single Content) === */}
        {/* 1. 布局重构: min-h-[85vh], Flex 垂直居中 */}
        <section 
          id="hero-section"
          aria-labelledby="hero-heading" 
          className="relative min-h-[85vh] flex items-center overflow-hidden z-10"
        >
          {/* Static Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full">
              <img 
                ref={heroImageRef}
                src="banner/hero-bg.webp" 
                alt="Tops-Life Medical Packaging and Precision Manufacturing in Cleanroom" 
                className="w-full h-[120%] object-cover object-center" // 移除 opacity-90，由遮罩控制明暗
                fetchPriority="high"
              />
            </div>
            {/* 3. Banner 视觉提亮: 品牌色渐变遮罩 (Brand Gradient Overlay) */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-cyan-800/80 to-transparent mix-blend-multiply md:mix-blend-normal" />
          </div>

          {/* 1. 布局重构: Container 容器 + 左侧留白 */}
          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full py-20">
            <div className="max-w-4xl">
              
              {/* 3. 字体与排版: Tag (半透明描边风格) */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm text-white/90 text-[11px] font-bold uppercase tracking-[0.2em] shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
                  {t('home.heroTag')}
                </div>
              </div>
              
              {/* 3. 字体与排版: H1 (无衬线, Bold, 行高 1.2, 品牌色渐变) */}
              <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] text-white mb-8 min-h-[2.4em]">
                <span className="block mb-2 text-white">
                  <Typewriter 
                    text={heroTitleParts.main} 
                    speed={60} 
                    onComplete={() => setTypingStage(1)} 
                  />
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {typingStage >= 1 && (
                    <Typewriter 
                      text={heroTitleParts.sub} 
                      speed={60} 
                      onComplete={() => setTypingStage(2)} 
                    />
                  )}
                </span>
              </h1>
              
              {/* 3. 字体与排版: Subtitle (增加间距, 浅灰色) */}
              <div className="mt-8 mb-12 max-w-2xl min-h-[3.5em]">
                <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                  {typingStage >= 2 && (
                    <Typewriter 
                      text={t('home.hero.subtitle')} 
                      speed={20} 
                      showCursor={false} 
                    />
                  )}
                </p>
              </div>
              
              {/* 4. 按钮优化: 增加间距, 发光阴影, 毛玻璃效果 */}
              <div className="hero-buttons flex flex-wrap items-center gap-6 opacity-0">
                <Link 
                  to="/products"
                  className="px-8 py-4 bg-sky-600 text-white rounded-full font-semibold transition-all duration-300 hover:bg-sky-500 hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:-translate-y-1 flex items-center gap-2 active:scale-95"
                >
                  {t('home.more')} <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/contact"
                  className="px-8 py-4 border border-white/30 bg-white/5 backdrop-blur-md text-white rounded-full font-semibold transition-all duration-300 hover:bg-white/10 hover:border-white/60 flex items-center gap-2 active:scale-95"
                >
                  {t('home.ctaBtn')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="bg-white border-b border-slate-100 py-6 relative z-10 overflow-hidden" role="complementary" aria-label="Certifications">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><ShieldCheck className="text-sky-600" /> ISO 13485</div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><ShieldCheck className="text-sky-600" /> ISO 9001</div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><Activity className="text-sky-600" /> EcoVadis Silver</div>
            </div>
          </div>
        </div>

        {/* === About Section === */}
        <section aria-labelledby="about-title" className="relative py-24 lg:py-32 bg-white z-10 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
            <Globe2 className="w-full h-full text-slate-900" strokeWidth={0.5} />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative gsap-fade-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white shadow-slate-200/50">
                <img 
                  src="banner/outsight.jpg" 
                  loading="lazy" 
                  alt="Modern factory exterior showing the Tops-Life facility" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 to-transparent pointer-events-none"></div>
              </div>
              
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

            <div className="order-1 lg:order-2 gsap-fade-up">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[3px] bg-sky-500 inline-block rounded-full"></span>
                <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">{t('home.who')}</span>
              </div>
              
              <h2 id="about-title" className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 mb-8 leading-tight">
                {t('home.companyPrefix')}<span className="text-sky-600">{t('home.companySuffix')}</span>
              </h2>
              
              <p className="text-slate-600 text-[1.05rem] leading-[1.8] text-justify mb-8">
                {t('home.intro')}
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {(t('home.introPoints', { returnObjects: true }) as string[]).map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <CheckCircle2 size={18} className="text-sky-500 shrink-0" /> <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-slate-100">
                {(t('home.stats', { returnObjects: true }) as any[]).map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
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

        {/* === Solutions Section === */}
        <section aria-labelledby="solutions-title" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
              <h2 id="solutions-title" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t('home.solutionsTitle')}</h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full"></div>
              <p className="mt-6 text-slate-500">{t('home.solutionsDesc')}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {(t('home.solutions', { returnObjects: true }) as any[]).map((item, idx) => (
                <div key={idx} className="gsap-fade-up group [perspective:1000px] h-[400px]">
                  <Link 
                    to={["/products#packaging", "/products#molding", "/products#material"][idx]}
                    className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] block focus:outline-none"
                  >
                    {/* Front Face (正面：简洁大气) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center hover:shadow-xl hover:border-sky-200 transition-all duration-300">
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                      
                      <div className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg ${
                          idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-blue-600' : 'bg-cyan-500'
                        }`}>
                        {idx === 0 ? <PackageOpen size={32} /> : idx === 1 ? <DraftingCompass size={32} /> : <Sprout size={32} />}
                      </div>
                      
                      <h3 className="relative z-10 text-2xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <div className="relative z-10 mt-4 w-12 h-1 bg-slate-100 rounded-full group-hover:bg-sky-500 transition-colors duration-300"></div>
                    </div>

                    {/* Back Face (背面：深色详情) */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 rounded-3xl p-8 shadow-xl border border-slate-700 flex flex-col items-center justify-center text-center">
                      <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                      <p className="text-slate-300 leading-relaxed mb-8 text-sm line-clamp-5">{item.desc}</p>
                      
                      <div className="flex items-center text-sm font-bold text-sky-400 uppercase tracking-wider">
                        {t('home.more')} <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === R&D Strength Section (Unified Sky Palette) === */}
        <section aria-labelledby="rnd-title" className="py-24 lg:py-32 bg-white text-slate-900 relative overflow-hidden z-10">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0" stroke="#e2e8f0" strokeWidth="0.2" />
              <path d="M-20 100 L80 0" stroke="#e2e8f0" strokeWidth="0.2" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 gsap-fade-up">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 bg-sky-50 border border-sky-100 rounded-lg text-sky-600"><Microscope size={24} /></span>
                  <span className="text-sky-600 font-bold tracking-widest uppercase">R&D Center</span>
                </div>
                <h2 id="rnd-title" className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-slate-900">
                  {t('home.tech')} <span className="text-sky-500">.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-10 border-l-4 border-sky-500 pl-6">{t('home.techDesc')}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-default group">
                    <Activity className="text-sky-500 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">ISO 13485 Certified</h4>
                      <p className="text-sm text-slate-500">国际医疗器械质量管理体系</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-default group">
                    {/* Updated to sky-400 for consistency */}
                    <Layers className="text-sky-500 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">10,000 Class Cleanroom</h4>
                      <p className="text-sm text-slate-500">高标准洁净生产环境</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-[450px] gsap-fade-up">
                <div className="absolute top-0 right-0 w-[90%] h-[85%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
                  <img 
                      src="images/industry1.jpg" 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                      alt="Laboratory technicians working in a sterile environment" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'; }}
                  />
                  <div className="absolute inset-0 bg-sky-900/30 mix-blend-overlay"></div>
                </div>
                <div className="absolute bottom-8 -left-4 w-[40%] bg-white text-slate-900 p-6 rounded-xl shadow-xl z-20 hidden md:block animate-float">
                  <div className="text-3xl font-bold text-sky-600 mb-1">{t('home.qualityCard.rate')}</div>
                  <div className="text-sm font-bold text-slate-800">{t('home.qualityCard.title')}</div>
                  <div className="text-xs text-slate-500 mt-1">{t('home.qualityCard.desc')}</div>
                </div>
              </div>
            </div>
        </div>
      </section>

        {/* === Market Application === */}
        <section aria-labelledby="market-title" className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gsap-fade-up gap-4">
              <div>
                <h2 id="market-title" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t('home.marketTitle')}</h2>
                <p className="text-slate-500 max-w-lg">{t('home.marketDesc')}</p>
              </div>
              <Link 
                to="/products"
                className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:gap-3 transition-all px-4 py-2 rounded-lg hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {t('home.marketBtn')} <ArrowRight size={20} />
              </Link>
            </div>

            {/* 
              Layout Optimization: 
              - Grid: 1 column (mobile) -> 2 columns (md) -> 4 columns (lg) 
              - Card: White bg, shadow, rounded-xl (12px)
              - Hover: TranslateY -5px, shadow-xl
            */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t('home.market', { returnObjects: true }) as any[]).map((item, i) => (
                <Link 
                  key={i} 
                  className="gsap-fade-up group relative flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200 border border-slate-100"
                  to="/products"
                >
                  {/* Image Section (Top) */}
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={`images/application${i + 1}.png`} 
                      loading="lazy"
                      alt={`${item.title} application example`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'; }}
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300"></div>
                  </div>
                  
                  {/* Content Section (Bottom) */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#4B5563] text-sm leading-[1.6] flex-grow">
                      {item.desc}
                    </p>
                    
                    {/* Decorative Line */}
                    <div className="w-12 h-1 bg-slate-100 rounded-full mt-4 group-hover:bg-sky-500 transition-colors duration-300"></div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === Latest News === */}
        <section aria-labelledby="news-title" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-12 gsap-fade-up">
                <h2 id="news-title" className="text-3xl lg:text-4xl font-bold text-slate-900">{t('home.newsTitle')}</h2>
                <Link 
                  to="/news" 
                  className="text-sky-600 font-bold hover:gap-2 flex items-center gap-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-2 py-1"
                >
                  {t('home.newsBtn')} <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                {ALL_NEWS.map((news, i) => (
                  <Link 
                    key={news.id} 
                    to="/news"
                    className="gsap-fade-up min-w-[85vw] md:min-w-[380px] snap-center bg-white rounded-2xl p-8 border border-slate-100 hover:border-sky-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer focus-within:ring-4 focus-within:ring-sky-200 flex flex-col" 
                  >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-bold text-sky-500 bg-sky-50 px-3 py-1 rounded-full">
                          {language === 'zh' ? news.tag_zh : news.tag_en}
                        </span>
                        <time className="text-sm text-slate-400 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                            <Calendar size={14} aria-hidden="true" /> 
                            {news.year} {language === 'zh' ? news.dateLabel_zh : news.dateLabel_en}
                        </time>
                      </div>
                      <h3>
                        <div 
                          className="text-left text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2"
                        >
                          {language === 'zh' ? news.title_zh : news.title_en}
                        </div>
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mt-auto">
                        {language === 'zh' ? news.desc_zh : news.desc_en}
                      </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* === CTA Section === */}
        <section aria-labelledby="cta-title" className="py-20 relative overflow-hidden bg-sky-600">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-600 to-blue-600 z-0"></div>
          <div className="absolute -top-[50%] -right-[10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px]"></div>
          
          {/* 流光背景动画 */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine-flow"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
            <h2 id="cta-title" className="text-3xl md:text-5xl font-bold mb-8 tracking-tight drop-shadow-sm">{t('home.cta')}</h2>
            <Link 
              to="/contact"
              className="px-12 py-4 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {t('home.ctaBtn')}
            </Link>
          </div>
        </section>
      </main>

      <style>{`
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

        @keyframes shine-flow {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        .animate-shine-flow { animation: shine-flow 6s linear infinite; }

        /* 隐藏横向滚动条但保留滚动功能 */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Home;