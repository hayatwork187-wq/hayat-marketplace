import { useLanguage } from "@/hooks/useLanguage";
import { Language } from "@/i18n/translations";
import { Check, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: "ar", name: "arabic", nativeName: "العربية" },
  { code: "fr", name: "french", nativeName: "Français" },
  { code: "en", name: "english", nativeName: "English" },
];

export function LanguageSettings() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLang = languages.find((l) => l.code === language);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 text-start">
            <p className="text-xs text-muted-foreground">{t("language")}</p>
            <p className="text-sm font-medium text-foreground">
              {currentLang?.nativeName}
            </p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {t("language")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                language === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              }`}
            >
              <span className="font-medium">{lang.nativeName}</span>
              {language === lang.code && <Check className="w-5 h-5" />}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
