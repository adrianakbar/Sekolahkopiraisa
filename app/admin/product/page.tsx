"use client";

import ConfirmModal from "@/app/components/ConfirmModal";
import Popup from "@/app/components/Popup";
import ProductCardAdmin from "@/app/components/ProductCardAdmin";
import { Plus } from "lucide-react";

const products = Array(6).fill({
  image: "/assets/product1.png", // ganti dengan path image yang sesuai
  title: "KOPI RAISA – ARUTALA KOPI ROBUSTA",
  price: "Rp. 57,000",
});

export default function Product() {
  return (
    <div className="max-w-7xl mx-auto sm:p-3 min-h-screen">
      <div className="flex justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Daftar Produk
        </h1>
        <button className="bg-amber-950 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-xl flex items-center gap-2 hover:-translate-y-1 duration-150 ease-in text-sm sm:text-base">
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductCardAdmin
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
            onEdit={() => console.log("Edit", index)}
            onDelete={() => console.log("Delete", index)}
          />
        ))}
      </div>
    </div>
  );
}
