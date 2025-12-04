// Vite + React 版本首页 (/pages/index.tsx)
// 使用用户最初需求完整实现（5 banner + 粒子背景 + GSAP 动画 + 核心价值观 + 市场应用 + 技术实力）

import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "../components/ParticleBackground";


gsap.registerPlugin(ScrollTrigger);

export default function IndexPage() {
  const introRef = useRef(null);
  const bannerTitleRefs = useRef([]);

  useEffect(() => {
    bannerTitleRefs.current.forEach((el) => {
      if (!el) return;
      const lines = Array.from(el.querySelectorAll(".line"));
      gsap.from(lines, {
        y: 60,
        opacity: 0,
        duration: 1.8,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    });

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
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden relative">
      <ParticleBackground />

      {/* Swiper Banner */}
      <Swiper modules={[Autoplay]} effect="fade" autoplay={{ delay: 8000 }} speed={1200} loop>
        {/* Banner 内容 */}
        {[1, 2, 3, 4, 5].map((n, i) => (
          <SwiperSlide key={n}>
            <section
              className="h-screen flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(/banner/${n}.jpg)` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4" ref={(el) => (bannerTitleRefs.current[i] = el)}>
                  <div className="line">
                    {[
                      "无菌。可靠。为医疗安全匠心打造。",
                      "面向关键医用部件的先进注塑成型技术",
                      "助力未来生物材料发展的可持续大豆蛋白",
                      "科研级生产环境",
                      "先进产线与质量体系",
                    ][i]}
                  </div>
                </h1>
                <p className="opacity-90 max-w-xl mx-auto text-lg">
                  {[
                    "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。",
                    "通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。",
                    "非转基因功能性大豆蛋白解决方案，可用于纸张/纸板涂布、水性油墨行业。",
                    "持续扩展制造能力，以满足生命科学行业严格要求。",
                    "稳定、可追溯的质量体系，为全球客户提供高等级产品。",
                  ][i]}
                </p>
              </div>
            </section>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 公司简介 */}
      <section className="py-28" ref={introRef}>
        <div className="intro-content container mx-auto px-6 lg:px-20 text-center lg:text-left flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">苏州永爱生命科技有限公司</h2>
            <p className="text-lg leading-relaxed opacity-95 max-w-2xl">
              苏州永爱生命科技有限公司（Suzhou Tops Life Technology Co., Ltd.）是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。
            </p>
          </div>

          <div className="w-48 h-48 flex-shrink-0">
            <svg viewBox="0 0 120 120" className="w-full h-full">
              <g fill="none" stroke="#40C4FF" strokeWidth={1.6} strokeLinecap="round">
                <path className="logo-line" d="M10 60 Q40 10 70 60 T110 60" />
                <path className="logo-line" d="M20 80 H100" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 核心价值观 */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">核心价值观</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["安全", "环保", "质量控制"].map((title, idx) => (
              <article
                key={title}
                className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 shadow-[0_10px_30px_rgba(64,196,255,0.12)]"
              >
                <h4 className="text-xl font-medium mb-2">{title}</h4>
                <p className="text-sm opacity-90">
                  {[
                    "严格遵循最高医疗级规范，确保患者安全，符合监管要求。",
                    "可持续理念融入材料研发，提供生物基环保解决方案。",
                    "遵循 ISO 9001 / ISO 13485，确保生产稳定可控、可追溯。",
                  ][idx]}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 市场应用 */}
      <section className="py-20 bg-gradient-to-b from-transparent to-black/10">
        <div className="container mx-auto px-6 lg:px-20">
          <h3 className="text-2xl font-semibold mb-8 text-center">市场应用</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["医疗器械", "制药生产", "新材料", "大豆蛋白聚合物"].map((title, idx) => (
              <div
                key={title}
                className="p-4 rounded-lg bg-white/3 hover:bg-white/5 transition-all duration-200"
              >
                <div className="text-3xl mb-2">
                  {["🩺", "💊", "⚗️", "🌱"][idx]}
                </div>
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm opacity-90 mt-1">
                  {["无菌包装、精密部件", "药品包装、阻隔薄膜", "环保生物材料", "纸张/纸板涂布、水性油墨"][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 技术实力 */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 rounded-xl overflow-hidden">
            <div
              className="h-80 bg-cover bg-center"
              data-speed="0.94"
              style={{ backgroundImage: "url(/banner/4.jpg)" }}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">技术实力</h3>
            <p className="leading-relaxed opacity-95">
              技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。
            </p>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-sm opacity-80">
        © {new Date().getFullYear()} 苏州永爱生命科技有限公司 • All rights reserved
      </footer>
    </div>
  );
}
