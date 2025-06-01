"use client";

import { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Pastikan path ini benar
import { fetchAllProduct } from "../utils/product"; // Pastikan path ini benar
import { ProductItem } from "../types/productType";
import { useRouter } from "next/navigation";
// Mendefinisikan tipe untuk satu item produk dari API

export default function ProductPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleViewDetails = (id: number) => {
    router.push(`/product/${id}`);
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiResult = await fetchAllProduct();

        if (apiResult && apiResult.data) {
          setProducts(apiResult.data);
        } else {
          setProducts([]);
          console.warn(
            "Struktur data dari fetchAllProduct tidak sesuai harapan:",
            apiResult
          );
        }
      } catch (err: any) {
        console.error("Error di ProductPage dari fetchAllProduct:", err);
        let errorMessage =
          "Terjadi kesalahan yang tidak diketahui saat mengambil produk.";
        if (err && err.message) {
          errorMessage = err.message;
          if (err.type === "validation" && err.errors) {
            console.error("Detail Validasi:", err.errors);
          } else if (err.type === "network") {
            console.warn("Terdeteksi error jaringan dari fetchAllProduct");
          }
        } else if (typeof err === "string") {
          errorMessage = err;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-600">Memuat produk...</p>
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
          <strong className="font-bold">Gagal memuat produk:</strong>
          <p>{error}</p>
          <p className="text-sm mt-2">
            Silakan coba lagi nanti atau hubungi dukungan.
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-600">
          Tidak ada produk yang ditemukan.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 pt-20 bg-gray-100 min-h-screen">
      {/* Container utama halaman dengan padding responsif */}
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6">
        {/*
          Grid responsif:
          - 1 kolom secara default (untuk layar sangat kecil jika xs tidak tercapai)
          - xs:grid-cols-2: 2 kolom untuk layar extra small (breakpoint 'xs' kustom jika ada, atau sesuaikan jika 'sm' adalah yg terkecil)
                           Jika Anda tidak memiliki breakpoint 'xs' kustom di Tailwind, Anda bisa mulai dari 'sm'.
                           Untuk Tailwind default, 'sm' adalah 640px. Anda bisa menggunakan grid-cols-2 langsung jika tidak ada layar lebih kecil dari itu.
                           Saya akan asumsikan Anda mungkin ingin 2 kolom bahkan di bawah 'sm' jika memungkinkan.
                           Jika 'xs' tidak ada di konfigurasi Tailwind Anda, 'grid-cols-2' akan menjadi default sebelum 'sm'.
                           Untuk kejelasan, mari kita mulai dengan 2 kolom sebagai basis jika ruang memungkinkan, dan tingkatkan.
                           Mari kita sederhanakan: mulai dari 2 kolom jika muat, lalu tingkatkan.
        */}
        {/* Versi Grid yang lebih umum dan standar Tailwind: */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6"> */}
        {/* Versi grid yang dimulai dari 1 kolom di layar terkecil: */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id} // Menggunakan product.id untuk prop id
            image={product.image}
            name={product.name}
            // Deskripsi tidak diteruskan karena ProductCard saat ini tidak menerimanya.
            // Jika ingin menampilkan deskripsi, ProductCard perlu diubah.
            // description={product.description}
            sold={product.sold}
            price={product.price}
            onView={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}
