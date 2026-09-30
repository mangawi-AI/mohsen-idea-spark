import type { Platform, UiLang } from "./i18n";

type Bank = Record<Platform, Record<UiLang, readonly string[]>>;

/**
 * Offline template bank used whenever the AI path is unavailable or rate limited.
 * At least 12 formulas per platform per language. "{t}" is replaced by the topic.
 */
const bank: Bank = {
  instagram: {
    ar: [
      "احفظ هذا الريلز قبل ما تفكر في {t} مرة ثانية.",
      "٣ أشياء ما أحد قالها لك عن {t} 👇",
      "لو عندك دقيقة وحدة، خلها عن {t}.",
      "الكاروسيل هذا يختصر عليك شهور في {t}.",
      "وقفت أسوي هذا الشي في {t}… والنتيجة غيّرت كل شي.",
      "قبل / بعد: {t} بطريقة صح.",
      "كل واحد يسألني عن {t}، الجواب في هذا الريلز.",
      "شارك هذا مع الشخص اللي يحتاج يعرف عن {t}.",
      "خمس أخطاء شائعة في {t}، رقم ٣ يتكرر كثير.",
      "لو بديت {t} من جديد، بسوي كذا بالضبط.",
      "احفظه: دليل سريع لـ {t} في ٣٠ ثانية.",
      "هذا الكونتنت عن {t} صار trend لسبب واحد.",
    ],
    en: [
      "Save this before you think about {t} again.",
      "Three things nobody tells you about {t} 👇",
      "If you only have one minute today, spend it on {t}.",
      "This carousel saves you months on {t}.",
      "I stopped doing this in {t}, and everything changed.",
      "Before and after: {t}, done properly.",
      "Everyone keeps asking me about {t}. Here's the answer.",
      "Send this to someone who needs to see {t}.",
      "Five common mistakes in {t}. Number three is everywhere.",
      "If I started {t} again, this is exactly what I'd do.",
      "A 30-second guide to {t}. Save it for later.",
      "The {t} detail people scroll past every single time.",
    ],
  },
  tiktok: {
    ar: [
      "لا تكمل سكرول… هذا الشي عن {t} لازم تعرفه.",
      "وقف هنا ٣ ثواني بس، موضوع {t} يستاهل.",
      "أنا كنت أسوي {t} غلط وما أدري.",
      "أحد يشرح لي ليش الكل يتكلم عن {t}؟ خلني أقول لك.",
      "POV: أول يوم لك في {t}.",
      "اختبار سريع: تعرف هذي المعلومة عن {t}؟",
      "trend {t} انتهى… والبديل أفضل.",
      "لا تجرب {t} قبل ما تشوف هذا.",
      "هذي الحركة في {t} صارت لي نقلة.",
      "سر صغير في {t} ما أحد يقوله لك مجاناً.",
      "٣ ثواني وبتغيّر رأيك في {t}.",
      "جربت {t} لمدة أسبوع، والنتيجة كذا.",
    ],
    en: [
      "Stop scrolling. You need to see this about {t}.",
      "Give me 3 seconds and I'll change how you see {t}.",
      "I was doing {t} wrong this whole time.",
      "Why is everyone suddenly talking about {t}? Here's why.",
      "POV: your first day doing {t}.",
      "Quick test: did you know this about {t}?",
      "The {t} trend is over. This is what replaced it.",
      "Don't try {t} until you watch this.",
      "This one move in {t} changed everything for me.",
      "Nobody gives away this {t} tip for free.",
      "I tried {t} for a week. Here's what happened.",
      "Screenshot this before you touch {t} again.",
    ],
  },
  snapchat: {
    ar: [
      "قصة سريعة عن {t}… تابع معي.",
      "بصراحة، {t} ما كان سهل، خلني أحكي لك.",
      "ورايا اليوم {t}، تعال شوف من جوا.",
      "سؤال لكم: تسوون {t} كذا ولا لا؟",
      "شي صار لي أمس بسبب {t} 😅",
      "آخر فرصة اليوم لـ {t}، لا تفوتها.",
      "لا تقول لأحد… هذي طريقتي في {t}.",
      "خلف الكواليس: كيف أجهز {t}.",
      "خمس دقايق بس وأقول لكم كل شي عن {t}.",
      "أنا صراحة غيّرت رأيي في {t} ولهذا السبب.",
      "لو تسألني عن {t}، جوابي بهذا السناب.",
      "شفت هذا في {t} وقلت لازم أوريكم.",
    ],
    en: [
      "Quick story time about {t}. Stay with me.",
      "Honestly, {t} was harder than it looks. Let me explain.",
      "Spending today on {t}. Come behind the scenes.",
      "Real question for you: do you do {t} this way?",
      "Something happened yesterday because of {t} 😅",
      "Last chance today for {t}. Don't miss it.",
      "Don't tell anyone, but this is how I do {t}.",
      "Behind the scenes of getting {t} ready.",
      "Give me five minutes and I'll tell you everything about {t}.",
      "I changed my mind about {t}, and here's why.",
      "If you ever ask me about {t}, this is my answer.",
      "Saw this while doing {t} and had to show you.",
    ],
  },
};

export const buildTemplateHooks = (
  topic: string,
  platform: Platform,
  language: UiLang,
): string[] => {
  const formulas = [...bank[platform][language]];
  const picked: string[] = [];

  while (picked.length < 5 && formulas.length > 0) {
    const index = Math.floor(Math.random() * formulas.length);
    const [formula] = formulas.splice(index, 1);
    if (formula) picked.push(formula.replaceAll("{t}", topic));
  }

  return picked;
};
