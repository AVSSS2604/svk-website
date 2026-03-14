"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { uk } from "./translations/uk";
import { ru } from "./translations/ru";
import { en } from "./translations/en";

export type Locale = "uk" | "ru" | "en";

const translations: Record<Locale, Record<string, unknown>> = { uk, ru, en };

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("uk");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("svk-locale") as Locale | null;
    if (saved && ["uk", "ru", "en"].includes(saved)) {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("svk-locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const t = useCallback(
    (key: string): any => {
      const keys = key.split(".");
      let result: any = translations[locale];
      for (const k of keys) {
        if (result == null) return key;
        result = result[k];
      }
      return result ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
