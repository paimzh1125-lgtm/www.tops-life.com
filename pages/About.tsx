import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from '../components/RevealText';
import { Target, Heart, Globe, Award, Zap, Leaf } from 'lucide-react'; // 引入图标库

// 注册 ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 历程数据配置
const HISTORY_DATA = [
  { 
    year: "2011", 
    title: "淘爱材料科技成立", 
    subtitle: "Tops Life Technology",
    desc: "开展软包装业务，提供洁净、控菌软包装研发，设计，验证和制造，产品包括薄膜/袋等。",
    image: "images/application1.png" // 原始需求: 淘爱的logo
  },
  { 
    year: "2013", 
    title: "增加医疗器械OEM业务", 
    subtitle: "Medical Device OEM",
    desc: "提供医疗器械研发，设计，验证和制造，微小注塑和组装，进一步拓展制造能力边界。",
    image: "images/application1.png" // 原始需求: 有关对医疗器械OEM能力的展示
  },
  { 
    year: "2018", 
    title: "永爱生命成立", 
    subtitle: "Tops Life Science",
    desc: "成立苏州永爱生命科技有限公司，全面升级软包装制造能力，确立行业领先地位。",
    image: "images/application1.png" // 原始需求: 永爱的logo
  },
  { 
    year: "2021", 
    title: "成立新材料业务部门", 
    subtitle: "New Materials Dept.",
    desc: "拓展业务涉及特种环保水性油墨，特种纸品包装等行业，研发并推出大豆蛋白新产品。",
    image: "images/application1.png" // 原始需求: 一些有关大豆蛋白的新产品
  },
  { 
    year: "2023", 
    title: "成立淘爱材料技术(香港)", 
    subtitle: "Global Expansion",
    desc: "成立淘爱材料技术(香港)有限公司 Tops Life (Hong Kong) Technology Co.,Limited，进一步拓展海外业务。",
    image: "images/application1.png" // 原始需求: 面向海外市场的图片
  },
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 头部文字淡入
      gsap.from(".header-fade", {
        y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out"
      });

      // 2. 时间轴节点动画 (左右交替进入)
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        gsap.from(item, {
          x: isLeft ? -50 : 50, // 左侧元素从左飞入，右侧从右飞入
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%", // 当元素顶部到达视口 85% 处触发
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. 企业文化卡片动画
      gsap.from(".value-card", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".values-section", start: "top 80%" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-28 min-h-screen bg-slate-50 relative z-20 overflow-x-hidden">
      
      {/* 1. Header Introduction */}
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
            <div className="header-fade inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-sky-600 uppercase bg-sky-100 rounded-full">
                Since 2011
            </div>
            <RevealText 
                tag="h1" 
                text="关于我们" 
                className="header-fade text-4xl md:text-6xl font-bold text-slate-900 mb-8"
            />
            <p className="header-fade text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                苏州永爱生命科技有限公司是行业领先的制造商，我们始终聚焦<span className="text-sky-600 font-bold">创新</span>与<span className="text-sky-600 font-bold">合规</span>。无论是复杂的医疗器械组件，还是环保的大豆蛋白功能材料，托普斯都以匠心精神，诠释科技之美。
            </p>
        </div>
      </div>

      {/* 2. Timeline Section (Zigzag Layout) */}
      <section className="py-20 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-3xl font-bold text-slate-900">发展历程</h2>
                <div className="w-16 h-1 bg-sky-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
                {/* 中间垂直线条 (仅在大屏显示) */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-200"></div>

                <div className="space-y-12 md:space-y-0">
                    {HISTORY_DATA.map((item, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={i} className={`timeline-item flex flex-col md:flex-row items-center justify-between md:mb-24 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* 文本区域 */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-12 text-left' : 'md:pr-12 md:text-right'} mb-8 md:mb-0`}>
                                    <div className="text-6xl font-bold text-slate-100 mb-2 -mt-4 absolute z-0 select-none opacity-50 pointer-events-none">
                                        {item.year}
                                    </div>
                                    <div className="relative z-10">
                                        <span className="text-sky-600 font-bold text-xl block mb-1">{item.year}</span>
                                        <h3 className="text-2xl font-bold text-slate-800 mb-1">{item.title}</h3>
                                        <p className="text-sm text-slate-400 font-medium mb-4 uppercase tracking-wider">{item.subtitle}</p>
                                        <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>

                                {/* 中间圆点 */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 border-4 border-white shadow-md z-10 hidden md:flex">
                                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full"></div>
                                </div>

                                {/* 图片区域 */}
                                <div className="w-full md:w-5/12 relative group">
                                    <div className={`overflow-hidden rounded-2xl shadow-lg border border-slate-100 bg-white transform transition-transform duration-500 hover:-translate-y-2`}>
                                        <div className="aspect-[16/9] w-full relative overflow-hidden">
                                            {/* 图片自适应容器 */}
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* 图片遮罩，增加文字可读性或质感 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                        </div>
                                    </div>
                                    {/* 装饰性背景块 */}
                                    <div className={`absolute top-4 -z-10 w-full h-full bg-sky-50 rounded-2xl ${isEven ? '-left-4' : '-right-4'}`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
         </div>
      </section>

      {/* 3. Philosophy / Vision / Mission */}
      <section className="py-24 container mx-auto px-6 values-section">
         <div className="grid md:grid-cols-3 gap-8">
            {/* 愿景 */}
            <div className="value-card bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-xl hover:border-sky-200 transition-all duration-300 group">
                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-6 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">愿景 Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                    成为全球生命科学及新材料领域的领军企业，引领行业创新标准。
                </p>
            </div>

            {/* 使命 */}
            <div className="value-card bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-xl hover:border-sky-200 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Heart size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">使命 Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                    提供安全创新产品，助力健康与可持续发展，为生命护航。
                </p>
            </div>

            {/* 理念 (高亮卡片) */}
            <div className="value-card bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-xl text-white transform md:-translate-y-4">
                <div className="flex gap-4 mb-6">
                    <Leaf className="text-emerald-400" />
                    <Award className="text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">企业理念 Values</h3>
                <p className="opacity-90 leading-relaxed mb-6">
                    技术改善生活品质，尊重环境，负责任生产，合作共赢。
                </p>
                <div className="h-1 w-20 bg-sky-500 rounded-full"></div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
