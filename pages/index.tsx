import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, ShieldCheck, Leaf, Settings, Beaker, CheckCircle2 } from 'lucide-react';

/* ----------------------------- 样式引入 (保持路径不变) ----------------------------- */
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------- 内置简单版 RevealText (防止因缺少组件报错) ----------------------------- */
const RevealText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
  const el = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (el.current) {
      gsap.fromTo(el.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: delay, ease: "power3.out" }
      );
    }
  }, [text, delay]);

  return <div ref={el} className={className}>{text}</div>;
};

/* ----------------------------- 核心配置: 图片源 ----------------------------- */
// 为了确保图片必须加载出来，这里使用了 Unsplash 的在线图源。
// 如果你想用本地图片，请确保文件存在于 public/banner/ 目录下，然后改回 '/banner/1.jpg'
const rawSlides = [
  { id: 1, image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=2091' }, // 医疗/实验室
  { id: 2, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070' }, // 注塑/机械
  { id: 3, image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=2070' }, // 生物/试管
  { id: 4, image: 'https://images.unsplash.com/photo-1583912267655-7d2d34224c55?auto=format&fit=crop&q=80&w=2070' }, // 包装/盒子
  { id: 5, image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2080' }, // 显微镜
];

const labImage = 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2080'; // 底部实验室大图

/* ----------------------------- 文案配置 ----------------------------- */
const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生物科技有限公司",
    intro: "我们是一家以技术为驱动的国家高新技术企业，致力于为全球医疗行业提供安全、可靠的包装解决方案。",
    more: "了解更多",
    values: "核心优势",
    safety: "医疗级安全",
    safetyDesc: "符合最高医疗器械法规要求 (ISO/ASTM)。",
    sustainable: "可持续创新",
    sustainableDesc: "自主研发大豆蛋白生物基材料，引领绿色未来。",
    quality: "极致品质",
    qualityDesc: "ISO 13485 认证 + 万级洁净室 + 全流程可追溯。",
    tech: "卓越的技术实力",
    techDesc: "依托顶级研发团队和先进实验设备，确保每一份产品的品质。",
    lab1: "10万级洁净室生产环境",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      { title: "无菌 • 可靠 • 医疗安全", subtitle: "高性能软包装，为医疗安全提供保障。" },
      { title: "先进注塑成型技术", subtitle: "关键医用部件的精密制造。" },
      { title: "可持续生物材料", subtitle: "环保未来的材料解决方案。" },
      { title: "医疗软包装解决方案", subtitle: "满足全球法规要求的一站式方案。" },
      { title: "绿色生物材料新方向", subtitle: "可降解、可再生、性能优越。" },
    ],
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro: "A high-tech enterprise focusing on medical packaging, dedicated to providing safe and reliable solutions globally.",
    more: "Learn More",
    values: "Core Strengths",
    safety: "Medical-Grade Safety",
    safetyDesc: "Fully compliant with global medical regulations.",
    sustainable: "Sustainable Innovation",
    sustainableDesc: "Pioneering soy protein materials for a green future.",
    quality: "Ultimate Quality",
    qualityDesc: "ISO 13485 + Cleanroom + Full Traceability.",
    tech: "Technical Excellence",
    techDesc: "Top-level QA and R&D capacity ensuring product quality.",
    lab1: "Class 100,000 Cleanroom",
    lab2: "High-precision electric molding",
    lab3: "Complete laboratory testing system",
    slides: [
      { title: "Sterile • Reliable", subtitle: "High-performance packaging for healthcare." },
      { title: "Injection Molding", subtitle: "Precision for medical components." },
      { title: "Bio Materials", subtitle: "Green future solutions." },
      { title: "Packaging Solutions", subtitle: "Full-service global compliance." },
      { title: "Next-gen Biomaterials", subtitle: "Renewable, biodegradable." },
    ],
  },
};

/* ----------------------------- 增强型图片加载器 ----------------------------- */
// 即使网速慢，也会显示骨架屏；即使加载失败，也会显示背景色，防止白屏。
const ImageLoader = ({ src, alt, className, style }: any) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-900 ${className}`}>
      {/* 加载中状态 - 骨架屏 */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse z-0" />
      )}
      
      {/* 加载失败状态 - 优雅降级 */}
      {error && (
        <div className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center text-slate-500 z-0">
          <Beaker size={48} className="mb-2 opacity-20" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-1000 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
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
    <SwiperSlide>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {/* 图片层 */}
        <ImageLoader
          src={src}
          alt={text.title}
          className="absolute inset-0 w-full h-full"
          style={{
            animation: `kenZoom ${animDur}s ease-in-out infinite alternate`,
          }}
        />

        {/* 遮罩层 - 确保文字在任何图片上都清晰 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />

        {/* 内容层 */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4 md:px-6">
          <div className="max-w-5xl">
            <div className="overflow-hidden mb-4 md:mb-6">
              <RevealText
                text={text.title}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg tracking-tight"
              />
            </div>
            
            <div className="overflow-hidden">
              <RevealText
                text={text.subtitle}
                delay={0.3}
                className="text-lg md:text-2xl text-slate-200 font-light max-w-2xl mx-auto"
              />
            </div>

            <a 
              href="/about" 
              className="group inline-flex items-center gap-3 mt-10 md:mt-12 text-white bg-white/10 border border-white/20 px-8 py-3 rounded-full backdrop-blur-md hover:bg-white hover:text-[#40C4FF] transition-all duration-300"
            >
              <span className="font-medium tracking-wide">{text.cta}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
};

/* ----------------------------- 主页面组件 ----------------------------- */
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  // 使用 useMemo 缓存配置
  const t = useMemo(() => LANG[lang], [lang]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 自动检测浏览器语言
    if (typeof window !== 'undefined') {
      const l = navigator.language.startsWith('zh') ? 'zh' : 'en';
      setLang(l);
    }
  }, []);

  /* GSAP 动画上下文清理 (防止React StrictMode下的重复动画) */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 模块上浮动画
      gsap.fromTo(
        '.animate-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.animate-item',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={containerRef} className="bg-white text-slate-900 overflow-x-hidden font-sans">
      
      {/* 动态样式注入 */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.15); }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; width: 10px; height: 10px; }
        .swiper-pagination-bullet-active { background: #40C4FF !important; opacity: 1; transform: scale(1.2); }
      `}</style>

      {/* 语言切换悬浮球 */}
      <button
        onClick={() => setLang(prev => prev === 'zh' ? 'en' : 'zh')}
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-white/90 text-slate-800 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-slate-100 flex items-center gap-2 font-medium text-sm cursor-pointer"
      >
        <Globe size={18} className="text-[#40C4FF]" />
        <span>{lang === 'zh' ? 'English' : '中文'}</span>
      </button>

      {/* Banner Section */}
      <section className="h-screen w-full relative">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={1500}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true} // 确保 rawSlides 长度 >= 3 才能正常 loop
          pagination={{ clickable: true, dynamicBullets: true }}
          className="h-full w-full"
        >
          {rawSlides.map((s, i) => (
            <Slide 
              key={s.id} 
              src={s.image} 
              text={{ ...t.slides[i] || t.slides[0], cta: t.more }} 
              idx={i} 
            />
          ))}
        </Swiper>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 animate-item">
          <div className="inline-block px-3 py-1 bg-blue-50 text-[#40C4FF] text-sm font-bold rounded-full tracking-wider uppercase mb-2">
            {t.who}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">{t.company}</h2>
          <p className="text-lg text-slate-600 leading-relaxed border-l-4 border-[#40C4FF] pl-6">
            {t.intro}
          </p>
          <div className="pt-4">
            <a href="/about" className="inline-flex items-center gap-2 text-[#40C4FF] font-bold hover:gap-4 transition-all">
              {t.more} <ArrowRight size={20} />
            </a>
          </div>
        </div>

        <div className="animate-item flex justify-center relative">
          {/* 背景光晕 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-100 rounded-full blur-3xl -z-10" />
          
          <svg width="100%" height="100%" viewBox="0 0 420 420" className="max-w-[360px] text-[#40C4FF] overflow-visible">
            <circle cx="210" cy="210" r="200" strokeWidth="1" stroke="currentColor" opacity=".1" />
            <circle cx="210" cy="210" r="170" strokeWidth="2" stroke="currentColor" strokeDasharray="10 30" className="animate-spin-slow origin-center" opacity=".6" />
            <g transform="translate(160, 160)">
               <foreignObject width="100" height="100">
                  <div className="flex items-center justify-center h-full text-[#40C4FF]">
                    <Beaker size={80} strokeWidth={1.5} />
                  </div>
               </foreignObject>
            </g>
          </svg>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section className="py-24 bg-slate-50">
        <div className="text-center mb-16 animate-item px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.values}</h2>
          <div className="w-20 h-1 bg-[#40C4FF] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6">
          {[ 
            { Icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
            { Icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
            { Icon: Settings, title: t.quality, desc: t.qualityDesc }
          ].map((item, i) => (
            <div 
              key={i} 
              className="animate-item bg-white p-8 md:p-10 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 group"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#40C4FF] transition-colors duration-300">
                <item.Icon className="text-[#40C4FF] group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Strength Section */}
      <section className="py-24 md:py-32 bg-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-item space-y-8 order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.tech}</h2>
            <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>
            
            <ul className="space-y-5 mt-6">
              {[t.lab1, t.lab2, t.lab3].map((item, i) => (
                <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                  <CheckCircle2 className="text-[#40C4FF] shrink-0 mt-0.5" size={24} />
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-item relative order-1 lg:order-2">
            <div className="relative shadow-2xl rounded-2xl overflow-hidden aspect-[4/3]">
              <ImageLoader 
                src={labImage} 
                alt="Laboratory" 
                className="w-full h-full hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
