import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <span className="text-4xl">📦</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-1">No products yet</h3>
        <p className="text-sm text-muted-foreground text-center">
          Be the first to list something!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 px-4">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
}
