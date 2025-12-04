import React, { useEffect, useState, Suspense, lazy, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, ShieldCheck, Leaf, Settings, Beaker, CheckCircle2 } from 'lucide-react';
// removed react-helmet (not supported in Vite)

/* 保持引用路径不变 */
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

import ParticleBackground from '../components/ParticleBackground';
const RevealText = lazy(() => import('../components/RevealText'));

gsap.registerPlugin(ScrollTrigger);

// 图片与文案配置（请确保 public/banner 下存在对应图片）
const rawSlides = [
  { id: 1, image: '/banner/1.jpg' },
  { id: 2, image: '/banner/2.jpg' },
  { id: 3, image: '/banner/3.jpg' },
  { id: 4, image: '/banner/4.jpg' },
  { id: 5, image: '/banner/5.jpg' },
];

const labImage = '/banner/5.jpg';

const LANG = {
  zh: {
    who: 'Who We Are',
    company: '苏州永爱生命科技有限公司',
    intro:
      '苏州永爱生命科技有限公司是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。',
    more: '了解更多',
    values: '核心价值观',
    safety: '安全',
    safetyDesc: '严格遵循最高医疗级规范，确保患者安全，符合监管要求。',
    sustainable: '环保',
    sustainableDesc: '可持续理念融入材料研发，提供生物基环保解决方案。',
    quality: '质量控制',
    qualityDesc: '遵循 ISO 9001 及 ISO 13485，确保生产稳定可控、可追溯。',
    tech: '技术实力',
    techDesc:
      '技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。',
    lab1: '10万级洁净室生产环境',
    lab2: '高精度全电动注塑设备',
    lab3: '完备的理化、微生物、生物相容性实验室',
    slides: [
      { title: '无菌。可靠。为医疗安全匠心打造。', subtitle: '高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。' },
      { title: '面向关键医用部件的先进注塑成型技术', subtitle: '通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。' },
      { title: '助力未来生物材料发展的可持续大豆蛋白', subtitle: '非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业。' },
      { title: '科研级生产环境', subtitle: '持续扩展制造能力，以满足生命科学行业严格要求。' },
      { title: '先进产线与质量体系', subtitle: '稳定、可追溯的质量体系，为全球客户提供高等级产品。' },
    ],
    market: ['医疗器械', '制药生产', '新材料', '大豆蛋白聚合物'],
    marketDesc: [
      '无菌包装、精密部件',
      '药品包装、阻隔薄膜',
      '环保生物材料',
      '纸张/纸板涂布、水性油墨',
    ],
  },
  en: {
    who: 'Who We Are',
    company: 'Suzhou Tops Life Technology Co., Ltd.',
    intro:
      'Suzhou Tops Life Technology Co., Ltd. is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials. We blend scientific expertise with advanced production systems to support the global life sciences industry.',
    more: 'Learn More',
    values: 'Core Values',
    safety: 'Safety',
    safetyDesc: 'Compliant with the highest medical standards to ensure patient safety.',
    sustainable: 'Sustainability',
    sustainableDesc: 'Sustainable, bio-based material solutions.',
    quality: 'Quality Control',
    qualityDesc: 'ISO 9001 and ISO 13485 certified, ensuring traceable processes.',
    tech: 'Technical Strength',
    techDesc:
      'Our technical team integrates polymer science, materials engineering and precision molding expertise, supported by cleanrooms, automated production lines and in-house R&D labs.',
    lab1: 'Class 100,000 Cleanroom',
    lab2: 'High-precision electric injection molding',
    lab3: 'Complete physico-chemical, microbiology and biocompatibility labs',
    slides: [
      { title: 'Sterile. Reliable.', subtitle: 'High-performance packaging ensuring safety across production.' },
      { title: 'Advanced Injection Molding', subtitle: 'ISO 13485 certified processes delivering precision and reliability.' },
      { title: 'Sustainable Biomaterials', subtitle: 'Non-GMO soy protein solutions for coatings and water-based inks.' },
      { title: 'Research-grade Manufacturing', subtitle: 'Expanding capabilities to meet strict life-science standards.' },
      { title: 'Advanced Production & Quality', subtitle: 'Stable, traceable systems delivering world-class products.' },
    ],
    market: ['Medical Devices', 'Pharmaceutical Manufacturing', 'Advanced Materials', 'Soy Protein Polymers'],
    marketDesc: [
      'Sterile packaging, precision components',
      'Pharmaceutical packaging, barrier films',
      'Eco-friendly biomaterials',
      'Paper/board coating, water-based inks',
    ],
  },
};

/* ----------------------------- ImageLoader ----------------------------- */
const ImageLoader = ({ src, alt, className = '', style = {} }: any) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && !error && <div className="absolute inset-0 bg-slate-200/40 animate-pulse z-0" />}
      {error && (
        <div className="absolute inset-0 bg-slate-200/40 flex items-center justify-center text-slate-500 z-0">Image Not Found</div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={style}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
};

/* ----------------------------- Slide 组件 ----------------------------- */
const Slide = ({ src, text, idx }: any) => {
  const animDur = 20 + idx * 2;

  return (
    <SwiperSlide key={idx}>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <ImageLoader
          src={src}
          alt={text.title}
          className="absolute inset-0 w-full h-full"
          style={{ animation: `kenZoom ${animDur}s ease-in-out infinite alternate` }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70 z-10" />

        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 md:px-6">
          <div className="max-w-5xl">
            <Suspense fallback={<h1 className="text-white text-4xl md:text-6xl font-bold opacity-0 animate-fade-in">{text.title}</h1>}>
              <div className="overflow-hidden mb-4 md:mb-6">
                <RevealText tag="h1" text={text.title} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg tracking-tight" />
              </div>
              <div className="overflow-hidden">
                <RevealText tag="p" text={text.subtitle} delay={0.4} className="text-lg md:text-2xl text-slate-200 font-light max-w-2xl mx-auto" />
              </div>
            </Suspense>

            <a href="/about" className="group inline-flex items-center gap-3 mt-10 md:mt-12 text-white bg-white/10 border border-white/20 px-8 py-3 rounded-full backdrop-blur-md hover:bg-white hover:text-blue-600 transition-all duration-300">
              <span className="font-medium tracking-wide">{text.cta}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

/* ----------------------------- 主页面 ----------------------------- */
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [slides] = useState(rawSlides);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const l = navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en';
      setLang(l as 'zh' | 'en');
    }
  }, []);

  const t = useMemo(() => LANG[lang], [lang]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.animate-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: '.animate-item', start: 'top 85%' },
        }
      );

      gsap.to('.animate-spin-slow', { rotation: 360, duration: 20, repeat: -1, ease: 'linear' });
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={containerRef} className="bg-white text-slate-900 overflow-x-hidden relative">
      <Helmet>
        <title>{lang === 'zh' ? '苏州永爱生命科技有限公司' : 'Suzhou Tops Life Technology Co., Ltd.'}</title>
        <meta name="description" content={lang === 'zh' ? '医用软包装、精密注塑及大豆蛋白新材料制造商。' : 'Manufacturer specializing in medical soft packaging, precision injection molding, and soy-protein biomaterials.'} />
      </Helmet>

      <style>{`
        @keyframes kenZoom { 0% { transform: scale(1.0); } 100% { transform: scale(1.15); } }
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #40C4FF !important; opacity: 1; transform: scale(1.2); }
      `}</style>

      <ParticleBackground />

      <button onClick={() => setLang(prev => (prev === 'zh' ? 'en' : 'zh'))} className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-white/90 text-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm border border-slate-100 flex items-center gap-2 font-medium text-sm">
        <Globe size={18} className="text-[#40C4FF]" />
        <span>{lang === 'zh' ? 'English' : '中文'}</span>
      </button>

      {/* NAV */}
      <nav className="absolute top-0 left-0 w-full z-50 py-5 px-8 flex items-center justify-between">
        <div className="font-bold text-lg text-slate-900">TOPS LIFE</div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#" className="text-slate-700 hover:text-[#40C4FF]">{lang === 'zh' ? '首页' : 'Home'}</a>
          <a href="#" className="text-slate-700 hover:text-[#40C4FF]">{lang === 'zh' ? '产品中心' : 'Products'}</a>
          <a href="#" className="text-slate-700 hover:text-[#40C4FF]">{lang === 'zh' ? '关于我们' : 'About'}</a>
          <a href="#" className="text-slate-700 hover:text-[#40C4FF]">{lang === 'zh' ? '联系我们' : 'Contact'}</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="h-screen w-full relative">
        <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" fadeEffect={{ crossFade: true }} speed={1000} autoplay={{ delay: 6000, disableOnInteraction: false }} loop pagination={{ clickable: true, dynamicBullets: true }} className="h-full w-full">
          {slides.map((s, i) => (
            <Slide key={s.id} src={s.image} text={{ ...t.slides[i] || t.slides[0], cta: t.more }} idx={i} />
          ))}
        </Swiper>
      </section>

      {/* Who we are */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-item">
          <div className="inline-block px-3 py-1 bg-blue-50 text-[#40C4FF] text-sm font-bold rounded-full tracking-wider uppercase mb-2">{t.who}</div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">{t.company}</h2>
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#40C4FF] pl-6">{t.intro}</p>
          <div className="pt-4"><a href="/about" className="inline-flex items-center gap-2 text-[#40C4FF] font-bold hover:gap-4 transition-all">{t.more} <ArrowRight size={20} /></a></div>
        </div>

        <div className="animate-item flex justify-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-50 rounded-full blur-3xl -z-10" />
          <svg width="100%" height="100%" viewBox="0 0 420 420" className="max-w-[360px] text-[#40C4FF] overflow-visible">
            <circle cx="210" cy="210" r="200" strokeWidth="1" stroke="currentColor" opacity=".1" />
            <circle cx="210" cy="210" r="170" strokeWidth="2" stroke="currentColor" strokeDasharray="10 30" className="animate-spin-slow origin-center" opacity=".6" />
            <circle cx="210" cy="210" r="140" strokeWidth="1" stroke="currentColor" opacity=".2" />
            <g transform="translate(160, 160)">
              <foreignObject width="100" height="100">
                <div className="w-full h-full flex items-center justify-center text-[#40C4FF]"><Beaker size={80} strokeWidth={1.5} /></div>
              </foreignObject>
            </g>
            <circle cx="210" cy="40" r="6" fill="currentColor" className="animate-pulse" />
            <circle cx="380" cy="210" r="4" fill="currentColor" className="animate-pulse" style={{ animationDelay: '1s' }} />
          </svg>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-50">
        <div className="text-center mb-16 animate-item px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.values}</h2>
          <div className="w-20 h-1 bg-[#40C4FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {[
            { Icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
            { Icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
            { Icon: Settings, title: t.quality, desc: t.qualityDesc },
          ].map((item, i) => (
            <div key={i} className="animate-item bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#40C4FF] transition-colors duration-300">
                <item.Icon className="text-[#40C4FF] group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Applications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-2xl font-semibold text-center mb-8">{lang === 'zh' ? '市场应用' : 'Market Applications'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((title, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-white/3 hover:bg-white/5 transition-all duration-200">
                <div className="text-3xl mb-2">{["🩺", "💊", "⚗️", "🌱"][idx]}</div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm opacity-90 mt-1">{t.marketDesc[idx]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Strength */}
      <section className="py-24 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-item space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.tech}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>

            <ul className="space-y-5 mt-6">
              {[t.lab1, t.lab2, t.lab3].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-[#40C4FF]/30 transition-colors">
                  <CheckCircle2 className="text-[#40C4FF] shrink-0 mt-0.5" size={24} />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-item relative group">
            <div className="absolute -inset-4 bg-[#40C4FF]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative shadow-2xl rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageLoader src={labImage} alt="Laboratory" className="w-full h-full hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Callout */}
      <section className="py-20 bg-[#0B1120] text-white text-center">
        <div className="max-w-4xl mx-auto px-6 animate-item">
          <h2 className="text-3xl font-bold mb-6">{t.company}</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{lang === 'zh' ? '致力于生命科学领域的创新与发展' : 'Dedicated to innovation and development in life sciences'}</p>
          <a href="/contact" className="inline-block bg-[#40C4FF] text-white px-8 py-3 rounded-full font-bold hover:bg-[#33b1e8] transition-colors">{lang === 'zh' ? '联系我们' : 'Contact Us'}</a>
        </div>
      </section>
    </div>
  );
}
