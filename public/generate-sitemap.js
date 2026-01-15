import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件路径 (用于 ESM 模块)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- 配置 ---
const SITE_URL = 'https://www.tops-life.com';
const LANGUAGES = ['zh', 'en'];

// 静态页面路由 (不包含语言前缀)
const STATIC_ROUTES = [
  '',          // 首页
  'about',     // 关于我们
  'products',  // 解决方案
  'news',      // 新闻动态
  'contact'    // 联系我们
];

// 产品 ID 列表 (来自 ProductDetail.tsx)
const PRODUCT_IDS = [
  "pe-bag",
  "medical-film",
  "high-barrier",
  "lidding",
  "microfluidic",
  "stapler",
  "ivd",
  "gear",
  "plant-adhesive",
  "degradable-coating",
  "eco-paper",
  "functional-additives"
];

// --- 生成逻辑 ---
const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  // 1. 根路径 (通常重定向，但也建议包含)
  xml += `
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;

  // 2. 遍历所有语言
  LANGUAGES.forEach(lang => {
    
    // 2.1 静态页面
    STATIC_ROUTES.forEach(route => {
      const url = `${SITE_URL}/${lang}${route ? `/${route}` : ''}`;
      const priority = route === '' ? '1.0' : '0.8';
      
      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    // 2.2 动态产品详情页
    PRODUCT_IDS.forEach(id => {
      const url = `${SITE_URL}/${lang}/products/${id}`;
      xml += `
  <url>
    <loc>${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

  });

  xml += `
</urlset>`;

  return xml;
};

// --- 写入文件 ---
try {
  const sitemap = generateSitemap();
  // 写入到 public 目录，这样 Vite 构建时会自动复制到 dist 根目录
  const publicDir = path.resolve(__dirname, '../public');
  
  if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully in public/sitemap.xml');
  console.log(`   Total URLs: ${1 + LANGUAGES.length * (STATIC_ROUTES.length + PRODUCT_IDS.length)}`);

} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}