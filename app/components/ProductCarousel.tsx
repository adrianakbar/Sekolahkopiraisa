"use client";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductCarouselProps {
  id: number;
  name: string;
  price: string;
  image: string;
}

export default function ProductCarouselCard({
  productItems,
}: {
  productItems: ProductCarouselProps[];
}) {
  return (
    <Swiper
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        480: { slidesPerView: 1.5, spaceBetween: 16 },
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 24 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
        1280: { slidesPerView: 4, spaceBetween: 24 },
      }}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={false}
      pagination={false}
      modules={[Autoplay, Navigation, Pagination]}
      className="w-full pb-12"
    >
      {productItems.map((product) => (
        <SwiperSlide key={product.id} className="h-auto">
          <div className="bg-[#F5EDE4] rounded-xl shadow-md overflow-hidden h-full flex flex-col">
            {/* Gambar Produk */}
            <div className="relative aspect-square w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            {/* Informasi Produk */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-gray-900 line-clamp-2 text-sm md:text-base font-medium mb-1">{product.name}</h3>
              <p className="text-gray-700 font-semibold mt-auto mb-3">{product.price}</p>
              {/* Tombol Beli */}
              <div className="flex gap-2 justify-between mt-auto">
                <button className="w-full py-2 bg-[#613D2B] text-white text-sm md:text-base font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in">
                  Beli Sekarang
                </button>
                <button className="min-w-[44px] py-2 px-2 bg-[#613D2B] text-white font-medium rounded-xl hover:-translate-y-1 duration-150 ease-in flex items-center justify-center">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}