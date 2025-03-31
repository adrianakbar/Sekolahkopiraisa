"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ActivityProps {
  id: number;
  image: string;
  title: string;
}

export default function ActivityCard({
  activityItems,
}: {
  activityItems: ActivityProps[];
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
      {activityItems.map((activity) => (
        <SwiperSlide key={activity.id} className="rounded-md overflow-hidden shadow-md">
          {/* Gambar */}
          <Image
            src={activity.image}
            alt={activity.title}
            width={300}
            height={200}
            className="object-cover w-full"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="">{activity.title}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );

  //   <div className="relative w-100 h-100 rounded-md overflow-hidden shadow-md">
  //     {/* Gambar */}
  //     <Image
  //       src={image}
  //       alt={title}
  //       width={400}
  //       height={300}
  //       className=""
  //     />

  //     {/* Overlay */}
  //     <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
  //     <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
  //       <p className="">{title}</p>
  //     </div>
  //   </div>
  // );
}
