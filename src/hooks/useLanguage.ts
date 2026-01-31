import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Language, translations, TranslationKey } from "@/i18n/translations";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "ar", // Default to Arabic for Algeria
      isRTL: true,
      setLanguage: (lang: Language) => {
        set({ 
          language: lang,
          isRTL: lang === "ar"
        });
        // Update document direction
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = lang;
      },
      t: (key: TranslationKey) => {
        const lang = get().language;
        return translations[lang][key] || translations.ar[key] || key;
      },
    }),
    {
      name: "hayat-shop-language",
      onRehydrateStorage: () => (state) => {
        // Apply direction on hydration
        if (state) {
          document.documentElement.dir = state.language === "ar" ? "rtl" : "ltr";
          document.documentElement.lang = state.language;
        }
      },
    }
  )
);
