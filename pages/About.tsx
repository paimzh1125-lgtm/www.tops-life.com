import React, { useEffect, useRef, useState } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Award, 
  Shield, 
  Globe, 
  Zap, 
  Target, 
  Heart, 
  Factory, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Flag
} from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { Link } from 'react-router-dom';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 计算成立年限
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - 2011;

  useEffect(() => { 
    setLoaded(true); 
    // ★ 关键修复：延迟刷新 ScrollTrigger，防止图片加载导致的高度计算错误
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, []);

  // --- 动画初始化 ---
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. 通用淡入上浮
      const fadeUps = gsap.utils.toArray(".gsap-fade-up");
      fadeUps.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 40, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // 2. 发展历程卡片动画 (★ 修复版：防止隐身 Bug)
      const cards = gsap.utils.toArray(".timeline-card");
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { y: 60, opacity: 0 }, // 明确初始状态
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: { 
                trigger: "#timeline-grid", 
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            onComplete: () => {
               // ★ 关键修复：动画结束后清除内联样式，避免 CSS 冲突
               gsap.set(cards, { clearProps: "transform,opacity" }); 
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  // --- 核心数据配置 (已更新你的图片路径) ---
  const content = {
    zh: {
      hero: {
        subtitle: "关于 TOPS LIFE",
        title: "匠心智造，赋能未来",
        desc: "自2011年以来，我们始终致力于为全球医疗及新材料行业提供卓越的解决方案。",
      },
      stats: [
        { value: `${yearsExp}+`, label: "年行业经验", icon: <Award className="w-6 h-6" /> },
        { value: "3", label: "大核心业务", icon: <Target className="w-6 h-6" /> },
        { value: "Global", label: "全球化布局", icon: <Globe className="w-6 h-6" /> },
        { value: "100%", label: "品质承诺", icon: <Shield className="w-6 h-6" /> },
      ],
      intro: {
        title: "关于我们",
        p1: "Tops-Life 成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应领域的创新型企业。我们在医疗行业组件、特种纸及油墨行业等领域拥有丰富的经验。",
        coreTitle: "核心业务",
        coreItems: [
            "洁净软包装 (Clean Flexible Packaging)",
            "新材料 (New Materials)",
            "医疗器械 (Medical Devices)"
        ],
        p2: "秉承“质量第一，服务市场与应用”的理念，我们为医药、电子、医疗及纸张加工印刷行业提供洁净、高效、环保的定制化产品与解决方案。依托强大的技术研发能力与严苛的质量控制，我们在行业内形成了显著的竞争优势。",
        p3: "未来，公司将继续深耕核心领域，致力于成为高端包装、医疗注塑解决方案及新材料供应领域独特的市场领导者。",
        btn: "联系我们"
      },
      timeline: {
        title: "发展历程",
        subtitle: "从初创到卓越的每一步",
        items: [
          { 
            year: "2011", 
            title: "淘爱材料科技成立", 
            desc: "成立淘爱材料科技，开展软包装业务。提供洁净、控菌软包装的研发与制造。", 
            image: "/images/taoai.png" 
          },
          { 
            year: "2013", 
            title: "OEM 业务拓展", 
            desc: "增加医疗器械 OEM 业务板块，专注于微小注塑和精密组装技术。", 
            image: "/images/injection.jpg" 
          },
          { 
            year: "2018", 
            title: "永爱生命成立", 
            desc: "成立永爱生命 Tops Life Science，全面升级制造能力，确立医疗包装专业地位。", 
            image: "/images/yongai.jpg" 
          },
          { 
            year: "2021", 
            title: "新材料部门成立", 
            desc: "涉足特种环保水性油墨、特种纸品包装行业，推出大豆蛋白创新产品。", 
            image: "/images/soy.jpg" 
          },
          { 
            year: "2023", 
            title: "拓展海外业务", 
            desc: "成立香港分公司，进一步拓展海外市场与全球供应链网络。", 
            image: "/images/oversea.jpg" 
          },
        ]
      },
      values: {
        title: "核心驱动力",
        items: [
          { title: "企业理念", desc: "质量第一，服务市场与应用。", icon: <Zap className="w-10 h-10" /> },
          { title: "愿景", desc: "成为高端包装、医疗注塑及新材料领域的独特市场领导者。", icon: <Target className="w-10 h-10" /> },
          { title: "使命", desc: "为客户创造价值，赋能行业发展。", icon: <Heart className="w-10 h-10" /> },
        ]
      }
    },
    en: {
      hero: {
        subtitle: "About TOPS LIFE",
        title: "Quality First, Innovation Lead",
        desc: "Since 2011, we have been dedicated to providing exceptional solutions for the global medical and new material industries.",
      },
      stats: [
        { value: `${yearsExp}+`, label: "Years Exp.", icon: <Award className="w-6 h-6" /> },
        { value: "3", label: "Core Business", icon: <Target className="w-6 h-6" /> },
        { value: "Global", label: "Supply Chain", icon: <Globe className="w-6 h-6" /> },
        { value: "100%", label: "Quality First", icon: <Shield className="w-6 h-6" /> },
      ],
      intro: {
        title: "Who We Are",
        p1: "Founded in 2011, Tops-Life is an innovative enterprise focusing on flexible packaging, medical devices, and new material supply. We have extensive experience in medical components, specialty paper, and ink industries.",
        coreTitle: "Core Businesses",
        coreItems: [
            "Clean Flexible Packaging",
            "New Materials Supplying",
            "Medical Devices & Components"
        ],
        p2: "Adhering to \"Quality First, Serving Market and Application\", we provide clean, efficient, and eco-friendly solutions. Relying on strong R&D and strict quality control, we have established significant competitive advantages.",
        p3: "We are committed to becoming a unique market leader in high-end packaging and medical injection molding solutions.",
        btn: "Contact Us"
      },
      timeline: {
        title: "Our History",
        subtitle: "Every step from startup to excellence",
        items: [
          { 
            year: "2011", 
            title: "Foundation", 
            desc: "Established Tops Life Technology to launch soft packaging business, focusing on clean films/bags.", 
            image: "/images/taoai.png" 
          },
          { 
            year: "2013", 
            title: "OEM Expansion", 
            desc: "Expanded into Medical Device OEM business, offering micro-injection molding and assembly.", 
            image: "/images/injection.jpg" 
          },
          { 
            year: "2018", 
            title: "Strategic Upgrade", 
            desc: "Established Tops Life Science to upgrade manufacturing capabilities and solidify leadership.", 
            image: "/images/yongai.jpg" 
          },
          { 
            year: "2021", 
            title: "New Materials", 
            desc: "Established New Materials Dept. covering eco-friendly inks and soy protein products.", 
            image: "/images/soy.jpg" 
          },
          { 
            year: "2023", 
            title: "Global Reach", 
            desc: "Established Hong Kong branch to expand international business and supply chain.", 
            image: "/images/oversea.jpg" 
          },
        ]
      },
      values: {
        title: "Core Values",
        items: [
          { title: "Philosophy", desc: "Quality First, Serving Market and Application.", icon: <Zap className="w-10 h-10" /> },
          { title: "Vision", desc: "To be a unique market-leading provider of high-end packaging and medical solutions.", icon: <Target className="w-10 h-10" /> },
          { title: "Mission", desc: "Create value for customers and empower industry development.", icon: <Heart className="w-10 h-10" /> },
        ]
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full mix-blend-multiply blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-sky-600 font-bold tracking-widest uppercase mb-4 block">
                {t.hero.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t.hero.desc}
            </p>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-10 md:-mt-14">
        <div className="bg-slate-900 text-white py-10 rounded-2xl shadow-xl border-b-4 border-sky-500">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                {t.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center group cursor-default">
                        <div className="text-sky-400 mb-2 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                        <span className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</span>
                        <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. Main Introduction */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* 左侧图片 */}
            <div className="w-full lg:w-5/12 relative group lg:sticky lg:top-32 gsap-fade-up">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/3]">
                    <img 
                        src="/banner/outslight.jpg" 
                        alt="Tops Life Innovation" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                </div>
                {/* 装饰元素 */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-sky-500 hidden md:block">
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-bold">Since</p>
                    <p className="text-4xl font-bold text-slate-900">2011</p>
                </div>
            </div>

            {/* 右侧文案 */}
            <div className="w-full lg:w-7/12 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 relative inline-block">
                    {t.intro.title}
                    <span className="absolute bottom-1 right-0 w-2/3 h-3 bg-sky-200/50 -z-10 rounded-sm"></span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 text-justify">{t.intro.p1}</p>
                
                <div className="bg-sky-50/50 p-6 rounded-xl border border-sky-100 mb-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-sky-600" /> {t.intro.coreTitle}
                    </h3>
                    <ul className="space-y-3">
                        {t.intro.coreItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6 text-justify">{t.intro.p2}</p>
                <Link to="/contact">
                     <button className="group flex items-center gap-2 px-8 py-3.5 bg-sky-600 text-white rounded-full font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 active:scale-95">
                        {t.intro.btn}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </button>
                </Link>
            </div>
        </div>
      </div>

      {/* 4. Timeline Section (Compact Grid Layout) - 横向卡片布局 */}
      <section className="py-24 bg-slate-50 relative">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 gsap-fade-up">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.timeline.title}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-400 mx-auto mt-4 rounded-full"></div>
                <p className="mt-4 text-slate-500">{t.timeline.subtitle}</p>
            </div>

            {/* Grid Layout: 3 Columns -> Compact & Clean */}
            <div id="timeline-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {t.timeline.items.map((item, i) => (
                    <div key={i} className="timeline-card group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                        {/* 上半部分：图片与年份 */}
                        <div className="relative h-48 overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1576091160550-217358c7e618?auto=format&fit=crop&q=80&w=2070'; }}
                            />
                            {/* 渐变遮罩 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
                            
                            {/* 年份标签 */}
                            <div className="absolute bottom-4 left-6">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-4 h-4 text-sky-400" />
                                    <span className="text-sky-400 font-bold text-xl tracking-wider">{item.year}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                            </div>
                        </div>

                        {/* 下半部分：描述文本 */}
                        <div className="p-6 flex-grow bg-white relative">
                            {/* 装饰线 */}
                            <div className="absolute top-0 left-6 w-12 h-1 bg-sky-500 rounded-b-md"></div>
                            <p className="text-slate-600 leading-relaxed text-sm pt-2">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t.values.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Highlighted Card */}
            <div className="bg-slate-900 p-10 rounded-3xl text-white hover:-translate-y-2 transition-transform duration-300 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-6 -top-6 text-white opacity-5 group-hover:opacity-10 transition-opacity transform scale-[2] rotate-12">
                   <Zap className="w-24 h-24" />
                </div>
                <div className="relative z-10">
                    <div className="w-14 h-14 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 mb-6">
                        {t.values.items[0].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t.values.items[0].title}</h3>
                    <p className="text-slate-400 leading-relaxed">{t.values.items[0].desc}</p>
                </div>
            </div>

            {/* Standard Cards */}
            {[1, 2].map((idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:border-sky-200 transition-all duration-300 group">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${idx === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.values.items[idx].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-sky-600 transition-colors">
                        {t.values.items[idx].title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                        {t.values.items[idx].desc}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* 6. Simple Trust Strip */}
      <div className="bg-slate-50 py-12 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Certifications & Standards</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-3 text-lg font-bold text-slate-800"><Shield className="w-6 h-6 text-sky-600" /> ISO 13485</div>
                <div className="flex items-center gap-3 text-lg font-bold text-slate-800"><Shield className="w-6 h-6 text-sky-600" /> ISO 9001</div>
                <div className="flex items-center gap-3 text-lg font-bold text-slate-800"><Factory className="w-6 h-6 text-sky-600" /> FDA Registered</div>
            </div>
        </div>
      </div>

    </div>
  );
};

export default About;
