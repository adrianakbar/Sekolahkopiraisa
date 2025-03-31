"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({
  productItems,
}: {
  productItems: ProductProps[];
}) {
  return (
    <Swiper
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        1024: { slidesPerView: 2 },
        1280: { slidesPerView: 3 },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={false}
      pagination={{ clickable: false, enabled: false }}
      modules={[Autoplay, Navigation, Pagination]}
      className="w-full"
    >
      {productItems.map((product) => (
        <SwiperSlide key={product.id} className="">
          <div className="bg-[#F5EDE4] rounded-md shadow-md overflow-hidden">
            {/* Gambar Produk */}
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="object-cover w-full"
            />

            {/* Informasi Produk */}
            <div className="p-4">
              <h3 className="text-gray-900">{product.name}</h3>
              <p className="text-gray-700 mt-2">{product.price}</p>

              {/* Tombol Beli */}
              <div className="flex gap-3 justify-between">
                <button className="w-full mt-4 py-2 bg-[#613D2B] text-white font-medium rounded-md hover:-translate-y-1 duration-150 ease-in">
                  Beli Sekarang
                </button>
                <button className="mt-4 px-3 py-2 bg-[#613D2B] text-white font-medium rounded-md hover:-translate-y-1 duration-150 ease-in">
                  <ShoppingCart />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
