import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册插件
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. 类型定义 (Type Definitions)
// ==========================================
interface SubProductObj {
  name: string;
  link?: string;
}
type SubProduct = string | SubProductObj;

interface ProductItem {
  id: string;
  category: string;
  title: string;
  desc: string;
  subProducts: SubProduct[];
  applications: string[];
  features: string[];
  imgDesc: string;
  image: string;
}

interface ContentState {
  metaTitle: string;
  metaDesc: string;
  hero: { title: string; subtitle: string; desc: string };
  tech: { title: string; items: { icon: JSX.Element; title: string; desc: string }[] };
  products: ProductItem[];
  cta: { text: string; sub: string; btn: string };
}

// ==========================================
// 2. 图标组件 (Icons)
// ==========================================
const Icons = {
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Check: () => <svg className="w-4 h-4 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Microscope: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>,
  Layer: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  Tool: () => <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  Beaker: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>,
  ShieldCheck: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  ExternalLink: () => <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
};

// ==========================================
// 3. 辅助组件：智能链接 (SmartLink)
//    解决：判断字符串/对象、内部/外部链接的复杂逻辑
// ==========================================
const SmartLink: React.FC<{ item: SubProduct }> = ({ item }) => {
  // 情况1: 纯文本
  if (typeof item === 'string') {
    return <span className="cursor-default text-slate-600">{item}</span>;
  }

  const { name, link } = item;

  // 情况2: 无链接或占位符
  if (!link || link === '#') {
    return <span className="cursor-default text-slate-600 hover:text-sky-600 transition-colors">{name}</span>;
  }

  // 情况3: 外部链接 (http 开头)
  if (link.startsWith('http')) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group/link flex items-center gap-1 text-slate-600 hover:text-sky-600 transition-colors"
      >
        <span className="border-b border-transparent group-hover/link:border-sky-600 transition-all">{name}</span>
        <span className="opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300">
          <Icons.ExternalLink />
        </span>
      </a>
    );
  }

  // 情况4: 内部路由 (Router Link)
  return (
    <Link 
      to={link}
      className="group/link flex items-center gap-1 text-slate-600 hover:text-sky-600 transition-colors"
    >
      <span className="border-b border-transparent group-hover/link:border-sky-600 transition-all">{name}</span>
    </Link>
  );
};

// ==========================================
// 4. 静态数据 (DATA) - 移出组件外部以提升性能
// ==========================================
const CONTENT_DATA: { zh: ContentState; en: ContentState } = {
  zh: {
    metaTitle: "产品中心 | 医疗软包装_精密注塑_生物基材料 - 永爱生命",
    metaDesc: "探索永爱生命的核心产品：医用无菌屏障包装系统（PE袋/卷材）、精密医疗注塑件（微流控/吻合器）及大豆蛋白生物基环保材料。",
    hero: {
      title: "专业解决方案",
      subtitle: "从材料科学到精密制造",
      desc: "我们不仅提供产品，更提供符合全球法规要求的医疗器械包装、部件及环保材料的一站式解决方案。"
    },
    tech: {
      title: "为什么选择 TOPS LIFE？",
      items: [
        { icon: <Icons.Microscope />, title: "研发实验室", desc: "拥有设备齐全的物理、化学及微生物实验室，具备完整的验证能力。" },
        { icon: <Icons.ShieldCheck />, title: "合规保障", desc: "严格遵循 ISO 13485 体系，产品符合 FDA、CE 及 GB 药包材标准。" },
        { icon: <Icons.Tool />, title: "精密智造", desc: "引进全电动注塑机与自动化组装线，实现微米级精度控制。" }
      ]
    },
    products: [
      {
        id: "packaging",
        category: "核心业务 01",
        title: "医用洁净软包装系统",
        desc: "专为医疗器械终端灭菌设计的无菌屏障系统（SBS）。我们提供从材料选型、结构设计到灭菌适应性验证的全流程服务，确保产品在有效期内的无菌完整性。",
        subProducts: [
          { name: "PE 袋和卷材", link: "/products/pe-bag" },
          { name: "医用级薄膜", link: "/products/medical-film" },
          { name: "铝箔 / 尼龙高阻隔包装", link: "/products/high-barrier" },
          { name: "EVA 和 TPU (Lidding)", link: "/products/lidding" }
        ],
        applications: ["医疗器械包装", "药品包装", "手术器械包", "医疗耗材包装"],
        features: ["符合 ISO 11607 标准", "适应 EO/Gamma/蒸汽灭菌", "极低的微粒污染风险"],
        imgDesc: "ISO Class 8 洁净车间生产环境",
        image: "/images/taoai.png"
      },
      {
        id: "molding",
        category: "核心业务 02",
        title: "精密医疗注塑与组装",
        desc: "依托 10 万级洁净注塑车间，我们专注于高难度、高精度的医疗高分子部件制造。具备双色注塑、包胶注塑及嵌件注塑能力，并提供移印、超声波焊接等后道工艺。",
        subProducts: [
          { name: "微流控芯片基底", link: "/products/microfluidic" },
          { name: "外科吻合器组件", link: "/products/stapler" },
          { name: "体外诊断耗材", link: "/products/ivd" },
          { name: "精密齿轮/传动件", link: "/products/gear" }
        ],
        applications: ["医疗设备结构件", "生命科学实验", "诊断设备核心部件", "微创医疗器械部件"],
        features: ["全电动注塑机生产", "模具公差 < 0.005mm", "全程可追溯体系"],
        imgDesc: "精密模具开发与自动化生产",
        image: "/images/injection.jpg"
      },
      {
        id: "material",
        category: "核心业务 03",
        title: "大豆蛋白生物基新材料",
        desc: "面向未来的可持续解决方案。我们利用改性大豆蛋白技术，开发出高性能、无甲醛的植物基胶黏剂与功能涂层，完美替代传统石油基材料，助力碳中和。",
        subProducts: [
          { name: "植物基无醛胶黏剂", link: "/products/plant-adhesive" },
          { name: "可降解阻隔涂层", link: "/products/degradable-coating" },
          { name: "环保纸塑复合材料", link: "/products/eco-paper" },
          { name: "特种功能助剂", link: "/products/functional-additives" }
        ],
        applications: ["高端消费品包装", "环保包装材料", "可堆肥食品包装", "生物医用辅助材料"],
        features: ["100% 生物降解", "零甲醛 / 零苯", "优异的干湿强度"],
        imgDesc: "绿色化学与可持续发展实验室",
        image: "/images/soy.jpg"
      }
    ],
    cta: {
      text: "寻找特定的规格或定制方案？",
      sub: "我们的工程师团队随时准备为您提供技术支持。",
      btn: "联系技术顾问"
    }
  },
  en: {
    metaTitle: "Products | Medical Packaging, Injection Molding & Bio-Materials",
    metaDesc: "Explore Tops-Life's core solutions: Sterile Barrier Systems (Medical PE Bags/Films), Precision Medical Injection Molding, and Soy Protein Bio-Materials.",
    hero: {
      title: "Our Solutions",
      subtitle: "From Material Science to Manufacturing",
      desc: "We provide one-stop solutions for medical packaging, components, and eco-materials that meet global regulatory requirements."
    },
    tech: {
      title: "Why Choose TOPS LIFE?",
      items: [
        { icon: <Icons.Microscope />, title: "R&D Lab", desc: "Fully equipped physical, chemical, and microbiological labs for complete validation." },
        { icon: <Icons.ShieldCheck />, title: "Compliance", desc: "Strict ISO 13485 adherence. Products meet FDA, CE, and GB standards." },
        { icon: <Icons.Tool />, title: "Smart Mfg", desc: "All-electric injection molding and automated assembly for micron-level precision." }
      ]
    },
    products: [
      {
        id: "packaging",
        category: "Core Business 01",
        title: "Medical Flexible Packaging",
        desc: "Sterile Barrier Systems (SBS) designed for terminal sterilization. We offer full-process services from material selection to validation, ensuring sterility integrity throughout shelf life.",
        subProducts: [
          { name: "PE Bags and Rolls", link: "/products/pe-bag" },
          { name: "Medical-grade Films", link: "/products/medical-film" },
          { name: "High Barrier Packaging", link: "/products/high-barrier" },
          { name: "EVA and TPU (Lidding)", link: "/products/lidding" }
        ],
        applications: ["Pharma Packaging", "Surgical Kits", "Consumables Packaging", "Device Packaging"],
        features: ["ISO 11607 Compliant", "EO/Gamma/Steam Compatible", "Low Particulate Risk"],
        imgDesc: "ISO Class 7 Production",
        image: "/images/taoai.png"
      },
      {
        id: "molding",
        category: "Core Business 02",
        title: "Medical Injection Molding",
        desc: "Operating in Class 100k cleanrooms, we focus on high-precision polymer components. Capabilities include 2K molding, over-molding, and insert molding, plus ultrasonic welding assembly.",
        subProducts: [
          { name: "Microfluidic Chips", link: "/products/microfluidic" },
          { name: "Surgical Staplers", link: "/products/stapler" },
          { name: "IVD Consumables", link: "/products/ivd" },
          { name: "Precision Gears", link: "/products/gear" }
        ],
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
        subProducts: [
          { name: "Plant-based Adhesives", link: "/products/plant-adhesive" },
          { name: "Degradable Coatings", link: "/products/degradable-coating" },
          { name: "Eco Paper-Plastic", link: "/products/eco-paper" },
          { name: "Functional Additives", link: "/products/functional-additives" }
        ],
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

// ==========================================
// 5. 主组件 (Main Component)
// ==========================================
const Products: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // 使用 useMemo 获取当前语言数据，避免重复计算
  const t = useMemo(() => {
    return language === 'zh' ? CONTENT_DATA.zh : CONTENT_DATA.en;
  }, [language]);

  // --- GSAP 动画 ---
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 使用 gsap.context 进行作用域管理，确保清理干净
    const ctx = gsap.context(() => {
      const fadeUps = gsap.utils.toArray<HTMLElement>(".gsap-fade-up");
      
      fadeUps.forEach((el) => {
        // 先重置状态，防止切换语言时样式残留
        gsap.set(el, { clearProps: "all" });
        
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { 
              trigger: el, 
              start: "top 85%",
              toggleActions: "play none none reverse" 
            },
          }
        );
      });
      
      // 强制刷新 ScrollTrigger，防止内容高度变化导致定位不准
      ScrollTrigger.refresh();
      
    }, containerRef);

    return () => ctx.revert(); // 组件卸载或语言变化时清理动画
  }, [language]); // 依赖 language，切换语言时重新执行动画

  // --- SEO 配置 ---
  useEffect(() => {
    document.title = t.metaTitle;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', t.metaDesc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href.split('#')[0]);
  }, [language, t.metaTitle, t.metaDesc]);

  return (
    <main ref={containerRef} className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden">
      
      {/* --- Section 1: Hero --- */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50 via-white to-white opacity-60"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-sky-50 text-sky-600 font-bold text-sm tracking-widest uppercase border border-sky-100 animate-pulse">
                {t.hero.subtitle}
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                {t.hero.title}
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t.hero.desc}
            </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* --- Section 2: Tech Strengths --- */}
      <section className="py-12 container mx-auto px-6 relative z-20 -mt-10">
         <div className="grid md:grid-cols-3 gap-6">
            {t.tech.items.map((item, idx) => (
                <div key={idx} className="gsap-fade-up bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600 mb-6">
                        {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
            ))}
         </div>
      </section>

      {/* --- Section 3: Product List --- */}
      <section className="container mx-auto px-6 py-20 space-y-24">
        {t.products.map((product) => (
          <div key={product.id} id={product.id} className="scroll-mt-32 gsap-fade-up">
             <article className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 hover:border-sky-200 transition-colors duration-500">
                
                {/* 顶部：标题与描述 */}
                <div className="flex flex-col lg:flex-row gap-12 md:gap-16 mb-12">
                   {/* 左侧文字 */}
                   <div className="lg:w-1/2">
                       <span className="text-sky-500 font-bold tracking-widest uppercase text-sm mb-2 block">{product.category}</span>
                       <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{product.title}</h2>
                       <p className="text-slate-600 text-lg leading-relaxed text-justify">{product.desc}</p>
                       
                       <div className="flex flex-wrap gap-3 mt-6">
                          {product.features.map((f, idx) => (
                              <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                                  <Icons.Check /> {f}
                              </span>
                          ))}
                       </div>
                   </div>

                   {/* 右侧图片 */}
                   <div className="lg:w-1/2 relative group">
                       <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-200 shadow-lg relative">
                           <img 
                             src={product.image} 
                             alt={product.title} 
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                             onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070';
                             }}
                           />
                           <div className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-xs px-4 py-2 rounded-tl-xl backdrop-blur-md">
                              {product.imgDesc}
                           </div>
                       </div>
                       <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-sky-200 rounded-tr-3xl -z-10"></div>
                   </div>
                </div>

                {/* 底部：详情列表 */}
                <div className="border-t border-slate-100 pt-8 grid md:grid-cols-2 gap-8">
                    {/* 产品系列列表 */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                           <Icons.Layer /> {language === 'zh' ? '产品系列' : 'Product Series'}
                        </h4>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {product.subProducts.map((sub, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0"></span>
                                    {/* 使用 SmartLink 组件处理复杂的链接逻辑 */}
                                    <SmartLink item={sub} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* 应用领域标签 */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                           <Icons.Beaker /> {language === 'zh' ? '应用领域' : 'Applications'}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {product.applications.map((app, idx) => (
                                <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-600 border border-slate-200 rounded text-xs hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-colors cursor-default">
                                    {app}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

             </article>
          </div>
        ))}
      </section>

      {/* --- Section 4: CTA --- */}
      <section className="bg-slate-900 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">{t.cta.text}</h2>
              <p className="text-slate-400 mb-10 text-lg max-w-2xl mx-auto">{t.cta.sub}</p>
              <Link to="/contact">
                <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-sky-600 text-white rounded-full font-bold overflow-hidden hover:bg-sky-500 transition-all shadow-xl shadow-sky-900/50">
                    <span>{t.cta.btn}</span>
                    <Icons.ArrowRight />
                </button>
              </Link>
          </div>
      </section>

    </main>
  );
};

export default Products;
