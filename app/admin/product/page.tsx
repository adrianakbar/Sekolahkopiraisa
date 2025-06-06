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
  
  const handleViewProduct = (id: number) => {
    router.push(`/admin/product/${id}`);
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
    const popupData = sessionStorage.getItem("popup");
    if (popupData) {
      const { message, type } = JSON.parse(popupData);
      setMessage(message);
      setPopupType(type);
      setShowPopup(true);
      sessionStorage.removeItem("popup");
    }
  }, []);

  
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
          stock: item.inventory.stock
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
    <div className="container mx-auto">
      {showPopup && (
        <Popup
          message={message}
          type={popupType}
          onClose={() => setShowPopup(false)}
        />
      )}
      <ConfirmModal
        title="Yakin Menghapus Produk?"
        description="Tindakan ini tidak dapat dibatalkan. Produk yang dihapus akan secara permanen terhapus dari sistem."
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
        <button className="cursor-pointer bg-amber-950 text-white px-3 py-2 rounded-xl flex items-center gap-1 hover:-translate-y-1 duration-150 ease-in text-sm" onClick={handleAddProduct}>
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
            stock={product.stock}
            onView={handleViewProduct}
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
