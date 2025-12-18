import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 定义语言类型
type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // 默认语言设置
  const [language, setLanguageState] = useState<Language>('zh');

  // 1. 第一次打开时，检查浏览器缓存有没有存过语言设置
  useEffect(() => {
    const savedLang = localStorage.getItem('app-language') as Language;
    if (savedLang) {
      setLanguageState(savedLang);
    }
  }, []);

  // 2. 切换语言的功能（带记忆存储）
  const toggleLanguage = () => {
    const newLang = language === 'zh' ? 'en' : 'zh';
    setLanguageState(newLang);
    localStorage.setItem('app-language', newLang); // 存入缓存
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 切换后回到顶部
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 让其他组件能用这个功能的“钩子”
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
