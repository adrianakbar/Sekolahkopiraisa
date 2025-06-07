"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchAllProduct } from "@/app/utils/product";
import { ProductItem } from "@/app/types/productType";
import { formatCurrency } from "@/app/utils/helper";

export default function ProductPage() {
  const params = useParams();
  const id = Number(params?.id);
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetchAllProduct();
      const item = response.data.find((p: any) => p.id === id);
      if (item) {
        setProduct({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          stock: item.inventory.stock,
          description: item.description,
          partnerName: item.partner.name,
        });
      }
      setLoading(false);
    };
    getProduct();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!product)
    return <div className="p-6 text-center">Produk tidak ditemukan.</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Product Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <div className="bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-xl w-full h-full max-h-96 object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col p-6 justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 uppercase">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-4">by {product.partnerName}</p>

            <p className="text-3xl font-semibold text-amber-900 mb-2">
              {formatCurrency(product.price ?? 0)}
            </p>

            <div className="flex items-center gap-4 mt-2">
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Stok: {product.stock}
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                Grade Komersil
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white rounded-2xl shadow-md mt-8 p-6">
        <h2 className="text-lg font-bold mb-3 text-gray-800">Deskripsi Produk</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description}
        </p>
      </div>
    </div>
  );
}
