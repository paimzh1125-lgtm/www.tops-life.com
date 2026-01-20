import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Award, 
  Shield, 
  Globe, 
  Zap, 
  Target, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  CheckCheck,
  Factory
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { useTranslation } from 'react-i18next';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 子组件：数字滚动动画 ---
const AnimatedCounter = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, '');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericValue)) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        textContent: 0,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });
    return () => ctx.revert();
  }, [numericValue]);

  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="text-sky-400 mb-2 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-1 font-mono text-white">
        <span ref={ref}>{numericValue}</span>
        <span>{suffix}</span>
      </div>
      <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
};

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineSectionRef = useRef<HTMLDivElement>(null); 
  const timelineTrackRef = useRef<HTMLDivElement>(null);   
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { 
    setLoaded(true); 
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, []);

  // --- 核心动画逻辑 ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. 通用淡入上浮
      const fadeUps = gsap.utils.toArray(".gsap-fade-up");
      fadeUps.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // 2. 发展历程 - 仅桌面端启用 GSAP 横向滚动 (≥1024px)
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        const track = timelineTrackRef.current;
        if (!track) return;

        const scrollAmount = track.scrollWidth - window.innerWidth + 200; // 增加右侧余量

        gsap.to(track, {
          x: -scrollAmount, 
          ease: "none",
          scrollTrigger: {
            trigger: timelineSectionRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollAmount}`, 
            invalidateOnRefresh: true,
          }
        });
      });

      // 3. 底部 CTA 视差
      gsap.to("#cta-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#cta-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  return (
    <main ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">

      <SEO 
        title={t('about.metaTitle')} 
        description={t('about.metaDesc')} 
      />

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100 rounded-full mix-blend-multiply blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full mix-blend-multiply blur-[80px] opacity-60 -translate-x-1/3 -translate-y-1/3"></div>

        {/* 新增：背景纹理图片 (增加实业质感) */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-multiply grayscale">
            <img src="/images/industry1.jpg" alt="Background Texture" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-slate-50 z-0"></div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-sky-600 text-sm font-bold tracking-widest uppercase mb-6 border border-sky-200">
                {t('about.hero.subtitle')}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
                {t('about.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t('about.hero.desc')}
            </p>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-10 md:-mt-16">
        <div className="bg-slate-900 text-white py-12 rounded-3xl shadow-2xl shadow-sky-900/20 border border-slate-700/50 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                {(t('about.stats', { returnObjects: true }) as any[]).map((stat, idx) => (
                    <AnimatedCounter 
                        key={idx} 
                        value={stat.value} 
                        label={stat.label} 
                        icon={[<Award className="w-6 h-6" />, <Target className="w-6 h-6" />, <Globe className="w-6 h-6" />, <Shield className="w-6 h-6" />][idx]} 
                    />
                ))}
            </div>
        </div>
      </section>

      {/* 3. Main Introduction & Factory Collage */}
      <section className="container mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2 relative gsap-fade-up">
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry2.jpg" alt="Advanced Manufacturing" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry3.jpg" alt="Cleanroom" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry1.jpg" alt="R&D" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute bottom-0 right-0 bg-sky-600 text-white p-3 rounded-tl-xl">
                            <Factory size={20} />
                        </div>
                    </div>
                </div>
                <div className="absolute -z-10 -top-8 -left-8 w-full h-full border-2 border-slate-100 rounded-3xl"></div>
            </div>

            <div className="w-full lg:w-1/2 gsap-fade-up">
                <div className="flex items-center gap-2 mb-4">
                   <span className="w-10 h-[2px] bg-sky-500"></span>
                   <span className="text-sky-600 font-bold uppercase text-sm tracking-wider">Since 2011</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    {t('about.intro.title')}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 text-justify">
                    {t('about.intro.p1')}
                </p>
                <div className="bg-sky-50 p-8 rounded-2xl border border-sky-100/50 mb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-sky-600" /> {t('about.intro.coreTitle')}
                    </h3>
                    <ul className="space-y-4">
                        {(t('about.intro.coreItems', { returnObjects: true }) as string[]).map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium group">
                                <div className="w-6 h-6 rounded-full bg-white text-sky-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={14} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <Link to="/products">
                     <button className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-sky-600 transition-all shadow-xl hover:shadow-sky-200 active:scale-95">
                        {t('about.intro.btn')}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </button>
                </Link>
            </div>
        </div>
      </section>

      {/* 4. Timeline Section (白色背景修正版) */}
      <section id="timeline-section" ref={timelineSectionRef} className="py-24 bg-white overflow-hidden relative border-t border-slate-100">
         <div className="container mx-auto px-6 mb-12">
            <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">{t('about.timeline.title')}</h2>
                <p className="text-slate-500 text-lg">{t('about.timeline.subtitle')}</p>
            </div>
         </div>

         {/* 电脑端 (lg): Flex Row + GSAP Horizontal Scroll
            移动端 (default): Flex Column (垂直列表)
         */}
         <div 
            ref={timelineTrackRef}
            className="flex flex-col lg:flex-row gap-12 lg:gap-8 px-6 lg:px-24 w-full lg:w-max"
         >
            {(t('about.timeline.items', { returnObjects: true }) as any[]).map((item, i) => (
                <div key={i} className="flex-shrink-0 w-full lg:w-[450px] lg:pr-16 group">
                    {/* 时间轴线 (仅电脑端显示) */}
                    <div className="hidden lg:block w-full h-[1px] bg-slate-200 mb-8 relative">
                        <div className="absolute left-0 -top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-white shadow-sm group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    
                    {/* 卡片容器 (白底深色字) */}
                    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col shadow-sm">
                        
                        {/* 图片区域 (统一使用 industry2.jpg) */}
                        <div className="h-56 overflow-hidden relative">
                           <img 
                              src={["images/taoai.png", "images/injection.jpg", "images/yongai.jpg", "images/soy.jpg", "images/oversea.jpg"][i]} 
                              alt={item.title} 
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                           />
                           {/* 浅色渐变遮罩 */}
                           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                           
                           {/* 年份标签 */}
                           <div className="absolute bottom-4 left-4 text-4xl font-bold text-white tracking-widest drop-shadow-md">
                              {item.year}
                           </div>
                        </div>

                        {/* 文字内容区域 */}
                        <div className="p-8 flex-1 flex flex-col bg-white">
                            <h3 className="text-2xl font-bold mb-3 text-slate-900 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                    
                    {/* 移动端连接线 (仅手机显示) */}
                    <div className="lg:hidden w-1 h-12 bg-slate-100 mx-auto my-4 last:hidden"></div>
                </div>
            ))}
         </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-24 container mx-auto px-6 bg-slate-50">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t('about.values.title')}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* First Value Item */}
            <div className="gsap-fade-up bg-sky-600 p-10 rounded-[2rem] text-white hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-sky-200 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-white opacity-10 group-hover:opacity-20 transition-opacity transform scale-[2] rotate-12">
                   <Zap className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-8 backdrop-blur-sm">
                        <Zap className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t('about.values.items.0.title')}</h3>
                    <p className="text-sky-100 leading-relaxed text-lg">{t('about.values.items.0.desc')}</p>
                </div>
            </div>

            {/* Other Value Items */}
            {[1, 2].map((idx) => (
                <div key={idx} className="gsap-fade-up bg-white p-10 rounded-[2rem] hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group border border-slate-100">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${idx === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                        {idx === 1 ? <Target className="w-10 h-10" /> : <Heart className="w-10 h-10" />}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">
                        {t(`about.values.items.${idx}.title`)}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        {t(`about.values.items.${idx}.desc`)}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* 6. Certifications Section */}
      <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                  <div className="max-w-xl mb-8 md:mb-0">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('about.cert.title')}</h2>
                      <p className="text-slate-500 text-lg">{t('about.cert.desc')}</p>
                  </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                  {(t('about.cert.items', { returnObjects: true }) as any[]).map((item, idx) => (
                      <div key={idx} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                          <div className="w-24 h-24 shrink-0 bg-white rounded-xl overflow-hidden border border-slate-200 p-2">
                             <img src={["/banner/9001.jpg", "/banner/13485.jpg"][idx]} alt={item.title} loading="lazy" className="w-full h-full object-contain" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                              <p className="text-slate-500">{item.sub}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 7. Trust & CTA Section */}
      <section id="cta-section" className="relative py-32 bg-slate-900 overflow-hidden">
        <div id="cta-bg" className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
             style={{ 
               backgroundImage: 'url(/images/industry2.jpg)', 
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="lg:w-3/5 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        {t('about.cta.title')}
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                        {t('about.cta.desc')}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {(t('about.cta.certs', { returnObjects: true }) as string[]).map((cert, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white font-medium">
                                <CheckCheck className="w-4 h-4 text-sky-400" />
                                {cert}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-2/5 flex flex-col items-center">
                    <div className="inline-flex gap-6 mb-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <Shield className="w-16 h-16 text-sky-500" />
                        <Award className="w-16 h-16 text-sky-500" />
                        <Factory className="w-16 h-16 text-sky-500" />
                    </div>
                    <Link to="/contact" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-sky-600 rounded-full hover:bg-sky-500 hover:scale-105 shadow-[0_0_30px_rgba(2,132,199,0.5)]">
                            <span className="text-lg">{t('about.cta.btn')}</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
};

export default About;
