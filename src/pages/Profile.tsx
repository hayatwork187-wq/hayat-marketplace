import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { Edit2, Mail, Phone, MapPin, Check, Trash2, BadgeCheck, Camera } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Profile = () => {
  const { user, updateUser, getUserProducts, deleteProduct } = useStore();
  const userProducts = getUserProducts();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editPhone, setEditPhone] = useState(user.phone);
  const [editAvatar, setEditAvatar] = useState(user.avatar || "");

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateUser({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      avatar: editAvatar.trim() || undefined,
    });

    setIsEditOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    toast.success("Product deleted");
  };

  return (
    <div className="page-container">
      <Header title="Profile" showSearch={false} />

      {/* Profile Identity Card */}
      <div className="px-4 py-6">
        <div className="bg-card rounded-2xl overflow-hidden shadow-card">
          {/* Header Banner */}
          <div className="h-20 bg-gradient-to-r from-primary to-primary/80" />
          
          {/* Profile Content */}
          <div className="px-5 pb-5 -mt-10">
            {/* Avatar & Edit */}
            <div className="flex items-end justify-between mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary ring-4 ring-card shadow-lg">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-3xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors shadow-md">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                </DialogTrigger>
                <DialogContent className="mx-4 max-w-sm rounded-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary ring-2 ring-border">
                          {editAvatar ? (
                            <img
                              src={editAvatar}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-2xl font-bold">
                              {editName.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <label className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors shadow-md">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                      <span className="text-xs text-muted-foreground">Tap to change photo</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="form-input"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="form-input"
                        placeholder="+213 XXX XXX XXX"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={() => setIsEditOpen(false)}
                        className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Name & Verified Badge */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <BadgeCheck className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Active Seller</span>
            </div>

            {/* User Info Cards */}
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{user.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{user.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-medium text-foreground">Algiers, Algeria</p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="mt-4 pt-4 border-t border-border flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{userProducts.length}</div>
                <div className="text-xs text-muted-foreground">Listings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-whatsapp">Active</div>
                <div className="text-xs text-muted-foreground">Status</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Listings Section */}
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold text-foreground">My Listings</h2>
        <p className="text-sm text-muted-foreground">
          {userProducts.length} product{userProducts.length !== 1 ? "s" : ""} listed
        </p>
      </div>

      {userProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 px-4 pb-4">
          {userProducts.map((product, index) => (
            <div key={product.id} className="relative animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
              <ProductCard product={product} index={index} />
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-10"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
            <span className="text-4xl">🏷️</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">No listings yet</h3>
          <p className="text-sm text-muted-foreground text-center mb-4">
            Start selling by adding your first product!
          </p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;
