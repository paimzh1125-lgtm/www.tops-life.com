/** 重新生成全新首页代码（Vite + React + Tailwind）
 * 需求：
 *  - 底色为“蓝白色”主题（#E6F4FF + 白色 + 蓝色点缀）
 *  - 内容保持与当前版本一致（文字、结构、动画等不变）
 *  - 支持中英文切换
 *  - 图片正常加载（使用 Vite 正确路径）
 */

import React, { useEffect, useState, Suspense, lazy, useRef, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  ArrowRight,
  ShieldCheck,
  Leaf,
  Settings,
  Beaker,
  CheckCircle2,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import ParticleBackground from "../components/ParticleBackground";
const RevealText = lazy(() => import("../components/RevealText"));

gsap.registerPlugin(ScrollTrigger);

const rawSlides = [1, 2, 3, 4, 5].map((id) => ({ id, image: `banner/${id}.jpg` }));

const LANG = {
  zh: {
    who: "Who We Are",
    company: "苏州永爱生命科技有限公司",
    intro:
      "苏州永爱生命科技有限公司是一家以技术为驱动的制造商，专业深耕医用软包装、精密注塑部件及新型生物材料领域。我们将科学专业知识与先进生产体系相结合，为全球生命科学产业提供支持。",
    more: "了解更多",
    values: "核心价值观",
    safety: "安全",
    safetyDesc: "严格遵循最高医疗级规范，确保患者安全，符合监管要求。",
    sustainable: "环保",
    sustainableDesc: "可持续理念融入材料研发，提供生物基环保解决方案。",
    quality: "质量控制",
    qualityDesc: "遵循 ISO 9001 及 ISO 13485，确保生产稳定可控、可追溯。",
    tech: "技术实力",
    techDesc:
      "技术团队融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
    lab1: "10万级洁净室生产环境",
    lab2: "高精度全电动注塑设备",
    lab3: "完备的理化、微生物、生物相容性实验室",
    slides: [
      {
        title: "无菌。可靠。为医疗安全匠心打造。",
        subtitle:
          "高性能软包装，为药品及医疗器械生产的每一个环节提供安全保障。",
      },
      {
        title: "面向关键医用部件的先进注塑成型技术",
        subtitle:
          "通过 ISO 13485 认证的生产流程，提供精密、稳定且值得信赖的产品。",
      },
      {
        title: "助力未来生物材料发展的可持续大豆蛋白",
        subtitle:
          "非转基因功能性大豆蛋白解决方案，应用于纸张/纸板涂布和水性油墨等行业。",
      },
      { title: "科研级生产环境", subtitle: "持续扩展制造能力，以满足生命科学行业严格要求。" },
      { title: "先进产线与质量体系", subtitle: "稳定、可追溯的质量体系，为全球客户提供高等级产品。" },
    ],
    market: ["医疗器械", "制药生产", "新材料", "大豆蛋白聚合物"],
    marketDesc: [
      "无菌包装、精密部件",
      "药品包装、阻隔薄膜",
      "环保生物材料",
      "纸张/纸板涂布、水性油墨",
    ],
  },
  en: {
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    intro:
      "Suzhou Tops Life Technology Co., Ltd. is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials.",
    more: "Learn More",
    values: "Core Values",
    safety: "Safety",
    safetyDesc: "Compliant with the highest medical standards to ensure patient safety.",
    sustainable: "Sustainability",
    sustainableDesc: "Bio-based sustainable material solutions.",
    quality: "Quality Control",
    qualityDesc: "ISO 9001 & ISO 13485 certified traceable processes.",
    tech: "Technical Strength",
    techDesc:
      "Our team integrates polymer science, materials engineering, and precision molding expertise.",
    lab1: "Class 100,000 Cleanroom",
    lab2: "High-precision electric injection molding",
    lab3: "Full QC & microbiology laboratories",
    slides: [
      {
        title: "Sterile. Reliable.",
        subtitle: "High-performance packaging ensuring safety across production.",
      },
      {
        title: "Advanced Injection Molding",
        subtitle: "ISO 13485 certified processes delivering reliability.",
      },
      {
        title: "Sustainable Biomaterials",
        subtitle:
          "Non-GMO soy protein solutions for coatings and water-based inks.",
      },
      { title: "Research-grade Manufacturing", subtitle: "Expanding capabilities for strict quality." },
      { title: "Advanced Production & Quality", subtitle: "Stable and traceable global supply." },
    ],
    market: [
      "Medical Devices",
      "Pharmaceutical Manufacturing",
      "Advanced Materials",
      "Soy Protein Polymers",
    ],
    marketDesc: [
      "Sterile packaging, precision components",
      "Pharma packaging & films",
      "Eco-friendly biomaterials",
      "Paper coating, water-based inks",
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState("zh");
  const t = LANG[lang];

  return (
    <div className="bg-[#E6F4FF] text-slate-900 min-h-screen overflow-x-hidden">
      {/* Lang Switch */}
      <button
        onClick={() => setLang(lang === "zh" ? "en" : "zh")}
        className="fixed top-6 right-6 z-50 px-5 py-2.5 bg-white/90 text-slate-800 rounded-full shadow-md hover:shadow-xl transition-all flex gap-2 items-center"
      >
        <Globe size={18} className="text-blue-500" />
        {lang === "zh" ? "English" : "中文"}
      </button>

      {/* Banner */}
      <section className="h-screen">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          autoplay={{ delay: 5000 }}
          effect="fade"
          loop
          pagination={{ clickable: true }}
          className="h-full"
        >
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                <img
                  src={s.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg mb-4">
                      {t.slides[i].title}
                    </h1>
                    <p className="text-lg md:text-2xl opacity-90 max-w-2xl mx-auto">
                      {t.slides[i].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-bold rounded-full uppercase">
            {t.who}
          </div>
          <h2 className="text-4xl font-bold mt-4 mb-6">{t.company}</h2>
          <p className="text-lg text-slate-700 leading-relaxed">{t.intro}</p>
        </div>
