import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image }) => {
  const location = useLocation();
  const siteUrl = 'https://www.tops-life.com'; 
  
  // 构建当前页面的规范 URL (Canonical URL)
  const canonicalUrl = `${siteUrl}${location.pathname}`;
  
  // 默认分享图片
  const metaImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}/images/logo.png`;

  // 获取不带语言前缀的路径 (例如 /zh/about -> /about)
  const purePath = location.pathname.replace(/^\/(zh|en)/, '') || '/';

  return (
    <Helmet>
      {/* 基础元数据 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook / LinkedIn 分享卡片 */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter 分享卡片 */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={metaImage} />
      
      {/* Hreflang 标签：告诉 Google 不同语言版本的对应关系 */}
      <link rel="alternate" hreflang="zh" href={`${siteUrl}/zh${purePath === '/' ? '' : purePath}`} />
      <link rel="alternate" hreflang="en" href={`${siteUrl}/en${purePath === '/' ? '' : purePath}`} />
      <link rel="alternate" hreflang="x-default" href={`${siteUrl}/`} />
    </Helmet>
  );
};

export default SEO;