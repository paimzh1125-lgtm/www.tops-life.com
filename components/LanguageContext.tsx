import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  // 1. 从 URL 参数获取语言，如果没有则回退到 i18n 检测结果或 'zh'
  // (注意：下一步修改 App.tsx 后，params.lang 才会生效)
  const currentLang = (params.lang as Language) || (i18n.resolvedLanguage as Language) || 'zh';

  // 2. 监听 URL 变化，同步给 i18next 和 HTML 标签
  useEffect(() => {
    if (currentLang && ['en', 'zh'].includes(currentLang) && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
      document.documentElement.lang = currentLang;
    }
  }, [currentLang, i18n]);

  // 3. 核心方法：切换语言 = 切换 URL
  const setLanguage = (targetLang: Language) => {
    if (targetLang === currentLang) return;
    
    const currentPath = location.pathname;
    // 将路径中的语言部分替换掉 (例如 /en/about -> /zh/about)
    const newPath = currentPath.replace(/^\/(en|zh)/, `/${targetLang}`);
    // 如果路径没有变（可能是根路径），强制拼接
    const finalPath = newPath === currentPath ? `/${targetLang}${currentPath === '/' ? '' : currentPath}` : newPath;
    
    navigate(finalPath + location.search + location.hash);
  };

  const toggleLanguage = () => {
    setLanguage(currentLang === 'zh' ? 'en' : 'zh');
  };

  return (
    <LanguageContext.Provider value={{ language: currentLang, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};