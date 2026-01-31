import { Home, PlusCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/hooks/useLanguage";

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: "/", label: t("home"), icon: Home },
    { path: "/sell", label: t("sell"), icon: PlusCircle },
    { path: "/profile", label: t("profile"), icon: User },
  ];

  return (
    <nav className="bottom-nav z-50">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item flex-1 ${isActive ? "active" : ""}`}
            >
              <Icon 
                className={`w-6 h-6 mb-1 transition-transform duration-200 ${
                  isActive ? "scale-110" : ""
                }`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
