import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // 1. 从域名 (Subdomain) 获取语言
  // 如果域名以 'cn.' 开头，则为中文，否则默认为英文
  const isCn = window.location.hostname.startsWith('cn.');
  const currentLang: Language = isCn ? 'zh' : 'en';

  // 2. 监听 URL 变化，同步给 i18next 和 HTML 标签
  useEffect(() => {
    if (currentLang && ['en', 'zh'].includes(currentLang) && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
      document.documentElement.lang = currentLang;
    }
  }, [currentLang, i18n]);

  // 3. 核心方法：切换语言 = 切换子域名
  const setLanguage = (targetLang: Language) => {
    if (targetLang === currentLang) return;
    
    const host = window.location.host;
    let newHost = host;

    if (targetLang === 'zh') {
      // 切换到中文：添加或替换为 cn.
      newHost = host.startsWith('www.') ? host.replace('www.', 'cn.') : `cn.${host}`;
    } else {
      // 切换到英文：移除 cn. 或替换为 www.
      newHost = host.startsWith('cn.') ? host.replace('cn.', 'www.') : `www.${host}`;
    }
    
    window.location.href = `${window.location.protocol}//${newHost}${location.pathname}${location.search}${location.hash}`;
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