import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  PackageOpen,
  DraftingCompass,
  Sprout,
  CheckCircle2,
  Globe2,
  Microscope,
  Award,
  Activity,
  Layers,
  ShieldCheck,
  Calendar
} from "lucide-react";

// Context
import { useLanguage } from "../components/LanguageContext";
// Data

const ALL_NEWS = [
  { 
    id: 1,
    year: "2025", 
    dateLabel_zh: "01月", 
    dateLabel_en: "Jan",
    tag_zh: "可持续发展", 
    tag_en: "Sustainability",
    title_zh: "荣获法国 EcoVadis 可持续发展银牌认证", 
    title_en: "Achieved EcoVadis Sustainability Silver Rating",
    desc_zh: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
    desc_en: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our CSR journey.",
    category: "Corporate"
  },
  { 
    id: 2,
    year: "2024", 
    dateLabel_zh: "年度创新", 
    dateLabel_en: "Innovation",
    tag_zh: "产品研发", 
    tag_en: "R&D",
    title_zh: "成功开发三层易揭自封袋", 
    title_en: "Developed 3-Layer Easy-Peel Self-Sealing Bag",
    desc_zh: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
    desc_en: "Innovatively solved storage and contamination issues for cell culture flasks. This product significantly improves safety and convenience in sterile labs.",
    category: "Products"
  },
  { 
    id: 3,
    year: "2023", 
    dateLabel_zh: "年度基建", 
    dateLabel_en: "Expansion",
    tag_zh: "产能升级", 
    tag_en: "Upgrade",
    title_zh: "升级扩建 ISO Class 7 洁净室", 
    title_en: "Upgraded to ISO Class 7 Cleanroom",
    desc_zh: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
    desc_en: "Completed the expansion of our ISO Class 7 cleanroom. Introduced advanced air purification systems to ensure the strictest production environment.",
    category: "Corporate"
  },
  { 
    id: 4,
    year: "2019", 
    dateLabel_zh: "03月", 
    dateLabel_en: "Mar",
    tag_zh: "质量体系", 
    tag_en: "Quality",
    title_zh: "取得 ISO 13485 & 9001 双重认证", 
    title_en: "Obtained ISO 13485 & 9001 Certificates",
    desc_zh: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
    desc_en: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain.",
    category: "Corporate"
  }
];

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

// --- Data & Config ---

const LANG = {
  zh: {
    metaTitle: "首页 | 苏州永爱生命科技有限公司 - 医用软包装与生物材料专家",
    metaDesc: "永爱生命科技专注医疗软包装、精密注塑及生物基新材料。拥有ISO 7级洁净车间，提供无菌屏障系统与可持续医疗解决方案。",
    heroTag: "创新医疗科技合作伙伴",
    who: "关于我们",
    companyPrefix: "永爱",
    companySuffix: "生命科技有限公司",
    intro: "永爱 Tops-Life 成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应等领域的创新型企业。公司在医疗行业、特种纸、油墨行业等多个领域的各类组件方面拥有丰富经验。秉持 “质量为先” 的理念，我们聚焦洁净软包装、精密注塑及生物基新材料三大核心业务，致力于为全球客户提供更安全、更环保、更高效的解决方案。",
    introPoints: ["ISO 7 (万级) 洁净车间", "全流程质量追溯"],
    more: "探索详情",
    stats: [
      { num: "15+", label: "年行业经验" },
      { num: "10k", label: "级洁净车间" }, 
      { num: "50+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务解决方案",
    solutionsDesc: "以专业技术满足不同业务需求，提供一站式解决方案。",
    solutions: [
      {
        title: "医疗软包装解决方案",
        desc: "提供高性能无菌屏障系统。包括医用级薄膜和医用级PE袋子，确保全生命周期无菌安全。",
        icon: <PackageOpen size={32} />,
        link: "/products#packaging"
      },
      {
        title: "精密医疗注塑件",
        desc: "依托全电动注塑工艺与 ISO 13485 体系，制造公差微米级的关键医疗零部件，广泛应用于微创手术器械。",
        icon: <DraftingCompass size={32} />,
        link: "/products#molding"
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的革新性生物基材料。为纸张涂布、水性油墨及工业包装领域提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
        link: "/products#material"
      }
    ],
    tech: "研发与技术实力",
    techDesc: "融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
    qualityCard: { rate: "99.9%", title: "质量保证", desc: "严格把控每一个生产环节。" },
    // Static Hero Content (Consolidated from Slide 1)
    hero: { 
      title: "融汇绿色科技，守护生命未来", 
      subtitle: "从生物基新材料到无菌屏障，我们以可持续方案重新定义医疗制造。" 
    },
    marketTitle: "应用领域",
    marketDesc: "覆盖生命科学关键领域，提供高标准产品支持。",
    market: [
      { title: "医疗器械", desc: "为二类/三类医疗器械提供符合 ISO 13485 标准的无菌屏障包装。" },
      { title: "制药生产", desc: "提供符合 GMP 标准的药用级过程保护与一次性耗材。" },
      { title: "新材料应用", desc: "探索高性能生物基材料在环保包装与工业领域的创新应用。" },
      { title: "生物聚合物", desc: "源自天然的改性大豆蛋白材料，助力全球碳中和目标。" }
    ],
    marketBtn: "查看所有行业",
    newsTitle: "最新动态",
    newsBtn: "查看更多新闻",
    cta: "准备好开启下一个项目了吗？",
    ctaBtn: "联系我们",
    skipLink: "跳转至主要内容",
  },
  en: {
    metaTitle: "Home | Suzhou Tops Life Technology - Medical Packaging & Biomaterials Expert",
    metaDesc: "Tops Life specializes in medical soft packaging, precision injection molding, and soy protein polymers. ISO 7 cleanroom certified sustainable solutions.",
    heroTag: "Innovative MedTech Partner",
    who: "About Us",
    companyPrefix: "Suzhou Tops Life",
    companySuffix: " Technology Co., Ltd.",
    intro: "Established in 2011, Suzhou Tops-Life is a technology-driven manufacturer specializing in medical soft packaging, precision injection components, and innovative biomaterials. With extensive experience across medical, specialty paper, and ink industries, we adhere to 'Quality First' philosophy. We focus on clean packaging, precision molding, and bio-based materials to deliver safer, more efficient solutions globally.",
    introPoints: ["ISO 7 Cleanroom", "Full Quality Traceability"],
    more: "Discover More",
    stats: [
      { num: "15+", label: "Years Exp." },
      { num: "10k", label: "Clean Class" }, 
      { num: "50+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Solutions",
    solutionsDesc: "Meeting diverse business needs with professional technology and one-stop solutions.",
    solutions: [
      {
        title: "Medical Soft Packaging",
        desc: "High-performance sterile barrier systems. Including medical-grade films and PE bags, ensuring sterility integrity throughout the lifecycle.",
        icon: <PackageOpen size={32} />,
        link: "/products#packaging"
      },
      {
        title: "Precision Injection Molding",
        desc: "Micron-level precision components manufactured under ISO 13485. Utilizing all-electric injection molding for critical medical parts.",
        icon: <DraftingCompass size={32} />,
        link: "/products#molding"
      },
      {
        title: "Soy Protein Polymers",
        desc: "Innovative bio-based materials derived from non-GMO soy. Providing biodegradable alternatives for paper coating, inks, and packaging.",
        icon: <Sprout size={32} />,
        link: "/products#material"
      }
    ],
    tech: "R&D Strength",
    techDesc: "Integrating polymer science, materials engineering, and precision molding expertise.",
    qualityCard: { rate: "99.9%", title: "Quality Assurance", desc: "Strict control in every step." },
    // Static Hero Content (Consolidated from Slide 1)
    hero: { 
      title: "Green Tech, Guarding the Future", 
      subtitle: "Redefining medical manufacturing with sustainable solutions, from bio-materials to sterile barriers." 
    },
    marketTitle: "Market Applications",
    marketDesc: "Deep industry insights covering key areas of life sciences and industrial applications.",
    market: [
      { title: "Medical Devices", desc: "ISO 13485 compliant sterile barrier packaging for Class II/III devices." },
      { title: "Pharma", desc: "GMP-compliant process protection and single-use consumables." },
      { title: "Advanced Materials", desc: "Innovative applications of high-performance bio-based materials." },
      { title: "Bio Polymers", desc: "Natural modified soy protein materials aiding carbon neutrality." }
    ],
    marketBtn: "View All Industries",
    newsTitle: "Latest News",
    newsBtn: "View All News",
    cta: "Ready to start your next project?",
    ctaBtn: "Contact Us",
    skipLink: "Skip to content",
  },
};

export default function Home() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

  // 智能处理标题分行与渐变色逻辑 (优化：支持中英文逗号混用，更稳健)
  const heroTitleParts = useMemo(() => {
    const parts = t.hero.title.split(/,|，/);
    return {
      main: parts[0],
      sub: (parts[1] || "").trim() // 去除可能存在的多余空格
    };
  }, [t.hero.title]);

  // SEO & Meta Handling
  useEffect(() => {
    document.title = t.metaTitle;
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t.metaDesc);

    // Canonical Tag (防重复)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('#')[0]);
  }, [language, t.metaTitle, t.metaDesc]);

  // GSAP Animations with Mobile Check
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Use matchMedia to skip heavy animations on mobile
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const fadeUps = document.querySelectorAll(".gsap-fade-up");
        fadeUps.forEach((el) => {
          gsap.fromTo(el, { y: 30, opacity: 0 }, {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { 
              trigger: el, 
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
          });
        });

        const counters = document.querySelectorAll(".counter-number");
        counters.forEach(counter => {
          gsap.from(counter, {
            textContent: 0,
            duration: 1.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: { trigger: counter, start: "top 90%" },
          });
        });
      });
      
      // Simpler animations for mobile
      mm.add("(max-width: 767px)", () => {
        const fadeUps = document.querySelectorAll(".gsap-fade-up");
        fadeUps.forEach((el) => {
          gsap.fromTo(el, { opacity: 0 }, {
            opacity: 1, duration: 0.8,
            scrollTrigger: { trigger: el, start: "top 90%" },
          });
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); 

  // Hero Parallax Effect (鼠标视差交互)
  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      
      // 仅在桌面端 (宽度 >= 1024px) 启用视差效果，避免手机端误触
      mm.add("(min-width: 1024px)", () => {
        const onMove = (e: MouseEvent) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 2;
          const y = (e.clientY / window.innerHeight - 0.5) * 2;
          
          if (heroBgRef.current) {
            // 背景反向移动，幅度较大
            gsap.to(heroBgRef.current, { x: -x * 20, y: -y * 20, duration: 1.5, ease: "power2.out" });
          }
          if (heroContentRef.current) {
            // 内容同向微动，幅度较小
            gsap.to(heroContentRef.current, { x: x * 10, y: y * 10, duration: 1.5, ease: "power2.out" });
          }
        };
        section.addEventListener("mousemove", onMove);
        return () => section.removeEventListener("mousemove", onMove);
      });
    }, heroSectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* Accessibility Skip Link */}
      <a 
        href="#main-content"
        className="fixed top-0 left-0 p-3 bg-sky-600 text-white transform -translate-y-full transition-transform focus:translate-y-0 z-[100] outline-none ring-2 ring-white"
      >
        {t.skipLink}
      </a>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
         <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-sky-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 animate-float"></div>
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-50/60 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 animate-float [animation-delay:2s]"></div>
      </div>

      <main id="main-content">
        
        {/* === Hero Section (Static Image, Single Content) === */}
        <section 
          ref={heroSectionRef}
          aria-labelledby="hero-heading" 
          className="min-h-screen relative overflow-hidden z-10 flex flex-col"
        >
          {/* Static Background */}
          <div className="absolute inset-0 z-0">
            <div ref={heroBgRef} className="w-full h-full scale-110">
              <img 
                src="banner/hero-bg.webp" 
                alt="Tops-Life Medical Packaging and Precision Manufacturing in Cleanroom" 
                className="w-full h-full object-cover object-center opacity-90 animate-ken-burns" 
                fetchPriority="high"
              />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
          </div>

          {/* Static Content (No Slider) */}
          <div ref={heroContentRef} className="flex-grow w-full flex items-center px-6 md:px-12 lg:px-24 relative z-10 py-20">
            <div className="max-w-4xl text-white pt-12">
              
              {/* Tag */}
              <div className="overflow-hidden mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/20 bg-sky-900/40 backdrop-blur-md text-sky-300 text-xs font-bold uppercase tracking-widest shadow-lg">
                  <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></div>
                  {t.heroTag}
                </div>
              </div>
              
              {/* Headline */}
              <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                {heroTitleParts.main}<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                  {heroTitleParts.sub}
                </span>
              </h1>
              
              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-10 font-light leading-relaxed border-l-2 border-sky-500 pl-6">
                {t.hero.subtitle}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/products"
                  className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white rounded-full font-medium transition-all hover:shadow-[0_0_25px_rgba(14,165,233,0.4)] flex items-center gap-2 group active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/50"
                >
                  {t.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/contact"
                  className="relative px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-full font-medium transition-all group overflow-hidden hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                >
                  <span className="relative z-10">{t.ctaBtn}</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="bg-white border-b border-slate-100 py-6 relative z-10 overflow-hidden" role="complementary" aria-label="Certifications">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><ShieldCheck className="text-sky-600" /> ISO 13485</div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><ShieldCheck className="text-sky-600" /> ISO 9001</div>
                <div className="flex items-center gap-2 text-slate-600 font-bold text-lg"><Activity className="text-sky-600" /> EcoVadis Silver</div>
            </div>
          </div>
        </div>

        {/* === About Section === */}
        <section aria-labelledby="about-title" className="relative py-24 lg:py-32 bg-white z-10 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
            <Globe2 className="w-full h-full text-slate-900" strokeWidth={0.5} />
          </div>

          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 relative gsap-fade-up">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white shadow-slate-200/50">
                <img 
                  src="banner/outsight.jpg" 
                  loading="lazy" 
                  alt="Modern factory exterior showing the Tops-Life facility" 
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/20 to-transparent pointer-events-none"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-4 md:right-8 bg-white/95 backdrop-blur p-6 rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-50 animate-float max-w-xs z-20 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-sky-50 rounded-full text-sky-600">
                    <Award size={28} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-800">ISO 13485</div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">Certified Quality</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 gsap-fade-up">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[3px] bg-sky-500 inline-block rounded-full"></span>
                <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">{t.who}</span>
              </div>
              
              <h2 id="about-title" className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 mb-8 leading-tight">
                {t.companyPrefix}<span className="text-sky-600">{t.companySuffix}</span>
              </h2>
              
              <p className="text-slate-600 text-[1.05rem] leading-[1.8] text-justify mb-8">
                {t.intro}
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {t.introPoints.map((point, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <CheckCircle2 size={18} className="text-sky-500 shrink-0" /> <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-8 md:gap-12 pt-8 border-t border-slate-100">
                {t.stats.map((stat, i) => (
                  <div key={i}>
                    <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-1 flex items-baseline">
                      <span className="counter-number">{stat.num.replace(/\D/g,'')}</span>
                      <span className="text-lg text-sky-500 ml-0.5">{stat.num.replace(/\d/g,'')}</span>
                    </div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* === Solutions Section === */}
        <section aria-labelledby="solutions-title" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
              <h2 id="solutions-title" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
              <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto rounded-full"></div>
              <p className="mt-6 text-slate-500">{t.solutionsDesc}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {t.solutions.map((item, idx) => (
                <Link 
                  key={idx} 
                  to={item.link}
                  className="gsap-fade-up group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 transition-all duration-300 border border-slate-100 hover:border-sky-200 hover:-translate-y-2 overflow-hidden flex flex-col h-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                >
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-50 rounded-full transition-transform duration-500 group-hover:scale-150"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                        idx === 0 ? 'bg-sky-500' : idx === 1 ? 'bg-blue-600' : 'bg-cyan-500'
                      }`} aria-hidden="true">
                      {item.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-1">{item.desc}</p>
                    
                    <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-sky-600 transition-colors uppercase tracking-wider mt-auto">
                      {t.more} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === R&D Strength Section (Unified Sky Palette) === */}
        <section aria-labelledby="rnd-title" className="py-24 lg:py-32 bg-white text-slate-900 relative overflow-hidden z-10">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 100 L100 0" stroke="#e2e8f0" strokeWidth="0.2" />
              <path d="M-20 100 L80 0" stroke="#e2e8f0" strokeWidth="0.2" />
            </svg>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 gsap-fade-up">
                <div className="flex items-center gap-3 mb-6">
                  <span className="p-2 bg-sky-50 border border-sky-100 rounded-lg text-sky-600"><Microscope size={24} /></span>
                  <span className="text-sky-600 font-bold tracking-widest uppercase">R&D Center</span>
                </div>
                <h2 id="rnd-title" className="text-4xl lg:text-5xl font-bold mb-8 leading-tight text-slate-900">
                  {t.tech} <span className="text-sky-500">.</span>
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed mb-10 border-l-4 border-sky-500 pl-6">{t.techDesc}</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-default group">
                    <Activity className="text-sky-500 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">ISO 13485 Certified</h4>
                      <p className="text-sm text-slate-500">国际医疗器械质量管理体系</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all cursor-default group">
                    {/* Updated to sky-400 for consistency */}
                    <Layers className="text-sky-500 group-hover:scale-110 transition-transform" size={24} />
                    <div>
                      <h4 className="font-bold text-lg text-slate-900">10,000 Class Cleanroom</h4>
                      <p className="text-sm text-slate-500">高标准洁净生产环境</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 relative h-[450px] gsap-fade-up">
                <div className="absolute top-0 right-0 w-[90%] h-[85%] rounded-2xl overflow-hidden border border-white/20 shadow-2xl z-10">
                  <img 
                      src="images/industry1.jpg" 
                      loading="lazy" 
                      className="w-full h-full object-cover" 
                      alt="Laboratory technicians working in a sterile environment" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000'; }}
                  />
                  <div className="absolute inset-0 bg-sky-900/30 mix-blend-overlay"></div>
                </div>
                <div className="absolute bottom-8 -left-4 w-[40%] bg-white text-slate-900 p-6 rounded-xl shadow-xl z-20 hidden md:block animate-float">
                  <div className="text-3xl font-bold text-sky-600 mb-1">{t.qualityCard.rate}</div>
                  <div className="text-sm font-bold text-slate-800">{t.qualityCard.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{t.qualityCard.desc}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === Market Application === */}
        <section aria-labelledby="market-title" className="py-24 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gsap-fade-up gap-4">
              <div>
                <h2 id="market-title" className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">{t.marketTitle}</h2>
                <p className="text-slate-500 max-w-lg">{t.marketDesc}</p>
              </div>
              <Link 
                to="/products"
                className="flex items-center gap-2 text-sky-600 font-bold hover:text-sky-700 hover:gap-3 transition-all px-4 py-2 rounded-lg hover:bg-sky-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
              >
                {t.marketBtn} <ArrowRight size={20} />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.market.map((item, i) => (
                <Link 
                  key={i} 
                  className="gsap-fade-up group relative h-72 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-200"
                  to="/products"
                >
                  <img 
                      src={`images/application${i + 1}.png`} 
                      loading="lazy"
                      alt={`${item.title} application example`} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <div className="w-8 h-1 bg-sky-500 rounded-full mb-3 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                      <p className="text-slate-200 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === Latest News === */}
        <section aria-labelledby="news-title" className="py-24 bg-slate-50 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center mb-12 gsap-fade-up">
                <h2 id="news-title" className="text-3xl lg:text-4xl font-bold text-slate-900">{t.newsTitle}</h2>
                <Link 
                  to="/news" 
                  className="text-sky-600 font-bold hover:gap-2 flex items-center gap-1 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg px-2 py-1"
                >
                  {t.newsBtn} <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {ALL_NEWS.slice(0, 3).map((news, i) => (
                  <Link 
                    key={news.id} 
                    to="/news"
                    className="gsap-fade-up bg-white rounded-2xl p-8 border border-slate-100 hover:border-sky-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer focus-within:ring-4 focus-within:ring-sky-200" 
                  >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-bold text-sky-500 bg-sky-50 px-3 py-1 rounded-full">
                          {language === 'zh' ? news.tag_zh : news.tag_en}
                        </span>
                        <time className="text-sm text-slate-400 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                            <Calendar size={14} aria-hidden="true" /> 
                            {news.year} {language === 'zh' ? news.dateLabel_zh : news.dateLabel_en}
                        </time>
                      </div>
                      <h3>
                        <div 
                          className="text-left text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors line-clamp-2"
                        >
                          {language === 'zh' ? news.title_zh : news.title_en}
                        </div>
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                        {language === 'zh' ? news.desc_zh : news.desc_en}
                      </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* === CTA Section === */}
        <section aria-labelledby="cta-title" className="py-20 relative overflow-hidden bg-sky-600">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-600 to-blue-600 z-0"></div>
          <div className="absolute -top-[50%] -right-[10%] w-[600px] h-[600px] bg-white/10 rounded-full blur-[80px]"></div>
          
          {/* 流光背景动画 */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine-flow"></div>
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
            <h2 id="cta-title" className="text-3xl md:text-5xl font-bold mb-8 tracking-tight drop-shadow-sm">{t.cta}</h2>
            <Link 
              to="/contact"
              className="px-12 py-4 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              {t.ctaBtn}
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }
        .animate-ken-burns { animation: ken-burns 20s ease-out infinite alternate; }
        
        @keyframes slide-up-fade { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-slide-up-fade { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-15px); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes shine-flow {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        .animate-shine-flow { animation: shine-flow 6s linear infinite; }
      `}</style>
    </div>
  );
}
