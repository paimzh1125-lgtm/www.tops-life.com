import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger);

// --- 图标组件 ---
const Icons = {
  Back: () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>,
  Check: () => <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Tech: () => <svg className="w-6 h-6 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
};

interface ProductContent {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  btnText: string;
  specTitle: string;
  backText: string;
  notFound: string;
  ctaTitle: string;
}

interface ProductEntry {
  zh: ProductContent;
  en: ProductContent;
  image: string;
}

// --- 产品数据字典 (包含中英文) ---
const PRODUCT_DATABASE: Record<string, ProductEntry> = {
  // === 医用洁净软包装 ===
  "pe-bag": {
    zh: {
      title: "PE 袋和卷材 (Medical PE Bags & Rolls)",
      subtitle: "无菌屏障系统 (SBS) 的核心组成部分",
      description: "专为医疗器械、耗材及无菌产品的终端灭菌设计。采用医疗级聚乙烯原料，通过多层共挤工艺制造，具备优异的厚度均匀性和热封窗口稳定性，构成完整的无菌屏障系统。",
      features: [
        "医疗级原料：低析出、低气味，确保药物与器械安全",
        "性能优异：良好的抗穿刺与抗撕裂性能",
        "灭菌稳定：EO / Gamma / 蒸汽灭菌后不脆化、不收缩",
        "洁净生产：ISO Class 8 (万级) 环境生产"
      ],
      specs: [
        { label: "材料结构", value: "LDPE / HDPE 多层共挤" },
        { label: "灭菌兼容性", value: "EO, Gamma, Steam" },
        { label: "符合标准", value: "ISO 11607, ISO 13485" },
        { label: "应用", value: "手术器械包, 一次性耗材" },
        { label: "生产环境", value: "ISO Class 8 Cleanroom" }
      ],
      btnText: "联系我们的工程师",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要定制规格或索取样品？"
    },
    en: {
      title: "Medical PE Bags & Rolls",
      subtitle: "Core Component of Sterile Barrier Systems (SBS)",
      description: "Designed for terminal sterilization of medical devices and consumables. Manufactured from medical-grade polyethylene using multi-layer co-extrusion technology, ensuring uniform thickness and stable heat-sealing windows.",
      features: [
        "Medical Grade: Low extractables, low odor",
        "Performance: Excellent puncture and tear resistance",
        "Stability: No embrittlement or shrinkage after EO/Gamma/Steam sterilization",
        "Clean Mfg: Produced in ISO Class 8 environment"
      ],
      specs: [
        { label: "Structure", value: "LDPE / HDPE Co-extrusion" },
        { label: "Sterilization", value: "EO, Gamma, Steam" },
        { label: "Standard", value: "ISO 11607, ISO 13485" },
        { label: "Applications", value: "Surgical Kits, Disposables" },
        { label: "Environment", value: "ISO Class 8 Cleanroom" }
      ],
      btnText: "Contact Engineers",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need customization or samples?"
    },
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=1200"
  },
  "medical-film": {
    zh: {
      title: "医用级薄膜 (Medical-grade Films)",
      subtitle: "高性能医疗包装与功能性覆膜",
      description: "广泛用于医疗包装、诊断耗材及功能性覆膜。我们支持 PE、EVA、TPU 等多种体系的多层共挤设计，可根据客户需求定制厚度、雾度及表面摩擦系数。",
      features: [
        "洁净度高：极低的微粒和生物负载风险",
        "定制化设计：支持多层共挤结构",
        "加工性能：稳定的热封强度与剥离性能",
        "广泛应用：适合 IVD 试剂封装与医用盖膜"
      ],
      specs: [
        { label: "材料体系", value: "PE, EVA, TPU" },
        { label: "工艺", value: "多层共挤 (Co-extrusion)" },
        { label: "特性", value: "可定制雾度 / COF" },
        { label: "洁净度", value: "低生物负载 (Low Bioburden)" },
        { label: "应用", value: "IVD 耗材, 医用盖膜" }
      ],
      btnText: "联系技术顾问",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要特殊功能薄膜？"
    },
    en: {
      title: "Medical-grade Films",
      subtitle: "High-Performance Films for Packaging & Lamination",
      description: "Used for medical packaging, diagnostic consumables, and functional lamination. We support multi-layer co-extrusion of PE, EVA, TPU systems, with customizable thickness, haze, and coefficient of friction (COF).",
      features: [
        "High Cleanliness: Ultra-low particulate and bioburden risk",
        "Custom Design: Multi-layer co-extrusion capabilities",
        "Processability: Stable heat seal strength and peelability",
        "Versatile: Ideal for IVD reagents and medical lidding"
      ],
      specs: [
        { label: "Materials", value: "PE, EVA, TPU" },
        { label: "Technology", value: "Multi-layer Co-extrusion" },
        { label: "Features", value: "Custom Haze / COF" },
        { label: "Cleanliness", value: "Low Bioburden" },
        { label: "Applications", value: "IVD Consumables, Lidding" }
      ],
      btnText: "Contact Consultants",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need specialized films?"
    },
    image: "https://images.unsplash.com/photo-1605609284543-c2229e62553a?auto=format&fit=crop&q=80&w=1200"
  },
  "high-barrier": {
    zh: {
      title: "铝箔 / 尼龙高阻隔包装",
      subtitle: "针对高敏感度产品的极致防护",
      description: "专为对湿氧极度敏感的药品原料、中间体及高附加值医疗耗材设计。采用铝箔、尼龙与 PE 的多层复合结构，提供卓越的气体与水汽阻隔性能。",
      features: [
        "极低渗透率：优异的 OTR (氧气透过率) 和 WVTR (水蒸气透过率)",
        "全方位防护：抗光、抗氧化、抗化学渗透",
        "长期存储：确保内容物在有效期内的绝对稳定",
        "结构强韧：尼龙层提供优异的机械强度"
      ],
      specs: [
        { label: "结构", value: "AL / NY / PE 复合" },
        { label: "阻隔性", value: "超低 OTR / WVTR" },
        { label: "防护功能", value: "避光, 防潮, 防氧化" },
        { label: "应用领域", value: "原料药 (API), 高端耗材" }
      ],
      btnText: "获取阻隔数据",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要高阻隔包装方案？"
    },
    en: {
      title: "High Barrier Packaging",
      subtitle: "Ultimate Protection for Sensitive Products",
      description: "Designed for moisture and oxygen-sensitive APIs, intermediates, and high-value consumables. Features a multi-layer composite of Aluminum Foil, Nylon, and PE to provide superior gas and moisture barrier properties.",
      features: [
        "Low Permeability: Excellent OTR and WVTR performance",
        "Full Protection: Light, oxidation, and chemical resistance",
        "Long-term Storage: Ensures stability throughout shelf life",
        "Durability: Nylon layer provides high mechanical strength"
      ],
      specs: [
        { label: "Structure", value: "AL / NY / PE Composite" },
        { label: "Barrier", value: "Ultra-low OTR / WVTR" },
        { label: "Protection", value: "Light/Moisture/Oxidation barrier" },
        { label: "Applications", value: "APIs, High-value Devices" }
      ],
      btnText: "Get Barrier Data",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need high-barrier solutions?"
    },
    image: "https://images.unsplash.com/photo-1624916223253-128c707d8533?auto=format&fit=crop&q=80&w=1200"
  },
  "lidding": {
    zh: {
      title: "EVA 和 TPU 盖膜 (Lidding Films)",
      subtitle: "托盘与泡罩系统的理想封合材料",
      description: "用于医疗器械托盘、诊断耗材泡罩的封合盖膜。EVA 提供宽热封窗口和良好柔韧性，而 TPU 则具备高弹性与耐磨性。支持 Peel (易剥离) 或 Lock (牢固封合) 开启方式。",
      features: [
        "开启方式可选：可定制易剥离或不可剥离配方",
        "灭菌稳定性：灭菌后封合强度保持一致",
        "表面处理：支持印刷及功能性涂层",
        "广泛适配：适用于各种硬吸塑托盘材料"
      ],
      specs: [
        { label: "材料基材", value: "EVA, TPU" },
        { label: "封合类型", value: "Easy Peel / Lock Seal" },
        { label: "灭菌兼容", value: "EO, Gamma" },
        { label: "特性", value: "高透光, 柔韧性好" },
        { label: "应用", value: "吸塑托盘盖膜, 试剂盒" }
      ],
      btnText: "咨询封合方案",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "寻找特定封合材料？"
    },
    en: {
      title: "EVA & TPU Lidding Films",
      subtitle: "Ideal Sealing for Trays and Blisters",
      description: "Lidding materials for medical trays and diagnostic blisters. EVA offers a wide heat-sealing window and flexibility, while TPU provides high elasticity and abrasion resistance. Supports both Peel and Lock opening mechanisms.",
      features: [
        "Opening Mechanism: Customizable Easy Peel or Lock Seal",
        "Sterility: Consistent seal strength after sterilization",
        "Surface: Printable and coating-ready",
        "Compatibility: Fits various rigid blister tray materials"
      ],
      specs: [
        { label: "Base Material", value: "EVA, TPU" },
        { label: "Seal Type", value: "Easy Peel / Lock Seal" },
        { label: "Sterilization", value: "EO, Gamma" },
        { label: "Features", value: "High Clarity, Flexible" },
        { label: "Applications", value: "Blister Trays, Reagent Kits" }
      ],
      btnText: "Seal Solutions",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Looking for lidding materials?"
    },
    image: "https://images.unsplash.com/photo-1583912267550-d44d8319c701?auto=format&fit=crop&q=80&w=1200"
  },

  // === 精密医疗注塑 (原有) ===
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
  },

  // === 生物基与环保材料 ===
  "plant-adhesive": {
    zh: {
      title: "大豆蛋白聚合物系列胶粘剂",
      subtitle: "改性大豆蛋白核心技术",
      description: "大豆蛋白聚合物是一系列从植物中制取的可再生产品，可作为工业涂料和油墨中有效的胶粘剂和增稠剂。可部分或全部地替代酪蛋白、合成聚合乳液等其它类型胶粘剂，粘度调节剂和增稠剂。我们的技术团队很乐意提供配方方面的指导和建议。",
      features: [
        "核心技术：特殊的大豆蛋白改性技术",
        "环保安全：不含有机挥发物，植物基可持续性",
        "性能优越：优异的粘结强度，非热塑耐高温抗粘连，带两性电荷再溶解性好",
        "应用广泛：可用于纸张涂布，水性胶粘剂和油墨，皮革表面处理，乳胶等行业"
      ],
      specs: [
        { label: "外观", value: "近白色或棕色粉体" },
        { label: "水份含量", value: "6%-10%" },
        { label: "包装", value: "20公斤纸袋或1000公斤吨袋" },
        { label: "储存", value: "常温通风干燥" }
      ],
      btnText: "获取样品",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "寻求环保胶黏剂替代方案？"
    },
    en: {
      title: "Plant-based Adhesives",
      subtitle: "Modified Soy Protein Core Technology",
      description: "Bio-based eco-friendly adhesives centered on modified soy protein, replacing traditional petrochemical and formaldehyde-based systems. Formaldehyde-free, Benzene-free, low VOC, with high wet/dry strength.",
      features: [
        "Technology: Protein Modification",
        "Eco-Safety: Formaldehyde-free, Benzene-free",
        "Performance: Excellent wet/dry strength & aging resistance",
        "Versatility: Strong adhesion to paper, wood, composites"
      ],
      specs: [
        { label: "Base", value: "Modified Soy Protein" },
        { label: "Eco Level", value: "No Formaldehyde, Low VOC" },
        { label: "Strength", value: "High Dry/Wet Strength" },
        { label: "Applications", value: "Food/Medical Packaging" }
      ],
      btnText: "Request Samples",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Looking for eco-adhesive alternatives?"
    },
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b1e?auto=format&fit=crop&q=80&w=1200"
  },
  "degradable-coating": {
    zh: {
      title: "纸张表面多功能阻隔涂层系列",
      subtitle: "来自德国希纶赛勒赫化学公司的可定制化的纸张表面处理方案",
      description: "Tops Life代理的德国希纶赛勒赫化学公司的纸张表面处理系列产品，可帮助纸张的表面获得所需的性能，提高纸张的质量，量身定制的涂层结合合适的应用方法，确保了食品蔬菜包装的防水防油屏障，高质量的印刷和工业包装纸品的光泽以及具有防滑保护性的手感涂层表面。同时环境解决方案在希纶赛勒赫化学公司扮演着重要角色。我们的技术团队很乐意提供配方方面的指导和建议。",
      features: [
        "核心技术：德国希纶赛勒赫化学公司是全球生产和开发用于工艺优化的特种化学品的市场领导者",
        "环保安全：相关产品符合FDA, BfR法规要求，不含氟类添加剂，可回收可堆肥环境友好",
        "性能优越：优异的防水防油阻隔性能，热封性能，防滑保护性能，耐高温性能等",
        "应用广泛：可用于食品包装，工业包装，墙纸装饰纸等各类纸张表面处理"
      ],
      specs: [
        { label: "外观", value: "近白色水性聚合物" },
        { label: "固含量", value: "30%-50%" },
        { label: "包装", value: "200公斤塑胶桶或1吨桶装" },
        { label: "储存", value: "常温保存需防冻和避免40度以上高温" }
      ],
      btnText: "了解涂层方案",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要去塑化包装方案？"
    },
    en: {
      title: "Degradable Barrier Coatings",
      subtitle: "Balance of Barrier Performance & Sustainability",
      description: "Functional coatings combining barrier properties with eco-friendliness. Bio-based or degradable formulas provide water, grease, and gas resistance to paper, replacing traditional plastic laminates for full recyclability.",
      features: [
        "Function: Water/Grease/Gas Barrier",
        "Eco-friendly: Bio-based, Compostable",
        "Plastic Replacement: Replaces PE/PP coating",
        "Process: Print-friendly"
      ],
      specs: [
        { label: "Type", value: "Water-based / Bio-based" },
        { label: "Function", value: "Water/Grease Resistance" },
        { label: "End of Life", value: "Recyclable, Compostable" },
        { label: "Applications", value: "Food Packaging, Paper Cups" }
      ],
      btnText: "Coating Solutions",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need plastic-free packaging?"
    },
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?auto=format&fit=crop&q=80&w=1200"
  },
  "eco-paper": {
    zh: {
      title: "其它新材料系列",
      subtitle: "更多创新材料解决方案",
      description: "留空间后续可添加",
      features: [],
      specs: [],
      btnText: "联系我们",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "寻找可持续复合材料？"
    },
    en: {
      title: "Eco Paper-Plastic Composites",
      subtitle: "Plastic Reduction & Recyclability",
      description: "Novel composites balancing strength, barrier, and ecology. Combining paper base with bio-coatings/films to drastically reduce plastic usage, aligning with global green packaging trends.",
      features: [
        "Innovation: Paper base + Bio-layer",
        "Eco: Reduced plastic, Recyclable",
        "Custom: Adjustable barrier properties",
        "Process: Good forming and heat sealing"
      ],
      specs: [
        { label: "Structure", value: "Paper-based Composite" },
        { label: "Feature", value: "Plastic Reduction" },
        { label: "Process", value: "Heat Seal, Forming" },
        { label: "Applications", value: "Medical/Consumer Packaging" }
      ],
      btnText: "Contact Us",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Looking for sustainable composites?"
    },
    image: "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=1200"
  },
  "functional-additives": {
    zh: {
      title: "特种功能助剂",
      subtitle: "材料性能的定制化增强引擎",
      description: "为材料体系提供定制化性能增强的功能性添加剂。涵盖阻隔增强、粘结改性、耐老化等多种类型，精准解决材料性能痛点，提升成品稳定性。",
      features: [
        "功能多样：阻隔、粘结、耐候、表面改性",
        "精准解决：针对特定材料痛点开发",
        "提升品质：增强成品的一致性与稳定性",
        "定制开发：可按应用场景专属配方"
      ],
      specs: [
        { label: "类型", value: "阻隔剂, 增粘剂, 改性剂" },
        { label: "功能", value: "性能增强 (Performance Boosting)" },
        { label: "形态", value: "粉末 / 液体 / 母粒" },
        { label: "服务", value: "定制配方开发" }
      ],
      btnText: "咨询助剂方案",
      specTitle: "技术规格 Technical Specifications",
      backText: "返回产品列表",
      notFound: "产品未找到",
      ctaTitle: "需要改善材料性能？"
    },
    en: {
      title: "Specialty Functional Additives",
      subtitle: "Custom Performance Boosting Engine",
      description: "Functional additives for customized performance enhancement. Covering barrier improvement, adhesion modification, and aging resistance to precisely solve material issues and enhance stability.",
      features: [
        "Versatile: Barrier, Adhesion, Weathering",
        "Precise: Targeted problem solving",
        "Quality: Enhances consistency and stability",
        "Custom: Scene-specific formulation"
      ],
      specs: [
        { label: "Type", value: "Barrier/Adhesion Promoters" },
        { label: "Function", value: "Performance Boosting" },
        { label: "Form", value: "Powder / Liquid / Masterbatch" },
        { label: "Service", value: "Custom Formulation" }
      ],
      btnText: "Consult Additives",
      specTitle: "Technical Specifications",
      backText: "Back to Products",
      notFound: "Product Not Found",
      ctaTitle: "Need to enhance material performance?"
    },
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200"
  }
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const language = i18n.language as 'zh' | 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  
  const productData = id ? PRODUCT_DATABASE[id] : null;
  const content = productData ? productData[language] : null;
  const image = productData ? productData.image : "";

  // 2. 动画逻辑 (内容变化时触发，如切换语言)
  useEffect(() => {
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
  }, [content]);

  // --- SEO Data Preparation ---
  const seoTitle = content ? (language === 'zh' 
    ? `${content.title} | 永爱生命产品详情` 
    : `${content.title} | Tops Life Products`) : "";
  const seoDesc = content ? (content.description.substring(0, 150) + "...") : "";

  // --- SEO: Product Structured Data ---
  const productSchema = React.useMemo(() => {
    if (!content) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": content.title,
      "description": content.description,
      "image": image,
      "brand": {
        "@type": "Brand",
        "name": "TopsLife"
      }
    };
  }, [content, image]);

  // Lightbox Animation & Scroll Lock
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(".lightbox-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(".lightbox-img", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isLightboxOpen]);

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
      <main className="container mx-auto px-6">
        <SEO title={seoTitle} description={seoDesc} />
        {productSchema && (
          <Helmet>
            <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
          </Helmet>
        )}
        
        <Link to="/products" className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors mb-8 group">
          <span className="group-hover:-translate-x-1 transition-transform"><Icons.Back /></span>
          {content.backText}
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="hero-anim relative">
            <div 
              className="md:aspect-[4/3] aspect-square rounded-3xl overflow-hidden shadow-xl bg-white border border-slate-100 group cursor-zoom-in relative"
              onClick={() => setIsLightboxOpen(true)}
            >
              <img 
                src={image} 
                alt={content.title} 
                fetchPriority="high"
                width="800"
                height="600"
                className="w-full h-full md:object-cover object-contain hover:scale-105 transition-transform duration-700" 
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000';
                }}
              />
              {/* Zoom Icon Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                 <div className="bg-white/90 p-4 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg text-slate-800">
                    <ZoomIn size={24} />
                 </div>
              </div>
            </div>
            <div className="absolute -z-10 top-10 -left-10 w-full h-full bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-70"></div>
          </div>

          <div className="hero-anim flex flex-col justify-center">
             <div className="mb-4 text-sky-600 font-bold tracking-widest uppercase text-sm">Product Detail</div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{content.title}</h1>
             <p className="text-lg font-medium text-slate-700 mb-6 border-l-4 border-sky-500 pl-4">{content.subtitle}</p>
             <p className="text-slate-600 leading-relaxed mb-8 text-justify">{content.description}</p>
             
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

          <div className="mt-12 pt-8 text-center">
            <p className="text-slate-500 mb-6">{content.ctaTitle}</p>
            <Link to="/contact">
              <button className="px-10 py-3 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full shadow-lg shadow-sky-600/30 transition-all hover:-translate-y-1">
                {content.btnText}
              </button>
            </Link>
          </div>
        </div>

        {/* Lightbox Overlay */}
        {isLightboxOpen && (
          <div 
            className="lightbox-overlay fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full z-10"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={32} />
            </button>
            <img 
              src={image} 
              alt={content.title} 
              className="lightbox-img max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        )}

      </main>
  );
};

export default ProductDetail;
