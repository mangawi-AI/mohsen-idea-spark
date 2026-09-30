import { useCallback, useEffect, useState } from "react";

import type { UiLang } from "@/lib/i18n";

type Theme = "light" | "dark";

const THEME_KEY = "mohsen-agency-theme";
const LANG_KEY = "mohsen-agency-lang";

const readStored = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStored = (key: string, value: string): void => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable (private mode) — preference stays session-only */
  }
};

export const usePreferences = () => {
  const [lang, setLang] = useState<UiLang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedLang = readStored(LANG_KEY);
    const nextLang: UiLang =
      storedLang === "ar" || storedLang === "en"
        ? storedLang
        : navigator.language.toLowerCase().startsWith("ar")
          ? "ar"
          : "en";

    const storedTheme = readStored(THEME_KEY);
    const nextTheme: Theme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    setLang(nextLang);
    setTheme(nextTheme);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    root.classList.toggle("dark", theme === "dark");
  }, [hydrated, lang, theme]);

  const toggleLang = useCallback(() => {
    setLang((current) => {
      const next: UiLang = current === "ar" ? "en" : "ar";
      writeStored(LANG_KEY, next);
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      writeStored(THEME_KEY, next);
      return next;
    });
  }, []);

  return { lang, theme, hydrated, toggleLang, toggleTheme };
};
