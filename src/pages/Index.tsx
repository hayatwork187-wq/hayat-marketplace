import { Header } from "@/components/Header";
import { ProductGrid } from "@/components/ProductGrid";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/store/useStore";

const Index = () => {
  const products = useStore((state) => state.products);

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-primary to-primary/70 rounded-2xl p-5 text-primary-foreground shadow-lg">
          <h2 className="text-xl font-bold mb-1">Welcome to Hayat Shop! 🇩🇿</h2>
          <p className="text-sm opacity-90">Buy & Sell across all 58 Wilayas</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {["All", "Electronics", "Fashion", "Home", "Sports", "Vehicles"].map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                i === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Section Title */}
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold text-foreground">Latest Listings</h2>
        <p className="text-sm text-muted-foreground">{products.length} products available</p>
      </div>

      {/* Product Grid */}
      <ProductGrid products={products} />

      <BottomNav />
    </div>
  );
};

export default Index;
