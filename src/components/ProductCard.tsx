import { MapPin, MessageCircle } from "lucide-react";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `مرحبا! أنا مهتم بـ: ${product.title}\n` +
      `السعر: ${product.price.toLocaleString()} DZD\n` +
      `الحالة: ${product.condition === 'new' ? 'جديد' : 'مستعمل'}\n` +
      `الولاية: ${product.wilaya}\n\n` +
      `هل لا يزال متاحاً؟`
    );
    window.open(`https://wa.me/${product.sellerPhone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div 
      className={`product-card animate-fade-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {/* Condition Badge */}
        <span 
          className={`absolute top-2 left-2 ${
            product.condition === 'new' ? 'badge-new' : 'badge-used'
          }`}
        >
          {product.condition === 'new' ? 'New' : 'Used'}
        </span>
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-2 mb-1 min-h-[2.5rem]">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className="price-text text-lg">{product.price.toLocaleString()}</span>
          <span className="currency text-sm">DZD</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs">{product.wilaya}</span>
        </div>

        {/* WhatsApp Button */}
        <button 
          onClick={handleWhatsAppClick}
          className="btn-whatsapp flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Order via WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
