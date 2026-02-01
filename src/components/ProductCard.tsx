import { Link } from "react-router-dom";
import { Product } from "@/store/useStore";
import { MapPin, Tag } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-[25px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 relative">
        {/* الصورة مع زوايا ناعمة */}
        <div className="aspect-square overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-duration-500"
          />
          <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#191970]" />
            <span className="text-[10px] font-bold text-gray-700">{product.location}</span>
          </div>
        </div>

        {/* تفاصيل المنتج */}
        <div className="p-3">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1">{product.title}</h3>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-col">
              <span className="text-[#191970] font-black text-lg">
                {product.price} <span className="text-[10px]">د.ج</span>
              </span>
            </div>
            <div className="bg-amber-50 p-2 rounded-full">
              <Tag className="w-4 h-4 text-amber-500" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
