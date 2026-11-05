// --- 类型定义 ---
export interface NewsSection {
  heading?: string;
  content: string;
  list?: string[];
  /** Optional inline image for this section (supports multilingual paths) */
  image?: {
    zh: string;
    en: string;
    altZh?: string;
    altEn?: string;
  };
}

export interface NewsContent {
  title: string;
  date: string;
  category: string;
  readTime: string;
  lead: string;
  sections: NewsSection[];
  metaTitle: string;
  metaDesc: string;
}

export interface NewsEntry {
  zh: NewsContent;
  en: NewsContent;
  image?: string;
  imageEn?: string;
  author: string;
}

// --- 新闻列表数据 (用于列表页展示) ---
export const ALL_NEWS = [
  {
    id: 4,
    slug: "pe-tubular-film-2026",
    year: "2026",
    dateLabel_zh: "10月",
    dateLabel_en: "Oct",
    tag_zh: "产品发布",
    tag_en: "Product Launch",
    title_zh: "15mm 超窄 PE 筒膜：专攻微导管导丝内包装痛点",
    title_en: "15mm Precision PE Tubular Film: Mitigating Packaging Challenges for Microcatheters",
    desc_zh: "针对细长器械包装偏大、规格难匹配的痛点，提供最小 15mm 超窄幅 PE 筒膜；厚度可达 50μm，洁净室生产，宽度 / 厚度 / 材料可定制。",
    desc_en: "Engineered for slender devices: ultra-narrow PE tubular film from 15mm; 50μm thin, cleanroom-produced, and fully customizable for precision fit.",
    category: "Products"
  },
  { 
    id: 1,
    slug: "ecovadis-silver-2025",
    year: "2025", 
    dateLabel_zh: "01月", 
    dateLabel_en: "Jan",
    tag_zh: "可持续发展", 
    tag_en: "Sustainability",
    title_zh: "荣获法国 EcoVadis 可持续发展银牌认证", 
    title_en: "Achieved EcoVadis Sustainability Silver Rating",
    desc_zh: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
    desc_en: "Internationally recognized for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement — a solid step forward in our CSR journey.",
    category: "Corporate"
  },
  { 
    id: 2,
    slug: "3-layer-sterile-bag",
    year: "2024", 
    dateLabel_zh: "年度创新", 
    dateLabel_en: "Innovation",
    tag_zh: "产品研发", 
    tag_en: "R&D",
    title_zh: "成功开发三层易揭自封袋", 
    title_en: "Developed 3-Layer Easy-Peel Self-Sealing Bag",
    desc_zh: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
    desc_en: "An innovative 3-layer easy-peel self-sealing bag that solves secondary contamination and boosts the safety and convenience of sterile lab operations.",
    category: "Products"
  },
  { 
    id: 3,
    slug: "cleanroom-expansion",
    year: "2023", 
    dateLabel_zh: "年度基建", 
    dateLabel_en: "Expansion",
    tag_zh: "产能升级", 
    tag_en: "Upgrade",
    title_zh: "升级扩建 ISO Class 7 洁净室", 
    title_en: "Upgraded to ISO Class 7 Cleanroom",
    desc_zh: "完成万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
    desc_en: "Complete upgrade and expansion of our ISO Class 7 cleanroom, adding advanced air-purification and environmental-monitoring systems for stricter high-end medical device production.",
    category: "Corporate"
  }
];

// --- 新闻数据源 ---
export const NEWS_DATABASE: Record<string, NewsEntry> = {
  "pe-tubular-film-2026": {
    author: "Tops Life Product Marketing",
    zh: {
      title: "洁净 · 无菌软包装：15mm 超窄 PE 筒膜，专用于导管导丝内包装",
      date: "2026-10-29",
      category: "产品发布",
      readTime: "3 分钟阅读",
      metaTitle: "Tops Life 15mm 超窄 PE 筒膜 | 导管导丝内包装",
      metaDesc: "Tops Life 推出最小宽度 15mm 的超窄 PE 筒膜，厚度可达 50μm，洁净室生产，解决微导管等细长器械包装偏大、规格难匹配的痛点，支持宽度 / 厚度 / 材料定制与小批量协商。",
      lead: "微导管、导丝等细长器械对包装贴合度要求高，过宽的筒膜影响穿套效率并浪费材料，而窄幅规格市场供给有限。Tops Life 最小宽度 15mm 的超窄 PE 筒膜，为导管导丝内包装提供更贴合、更可靠的窄幅方案。",
      sections: [
        {
          heading: "行业痛点",
          content: "细长器械贴合度要求高：筒膜过宽影响穿套效率与外观，也造成材料浪费；而窄幅标准品市场稀缺，客户难以匹配合适规格。"
        },
        {
          heading: "产品亮点",
          content: "Tops Life 超窄 PE 筒膜在宽度、厚度与交付上形成差异化优势：",
          list: [
            "最小 15mm：明确的市场差异化宽度",
            "薄膜柔韧：膜厚可达 50μm，贴合紧密",
            "洁净室生产：适配导管、导丝及介入器械无菌包装",
            "灵活定制：宽度 / 厚度 / 材料可定制，小批量可协商，交期可控"
          ],
          image: {
            zh: "/images/PE-film-zh.jpg",
            en: "/images/PE-film-en.png",
            altZh: "15mm 超窄 PE 筒膜产品外观与结构",
            altEn: "15mm Precision PE Tubular Film — product appearance and structure"
          }
        },
        {
          heading: "规格参考",
          content: "常规宽度规格如下（厚度可按需定制）：",
          list: [
            "宽度 15mm｜公差 ±1mm｜任意点允差 10%",
            "宽度 20mm｜公差 ±1mm｜任意点允差 10%",
            "宽度 30mm｜公差 ±1mm｜任意点允差 10%"
          ]
        },
        {
          heading: "质量与合规",
          content: "生产与体系对标医疗器械供应链要求：",
          list: [
            "Class 7 洁净室生产",
            "ISO 9001 已认证",
            "ISO 13485 已认证"
          ]
        },
        {
          heading: "现在就改变包装选择",
          content: "需要更贴合的导管导丝内包装方案？欢迎联系我们索取样品或讨论定制规格。"
        }
      ]
    },
    en: {
      title: "Clean, Sterile Flexible Packaging: 15mm Precision PE Tubular Film for Catheter & Guidewire Inner Packaging",
      date: "Oct 29, 2026",
      category: "Product Launch",
      readTime: "3 min read",
      metaTitle: "Tops Life 15mm PE Film | Catheter & Guidewire Packaging",
      metaDesc: "Tops Life's precision PE film (from 15mm width, 50μm thickness) provides superior fit for microcatheters. Cleanroom-manufactured with flexible customization.",
      lead: "Slender medical devices demand precise packaging fit. Standard narrow-width films are often scarce, impacting sleeving efficiency. Tops Life's 15mm Precision PE Tubular Film offers a reliable, close-fitting solution tailored for catheter and guidewire integrity.",
      sections: [
        {
          heading: "The Challenge",
          content: "Micro-scale devices require optimized packaging. Oversized film creates material waste and hinders assembly speed, while the lack of standardized narrow-width supply forces compromises in device protection."
        },
        {
          heading: "Key Advantages",
          content: "Precision PE Tubular Film delivers technical differentiation in dimension, barrier properties, and manufacturing flexibility:",
          list: [
            "Market-leading narrow width: Starting at 15mm.",
            "Superior material gauge: Down to 50μm for enhanced fit.",
            "Certified cleanroom production: Standardized for sterile interventional device packaging.",
            "Agile customization: Tailored dimensions and flexible MOQ options to match your production cycle."
          ],
          image: {
            zh: "/images/PE-film-zh.jpg",
            en: "/images/PE-film-en.png",
            altZh: "15mm 超窄 PE 筒膜产品外观与结构",
            altEn: "15mm Precision PE Tubular Film — technical structure and profile"
          }
        },
        {
          heading: "Specification Reference",
          content: "Standard widths are listed below (thickness tailored to your requirements):",
          list: [
            "Width 15mm | Tolerance ±1mm | Thickness tolerance ±10% at any point",
            "Width 20mm | Tolerance ±1mm | Thickness tolerance ±10% at any point",
            "Width 30mm | Tolerance ±1mm | Thickness tolerance ±10% at any point"
          ]
        },
        {
          heading: "Quality & Compliance",
          content: "Manufacturing and quality systems aligned with medical-device supply-chain standards:",
          list: [
            "Class 7 cleanroom manufacturing",
            "ISO 9001 certified",
            "ISO 13485 certified"
          ]
        },
        {
          heading: "Time to Make a Change",
          content: "Need closer-fitting inner packaging for catheters and guidewires? Contact us for samples or a tailored specification."
        }
      ]
    }
  },
  "ecovadis-silver-2025": {
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b1e?auto=format&fit=crop&q=80&w=2000",
    author: "Tops Life Corporate",
    zh: {
      title: "迈向绿色未来：Tops Life 荣获 2025 EcoVadis 可持续发展银牌认证",
      date: "2025-01-15",
      category: "企业荣誉",
      readTime: "3 分钟阅读",
      metaTitle: "Tops Life 荣获 EcoVadis 银牌认证 | 可持续发展新闻",
      metaDesc: "Tops Life 在环境、劳工与人权、商业道德及可持续采购方面表现卓越，荣获 2025 EcoVadis 银牌认证，位列全球参评企业前 15%。",
      lead: "近日，苏州永爱生命科技有限公司（Tops Life）在国际权威企业社会责任（CSR）评估机构 EcoVadis 的年度评审中，凭借在环境管理、劳工与人权、商业道德及可持续采购四大维度的杰出表现，成功斩获“银牌”认证。",
      sections: [
        {
          heading: "背景与挑战",
          content: "在全球医疗供应链中，可持续发展已不再是可选项，而是衡量企业长期竞争力的核心指标。随着 ESG 标准的日益严格，全球顶尖的制药公司与医疗器械巨头对供应商的考核已从单纯的“质量与成本”延伸至“社会责任与碳足迹”。如何在保持高标准洁净制造的同时，降低能源消耗并保障员工福祉，是我们面临的重要课题。"
        },
        {
          heading: "行动与表现",
          content: "Tops Life 成立了专门的可持续发展委员会，制定了明确的“绿色制造 2030”路线图。在本次 EcoVadis 评估中，我们采取了多项关键举措：",
          list: [
            "环境维度：全面升级生产线废气处理系统，引入光伏发电辅助供能，显著降低了单位产品的碳排放。",
            "劳工与人权：完善了员工健康安全管理体系（ISO 45001 对标），确保每一位员工在安全、尊重的环境中工作。",
            "可持续采购：建立了严格的供应商准入机制，优先选择具备环保认证的原材料供应商（如 FSC 认证纸张、生物基树脂）。"
          ]
        },
        {
          heading: "未来展望",
          content: "获得 EcoVadis 银牌认证不仅是一份荣誉，更是一份责任。Tops Life 总经理表示：“这只是我们可持续发展旅程的起点。未来，我们将继续加大在生物基材料研发（如大豆蛋白聚合物）上的投入，致力于为客户提供‘零碳’医疗包装解决方案。”"
        }
      ]
    },
    en: {
      title: "Advancing Sustainability: Tops Life Awarded 2025 EcoVadis Silver Medal",
      date: "Jan 15, 2025",
      category: "Corporate Honor",
      readTime: "3 min read",
      metaTitle: "Tops Life Awarded EcoVadis Silver Medal | Sustainability in Medical Packaging",
      metaDesc: "Tops Life earns the 2025 EcoVadis Silver Medal, ranking among the top 15% of global firms for excellence in Environmental, Social, and Ethical standards.",
      lead: "Suzhou Tops Life Technology (Tops Life) has been awarded the Silver Medal by EcoVadis, underscoring our commitment to high-standard corporate social responsibility (CSR) across the global medical supply chain.",
      sections: [
        {
          heading: "Strategic Context",
          content: "Sustainability is now a core competitiveness metric in the global medical supply chain. As ESG standards evolve, pharmaceutical and device leaders prioritize suppliers that demonstrate low-carbon footprints and transparent social governance. Balancing cleanroom manufacturing precision with resource efficiency remains our primary operational imperative."
        },
        {
          heading: "Key Initiatives",
          content: "Under our 'Green Manufacturing 2030' roadmap, Tops Life has implemented several high-impact sustainability measures:",
          list: [
            "Environmental Stewardship: Optimized exhaust treatment and solar integration to significantly reduce unit-product carbon emissions.",
            "Governance & Human Rights: Aligned safety management with ISO 45001 standards, fostering a secure and inclusive workplace.",
            "Sustainable Procurement: Mandated rigorous supplier admission criteria, prioritizing eco-certified materials such as bio-based resins."
          ]
        },
        {
          heading: "Future Commitment",
          content: "The EcoVadis Silver Medal validates our current trajectory. Tops Life remains dedicated to investing in bio-polymer R&D, striving to deliver net-zero medical packaging solutions for our global partners."
        }
      ]
    }
  },
  "3-layer-sterile-bag": {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2000",
    author: "R&D Department",
    zh: {
      title: "实验室无菌操作新标准：成功开发三层结构易揭自封袋",
      date: "2024-12-10",
      category: "产品研发",
      readTime: "4 分钟阅读",
      metaTitle: "Tops Life 发布三层易揭自封袋 | 医疗包装创新",
      metaDesc: "针对细胞培养瓶开包后存放痛点，Tops Life 推出创新型三层结构易揭自封袋，解决二次污染问题，提升实验室无菌操作效率。",
      lead: "针对生命科学实验室中细胞培养耗材“开包难、存更难”的痛点，Tops Life 研发团队于近日成功推出创新型“三层结构易揭自封袋”。该产品通过独特的材料配方与结构设计，完美解决了细胞培养瓶在拆封后的二次存储与污染防护问题。",
      sections: [
        {
          heading: "痛点分析",
          content: "在细胞生物学研究中，培养瓶通常多只一组包装。一旦剪开传统包装袋，剩余的培养瓶便暴露在非无菌环境中，极易遭受微生物污染。此外，传统热封袋在佩戴手套操作时难以徒手撕开，常需借助剪刀，增加了引入污染源的风险。"
        },
        {
          heading: "技术亮点",
          content: "Tops Life 研发中心历时 6 个月，开发出这款专用的三层共挤易揭自封袋：",
          list: [
            "三层复合结构：外层 PET 提供高强度物理保护，中间层 AL/NY 提供优异的阻隔性，内层 PE 确保洁净接触。",
            "Easy-Peel 易揭技术：采用特殊的密封胶配方，实验人员单手即可平滑剥离，无需剪刀，杜绝微粒产生。",
            "自封条设计 (Zipper)：袋口内置高密封性自封条，可立即重新密封包装，为剩余产品提供持续的洁净屏障。"
          ]
        },
        {
          heading: "客户价值",
          content: "这款产品的推出，极大提升了实验室操作的便利性与安全性。对于高价值的干细胞培养或疫苗研发场景，它意味着更低的污染风险和更少的耗材浪费。"
        }
      ]
    },
    en: {
      title: "New Standards in Lab Sterility: 3-Layer Easy-Peel Self-Sealing Bag",
      date: "Dec 10, 2024",
      category: "Product R&D",
      readTime: "4 min read",
      metaTitle: "Tops Life 3-Layer Easy-Peel Sterile Bag | Medical Packaging Innovation",
      metaDesc: "Tops Life launches an innovative 3-layer easy-peel bag, specifically engineered to mitigate secondary contamination and enhance sterile efficiency for cell culture consumables.",
      lead: "To address the storage challenges of sensitive cell culture consumables, the Tops Life R&D team has engineered a 3-layer, Easy-Peel Self-Sealing Bag. This solution optimizes post-opening storage and provides robust contamination protection.",
      sections: [
        {
          heading: "Challenge Analysis",
          content: "Group-packaged cell culture flasks often suffer from exposure-induced contamination once the original bag is opened. Furthermore, conventional heat-sealed packaging frequently requires scissors for access, introducing potential particle contamination into the sterile environment."
        },
        {
          heading: "Technical Innovation",
          content: "Developed over a six-month cycle, this purpose-built 3-layer co-extruded solution provides:",
          list: [
            "Composite Structure: PET exterior for physical durability; AL/NY middle layer for advanced barrier performance; PE interior for clean, sterile contact.",
            "Easy-Peel Technology: Proprietary sealant formulation enables smooth, one-handed opening without particle generation.",
            "Integrated Resealing: Advanced zipper design allows for immediate, high-integrity resealing, maintaining sterile barriers for remaining stock."
          ]
        },
        {
          heading: "Value Proposition",
          content: "This innovation significantly elevates operational efficiency and safety. For high-value applications in stem cell culture and vaccine development, it minimizes contamination risks and reduces consumable waste."
        }
      ]
    }
  },
  "cleanroom-expansion": {
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2000",
    author: "Operations Team",
    zh: {
      title: "产能与品质双重飞跃：完成 ISO Class 7 洁净车间升级扩建",
      date: "2023-11-20",
      category: "产能升级",
      readTime: "3 分钟阅读",
      metaTitle: "Tops Life 完成万级洁净车间扩建 | 产能升级",
      metaDesc: "Tops Life 宣布完成 ISO Class 7 (万级) 洁净车间升级。引入智能化环境监控系统，大幅提升高端医疗器械与无菌包装的生产产能。",
      lead: "为满足全球市场对高端医疗器械及无菌包装日益增长的需求，Tops Life 宣布已于 2023 年底全面完成 ISO Class 7（万级）洁净车间的升级与扩建工程。此次升级不仅使洁净生产面积增加了 50%，更引入了智能化环境监控系统。",
      sections: [
        {
          heading: "升级背景",
          content: "随着 Tops Life 在微流控芯片及高端医用薄膜业务上的快速增长，原有的生产产能已趋于饱和。同时，国际客户对医疗器械生产环境的微粒控制提出了更为严苛的要求。"
        },
        {
          heading: "技术细节",
          content: "本次扩建工程严格遵循 ISO 9001 标准进行设计与施工：",
          list: [
            "HVAC 系统升级：引入了全新的独立空气净化循环系统，换气次数提升至 ≥25 次/小时。",
            "智能化环境监控：安装了 24 小时在线粒子计数器与温湿度监控探头，数据实时上传至中央控制系统 (SCADA)。",
            "人流物流分流：重新规划了更科学的人员更衣通道与物料传递窗，最大限度减少交叉污染风险。"
          ]
        },
        {
          heading: "未来展望",
          content: "全新的洁净车间已通过第三方权威机构检测并投入使用。这标志着 Tops Life 的制造硬件水平已达到国际一流水准，我们将以此为契机，承接更多高标准的 CDMO 订单。"
        }
      ]
    },
    en: {
      title: "A Dual Leap in Capacity and Quality: ISO Class 7 Cleanroom Expansion Completed",
      date: "Nov 20, 2023",
      category: "Capacity Upgrade",
      readTime: "3 min read",
      metaTitle: "Tops Life Completes ISO Class 7 Cleanroom Expansion | Capacity Upgrade",
      metaDesc: "Tops Life announces the completion of its ISO Class 7 cleanroom upgrade, featuring intelligent environmental monitoring to significantly boost capacity for high-end medical devices and sterile packaging.",
      lead: "To meet growing global demand for high-end medical devices and sterile packaging, Tops Life has fully completed the upgrade and expansion of its ISO Class 7 cleanroom by the end of 2023. The project increased clean production area by 50% and introduced an intelligent environmental monitoring system.",
      sections: [
        {
          heading: "Background",
          content: "With rapid growth in microfluidic chips and high-end medical films, existing production capacity was nearing saturation. At the same time, international clients have imposed increasingly stringent requirements on particle control in medical-device manufacturing environments."
        },
        {
          heading: "Technical Details",
          content: "The expansion was designed and built in strict accordance with ISO standards:",
          list: [
            "HVAC Upgrade: A new, independent air-purification circulation system raises air-change rates to ≥25 per hour.",
            "Intelligent Monitoring: Round-the-clock online particle counters and temperature/humidity sensors stream data in real time to the central SCADA system.",
            "Flow Separation: Personnel gowning routes and material pass-through windows were scientifically redesigned to minimize cross-contamination risk."
          ]
        },
        {
          heading: "Outlook",
          content: "The new cleanroom has passed third-party authoritative validation and is now in operation. This milestone marks Tops Life's manufacturing infrastructure as world-class, positioning us to undertake more high-standard CDMO projects."
        }
      ]
    }
  }
};
