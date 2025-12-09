// src/pages/About.tsx
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../components/LanguageContext';

// --- SVG Icons (No Lucide dependency) ---
const Icons = {
  Award: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
  Shield: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Globe: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  Factory: () => <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><line x1="17" y1="13" x2="17" y2="13"/><line x1="7" y1="13" x2="7" y2="13"/></svg>,
  Zap: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Heart: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
};

const About: React.FC = () => {
  const { language } = useLanguage();
  
  // 用于简单的页面加载动画
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(true); }, []);

  // --- 内容数据 (支持中英切换) ---
  const content = {
    zh: {
      hero: {
        title: "赋能生命科学，共创健康未来",
        subtitle: "关于我们",
        desc: "苏州永爱生命科技有限公司致力成为全球领先的医疗安全与生物材料解决方案提供商。",
      },
      stats: [
        { value: "12+", label: "年行业经验", icon: <Icons.Award /> },
        { value: "ISO", label: "国际质量认证", icon: <Icons.Shield /> },
        { value: "Global", label: "全球化布局", icon: <Icons.Globe /> },
        { value: "100%", label: "匠心制造", icon: <Icons.Factory /> },
      ],
      intro: {
        title: "关于 TOPS LIFE",
        p1: "苏州永爱生命科技有限公司是行业领先的制造商，致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。凭借全球化视野与扎实的工程技术基础，我们生产的高品质产品能够满足全球生命科学产业的严苛标准。",
        p2: "我们始终聚焦创新与合规两大核心，为对精度和可靠性有高要求的合作伙伴提供有力支持。无论是复杂的医疗器械组件，还是环保的大豆蛋白功能材料，托普斯都以匠心精神，诠释科技之美。",
      },
      timeline: {
        title: "发展历程",
        items: [
          { year: "2011", title: "淘爱材料科技", desc: "公司成立，开展洁净控菌软包装业务，奠定行业基础。" },
          { year: "2013", title: "业务拓展", desc: "增加医疗器械 OEM 业务，专注于微小注塑和精密组装技术。" },
          { year: "2018", title: "永爱生命", desc: "成立永爱生命，全面升级智能制造，并启动大豆蛋白研发项目。" },
          { year: "2023", title: "走向国际", desc: "成立香港淘爱，全面拓展海外业务，建立全球供应链网络。" },
        ]
      },
      values: {
        title: "核心价值",
        items: [
          { title: "企业理念", desc: "技术改善生活品质，尊重环境，负责任生产，合作共赢。", icon: <Icons.Zap /> },
          { title: "愿景", desc: "成为全球生命科学及新材料领域的领军企业。", icon: <Icons.Target /> },
          { title: "使命", desc: "提供安全创新产品，助力健康与可持续发展。", icon: <Icons.Heart /> },
        ]
      }
    },
    en: {
      hero: {
        title: "Empowering Life Sciences",
        subtitle: "About Us",
        desc: "TOPS LIFE is dedicated to becoming a global leader in medical safety and biomaterial solutions.",
      },
      stats: [
        { value: "12+", label: "Years Exp.", icon: <Icons.Award /> },
        { value: "ISO", label: "Certified", icon: <Icons.Shield /> },
        { value: "Global", label: "Presence", icon: <Icons.Globe /> },
        { value: "100%", label: "Craftsmanship", icon: <Icons.Factory /> },
      ],
      intro: {
        title: "Who We Are",
        p1: "TOPS LIFE Technology is a leading manufacturer dedicated to advancing medical safety, pharmaceutical packaging, and sustainable biomaterial solutions. With a global vision and solid engineering foundation, we produce high-quality products that meet the rigorous standards of the global life sciences industry.",
        p2: "Focusing on innovation and compliance, we provide robust support for partners demanding precision and reliability. From complex medical device components to eco-friendly soy protein functional materials, TOPS LIFE interprets the beauty of technology with craftsmanship.",
      },
      timeline: {
        title: "Our History",
        items: [
          { year: "2011", title: "Foundation", desc: "Company established, focusing on cleanroom packaging solutions." },
          { year: "2013", title: "Expansion", desc: "Added Medical Device OEM services, specializing in micro-molding." },
          { year: "2018", title: "TOPS LIFE", desc: "Rebranded to TOPS LIFE, upgraded manufacturing, and started soy protein R&D." },
          { year: "2023", title: "Global Reach", desc: "Established Hong Kong branch to expand international business operations." },
        ]
      },
      values: {
        title: "Core Values",
        items: [
          { title: "Philosophy", desc: "Improving life quality through technology, respecting the environment, and responsible production.", icon: <Icons.Zap /> },
          { title: "Vision", desc: "To be a leading enterprise in global life sciences and new materials.", icon: <Icons.Target /> },
          { title: "Mission", desc: "Provide safe, innovative products to support health and sustainable development.", icon: <Icons.Heart /> },
        ]
      }
    }
  };

  const t = language === 'zh' ? content.zh : content.en;

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-50 overflow-hidden">
        {/* Decorative Background Elements (CSS only) */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-100 rounded-full mix-blend-multiply blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full mix-blend-multiply blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>

        <div className={`container mx-auto px-6 relative z-10 text-center transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <span className="text-sky-600 font-bold tracking-widest uppercase mb-4 block animate-pulse">
                {t.hero.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                {t.hero.desc}
            </p>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-slate-900 text-white py-12 relative z-20 -mt-8 mx-4 md:mx-6 rounded-2xl shadow-xl">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/10">
                {t.stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col items-center hover:scale-105 transition-transform duration-300">
                        <div className="text-sky-400 mb-2">{stat.icon}</div>
                        <span className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</span>
                        <span className="text-xs md:text-sm text-slate-400 uppercase tracking-wider">{stat.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. Introduction Story */}
      <div className="container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Image Area */}
            <div className="w-full lg:w-1/2 relative group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative bg-slate-200">
                    <img 
                        src="/banner/factory-placeholder.jpg" 
                        alt="TOPS LIFE Factory" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            // 图片加载失败时的占位图
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="font-bold text-lg">{language === 'zh' ? '苏州生产基地' : 'Suzhou Manufacturing Base'}</p>
                    </div>
                </div>
                {/* Decorative Frame */}
                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full border-2 border-sky-100 rounded-2xl"></div>
            </div>

            {/* Text Area */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 relative inline-block">
                    {t.intro.title}
                    <span className="absolute bottom-1 right-0 w-1/3 h-3 bg-sky-200/40 -z-10"></span>
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-justify">
                    <p>{t.intro.p1}</p>
                    <p>{t.intro.p2}</p>
                </div>
                
                <div className="mt-10">
                     <button className="px-8 py-3 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 active:scale-95">
                        {language === 'zh' ? '联系我们' : 'Contact Us'}
                     </button>
                </div>
            </div>
        </div>
      </div>

      {/* 4. Timeline */}
      <section className="bg-slate-50 py-24 border-y border-slate-200">
         <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-slate-900">{t.timeline.title}</h2>
                <div className="w-16 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
                {/* Desktop Connecting Line */}
                <div className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-slate-200 mt-3"></div>

                <div className="grid md:grid-cols-4 gap-8">
                    {t.timeline.items.map((item, i) => (
                        <div key={i} className="relative pl-8 md:pl-0 md:pt-12 group">
                            {/* Mobile Vertical Line */}
                            <div className="md:hidden absolute left-[11px] top-3 bottom-[-40px] w-0.5 bg-slate-200"></div>
                            
                            {/* Dot */}
                            <div className="absolute left-0 top-1 md:top-0 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white border-4 border-sky-500 rounded-full z-10 group-hover:scale-125 group-hover:bg-sky-500 transition-all duration-300"></div>
                            
                            <div className="bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none border md:border-none border-slate-100 relative md:text-center transition-colors">
                                <span className="text-4xl md:text-5xl font-bold text-slate-200 group-hover:text-sky-100 transition-colors block mb-3 md:absolute md:-top-16 md:left-1/2 md:-translate-x-1/2 md:-z-10 select-none">
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

      {/* 5. Values */}
      <section className="py-24 container mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">{t.values.title}</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                {language === 'zh' ? '驱动我们不断前行的力量' : 'The power that drives us forward'}
            </p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {/* Dark Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl text-white hover:translate-y-[-10px] transition-transform duration-500 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-white opacity-5 group-hover:opacity-10 transition-opacity transform scale-150 rotate-12">
                   <Icons.Zap /> {/* Large background icon */}
                </div>
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-sky-500/20 rounded-2xl flex items-center justify-center text-sky-400 mb-6">
                        {t.values.items[0].icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{t.values.items[0].title}</h3>
                    <p className="text-slate-300 leading-relaxed opacity-90">{t.values.items[0].desc}</p>
                </div>
            </div>

            {/* Light Cards */}
            {[1, 2].map((idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 group hover:border-sky-200">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${idx === 1 ? 'bg-purple-50 text-purple-600' : 'bg-rose-50 text-rose-600'}`}>
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

      {/* 6. Simple Trust Strip */}
      <div className="bg-slate-50 py-10 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Certifications & Standards</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-lg font-bold text-slate-800"><Icons.Shield /> ISO 13485</div>
                <div className="flex items-center gap-2 text-lg font-bold text-slate-800"><Icons.Shield /> ISO 9001</div>
                <div className="flex items-center gap-2 text-lg font-bold text-slate-800"><Icons.Globe /> FDA Registered</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;
