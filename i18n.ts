import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './pages/en.json';
import zh from './pages/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh }
    },
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    detection: {
      order: ['path', 'navigator'],
      lookupFromPathIndex: 0, 
    },
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;