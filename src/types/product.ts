export interface Product {
  id: string;
  title: string;
  price: number;
  condition: "new" | "used";
  wilaya: string;
  images: string[];
  sellerPhone: string;
  sellerId: string;
  createdAt: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}
