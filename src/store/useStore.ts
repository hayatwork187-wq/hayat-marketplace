import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, User } from "@/types/product";
import { sampleProducts } from "@/data/products";

interface AppState {
  products: Product[];
  user: User;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateUser: (user: Partial<User>) => void;
  getUserProducts: () => Product[];
}

const defaultUser: User = {
  id: "user1",
  name: "Ahmed Benali",
  email: "ahmed@example.com",
  phone: "+213555123456",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      products: sampleProducts,
      user: defaultUser,
      addProduct: (product) =>
        set((state) => ({
          products: [product, ...state.products],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      updateUser: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),
      getUserProducts: () => {
        const state = get();
        return state.products.filter((p) => p.sellerId === state.user.id);
      },
    }),
    {
      name: "hayat-shop-storage",
    }
  )
);
