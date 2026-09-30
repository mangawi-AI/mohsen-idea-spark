export type UiLang = "en" | "ar";

export type Platform = "instagram" | "tiktok" | "snapchat";

export const PLATFORMS: readonly Platform[] = ["instagram", "tiktok", "snapchat"] as const;

export const MAX_TOPIC_LENGTH = 120;

export const COOLDOWN_SECONDS = 8;

interface Strings {
  readonly brand: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly topicLabel: string;
  readonly topicPlaceholder: string;
  readonly privacyNote: string;
  readonly platformLabel: string;
  readonly platforms: Record<Platform, string>;
  readonly generate: string;
  readonly generating: string;
  readonly regenerate: string;
  readonly waitSeconds: (seconds: number) => string;
  readonly copy: string;
  readonly copied: string;
  readonly copyAria: (index: number) => string;
  readonly sourceAi: string;
  readonly sourceTemplate: string;
  readonly resultsLabel: string;
  readonly emptyTitle: string;
  readonly emptyBody: string;
  readonly noticeDailyLimit: string;
  readonly noticeFallback: string;
  readonly errorEmptyTopic: string;
  readonly errorTooLong: string;
  readonly errorGeneric: string;
  readonly errorCooldown: (seconds: number) => string;
  readonly themeToggle: string;
  readonly langToggle: string;
  readonly footer: string;
  readonly pageTitle: string;
  readonly pageDescription: string;
}

export const strings: Record<UiLang, Strings> = {
  en: {
    brand: "Mohsen Agency · وكالة محسن",
    heroTitle: "Content idea generator",
    heroSubtitle: "Five short-form hooks for your next Reel, TikTok or Snap.",
    topicLabel: "Topic",
    topicPlaceholder: "e.g. a new coffee shop in Riyadh",
    privacyNote:
      "Don't enter personal or client data. Free AI tier: inputs may be processed by Google.",
    platformLabel: "Platform",
    platforms: { instagram: "Instagram", tiktok: "TikTok", snapchat: "Snapchat" },
    generate: "Generate ideas",
    generating: "Generating…",
    regenerate: "Regenerate",
    waitSeconds: (seconds) => `Wait ${seconds}s`,
    copy: "Copy",
    copied: "Copied",
    copyAria: (index) => `Copy hook ${index}`,
    sourceAi: "AI",
    sourceTemplate: "Template",
    resultsLabel: "Generated hooks",
    emptyTitle: "No ideas yet",
    emptyBody: "Write a topic, pick a platform, and generate five ready-to-use hooks.",
    noticeDailyLimit: "AI limit reached for today, showing template ideas.",
    noticeFallback: "AI is unavailable right now, showing template ideas.",
    errorEmptyTopic: "Please write a topic first.",
    errorTooLong: `Topic must be ${MAX_TOPIC_LENGTH} characters or fewer.`,
    errorGeneric: "Something went wrong. Please try again in a moment.",
    errorCooldown: (seconds) => `Please wait ${seconds} seconds before generating again.`,
    themeToggle: "Toggle dark mode",
    langToggle: "Switch interface language",
    footer: "By Mohsen Sami Angawi · محسن سامي عنقاوي",
    pageTitle: "Mohsen Agency Content Idea Generator · وكالة محسن",
    pageDescription:
      "Generate five short-form content hooks for Instagram, TikTok and Snapchat in Arabic or English. A work sample by Mohsen Sami Angawi.",
  },
  ar: {
    brand: "Mohsen Agency · وكالة محسن",
    heroTitle: "مولّد أفكار المحتوى",
    heroSubtitle: "خمس بدايات قوية لريلز أو تيك توك أو سناب.",
    topicLabel: "الموضوع",
    topicPlaceholder: "مثال: كوفي جديد في الرياض",
    privacyNote:
      "لا تُدخل بيانات شخصية أو بيانات عملاء. الذكاء الاصطناعي هنا على الباقة المجانية وقد تُعالَج المدخلات لدى Google.",
    platformLabel: "المنصة",
    platforms: { instagram: "انستقرام", tiktok: "تيك توك", snapchat: "سناب شات" },
    generate: "ولّد الأفكار",
    generating: "جاري التوليد…",
    regenerate: "أفكار جديدة",
    waitSeconds: (seconds) => `انتظر ${seconds} ثانية`,
    copy: "نسخ",
    copied: "تم النسخ",
    copyAria: (index) => `نسخ الفكرة ${index}`,
    sourceAi: "ذكاء اصطناعي",
    sourceTemplate: "قالب جاهز",
    resultsLabel: "الأفكار المولّدة",
    emptyTitle: "ما في أفكار بعد",
    emptyBody: "اكتب الموضوع، اختر المنصة، وبتطلع لك خمس بدايات جاهزة.",
    noticeDailyLimit: "وصلنا حد الذكاء الاصطناعي اليوم، هذي أفكار من القوالب الجاهزة.",
    noticeFallback: "الذكاء الاصطناعي غير متاح حالياً، هذي أفكار من القوالب الجاهزة.",
    errorEmptyTopic: "اكتب الموضوع أول.",
    errorTooLong: `الموضوع لازم يكون ${MAX_TOPIC_LENGTH} حرف أو أقل.`,
    errorGeneric: "صار خلل بسيط. جرّب مرة ثانية بعد شوي.",
    errorCooldown: (seconds) => `انتظر ${seconds} ثانية قبل التوليد مرة ثانية.`,
    themeToggle: "تبديل الوضع الليلي",
    langToggle: "تغيير لغة الواجهة",
    footer: "By Mohsen Sami Angawi · محسن سامي عنقاوي",
    pageTitle: "مولّد أفكار المحتوى · وكالة محسن",
    pageDescription:
      "ولّد خمس بدايات لمحتوى قصير على انستقرام وتيك توك وسناب شات بالعربي أو الإنجليزي. نموذج عمل من محسن سامي عنقاوي.",
  },
};

export const containsArabic = (value: string): boolean => /[\u0600-\u06FF]/.test(value);
