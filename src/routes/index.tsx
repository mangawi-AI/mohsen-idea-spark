import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppHeader } from "@/components/app-header";
import { HookForm } from "@/components/hook-form";
import { HookResultsPanel, type HookResults } from "@/components/hook-results";
import { usePreferences } from "@/hooks/use-preferences";
import { generateHooks } from "@/lib/generate-hooks.functions";
import { COOLDOWN_SECONDS, strings, type Platform } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohsen Agency Content Idea Generator · وكالة محسن" },
      {
        name: "description",
        content:
          "Generate five short-form content hooks for Instagram, TikTok and Snapchat in Arabic or English. مولّد أفكار محتوى قصير بالعربي والإنجليزي.",
      },
      { property: "og:title", content: "Mohsen Agency Content Idea Generator · وكالة محسن" },
      {
        property: "og:description",
        content:
          "Five ready-to-use short-form hooks per topic, tuned per platform. خمس بدايات جاهزة لكل موضوع.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { lang, theme, toggleLang, toggleTheme } = usePreferences();
  const callGenerate = useServerFn(generateHooks);

  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<HookResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const requestRef = useRef(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const t = strings[lang];

  const handleGenerate = useCallback(async () => {
    const trimmed = topic.trim();
    if (trimmed.length === 0) {
      setError(t.errorEmptyTopic);
      return;
    }

    const requestId = requestRef.current + 1;
    requestRef.current = requestId;
    setLoading(true);
    setError(null);

    try {
      const response = await callGenerate({
        data: { topic: trimmed, platform, uiLang: lang },
      });
      if (requestRef.current !== requestId) return;

      if (response.ok) {
        setResults({
          hooks: response.hooks,
          source: response.source,
          language: response.language,
          ...(response.notice ? { notice: response.notice } : {}),
        });
        setCooldown(COOLDOWN_SECONDS);
      } else if (response.code === "cooldown") {
        const wait = response.retryAfterSeconds ?? COOLDOWN_SECONDS;
        setCooldown(wait);
        setError(t.errorCooldown(wait));
      } else if (response.code === "invalid_input") {
        setError(trimmed.length === 0 ? t.errorEmptyTopic : t.errorTooLong);
      } else {
        setError(t.errorGeneric);
      }
    } catch {
      if (requestRef.current === requestId) setError(t.errorGeneric);
    } finally {
      if (requestRef.current === requestId) setLoading(false);
    }
  }, [callGenerate, lang, platform, t, topic]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader
        lang={lang}
        theme={theme}
        onToggleLang={toggleLang}
        onToggleTheme={toggleTheme}
      />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {t.heroTitle}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t.heroSubtitle}</p>

        <div className="mt-6">
          <HookForm
            lang={lang}
            topic={topic}
            platform={platform}
            loading={loading}
            cooldown={cooldown}
            onTopicChange={setTopic}
            onPlatformChange={setPlatform}
            onSubmit={handleGenerate}
          />
        </div>

        <div aria-live="polite" aria-busy={loading} aria-label={t.resultsLabel}>
          <HookResultsPanel
            lang={lang}
            loading={loading}
            error={error}
            results={results}
            cooldown={cooldown}
            onRegenerate={handleGenerate}
          />
        </div>
      </main>

      <footer className="border-t border-border/70 py-6 text-center text-xs text-muted-foreground">
        {t.footer}
      </footer>
    </div>
  );
}
