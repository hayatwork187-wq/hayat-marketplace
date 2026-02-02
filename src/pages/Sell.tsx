import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X, Plus, Check, MapPin, Phone, Tag } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";

const Sell = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // حالات المدخلات
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"new" | "used">("new");
  const [wilaya, setWilaya] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // معالجة رفع الصور (بحد أقصى 5)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (images.length + files.length > 5) {
        toast.error("يمكنك إضافة 5 صور كحد أقصى");
        return;
      }
      
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  // وظيفة النشر مع فحص الشروط
  const handlePublish = async () => {
    if (images.length === 0) return toast.error("يرجى إضافة صورة واحدة على الأقل");
    if (!title) return toast.error("يرجى كتابة اسم المنتج");
    if (!price) return toast.error("يرجى تحديد السعر");
    if (!wilaya) return toast.error("يرجى تحديد الولاية");
    if (!phone) return toast.error("يرجى إضافة رقم واتساب");

    setIsSubmitting(true);
    
    // محاكاة عملية النشر
    setTimeout(() => {
      toast.success("تم نشر منتجك بنجاح!");
      setIsSubmitting(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24" dir="rtl">
      <Header />
      
      <main className="p-4 max-w-md mx-auto space-y-6">
        <h1 className="text-xl font-black text-[#191970] text-right">ماذا تود أن تبيع؟</h1>

        {/* قسم رفع الصور */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-700 text-right">صور المنتج ({images.length}/5)</label>
          <div className="grid grid-cols-3 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border">
                <img src={img} className="w-full h-full object-cover" />
                <button onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 5 && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 bg-white hover:bg-gray-50 transition-all"
              >
                <Camera className="w-6 h-6" />
                <span className="text-[10px] mt-1 font-bold">إضافة صورة</span>
              </button>
            )}
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} multiple className="hidden" accept="image/*" />
        </div>

        {/* نموذج البيانات */}
        <div className="space-y-4">
          <input 
            type="text" placeholder="اسم المنتج" 
            className="w-full p-4 rounded-2xl bg-white border-none shadow-sm text-right"
            value={title} onChange={(e) => setTitle(e.target.value)}
          />

          <div className="relative">
            <span className="absolute left-4 top-4 text-gray-400 font-bold">دج</span>
            <input 
              type="number" placeholder="السعر" 
              className="w-full p-4 rounded-2xl bg-white border-none shadow-sm text-right pr-4"
              value={price} onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => setCondition("new")}
              className={`p-3 rounded-2xl font-bold transition-all ${condition === 'new' ? 'bg-[#191970] text-white' : 'bg-white text-gray-500 shadow-sm'}`}
            >جديد</button>
            <button 
              onClick={() => setCondition("used")}
              className={`p-3 rounded-2xl font-bold transition-all ${condition === 'used' ? 'bg-[#191970] text-white' : 'bg-white text-gray-500 shadow-sm'}`}
            >مستعمل</button>
          </div>

          <div className="relative">
            <MapPin className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="text" placeholder="الولاية" 
              className="w-full p-4 pr-12 rounded-2xl bg-white border-none shadow-sm text-right"
              value={wilaya} onChange={(e) => setWilaya(e.target.value)}
            />
          </div>

          <div className="relative">
            <Phone className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
            <input 
              type="tel" placeholder="رقم واتساب" 
              className="w-full p-4 pr-12 rounded-2xl bg-white border-none shadow-sm text-right"
              value={phone} onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* زر النشر النهائي */}
        <button 
          onClick={handlePublish}
          disabled={isSubmitting}
          className="w-full bg-[#191970] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? "جاري النشر..." : "نشر المنتج الآن"}
          <Check className="w-5 h-5" />
        </button>
      </main>

      <BottomNav />
    </div>
  );
};

export default Sell;
