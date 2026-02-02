import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { Search, Gift, Trophy, Zap, Copy, Sparkles } from "lucide-react";

const Index = () => {
  const { products } = useStore();

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-28 font-sans text-right" dir="rtl">
      <Header />
      
      {/* الهيدر الاحترافي - أزرق ليلي */}
      <div className="bg-[#191970] pt-6 pb-20 px-4 rounded-b-[50px] shadow-2xl relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 p-1.5 rounded-lg rotate-12 shadow-lg">
              
            
            <img src="/logo.png" alt="Hayat Shop" className="h-10 w-auto" />
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2">
            <span className="text-blue-200 text-[10px]">رصيدك:</span>
            <span className="text-amber-400 font-bold">0.00 د.ج</span>
          </div>
        </div>

        <div className="relative z-10">
          <input 
            type="text" 
            placeholder="ابحث عن هدايا ومنتجات..." 
            className="w-full p-4 pr-12 rounded-2xl border-none shadow-2xl focus:ring-4 focus:ring-amber-400/50 text-sm"
          />
          <Search className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* قسم المكافآت - ستايل تيمو المغري */}
      <div className="px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-[32px] shadow-xl border border-amber-100 overflow-hidden">
          <div className="bg-gradient-to-l from-[#FFD700] via-[#FFA500] to-[#FF8C00] p-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <Gift className="w-6 h-6 animate-bounce" />
              <h3 className="font-black text-lg">هدايا كاش!</h3>
            </div>
            <div className="bg-[#191970] text-amber-400 text-[10px] px-3 py-1 rounded-full font-bold">عرض حصري</div>
          </div>
          
          <div className="p-6 text-center">
            <p className="text-gray-500 text-xs mb-3">استخدم كود صديق واحصل على <span className="text-[#191970] font-bold">15 د.ج</span> فوراً</p>
            <div className="flex gap-2 mb-4">
              <input 
                type="text" 
                placeholder="أدخل الكود هنا" 
                className="flex-1 bg-gray-50 border-2 border-dashed border-amber-300 rounded-xl px-4 text-center font-black text-[#191970]"
              />
              <button className="bg-[#191970] text-white px-5 py-3 rounded-xl font-bold active:scale-95 transition-all">تفعيل</button>
            </div>
            <div className="flex items-center justify-center gap-2 bg-blue-50 py-2 rounded-lg cursor-pointer">
               <span className="text-[10px] text-gray-400">كودك:</span>
               <span className="text-[#191970] font-black text-sm uppercase">HAYAT187</span>
               <Copy className="w-3 h-3 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* عروض الصاعقة */}
      <div className="px-4 mt-8">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="fill-amber-400 text-amber-400 w-5 h-5" />
          <h2 className="font-black text-xl text-[#191970]">عروض اليوم</h2>
          <div className="mr-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded animate-pulse font-bold">نشط الآن</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Index;
