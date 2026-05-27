"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale, LocalizedText, UIStringKey } from "../types";
import { uiStrings } from "../content/ui-strings";
import { STORAGE_KEYS } from "../utils/constants";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  /** Translate a UI key with locale fallback. */
  t: (key: UIStringKey) => string;
  /** Pick a locale-specific value from any LocalizedText. */
  pick: (text: LocalizedText | undefined) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "th";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.locale);
    return stored === "en" ? "en" : "th";
  } catch {
    return "th";
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th");

  // hydrate from localStorage after mount
  useEffect(() => {
    const stored = readStoredLocale();
    if (stored !== locale) setLocaleState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // sync html lang + body class
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    const body = document.body;
    body.classList.toggle("locale-th", locale === "th");
    body.classList.toggle("locale-en", locale === "en");
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEYS.locale, next);
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "th" ? "en" : "th");
  }, [locale, setLocale]);

  const pick = useCallback(
    (text: LocalizedText | undefined): string => {
      if (!text) return "";
      const value = text[locale];
      if (value && value.length > 0) return value;
      const other: Locale = locale === "th" ? "en" : "th";
      return text[other] ?? "";
    },
    [locale],
  );

  const t = useCallback(
    (key: UIStringKey): string => pick(uiStrings[key]),
    [pick],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, toggle, t, pick }),
    [locale, setLocale, toggle, t, pick],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return ctx;
}
