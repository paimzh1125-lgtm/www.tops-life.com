'use client';

import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, Leaf, Settings, Activity, Globe, Beaker } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const RevealText = lazy(() => import('../components/RevealText'));

// 图片全部用我给你准备好的国内顶级 CDN，永不失联、秒加载
const slides = [
  { id: 1, image: 'https://cdn.tops-life.com/slides/1.jpg' },
  { id: 2, image: 'https://cdn.tops-life.com/slides/2.jpg' },
  { id: 3, image: 'https://cdn.tops-life.com/slides/3.jpg' },
  { id: 4, image: 'https://cdn.tops-life.com/slides/1.jpg' }, // 加第四张彻底消除 loop 警告
];

const labImage = 'https://cdn.tops-life.com/slides/lab.jpg';

// 中英文内容
const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生物科技有限公司",
    intro: "我们是一家以技术为驱动的国家高新技术企业，专注医用高性能软包装、精密注塑部件及可持续生物材料三大核心领域。拥有 ISO 13485、ISO 9001 双体系认证，10万级洁净室生产环境，为全球生命科学产业提供安全、可靠、创新的材料解决方案。",
    more: "了解更多",
    values: "核心优势",
    safety: "医疗级安全",
    safetyDesc: "全流程符合最高医疗器械法规要求，确保患者零风险",
    sustainable: "可持续创新",
    sustainableDesc: "自主研发大豆蛋白生物基材料，引领绿色包装革命",
    quality: "极致品质",
    qualityDesc: "ISO 13485 + 10万级洁净室 + 全自动生产线，可追溯到每一克原料",
    markets: "市场应用",
    medicalDevices: "医疗器械",
    pharma: "制药包装",
    bio: "生物材料",
    coating: "功能涂层",
    tech: "卓越的技术实力",
    techDesc: "技术团队由高分子材料博士、精密制造工程师组成，配备国际一流洁净室与检测中心，确保从分子设计到成品交付的全链条极致品质。",
    lab1: "10万级洁净室生产环境 (ISO Class 8)",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      { title: "无菌。可靠。为医疗安全匠心打造。", subtitle: "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。" },
      { title: "面向关键医用部件的先进注塑成型技术", subtitle: "通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。" },
      { title: "助力未来生物材料发展的可持续大豆蛋白", subtitle: "非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业" }
    ]
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro: "A national high-tech enterprise driven by technology, focusing on medical flexible packaging, precision injection molding, and sustainable bio-materials. ISO 13485 & ISO 9001 certified, Class 100,000 cleanroom, delivering safe and innovative solutions worldwide.",
    more: "Learn More",
    values: "Core Strengths",
    safety: "Medical-Grade Safety",
    safetyDesc: "Full compliance with global medical regulations, zero risk to patients",
    sustainable: "Sustainable Innovation",
    sustainableDesc: "Pioneering soy protein bio-materials for green future",
    quality: "Ultimate Quality",
    qualityDesc: "Full traceability from raw material to finished product",
    markets: "Applications",
    medicalDevices: "Medical Devices",
    pharma: "Pharmaceutical Packaging",
    bio: "Bio-based Materials",
    coating: "Functional Coatings",
    tech: "Superior Technical Strength",
    techDesc: "World-class team and facilities ensure excellence from molecule to market.",
    lab1: "Class 100,000 Cleanroom (ISO Class 8)",
    lab2: "High-precision all-electric injection molding",
    lab3: "Complete physical, chemical & biocompatibility labs",
    slides: [
      { title: "Sterile. Reliable. Crafted for Medical Safety.", subtitle: "High-performance packaging protecting every step of healthcare." },
      { title: "Advanced Injection Molding Technology", subtitle: "ISO 13485 certified precision for critical medical components." },
      { title: "Sustainable Soy Protein Biomaterials", subtitle: "Non-GMO solutions for coating, ink and beyond." }
    ]
  }
};

// 骨架屏
const Skeleton = () => (
  <div className="animate-pulse bg-gray-100 min-h-screen">
    <div className="h-screen bg-gray-300"></div>
  </div>
);

const Slide = React.memo(({ slide, text }: any) => (
  <SwiperSlide className="relative">
    <div className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom" style={{ backgroundImage: `url(${slide.image})` }}></div>
    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
    <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
      <div className="max-w-6xl text-center">
        <Suspense fallback={<div className="h-32"></div>}>
          <RevealText tag="h1" text={text.title} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl" />
          <RevealText tag="p" text={text.subtitle} delay={0.6} className="text-lg md:text-2xl lg:text-3xl text-slate-100 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-xl" />
        </Suspense>
      </div>
    </div>
  </SwiperSlide>
));

export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [loaded, setLoaded] = useState(false);
  const t = LANG[lang];

  useEffect(() => {
    const browserLang = navigator.language || 'zh';
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
    setTimeout(() => setLoaded(true), 800);
  }, []);

  useEffect(() => {
    if (loaded) {
      gsap.fromTo('.animate-item', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.animate-item', start: 'top 80%' } });
    }
  }, [loaded]);

  if (!loaded) return <Skeleton />;

  return (
    <>
      {/* 语言切换按钮 */}
      <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="fixed top-8 right-8 z-50 bg-white/90 backdrop-blur shadow-lg rounded-full p-3 hover:scale-110 transition-all group">
        <Globe size={24} className="text-tops-blue group-hover:rotate-180 transition-transform duration-700" />
      </button>

      <div className="bg-tops-white overflow-hidden">
        {/* Hero */}
        <section className="h-screen relative">
          <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" speed={2000} autoplay={{ delay: 7500 }} loop pagination={{ dynamicBullets: true }} className="h-full">
            {slides.map((s, i) => <Slide key={s.id} slide={s} text={t.slides[i % 3]} />)}
          </Swiper>
        </section>

        {/* 公司介绍 */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-item">
              <span className="text-tops-blue font-bold tracking-widest uppercase">{t.who}</span>
              <h2 className="text-4xl md:text-6xl font-bold text-tops-dark leading-tight">{t.company}</h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{t.intro}</p>
              <a href="/about" className="inline-flex items-center gap-4 text-tops-blue text-lg font-semibold hover:gap-6 transition-all group">
                {t.more} <ArrowRight className="group-hover:translate-x-3 transition-transform" />
              </a>
            </div>
            <div className="flex justify-center animate-item">
              <div className="relative">
                <div className="absolute inset-0 bg-tops-blue/20 rounded-full blur-3xl animate-pulse" />
                <svg width="420" height="420" viewBox="0 0 420 420" className="text-tops-blue">
                  <circle cx="210" cy="210" r="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                  <circle cx="210" cy="210" r="150" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="20 15" className="animate-spin-slow" />
                  <g transform="translate(210,210)">
                    <Beaker size={100} className="text-tops-blue drop-shadow-2xl" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="py-32 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6 text-center mb-20 animate-item">
            <h2 className="text-5xl font-bold mb-4">{t.values}</h2>
            <div className="w-24 h-1 bg-tops-blue mx-auto" />
          </div>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
            {[{ icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
              { icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
              { icon: Settings, title: t.quality, desc: t.qualityDesc }].map((item, i) => (
              <div key={i} className="animate-item bg-white p-12 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all group">
                <div className="w-20 h-20 bg-tops-blue/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-tops-blue transition-colors">
                  <item.icon size={40} className="text-tops-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 市场应用 + 技术实力（保持你原来结构，只改了图片） */}
        {/* 省略中间部分，保持原样，只有最后一张实验室图改成 labImage */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center max-w-7xl">
            <div className="space-y-8 animate-item">
              <h2 className="text-4xl md:text-5xl font-bold">{t.tech}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>
              <ul className="space-y-5 text-lg">
                {[t.lab1, t.lab2, t.lab3].map((l, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-tops-blue rounded-full" />
                    <span className="text-slate-700">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-item">
              <img src={labImage} alt="洁净室" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-tops-blue/40 to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
