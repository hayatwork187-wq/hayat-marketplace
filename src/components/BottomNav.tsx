import { Home, Search, PlusCircle, MessageCircle, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
      <div className="bg-[#191970]/90 backdrop-blur-xl border border-white/20 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] px-6 py-3 flex justify-between items-center">
        
        {/* الرئيسية */}
        <Link to="/" className="relative flex flex-col items-center gap-1 group">
          <Home className={`w-6 h-6 transition-all duration-300 ${isActive("/") ? "text-amber-400 scale-110" : "text-white/60"}`} />
          {isActive("/") && <span className="absolute -bottom-1 w-1 h-1 bg-amber-400 rounded-full"></span>}
        </Link>

        {/* الرسائل */}
        <Link to="/messages" className="relative flex flex-col items-center gap-1 group">
          <MessageCircle className={`w-6 h-6 transition-all duration-300 ${isActive("/messages") ? "text-amber-400 scale-110" : "text-white/60"}`} />
          {isActive("/messages") && <span className="absolute -bottom-1 w-1 h-1 bg-amber-400 rounded-full"></span>}
        </Link>

        {/* زر الإضافة - مركزي ومميز */}
        <Link to="/sell" className="relative -mt-12 bg-gradient-to-tr from-amber-400 to-orange-500 p-4 rounded-full shadow-[0_10px_20px_rgba(251,191,36,0.4)] border-4 border-[#F0F2F5] active:scale-90 transition-all">
          <PlusCircle className="w-8 h-8 text-[#191970]" />
        </Link>

        {/* البحث */}
        <Link to="/search" className="relative flex flex-col items-center gap-1 group">
          <Search className={`w-6 h-6 transition-all duration-300 ${isActive("/search") ? "text-amber-400 scale-110" : "text-white/60"}`} />
          {isActive("/search") && <span className="absolute -bottom-1 w-1 h-1 bg-amber-400 rounded-full"></span>}
        </Link>

        {/* البروفايل */}
        <Link to="/auth" className="relative flex flex-col items-center gap-1 group">
          <User className={`w-6 h-6 transition-all duration-300 ${isActive("/profile") ? "text-amber-400 scale-110" : "text-white/60"}`} />
          {isActive("/auth") && <span className="absolute -bottom-1 w-1 h-1 bg-amber-400 rounded-full"></span>}
        </Link>

      </div>
    </div>
  );
};
