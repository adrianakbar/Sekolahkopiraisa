"use client";

import React from "react";
import { formatCurrency } from "../utils/helper"; // Pastikan helper ini ada dan berfungsi
import { ProductItem } from "../types/productType";

export default function ProductCard({
  id,
  image,
  name,
  price,
  sold,
  onView, // Tambahkan props untuk fungsi klik
}: ProductItem) {
  return (
    <div
      className="w-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col"
      onClick={() => onView?.(id ?? 0)}
    >
      {/* Kartu sekarang memiliki 'w-full' untuk mengisi lebar kolom grid dari parent.
        'flex flex-col' membantu mengatur layout internal secara vertikal.
      */}

      {/* Gambar Produk */}
      <div className="w-full aspect-[4/3] overflow-hidden">
        {/* Menggunakan div sebagai container untuk gambar dengan aspect ratio tetap.
          Ini memastikan semua kartu memiliki proporsi gambar yang sama.
        */}
        <img
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
          src={image}
          alt={name}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/320x240?text=Image+Not+Found"; // Placeholder jika gambar gagal dimuat
          }}
        />
      </div>

      {/* Detail Produk */}
      <div className="p-2 sm:p-3 flex flex-col flex-grow">
        {/* Padding responsif: p-2 untuk layar kecil, p-3 untuk sm ke atas.
          'flex flex-col flex-grow' membuat bagian ini mengisi sisa ruang vertikal jika ada.
        */}
        <h3
          className="text-sm text-gray-800 mb-1 truncate"
          title={name} // Menampilkan judul lengkap saat hover jika terpotong
        >
          {name}
        </h3>

        {/* Deskripsi bisa ditambahkan di sini jika ada, contoh:
        <p className="text-xs text-gray-600 mb-2 flex-grow h-10 overflow-hidden">
          Ini adalah deskripsi singkat produk yang bisa cukup panjang...
        </p> 
        Jika ada deskripsi, 'flex-grow' di atas dan 'mt-auto' di bawah akan lebih berguna.
        */}

        <div className="mt-auto">
          {" "}
          {/* Mendorong elemen di bawahnya ke bagian bawah kartu jika ada ruang ekstra dari flex-grow di atas */}
          <p className="text-xs text-gray-500 mb-1 sm:mb-2">
            {(sold ?? 0).toLocaleString("id-ID")} terjual
          </p>
          <p className="text-lg font-medium text-gray-900">
            {formatCurrency(price ?? 0)}
            {/* Asumsi formatCurrency dari utils/helper mengembalikan string seperti "Rp57.000" */}
          </p>
        </div>
      </div>
    </div>
  );
}
