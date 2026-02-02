import { MessageCircle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
  location?: string;
}

export const ProductCard = ({ name, price, image, location = "الجزائر" }: ProductProps) => {
  const navigate = useNavigate();
  const isLoggedIn = false; // هذا هو الحارس الذي يفحص هل المستخدم سجل دخوله أم لا

  const whatsappNumber = "213XXXXXXXXX"; // استبدل XXXXXXXXX برقمك الحقيقي
  const message = `مرحباً "سوق حياة"، أود طلب منتج: ${name} بسعر ${price} دج`;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // هذه هي الوظيفة التي تمنع الطلب إذا لم يكن هناك تسجيل دخول
  const handleOrderClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault(); // نمنع فتح رابط الواتساب
      navigate("/auth");   // نرسل المستخدم لصفحة التسجيل مباشرة
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all active:scale-[0.98]">
      {/* صورة المنتج */}
      <img src={image} alt={name} className="w-full h-40 object-cover" />
      
      <div className="p-3 text-right" dir="rtl">
        {/* اسم المنتج */}
        <h3 className="text-sm font-bold text-[#191970] mb-1 truncate">{name}</h3>
        
        {/* السعر والولاية */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-black text-[#191970]">{price} دج</span>
          <div className="flex items-center text-gray-400 text-[10px]">
            <MapPin className="w-3 h-3 ml-0.5" />
            {location}
          </div>
        </div>

        {/* زر الطلب الذكي */}
        <a 
          href={whatsappUrl}
          onClick={handleOrderClick}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#191970] text-white py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          طلب عبر واتساب
        </a>
      </div>
    </div>
  );
};
