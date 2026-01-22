import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const effectiveTitle = title ? `${title} | TopsLife (Suzhou Tops Life)` : t('home.metaTitle');
  const effectiveDesc = description || t('home.metaDesc');

  // Ensure we strip query params (?...) to avoid duplicate content issues
  const canonicalUrl = `https://${window.location.hostname}${location.pathname}`;

  return (
    <Helmet>
      <title>{effectiveTitle}</title>
      <meta name="description" content={effectiveDesc} />
      <meta property="og:title" content={effectiveTitle} />
      <meta property="og:description" content={effectiveDesc} />
      <meta name="twitter:title" content={effectiveTitle} />
      <meta name="twitter:description" content={effectiveDesc} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;