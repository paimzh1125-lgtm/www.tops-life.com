import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  // Default values from translation files
  const title = t('home.metaTitle') || 'Tops Life Science';
  const description = t('home.metaDesc') || 'Medical Packaging & Biomaterials Expert';
  const lang = i18n.language;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
};

export default SEO;