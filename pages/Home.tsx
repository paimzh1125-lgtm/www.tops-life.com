// 已根据你提供的初版完全重新生成并优化的 Home.tsx
// ========== 顶级稳定版，无 Canvas，无 Alpha 检测，100% 兼容 Vercel ==========

'use client';

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
const RevealText = lazy(() => import('@/components/RevealText'));

// ========== Banner 图（直接使用 public/banner，最稳定） ==========
const slides = [
  { id: 1, url: '/banner/1.jpg' },
  { id: 2, url: '/banner/2.jpg' },
  { id: 3, url: '/banner/3.jpg' },
  { id: 4, url: '/banner/4.jpg' },
  { id: 5, url: '/banner/5.jpg' },
];

const labImage = '/banner/5.jpg';

// ========== 文案 ========== 
const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生物科技有限公司",
    intro: "我们是一家以技术为驱动的国家高新技术企业，专注医用高性能软包装、精密注塑部件及可持续生物材料三大核心领域。",
    more: "了解更多",
    values: "核心优势",
    safety: "医疗级安全",
    safetyDesc: "全流程符合最高医疗器械法规要求，确保患者零风险",
    sustainable: "可持续创新",
    sustainableDesc: "自主研发大豆蛋白生物基材料，引领绿色包装革命",
    quality: "极致品质",
    qualityDesc: "ISO 13485 + 10万级洁净室 + 可追溯生产",
    tech: "卓越的技术实力",
    techDesc: "技术团队与顶级设施确保全链条品质控制。",
    lab1: "10万级洁净室生产环境 (ISO Class 8)",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      { title: "无菌。可靠。为医疗安全匠心打造。", subtitle: "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。" },
      { title: "先进注塑成型技术", subtitle: "为关键医用部件提供精密制造。" },
      { title: "可持续大豆蛋白生物材料", subtitle: "面向未来的绿色材料方案。" },
      { title: "医疗级软包装整体解决方案", subtitle: "满足全球法规要求的一站式服务。" },
      { title: "绿色生物材料引领未来", subtitle: "可降解、可再生、性能优越。" },
    ],
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro: "A national high-tech enterprise focusing on medical flexible packaging, precision injection molding and sustainable biomaterials.",
    more: "Learn More",
    values: "Core Strengths",
    safety: "Medical-Grade Safety",
    safetyDesc: "Full compliance with global medical regulations.",
    sustainable: "Sustainable Innovation",
    sustainableDesc: "Pioneering soy protein bio-materials.",
    quality: "Ultimate Quality",
    qualityDesc: "ISO 13485 + cleanroom + traceable production",
    tech: "Superior Technical Strength",
    techDesc: "Top-tier team and facilities ensure end-to-end quality.",
    lab1: "Class 100,000 Cleanroom (ISO Class 8)",
    lab2: "High-precision all-electric injection molding",
    lab3: "Complete physical & biocompatibility labs",
    slides: [
      { title: "Sterile. Reliable.", subtitle: "High-performance packaging protecting healthcare." },
      { title: "Advanced Injection Molding", subtitle: "Precision for critical medical components." },
      { title: "Sustainable Soy Protein Biomaterials", subtitle: "Green material solutions." },
      { title: "Total Packaging Solutions", subtitle: "From R&D to delivery." },
      { title: "Green Bio-materials", subtitle: "Biodegradable and renewable." },
    ],
  },
};

// ========== Ken Burns（稳定无闪烁） ========== 
const Slide = React.memo(function Slide({ src, text }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <SwiperSlide className="relative w-full h-screen">
      <div className="absolute inset-0 overflow-hidden">
        {!loaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}

        <img
          src={src}
          onLoad={() => setLoaded(true)}
          alt="banner"
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} kenburns`}    
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />

      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          <Suspense fallback={null}>
            <RevealText tag="h1" text={text.title} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" />
            <RevealText tag="p" delay={0.5} text={text.subtitle} className="text-md md:text-xl text-slate-100 font-light max-w-4xl mx-auto" />
          </Suspense>

          <a href="/about" className="inline-flex items-center gap-3 px-5 py-3 mt-6 bg-white/10 backdrop-blur-sm rounded-full text-white hover:-translate-y-1 transition-transform">
            <span className="font-medium">{text.cta}</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </SwiperSlide>
  );
});

// ========== 主页面 ========== 
export default function Home() {
  const [lang, setLang] = useState('zh');
  const t = LANG[lang];

  useEffect(() => {
    const b = navigator.language.startsWith('zh') ? 'zh' : 'en';
    setLang(b);
  }, []);

  // GSAP 动画
  useEffect(() => {
    const items = document.querySelectorAll('.animate-item');
    if (!items.length) return;

    gsap.fromTo(
      items,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: items,
          start: 'top 85%'
        }
      }
    );
  }, [lang]);

  return (
    <>
      {/* Ken Burns 样式 */}
      <style>{`
        @keyframes zoomSlow {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1.05); }
        }
        .kenburns {
          animation: zoomSlow 22s ease-in-out infinite;
        }
      `}</style>

      {/* 切换语言 */}
      <button
        onClick={() => setLang(l => (l === 'zh' ? 'en' : 'zh'))}
        className="fixed top-6 right-6 z-50 bg-white/90 backdrop-blur-lg shadow rounded-full p-3 hover:scale-105 transition-transform"
      >
        <Globe size={18} className="text-[#40C4FF]" />
      </button>

      <div className="overflow-hidden
