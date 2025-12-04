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

// ==================== 配置 ====================
const AUTO_CONVERT_ALPHA = true;
const KEN_BURNS_BASE = 22;

const rawSlides = [
  { id: 1, image: '/banner/1.jpg' },
  { id: 2, image: '/banner/2.jpg' },
  { id: 3, image: '/banner/3.jpg' },
  { id: 4, image: '/banner/4.jpg' },
  { id: 5, image: '/banner/5.jpg' },
] as const;

const labImage = '/banner/5.jpg';

// 多语言文案
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

// ==================== 工具函数 ====================
async function convertIfHasAlpha(src: string): Promise<string> {
  if (!AUTO_CONVERT_ALPHA) return src;
  try {
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = Math.max(1, Math.floor(Math.sqrt((canvas.width * canvas.height) / 100)));
    let hasAlpha = false;
    for (let y = 0; y < canvas.height; y += step) {
      for (let x = 0; x < canvas.width; x += step) {
        if (data[(y * canvas.width + x) * 4 + 3] < 250) {
          hasAlpha = true;
          break;
        }
      }
      if (hasAlpha) break;
    }

    if (!hasAlpha) return src;

    const whiteCanvas = document.createElement('canvas');
    whiteCanvas.width = canvas.width;
    whiteCanvas.height = canvas.height;
    const wctx = whiteCanvas.getContext('2d')!;
    wctx.fillStyle = '#ffffff';
    wctx.fillRect(0, 0, whiteCanvas.width, whiteCanvas.height);
    wctx.drawImage(img, 0, 0);
    return whiteCanvas.toDataURL('image/jpeg', 0.92);
  } catch {
    return src;
  }
}

// ==================== Slide 组件（已替换成 <img>） ====================
const Slide = React.memo(({ src, text, idx }: { src: string; text: any; idx: number }) => {
  const dur = KEN_BURNS_BASE + (idx % 3) * 3;

  return (
    <SwiperSlide>
      <div className="relative w-full h-screen overflow-hidden">

        {/* 改为 <img>，完全兼容 Vite */}
        <img
          src={src}
          alt={text.title}
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover ken-burns"
          style={{ animationDuration: `${dur}s` }}
        />

        {/* 渐变遮罩 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />

        {/* 文字内容 */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <div className="max-w-7xl">
            <Suspense fallback={<h1 className="text-5xl font-bold text-white">{text.title}</h1>}>
              <RevealText
                tag="h1"
                text={text.title}
                className="text-4xl leading-tight sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
              />
              <RevealText
                tag="p"
                text={text.subtitle}
                delay={0.6}
                className="text-lg sm:text-xl md:text-2xl text-slate-100 font-light max-w-4xl mx-auto opacity-90"
              />
            </Suspense>

            <div className="mt-10">
              <a
                href="/about"
                className="inline-flex items-center gap-3 px-7 py-4 bg-white/15 backdrop-blur-md rounded-full text-white font-medium hover:bg-white/25 transition-all"
              >
                {text.cta} <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  );
});

// ==================== 主组件 ====================
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [slides, setSlides] = useState<{ id: number; url: string }[]>([]);
  const t = LANG[lang];

  // 自动检测语言
  useEffect(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'zh';
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  // 只处理一次图片
  useEffect(() => {
    let cancelled = false;

    Promise.all(rawSlides.map(s => convertIfHasAlpha(s.image))).then(results => {
      if (cancelled) return;
      setSlides(rawSlides.map((s, i) => ({ id: s.id, url: results[i] })));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // GSAP 动画
  useEffect(() => {
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('.animate-item');
      if (items.length === 0) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: items[0],
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      );
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Ken Burns 动画 */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.06); }
          50% { transform: scale(1.14) translate(-1.5%, -1%); }
          100% { transform: scale(1.06); }
        }
        .ken-burns {
          animation: kenZoom 18s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* 语言切换按钮 */}
      <button
        onClick={() => setLang(l => (l === 'zh' ? 'en' : 'zh'))}
        className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-white/95 backdrop-blur-lg shadow-lg rounded-full px-4 py-3 hover:scale-110 transition-transform"
      >
        <Globe size={20} className="text-[#40C4FF]" />
        <span className="font-medium text-sm">{lang === 'zh' ? 'EN' : '中'}</span>
      </button>

      <div className="overflow-hidden">

        {/* Banner */}
        <section className="relative h-screen">
          {slides.length === 0 ? (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <div className="text-white text-5xl font-bold animate-pulse">TOPS LIFE</div>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              effect="fade"
              speed={1600}
              autoplay={{ delay: 6500, disableOnInteraction: false }}
              loop
              pagination={{ clickable: true }}
              className="h-full"
            >
              {slides.map((s, i) => (
                <Slide
                  key={s.id}
                  src={s.url}
                  text={{ ...t.slides[i % t.slides.length], cta: t.more }}
                  idx={i}
                />
              ))}
            </Swiper>
          )}
        </section>

        {/* Who We Are */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-7 animate-item">
              <span className="text-[#40C4FF] font-bold tracking-widest uppercase">{t.who}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">{t.company}</h2>
              <p className="text-lg text-slate-600">{t.intro}</p>
              <a href="/about" className="inline-flex items-center gap-3 text-[#40C4FF] font-semibold">
                {t.more} <ArrowRight size={22} />
              </a>
            </div>

            <div className="flex justify-center animate-item">
              <div className="relative">
                <svg width="360" height="360" viewBox="0 0 420 420" className="text-[#40C4FF]">
                  <circle cx="210" cy="210" r="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                  <circle cx="210" cy="210" r="160" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="25 20" className="animate-spin-slow" />
                  <g transform="translate(210,210)">
                    <Beaker size={100} />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="text-center mb-16 animate-item">
            <h2 className="text-4xl md:text-5xl font-bold">{t.values}</h2>
            <div className="w-24 h-1 bg-[#40C4FF] mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
            {[{ Icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
              { Icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
              { Icon: Settings, title: t.quality, desc: t.qualityDesc }
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="animate-item bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow">
                <div className="w-18 h-18 bg-[#40C4FF]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={32} className="text-[#40C4FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 技术实力 */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-item space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold">{t.tech}</h2>
              <p className="text-lg text-slate-600">{t.techDesc}</p>
              <ul className="space-y-5">
                {[t.lab1, t.lab2, t.lab3].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full bg-[#40C4FF] animate-ping" />
                    <span className="text-lg text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-item">
              <img
                src={labImage}
                alt="lab"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
