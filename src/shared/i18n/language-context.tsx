import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations } from './translations';

type Language = 'en' | 'ru';

type NestedRecord = {
  [key: string]: string | NestedRecord;
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = 'app_language';

// Helper to get initial language
const getInitialLanguage = (): Language => {
  // Try to get from localStorage
  const savedLanguage = localStorage.getItem(STORAGE_KEY);
  if (savedLanguage === 'en' || savedLanguage === 'ru') {
    return savedLanguage;
  }

  // Try to get from browser settings
  const browserLanguage = navigator.language.toLowerCase();
  if (browserLanguage.startsWith('ru')) {
    return 'ru';
  }

  // Default to English
  return 'en';
};

export const LanguageContext = createContext<LanguageContextType>({
  language: getInitialLanguage(),
  setLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  // Update language in localStorage and document whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  const t = (path: string): string => {
    try {
      const keys = path.split('.');
      let current: NestedRecord = translations[language] as NestedRecord;
      
      for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
          const value = current[key];
          if (typeof value === 'string') {
            return value;
          }
          current = value as NestedRecord;
        } else {
          throw new Error(`Invalid path: ${path}`);
        }
      }
      
      throw new Error(`Translation is not a string: ${path}`);
    } catch (error) {
      console.warn(`Translation error: ${error}`);
      return path;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
} 