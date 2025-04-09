import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import TiltedCard from "./components/TiltedCard/TiltedCard";
import ProductCard from "./components/ProductCarousel";
import ActivityCard from "./components/ActivityCarousel";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar */}
      <Navbar
        navbarItems={[
          { title: "Beranda", link: "/", isActive: true },
          { title: "Tentang", link: "/about" },
          { title: "Produk", link: "/product" },
          { title: "Kegiatan", link: "/activity" },
        ]}
      />

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
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary">
                Sekolah Kopi <br className="hidden sm:block" />Raisa
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
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Kolom Gambar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="w-full h-full">
              <TiltedCard
                imageSrc="assets/tk1.png"
                altText="Biji Kopi"
                captionText="Biji Kopi"
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Biji Kopi</p>
                }
              />
            </div>
            <div className="w-full h-full">
              <TiltedCard
                imageSrc="assets/tk2.png"
                altText="Mas Paijo"
                captionText="Mas Paijo"
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Mas Paijo</p>
                }
              />
            </div>
            <div className="w-full col-span-1 sm:col-span-2">
              <TiltedCard
                imageSrc="assets/tk3.png"
                altText="Bos Saleh"
                captionText="Bos Saleh"
                containerHeight="auto"
                containerWidth="100%"
                imageHeight="auto"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <p className="tilted-card-demo-text">Bos Saleh</p>
                }
              />
            </div>
          </div>

          {/* Kolom Teks */}
          <div className="mt-8 md:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              Tentang Kami
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-base md:text-lg">
              Pengembangan kelembagaan melalui BUMDESMA bertujuan memberdayakan
              kelompok tani baru agar lebih efektif dalam penyediaan sarana
              produksi, permodalan, serta pengembangan usaha dari hulu ke hilir,
              termasuk pemasaran dan peningkatan posisi tawar.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed text-justify text-base md:text-lg">
              BUMDESMA RAISA mendirikan unit usaha sosial "Sekolah Kopi" sebagai
              inovasi dalam pengelolaan kopi hulu-hilir untuk menghadapi
              tantangan penjaminan mutu dan kualitas kopi di Kabupaten
              Bondowoso.
            </p>
            <button className="mt-6 px-4 md:px-6 py-2 md:py-3 bg-[#C19A6B] text-white font-semibold rounded-md hover:-translate-y-1 duration-150 ease-in">
              Lihat Selengkapnya
            </button>
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
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900">
            Produk Kami
          </h2>
          <p className="text-center text-gray-600 mt-2 px-4">
            Kopi dari para petani dan UMKM Bondowoso, hasil panen terbaik dari
            tanah yang subur
          </p>

          {/* Auto-Slide Produk */}
          <div className="mt-8 md:mt-10">
            <ProductCard
              productItems={[
                {
                  id: 1,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 2,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 3,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 4,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 5,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 6,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
                {
                  id: 7,
                  name: "KOPI RAISA - ARUTALA KOPI ROBUSTA GAYO",
                  price: "Rp. 57,000",
                  image: "/assets/product.png",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-10 md:py-16 bg-[#F5EDE4]">
        <div className="container mx-auto px-4">
          {/* Judul Section */}
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-900">
            Kegiatan Terbaru
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Cari tahu kegiatan dan info terbaru dari Kopi Raisa
          </p>

          {/* Auto-Slide Aktivitas */}
          <div className="mt-8 md:mt-10">
            <ActivityCard
              activityItems={[
                {
                  id: 1,
                  title: "Kegiatan 1 lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
                  image: "/assets/activity.png",
                },
                {
                  id: 2,
                  title: "Kegiatan 2",
                  image: "/assets/activity.png",
                },
                {
                  id: 3,
                  title: "Kegiatan 3",
                  image: "/assets/activity.png",
                },
                {
                  id: 4,
                  title: "Kegiatan 4",
                  image: "/assets/activity.png",
                },
                {
                  id: 5,
                  title: "Kegiatan 5",
                  image: "/assets/activity.png",
                },
                {
                  id: 6,
                  title: "Kegiatan 6",
                  image: "/assets/activity.png",
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}