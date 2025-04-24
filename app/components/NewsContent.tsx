import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Impor Swiper styles
import "swiper/css/navigation"; // Impor navigation styles
import "swiper/css/pagination"; // Impor pagination styles
import { Navigation } from "swiper/modules"; // <== Tambahkan ini!
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

interface NewsContentProps {
  activity: {
    title: string;
    content: string;
    created_at: string;
    newsMedia?: { media_url: string }[];
  };
}

const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `Pada ${dayName}, ${day} ${month} ${year} ${hours}:${minutes}`;
};

export default function NewsContent({ activity }: NewsContentProps) {
  if (!activity) return null;
  console.log(activity.content);

  const images = activity.newsMedia?.map((media) => media.media_url);

  return (
    <div className="mb-10">
      <h1 className="text-lg font-medium mb-2">
        {activity.title}
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        {formatFullDate(activity.created_at)}
      </p>

      {/* Carousel */}
      {images && images.length > 1 ? (
        <div className="relative mb-6">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-64 md:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Arrows */}
          <button
            className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-primary bg-opacity-80 hover:bg-opacity-100 transition p-2 rounded-full shadow-md"
            aria-label="Previous slide"
          >
            <CircleArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button
            className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-primary bg-opacity-80 hover:bg-opacity-100 transition p-2 rounded-full shadow-md"
            aria-label="Next slide"
          >
            <CircleArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      ) : (
        // If only one image
        images &&
        images.length === 1 && (
          <div className="relative w-full h-64 md:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src={images[0]}
              alt={activity.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-3xl text-justify text-sm">
        <div dangerouslySetInnerHTML={{ __html: activity.content }} />
      </div>
    </div>
  );
}
