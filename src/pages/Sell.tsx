import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, Check, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const Sell = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"new" | "used">("new");
  const [wilaya, setWilaya] = useState("");
  const [phone, setPhone] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && images.length + files.length <= 5) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    } else if (files) {
      toast.error("الحد الأقصى 5 صور فقط");
    }
  };

  const handlePublish = () => {
    if (images.length === 0 || !price || !wilaya || !phone) {
      toast.error("يرجى ملء جميع الحقول ورفع صورة واحدة على الأقل");
      return;
    }
    toast.success("تم نشر منتجك بنجاح!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white pb-24 text-right" dir="rtl">
      <Header />
      <main className="p-4 max-w-md mx-auto space-y-6">
        <h2 className="text-xl font-black text-[#191970]">أضف منتجك للبيع</h2>
        <div className="grid grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div key={i} className="aspect-square rounded-xl border overflow-hidden relative">
              <img src={img} className="w-full h-full object-cover" />
            </div>
          ))}
          {images.length < 5 && (
            <button onClick={() => fileInputRef.current?.click()} className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-gray-400 bg-gray-50">
              <Camera className="w-6 h-6" />
              <span className="text-[10px] mt-1">إضافة صورة</span>
            </button>
          )}
        </div>
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple className="hidden" accept="image/*" />
        <input type="number" placeholder="السعر (دج)" className="w-full p-4 bg-gray-50 rounded-2xl" value={price} onChange={(e)=>setPrice(e.target.value)} />
        <div className="grid grid-cols-2 gap-2">
          <button onClick={()=>setCondition("new")} className={`p-3 rounded-xl font-bold transition-all ${condition === 'new' ? 'bg-[#191970] text-white' : 'bg-gray-50 text-gray-400'}`}>جديد</button>
          <button onClick={()=>setCondition("used")} className={`p-3 rounded-xl font-bold transition-all ${condition === 'used' ? 'bg-[#191970] text-white' : 'bg-gray-50 text-gray-400'}`}>مستعمل</button>
        </div>
        <input type="text" placeholder="الولاية" className="w-full p-4 bg-gray-50 rounded-2xl" value={wilaya} onChange={(e)=>setWilaya(e.target.value)} />
        <input type="tel" placeholder="رقم واتساب" className="w-full p-4 bg-gray-50 rounded-2xl" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        <button onClick={handlePublish} className="w-full bg-[#191970] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100">نشر المنتج الآن</button>
      </main>
      <BottomNav />
    </div>
  );
};

export default Sell;
