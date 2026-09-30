import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MAX_TOPIC_LENGTH, PLATFORMS, strings, type Platform, type UiLang } from "@/lib/i18n";

interface HookFormProps {
  readonly lang: UiLang;
  readonly topic: string;
  readonly platform: Platform;
  readonly loading: boolean;
  readonly cooldown: number;
  readonly onTopicChange: (value: string) => void;
  readonly onPlatformChange: (value: Platform) => void;
  readonly onSubmit: () => void;
}

export const HookForm = ({
  lang,
  topic,
  platform,
  loading,
  cooldown,
  onTopicChange,
  onPlatformChange,
  onSubmit,
}: HookFormProps) => {
  const t = strings[lang];
  const disabled = loading || cooldown > 0 || topic.trim().length === 0;

  return (
    <form
      className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] sm:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (!disabled) onSubmit();
      }}
    >
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor="topic" className="text-sm font-semibold">
          {t.topicLabel}
        </Label>
        <span className="text-xs tabular-nums text-muted-foreground" aria-hidden="true">
          {topic.length}/{MAX_TOPIC_LENGTH}
        </span>
      </div>

      <Input
        id="topic"
        value={topic}
        maxLength={MAX_TOPIC_LENGTH}
        placeholder={t.topicPlaceholder}
        onChange={(event) => onTopicChange(event.target.value.slice(0, MAX_TOPIC_LENGTH))}
        className="mt-2 h-12 rounded-xl text-start text-base"
      />

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.privacyNote}</p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold">{t.platformLabel}</legend>
        <div className="grid grid-cols-3 gap-2">
          {PLATFORMS.map((item) => {
            const selected = item === platform;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={selected}
                onClick={() => onPlatformChange(item)}
                className={cn(
                  "min-h-11 rounded-xl border px-2 py-2 text-sm font-medium transition-colors",
                  selected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:bg-accent",
                )}
              >
                {t.platforms[item]}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Button
        type="submit"
        disabled={disabled}
        className="mt-5 h-12 w-full rounded-xl text-base font-semibold"
      >
        {loading ? (
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <Sparkles className="size-5" aria-hidden="true" />
        )}
        {loading ? t.generating : cooldown > 0 ? t.waitSeconds(cooldown) : t.generate}
      </Button>
    </form>
  );
};
