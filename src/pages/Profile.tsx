import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import { BadgeCheck, Settings, Mail, Phone, ShoppingBag } from "lucide-react";

const Profile = () => {
  const { user } = useStore();

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-right" dir="rtl">
      <Header />
      
      {/* رأس الصفحة باللون الأزرق الليلي الفخم */}
      <div className="bg-[#191970] pt-12 pb-24 px-6 text-white rounded-b-[40px] shadow-2xl relative">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400"} 
              className="w-28 h-28 rounded-full border-4 border-white/30 shadow-2xl"
              alt="Profile"
            />
            <div className="absolute bottom-1 right-1 bg-emerald-500 p-1.5 rounded-full border-4 border-[#191970]">
              <BadgeCheck className="w-5 h-5 text-white" />
            </div>
          </div>
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight">{user?.name || "مستعمل حياة"}</h2>
          <p className="text-blue-200/80 text-sm mt-1">تاجر موثوق في سوق حياة</p>
        </div>
      </div>

      {/* بطاقة المعلومات والخيارات */}
      <div className="px-6 -mt-12">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-blue-50/50">
          <div className="grid grid-cols-2 gap-6 mb-8 text-center border-b border-gray-100 pb-8">
            <div className="p-3 bg-blue-50/50 rounded-2xl">
              <p className="text-[#191970] font-black text-2xl">0</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider">إعلاناتي</p>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-2xl">
              <p className="text-[#191970] font-black text-2xl">0</p>
              <p className="text-gray-500 text-[10px] uppercase tracking-wider">المشاهدات</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/50">
              <div className="bg-white p-2 rounded-lg shadow-sm text-[#191970]">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-gray-700 font-medium">{user?.email || "البريد غير متوفر"}</span>
            </div>
          </div>

          <button className="w-full mt-10 bg-[#191970] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
            <Settings className="w-5 h-5" />
            تعديل حسابي الشخصي
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
