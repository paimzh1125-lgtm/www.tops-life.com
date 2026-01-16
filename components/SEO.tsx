import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image }) => {
  const location = useLocation();
  
  // 1. 检测子域名 (Subdomain Detection)
  const isCn = typeof window !== 'undefined' && window.location.hostname.includes('cn.');
  const siteUrl = isCn ? 'https://cn.tops-life.com' : 'https://www.tops-life.com';

  // 2. 设置默认 Meta 信息
  const defaultTitle = isCn ? "医用软包装专家 | 苏州永爱" : "Medical Packaging Expert | Tops Life";
  const defaultDesc = isCn 
    ? "永爱生命科技专注医疗软包装、精密注塑及生物基新材料。拥有ISO 7级洁净车间，提供无菌屏障系统与可持续医疗解决方案。" 
    : "Tops Life specializes in medical soft packaging, precision injection molding, and soy protein polymers. ISO 7 cleanroom certified sustainable solutions.";
  
  // 构建当前页面的规范 URL (Canonical URL)
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  
  // 默认分享图片
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/logo.png`;

  // 获取不带语言前缀的路径 (例如 /zh/about -> /about)
  const purePath = location.pathname.replace(/^\/(zh|en)/, '') || '/';

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn 分享卡片 */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter 分享卡片 */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDesc} />
      <meta property="twitter:image" content={metaImage} />
      
      {/* Hreflang 标签：告诉 Google 不同语言版本的对应关系 */}
      <link rel="alternate" hrefLang="zh" href={`https://cn.tops-life.com${purePath === '/' ? '' : purePath}`} />
      <link rel="alternate" hrefLang="en" href={`https://www.tops-life.com${purePath === '/' ? '' : purePath}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://www.tops-life.com${purePath === '/' ? '' : purePath}`} />
    </Helmet>
  );
};

export default SEO;