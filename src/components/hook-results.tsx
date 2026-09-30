import { RefreshCw } from "lucide-react";

import { HookCard } from "@/components/hook-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { strings, type UiLang } from "@/lib/i18n";

export interface HookResults {
  readonly hooks: string[];
  readonly source: "ai" | "template";
  readonly language: UiLang;
  readonly notice?: "daily_limit" | "fallback";
}

interface HookResultsProps {
  readonly lang: UiLang;
  readonly loading: boolean;
  readonly error: string | null;
  readonly results: HookResults | null;
  readonly cooldown: number;
  readonly onRegenerate: () => void;
}

export const HookResultsPanel = ({
  lang,
  loading,
  error,
  results,
  cooldown,
  onRegenerate,
}: HookResultsProps) => {
  const t = strings[lang];

  if (loading) {
    return (
      <div className="mt-6 space-y-3" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((index) => (
          <Skeleton key={index} className="h-20 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
        {error}
      </p>
    );
  }

  if (!results) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-border p-6 text-center">
        <p className="text-sm font-semibold text-foreground">{t.emptyTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">{t.emptyBody}</p>
      </div>
    );
  }

  const notice =
    results.notice === "daily_limit"
      ? t.noticeDailyLimit
      : results.notice === "fallback"
        ? t.noticeFallback
        : null;

  return (
    <section className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={
            results.source === "ai"
              ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              : "rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-foreground dark:text-gold"
          }
        >
          {results.source === "ai" ? t.sourceAi : t.sourceTemplate}
        </span>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl"
          onClick={onRegenerate}
          disabled={cooldown > 0}
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {cooldown > 0 ? t.waitSeconds(cooldown) : t.regenerate}
        </Button>
      </div>

      {notice ? <p className="mt-3 text-xs text-muted-foreground">{notice}</p> : null}

      <ul className="mt-3 space-y-3">
        {results.hooks.map((hook, index) => (
          <HookCard
            key={`${index}-${hook}`}
            hook={hook}
            index={index + 1}
            lang={lang}
            contentLang={results.language}
          />
        ))}
      </ul>
    </section>
  );
};
