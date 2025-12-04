import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleBackground from "../components/ParticleBackground";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);

// 多语言 JSON（后续可拆分）
const dict = {
  zh: {
    nav: ["首页", "产品中心", "关于我们", "联系我们"],
    marketDesc: [
      "无菌包装解决方案、精密医用部件",
      "药品包装、阻隔功能薄膜",
      "环保型生物材料及复合应用",
      "适用于纸张涂布与水性油墨的大豆蛋白聚合物",
    ],
    techText:
      "技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
  },
  en: {
    nav: ["Home", "Products", "About", "Contact"],
    marketDesc: [
      "Sterile packaging solutions and precision medical components",
      "Pharmaceutical packaging and barrier functional films",
      "Eco‑friendly biomaterials and composite applications",
      "Soy‑protein polymers for paper coating and water‑based inks",
    ],
    techText:
      "Our technical team integrates polymer science, materials engineering, and precision molding expertise, supported by cleanrooms, automated production lines, and in‑house R&D laboratories.",
  },
};

export default function IndexPage() {
  const introRef = useRef(null);
  const bannerTitleRefs = useRef([]);
  const [lang, setLang] = React.useState("zh");
  const t = (zh, en) => (lang === "zh" ? zh : en);

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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-900 overflow-hidden relative">
      <Helmet>
        <title>{t("苏州永爱生命科技有限公司", "Suzhou Tops Life Technology Co., Ltd.")}</title>
        <meta
          name="description"
          content={t(
            "医用软包装、精密注塑及大豆蛋白新材料制造商。",
            "Manufacturer specializing in medical soft packaging, precision injection molding, and soy‑protein biomaterials."
          )}
        />
      </Helmet>

      {/* 顶部导航 */}
      <nav className="absolute top-0 left-0 w-full z-50 py-5 px-10 flex justify-between items-center text-sm font-medium">
        <div className="font-bold text-lg">TOPS LIFE</div>
        <div className="flex gap-8">
          {dict[lang].nav.map((item, idx) => (
            <a key={idx} href="#" className="hover:text-blue-600 transition">{item}</a>
          ))}
        </div>
        <button
          onClick={() => setLang(lang === "zh" ? "en" : "zh")}
          className="px-3 py-1 bg-white/70 rounded-md shadow"
        >
          {lang === "zh" ? "EN" : "中"}
        </button>
      </nav>

      <ParticleBackground />

      {/* Banner */}
      <Swiper modules={[Autoplay]} effect="fade" autoplay={{ delay: 8000 }} speed={1200} loop>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <SwiperSlide key={n}>
            <section
              className="h-screen flex items-center justify-center bg-cover bg-center relative"
              style={{ backgroundImage: `url(/banner/${n}.jpg)` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="relative text-center backdrop-blur-sm bg-black/30 p-8 rounded-lg">
                <h1
                  className="text-4xl lg:text-5xl font-bold mb-4"
                  ref={(el) => (bannerTitleRefs.current[i] = el)}
                >
                  <div className="line">
                    {[
                      t("无菌。可靠。为医疗安全匠心打造。", "Sterile. Reliable. Crafted for medical safety."),
                      t("面向关键医用部件的先进注塑成型技术", "Advanced injection molding for critical components"),
                      t("助力未来生物材料发展的可持续大豆蛋白", "Sustainable soy protein for future biomaterials"),
                      t("科研级生产环境", "Research‑grade manufacturing environment"),
                      t("先进产线与质量体系", "Advanced production lines and quality systems"),
                    ][i]}
                  </div>
                </h1>

                <p className="opacity-90 max-w-xl mx-auto text-lg">
                  {[
                    t("高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。", "High‑performance sterile packaging ensuring safety at every stage."),
                    t("通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。", "ISO 13485‑certified precision and reliability."),
                    t("非转基因功能性大豆蛋白解决方案，可用于纸张/纸板涂布、水性油墨行业。", "Non‑GMO soy‑protein solutions for coatings and inks."),
                    t("持续扩展制造能力，以满足生命科学行业严格要求。", "Expanding capabilities to meet life‑science standards."),
                    t("稳定、可追溯的质量体系，为全球客户提供高等级产品。", "Traceable, stable quality for global clients."),
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
            <h2 className="text-3xl font-bold mb-4">
              {t("苏州永爱生命科技有限公司", "Suzhou Tops Life Technology Co., Ltd.")}
            </h2>
            <p className="text-lg leading-relaxed opacity-95 max-w-2xl">
              {t(
                "苏州永爱生命科技有限公司是一家以技术为驱动的制造商，专注医用软包装、精密注塑部件及新型生物材料研发生产。",
                "A technology‑driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials."
              )}
            </p>
          </div>

          {/* Logo */}
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
          <h3 className="text-2xl font-semibold mb-8 text-center">
            {t("核心价值观", "Core Values")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              t("安全", "Safety"),
              t("环保", "Sustainability"),
              t("质量控制", "Quality Control"),
            ].map((title, idx) => (
              <article
                key={idx}
