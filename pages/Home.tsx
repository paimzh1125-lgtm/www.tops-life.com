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

// ========== 配置 ==========
const AUTO_CONVERT_ALPHA = false; // 是否把含 alpha 的 PNG 转为 JPEG（白底）
const KEN_BURNS_BASE = 22; // Ken Burns 基准时长（秒）

// 你提供的图片文件（已确认存在）
const slides = [
  { id: 1, image: '/banner/1.jpg' },
  { id: 2, image: '/banner/2.jpg' },
  { id: 3, image: '/banner/3.jpg' },
  { id: 4, image: '/banner/4.jpg' },
  { id: 5, image: '/banner/5.jpg' },
];

// 实验室图（你确认有 /banner/5.jpg）
const labImage = '/banner/5.jpg';

// 简化多语言文案（保留关键字段）
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

// ========== 图片加载与 alpha 检测（客户端） ==========
function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = (e) => rej(e);
    img.src = src;
  });
}

async function detectAndConvertAlpha(src, convertIfAlpha = true) {
  try {
    const img = await loadImage(src);
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;

    // 快速采样判断 alpha
    const step = Math.max(1, Math.floor(Math.sqrt((w * h) / 64)));
    let alphaFound = false;
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 250) { alphaFound = true; break; }
      }
      if (alphaFound) break;
    }

    if (!alphaFound || !convertIfAlpha) return { hasAlpha: alphaFound, url: src };

    // 转为白底 JPEG
    const canvas2 = document.createElement('canvas');
    canvas2.width = w;
    canvas2.height = h;
    const ctx2 = canvas2.getContext('2d');
    ctx2.fillStyle = '#ffffff';
    ctx2.fillRect(0, 0, w, h);
    ctx2.drawImage(img, 0, 0, w, h);
    const jpegDataUrl = canvas2.toDataURL('image/jpeg', 0.9);
    return { hasAlpha: true, url: jpegDataUrl };
  } catch (err) {
    // 跨域或加载失败时回退原图
    return { hasAlpha: false, url: src };
  }
}

// ========= Slide 组件 =========
const Slide = React.memo(function Slide({ src, text, idx }) {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadImage(src)
      .then((img) => {
        if (!mounted) return;
        setOrientation(img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape');
        setReady(true);
      })
      .catch(() => {
        if (!mounted) return;
        setOrientation('landscape');
        setReady(true);
      });
    return () => { mounted = false; };
  }, [src]);

  const dur = KEN_BURNS_BASE + (idx % 3) * 3;

  return (
    <SwiperSlide className="relative w-full h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt={text.title || 'banner'}
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-transform will-change-transform ken-burns`}
          style={{ animationDuration: `${dur}s`, objectPosition: orientation === 'portrait' ? 'center 25%' : 'center center' }}
        />
        {/* 若图片没 ready，可显示占位背景，避免白条 */}
        {!ready && <div className="absolute inset-0 bg-gray-100" />}
      </div>

      {/* 遮罩层，保证文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/70" />

      {/* 文本层 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-7xl text-center">
          <Suspense fallback={null}>
            <RevealText tag="h1" text={text.title} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight" />
            <RevealText tag="p" text={text.subtitle} delay={0.5} className="text-md md:text-xl text-slate-100 font-light max-w-4xl mx-auto" />
            <div className="mt-6">
              <a href="/about" className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:-translate-y-1 transition-transform">
                <span className="font-medium">{/* 根据语言可替换 */} {text.cta || 'Learn more'}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </Suspense>
        </div>
      </div>
    </SwiperSlide>
  );
});

// ========= 主页面 =========
export default function Home() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [processedSlides, setProcessedSlides] = useState(slides.map(s => ({ ...s, url: s.image })));
  const t = LANG[lang];

  // 处理图片（检测 alpha 并转换），仅客户端执行
  useEffect(() => {
    let mounted = true;
    (async () => {
      const out = [];
      for (const s of slides) {
        if (AUTO_CONVERT_ALPHA) {
          const { url } = await detectAndConvertAlpha(s.image, true);
          out.push({ ...s, url });
        } else {
          out.push({ ...s, url: s.image });
        }
      }
      if (mounted) setProcessedSlides(out);
    })();
    return () => { mounted = false; };
  }, []);

  // GSAP：等 DOM 渲染并且 animate-item 存在再触发（避免找不到 target 报错）
  useEffect(() => {
    const maybeAnimate = () => {
      const items = document.querySelectorAll('.animate-item');
      if (!items || items.length === 0) return;
      gsap.fromTo(
        items,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: items,
            start: 'top 85%',
          },
        }
      );
    };

    // 确保在下一个 tick 执行，等待 React 渲染
    const id = setTimeout(maybeAnimate, 80);
    return () => clearTimeout(id);
  }, [processedSlides]);

  useEffect(() => {
    const browserLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'zh';
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  return (
    <>
      {/* Ken-Burns Keyframes */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.06) translate3d(0,0,0); }
          50% { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
          100% { transform: scale(1.06) translate3d(0,0,0); }
        }
        .ken-burns {
          animation-name: kenZoom;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform;
        }
      `}</style>

      {/* 语言切换 */}
      <button
        onClick={() => setLang(l => (l === 'zh' ? 'en' : 'zh'))}
        className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-lg shadow rounded-full p-3 hover:scale-105 transition-transform"
        aria-label="toggle language"
      >
        <Globe size={18} className="text-[#40C4FF]" />
      </button>

      <div className="overflow-hidden">
        {/* Banner */}
        <section className="relative w-full h-screen overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            speed={1400}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="h-full"
          >
            {processedSlides.map((s, i) => (
              <Slide key={s.id} src={s.url} text={{ ...t.slides[i % t.slides.length], cta: t.more }} idx={i} />
            ))}
          </Swiper>
        </section>

        {/* Who We Are */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-item">
              <span className="text-[#40C4FF] font-bold tracking-widest uppercase">{t.who}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900">{t.company}</h2>
              <p className="text-lg text-slate-600">{t.intro}</p>
              <a href="/about" className="inline-flex items-center gap-3 text-[#40C4FF] font-semibold">
                {t.more} <ArrowRight />
              </a>
            </div>

            <div className="flex justify-center animate-item">
              <div className="relative">
                <div className="absolute inset-0 bg-[#40C4FF]/20 rounded-full blur-3xl animate-pulse" />
                <svg width="320" height="320" viewBox="0 0 420 420" className="text-[#40C4FF]">
                  <circle cx="210" cy="210" r="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                  <circle cx="210" cy="210" r="150" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="20 15" className="animate-spin-slow" />
                  <g transform="translate(210,210)">
                    <Beaker size={90} className="text-[#40C4FF]" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="text-center mb-12 animate-item">
            <h2 className="text-3xl md:text-4xl font-bold">{t.values}</h2>
            <div className="w-20 h-1 bg-[#40C4FF] mx-auto mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {[{ icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
              { icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
              { icon: Settings, title: t.quality, desc: t.qualityDesc }].map((item, i) => (
                <div key={i} className="animate-item bg-white p-8 rounded-xl shadow-xl">
                  <div className="w-16 h-16 bg-[#40C4FF]/10 rounded-lg flex items-center justify-center mb-6">
                    <item.icon size={26} className="text-[#40C4FF]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
            ))}
          </div>
        </section>

        {/* 技术实力 */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-item">
              <h2 className="text-2xl md:text-3xl font-bold">{t.tech}</h2>
              <p className="text-slate-600 mt-4">{t.techDesc}</p>
              <ul className="mt-6 space-y-3">
                {[t.lab1, t.lab2, t.lab3].map((l, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#40C4FF] animate-ping" />
                    <span className="text-slate-700">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-xl overflow-hidden shadow-2xl animate-item">
              <img src={labImage} alt="lab" className="w-full h-80 md:h-96 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/30 via-transparent to-transparent" />
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
