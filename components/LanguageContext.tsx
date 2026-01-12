import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 初始化状态：优先从 localStorage 读取，默认为 'zh'
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('app_language');
        return (saved === 'zh' || saved === 'en') ? saved : 'zh';
      } catch (e) {
        // 忽略 localStorage 访问错误（如隐私模式）
        return 'zh';
      }
    }
    return 'zh';
  });

  // 核心方法：设置语言并持久化
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('app_language', lang);
      } catch (e) {
        // 忽略写入错误
      }
    }
  };

  // 辅助方法：切换语言（兼容现有 Navbar）
  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  // 监听语言变化，同步到 document
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
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