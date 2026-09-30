<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Mohsen Agency Content Idea Generator · وكالة محسن

A small bilingual (AR/EN) web app that turns a topic into five short-form content hooks
tuned for Instagram Reels, TikTok or Snapchat.

## Stack

- TanStack Start (React 19, Vite), TypeScript
- Tailwind CSS v4 + shadcn/ui, lucide-react icons
- Lovable Cloud (Postgres) for anonymous usage counters
- Google Gemini via a server function, with an offline template fallback

## Features

- Topic input (max 120 characters) with live counter and three platform options
- Five hooks per generation, per-card copy button, regenerate
- Language detection: Arabic topics return Saudi-dialect hooks, English topics return English hooks
- Interface language (AR/EN) and light/dark theme, remembered in `localStorage`, full RTL mirroring
- Mobile-first layout from 360px, 44px touch targets, visible focus rings, `aria-live` results

## Quota protection and fallback

The server function `generateHooks` (`src/lib/generate-hooks.functions.ts`) protects the free
Gemini quota using the `usage_counters` table, which stores counters only — never topics or
generated text (PDPL-friendly):

- Per-visitor cooldown: 8 seconds between requests (also enforced in the UI)
- Per-visitor cap: 12 AI generations per day, keyed by a SHA-256 hash of client IP + a daily salt
- Global cap: 150 AI generations per day
- Row level security is on and only the server (service role) can read or write the table

If the API key is missing, or Gemini errors, times out (12s), hits quota or returns invalid JSON,
the app never fails: it serves five hooks from a built-in template bank (12+ formulas per platform
in both Arabic and English) and reports `source: "template"`.

## Running locally

```bash
bun install
bun run dev
```

## Required secrets

| Secret | Required | Default |
| --- | --- | --- |
| `GEMINI_API_KEY` | For the AI path (template fallback works without it) | — |
| `GEMINI_MODEL` | Optional | `gemini-2.5-flash-lite` |
| `VISITOR_HASH_SALT` | Generated automatically | — |

Work sample by Mohsen Sami Angawi · محسن سامي عنقاوي
