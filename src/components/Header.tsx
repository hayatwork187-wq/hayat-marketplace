import { ShoppingBag, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export function Header({ title, showSearch = true }: HeaderProps) {
  const { t } = useLanguage();
  const displayTitle = title || "Hayat Shop";

  return (
    <header className="app-header">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-foreground">{displayTitle}</h1>
        </div>
        {showSearch && (
          <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </header>
  );
}
