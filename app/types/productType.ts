import { Partner } from "./partnerType";

export interface ProductItem {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  inventory?: string;
  stock?: number;
  partner?: Partner;
  partnerName?: string;
  sold?: number;
  onView?: (id: number) => void; // Tambahkan fungsi untuk menangani klik pada detail produk
}
