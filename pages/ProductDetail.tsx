import React, { useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1. 引入语言钩子
import { useLanguage } from '../components/LanguageContext';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 图标组件 ---
const Icons = {
  Back: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Check: () => <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Tech: () => <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
};

// --- 2. 产品数据字典 (包含中英文) ---
const PRODUCT_DATABASE: any = {
  "microfluidic": {
    zh: {
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
      btnText: "联系我们的工程师",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要定制规格或索取样品？"
    },
    en: {
      title: "Microfluidic Chip Substrate",
      subtitle: "Lab-on-a-Chip Core: Microstructure + Material + Stability",
      description: "Designed for POCT, IVD, and high-end bioanalysis. Utilizing micro-injection molding, hot embossing, and laser etching, we achieve precise replication of micron-level channels on PMMA, COC/COP materials, ensuring fluid dynamic consistency and low adsorption.",
      features: [
        "Micro-replication Accuracy: Channel width/depth error controlled within microns",
        "Surface Treatment: Hydrophilic/hydrophobic modification for various reactions",
        "Material Diversity: Supports PMMA / COC / COP / Glass / Silicon",
        "Batch Consistency: Optimized mold flow design ensures quality in mass production"
      ],
      specs: [
        { label: "Materials", value: "PMMA, COC, COP, PC" },
        { label: "Channel Accuracy", value: "±2 μm" },
        { label: "Roughness", value: "Ra < 0.05 μm" },
        { label: "Process", value: "Micro-Injection / Laser Etching" },
        { label: "Applications", value: "Gene Sequencing, Immunoassay, Organ-on-Chip" }
      ],
      btnText: "Contact Engineers",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need customization or samples?"
    },
    image: "https://images.unsplash.com/photo-1628595351029-c2bf17511435?auto=format&fit=crop&q=80&w=1200"
  },
  "stapler": {
    zh: {
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
      btnText: "联系我们的工程师",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要定制规格或索取样品？"
    },
    en: {
      title: "Surgical Stapler Components",
      subtitle: "Safety + Strength + Assembly Reliability",
      description: "We provide comprehensive manufacturing solutions for blades, cartridges, housings, and precision transmission parts. Understanding the critical safety requirements of minimally invasive surgery, our products undergo strict fatigue testing under ISO 13485 control to ensure firing stability and suture safety.",
      features: [
        "High Strength: Medical-grade stainless steel combined with high-performance plastics",
        "Risk Control: Strict tolerance fits to prevent jamming or firing failure",
        "Sterilization: Materials compatible with EO / Gamma sterilization",
        "Traceability: UDI compliant, 100% inspection on critical dimensions"
      ],
      specs: [
        { label: "Components", value: "Cartridge, Pusher, Circular Knife, Housing" },
        { label: "Materials", value: "LCP, PEEK, Medical Stainless Steel" },
        { label: "Process", value: "Precision Injection + Insert Molding + CNC" },
        { label: "Tolerance", value: "ISO 2768-m / Critical ±0.01mm" },
        { label: "Compliance", value: "ISO 13485, FDA Master File" }
      ],
      btnText: "Contact Engineers",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need customization or samples?"
    },
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=1200"
  },
  "ivd": {
    zh: {
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
      btnText: "联系我们的工程师",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要定制规格或索取样品？"
    },
    en: {
      title: "IVD Consumables",
      subtitle: "Cleanliness + Bio-safety + Batch Stability",
      description: "Reagent cups, deep well plates, and cartridges produced in ISO Class 8 cleanrooms. We focus on Bioburden control, ensuring products are DNase/RNase-free and pyrogen-free, with excellent optical properties and low adsorption to guarantee diagnostic accuracy.",
      features: [
        "Clean Mfg: Fully automated closed-loop feeding and production",
        "Bio-safety: Enzyme-free, Pyrogen-free, Low extractables",
        "High Cavity Molds: Mass production with consistent dimensions",
        "Optical Performance: High transmittance materials for fluorescence detection"
      ],
      specs: [
        { label: "Products", value: "PCR Tubes, Deep Well Plates, Cuvettes" },
        { label: "Materials", value: "Medical Grade PP, PS (High Clarity)" },
        { label: "Environment", value: "ISO Class 8 Cleanroom" },
        { label: "QC", value: "Airtightness Test, Optical Inspection" },
        { label: "Packaging", value: "Medical Blister / Sterilization Pouch" }
      ],
      btnText: "Contact Engineers",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need customization or samples?"
    },
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200"
  },
  "gear": {
    zh: {
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
      btnText: "联系我们的工程师",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要定制规格或索取样品？"
    },
    en: {
      title: "Precision Gears & Transmission",
      subtitle: "Precision + Stability + Long Life",
      description: "Micro power transmission systems for drug delivery devices and surgical robots. Utilizing POM, PEEK, and MIM technology to manufacture high-module precision micro-gears (JGMA/ISO standards), achieving low noise, wear resistance, and high efficiency.",
      features: [
        "High Precision: Small module, low runout for smooth transmission",
        "Low Noise: Optimized tooth profile and material pairing",
        "Long Life: Self-lubricating materials for high-frequency use",
        "Miniaturization: Capability for micro-gears < 5mm diameter"
      ],
      specs: [
        { label: "Types", value: "Spur Gears, Worm Gears, Planetary Gearbox" },
        { label: "Materials", value: "POM, PEEK, MIM" },
        { label: "Precision", value: "JGMA Grade 0 / ISO Grade 5" },
        { label: "Performance", value: "Low Noise (<45dB), High Efficiency" },
        { label: "Applications", value: "Insulin Pumps, Staplers, Rehab Devices" }
      ],
      btnText: "Contact Engineers",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need customization or samples?"
    },
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // 3. 获取当前语言
  const { language } = useLanguage(); 
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 4. 根据 ID 获取产品对象，但此时不直接获取内容，而是获取整个中英文包
  const productData = id ? PRODUCT_DATABASE[id] : null;
  // 5. 根据 language ('zh' 或 'en') 获取具体文案
  // 使用类型断言避免 TypeScript 报错，假设数据结构一定是 { zh:..., en:... }
  const content = productData ? productData[language] : null;
  const image = productData ? productData.image : "";

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!content) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out"
      });
      gsap.from(".detail-anim", {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.2, 
        scrollTrigger: { trigger: ".content-section", start: "top 80%" }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [id, content]); // 依赖项加入 content，这样切换语言时也会触发刷新

  if (!content) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              {language === 'zh' ? '产品未找到' : 'Product Not Found'}
            </h2>
            <Link to="/products" className="text-sky-600 hover:underline">
              {language === 'zh' ? '返回产品列表' : 'Back to Products'}
            </Link>
        </div>
    );
  }

  return (
    <div ref={containerRef} className="pt-32 pb-20 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto px-6">
        
        {/* 返回按钮 */}
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform"><Icons.Back /></span>
          {content.backText}
        </Link>

        {/* 顶部区域：图片 + 核心描述 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* 左侧图片 */}
          <div className="hero-anim relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-100">
              <img 
                src={image} 
                alt={content.title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000';
                }}
              />
            </div>
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
          </div>

          {/* 右侧文本 */}
          <div className="hero-anim flex flex-col justify-center">
             <div className="mb-4 text-sky-600 font-bold tracking-widest uppercase text-sm">Product Detail</div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{content.title}</h1>
             <p className="text-lg font-medium text-slate-700 mb-6 border-l-4 border-sky-500 pl-4">{content.subtitle}</p>
             <p className="text-slate-600 leading-relaxed mb-8 text-justify">{content.description}</p>
             
             {/* 核心特性 Tag */}
             <div className="space-y-3">
               {content.features.map((feature: string, index: number) => (
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
            <h2 className="text-2xl font-bold text-slate-900">{content.specTitle}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
             {content.specs.map((spec: any, index: number) => (
               <div key={index} className="flex flex-col sm:flex-row justify-between sm:items-center py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors px-2 rounded">
                  <span className="text-slate-500 font-medium text-sm">{spec.label}</span>
                  <span className="text-slate-900 font-bold mt-1 sm:mt-0">{spec.value}</span>
               </div>
             ))}
          </div>

          {/* CTA 区域 */}
          <div className="mt-12 pt-8 text-center">
            <p className="text-slate-500 mb-6">{content.ctaTitle}</p>
            <Link to="/contact">
              <button className="px-10 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-1">
                {content.btnText}
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
