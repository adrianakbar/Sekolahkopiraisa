"use client";

import ConfirmModal from "@/app/components/ConfirmModal";
import Popup from "@/app/components/Popup";
import ProductListAdmin from "@/app/components/ProductListAdmin";

import { deleteProduct } from "@/app/utils/product";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const products = Array(6).fill({
  image: "/assets/product1.png", // ganti dengan path image yang sesuai
  title: "KOPI RAISA – ARUTALA KOPI ROBUSTA",
  price: "Rp. 57,000",
});

export default function Product() {
  const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [popupType, setPopupType] = useState<"success" | "error">("success");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const router = useRouter();
    const [product, setProduct] = useState(products);


  const handleAddActivity = () => {
    router.push("/admin/product/create");
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      const response = await deleteProduct(id);
      if (response) {
        setProduct((prev) => prev.filter((a) => a.id !== id));
        setMessage(response.message);
        setPopupType("success");
        setShowPopup(true);
      }
    } catch (error: any) {
      setMessage(error.message || "Terjadi kesalahan saat menghapus.");
      setPopupType("error");
      setShowPopup(true);
    }
  };

  const handleEditActivity = (id: number) => {
    router.push(`/admin/activity/edit/${id}`);
  };


  return (
    <div className="max-w-7xl mx-auto sm:p-3 min-h-screen">
      <div className="flex justify-between mb-4 sm:mb-6">
        <h1 className="text-lg font-medium text-gray-800">Daftar Produk</h1>
        <button className="bg-amber-950 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 hover:-translate-y-1 duration-150 ease-in text-sm">
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <ProductListAdmin
            key={index}
            image={product.image}
            title={product.title}
            price={product.price}
            onEdit={() => console.log("Edit", index)}
            onDelete={() => console.log("Delete", index)}
            id={0}
          />
        ))}
      </div>
    </div>
  );
}
