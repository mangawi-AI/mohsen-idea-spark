import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { strings, type UiLang } from "@/lib/i18n";

interface HookCardProps {
  readonly hook: string;
  readonly index: number;
  readonly lang: UiLang;
  readonly contentLang: UiLang;
}

export const HookCard = ({ hook, index, lang, contentLang }: HookCardProps) => {
  const t = strings[lang];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(hook);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }, [hook]);

  return (
    <li className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
      <span
        aria-hidden="true"
        className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary"
      >
        {index}
      </span>
      <p
        lang={contentLang}
        dir={contentLang === "ar" ? "rtl" : "ltr"}
        className="flex-1 text-start text-[15px] leading-relaxed text-card-foreground"
      >
        {hook}
      </p>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-11 shrink-0 px-2 text-xs"
        onClick={handleCopy}
        aria-label={t.copyAria(index)}
      >
        {copied ? (
          <Check className="size-4 text-primary" aria-hidden="true" />
        ) : (
          <Copy className="size-4" aria-hidden="true" />
        )}
        <span className="sr-only sm:not-sr-only">{copied ? t.copied : t.copy}</span>
      </Button>
    </li>
  );
};
