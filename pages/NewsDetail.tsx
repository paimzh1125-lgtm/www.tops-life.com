import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowLeft, Calendar, Tag, Share2, Clock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { NEWS_DATABASE } from '../data/newsData';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const language = i18n.language as 'zh' | 'en';
  const containerRef = useRef<HTMLDivElement>(null);
  const [showToast, setShowToast] = useState(false);

  const newsItem = id ? NEWS_DATABASE[id] : null;
  const content = newsItem ? newsItem[language] : null;

  // 计算相关新闻 (排除当前文章，取前2篇)
  const relatedNews = useMemo(() => {
    return Object.entries(NEWS_DATABASE)
      .filter(([slug]) => slug !== id)
      .map(([slug, entry]) => ({ slug, ...entry }))
      .slice(0, 2);
  }, [id]);

  // 分享功能
  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

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
    <main ref={containerRef} className="bg-white min-h-screen">
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
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-slate-500 hover:text-sky-600 transition-colors px-4 py-2 rounded-full hover:bg-slate-50"
            >
              <Share2 size={18} />
              <span className="text-sm font-medium">{t('newsDetail.share')}</span>
            </button>
          </div>

        </div>
      </article>

      {/* Related News Section */}
      {relatedNews.length > 0 && (
        <section className="bg-slate-50 py-20 mt-12 border-t border-slate-200">
          <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-10 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-sky-600 rounded-full"></span>
              {t('newsDetail.related')}
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedNews.map((item) => {
                const itemContent = item[language];
                return (
                  <Link 
                    key={item.slug} 
                    to={`/news/${item.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                    onClick={() => window.scrollTo(0,0)}
                  >
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img 
                        src={item.image} 
                        alt={itemContent.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-sky-600 uppercase tracking-wider shadow-sm">
                        {itemContent.category}
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h4 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors">
                        {itemContent.title}
                      </h4>
                      <div className="mt-auto text-slate-400 text-sm flex items-center gap-2">
                        <Calendar size={14} /> {itemContent.date}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center gap-3 transition-all duration-300 ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <CheckCircle2 size={18} className="text-emerald-400" />
        <span className="font-medium text-sm">{t('newsDetail.shareSuccess')}</span>
      </div>
    </main>
  );
};

export default NewsDetail;