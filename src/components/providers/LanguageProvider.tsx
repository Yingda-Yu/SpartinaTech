"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  LanguageContext,
  type Locale,
  defaultLocale,
  LOCALE_STORAGE_KEY,
  translations,
  getNestedValue,
} from "@/lib/i18n";

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return defaultLocale;
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    /* noop */
  }
  return defaultLocale;
}

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    const stored = getInitialLocale();
    if (stored !== defaultLocale) {
      setLocaleState(stored);
    }
  }, []);

  // Sync <html lang> attribute
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "zh" : "en");
  }, [locale, setLocale]);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const val = getNestedValue(translations[locale], key);
      if (typeof val === "string") return val;
      return fallback ?? key;
    },
    [locale]
  );

  const tArr = useCallback(
    (key: string, fallback: string[] = []): string[] => {
      const val = getNestedValue(translations[locale], key);
      if (Array.isArray(val)) return val as string[];
      return fallback;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t, tArr }),
    [locale, setLocale, toggleLocale, t, tArr]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}
