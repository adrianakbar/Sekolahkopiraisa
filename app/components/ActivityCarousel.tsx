"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ActivityCarouselProps {
  id: number;
  image: string;
  title: string;
}

export default function ActivityCarousel({
  activityItems,
}: {
  activityItems: ActivityCarouselProps[];
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
        1280: { slidesPerView: 3, spaceBetween: 24 },
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
      {activityItems.map((activity) => (
        <SwiperSlide key={activity.id} className="relative rounded-md overflow-hidden shadow-md aspect-[4/3]">
          {/* Gambar */}
          <div className="relative w-full h-full">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white">
              <p className="text-sm md:text-base line-clamp-2 md:line-clamp-3">{activity.title}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}