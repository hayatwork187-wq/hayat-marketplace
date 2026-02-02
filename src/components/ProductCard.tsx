import { MessageCircle, MapPin } from "lucide-react";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  location?: string;
}

export const ProductCard = ({ name, price, image, location = "الجزائر" }: ProductProps) => {
  // استبدل الرقم التالي برقمك الحقيقي (مثال: 213550000000)
  const whatsappNumber = "213XXXXXXXXX"; 
  const message = `مرحباً "سوق حياة"، أود طلب منتج: ${name} بسعر ${price} دج`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-2 transition-transform active:scale-95">
      {/* صورة المنتج */}
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      
      <div className="p-3 text-right" dir="rtl">
        {/* اسم المنتج */}
        <h3 className="text-sm font-bold text-[#191970] mb-1 truncate">{name}</h3>
        
        {/* السعر والولاية */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-amber-600 font-black text-sm">{price} دج</span>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>{location}</span>
          </div>
        </div>
        
        {/* زر الواتساب */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] text-white py-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          طلب عبر واتساب
        </a>
      </div>
    </div>
  );
};
