// src/pages/About.tsx
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';
import { Link } from 'react-router-dom';

// --- SVG Icons (无依赖版本) ---
const Icons = {
  Award: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Shield: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Globe: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Factory: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><line x1="17" y1="13" x2="17" y2="13"/><line x1="7" y1="13" x2="7" y2="13"/></svg>,
  Zap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Check: () => <svg className="w-5 h-5 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  ArrowRight: () => <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
};

const About: React.FC = () => {
  const { language } = useLanguage();
  const [loaded, setLoaded] = useState(false);
  
  // 简单的入场动画触发
  useEffect(() => { setLoaded(true); }, []);

  // 计算成立年限 (2011年成立)
  const currentYear = new Date().getFullYear();
  const yearsExp = currentYear - 2011;

  // --- 文本内容 (根据您提供的新文案进行了精细的中英对照) ---
  const content = {
    zh: {
      hero: {
        subtitle: "关于 TOPS LIFE",
        title: "匠心智造，赋能未来",
        desc: "自2011年以来，我们始终致力于为全球医疗及新材料行业提供卓越的解决方案。",
      },
      stats: [
        { value: `${yearsExp}+`, label: "年行业经验", icon: <Icons.Award /> },
        { value: "3", label: "大核心业务", icon: <Icons.Target /> },
        { value: "Global", label: "全球化布局", icon: <Icons.Globe /> },
        { value: "100%", label: "品质承诺", icon: <Icons.Shield /> },
      ],
      intro: {
        title: "关于我们",
        // 第一段：公司背景
        p1: "Tops-Life 成立于 2011 年，是一家专注于软包装、医疗器械及新材料供应领域的创新型企业。我们在医疗行业组件、特种纸及油墨行业等领域拥有丰富的经验。公司的生产工艺和解决方案涵盖了多样化的产品与服务。",
        // 核心理念与业务 (列表化展示)
        coreTitle: "核心业务",
        coreItems: [
            "洁净软包装 (Clean Flexible Packaging)",
            "新材料 (New Materials)",
            "医疗器械 (Medical Devices)"
        ],
        // 第二段：能力与优势
        p2: "秉承“质量第一，服务市场与应用”的理念，我们为医药、电子、医疗及纸张加工印刷行业提供洁净、高效、环保的定制化产品与解决方案。依托强大的技术研发能力、严苛的质量控制、全球稳定的供应链及灵活的定制服务能力，我们在行业内形成了显著的竞争优势。",
        // 第三段：未来展望
        p3: "未来，公司将继续深耕核心领域，致力于成为高端包装、医疗注塑解决方案及新材料供应领域独特的市场领导者，为客户创造价值，赋能行业发展。",
        btn: "联系我们"
      },
      timeline: {
        title: "发展历程",
        items: [
          { year: "2011", title: "成立启航", desc: "Tops-Life 成立，确立软包装与新材料为核心方向。" },
          { year: "2015", title: "深耕医疗", desc: "全面拓展医疗器械组件与注塑业务。" },
          { year: "2019", title: "技术升级", desc: "研发投入加大，建立全球化稳定供应链体系。" },
          { year: "2024", title: "展望未来", desc: "致力于成为高端包装与医疗解决方案的全球领军者。" },
        ]
      },
      values: {
        title: "核心驱动力",
        items: [
          { title: "企业理念", desc: "质量第一，服务市场与应用。", icon: <Icons.Zap /> },
          { title: "愿景", desc: "成为高端包装、医疗注塑及新材料领域的独特市场领导者。", icon: <Icons.Target /> },
          { title: "使命", desc: "为客户创造价值，赋能行业发展。", icon: <Icons.Heart /> },
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
        { value: `${yearsExp}+`, label: "Years Exp.", icon: <Icons.Award /> },
        { value: "3", label: "Core Business", icon: <Icons.Target /> },
        { value: "Global", label: "Supply Chain", icon: <Icons.Globe /> },
        { value: "100%", label: "Quality First", icon: <Icons.Shield /> },
      ],
      intro: {
        title: "Who We Are",
        p1: "Tops-Life was founded in 2011. It is an innovative enterprise focusing on the fields of flexible packaging, medical devices, and new material supplying. With rich experience in various components of the medical, specialty paper, and ink industries, our production processes cover a diverse range of products and services.",
        coreTitle: "Core Businesses",
        coreItems: [
            "Clean Flexible Packaging",
            "New Materials Supplying",
            "Medical Devices & Components"
        ],
        p2: "Adhering to the concept of \"Quality First, Serving Market and Application\", we provide clean, efficient, and environmentally friendly customized solutions for pharmaceuticals, electronics, and printing industries. Relying on technological R&D, strict quality control, and a stable worldwide supply chain, we have established significant competitive advantages.",
        p3: "In the future, the company will continue to deepen its presence in core fields, commit to becoming a unique market-leading provider of high-end packaging and medical injection molding solutions, creating value for customers and empowering industry development.",
        btn: "Contact Us"
      },
      timeline: {
        title: "Our History",
        items: [
          { year: "2011", title: "Founded", desc: "Tops-Life established, focusing on packaging & materials." },
          { year: "2015", title: "Expansion", desc: "Expanded into medical device components and injection molding." },
          { year: "2019", title: "Innovation", desc: "Enhanced R&D and built a stable worldwide supply chain." },
          { year: "2024", title: "Future", desc: "Aiming to be a market leader in high-end packaging solutions." },
        ]
      },
      values: {
        title: "Core Values",
        items: [
          { title: "Philosophy", desc: "Quality First, Serving Market and Application.", icon: <Icons.Zap /> },
          { title: "Vision", desc: "To be a unique market-leading provider of high-end packaging and medical solutions.", icon: <Icons.Target /> },
          { title: "Mission", desc: "Create value for customers and empower the development of the industry.", icon: <Icons.Heart /> },
        ]
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden font-sans">
      
      {/* 1. Hero Section 顶部大标题 */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        {/* 背景装饰光斑 */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full mix-blend-multiply blur-3xl opacity-60 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full mix-blend-multiply blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
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

      {/* 2. Stats Bar 数据条 */}
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

      {/* 3. Main Introduction 核心介绍区域 */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* 左侧：图片区域 */}
            <div className="w-full lg:w-5/12 relative group lg:sticky lg:top-32">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-100 aspect-[4/5] md:aspect-[4/3] lg:aspect-[3/4]">
                    {/* 使用您指定的图片路径 */}
                    <img 
                        src="/banner/outsligth.jpg" 
                        alt="Tops Life Innovation" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                             // 如果 outsligth.jpg 加载失败，回退到占位图，防止页面空白
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070';
                        }}
                    />
                    {/* 渐变遮罩，保证文字清晰度（如果有文字覆盖的话），这里主要为了美观 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                </div>
                
                {/* 装饰性元素：年份标签 */}
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-sky-500 hidden md:block">
                    <p className="text-slate-500 text-sm uppercase tracking-wider font-bold">Since</p>
                    <p className="text-4xl font-bold text-slate-900">2011</p>
                </div>
                
                {/* 装饰性边框 */}
                <div className="absolute -z-10 top-6 -left-6 w-full h-full border-2 border-slate-200 rounded-2xl"></div>
            </div>

            {/* 右侧：文案区域 */}
            <div className="w-full lg:w-7/12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 relative inline-block">
                    {t.intro.title}
                    {/* 标题下划线装饰 */}
                    <span className="absolute bottom-1 right-0 w-2/3 h-3 bg-sky-200/50 -z-10 rounded-sm"></span>
                </h2>

                {/* 第一段：成立背景 */}
                <p className="text-lg text-slate-600 leading-relaxed mb-8 text-justify">
                    {t.intro.p1}
                </p>

                {/* 核心业务列表 (视觉重点) */}
                <div className="bg-sky-50/50 p-6 rounded-xl border border-sky-100 mb-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Icons.Target /> {t.intro.coreTitle}
                    </h3>
                    <ul className="grid md:grid-cols-1 gap-3">
                        {t.intro.coreItems.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                                <div className="shrink-0"><Icons.Check /></div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 第二段：优势与服务 */}
                <p className="text-lg text-slate-600 leading-relaxed mb-6 text-justify">
                    {t.intro.p2}
                </p>

                {/* 第三段：未来 */}
                <p className="text-lg text-slate-600 leading-relaxed mb-10 text-justify font-medium">
                    {t.intro.p3}
                </p>
                
                {/* 按钮 */}
                <Link to="/contact">
                     <button className="group flex items-center gap-2 px-8 py-3.5 bg-sky-600 text-white rounded-full font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 active:scale-95">
                        {t.intro.btn}
                        <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span>
                     </button>
                </Link>
            </div>
        </div>
      </div>

      {/* 4. Timeline 发展历程 */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">{t.timeline.title}</h2>
                <div className="w-16 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
                {/* 连接线 (PC端) */}
                <div className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-slate-200 mt-3"></div>

                <div className="grid md:grid-cols-4 gap-8">
                    {t.timeline.items.map((item, i) => (
                        <div key={i} className="relative pl-8 md:pl-0 md:pt-12 group">
                            {/* 移动端竖线 */}
                            <div className="md:hidden absolute left-[11px] top-3 bottom-[-40px] w-0.5 bg-slate-200"></div>
                            
                            {/* 圆点 */}
                            <div className="absolute left-0 top-1 md:top-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white border-4 border-sky-500 rounded-full z-10 group-hover:scale-125 group-hover:bg-sky-500 transition-all duration-300"></div>
                            
                            <div className="bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none border md:border-none border-slate-100 relative md:text-center transition-colors">
                                <span className="text-4xl md:text-5xl font-bold text-slate-200 group-hover:text-sky-200 transition-colors block mb-3 md:absolute md:-top-16 md:left-1/2 md:-translate-x-1/2 md:-z-10 select-none">
                                    {item.year}
                                </span>
                                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </section>

      {/* 5. Values 核心价值观 */}
      <section className="py-24 container mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t.values.title}</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                {language === 'zh' ? '驱动我们不断前行的力量' : 'The values that drive our excellence'}
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {/* 深色卡片 (Highlight) */}
            <div className="bg-slate-900 p-10 rounded-3xl text-white hover:translate-y-[-10px] transition-transform duration-500 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-white opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 rotate-12">
                   <Icons.Zap />
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 mb-6">
                        {t.values.items[0].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{t.values.items[0].title}</h3>
                    <p className="text-slate-300 leading-relaxed opacity-90">{t.values.items[0].desc}</p>
                </div>
            </div>

            {/* 浅色卡片 */}
            {[1, 2].map((idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:border-sky-200">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${idx === 1 ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.values.items[idx].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-sky-600 transition-colors">
                        {t.values.items[idx].title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{t.values.items[idx].desc}</p>
                </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default About;
