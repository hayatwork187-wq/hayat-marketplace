import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { useStore } from "@/store/useStore";
import { wilayas } from "@/data/products";
import { Camera, X, Plus, Check } from "lucide-react";
import { toast } from "sonner";

const Sell = () => {
  const navigate = useNavigate();
  const { addProduct, user } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<"new" | "used">("new");
  const [wilaya, setWilaya] = useState("");
  const [phone, setPhone] = useState(user.phone);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 10 - images.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a product title");
      return;
    }

    if (!price || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    if (!wilaya) {
      toast.error("Please select your Wilaya");
      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }

    setIsSubmitting(true);

    const newProduct = {
      id: Date.now().toString(),
      title: title.trim(),
      price: parseFloat(price),
      condition,
      wilaya,
      images,
      sellerPhone: phone,
      sellerId: user.id,
      createdAt: new Date().toISOString(),
    };

    addProduct(newProduct);

    setTimeout(() => {
      toast.success("Product listed successfully! 🎉");
      navigate("/profile");
    }, 500);
  };

  return (
    <div className="page-container">
      <Header title="Sell Product" showSearch={false} />

      <form onSubmit={handleSubmit} className="px-4 py-4 space-y-5">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Photos ({images.length}/10)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-secondary">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {images.length < 10 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 hover:border-primary hover:bg-accent transition-colors"
              >
                <Plus className="w-6 h-6 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Add</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Product Title */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., iPhone 14 Pro Max 256GB"
            className="form-input"
            maxLength={100}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Price (DZD)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 150000"
            className="form-input"
            min="0"
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Condition
          </label>
          <div className="flex gap-3">
            {(["new", "used"] as const).map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => setCondition(cond)}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  condition === cond
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {condition === cond && <Check className="w-4 h-4" />}
                {cond === "new" ? "New" : "Used"}
              </button>
            ))}
          </div>
        </div>

        {/* Wilaya */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Wilaya (Province)
          </label>
          <select
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            className="form-input appearance-none bg-card"
          >
            <option value="">Select your Wilaya</option>
            {wilayas.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+213555123456"
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Camera className="w-5 h-5" />
              Publish Listing
            </>
          )}
        </button>
      </form>

      <BottomNav />
    </div>
  );
};

export default Sell;
