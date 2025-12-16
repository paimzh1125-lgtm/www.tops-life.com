import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from '../components/RevealText';
import { Target, Heart, Award, Leaf } from 'lucide-react';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// 历程数据配置
const HISTORY_DATA = [
  { 
    year: "2011", 
    title: "成立淘爱材料科技", 
    subtitle: "Tops Life Technology",
    desc: "开展软包装业务，提供洁净、控菌软包装研发，设计，验证和制造，产品包括薄膜/袋等。",
    image: "images/application.png" 
  },
  { 
    year: "2013", 
    title: "增加医疗器械 OEM 业务", 
    subtitle: "Medical Device OEM",
    desc: "提供医疗器械研发，设计，验证和制造，微小注塑和组装，进一步拓展制造能力边界。",
    image: "images/application.png" 
  },
  { 
    year: "2018", 
    title: "成立永爱生命", 
    subtitle: "Tops Life Science",
    desc: "成立苏州永爱生命科技有限公司，全面升级软包装制造能力，确立行业领先地位。",
    image: "images/application.png" 
  },
  { 
    year: "2021", 
    title: "成立新材料业务部门", 
    subtitle: "New Materials Dept.",
    desc: "拓展业务涉及特种环保水性油墨，特种纸品包装等行业，研发并推出大豆蛋白新产品。",
    image: "images/application.png" 
  },
  { 
    year: "2023", 
    title: "成立淘爱材料技术 (香港)", 
    subtitle: "Global Expansion",
    desc: "成立淘爱材料技术(香港)有限公司 Tops Life (Hong Kong) Technology Co.,Limited，进一步拓展海外业务。",
    image: "images/application.png" 
  },
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 头部淡入动画
      gsap.from(".header-fade", {
        y: 30, opacity: 0, duration: 1, stagger: 0.1, ease: "power3.out"
      });

      // 2. 时间轴节点动画 (左右交替滑入)
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        // 偶数项(左侧)从左边飞入(-50)，奇数项(右侧)从右边飞入(50)
        gsap.from(item, {
          x: isLeft ? -50 : 50, 
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // 元素顶部到达视口80%处触发
            toggleActions: "play none none reverse"
          }
        });
      });

      // 3. 愿景卡片上浮动画
      gsap.from(".value-card", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".values-section", start: "top 85%" }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-28 min-h-screen bg-slate-50 relative z-20 overflow-x-hidden">
      
      {/* Header Introduction */}
      <div className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto text-center">
            <div className="header-fade inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-sky-600 uppercase bg-sky-100 rounded-full">
                Since 2011
            </div>
            <RevealText 
                tag="h1" 
                text="关于我们" 
                className="header-fade text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8"
            />
            <p className="header-fade text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                苏州永爱生命科技有限公司是行业领先的制造商，我们始终聚焦<span className="text-sky-600 font-bold">创新</span>与<span className="text-sky-600 font-bold">合规</span>。无论是复杂的医疗器械组件，还是环保的大豆蛋白功能材料，我们都以匠心精神，诠释科技之美。
            </p>
        </div>
      </div>

      {/* Timeline Section (Zigzag Layout) */}
      <section className="py-20 bg-white relative">
         <div className="container mx-auto px-6">
            <div className="text-center mb-24">
                <h2 className="text-3xl font-bold text-slate-900">发展历程</h2>
                <div className="w-16 h-1.5 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="relative">
                {/* 中间垂直连接线 (仅在大屏显示) */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-100"></div>

                <div className="space-y-16 md:space-y-0">
                    {HISTORY_DATA.map((item, i) => {
                        const isEven = i % 2 === 0;
                        return (
                            <div key={i} className={`timeline-item flex flex-col md:flex-row items-center justify-between md:mb-32 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                
                                {/* 文字区域 */}
                                <div className={`w-full md:w-5/12 ${isEven ? 'md:pl-16 text-left' : 'md:pr-16 md:text-right'} mb-8 md:mb-0 relative`}>
                                    {/* 背景大年份数字 */}
                                    <div className={`text-[8rem] font-bold text-slate-50 absolute -top-10 -z-10 select-none pointer-events-none leading-none ${isEven ? 'left-10' : 'right-10'}`}>
                                        {item.year}
                                    </div>
                                    
                                    <div className="relative z-10">
                                        <span className="text-sky-600 font-bold text-xl block mb-2">{item.year}</span>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-2">{item.title}</h3>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">{item.subtitle}</p>
                                        <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                                    </div>
                                </div>

                                {/* 中间时间轴节点 */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-white border-[3px] border-sky-500 shadow-[0_0_0_4px_rgba(224,242,254,1)] z-10 hidden md:flex"></div>

                                {/* 图片区域 */}
                                <div className="w-full md:w-5/12 relative group">
                                    <div className="overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-white transform transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="aspect-[4/3] w-full relative overflow-hidden">
                                            <img 
                                                src={item.image} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* 图片微遮罩 */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-60"></div>
                                        </div>
                                    </div>
                                    {/* 装饰性色块 */}
                                    <div className={`absolute -bottom-4 -z-10 w-full h-full bg-sky-50 rounded-2xl ${isEven ? '-left-4' : '-right-4'} transition-all group-hover:bg-sky-100`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
         </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 container mx-auto px-6 values-section">
         <div className="grid md:grid-cols-3 gap-8">
            {/* 愿景 */}
            <div className="value-card bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:border-sky-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-8 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors shadow-sm">
                    <Target size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">愿景 Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                    成为全球生命科学及新材料领域的领军企业，引领行业创新标准。
                </p>
            </div>

            {/* 使命 */}
            <div className="value-card bg-white border border-slate-100 p-10 rounded-3xl shadow-lg hover:shadow-2xl hover:border-sky-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                    <Heart size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">使命 Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                    提供安全创新产品，助力健康与可持续发展，为生命护航。
                </p>
            </div>

            {/* 核心价值观 (高亮) */}
            <div className="value-card bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl shadow-2xl text-white transform md:-translate-y-4 border border-slate-700">
                <div className="flex gap-4 mb-8">
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"><Leaf className="text-emerald-400" size={24} /></div>
                    <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm"><Award className="text-yellow-400" size={24} /></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">价值观 Values</h3>
                <p className="text-slate-300 leading-relaxed mb-8">
                    技术改善生活品质，尊重环境，负责任生产，合作共赢。
                </p>
                <div className="h-1.5 w-24 bg-sky-500 rounded-full"></div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
