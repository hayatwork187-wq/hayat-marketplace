import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/store/useStore";
import { Edit2, Mail, Phone, X, Check, Trash2 } from "lucide-react";
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

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    updateUser({
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
    });

    setIsEditOpen(false);
    toast.success("Profile updated successfully!");
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId);
    toast.success("Product deleted");
  };

  return (
    <div className="page-container">
      <Header title="Profile" showSearch={false} />

      {/* Profile Card */}
      <div className="px-4 py-4">
        <div className="bg-card rounded-2xl p-5 shadow-card">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary ring-4 ring-primary/20">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary text-primary-foreground text-2xl font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-1">{user.name}</h2>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="w-3.5 h-3.5" />
                <span>{user.phone}</span>
              </div>
            </div>

            {/* Edit Button */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
              <DialogTrigger asChild>
                <button className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-accent transition-colors">
                  <Edit2 className="w-5 h-5 text-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="mx-4 max-w-sm rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="form-input"
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
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setIsEditOpen(false)}
                      className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-accent transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
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
              <div className="text-2xl font-bold text-primary">Active</div>
              <div className="text-xs text-muted-foreground">Status</div>
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
        <div className="grid grid-cols-2 gap-3 px-4">
          {userProducts.map((product, index) => (
            <div key={product.id} className="relative">
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
