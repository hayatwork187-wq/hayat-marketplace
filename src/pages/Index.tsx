import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import { useLanguage } from "@/hooks/useLanguage";

const Index = () => {
  const products = useStore((state) => state.products);
  const { t } = useLanguage();

  const categories = [
    { key: "all", label: t("all") },
    { key: "electronics", label: t("electronics") },
    { key: "fashion", label: t("fashion") },
    { key: "home", label: t("homeCategory") },
    { key: "sports", label: t("sports") },
    { key: "vehicles", label: t("vehicles") },
  ];

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-primary to-primary/70 rounded-2xl p-5 text-primary-foreground shadow-lg">
          <h2 className="text-xl font-bold mb-1">{t("welcome")}</h2>
          <p className="text-sm opacity-90">{t("welcomeSubtitle")}</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat, i) => (
            <button
              key={cat.key}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold text-foreground">{t("latestListings")}</h2>
        <p className="text-sm text-muted-foreground">{products.length} {t("productsAvailable")}</p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />

      <BottomNav />
    </div>
  );
};

export default Index;
