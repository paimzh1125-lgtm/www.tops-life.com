import React, { useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册插件
gsap.registerPlugin(ScrollTrigger);

// --- 1. 图标组件 (复用风格) ---
const Icons = {
  Back: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Check: () => <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Tech: () => <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
};

// --- 2. 产品详细数据字典 (根据你的要求编写) ---
const PRODUCT_DATABASE: any = {
  // ① 微流控芯片基底
  "microfluidic": {
    title: "微流控芯片基底 (Microfluidic Chips)",
    subtitle: "Lab-on-a-Chip 核心载体：微结构 + 材料 + 流体稳定性",
    description: "专为 POCT、IVD 及高端生物分析领域设计。我们利用微注塑、热压及激光蚀刻技术，在 PMMA、COC/COP 等高性能材料上实现微米级通道的精准复制，确保流体动力学的一致性与低吸附性能。",
    features: [
      "微结构复制精度：通道宽度/深度误差控制在微米级",
      "表面处理技术：亲疏水改性，适应不同生化反应需求",
      "材料多样性：支持 PMMA / COC / COP / 玻璃 / 硅",
      "批量一致性：优化的模具流道设计，确保百万级产能下的品质均一"
    ],
    specs: [
      { label: "常用材料", value: "PMMA, COC, COP, PC" },
      { label: "微通道精度", value: "±2 μm" },
      { label: "表面粗糙度", value: "Ra < 0.05 μm" },
      { label: "加工工艺", value: "精密微注塑 / 激光蚀刻" },
      { label: "应用领域", value: "基因测序, 免疫分析, 器官芯片" }
    ],
    // 实际项目中请替换为真实图片路径
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=1200"
  },

  // ② 外科吻合器组件
  "stapler": {
    title: "外科吻合器组件 (Surgical Stapler Parts)",
    subtitle: "安全性 + 强度 + 装配可靠性",
    description: "提供刀片、钉仓、壳体及精密传动件的整体制造方案。我们深知微创外科手术对器械安全性的极致要求，产品经过严格的疲劳寿命测试与 ISO 13485 体系管控，确保手术过程中的触发稳定与组织缝合安全。",
    features: [
      "高强度结构：医疗级不锈钢结合高性能工程塑料，确保机械强度",
      "失效风险控制：严格的公差配合，防止卡钉或击发失败",
      "灭菌适配：材料耐受 EO / Gamma 射线灭菌",
      "全程可追溯：符合 UDI 要求，关键尺寸 100% 全检"
    ],
    specs: [
      { label: "组件类型", value: "钉仓, 推钉片, 环形刀, 壳体" },
      { label: "关键材料", value: "LCP, PEEK, 医疗级不锈钢" },
      { label: "制造工艺", value: "精密注塑 + 嵌件成型 + CNC" },
      { label: "公差等级", value: "ISO 2768-m / 特殊部位 ±0.01mm" },
      { label: "合规标准", value: "ISO 13485, FDA Master File" }
    ],
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200"
  },

  // ③ 体外诊断耗材
  "ivd": {
    title: "体外诊断耗材 (IVD Consumables)",
    subtitle: "洁净度 + 生物安全 + 批量稳定",
    description: "在 ISO Class 8 (10万级) 洁净环境下生产的试剂杯、深孔板及反应卡匣。我们专注于生物负载 (Bioburden) 控制，确保产品无 DNase/RNase、无热原，并具备极佳的光学性能与低吸附特性，保障检测结果的准确性。",
    features: [
      "严格的洁净制造：全自动封闭式供料与生产",
      "生物安全性：无酶、无热原、低析出物",
      "高腔数模具：实现大规模量产的同时保持尺寸一致性",
      "光学性能：高透光率材料，满足荧光定量检测需求"
    ],
    specs: [
      { label: "产品类型", value: "PCR管, 深孔板, 发光杯, 卡匣" },
      { label: "材料", value: "医疗级 PP, PS (高透)" },
      { label: "生产环境", value: "ISO Class 8 (10万级洁净室)" },
      { label: "质量控制", value: "气密性测试, 光学检测" },
      { label: "包装", value: "医疗级吸塑 / 灭菌袋" }
    ],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200"
  },

  // ④ 精密齿轮 / 传动件
  "gear": {
    title: "精密齿轮 / 传动件 (Precision Gears)",
    subtitle: "精度 + 传动稳定性 + 长寿命",
    description: "专注于医疗给药装置与手术机器人的微型动力传输系统。利用 POM、PEEK 及金属粉末冶金技术，制造高模数精度 (JGMA/ISO标准) 的微型齿轮，实现低噪音、耐磨损且高效的动力传递。",
    features: [
      "高精度等级：模数小、跳动极低，确保传动平稳",
      "低噪音设计：优化的齿形设计与材料配对",
      "耐磨长寿命：自润滑材料应用，适应高频使用场景",
      "微型化能力：具备直径 < 5mm 的微型齿轮量产能力"
    ],
    specs: [
      { label: "类型", value: "直齿轮, 蜗轮蜗杆, 行星齿轮箱" },
      { label: "材料", value: "POM, PEEK, 金属粉末冶金" },
      { label: "精度等级", value: "JGMA 0级 / ISO 5级" },
      { label: "性能指标", value: "低噪音 (<45dB), 高传动效率" },
      { label: "应用", value: "胰岛素泵, 吻合器, 康复设备" }
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 获取数据，如果 ID 不存在则返回 null
  const product = id ? PRODUCT_DATABASE[id] : null;

  useEffect(() => {
    if (!product) {
      // 如果找不到产品，可以选择跳转回产品列表或显示404
      // navigate('/products'); 
      return;
    }

    // GSAP 动画
    const ctx = gsap.context(() => {
      // 标题和图片进场
      gsap.from(".hero-anim", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
      });
      
      // 详情板块进场
      gsap.from(".detail-anim", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, 
        scrollTrigger: { trigger: ".content-section", start: "top 80%" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id, product, navigate]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">产品未找到</div>;
  }

  return (
    <div ref={containerRef} className="pt-32 pb-20 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-6">
        
        {/* 返回按钮 */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform"><Icons.Back /></span>
          返回产品列表
        </Link>

        {/* 顶部区域：图片 + 核心描述 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* 左侧图片 */}
          <div className="hero-anim relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>
            {/* 装饰圆点背景 */}
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
          </div>

          {/* 右侧文本 */}
          <div className="hero-anim flex flex-col justify-center">
             <div className="mb-4 text-sky-600 font-bold tracking-widest uppercase text-sm">Product Detail</div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{product.title}</h1>
             <p className="text-lg font-medium text-slate-700 mb-6 border-l-4 border-sky-500 pl-4">{product.subtitle}</p>
             <p className="text-slate-600 leading-relaxed mb-8 text-justify">{product.description}</p>
             
             {/* 核心特性 Tag */}
             <div className="space-y-3">
               {product.features.map((feature: string, index: number) => (
                 <div key={index} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0"><Icons.Check /></span>
                    <span className="text-slate-700 text-sm">{feature}</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* 底部详细参数区域 */}
        <div className="content-section detail-anim bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
            <Icons.Tech />
            <h2 className="text-2xl font-bold text-slate-900">技术规格 Technical Specifications</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
             {product.specs.map((spec: any, index: number) => (
               <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center py-2 border-b border-slate-50 hover:bg-slate-50 transition-colors px-2 rounded">
                  <span className="text-slate-500 font-medium text-sm">{spec.label}</span>
                  <span className="text-slate-900 font-bold mt-1 sm:mt-0">{spec.value}</span>
               </div>
             ))}
          </div>

          {/* CTA 区域 */}
          <div className="mt-12 pt-8 text-center">
            <p className="text-slate-500 mb-6">需要定制规格或索取样品？</p>
            <Link to="/contact">
              <button className="px-10 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-1">
                联系我们的工程师
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
