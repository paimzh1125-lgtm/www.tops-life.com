import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RevealText from '../components/RevealText';

const About: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Horizontal scroll timeline simulation with basic vertical scroll for simplicity in this demo, 
    // or use ScrollTrigger to pin and move horizontally.
    const ctx = gsap.context(() => {
        const items = gsap.utils.toArray('.timeline-item');
        gsap.from(items, {
            y: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
            }
        });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-tops-white relative z-20">
      <div className="container mx-auto px-6 mb-20">
        <RevealText 
            tag="h1" 
            text="关于我们" 
            className="text-4xl md:text-5xl font-bold text-tops-dark mb-8"
        />
        <div className="grid md:grid-cols-2 gap-12">
            <p className="text-lg text-slate-600 leading-relaxed">
                苏州托普斯生物科技有限公司是行业领先的制造商，致力于推动医疗安全、药用包装性能提升及可持续生物材料解决方案的发展。凭借全球化视野与扎实的工程技术基础，我们生产的高品质产品能够满足全球生命科学产业的严苛标准。
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
                我们始终聚焦创新与合规两大核心，为对精度和可靠性有高要求的合作伙伴提供有力支持。无论是复杂的医疗器械组件，还是环保的大豆蛋白功能材料，托普斯都以匠心精神，诠释科技之美。
            </p>
        </div>
      </div>

      {/* Timeline */}
      <section className="bg-white py-20 border-y border-slate-100" ref={timelineRef}>
         <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-12 text-center">发展历程</h2>
            <div className="relative border-l-2 border-tops-blue/20 ml-6 md:ml-0 md:border-l-0 md:border-t-2 md:mt-12 md:flex justify-between items-start gap-8">
                {[
                    { year: "2011", title: "淘爱材料科技", desc: "公司成立，开展洁净控菌软包装业务。" },
                    { year: "2013", title: "业务拓展", desc: "增加医疗器械OEM业务，微小注塑和组装。" },
                    { year: "2018", title: "永爱生命", desc: "成立永爱生命，升级制造，研发大豆蛋白。" },
                    { year: "2023", title: "走向国际", desc: "成立香港淘爱，全面拓展海外业务。" },
                ].map((item, i) => (
                    <div key={i} className="timeline-item relative pl-8 md:pl-0 md:pt-8 mb-10 md:mb-0 md:flex-1 group">
                        <div className="absolute left-[-5px] top-0 md:top-[-5px] md:left-0 w-3 h-3 bg-tops-blue rounded-full ring-4 ring-white group-hover:scale-150 transition-transform"></div>
                        <span className="text-4xl font-bold text-slate-200 group-hover:text-tops-blue transition-colors block mb-2">{item.year}</span>
                        <h3 className="text-xl font-bold text-tops-dark mb-2">{item.title}</h3>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 container mx-auto px-6">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-tops-dark to-slate-900 p-8 rounded-2xl text-white hover:translate-y-[-10px] transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-4 text-tops-blue">企业理念</h3>
                <p className="opacity-80">技术改善生活品质，尊重环境，负责任生产，合作共赢。</p>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-tops-dark">愿景</h3>
                <p className="text-slate-600">成为全球生命科学及新材料领域的领军企业。</p>
            </div>
            <div className="bg-white border border-slate-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-4 text-tops-dark">使命</h3>
                <p className="text-slate-600">提供安全创新产品，助力健康与可持续发展。</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;