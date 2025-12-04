import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Globe, ShieldCheck, Leaf, Settings, Beaker } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

// Lazy component
const RevealText = lazy(() => import('@/components/RevealText'));

/* ----------------------------- 配置 ----------------------------- */
const rawSlides = [
  { id: 1, image: '/banner/1.jpg' },
  { id: 2, image: '/banner/2.jpg' },
  { id: 3, image: '/banner/3.jpg' },
  { id: 4, image: '/banner/4.jpg' },
  { id: 5, image: '/banner/5.jpg' },
];

const labImage = '/banner/5.jpg';

/* ----------------------------- 文案 ----------------------------- */
const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生物科技有限公司",
    intro: "我们是一家以技术为驱动的国家高新技术企业...",
    more: "了解更多",
    values: "核心优势",
    safety: "医疗级安全",
    safetyDesc: "符合最高医疗器械法规要求。",
    sustainable: "可持续创新",
    sustainableDesc: "自主研发大豆蛋白生物基材料。",
    quality: "极致品质",
    qualityDesc: "ISO 13485 + 洁净室 + 全流程可追溯。",
    tech: "卓越的技术实力",
    techDesc: "顶级团队和实验设备保障品质。",
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
    intro: "A high-tech enterprise focusing on medical packaging...",
    more: "Learn More",
    values: "Core Strengths",
    safety: "Medical-Grade Safety",
    safetyDesc: "Fully compliant with global medical regulations。",
    sustainable: "Sustainable Innovation",
    sustainableDesc: "Pioneering soy protein materials。",
    quality: "Ultimate Quality",
    qualityDesc: "ISO 13485 + Cleanroom + Traceability。",
    tech: "Technical Excellence",
    techDesc: "Top-level QA and R&D capacity。",
    lab1: "Class 100,000 Cleanroom",
    lab2: "High-precision molding",
    lab3: "Complete laboratory system",
    slides: [
      { title: "Sterile • Reliable", subtitle: "High-performance packaging for healthcare。" },
      { title: "Injection Molding", subtitle: "Precision for medical components。" },
      { title: "Bio Materials", subtitle: "Green future solutions。" },
      { title: "Packaging Solutions", subtitle: "Full-service global compliance。" },
      { title: "Next-gen Biomaterials", subtitle: "Renewable, biodegradable。" },
    ],
  },
};

/* ----------------------------- Slide 组件 ----------------------------- */
const Slide = ({ src, text, idx }: any) => {
  const animDur = 20 + idx * 2;

  return (
    <SwiperSlide>
      <div className="relative w-full h-screen overflow-hidden">

        <img
          src={src}
          alt={text.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            animation: `kenZoom ${animDur}s ease-in-out infinite`,
          }}
        />

        {/* 遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

        {/* 文案 */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6">
          <div className="max-w-5xl">
            <Suspense fallback={<h1 className="text-white text-5xl">{text.title}</h1>}>
              <RevealText
                tag="h1"
                text={text.title}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl mb-6"
              />
              <RevealText
                tag="p"
                text={text.subtitle}
                delay={0.6}
                className="text-xl md:text-2xl text-white/80"
              />
            </Suspense>

            <a href="/about" className="inline-flex items-center gap-3 mt-10 text-white bg-white/20 px-6 py-3 rounded-full backdrop-blur-md">
              {text.cta} <ArrowRight />
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
  const [slides, setSlides] = useState(rawSlides);

  useEffect(() => {
    const l = navigator.language.startsWith('zh') ? 'zh' : 'en';
    setLang(l);
  }, []);

  /* GSAP */
  useEffect(() => {
    gsap.fromTo(
      '.animate-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.animate-item',
          start: 'top 85%',
        },
      }
    );
  }, []);

  const t = LANG[lang];

  return (
    <>
      {/* Ken Burns 动画 */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15) translate(-1%, -1%); }
          100% { transform: scale(1.05); }
        }
      `}</style>

      {/* 切换语言按钮 */}
      <button
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        className="fixed top-5 right-5 z-40 px-4 py-3 bg-white/90 rounded-full shadow hover:scale-110 transition"
      >
        <Globe className="inline mr-2 text-[#40C4FF]" />
        {lang === 'zh' ? 'EN' : '中'}
      </button>

      {/* Banner */}
      <section className="h-screen relative">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          autoplay={{ delay: 6000 }}
          loop
          pagination={{ clickable: true }}
          className="h-full"
        >
          {slides.map((s, i) => (
            <Slide key={s.id} src={s.image} text={{ ...t.slides[i], cta: t.more }} idx={i} />
          ))}
        </Swiper>
      </section>

      {/* Who we are */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div className="space-y-6 animate-item">
          <span className="text-[#40C4FF] font-bold">{t.who}</span>
          <h2 className="text-4xl font-bold">{t.company}</h2>
          <p className="text-lg text-slate-600">{t.intro}</p>
          <a href="/about" className="text-[#40C4FF] inline-flex items-center gap-3 font-semibold">
            {t.more} <ArrowRight />
          </a>
        </div>

        <div className="animate-item flex justify-center">
          <svg width="360" height="360" viewBox="0 0 420 420" className="text-[#40C4FF]">
            <circle cx="210" cy="210" r="200" strokeWidth="1" stroke="currentColor" opacity=".2" />
            <circle cx="210" cy="210" r="160" strokeWidth="3" stroke="currentColor" strokeDasharray="25 20" className="animate-spin-slow" />
            <g transform="translate(210,210)">
              <Beaker size={100} />
            </g>
          </svg>
        </div>
      </section>

      {/* 核心优势 */}
      <section className="py-20 bg-slate-50">
        <div className="text-center mb-14 animate-item">
          <h2 className="text-4xl font-bold">{t.values}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
          {[ 
            { Icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
            { Icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
            { Icon: Settings, title: t.quality, desc: t.qualityDesc }
          ].map((item, i) => (
            <div key={i} className="animate-item bg-white p-10 rounded-2xl shadow">
              <item.Icon className="text-[#40C4FF] mb-5" size={32} />
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 技术实力 */}
      <section className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div className="animate-item space-y-6">
            <h2 className="text-4xl font-bold">{t.tech}</h2>
            <p className="text-lg text-slate-600">{t.techDesc}</p>
            <ul className="space-y-3">
              {[t.lab1, t.lab2, t.lab3].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#40C4FF] rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-item relative shadow-2xl rounded-2xl overflow-hidden">
            <img src={labImage} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/30" />
          </div>
        </div>
      </section>
    </>
  );
}
