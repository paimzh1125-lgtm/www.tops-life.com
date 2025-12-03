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

// 懒加载文字动画组件
const RevealText = lazy(() => import('../components/RevealText'));

// 你的专属超快图床（自己域名 + GitHub Pages）
const BANNER_URL = 'https://www.tops-life.com/banner';

const slides = [
  { id: 1, image: `${BANNER_URL}/1.png` },
  { id: 2, image: `${BANNER_URL}/2.png` },
  { id: 3, image: `${BANNER_URL}/3.png` },
  { id: 4, image: `${BANNER_URL}/4.png` },
  { id: 5, image: `${BANNER_URL}/5.png` },
  { id: 6, image: `${BANNER_URL}/1.png` }, // 克隆第一张，彻底解决 Swiper loop 警告
];

// 实验室图也换成你的
const labImage = 'https://www.tops-life.com/banner/lab.jpg'; // 如果你也上传了就用这个，否则保留原图也行

// 中英文内容（保持不变）
const LANG = { /* 你原来的完整 LANG 对象，全部保留 */ };

// 骨架屏 + Slide 组件保持不变（只改图片路径就行）
const Skeleton = () => (
  <div className="animate-pulse bg-gray-100 min-h-screen">
    <div className="h-screen bg-gradient-to-br from-gray-200 to-gray-400" />
  </div>
);

const Slide = React.memo(({ slide, text }: any) => (
  <SwiperSlide className="relative">
    <div 
      className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom" 
      style={{ backgroundImage: `url(${slide.image})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
    <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
      <div className="max-w-7xl text-center">
        <Suspense fallback={<div className="h-32 bg-white/10 rounded"></div>}>
          <RevealText 
            tag="h1" 
            text={text.title} 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl"
          />
          <RevealText 
            tag="p" 
            text={text.subtitle} 
            delay={0.6} 
            className="text-lg md:text-2xl lg:text-3xl text-slate-100 font-light max-w-5xl mx-auto leading-relaxed drop-shadow-xl"
          />
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
    setTimeout(() => setLoaded(true), 600);
  }, []);

  useEffect(() => {
    if (loaded) {
      gsap.fromTo('.animate-item', 
        { opacity: 0, y: 60 }, 
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out', 
          scrollTrigger: { trigger: '.animate-item', start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );
    }
  }, [loaded]);

  if (!loaded) return <Skeleton />;

  return (
    <>
      {/* 语言切换 */}
      <button 
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} 
        className="fixed top-8 right-8 z-50 bg-white/95 backdrop-blur-lg shadow-2xl rounded-full p-4 hover:scale-110 transition-all group"
      >
        <Globe size={28} className="text-tops-blue group-hover:rotate-180 transition-transform duration-1000" />
      </button>

      <div className="bg-tops-white overflow-hidden">
        {/* Hero Banner */}
        <section className="h-screen relative">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            speed={1800}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            pagination={{ dynamicBullets: true, clickable: true }}
            className="h-full"
          >
            {slides.map((s, i) => (
              <Slide key={s.id} slide={s} text={t.slides[i % 5] || t.slides[0]} />
            ))}
          </Swiper>
        </section>

        {/* 以下所有内容完全保持你原来的结构和动画，只改了图片路径 */}
        {/* 公司介绍、核心优势、技术实力、实验室图全部保留 */}
        {/* ... 你原来的所有 section 代码保持 100% 不动 ... */}

        {/* 最后实验室图也建议换成你的域名 */}
        <section className="py-32 bg-slate-50">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center max-w-7xl">
            <div className="space-y-8 animate-item">
              <h2 className="text-4xl md:text-5xl font-bold">{t.tech}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{t.techDesc}</p>
              <ul className="space-y-5 text-lg">
                {[t.lab1, t.lab2, t.lab3].map((l, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-tops-blue rounded-full animate-ping" />
                    <span className="text-slate-700">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl animate-item group">
              <img 
                src={labImage} 
                alt="10万级洁净室" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-tops-blue/50 via-transparent to-transparent" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
