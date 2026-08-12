
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
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
import { ALL_NEWS } from "../newsData";
import SEO from "../components/SEO";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  
  // 智能处理标题分行与渐变色逻辑 (优化：支持中英文逗号混用，更稳健)
  const heroTitleParts = useMemo(() => {
    const title = t('home.hero.title') || "";
    const parts = title.split(/,|，/);
    return {
      main: parts[0],
      sub: (parts[1] || "").trim() // 去除可能存在的多余空格
    };
  }, [t]);

  // SEO: Organization Structured Data (JSON-LD)
  const organizationSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",




















      "name": "TopsLife",
      "url": "https://www.tops-life.com",
      "logo": "https://www.tops-life.com/banner/logo.png"
    };


  }, []);
  // GSAP Animations with Mobile Check
  useEffect(() => {
    const ctx = gsap.context(() => {





      // 使用 fromTo 明确控制，配合 CSS 的 visibility: hidden 防止初始闪烁
      gsap.fromTo(".hero-content-animate",
        { y: 20, opacity: 0 },

        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Hero Parallax Effect (视差滚动)
      if (heroImageRef.current) {
        gsap.to(heroImageRef.current, {

          yPercent: 20, // 向下移动 20%
          ease: "none",
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
      
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {



        gsap.utils.toArray<HTMLElement>(".gsap-fade-up").forEach((el) => {
          gsap.fromTo(el, { y: 40, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { 
              trigger: el, 

              start: "top 90%",
              toggleActions: "play none none reverse"
            },
          });
        });











      });












    }, containerRef);
    return () => ctx.revert();

  }, []);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* Dynamic SEO Management */}
      <SEO 
        title={t('home.metaTitle')} 
        description={t('home.metaDesc')} 
      />
      <Helmet>
        {/* LCP 核心优化：预加载首屏大图 */}
        <link rel="preload" as="image" href="/banner/hero-bg.webp" fetchpriority="high" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      














      <main id="main-content">




        {/* === Hero Section (CLS 修复：稳定宽高比) === */}
        <section 
          id="hero-section"
          aria-labelledby="hero-heading" 

          className="relative h-[75vh] md:h-[85vh] lg:h-[90vh] flex items-center overflow-hidden z-10 bg-slate-900"
        >
          {/* Static Background */}


          <div className="absolute inset-0 z-0 overflow-hidden">
              <picture>
                <source media="(max-width: 768px)" srcSet="/banner/hero-mobile.webp" />
                <img 
                  ref={heroImageRef}
                  src="/banner/hero-bg.webp" 
                  alt={t('alt.hero_factory')} 

                className="w-full h-full object-cover object-center will-change-transform"
                  fetchPriority="high"
                  loading="eager"



                width="1920"
                height="1080"
                />
              </picture>

            {/* 3. Banner 视觉提亮: 品牌色渐变遮罩 (Brand Gradient Overlay) */}

            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>



          <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
            <div className="max-w-4xl">
              




              <div className="hero-content-animate opacity-0">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-white/90 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                  {t('home.heroTag')}
                </div>
              </div>
              







              <h1 id="hero-heading" className="hero-content-animate text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-8 opacity-0">
                <span className="block mb-2">{heroTitleParts.main}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">
                  {heroTitleParts.sub}
                </span>
              </h1>
              



              <p className="hero-content-animate text-lg md:text-xl text-slate-200 font-light leading-relaxed mb-12 max-w-2xl opacity-0">
                  {t('home.hero.subtitle')}
                </p>




              <div className="hero-content-animate flex flex-wrap items-center gap-6 opacity-0">
                <Link 
                  to="/products"

                  className="px-8 py-4 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-500 shadow-lg shadow-sky-900/20 transition-all"
                >

                  {t('home.more')}
                </Link>
                <Link 
                  to="/contact"

                  className="px-8 py-4 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all"
                >
                  {t('home.ctaBtn')}
                </Link>
              </div>
            </div>
          </div>
        </section>








        {/* Trust Strip (CLS 修复：显式高度) */}
        <div className="bg-white border-b border-slate-100 py-8 min-h-[80px] flex items-center" role="complementary" aria-label="Certifications">
          <div className="max-w-7xl mx-auto px-6 w-full text-center">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-50">
                <div className="flex items-center gap-2 text-slate-900 font-bold"><ShieldCheck size={20} className="text-sky-600" /> ISO 13485</div>
                <div className="flex items-center gap-2 text-slate-900 font-bold"><ShieldCheck size={20} className="text-sky-600" /> ISO 9001</div>
                <div className="flex items-center gap-2 text-slate-900 font-bold"><Activity size={20} className="text-sky-600" /> EcoVadis Silver</div>
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
                  alt={t('alt.about_factory')} 

                  className="w-full h-auto object-cover"
                  width="800"
                  height="600"
                />

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







                    </div>

                  </div>




        </section>


        {/* === Solutions Section (CLS 修复：固定宽高比容器) === */}
        <section aria-labelledby="solutions-title" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
              <h2 id="solutions-title" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t('home.solutionsTitle')}</h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full"></div>

            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {(t('home.solutions', { returnObjects: true }) as any[]).map((item, idx) => (












                <div key={idx} className="gsap-fade-up min-h-[400px]">
                  <div className="bg-white rounded-3xl p-10 h-full border border-slate-100 hover:shadow-xl transition-all group">
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-8 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                        {idx === 0 ? <PackageOpen size={32} /> : idx === 1 ? <DraftingCompass size={32} /> : <Sprout size={32} />}
                      </div>



                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>








                      </div>



              ))}
            </div>


















                </div>








































































































        </section>



































































      </main>

      <style>{`



        .hero-content-animate {
          will-change: transform, opacity;
        }





        img {
          content-visibility: auto;
        }





        h1, h2 {
          text-rendering: optimizeLegibility;
          font-display: swap;
        }





        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }





        .animate-float { animation: float 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Home;
