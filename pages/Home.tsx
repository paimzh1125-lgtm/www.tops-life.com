'use client';

import React, { useEffect, useMemo, useState, Suspense, lazy } from 'react';
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
const AUTO_CONVERT_ALPHA = true; // 是否尝试将含透明通道的 PNG 转为 JPG（移除透明）
const KEN_BURNS_DURATION = 22; // 秒，基准时长（每张会有微小偏移）

const slides = [
  { id: 1, image: '/banner/1.png' },
  { id: 2, image: '/banner/2.png' },
  { id: 3, image: '/banner/3.png' },
  { id: 4, image: '/banner/4.png' },
  { id: 5, image: '/banner/5.png' },
];

// 多语言（保留你原始部分）
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
    tech: "卓越的技术实力",
    techDesc: "技术团队由高分子材料博士、精密制造工程师组成，配备国际一流洁净室与检测中心，确保从分子设计到成品交付的全链条极致品质。",
    lab1: "10万级洁净室生产环境 (ISO Class 8)",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      { title: "无菌。可靠。为医疗安全匠心打造。", subtitle: "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。" },
      { title: "面向关键医用部件的先进注塑成型技术", subtitle: "通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。" },
      { title: "助力未来生物材料发展的可持续大豆蛋白", subtitle: "非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业" },
      { title: "医疗级软包装整体解决方案", subtitle: "从材料研发到成品交付，一站式满足全球法规要求。" },
      { title: "绿色生物材料引领未来", subtitle: "可降解、可再生、性能卓越，开启可持续包装新时代。" },
    ],
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
    tech: "Superior Technical Strength",
    techDesc: "World-class team and facilities ensure excellence from molecule to market.",
    lab1: "Class 100,000 Cleanroom (ISO Class 8)",
    lab2: "High-precision all-electric injection molding",
    lab3: "Complete physical, chemical & biocompatibility labs",
    slides: [
      { title: "Sterile. Reliable. Crafted for Medical Safety.", subtitle: "High-performance packaging protecting every step of healthcare." },
      { title: "Advanced Injection Molding Technology", subtitle: "ISO 13485 certified precision for critical medical components." },
      { title: "Sustainable Soy Protein Biomaterials", subtitle: "Non-GMO solutions for coating, ink and beyond." },
      { title: "Total Medical Flexible Packaging Solutions", subtitle: "From R&D to delivery, meeting global regulatory standards." },
      { title: "Green Bio-materials Leading the Future", subtitle: "Biodegradable, renewable, high-performance — the new era of packaging." },
    ],
  },
};

// ========= 客户端图片处理工具 =========
// 判断图片是否包含 alpha 通道并（可选）把带透明的 PNG 转为 JPG（white 背景）
async function hasAlphaAndMaybeConvert(src, convertIfAlpha = true) {
  // 若非同源或 tainted canvas 情况，尝试直接返回源地址（无法检测）
  try {
    const img = await loadImage(src);
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);

    // 采样若干点判断 alpha
    const sampleCount = 24;
    const stepX = Math.max(1, Math.floor(w / Math.sqrt(sampleCount)));
    const stepY = Math.max(1, Math.floor(h / Math.sqrt(sampleCount)));
    const data = ctx.getImageData(0, 0, w, h).data;

    let alphaFound = false;
    for (let y = 0; y < h; y += stepY) {
      for (let x = 0; x < w; x += stepX) {
        const idx = (y * w + x) * 4;
        if (data[idx + 3] < 250) { // 几乎不透明视为有 alpha
          alphaFound = true;
          break;
        }
      }
      if (alphaFound) break;
    }

    if (!alphaFound || !convertIfAlpha) {
      return { hasAlpha: alphaFound, url: src };
    }

    // alpha 存在 -> 将图片绘制到白底，再转成 jpeg
    const canvas2 = document.createElement('canvas');
    canvas2.width = w;
    canvas2.height = h;
    const ctx2 = canvas2.getContext('2d');

    // 白底
    ctx2.fillStyle = '#ffffff';
    ctx2.fillRect(0, 0, w, h);
    ctx2.drawImage(img, 0, 0, w, h);

    const jpegDataUrl = canvas2.toDataURL('image/jpeg', 0.9);
    return { hasAlpha: true, url: jpegDataUrl };
  } catch (err) {
    // 跨域或其他问题，返回原地址并标注无法检测
    return { hasAlpha: false, url: src };
  }
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = (e) => rej(e);
    img.src = src;
  });
}

// ========= Slide 组件（改写） =========
const Slide = React.memo(({ src, text, idx }) => {
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>('landscape');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    // 预加载图片并判断方向
    loadImage(src)
      .then((img) => {
        if (!mounted) return;
        const isPortrait = img.naturalHeight > img.naturalWidth;
        setOrientation(isPortrait ? 'portrait' : 'landscape');
        setLoaded(true);
      })
      .catch(() => {
        if (!mounted) return;
        // 失败时当作 landscape
        setOrientation('landscape');
        setLoaded(true);
      });

    return () => {
      mounted = false;
    };
  }, [src]);

  // 每张 slide 的 Ken Burns 会有细微不同（phase）
  const duration = KEN_BURNS_DURATION + (idx % 3) * 3;

  return (
    <SwiperSlide className="relative w-full h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={src}
          alt={text.title || 'banner'}
          className={`
            absolute inset-0 w-full h-full
            ${orientation === 'portrait' ? 'object-cover object-center' : 'object-cover object-center'}
            ken-burns
          `}
          style={{ animationDuration: `${duration}s` }}
          draggable={false}
        />
      </div>

      {/* 遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* 文本 */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="max-w-7xl text-center">
          <Suspense fallback={null}>
            <RevealText
              tag="h1"
              text={text.title}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl"
            />
            <RevealText
              tag="p"
              text={text.subtitle}
              delay={0.6}
              className="text-lg md:text-2xl lg:text-3xl text-slate-100 font-light max-w-5xl mx-auto leading-relaxed drop-shadow-xl"
            />
            <div className="mt-8">
              <a href="/about" className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:translate-y-[-2px] transition-transform">
                {/** 保留 Arrow */}
                <span className="font-medium">Learn more</span>
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
  const [ready, setReady] = useState(false);
  const t = LANG[lang];

  // 处理图片（检测 alpha 并可转为 jpeg）
  const [processed, setProcessed] = useState(() => slides.map((s) => ({ ...s, url: s.image })));
  useEffect(() => {
    let mounted = true;

    async function processAll() {
      const results = [];
      for (const s of slides) {
        if (AUTO_CONVERT_ALPHA) {
          const { url } = await hasAlphaAndMaybeConvert(s.image, true);
          results.push({ ...s, url });
        } else {
          results.push({ ...s, url: s.image });
        }
      }
      if (mounted) setProcessed(results);
    }

    processAll().finally(() => {
      if (mounted) {
        // 延迟保证 skeleton 不会闪烁
        setTimeout(() => setReady(true), 120);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    // 初始动画
    gsap.fromTo(
      '.animate-item',
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.animate-item',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [ready]);

  useEffect(() => {
    const browserLang = navigator.language || 'zh';
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  if (!ready) {
    // 简单 skeleton
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse rounded-lg w-[85%] md:w-[60%] h-64 bg-gray-200" />
      </div>
    );
  }

  return (
    <>
      {/* Ken Burns keyframes & small util CSS */}
      <style>{`
        @keyframes kenZoom {
          0% { transform: scale(1.06) translate3d(0,0,0); }
          50% { transform: scale(1.12) translate3d(-2%, -1.5%, 0); }
          100% { transform: scale(1.06) translate3d(0,0,0); }
        }
        .ken-burns {
          transform-origin: center center;
          will-change: transform;
          animation-name: kenZoom;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        /* slow spin for some svg etc (if used) */
        .animate-spin-slow { animation: spin 18s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
      `}</style>

      {/* 语言切换 */}
      <button
        onClick={() => setLang((p) => (p === 'zh' ? 'en' : 'zh'))}
        className="fixed top-6 right-6 z-50 bg-white/95 backdrop-blur-lg shadow-2xl rounded-full p-3 hover:scale-105 transition-transform"
        aria-label="toggle language"
        title="Toggle language"
      >
        <Globe size={20} className="text-[#40C4FF]" />
      </button>

      <div className="overflow-hidden">
        {/* Banner */}
        <section className="relative w-full h-screen overflow-hidden">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            speed={1500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            pagination={{ dynamicBullets: true, clickable: true }}
            className="h-full"
          >
            {processed.map((s, i) => (
              <Slide key={s.id} src={s.url} text={t.slides[i % t.slides.length]} idx={i} />
            ))}
          </Swiper>
        </section>

        {/* Who We Are */}
        <section className="py-28 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-item">
              <span className="text-[#40C4FF] font-bold tracking-widest uppercase">{t.who}</span>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">{t.company}</h2>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed">{t.intro}</p>
              <a href="/about" className="inline-flex items-center gap-4 text-[#40C4FF] text-lg font-semibold hover:gap-6 transition-all group">
                {t.more} <ArrowRight className="group-hover:translate-x-3 transition-transform" />
              </a>
            </div>

            <div className="flex justify-center animate-item">
              <div className="relative">
                <div className="absolute inset-0 bg-[#40C4FF]/20 rounded-full blur-3xl animate-pulse" />
                <svg width="320" height="320" viewBox="0 0 420 420" className="text-[#40C4FF]">
                  <circle cx="210" cy="210" r="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
                  <circle cx="210" cy="210" r="150" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="20 15" className="animate-spin-slow" />
                  <g transform="translate(210,210)">
                    <Beaker size={90} className="text-[#40C4FF] drop-shadow-2xl" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6 text-center mb-12 animate-item">
            <h2 className="text-4xl font-bold mb-4">{t.values}</h2>
            <div className="w-20 h-1 bg-[#40C4FF] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {[{ icon: ShieldCheck, title: t.safety, desc: t.safetyDesc },
              { icon: Leaf, title: t.sustainable, desc: t.sustainableDesc },
              { icon: Settings, title: t.quality, desc: t.qualityDesc }].map((item, i) => (
                <div key={i} className="animate-item bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all group">
                  <div className="w-16 h-16 bg-[#40C4FF]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#40C4FF] transition-colors">
                    <item.icon size={26} className="text-[#40C4FF] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
          </div>
        </section>

        {/* 技术实力 + 实验室图 */}
        <section className="py-28 bg-slate-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center max-w-7xl">
            <div className="space-y-6 animate-item">
              <h2 className="text-3xl md:text-4xl font-bold">{t.tech}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>
              <ul className="space-y-3 text-lg">
                {[t.lab1, t.lab2, t.lab3].map((l, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#40C4FF] rounded-full animate-ping" />
                    <span className="text-slate-700">{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-item group">
              <img
                src="/banner/5.jpg"
                alt="lab"
                className="w-full h-80 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#40C4FF]/40 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
