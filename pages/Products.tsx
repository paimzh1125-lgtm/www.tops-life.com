import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 1. SVG 图标库 ---
const Icons = {
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Check: () => <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Microscope: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>,
  Layer: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Tool: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Beaker: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>,
  ShieldCheck: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
};

const Products: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { setLoaded(true); }, []);

  // --- GSAP 动画初始化 ---
  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      const fadeUps = gsap.utils.toArray(".gsap-fade-up");
      fadeUps.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, [language]);

  // --- 2. 内容数据 (集成新路径) ---
  const content = {
    zh: {
      hero: {
        title: "专业解决方案",
        subtitle: "从材料科学到精密制造",
        desc: "我们不仅提供产品，更提供符合全球法规要求的医疗器械包装、部件及环保材料的一站式解决方案。"
      },
      tech: {
        title: "核心技术优势",
        items: [
          { icon: <Icons.Microscope />, title: "研发实验室", desc: "物理、化学及微生物全能实验室，具备完整验证能力。" },
          { icon: <Icons.ShieldCheck />, title: "合规保障", desc: "ISO 13485 体系认证，符合 FDA、CE 及 GB 标准。" },
          { icon: <Icons.Tool />, title: "精密智造", desc: "全电动注塑与自动化组装，实现微米级精度控制。" }
        ]
      },
      products: [
        {
          id: "packaging",
          category: "核心业务 01",
          title: "医用洁净软包装系统",
          desc: "专为医疗器械终端灭菌设计的无菌屏障系统（SBS）。我们提供从材料选型、结构设计到灭菌适应性验证的全流程服务，确保产品在有效期内的无菌完整性。",
          subProducts: ["PE袋和卷材", "医用级薄膜", "铝箔/尼龙高阻隔包装", "EVA和TPU (Lidding)"],
          applications: ["医疗器械包装", "药品包装", "手术器械包", "医疗耗材包装"],
          features: ["符合 ISO 11607 标准", "适应 EO/Gamma/蒸汽灭菌", "极低的微粒污染风险"],
          imgDesc: "ISO Class 7 洁净生产",
          image: "/images/industry1.jpg" // 已更新路径
        },
        {
          id: "molding",
          category: "核心业务 02",
          title: "精密医疗注塑与组装",
          desc: "依托 10 万级洁净注塑车间，我们专注于高难度、高精度的医疗高分子部件制造。具备双色注塑、包胶注塑及嵌件注塑能力，并提供移印、超声波焊接等后道工艺。",
          subProducts: ["微流控芯片基底", "外科吻合器组件", "体外诊断耗材", "精密齿轮/传动件"],
          applications: ["医疗设备结构件", "生命科学实验", "诊断设备核心部件", "微创医疗器械部件"],
          features: ["全电动注塑机生产", "模具公差 < 0.005mm", "全程可追溯体系"],
          imgDesc: "精密模具开发与自动化生产",
          image: "/images/injection.jpg" // 已更新路径
        },
        {
          id: "material",
          category: "核心业务 03",
          title: "大豆蛋白生物基新材料",
          desc: "面向未来的可持续解决方案。我们利用改性大豆蛋白技术，开发出高性能、无甲醛的植物基胶黏剂与功能涂层，完美替代传统石油基材料，助力碳中和。",
          subProducts: ["植物基无醛胶黏剂", "可降解阻隔涂层", "环保纸塑复合材料", "特种功能助剂"],
          applications: ["高端消费品包装", "环保包装材料", "可堆肥食品包装", "生物医用辅助材料"],
          features: ["100% 生物降解", "零甲醛 / 零苯", "优异的干湿强度"],
          imgDesc: "绿色化学与可持续发展实验室",
          image: "/images/soy.jpg" // 已更新路径
        }
      ],
      cta: {
        text: "寻找特定的规格或定制方案？",
        sub: "我们的工程师团队随时准备为您提供技术支持。",
        btn: "联系技术顾问"
      }
    },
    en: {
      hero: {
        title: "Our Solutions",
        subtitle: "From Material Science to Manufacturing",
        desc: "We provide one-stop solutions for medical packaging, components, and eco-materials that meet global regulatory requirements."
      },
      tech: {
        title: "Technical Strengths",
        items: [
          { icon: <Icons.Microscope />, title: "R&D Lab", desc: "Comprehensive physical, chemical, and bio labs for full validation." },
          { icon: <Icons.ShieldCheck />, title: "Compliance", desc: "ISO 13485 certified. Adhering to FDA, CE, and GB standards." },
          { icon: <Icons.Tool />, title: "Smart Mfg", desc: "All-electric injection & automation for micron-level precision." }
        ]
      },
      products: [
        {
          id: "packaging",
          category: "Core Business 01",
          title: "Medical Flexible Packaging",
          desc: "Sterile Barrier Systems (SBS) designed for terminal sterilization. We offer full-process services from material selection to validation, ensuring sterility integrity throughout shelf life.",
          subProducts: ["PE Bags and Rolls", "Medical-grade Film", "High Barrier Packaging", "EVA and TPU"],
          applications: ["Pharma Packaging", "Surgical Kits", "Consumables Packaging", "Device Packaging"],
          features: ["ISO 11607 Compliant", "EO/Gamma/Steam Ready", "Low Particulate Risk"],
          imgDesc: "ISO Class 7 Production",
          image: "/images/taoai.png"
        },
        {
          id: "molding",
          category: "Core Business 02",
          title: "Medical Injection Molding",
          desc: "Operating in Class 100k cleanrooms, we focus on high-precision polymer components. Capabilities include 2K molding, over-molding, and insert molding, plus ultrasonic welding assembly.",
          subProducts: ["Microfluidic Chips", "Surgical Staplers", "IVD Consumables", "Precision Gears"],
          applications: ["Device Structural Parts", "Life Science", "Diagnostic Components", "Minimally Invasive Tools"],
          features: ["All-electric Molding", "Tolerance < 0.005mm", "Full Traceability"],
          imgDesc: "Precision Mold & Production",
          image: "/images/injection.jpg"
        },
        {
          id: "material",
          category: "Core Business 03",
          title: "Soy Protein Bio-Materials",
          desc: "Sustainable solutions for the future. Utilizing modified soy protein technology to create high-performance, formaldehyde-free plant-based binders and coatings replacing petrochemicals.",
          subProducts: ["Plant-based Adhesives", "Degradable Coatings", "Eco Paper-Plastic", "Functional Additives"],
          applications: ["Luxury Packaging", "Eco Materials", "Compostable Packaging", "Bio-medical Aids"],
          features: ["100% Biodegradable", "Zero Formaldehyde", "High Wet/Dry Strength"],
          imgDesc: "Green Chemistry Lab",
          image: "/images/soy.jpg"
        }
      ],
      cta: {
        text: "Looking for customization?",
        sub: "Our engineering team is ready to provide technical support.",
        btn: "Contact Consultants"
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* 1. Header Hero */}
      <section className="pt-32 pb-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-white to-white opacity-60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-sky-50 text-sky-600 font-bold text-sm tracking-widest uppercase border border-sky-100 animate-pulse">
                {t.hero.subtitle}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t.hero.desc}
            </p>
        </div>
      </section>

      {/* 2. Technical Strengths (浮动卡片) */}
      <section className="container mx-auto px-6 relative z-20 -mt-12 mb-20">
         <div className="grid md:grid-cols-3 gap-6">
            {t.tech.items.map((item, idx) => (
                <div key={idx} className="gsap-fade-up bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-600 mb-6">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* 3. Main Products Loop (左右交替布局) */}
      <div className="container mx-auto px-6 py-10 space-y-32">
        {t.products.map((product, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={i} id={product.id} className="scroll-mt-32 gsap-fade-up">
               <div className={`flex flex-col lg:flex-row gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* 图片区域 */}
                  <div className="w-full lg:w-1/2 relative group">
                      {/* 背景装饰块 */}
                      <div className={`absolute top-6 -bottom-6 w-full bg-slate-100 rounded-3xl -z-10 transition-transform duration-500 group-hover:scale-[1.02] ${isEven ? '-left-6' : '-right-6'}`}></div>
                      
                      <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl relative border-4 border-white">
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                               (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070';
                            }}
                          />
                          {/* 图片说明标签 */}
                          <div className="absolute bottom-0 right-0 bg-slate-900/90 text-white text-xs font-bold px-5 py-3 rounded-tl-2xl backdrop-blur-md">
                             {product.imgDesc}
                          </div>
                      </div>
                  </div>

                  {/* 文本区域 */}
                  <div className="w-full lg:w-1/2">
                      <div className="mb-2 flex items-center gap-3">
                          <span className="w-8 h-[2px] bg-sky-500"></span>
                          <span className="text-sky-500 font-bold tracking-widest uppercase text-sm">{product.category}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">{product.title}</h2>
                      <p className="text-slate-600 text-lg leading-relaxed text-justify mb-8">{product.desc}</p>
                      
                      {/* 核心特性 Tags */}
                      <div className="flex flex-wrap gap-3 mb-10">
                         {product.features.map((f, idx) => (
                             <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 text-sm font-bold rounded-lg border border-sky-100">
                                 <Icons.Check /> {f}
                             </span>
                         ))}
                      </div>

                      {/* 详情列表 (两列) */}
                      <div className="grid sm:grid-cols-2 gap-8 border-t border-slate-200 pt-8">
                          <div>
                              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                 <Icons.Layer /> {language === 'zh' ? '产品系列' : 'Products'}
                              </h4>
                              <ul className="space-y-2">
                                  {product.subProducts.map((sub, idx) => (
                                      <li key={idx} className="text-slate-600 text-sm flex items-start gap-2 hover:text-sky-600 transition-colors">
                                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 shrink-0 group-hover:bg-sky-500"></span>
                                          {sub}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          <div>
                              <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                                 <Icons.Beaker /> {language === 'zh' ? '应用领域' : 'Applications'}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                  {product.applications.map((app, idx) => (
                                      <span key={idx} className="px-3 py-1 bg-white text-slate-600 border border-slate-200 rounded text-xs hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all cursor-default">
                                          {app}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>

               </div>
            </div>
          );
        })}
      </div>

      {/* 4. CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
          {/* 背景纹理 */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t.cta.text}</h2>
              <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">{t.cta.sub}</p>
              <Link to="/contact">
                <button className="group relative inline-flex items-center gap-3 px-10 py-4 bg-sky-600 text-white rounded-full font-bold text-lg overflow-hidden hover:bg-sky-500 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                    <span>{t.cta.btn}</span>
                    <Icons.ArrowRight />
                </button>
              </Link>
          </div>
      </section>

    </div>
  );
};

export default Products;
