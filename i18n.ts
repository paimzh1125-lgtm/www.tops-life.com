import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "metaTitle": "Tops Life Science",
    }
  },
  zh: {
    translation: {
      "metaTitle": "永爱生命",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
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