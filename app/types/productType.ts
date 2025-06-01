export interface ProductItem {
  id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  partnerId?: number;
  createdAt?: string;
  updatedAt?: string;
  inventory?: {
    stock: number;
  };
  partner?: {
    id: number;
    name: string;
    ownerName: string;
    phoneNumber: string;
    address: string;
  };
  sold?: number;
  onView?: (id: number) => void; // Tambahkan fungsi untuk menangani klik pada detail produk
}
