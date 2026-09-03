"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, LocalizedString } from "@/types";
import { translations } from "@/data/translations";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (keyPath: string) => string;
  l: (localized: LocalizedString | undefined | null) => string;
  isNepali: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("nhs_lang") as Language;
    if (saved === "en" || saved === "np") {
      setLangState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("nhs_lang", newLang);
    document.documentElement.lang = newLang;
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "np" : "en");
  };

  // Helper to safely navigate nested translation keys, e.g. t('nav.aboutSub.visionMission')
  const t = (keyPath: string): string => {
    const keys = keyPath.split(".");
    let current: any = translations[lang];
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback: any = translations["en"];
        for (const fbKey of keys) {
          if (fallback && typeof fallback === "object" && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return keyPath;
          }
        }
        return typeof fallback === "string" ? fallback : keyPath;
      }
    }
    return typeof current === "string" ? current : keyPath;
  };

  // Helper to get localized string from `{ en: "...", np: "..." }`
  const l = (localized: LocalizedString | undefined | null): string => {
    if (!localized) return "";
    return localized[lang] || localized.en || localized.np || "";
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, l, isNepali: lang === "np" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
