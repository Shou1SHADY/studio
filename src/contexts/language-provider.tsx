
"use client";

import React, { createContext, useState, useCallback, ReactNode } from "react";
import translations from "@/lib/translations";

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

interface LanguageContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");
  const [direction, setDirection] = useState<Direction>("ltr");

  const toggleLanguage = useCallback(() => {
    setLanguage((prevLang) => {
      const newLang = prevLang === "en" ? "ar" : "en";
      setDirection(newLang === "ar" ? "rtl" : "ltr");
      // Set the dir attribute on the html element
      if (typeof window !== 'undefined') {
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
      }
      return newLang;
    });
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[language][key] || key;
    },
    [language]
  );
  
  const contextValue = {
    language,
    direction,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};
