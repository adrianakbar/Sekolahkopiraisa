"use client";

import Image from "next/image";
import ProductCard, { ProductCarouselProps } from "./components/ProductCarousel";
import Footer from "./components/Footer";
import ImageAboutus from "./components/ImageAboutus";
import { useEffect, useState } from "react";
import { fetchAllActivity } from "./utils/activity";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ActivityCarousel from "./components/ActivityCarousel";
import { fetchAllProduct } from "./utils/product";
import { get } from "http";

interface ActivityItemApi {
  id: number;
  title: string;
  image: string;
}

export default function Home() {
  const [activities, setActivities] = useState<ActivityItemApi[]>([]);
  const [products, setProducts] = useState<ProductCarouselProps[]>([]);

  const router = useRouter();

  const handleActivityClick = (id: number) => {
    router.push(`/activity/${id}`);
  };

  const getActivities = async () => {
    try {
      const response = await fetchAllActivity();
      const rawData = response.data;

      // Sort by created_at date in descending order (newest first)
      const sortedData = [...rawData].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // Map and filter, then take only the first 5 items
      const filtered: ActivityItemApi[] = sortedData
        .map((item: any) => {
          // Ambil media yang tipe-nya image
          const imageMedia = item.newsMedia?.find((media: any) =>
            media.media_type?.startsWith("image/")
          );

          if (!imageMedia) return null;

          return {
            id: item.id,
            title: item.title,
            image: imageMedia.media_url,
          };
        })
        .filter((item): item is ActivityItemApi => item !== null) // buang null
        .slice(0, 5); // batasi 5 data

      setActivities(filtered);
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetchAllProduct();
      const rawData = response.data;
      const formattedData = rawData.map((item: ProductCarouselProps) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      }));
      setProducts(formattedData);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    getProducts();
    getActivities();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-[500px] h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background-homepage.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-80"></div>
        <div className="container relative z-10 mx-auto px-4 md:px-6 h-full">
          <div className="flex flex-col md:flex-row items-center justify-center h-full gap-4 md:gap-8 lg:gap-16">
            <div className="mt-20 md:mt-100 text-center md:text-left">
              <h1 className="text-primary text-xl md:text-2xl">
                Membangun Ekosistem Kopi Berkualitas
              </h1>
              <h1 className="text-4xl md:text-6xl font-bold text-primary">
                Sekolah Kopi <br className="hidden sm:block" />
                Raisa
              </h1>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <Image
                src="/assets/product1.png"
                alt="Logo"
                width={700}
                height={200}
                className="w-full max-w-[450px] lg:max-w-[800px] object-contain mt-4 md:mt-40 md:ml-20"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="bg-[#F5EDE4] py-10 md:py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          {/* Kolom Gambar */}
          <div className="w-full md:w-1/2">
            <ImageAboutus
              images={[
                {
                  src: "/assets/tk1.png",
                  alt: "Gambar 1",
                },
                {
                  src: "/assets/tk2.png",
                  alt: "Gambar 2",
                },
                {
                  src: "/assets/tk3.png",
                  alt: "Gambar 3",
                },
              ]}
            />
          </div>

          {/* Kolom Teks */}
          <div className="w-full mt-8 md:mt-0 md:ml-2">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Tentang Kami
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-sm">
              Pengembangan kelembagaan melalui BUMDESMA bertujuan memberdayakan
              kelompok tani baru agar lebih efektif dalam penyediaan sarana
              produksi, permodalan, serta pengembangan usaha dari hulu ke hilir,
              termasuk pemasaran dan peningkatan posisi tawar.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed text-justify text-sm">
              BUMDESMA RAISA mendirikan unit usaha sosial "Sekolah Kopi" sebagai
              inovasi dalam pengelolaan kopi hulu-hilir untuk menghadapi
              tantangan penjaminan mutu dan kualitas kopi di Kabupaten
              Bondowoso.
            </p>
            <Link href="/about">
              <button className="mt-6 px-4 md:px-6 py-2 md:py-3 bg-[#C19A6B] text-white font-semibold rounded-xl hover:-translate-y-1 duration-150 ease-in">
                Lihat Selengkapnya
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Produk */}
      <section className="relative py-10 md:py-16 bg-white overflow-hidden">
        {/* Gambar Bunga Pojok Kanan Atas */}
        <div className="absolute -top-5 md:-top-5 right-0 w-32 md:w-48 lg:w-64">
          <Image
            src="/assets/flower-top.png"
            alt="Bunga Hiasan"
            width={400}
            height={300}
            className="w-full h-auto"
          />
        </div>

        {/* Gambar Bunga Pojok Kiri Bawah */}
        <div className="absolute bottom-0 left-0 w-32 md:w-48 lg:w-64">
          <Image
            src="/assets/flower-bottom.png"
            alt="Bunga Hiasan"
            width={300}
            height={300}
            className="w-full h-auto"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Judul Section */}
          <h2 className="text-lg font-medium text-center text-gray-900">
            Produk Kami
          </h2>
          <p className="text-center text-gray-600 mt-2 px-4 text-sm">
            Kopi dari para petani dan UMKM Bondowoso, hasil panen terbaik dari
            tanah yang subur
          </p>

          {/* Auto-Slide Produk */}
          <div className="mt-8 md:mt-10">
            <ProductCard
              productItems={products}
            />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-10 md:py-16 bg-[#F5EDE4]">
        <div className="container mx-auto px-4">
          {/* Judul Section */}
          <h2 className="text-lg font-medium text-center text-gray-900">
            Kegiatan Terbaru
          </h2>
          <p className="text-center text-gray-600 mt-2 text-sm">
            Cari tahu kegiatan dan info terbaru dari Kopi Raisa
          </p>

          {/* Auto-Slide Aktivitas */}
          <div className="mt-8 md:mt-10">
            <ActivityCarousel
              activityItems={activities}
              onView={handleActivityClick}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
