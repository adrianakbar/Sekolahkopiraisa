// app/produk/[id]/page.tsx (atau path yang sesuai)
"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
// Impor fungsi fetch API dan tipe ProductItem Anda
import { fetchProductById } from "@/app/utils/product"; // <--- SESUAIKAN PATH INI
import { ProductApi, ProductItem } from "@/app/types/productType"; // <--- SESUAIKAN PATH INI
import { formatCurrency } from "@/app/utils/helper";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/utils/cart";
import Popup from "@/app/components/Popup";

export default function ProductDetailPage() {
  const params = useParams();
  const productIdString = Array.isArray(params.id)
    ? params.id[0]
    : (params.id as string | undefined);

  const [product, setProduct] = useState<ProductApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("success");


  useEffect(() => {
    if (productIdString) {
      const loadProductData = async (idStr: string) => {
        setLoading(true);
        setError(null);
        setProduct(null); // Kosongkan produk saat memulai fetch baru

        const idNum = parseInt(idStr, 10);
        if (isNaN(idNum)) {
          setError("Format ID produk tidak valid.");
          setLoading(false);
          return;
        }

        try {
          console.log(`Mengambil produk dengan ID: ${idNum}`);
          // Panggil fungsi fetchProductById yang sebenarnya
          // Asumsi: fetchProductById mengembalikan objek seperti { message: "...", data: ProductItem }
          // atau langsung ProductItem. Kita akan coba asumsikan yang pertama.
          const apiResponse = await fetchProductById(idNum);

          // Cek apakah apiResponse memiliki properti 'data' dan itu adalah objek produknya
          // atau jika apiResponse itu sendiri adalah objek produknya.
          if (apiResponse && typeof apiResponse === "object") {
            if ("data" in apiResponse && typeof apiResponse.data === "object") {
              // Kasus: API mengembalikan { message: "...", data: ProductItem }
              setProduct(apiResponse.data as ProductItem);
            } else {
              // Kasus: API langsung mengembalikan ProductItem
              setProduct(apiResponse as ProductItem);
            }
          } else {
            throw new Error("Format respons API tidak dikenali.");
          }
        } catch (err: any) {
          console.error("Error di ProductPage dari fetchProductById:", err);
          let errorMessage =
            "Terjadi kesalahan yang tidak diketahui saat mengambil produk.";
          if (err && err.message) {
            errorMessage = err.message;
            // Anda bisa menambahkan logika untuk err.type atau err.errors di sini jika perlu
            if (err.type === "validation") {
              console.error("Detail Validasi:", err.errors);
            }
          }
          setError(errorMessage);
        } finally {
          setLoading(false);
        }
      };
      loadProductData(productIdString);
    } else if (!loading && params.id !== undefined) {
      // params.id ada tapi undefined/kosong setelah loading awal
      setError("ID produk tidak ditemukan di URL.");
      setLoading(false);
    }
  }, [productIdString]); // Efek bergantung pada productIdString

  useEffect(() => {
    setQuantity(1);
  }, [product]);

  const handleDecrementQuantity = () =>
    setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrementQuantity = () =>
    setQuantity((prev) => Math.min(product?.inventory?.stock || 99, prev + 1));

  const handleAddToCart = async (productId: number) => {
    try {
      // Panggil fungsi dari cart.ts, default quantity adalah 1
      const response = await addToCart(productId, quantity);
      setMessage(response.message);
      setPopupType("success");
      setShowPopup(true);
      // Di sini Anda bisa memanggil fungsi untuk memperbarui angka di ikon keranjang
      // Contoh: updateNavbarCartCount();
    } catch (error) {
      alert(
        `Gagal menambahkan produk ke keranjang. Silakan coba lagi. Product ID: ${productId}`
      );
      // Error sudah di-log di dalam file service, jadi di sini cukup notifikasi
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    console.log(`Beli sekarang: ${product.name}, Kuantitas: ${quantity}`);
    alert(`Anda akan membeli "${product.name}" (x${quantity})!`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-600">Memuat detail produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-md"
          role="alert"
        >
          <strong className="font-bold">Gagal Memuat Produk:</strong>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Silakan coba lagi nanti atau hubungi dukungan.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-600">Produk tidak ditemukan.</p>
      </div>
    );
  }

  // --- Mulai JSX untuk tampilan produk ---
  return (
    
    <div className="container mx-auto p-4 pt-20 bg-white">
      {showPopup && (
              <Popup
                message={message}
                type={popupType}
                onClose={() => setShowPopup(false)}
              />
            )}
      <div className="md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
        {/* Kolom Kiri: Gambar Produk Utama & Info Tambahan Statis */}
        <div className="md:col-span-7 lg:col-span-7">
          <div className="relative border border-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={
                product.image ||
                "https://via.placeholder.com/600x450.png?text=Gambar+Utama"
              }
              alt={product.name || "Gambar Produk"}
              className="w-full h-auto object-contain aspect-[4/3]"
            />
            <div className="absolute top-3 right-3 flex flex-col items-end gap-2">
              <button
                className="py-1 px-2 bg-black bg-opacity-40 text-white rounded-md hover:bg-opacity-60 text-xs font-semibold"
                title="Perbesar Gambar"
              >
                ZOOM
              </button>
              <div
                className="p-1.5 bg-green-600 text-white rounded-md text-xs font-bold w-10 h-10 flex items-center justify-center"
                title="Produk Halal"
              >
                HALAL
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Info Produk */}
        <div className="md:col-span-5 lg:col-span-5 mt-6 md:mt-0">
          {product.partner?.name && (
            <p className="text-sm text-gray-500 mb-1">
              by {product.partner.name}
            </p>
          )}
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2 leading-tight">
            {product.name || "Nama Produk Tidak Tersedia"}
          </h1>

          <div className="flex items-center mb-4">
            <p className="text-2xl sm:text-3xl font-bold text-amber-700 mr-3">
              {typeof product.price === "number"
                ? formatCurrency(product.price)
                : "Harga Tidak Tersedia"}
            </p>
            {typeof product.sold === "number" && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                {product.sold.toLocaleString("id-ID")} terjual
              </span>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-md font-semibold text-gray-700 mb-1">
              Deskripsi Produk
            </h2>
            <div className="prose prose-sm text-gray-600 max-w-none">
              <p className="whitespace-pre-line">
                {product.description || "Deskripsi tidak tersedia."}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-1">Jumlah</p>
            <div className="flex items-center border border-gray-300 rounded w-max">
              <button
                onClick={handleDecrementQuantity}
                disabled={quantity <= 1}
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Kurangi Kuantitas"
              >
                -
              </button>
              <input
                type="text"
                readOnly
                value={quantity}
                className="w-12 text-center border-l border-r border-gray-300 py-2 focus:outline-none bg-white"
                aria-label="Kuantitas Saat Ini"
              />
              <button
                onClick={handleIncrementQuantity}
                disabled={quantity >= (product.inventory?.stock || 99)}
                className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Tambah Kuantitas"
              >
                +
              </button>
            </div>
            {typeof product.inventory?.stock === "number" && (
              <p className="text-xs text-gray-500 mt-1">
                Stok tersedia: {product.inventory.stock}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleAddToCart(product.id ?? 0)}
              className="cursor-pointer bg-primary text-white py-2 px-3 text-sm rounded-xl hover:-translate-y-1 duration-150 ease-in flex justify-center gap-2 disabled:opacity-50"
            >
              <ShoppingCart size={18} />
              Masukkan Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="cursor-pointer bg-primary text-white py-2 px-3 text-sm rounded-xl hover:-translate-y-1 duration-150 ease-in flex justify-center items-center gap-2 disabled:opacity-50"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
