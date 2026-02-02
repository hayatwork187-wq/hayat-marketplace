import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { Search, Share2, Users } from "lucide-react";

const Index = () => {
  const { products } = useStore();

  // وظيفة مشاركة الرابط الحقيقي
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'سوق حياة',
        text: 'انضم إلي في تطبيق سوق حياة واحصل على أفضل المنتجات والأسعار! حمل التطبيق من هنا:',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] pb-28 font-sans text-right" dir="rtl">
      
      {/* الجزء العلوي الثابت (Sticky Header) - يشمل الشعار، الرصيد، البحث، والفئات */}
      <div className="sticky top-0 z-50 shadow-xl">
        <Header />
        
        {/* الهيدر الأزرق الداكن */}
        <div className="bg-[#191970] pt-4 pb-4 px-4 rounded-b-[30px] relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            {/* الشعار المرفوع مسبقاً */}
            <img src="/logo.png" alt="Hayat Shop" className="h-10 w-auto" />
            
            {/* خانة الرصيد الافتراضي 10 دج */}
            <div className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20">
              <span className="text-blue-200 text-[9px] block">رصيدك الحالي</span>
              <span className="text-amber-400 font-bold text-md leading-tight">10.00 دج</span>
            </div>
          </div>

          {/* شريط البحث الثابت */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="ابحث عن هدايا ومنتجات..."
              className="w-full p-3 pr-11 rounded-xl border-none shadow-lg focus:ring-2 focus:ring-amber-400 text-sm"
            />
            <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
          </div>

          {/* شريط الفئات (التصنيفات) القابل للتمرير */}
          <div className="flex overflow-x-auto gap-2 py-1 no-scrollbar">
            {["الكل", "رجال", "نساء", "أطفال", "تجميل", "مجوهرات", "رياضة", "إلكترونيات", "ألعاب", "هواتف", "سيارات"].map((cat) => (
              <button key={cat} className="whitespace-nowrap px-5 py-1.5 rounded-full bg-white/20 backdrop-blur-lg text-white text-xs border border-white/10 hover:bg-amber-400 hover:text-[#191970] transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* الجزء القابل للتمرير (المحتوى) */}
      <main className="px-4 mt-6">
        
        {/* نظام دعوة الأصدقاء الجديد */}
        <div className="bg-white rounded-[25px] p-5 shadow-md border border-amber-100 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-2 rounded-xl">
              <Users className="text-amber-600 w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#191970] text-sm">أدعُ صديق بمشاركة الرابط</h3>
              <p className="text-gray-500 text-[10px]">واحصل على 5 دينار جزائري عن كل مشترك</p>
            </div>
          </div>
          
          <button 
            onClick={handleShare}
            className="w-full bg-[#191970] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Share2 className="w-4 h-4" />
            مشاركة رابط التطبيق الآن
          </button>
          
          <p className="text-[9px] text-gray-400 mt-2 text-center italic">
            * يتم الحصول على المبلغ بعد تنزيل أو تثبيت التطبيق عند المدعو لتفادي الاشتراكات الوهمية.
          </p>
        </div>

        {/* شبكة عرض المنتجات */}
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              // ملاحظة: تأكد من إضافة 'location' للمنتجات في قاعدة بياناتك لتظهر الولاية
            />
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
