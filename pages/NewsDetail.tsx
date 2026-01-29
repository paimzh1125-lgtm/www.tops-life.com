import React, { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Calendar, Tag, Share2, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';

// --- 类型定义 ---
interface NewsSection {
  heading?: string;
  content: string;
  list?: string[];
}

interface NewsContent {
  title: string;
  date: string;
  category: string;
  readTime: string;
  lead: string;
  sections: NewsSection[];
  metaTitle: string;
  metaDesc: string;
}

interface NewsEntry {
  zh: NewsContent;
  en: NewsContent;
  image: string;
  author: string;
}

// --- 新闻数据源 (模拟 CMS 数据) ---
const NEWS_DATABASE: Record<string, NewsEntry> = {
  "ecovadis-silver-2025": {
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b1e?auto=format&fit=crop&q=80&w=2000", // Green/Leaf concept
    author: "TopsLife Corporate",
    zh: {
      title: "迈向绿色未来：TopsLife 荣获 2025 EcoVadis 可持续发展银牌认证",
      date: "2025-01-15",
      category: "企业荣誉",
      readTime: "3 分钟阅读",
      metaTitle: "TopsLife 荣获 EcoVadis 银牌认证 | 可持续发展新闻",
      metaDesc: "TopsLife 在环境、劳工与人权、商业道德及可持续采购方面表现卓越，荣获 2025 EcoVadis 银牌认证，位列全球参评企业前 15%。",
      lead: "近日，苏州永爱生命科技有限公司（TopsLife）在国际权威企业社会责任（CSR）评估机构 EcoVadis 的年度评审中，凭借在环境管理、劳工与人权、商业道德及可持续采购四大维度的杰出表现，成功斩获“银牌”认证。",
      sections: [
        {
          heading: "背景与挑战",
          content: "在全球医疗供应链中，可持续发展已不再是可选项，而是衡量企业长期竞争力的核心指标。随着 ESG 标准的日益严格，全球顶尖的制药公司与医疗器械巨头对供应商的考核已从单纯的“质量与成本”延伸至“社会责任与碳足迹”。如何在保持高标准洁净制造的同时，降低能源消耗并保障员工福祉，是我们面临的重要课题。"
        },
        {
          heading: "行动与表现",
          content: "TopsLife 成立了专门的可持续发展委员会，制定了明确的“绿色制造 2030”路线图。在本次 EcoVadis 评估中，我们采取了多项关键举措：",
          list: [
            "环境维度：全面升级生产线废气处理系统，引入光伏发电辅助供能，显著降低了单位产品的碳排放。",
            "劳工与人权：完善了员工健康安全管理体系（ISO 45001 对标），确保每一位员工在安全、尊重的环境中工作。",
            "可持续采购：建立了严格的供应商准入机制，优先选择具备环保认证的原材料供应商（如 FSC 认证纸张、生物基树脂）。"
          ]
        },
        {
          heading: "未来展望",
          content: "获得 EcoVadis 银牌认证不仅是一份荣誉，更是一份责任。TopsLife 总经理表示：“这只是我们可持续发展旅程的起点。未来，我们将继续加大在生物基材料研发（如大豆蛋白聚合物）上的投入，致力于为客户提供‘零碳’医疗包装解决方案。”"
        }
      ]
    },
    en: {
      title: "Towards a Green Future: TopsLife Awarded 2025 EcoVadis Silver Medal",
      date: "Jan 15, 2025",
      category: "Corporate Honor",
      readTime: "3 min read",
      metaTitle: "TopsLife Awarded EcoVadis Silver Medal | Sustainability News",
      metaDesc: "TopsLife awarded the 2025 EcoVadis Silver Medal for Sustainability, ranking in the top 15% globally. Highlighting excellence in Environment, Labor & Ethics.",
      lead: "Suzhou Tops Life Technology (TopsLife) has been awarded the prestigious Silver Medal by EcoVadis, the world’s most trusted provider of business sustainability ratings. This recognition places TopsLife in the top 15% of companies assessed globally.",
      sections: [
        {
          heading: "Background & Challenge",
          content: "In the global medical supply chain, sustainability is no longer optional but a core metric of long-term competitiveness. With increasingly stringent ESG standards, top pharmaceutical and medical device companies are expanding their supplier assessments beyond 'Quality and Cost' to include 'Social Responsibility and Carbon Footprint'."
        },
        {
          heading: "Solution & Action",
          content: "TopsLife established a dedicated Sustainability Committee and defined a clear 'Green Manufacturing 2030' roadmap. Key initiatives evaluated during this EcoVadis assessment include:",
          list: [
            "Environment: Upgraded exhaust treatment systems and introduced photovoltaic power generation.",
            "Labor & Human Rights: Enhanced our Occupational Health and Safety management system (benchmarked against ISO 45001).",
            "Sustainable Procurement: Implemented strict supplier admission criteria, prioritizing raw material suppliers with environmental certifications."
          ]
        },
        {
          heading: "Outlook",
          content: "Receiving the EcoVadis Silver Medal is not just an honor, but a responsibility. We will increase investment in bio-based material R&D, aiming to provide 'Net-Zero' medical packaging solutions."
        }
      ]
    }
  },
  "3-layer-sterile-bag": {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=2000", // Medical/Plastic
    author: "R&D Department",
    zh: {
      title: "实验室无菌操作新标准：成功开发三层结构易揭自封袋",
      date: "2024-12-10",
      category: "产品研发",
      readTime: "4 分钟阅读",
      metaTitle: "TopsLife 发布三层易揭自封袋 | 医疗包装创新",
      metaDesc: "针对细胞培养瓶开包后存放痛点，TopsLife 推出创新型三层结构易揭自封袋，解决二次污染问题，提升实验室无菌操作效率。",
      lead: "针对生命科学实验室中细胞培养耗材“开包难、存更难”的痛点，TopsLife 研发团队于近日成功推出创新型“三层结构易揭自封袋”。该产品通过独特的材料配方与结构设计，完美解决了细胞培养瓶在拆封后的二次存储与污染防护问题。",
      sections: [
        {
          heading: "痛点分析",
          content: "在细胞生物学研究中，培养瓶通常多只一组包装。一旦剪开传统包装袋，剩余的培养瓶便暴露在非无菌环境中，极易遭受微生物污染。此外，传统热封袋在佩戴手套操作时难以徒手撕开，常需借助剪刀，增加了引入污染源的风险。"
        },
        {
          heading: "技术亮点",
          content: "TopsLife 研发中心历时 6 个月，开发出这款专用的三层共挤易揭自封袋：",
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
      title: "New Standard in Sterile Lab Operations: 3-Layer Easy-Peel Self-Sealing Bag",
      date: "Dec 10, 2024",
      category: "Product R&D",
      readTime: "4 min read",
      metaTitle: "TopsLife Launches 3-Layer Easy-Peel Sterile Bag | Innovation",
      metaDesc: "Solving the pain point of secondary storage for cell culture flasks. TopsLife introduces the innovative 3-layer easy-peel self-sealing bag to prevent contamination.",
      lead: "Addressing the critical pain points of 'difficult opening and unsafe storage' for cell culture consumables, TopsLife's R&D team has successfully launched the innovative '3-Layer Easy-Peel Self-Sealing Bag'.",
      sections: [
        {
          heading: "Pain Point Analysis",
          content: "Once traditional bags are cut open, remaining flasks are exposed to non-sterile environments. Furthermore, traditional heat-sealed bags are difficult to open manually while wearing gloves, often requiring scissors which introduce contamination."
        },
        {
          heading: "Technical Highlights",
          content: "After 6 months of development, TopsLife introduced this specialized 3-layer co-extruded bag:",
          list: [
            "3-Layer Composite: PET for strength, AL/NY for barrier, PE for clean contact.",
            "Easy-Peel Technology: Special sealant formulation allows smooth peeling with one hand, eliminating scissors and particles.",
            "Integrated Zipper: Features a high-seal zipper to immediately reseal the package, providing a continuous barrier."
          ]
        },
        {
          heading: "Customer Value",
          content: "This product significantly enhances the convenience and safety of laboratory operations. For high-value scenarios like stem cell culture, it translates to lower contamination risks."
        }
      ]
    }
  },
  "cleanroom-expansion": {
    image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=2000", // Cleanroom/Lab
    author: "Operations Team",
    zh: {
      title: "产能与品质双重飞跃：完成 ISO Class 7 洁净车间升级扩建",
      date: "2023-11-20",
      category: "产能升级",
      readTime: "3 分钟阅读",
      metaTitle: "TopsLife 完成万级洁净车间扩建 | 产能升级",
      metaDesc: "TopsLife 宣布完成 ISO Class 7 (万级) 洁净车间升级。引入智能化环境监控系统，大幅提升高端医疗器械与无菌包装的生产产能。",
      lead: "为满足全球市场对高端医疗器械及无菌包装日益增长的需求，TopsLife 宣布已于 2023 年底全面完成 ISO Class 7（万级）洁净车间的升级与扩建工程。此次升级不仅使洁净生产面积增加了 50%，更引入了智能化环境监控系统。",
      sections: [
        {
          heading: "升级背景",
          content: "随着 TopsLife 在微流控芯片及高端医用薄膜业务上的快速增长，原有的生产产能已趋于饱和。同时，国际客户对医疗器械生产环境的微粒控制提出了更为严苛的要求。"
        },
        {
          heading: "技术细节",
          content: "本次扩建工程严格遵循 ISO 14644-1 标准进行设计与施工：",
          list: [
            "HVAC 系统升级：引入了全新的独立空气净化循环系统，换气次数提升至 ≥25 次/小时。",
            "智能化环境监控：安装了 24 小时在线粒子计数器与温湿度监控探头，数据实时上传至中央控制系统 (SCADA)。",
            "人流物流分流：重新规划了更科学的人员更衣通道与物料传递窗，最大限度减少交叉污染风险。"
          ]
        },
        {
          heading: "未来展望",
          content: "全新的洁净车间已通过第三方权威机构检测并投入使用。这标志着 TopsLife 的制造硬件水平已达到国际一流水准，我们将以此为契机，承接更多高标准的 CDMO 订单。"
        }
      ]
    },
    en: {
      title: "Capacity & Quality Leap: ISO Class 7 Cleanroom Expansion Completed",
      date: "Nov 20, 2023",
      category: "Capacity Upgrade",
      readTime: "3 min read",
      metaTitle: "TopsLife Completes ISO Class 7 Cleanroom Expansion",
      metaDesc: "TopsLife announces the completion of its ISO Class 7 cleanroom upgrade. Enhanced HVAC and monitoring systems ensure superior quality for medical manufacturing.",
      lead: "To meet the growing global demand for high-end medical devices, TopsLife announced the completion of its ISO Class 7 cleanroom upgrade. This project increased clean production area by 50% and introduced intelligent environmental monitoring systems.",
      sections: [
        {
          heading: "Background",
          content: "With rapid growth in microfluidic chips and medical films, existing capacity was approaching saturation. International clients have also imposed stricter requirements on particle control."
        },
        {
          heading: "Technical Details",
          content: "The expansion followed strict ISO 14644-1 standards:",
          list: [
            "HVAC Upgrade: New air purification system increasing air change rates to ≥25 times/hour.",
            "Intelligent Monitoring: 24/7 online particle counters and sensors connected to SCADA for real-time control.",
            "Flow Separation: Redesigned personnel and material flows to minimize cross-contamination risks."
          ]
        },
        {
          heading: "Outlook",
          content: "The new cleanroom has passed third-party validation. This milestone signifies that TopsLife's infrastructure has reached a world-class level, positioning us to undertake complex CDMO projects."
        }
      ]
    }
  }
};

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const language = i18n.language as 'zh' | 'en';
  const containerRef = useRef<HTMLDivElement>(null);

  const newsItem = id ? NEWS_DATABASE[id] : null;
  const content = newsItem ? newsItem[language] : null;

  // 动画效果
  useEffect(() => {
    if (!content) return;
    const ctx = gsap.context(() => {
      gsap.from(".news-hero-img", { scale: 1.1, opacity: 0, duration: 1.2, ease: "power2.out" });
      gsap.from(".news-header", { y: 30, opacity: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
      gsap.from(".news-body > div", { 
        y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" 
      });
    }, containerRef);
    return () => ctx.revert();
  }, [content]);

  if (!content || !newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">{t('newsDetail.notFound')}</h2>
        <Link to="/news" className="text-sky-600 hover:underline flex items-center gap-2">
          <ArrowLeft size={20} /> {t('newsDetail.back')}
        </Link>
      </div>
    );
  }

  return (
    <main ref={containerRef} className="bg-white min-h-screen pb-20">
      <SEO title={content.metaTitle} description={content.metaDesc} />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden bg-slate-900">
        <img 
          src={newsItem.image} 
          alt={content.title}
          className="news-hero-img w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-4xl news-header">
            <Link to="/news" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
              <ArrowLeft size={20} />
              <span>{t('newsDetail.back')}</span>
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-sky-400 mb-4">
              <span className="bg-sky-500/20 px-3 py-1 rounded-full border border-sky-500/30 backdrop-blur-sm flex items-center gap-2">
                <Tag size={14} /> {content.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Calendar size={14} /> {content.date}
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock size={14} /> {content.readTime}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              {content.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <article className="container mx-auto px-6 max-w-4xl -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 news-body">
          
          {/* Lead Paragraph */}
          <div className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-10 border-l-4 border-sky-500 pl-6">
            {content.lead}
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {content.sections.map((section, idx) => (
              <div key={idx}>
                {section.heading && (
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    {section.heading}
                  </h2>
                )}
                <p className="text-slate-600 leading-8 text-lg mb-4 text-justify">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="space-y-3 bg-slate-50 p-6 rounded-xl border border-slate-100">
                    {section.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Footer / Share */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
            <div className="text-slate-500 text-sm">
              {language === 'zh' ? '发布于：' : 'Posted by: '} 
              <span className="font-semibold text-slate-700">{newsItem.author}</span>
            </div>
            <button className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors">
              <Share2 size={18} />
              <span className="text-sm font-medium">{t('newsDetail.share')}</span>
            </button>
          </div>

        </div>
      </article>
    </main>
  );
};

export default NewsDetail;