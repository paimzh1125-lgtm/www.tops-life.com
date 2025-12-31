import React from 'react';
import { Leaf, Zap, Building2, Award } from 'lucide-react';

export type CategoryType = 'All' | 'Corporate' | 'Products' | 'Events';

export interface NewsItem {
  id: number;
  year: string;
  dateLabel_zh: string;
  dateLabel_en: string;
  tag_zh: string;
  tag_en: string;
  title_zh: string;
  title_en: string;
  desc_zh: string;
  desc_en: string;
  category: CategoryType;
  isHighlight?: boolean;
  icon: React.ReactNode;
}

export const ALL_NEWS: NewsItem[] = [
  { 
    id: 1,
    year: "2025", 
    dateLabel_zh: "01月", 
    dateLabel_en: "Jan",
    tag_zh: "可持续发展", 
    tag_en: "Sustainability",
    title_zh: "荣获法国 EcoVadis 可持续发展银牌认证", 
    title_en: "Achieved EcoVadis Sustainability Silver Rating",
    desc_zh: "永爱在环境、劳工与人权、商业道德及可持续采购等方面的卓越表现获得国际认可，标志着我们在企业社会责任（CSR）领域迈出了坚实一步。",
    desc_en: "Recognized internationally for excellence in Environment, Labor & Human Rights, Ethics, and Sustainable Procurement. A solid step forward in our CSR journey.",
    icon: <Leaf className="w-4 h-4" />, 
    isHighlight: true,
    category: "Corporate"
  },
  { 
    id: 2,
    year: "2024", 
    dateLabel_zh: "年度创新", 
    dateLabel_en: "Innovation",
    tag_zh: "产品研发", 
    tag_en: "R&D",
    title_zh: "成功开发三层易揭自封袋", 
    title_en: "Developed 3-Layer Easy-Peel Self-Sealing Bag",
    desc_zh: "针对细胞培养瓶开包后的存放痛点，我们研发出创新的三层结构易揭自封袋。该产品有效解决了二次污染问题，极大提升了实验室无菌操作的便利性与安全性。",
    desc_en: "Innovatively solved storage and contamination issues for cell culture flasks. This product significantly improves safety and convenience in sterile labs.",
    icon: <Zap className="w-4 h-4" />,
    category: "Products"
  },
  { 
    id: 3,
    year: "2023", 
    dateLabel_zh: "年度基建", 
    dateLabel_en: "Expansion",
    tag_zh: "产能升级", 
    tag_en: "Upgrade",
    title_zh: "升级扩建 ISO Class 7 洁净室", 
    title_en: "Upgraded to ISO Class 7 Cleanroom",
    desc_zh: "完成十万级（ISO Class 7）洁净车间的全面升级与扩建。此次升级引入了更先进的空气净化系统与环境监控设备，为高端医疗器械生产提供了更严苛的洁净环境保障。",
    desc_en: "Completed the expansion of our ISO Class 7 cleanroom. Introduced advanced air purification systems to ensure the strictest production environment.",
    icon: <Building2 className="w-4 h-4" />,
    category: "Corporate"
  },
  { 
    id: 4,
    year: "2019", 
    dateLabel_zh: "03月", 
    dateLabel_en: "Mar",
    tag_zh: "质量体系", 
    tag_en: "Quality",
    title_zh: "取得 ISO 13485 & 9001 双重认证", 
    title_en: "Obtained ISO 13485 & 9001 Certificates",
    desc_zh: "质量管理体系正式通过国际标准认证。这不仅是对我们生产管理水平的认可，更意味着我们的产品获得了进入全球医疗供应链的“通行证”。",
    desc_en: "Officially certified by international quality standards. This accreditation serves as a global passport for our products to enter the medical supply chain.",
    icon: <Award className="w-4 h-4" />,
    category: "Corporate"
  }
];