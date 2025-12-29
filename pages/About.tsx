import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Award, 
  Shield, 
  Globe, 
  Zap, 
  Target, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Calendar,
  Flag,
  CheckCheck,
  Factory
} from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';
import { Link } from 'react-router-dom';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 子组件：数字滚动动画 ---
const AnimatedCounter = ({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  // 分离数字和非数字字符 (例如 "13+" -> num: 13, suffix: "+")
  const numericValue = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, '');

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || isNaN(numericValue)) return;

    const ctx = gsap.context(() => {
      gsap.from(el, {
        textContent: 0,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 }, // 保证滚动时是整数
        scrollTrigger: { trigger: el, start: "top 85%" }
      });
    });
    return () => ctx.revert();
  }, [numericValue]);

  return (
    <div className="flex flex-col items-center group cursor-default">
      <div className="text-sky-400 mb-2 transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold mb-1 font-mono">
        <span ref={ref}>{numericValue}</span>
        <span>{suffix}</span>
      </div>
      <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{label}</span>
    </div>
  );
};

const About: React.FC = () => {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // 计算成立年限
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - 2011;

  useEffect(() => { 
    setLoaded(true); 
    // 图片加载可能影响布局，稍微延迟刷新 ScrollTrigger
    setTimeout(() => ScrollTrigger.refresh(), 500);
  }, []);

  // --- 核心动画逻辑 ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. 通用淡入上浮
      const fadeUps = gsap.utils.toArray(".gsap-fade-up");
      fadeUps.forEach((el: any) => {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 }, 
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // 2. 发展历程 - 横向滚动 (Horizontal Scroll)
      // 使用 matchMedia 仅在桌面端启用 Pin 和横向滚动
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray(".timeline-item");
        const totalWidth = 100 * (sections.length - 1); // 这里的逻辑视具体宽度而定，简单起见用百分比估算

        // 容器横向移动
        gsap.to(timelineRef.current, {
          xPercent: -100 * (sections.length - 1) / sections.length * 1.2, // 调整系数以确保滑完
          ease: "none",
          scrollTrigger: {
            trigger: "#timeline-section",
            pin: true,
            scrub: 1,
            // 滚动距离根据卡片数量动态调整，给予足够的滚动空间
            end: () => "+=" + (timelineRef.current?.offsetWidth || 2000), 
            invalidateOnRefresh: true,
          }
        });
      });

      // 3. 底部 CTA 视差
      gsap.to("#cta-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: "#cta-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [language]);

  // --- 数据配置 ---
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
        { value: "50+", label: "全球合作伙伴", icon: <Globe className="w-6 h-6" /> },
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
        p2: "依托 ISO 7 (万级) 洁净车间与先进的自动化生产线，我们构建了从原料到成品的严苛质量控制体系，确保每一件产品都符合医疗级安全标准。",
        btn: "了解我们的解决方案"
      },
      timeline: {
        title: "发展历程",
        subtitle: "见证从初创到卓越的每一步",
        items: [
          { year: "2011", title: "起步", desc: "淘爱材料科技成立，开展软包装业务。" },
          { year: "2013", title: "拓展", desc: "增加医疗器械 OEM 业务，专注微小注塑。" },
          { year: "2018", title: "升级", desc: "永爱生命 Tops Life Science 成立，确立专业地位。" },
          { year: "2021", title: "创新", desc: "新材料部门成立，涉足环保油墨与大豆蛋白产品。" },
          { year: "2023", title: "出海", desc: "香港分公司成立，构建全球供应链网络。" },
          { year: "2023", title: "智造", desc: "升级扩建 ISO Class 7 洁净车间。" },
          { year: "2024", title: "认可", desc: "荣获 EcoVadis 银牌认证，践行 ESG 承诺。" },
        ]
      },
      cert: {
        title: "资质认证",
        desc: "严格遵循国际质量管理体系，为医疗安全保驾护航。",
        items: [
           { img: "/banner/9001.jpg", title: "ISO 9001", sub: "质量管理体系认证" },
           { img: "/banner/13485.jpg", title: "ISO 13485", sub: "医疗器械质量管理体系" }
        ]
      },
      values: {
        title: "核心驱动力",
        items: [
          { title: "企业理念", desc: "质量第一，服务市场与应用。", icon: <Zap className="w-10 h-10" /> },
          { title: "愿景", desc: "成为高端包装、医疗注塑及新材料领域的独特市场领导者。", icon: <Target className="w-10 h-10" /> },
          { title: "使命", desc: "为客户创造价值，赋能行业发展。", icon: <Heart className="w-10 h-10" /> },
        ]
      },
      cta: {
        title: "值得信赖的全球合作伙伴",
        desc: "我们的制造与管理体系严格遵循国际标准，确保每一份交付都安全、合规、高效。",
        certs: ["ISO 13485 认证", "ISO 9001 认证", "十万级洁净车间"],
        btn: "联系我们开启合作"
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
        { value: "50+", label: "Global Partners", icon: <Globe className="w-6 h-6" /> },
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
        p2: "Relying on ISO 7 cleanrooms and advanced automation, we built a strict quality control system from raw materials to finished products, ensuring medical-grade safety.",
        btn: "Explore Our Solutions"
      },
      timeline: {
        title: "Our History",
        subtitle: "Every step from startup to excellence",
        items: [
          { year: "2011", title: "Foundation", desc: "Established Tops Life Technology." },
          { year: "2013", title: "Expansion", desc: "Started Medical Device OEM business." },
          { year: "2018", title: "Upgrade", desc: "Established Tops Life Science." },
          { year: "2021", title: "Innovation", desc: "New Materials Dept. established." },
          { year: "2023", title: "Global", desc: "Hong Kong branch established." },
          { year: "2023", title: "Facility", desc: "Upgraded to ISO Class 7 cleanrooms." },
          { year: "2024", title: "Recognition", desc: "Achieved EcoVadis Silver Rating." },
        ]
      },
      cert: {
        title: "Certifications",
        desc: "Strict adherence to international standards ensuring medical safety.",
        items: [
           { img: "/banner/9001.jpg", title: "ISO 9001", sub: "Quality Management" },
           { img: "/banner/13485.jpg", title: "ISO 13485", sub: "Medical Devices QMS" }
        ]
      },
      values: {
        title: "Core Values",
        items: [
          { title: "Philosophy", desc: "Quality First, Serving Market and Application.", icon: <Zap className="w-10 h-10" /> },
          { title: "Vision", desc: "To be a unique market-leading provider of high-end packaging and medical solutions.", icon: <Target className="w-10 h-10" /> },
          { title: "Mission", desc: "Create value for customers and empower industry development.", icon: <Heart className="w-10 h-10" /> },
        ]
      },
      cta: {
        title: "Your Trusted Global Partner",
        desc: "Our manufacturing and management systems strictly adhere to international standards, ensuring safety, compliance, and efficiency in every delivery.",
        certs: ["ISO 13485 Certified", "ISO 9001 Certified", "ISO Class 7 Cleanroom"],
        btn: "Contact Us to Collaborate"
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div ref={containerRef} className="min-h-screen bg-white font-sans overflow-x-hidden selection:bg-sky-200 selection:text-sky-900">

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        {/* 背景光斑 */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100 rounded-full mix-blend-multiply blur-[100px] opacity-60 translate-x-1/3 -translate-y-1/3 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full mix-blend-multiply blur-[80px] opacity-60 -translate-x-1/3 -translate-y-1/3"></div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="inline-block py-1 px-3 rounded-full bg-sky-100 text-sky-600 text-sm font-bold tracking-widest uppercase mb-6 border border-sky-200">
                {t.hero.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1]">
                {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {t.hero.desc}
            </p>
        </div>
      </section>

      {/* 2. Stats Bar (With Animated Counter) */}
      <section className="container mx-auto px-4 md:px-6 relative z-20 -mt-10 md:-mt-16">
        <div className="bg-slate-900 text-white py-12 rounded-3xl shadow-2xl shadow-sky-900/20 border border-slate-700/50 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                {t.stats.map((stat, idx) => (
                    <AnimatedCounter 
                        key={idx} 
                        value={stat.value} 
                        label={stat.label} 
                        icon={stat.icon} 
                    />
                ))}
            </div>
        </div>
      </section>

      {/* 3. Main Introduction & Factory Collage */}
      <div className="container mx-auto px-6 py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            {/* 左侧：实景工厂拼贴 (Factory Collage) */}
            <div className="w-full lg:w-1/2 relative gsap-fade-up">
                <div className="grid grid-cols-2 gap-4">
                    {/* 主图：大型设备 */}
                    <div className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry2.jpg" alt="Advanced Manufacturing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    {/* 副图1：洁净室/细节 */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry3.jpg" alt="Cleanroom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                    {/* 副图2：研发/原料 */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg group">
                        <img src="/images/industry1.jpg" alt="R&D" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        
                        {/* 装饰性徽章 */}
                        <div className="absolute bottom-0 right-0 bg-sky-600 text-white p-3 rounded-tl-xl">
                            <Factory size={20} />
                        </div>
                    </div>
                </div>
                {/* 背景装饰点缀 */}
                <div className="absolute -z-10 -top-8 -left-8 w-full h-full border-2 border-slate-100 rounded-3xl"></div>
            </div>

            {/* 右侧：文案介绍 */}
            <div className="w-full lg:w-1/2 gsap-fade-up">
                <div className="flex items-center gap-2 mb-4">
                   <span className="w-10 h-[2px] bg-sky-500"></span>
                   <span className="text-sky-600 font-bold uppercase text-sm tracking-wider">Since 2011</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    {t.intro.title}
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8 text-justify">
                    {t.intro.p1}
                </p>
                
                <div className="bg-sky-50 p-8 rounded-2xl border border-sky-100/50 mb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-sky-600" /> {t.intro.coreTitle}
                    </h3>
                    <ul className="space-y-4">
                        {t.intro.coreItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium group">
                                <div className="w-6 h-6 rounded-full bg-white text-sky-500 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                    <CheckCircle2 size={14} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-slate-500 leading-relaxed mb-8 border-l-4 border-slate-200 pl-4">
                    {t.intro.p2}
                </p>

                <Link to="/products">
                     <button className="group flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-sky-600 transition-all shadow-xl hover:shadow-sky-200 active:scale-95">
                        {t.intro.btn}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                     </button>
                </Link>
            </div>
        </div>
      </div>

      {/* 4. Timeline Section (Horizontal Scroll) */}
      <section id="timeline-section" className="py-24 bg-slate-900 text-white overflow-hidden relative">
         <div className="container mx-auto px-6 mb-12 lg:mb-24">
            <div className="max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.timeline.title}</h2>
                <p className="text-slate-400 text-lg">{t.timeline.subtitle}</p>
            </div>
         </div>

         {/* Scroll Container:
            - Desktop (lg): flex-row, very wide, managed by GSAP
            - Mobile: flex-col, normal width
         */}
         <div 
            ref={timelineRef}
            className="flex flex-col lg:flex-row gap-8 lg:gap-0 px-6 lg:px-24 w-full lg:w-max"
         >
            {t.timeline.items.map((item, i) => (
                <div key={i} className="timeline-item flex-shrink-0 w-full lg:w-[400px] lg:pr-16 group">
                    {/* 时间轴线 (Desktop only) */}
                    <div className="hidden lg:block w-full h-[1px] bg-slate-700 mb-8 relative">
                        <div className="absolute left-0 -top-1.5 w-4 h-4 rounded-full bg-sky-500 border-4 border-slate-900 group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    
                    {/* 内容卡片 */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600 mb-4 opacity-80">
                            {item.year}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-400 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                    {/* Mobile only connection line */}
                    <div className="lg:hidden w-1 h-8 bg-slate-800 mx-auto my-2"></div>
                </div>
            ))}
         </div>
      </section>

      {/* 5. Values Section */}
      <section className="py-24 container mx-auto px-6 bg-white">
        <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{t.values.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Highlighted Card */}
            <div className="bg-sky-600 p-10 rounded-[2rem] text-white hover:-translate-y-2 transition-transform duration-300 shadow-xl shadow-sky-200 relative overflow-hidden group">
                <div className="absolute -right-10 -top-10 text-white opacity-10 group-hover:opacity-20 transition-opacity transform scale-[2] rotate-12">
                   <Zap className="w-40 h-40" />
                </div>
                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mb-8 backdrop-blur-sm">
                        {t.values.items[0].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{t.values.items[0].title}</h3>
                    <p className="text-sky-100 leading-relaxed text-lg">{t.values.items[0].desc}</p>
                </div>
            </div>

            {/* Standard Cards */}
            {[1, 2].map((idx) => (
                <div key={idx} className="bg-slate-50 p-10 rounded-[2rem] hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group border border-transparent hover:border-slate-100">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform ${idx === 1 ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
                        {t.values.items[idx].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900">
                        {t.values.items[idx].title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-lg">
                        {t.values.items[idx].desc}
                    </p>
                </div>
            ))}
        </div>
      </section>

      {/* 6. Certifications Section (New) */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                  <div className="max-w-xl mb-8 md:mb-0">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.cert.title}</h2>
                      <p className="text-slate-500 text-lg">{t.cert.desc}</p>
                  </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                  {t.cert.items.map((item, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                          <div className="w-24 h-24 shrink-0 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 p-2">
                             <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                          </div>
                          <div>
                              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                              <p className="text-slate-500">{item.sub}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 7. Trust & CTA Section */}
      <section id="cta-section" className="relative py-32 bg-slate-900 overflow-hidden">
        <div id="cta-bg" className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none" 
             style={{ 
               backgroundImage: 'url(/images/industry2.jpg)', // 使用工厂背景图
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="lg:w-3/5 text-center lg:text-left">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                        {t.cta.title}
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
                        {t.cta.desc}
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        {t.cta.certs.map((cert, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 text-sm text-white font-medium">
                                <CheckCheck className="w-4 h-4 text-sky-400" />
                                {cert}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:w-2/5 flex flex-col items-center">
                    <div className="inline-flex gap-6 mb-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <Shield className="w-16 h-16 text-sky-500" />
                        <Award className="w-16 h-16 text-sky-500" />
                        <Flag className="w-16 h-16 text-sky-500" />
                    </div>
                    <Link to="/contact" className="w-full sm:w-auto">
                        <button className="w-full sm:w-auto group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-300 bg-sky-600 rounded-full hover:bg-sky-500 hover:scale-105 shadow-[0_0_30px_rgba(2,132,199,0.5)]">
                            <span className="text-lg">{t.cta.btn}</span>
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
};

export default About;
