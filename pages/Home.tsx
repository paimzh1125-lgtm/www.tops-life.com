import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Leaf, Settings, Activity } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// 懒加载 RevealText 组件
const RevealText = lazy(() => import('../components/RevealText'));

// 静态图片数据
const slides = [
  {
    id: 1,
    image: '/images/medical-packaging.jpg', // 假设在 public/images 中有该图片
    title: '无菌。可靠。为医疗安全匠心打造。',
    subtitle: '高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。',
  },
  {
    id: 2,
    image: '/images/medical-injection-molding.jpg', // 假设在 public/images 中有该图片
    title: '面向关键医用部件的先进注塑成型技术',
    subtitle: '通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。',
  },
  {
    id: 3,
    image: '/images/soy-protein.jpg', // 假设在 public/images 中有该图片
    title: '助力未来生物材料发展的可持续大豆蛋白',
    subtitle: '非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业',
  }
];

const Slide = React.memo(({ slide }: { slide: typeof slides[0] }) => {
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (imageRefs.current) {
      gsap.fromTo(
        imageRefs.current, 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
    }
  }, [slide]);

  return (
    <SwiperSlide key={slide.id} className="relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 3000 }}
        loop={true}
        speed={1000}
        className="h-full w-full"
      >
        <SwiperSlide>
          <div
            ref={(el) => (imageRefs.current[0] = el)}
            className="absolute inset-0"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          ></div>
        </SwiperSlide>
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 bg-tops-dark/30 z-10"></div>

      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <Suspense fallback={<div>Loading...</div>}>
            <RevealText
              tag="h1"
              text={slide.title}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg"
            />
            <RevealText
              tag="p"
              text={slide.subtitle}
              className="text-lg md:text-2xl text-slate-100 font-light max-w-2xl mx-auto drop-shadow-md"
              delay={0.4}
            />
          </Suspense>
        </div>
      </div>
    </SwiperSlide>
  );
});

const Home: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intro Animation
    if (introRef.current) {
      gsap.fromTo(
        introRef.current.querySelector('.intro-logo'),
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: introRef.current, start: 'top 70%' }
        }
      );
    }
  }, []);

  return (
    <div className="bg-tops-white">
      {/* Hero Swiper */}
      <section className="h-screen relative w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={2000}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <Slide key={slide.id} slide={slide} />
          ))}
        </Swiper>
      </section>

      {/* Intro Section */}
      <section
        ref={introRef}
        className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center relative z-20"
      >
        <div className="flex-1">
          <span className="text-tops-blue font-bold tracking-widest text-sm uppercase mb-2 block">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-tops-dark mb-8">苏州永爱生物科技有限公司</h2>
          <p className="text-slate-600 leading-loose text-lg mb-6">
            苏州永爱生物科技有限公司（Suzhou Tops Life Technology Co., Ltd.）是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。
          </p>
          <a href="#/about" className="text-tops-blue font-semibold flex items-center gap-2 hover:gap-4 transition-all">
            了解更多 <ArrowRight size={20} />
          </a>
        </div>
        <div className="flex-1 intro-logo flex justify-center border-l border-slate-200 pl-12">
          {/* Abstract SVG Representation of Precision/Medical */}
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-tops-blue opacity-80">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="animate-spin-slow" />
            <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
            <rect x="85" y="85" width="30" height="30" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Values Cards */}
      <section className="bg-white py-24 relative z-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              { icon: ShieldCheck, title: '安全', desc: '严格遵循最高医疗级规范，确保患者安全，符合监管要求。' },
              { icon: Leaf, title: '环保', desc: '可持续理念融入材料研发，提供生物基环保解决方案。' },
              { icon: Settings, title: '质量控制', desc: '遵循 ISO 9001 及 ISO 13485，确保生产稳定可控、可追溯。' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 border border-slate-100 bg-slate-50 rounded-xl hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(64,196,255,0.15)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm group-hover:bg-tops-blue group-hover:text-white transition-colors">
                  <item.icon size={24} className="text-tops-blue group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-tops-dark">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Markets Grid */}
      <section className="py-24 bg-slate-50 relative z-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">市场应用</h2>
            <div className="w-12 h-1 bg-tops-blue mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[ 
              { label: '医疗器械', sub: 'Medical Devices', icon: Activity },
              { label: '制药生产', sub: 'Pharmaceutical', icon: ShieldCheck },
              { label: '新材料', sub: 'New Materials', icon: Leaf },
              { label: '功能涂布', sub: 'Functional Coatings', icon: Settings }
            ].map((m, i) => (
              <div
                key={i}
                className="aspect-square bg-white flex flex-col items-center justify-center p-6 border border-slate-100 hover:border-tops-blue transition-colors group cursor-pointer"
              >
                <m.icon size={40} className="text-slate-300 group-hover:text-tops-blue group-hover:scale-110 transition-all duration-500 mb-4" />
                <h4 className="font-bold text-lg text-tops-dark">{m.label}</h4>
                <span className="text-xs text-slate-400 uppercase tracking-wide mt-1">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Spec Parallax */}
      <section ref={techRef} className="py-24 relative overflow-hidden z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 h-[400px] w-full rounded-2xl overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200"
              alt="Lab Tech"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-tops-blue/20 to-transparent mix-blend-multiply" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">卓越的技术实力</h2>
            <p className="text-slate-600 mb-6 text-lg">
              技术团队融合高分子科学、材料工程及精密成型专业知识。我们配备了先进的洁净室环境、全自动化生产线及内部研发实验室，确保从原材料到成品的每一个环节都达到国际顶尖标准。
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-tops-blue rounded-full"></div>
                10万级洁净室生产环境 (ISO Class 8)
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-tops-blue rounded-full"></div>
                高精度自动化注塑成型设备
              </li>
              <li className="flex items-center gap-3 text-slate-700">
                <div className="w-2 h-2 bg-tops-blue rounded-full"></div>
                完备的理化与微生物实验室
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
