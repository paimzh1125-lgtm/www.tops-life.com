import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  type?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = "Tops Life Science | Medical Packaging & Biomaterials Expert", 
  description = "Tops Life Science specializes in medical soft packaging, precision injection molding, and soy protein polymers. ISO 7 cleanroom certified sustainable solutions.",
  path,
  type = "website",
  image = "/images/logo.png"
}) => {
  const location = useLocation();
  
  // 1. Determine the current path (prop overrides automatic detection)
  const currentPath = path || location.pathname;

  // 2. Construct the canonical URL
  // Ensure unified format: https://www.tops-life.com/path (no trailing slash unless root)
  const baseUrl = "https://www.tops-life.com";
  const cleanPath = currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  const canonicalUrl = `${baseUrl}${normalizedPath}`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Tops Life Science" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Dynamic Canonical Tag */}
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default SEO;