import React from 'react';
import { useTranslation } from 'react-i18next';

const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{t('about.hero.title')}</h1>
        <p className="text-xl text-slate-600 max-w-3xl mb-12">{t('about.hero.desc')}</p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('about.intro.title')}</h2>
            <p className="text-slate-600 mb-6">{t('about.intro.p1')}</p>
            <p className="text-slate-600">{t('about.intro.p2')}</p>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8">
            <h3 className="font-bold text-slate-900 mb-6">{t('about.intro.coreTitle')}</h3>
            <ul className="space-y-4">
              {(t('about.intro.coreItems', { returnObjects: true }) as string[]).map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-700">
                  <span className="w-2 h-2 bg-sky-500 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;