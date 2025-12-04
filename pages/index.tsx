import React, { useEffect, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectFade } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "swiper/css";
import "swiper/css/effect-fade";

// ParticleBackground is provided by the user at: ../components/ParticleBackground.tsx
const ParticleBackground = dynamic(() => import("../components/ParticleBackground"), { ssr: false });

SwiperCore.use([Autoplay, EffectFade]);
gsap.registerPlugin(ScrollTrigger);

const Home: React.FC = () => {
  const introRef = useRef<HTMLDivElement | null>(null);
  const bannerTitleRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // SplitText-like effect: wrap each line manually with <div className="line"> in markup and animate stagger
    bannerTitleRefs.current.forEach((el) => {
      if (!el) return;
      const lines = Array.from(el.querySelectorAll<HTMLElement>(".line"));
      gsap.from(lines, {
        y: 60,
        opacity: 0,
        duration: 1.8,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      });
    });

    // Company intro pin animation
    if (introRef.current) {
      gsap.from(introRef.current.querySelector(".intro-content"), {
        y: 80,
        opacity: 0.3,
        filter: "blur(3px)",
        duration: 1.2,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 60%",
          end: "+=200",
          pin: true,
        },
      });

      // logo line draw
      const logo = introRef.current.querySelectorAll(".logo-line");
      gsap.to(logo, {
        drawSVG: "100%",
        duration: 1.6,
        stagger: 0.1,
        ease: "power2.out",
      } as any);
    }
  }, []);

  return (
    <>
      <Head>
        <title>苏州永爱生命科技 - 首页</title>
        <meta name="description" content="苏州永爱生命科技有限公司 - 医用软包装、精密注塑、新型生物材料" />
      </Head>

      <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-b from-[#0F172A] to-[#0d1b2a] text-white">
        {/* Particle Background (fixed, full screen) */}
        <ParticleBackground />

        {/* Main header / Hero with Swiper */}
        <header className="relative w-full">
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />

          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            speed={1200}
            loop
            className="h-screen"
          >
            {/* Banner 1 */}
            <SwiperSlide>
              <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/banners/banner/1.jpg')" }}>
                <div className="container mx-auto px-6 lg:px-20 text-center">
                  <div className="backdrop-blur-sm bg-black/30 inline-block p-8 rounded-lg">
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4" ref={(el) => (bannerTitleRefs.current[0] = el)}>
                      <div className="line">无菌。可靠。为医疗安全匠心打造。</div>
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。</p>
                  </div>
                </div>
              </section>
            </SwiperSlide>

            {/* Banner 2 */}
            <SwiperSlide>
              <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/assets/banners/banner/2.jpg')" }}>
                <div className="container mx-auto px-6 lg:px-20 text-center">
                  <div className="backdrop-blur-sm bg-black/30 inline-block p-8 rounded-lg">
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4" ref={(el) => (bannerTitleRefs.current[1] = el)}>
                      <div className="line">面向关键医用部件的先进注塑成型技术</div>
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">通过 ISO 13485 认证的生产流程，为全球医疗制造商提供精密、稳定且值得信赖的产品。</p>
                  </div>
                </div>
              </section>
            </SwiperSlide>

            {/* Banner 3 */}
            <SwiperSlide>
              <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/banner/3.jpg')" }}>
                <div className="container mx-auto px-6 lg:px-20 text-center">
                  <div className="backdrop-blur-sm bg-black/30 inline-block p-8 rounded-lg">
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4" ref={(el) => (bannerTitleRefs.current[2] = el)}>
                      <div className="line">助力未来生物材料发展的可持续大豆蛋白</div>
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业。</p>
                  </div>
                </div>
              </section>
            </SwiperSlide>

            {/* Banner 4 */}
            <SwiperSlide>
              <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/banner/4.jpg')" }}>
                <div className="container mx-auto px-6 lg:px-20 text-center">
                  <div className="backdrop-blur-sm bg-black/30 inline-block p-8 rounded-lg">
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4" ref={(el) => (bannerTitleRefs.current[3] = el)}>
                      <div className="line">科研级生产环境</div>
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">持续扩展制造能力，以满足全球生命科学客户的严格要求。</p>
                  </div>
                </div>
              </section>
            </SwiperSlide>

            {/* Banner 5 */}
            <SwiperSlide>
              <section className="h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/banner/5.jpg')" }}>
                <div className="container mx-auto px-6 lg:px-20 text-center">
                  <div className="backdrop-blur-sm bg-black/30 inline-block p-8 rounded-lg">
                    <h1 className="text-4xl lg:text-5xl font-semibold leading-tight mb-4" ref={(el) => (bannerTitleRefs.current[4] = el)}>
                      <div className="line">先进产线与质量体系</div>
                    </h1>
                    <p className="text-lg opacity-90 max-w-3xl mx-auto">以稳定、可追溯的制造流程，为全球客户提供高等级产品。</p>
                  </div>
                </div>
              </section>
            </SwiperSlide>
          </Swiper>
        </header>

        {/* Company Intro (Pinned) */}
        <section className="py-28" ref={introRef}>
          <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-12">
            <div className="intro-content flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4">苏州永爱生命科技有限公司</h2>
              <p className="max-w-2xl leading-relaxed text-lg opacity-95">
                苏州永爱生命科技有限公司（Suzhou Tops Life Technology Co., Ltd.）是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。公司始终坚守质量、安全与可持续发展的承诺，助力客户满怀信心地开展创新。
              </p>
            </div>

            {/* SVG Logo line animation (simple placeholder) */}
            <div className="w-48 h-48 flex-shrink-0">
              <svg viewBox="0 0 120 120" className="w-full h-full">
                <defs />
                <g fill="none" stroke="#40C4FF" strokeWidth={1.6} strokeLinecap="round">
                  <path className="logo-line" d="M10 60 Q40 10 70 60 T110 60" />
                  <path className="logo-line" d="M20 80 H100" />
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20">
          <div className="container mx-auto px-6 lg:px-20">
            <h3 className="text-2xl font-semibold mb-8 text-center">核心价值观</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "安全", text: "严格遵循最高医疗级规范，确保患者安全，符合监管要求。" },
                { title: "环保", text: "可持续理念融入材料研发，提供生物基环保解决方案。" },
                { title: "质量控制", text: "遵循 ISO 9001 及 ISO 13485，确保生产稳定可控、可追溯。" },
              ].map((c, i) => (
                <article key={c.title} className="bg-white/5 p-6 rounded-2xl transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(64,196,255,0.12)]">
                  <h4 className="text-xl font-medium mb-2">{c.title}</h4>
                  <p className="text-sm opacity-90">{c.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Market Applications */}
        <section className="py-20 bg-gradient-to-b from-transparent to-black/10">
          <div className="container mx-auto px-6 lg:px-20">
            <h3 className="text-2xl font-semibold mb-8 text-center">市场应用</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "医疗器械", text: "无菌包装、精密部件", icon: "🩺" },
                { title: "制药生产", text: "药品包装、阻隔薄膜", icon: "💊" },
                { title: "新材料", text: "环保生物材料", icon: "⚗️" },
                { title: "大豆蛋白聚合物", text: "纸张/纸板涂布、水性油墨", icon: "🌱" },
              ].map((m) => (
                <div key={m.title} className="flex flex-col items-start gap-3 p-4 rounded-lg bg-white/3 hover:bg-white/5 transition-all duration-200">
                  <div className="text-3xl transform transition-transform duration-200 hover:scale-110">{m.icon}</div>
                  <h4 className="font-semibold">{m.title}</h4>
                  <p className="text-sm opacity-90">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Strength (Parallax image + text) */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 overflow-hidden rounded-xl">
              {/* Parallax wrapper - simple data-speed attr handled by CSS/JS */}
              <div className="parallax-image" style={{ transform: "translateZ(0)", backgroundImage: "url('/assets/tech/cleanroom-line.webp')", backgroundSize: 'cover', backgroundPosition: 'center', height: 360 }} data-speed="0.94" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold mb-4">技术实力</h3>
              <p className="leading-relaxed">技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。</p>
            </div>
          </div>
        </section>

        <footer className="py-12 text-center text-sm opacity-80">
          © {new Date().getFullYear()} 苏州永爱生命科技有限公司 • All rights reserved
        </footer>
      </div>

      <style jsx>{`
        /* small helpers for the SplitText-like lines */
        .line { display: block; }

        /* simple parallax listener */
        .parallax-image { will-change: transform; }
      `}</style>

      <script dangerouslySetInnerHTML={{ __html: `
        // Simple parallax for element with data-speed
        (function(){
          const el = document.querySelector('.parallax-image');
          if(!el) return;
          const speed = parseFloat(el.getAttribute('data-speed') || '0.94');
          window.addEventListener('scroll', () => {
            const rect = el.getBoundingClientRect();
            const offset = (window.innerHeight - rect.top) * (1 - speed);
            el.style.transform = 'translateY(' + (offset * 0.15) + 'px)';
          });
        })();
      ` }} />
    </>
  );
};

export default Home;
