import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Beaker,
  Activity,
  Layers,
  PackageOpen,
  DraftingCompass,
  Sprout,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// 引入全局语言 Hook
import { useLanguage } from "../components/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// 图片路径配置 (确保 public/banner/ 文件夹下有 1.jpg 到 5.jpg)
const rawSlides = [1, 2, 3, 4, 5].map((id) => ({
  id,
  image: `/banner/${id}.jpg`, 
}));

// 渐变文字组件
const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-500 ${className}`}>
    {children}
  </span>
);

// --- 语言数据包 (已修复英文内容过短的问题) ---
const LANG = {
  zh: {
    badge: "创新医疗科技",
    who: "关于我们",
    company: "苏州永爱生命科技有限公司",
    // 中文简介保持不变
    intro: "苏州永爱Tops-Life成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应等领域的创新型企业。公司在医疗行业、特种纸、油墨行业等多个领域的各类组件方面拥有丰富经验，生产流程与解决方案涵盖多元化产品及服务。秉持 “质量为先，服务市场与应用” 的理念，公司聚焦三大核心业务：洁净软包装、新材料及医疗器械。我们致力于通过持续的技术创新，为全球客户提供更安全、更环保、更高效的解决方案。",
    more: "探索详情",
    contact: "联系我们",
    stats: [
      { num: "15+", label: "年行业经验" },
      { num: "100k", label: "级洁净车间" },
      { num: "50+", label: "全球合作伙伴" },
    ],
    solutionsTitle: "核心业务解决方案",
    solutions: [
      {
        title: "医疗软包装解决方案",
        desc: "提供高性能无菌屏障系统。包括医用吸塑盒、特卫强(Tyvek)盖材及透析纸包装，确保全生命周期无菌安全。",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "精密医疗注塑件",
        desc: "依托全电动注塑工艺与 ISO 13485 体系，制造公差微米级的关键医疗零部件。广泛应用于微创手术器械。",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "大豆蛋白聚合物",
        desc: "源自非转基因大豆的革新性生物基材料。为纸张涂布、水性油墨及工业包装领域提供可降解的绿色替代方案。",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "技术实力",
    techDesc: "融合高分子科学、材料工程及精密成型专业知识，配备洁净室、自动化生产线及内部研发实验室。",
    techHighlights: [
        { title: "ISO 13485 认证", desc: "完全符合国际医疗器械质量管理体系标准。" },
        { title: "10万级洁净车间", desc: "严格控制的无菌生产环境，确保产品纯净度。" }
    ],
    slides: [
      { title: "赋能生命科学，筑造坚实无菌屏障", subtitle: "以高性能软包装解决方案，守护药品与医疗器械的每一次安全交付。" },
      { title: "微米级精密成型，重塑医疗制造标准", subtitle: "全流程 ISO 13485 认证，为关键医疗部件提供极致的稳定与精准。" },
      { title: "探索材料边界，引领生物基科技未来", subtitle: "源于自然的创新聚合物技术，为全球工业提供可持续的高性能方案。" },
      { title: "严苛洁净环境，承载卓越品质承诺", subtitle: "持续拓展制造能力边界，从容应对生命科学行业最严格的挑战。" },
      { title: "智造驱动未来，交付全球可信赖价值", subtitle: "构建透明、可追溯的质量体系，成为全球客户值得托付的长期伙伴。" },
    ],
    marketTitle: "应用领域",
    marketDesc: "覆盖生命科学及工业应用的关键领域",
    market: ["医疗器械", "制药生产", "新材料应用", "生物基聚合物"],
    cta: "准备好开启下一个项目了吗？",
    ctaBtn: "立即联系我们",
  },
  en: {
    badge: "Innovative MedTech",
    who: "Who We Are",
    company: "Suzhou Tops Life Technology Co., Ltd.",
    // --- 修复点：英文简介已扩充，长度与中文匹配，防止布局跳动 ---
    intro: "Founded in 2011, Suzhou Tops-Life is a technology-driven enterprise specializing in flexible packaging, medical devices, and innovative material supply. With over a decade of expertise in medical, specialty paper, and ink industries, we offer diversified products and comprehensive solutions. Adhering to the philosophy of 'Quality First, Serving Market & Application', we focus on three core sectors: Clean Flexible Packaging, New Materials, and Medical Devices. We are dedicated to delivering safer, greener, and more efficient solutions to clients worldwide.",
    more: "Discover More",
    contact: "Contact Us",
    stats: [
      { num: "15+", label: "Years Exp." },
      { num: "100k", label: "Clean Class" },
      { num: "50+", label: "Global Partners" },
    ],
    solutionsTitle: "Core Business Solutions",
    solutions: [
      {
        title: "Medical Soft Packaging",
        desc: "High-performance sterile barrier systems including blister packs and Tyvek lids, ensuring lifecycle safety.",
        icon: <PackageOpen size={32} />,
      },
      {
        title: "Precision Injection Molding",
        desc: "Micron-level precision components manufactured under ISO 13485. Essential for surgical instruments.",
        icon: <DraftingCompass size={32} />,
      },
      {
        title: "Soy Protein Polymers",
        desc: "Innovative bio-based materials derived from non-GMO soy. A biodegradable green alternative.",
        icon: <Sprout size={32} />,
      }
    ],
    tech: "Technical Strength",
    techDesc: "Integrating polymer science, materials engineering, and precision molding expertise, equipped with state-of-the-art cleanrooms and R&D labs.",
    techHighlights: [
        { title: "ISO 13485 Certified", desc: "Full compliance with international medical device standards." },
        { title: "Class 100k Cleanroom", desc: "Strictly controlled environments for sterile manufacturing." }
    ],
    slides: [
      { title: "Empowering Life Science", subtitle: "Building robust sterile barriers for the safety of every medical delivery." },
      { title: "Precision Redefined", subtitle: "Micron-level injection molding reshaping medical manufacturing standards." },
      { title: "Material Innovation", subtitle: "Leading the future of bio-based technology with sustainable polymer solutions." },
      { title: "Purity & Excellence", subtitle: "Strict controlled environments carrying the promise of superior quality." },
      { title: "Driven by Intelligence", subtitle: "Delivering trusted value globally with traceable manufacturing systems." },
    ],
    marketTitle: "Market Applications",
    marketDesc: "Covering key sectors in life sciences and beyond.",
    market: ["Medical Devices", "Pharma", "Advanced Materials", "Bio Polymers"],
    cta: "Ready to start your next project?",
    ctaBtn: "Contact Us",
  },
};

export default function Home() {
  const { language } = useLanguage(); 
  const t = LANG[language];
  const containerRef = useRef(null);

  // 动画逻辑
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 通用淡入上浮动画
      const fadeUps = document.querySelectorAll(".gsap-fade-up");
      fadeUps.forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // 2. 视差滚动效果 (图片)
      const parallaxEls = document.querySelectorAll(".gsap-parallax");
      parallaxEls.forEach((el) => {
        gsap.to(el, {
          y: -40,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1.5 }
        });
      });
      
      // 3. 数字增长动画
      const counters = document.querySelectorAll(".counter-number");
      counters.forEach(counter => {
        gsap.from(counter, {
          textContent: 0,
          duration: 2.5,
          ease: "power2.out",
          snap: { textContent: 1 },
          stagger: 0.2,
          scrollTrigger: { trigger: counter, start: "top 85%" }
        });
      });

    }, containerRef);
    return () => ctx.revert();
  }, [language]); // 当语言切换时，刷新动画，防止布局计算错误

  return (
    <div ref={containerRef} className="bg-white text-slate-800 min-h-screen font-sans selection:bg-sky-200 selection:text-sky-900 overflow-x-hidden">
      
      {/* 背景装饰：优化了颜色更淡雅 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-50/60 rounded-full blur-[100px] animate-float"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-50/60 rounded-full blur-[100px] animate-float [animation-delay:2s]"></div>
      </div>

      {/* Hero Section - 首页轮播 */}
      <section className="h-screen relative overflow-hidden z-10">
        <Swiper modules={[Autoplay, EffectFade, Pagination, Navigation]} autoplay={{ delay: 6000 }} effect="fade" speed={1200} loop pagination={{ clickable: true }} className="h-full w-full">
          {rawSlides.map((s, i) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-slate-900">
                  <img src={s.image} alt={t.slides[i].title} className="w-full h-full object-cover opacity-90 animate-ken-burns" />
                </div>
                {/* 遮罩优化：加强底部的渐变，保证文字清晰 */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                
                <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-24">
                  <div className="max-w-4xl text-white pt-20">
                    <div className="overflow-hidden mb-6">
                      <div className="animate-slide-up-fade [animation-delay:100ms] inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-500/20 backdrop-blur-md text-sky-200 text-xs font-bold uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span> {t.badge}
                      </div>
                    </div>
                    {/* 标题：针对移动端调整了字体大小，防止换行太难看 */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] animate-slide-up-fade [animation-delay:300ms]">
                      {t.slides[i].title.split("，")[0]}<br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-cyan-300">
                        {t.slides[i].title.split("，")[1] || ""}
                      </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-10 font-light leading-relaxed animate-slide-up-fade [animation-delay:500ms]">
                      {t.slides[i].subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4 animate-slide-up-fade [animation-delay:700ms]">
                      <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-medium transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.5)] flex items-center gap-2 group">
                        {t.more} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-md hover:bg-white hover:text-sky-600 text-white rounded-full font-medium transition-all">
                        {t.contact}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

     {/* Intro Section - 关于我们 (优化版：垂直居中 + 减少留白) */}
      <section className="relative py-16 lg:py-24 overflow-hidden z-10">
        {/* 修改点1：items-start 改为 items-center，让右侧文字垂直居中 */}
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* 左侧图片区域 */}
          <div className="order-2 lg:order-1 relative gsap-fade-up">
            <div className="absolute -top-6 -left-6 w-3/4 h-full border-[10px] border-sky-50 rounded-3xl -z-10"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-slate-100">
              <img src="/banner/3.jpg" alt="About Tops Life" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute bottom-4 right-4 lg:-right-8 lg:bottom-10 bg-white/95 backdrop-blur-xl p-5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white max-w-[200px] md:max-w-xs animate-float">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-sky-100 rounded-full text-sky-600"><TrendingUp size={20} /></div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">Quality Rate</div>
                    <div className="text-xl font-bold text-slate-800">99.9%</div>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-slate-500 leading-snug">Consistent quality in every production step.</p>
              </div>
            </div>
          </div>

          {/* 右侧文字区域 */}
          <div className="order-1 lg:order-2 gsap-fade-up">
            <h2 className="text-sm font-bold text-sky-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-sky-500"></span> {t.who}
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {t.company.substring(0, 4)}<GradientText>{t.company.substring(4)}</GradientText>
            </h3>
            
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8 text-justify opacity-90">
              {t.intro}
            </p>
            
            {/* 数据统计 */}
            <div className="grid grid-cols-3 gap-6 border-t border-slate-100 pt-8 mb-8">
              {t.stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl lg:text-4xl font-bold text-slate-800 mb-1 flex items-baseline">
                    <span className="counter-number">{stat.num.replace(/\D/g, '')}</span>
                    <span className="text-sky-500 text-xl">{stat.num.replace(/\d/g, '')}</span>
                  </div>
                  <div className="text-xs md:text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 修改点2：新增按钮，填充底部视觉空白 */}
            <button className="px-8 py-3 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-sky-500 hover:text-white transition-all duration-300 flex items-center gap-2">
              {t.more} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Solutions - 核心业务 */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 gsap-fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{t.solutionsTitle}</h2>
            <div className="w-16 h-1.5 bg-gradient-to-r from-sky-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.solutions.map((item, idx) => (
              <div key={idx} className="gsap-fade-up h-full">
                <div className="group h-full bg-white rounded-[24px] p-8 border border-slate-100 shadow-lg hover:shadow-2xl hover:shadow-sky-100/50 transition-all duration-500 hover:-translate-y-2 flex flex-col relative overflow-hidden">
                  {/* 顶部渐变条 */}
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${idx === 0 ? 'from-sky-400 to-blue-500' : idx === 1 ? 'from-cyan-400 to-sky-500' : 'from-blue-400 to-indigo-500'}`}></div>
                  
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${idx === 0 ? 'bg-sky-50 text-sky-600 group-hover:bg-sky-500 group-hover:text-white' : idx === 1 ? 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white'}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-sky-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6 flex-1 text-sm md:text-base">{item.desc}</p>
                  
                  <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-sky-600 transition-colors uppercase tracking-wider mt-auto pt-4 border-t border-slate-50">
                    {t.more} <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Strength - 研发实力 */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden z-10">
        {/* 背景线条 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
           <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0" stroke="#0ea5e9" strokeWidth="0.5" />
             <path d="M0 80 L80 0" stroke="#0ea5e9" strokeWidth="0.5" />
             <path d="M20 100 L100 20" stroke="#0ea5e9" strokeWidth="0.5" />
           </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 gsap-fade-up">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2 bg-sky-500 rounded-lg shadow-lg shadow-sky-200"><Beaker size={24} className="text-white" /></span>
                <span className="text-sky-600 font-bold tracking-widest uppercase text-sm">R&D Center</span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight text-slate-900">{t.tech}</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10 border-l-4 border-sky-400 pl-6 bg-slate-50/50 py-2 rounded-r-lg">{t.techDesc}</p>
              
              <div className="space-y-4">
                {t.techHighlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-1 text-sky-500"><CheckCircle2 size={24} /></div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800">{h.title}</h4>
                        <p className="text-sm text-slate-500 mt-1">{h.desc}</p>
                    </div>
                    </div>
                ))}
              </div>
            </div>

            {/* 图片拼接区域 */}
            <div className="lg:col-span-7 relative h-[400px] lg:h-[500px] gsap-fade-up mt-10 lg:mt-0">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-3xl overflow-hidden border-4 md:border-8 border-white shadow-2xl z-10 gsap-parallax">
                 <img src="/banner/4.jpg" className="w-full h-full object-cover" alt="Lab Environment" />
                 <div className="absolute inset-0 bg-sky-900/10 mix-blend-overlay"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-3xl overflow-hidden border-4 md:border-8 border-white shadow-xl z-20">
                 <img src="/banner/1.jpg" className="w-full h-full object-cover" alt="Production Line" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-sky-200 to-cyan-200 blur-3xl -z-10 opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Application - 应用领域 */}
      <section className="py-24 bg-slate-50 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gsap-fade-up gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{t.marketTitle}</h2>
              <p className="text-slate-500">{t.marketDesc}</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-sky-600 font-semibold hover:gap-4 transition-all group">
               {t.more} <ArrowRight size={20} className="group-hover:text-sky-500"/>
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.market.map((m, i) => (
              <div key={i} className="gsap-fade-up group relative h-80 lg:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500">
                <img src={`/banner/${(i % 5) + 1}.jpg`} alt={m} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="w-8 h-1 bg-sky-400 mb-4 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-100"></div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{m}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - 联系我们 */}
      <section className="py-24 relative overflow-hidden bg-sky-600">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-600 to-blue-700"></div>
        {/* 背景纹理：确保 public/images/pattern.png 存在，或者删除这行 */}
        <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>
        
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white gsap-fade-up">
          <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">{t.cta}</h2>
          <button className="px-10 py-4 bg-white text-sky-700 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 hover:scale-105 transition-all duration-300">
            {t.ctaBtn}
          </button>
        </div>
      </section>

      {/* 内联 CSS 动画定义 */}
      <style>{`
        @keyframes ken-burns { 0% { transform: scale(1); } 100% { transform: scale(1.15); } }
        .animate-ken-burns { animation: ken-burns 25s ease-out infinite alternate; }
        
        @keyframes slide-up-fade { 
          0% { opacity: 0; transform: translateY(30px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        .animate-slide-up-fade { animation: slide-up-fade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }

        @keyframes float { 
          0%, 100% { transform: translateY(0) scale(1); } 
          50% { transform: translateY(-15px) scale(1.02); } 
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
