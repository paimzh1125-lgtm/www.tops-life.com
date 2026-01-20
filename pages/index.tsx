import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-sky-50 text-sky-600 text-sm font-semibold mb-6">
            {t('home.heroTag')}
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-4 rounded-full font-medium hover:bg-sky-700 transition-colors">
            {t('home.ctaBtn')} <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              {t('home.who')}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              {t('home.intro')}
            </p>
            <div className="grid grid-cols-3 gap-6">
              {(t('home.stats', { returnObjects: true }) as any[]).map((stat: any, idx: number) => (
                <div key={idx}>
                  <div className="text-3xl font-bold text-sky-600">{stat.num}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl bg-slate-200">
             {/* Placeholder for image */}
             <div className="w-full h-full flex items-center justify-center text-slate-400">Image</div>
          </div>
        </div>
      </section>
      
      {/* Solutions Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('home.solutionsTitle')}</h2>
            <p className="text-slate-600">{t('home.solutionsDesc')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {(t('home.solutions', { returnObjects: true }) as any[]).map((sol: any, idx: number) => (
              <div key={idx} className="p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{sol.title}</h3>
                <p className="text-slate-600">{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;