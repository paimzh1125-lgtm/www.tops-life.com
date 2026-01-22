import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SEOProps {
  title?: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const { t } = useTranslation();
  
  const effectiveTitle = title ? `${title} | TopsLife (Suzhou Tops Life)` : t('home.metaTitle');
  const effectiveDesc = description || t('home.metaDesc');

  return (
    <Helmet>
      <title>{effectiveTitle}</title>
      <meta name="description" content={effectiveDesc} />
      <meta property="og:title" content={effectiveTitle} />
      <meta property="og:description" content={effectiveDesc} />
      <meta name="twitter:title" content={effectiveTitle} />
      <meta name="twitter:description" content={effectiveDesc} />
    </Helmet>
  );
};

export default SEO;