"use client";

import ConfirmModal from "@/app/components/ConfirmModal";
import Popup from "@/app/components/Popup";
import ProductListAdmin, {
  ProductListProps,
} from "@/app/components/ProductListAdmin";

import { deleteProduct, fetchAllProduct } from "@/app/utils/product";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Product() {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const router = useRouter();
  const [product, setProduct] = useState<ProductListProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleAddProduct = () => {
    router.push("/admin/product/create");
  };

  const handleDeleteProduct = async (id: number) => {
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

  const handleEditProduct = (id: number) => {
    router.push(`/admin/product/edit/${id}`);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchAllProduct();
        const rawData = response.data;
        const formattedData = rawData.map((item: any) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
        }));
        setProduct(formattedData);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto sm:p-3">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <ConfirmModal
        title="Hapus Berita"
        description="Apakah Anda yakin ingin menghapus berita ini?"
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setProductToDelete(null);
        }}
        onConfirm={() => {
          if (productToDelete !== null) {
            handleDeleteProduct(productToDelete);
          }
          setShowConfirmModal(false);
          setProductToDelete(null);
        }}
      />
      <div className="flex justify-between mb-4 sm:mb-6">
        <h1 className="text-lg font-medium text-gray-800">Daftar Produk</h1>
        <button className="bg-amber-950 text-white px-3 py-1.5 rounded-xl flex items-center gap-1 hover:-translate-y-1 duration-150 ease-in text-sm" onClick={handleAddProduct}>
          <Plus size={20} />
          <span>Tambah Produk</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {product.map((product, index) => (
          <ProductListAdmin
            key={index}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            onEdit={handleEditProduct}
            onDelete={(id) => {
              setProductToDelete(id);
              setShowConfirmModal(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}
