import { Languages, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { strings, type UiLang } from "@/lib/i18n";

interface AppHeaderProps {
  readonly lang: UiLang;
  readonly theme: "light" | "dark";
  readonly onToggleLang: () => void;
  readonly onToggleTheme: () => void;
}

export const AppHeader = ({ lang, theme, onToggleLang, onToggleTheme }: AppHeaderProps) => {
  const t = strings[lang];

  return (
    <header className="sticky top-0 z-10 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {t.brand}
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={onToggleTheme}
            aria-label={t.themeToggle}
          >
            {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="h-11 min-w-11 px-3 text-sm font-semibold"
            onClick={onToggleLang}
            aria-label={t.langToggle}
          >
            <Languages className="size-4" aria-hidden="true" />
            {lang === "ar" ? "EN" : "ع"}
          </Button>
        </div>
      </div>
    </header>
  );
};
