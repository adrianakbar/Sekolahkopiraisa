import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import TiltedCard from "./components/TiltedCard/TiltedCard";
import ProductCard from "./components/ProductCard";
import ActivityCard from "./components/ActivityCard";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar
        navbarItems={[
          { title: "Beranda", link: "/" },
          { title: "Tentang", link: "/about" },
          { title: "Produk", link: "/products" },
          { title: "Kegiatan", link: "/Kegiatan" },
        ]}
      />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background-homepage.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-80"></div>
        <div className="container relative z-10 mx-auto">
          <div className="flex gap-45">
            <div className="mt-160">
              <h1 className="text-primary text-2xl">
                Membangun Ekosistem Kopi Berkualitas
              </h1>
              <h1 className="text-8xl font-bold text-primary">
                Sekolah Kopi <br />Raisa
              </h1>
            </div>
            <Image
              src="/assets/product1.png"
              alt="Logo"
              width={700}
              height={200}
              className=" mt-70"
            />
          </div>
        </div>
      </section>

      {/* Tentang */}
      <section className="bg-[#F5EDE4] py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Kolom Gambar */}
          <div className="grid grid-cols-2 gap-y-4">
            <TiltedCard
              imageSrc="assets/tk1.png"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Biji Kopi"
              containerHeight="350px"
              containerWidth="350px"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">Biji Kopi</p>
              }
            />
            <TiltedCard
              imageSrc="assets/tk2.png"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Mas Paijo"
              containerHeight="350px"
              containerWidth="350px"
              imageHeight="350px"
              imageWidth="350px"
              rotateAmplitude={12}
              scaleOnHover={1.1}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text">Mas Paijo</p>
              }
            />
            <TiltedCard
              imageSrc="assets/tk3.png"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Bos Saleh"
              containerHeight="300px"
              containerWidth="725px"
              imageHeight="300px"
              imageWidth="725px"
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

          {/* Kolom Teks */}
          <div className="">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Tentang Kami
            </h2>
            <p className="text-gray-700 leading-relaxed text-justify text-lg">
              Pengembangan kelembagaan melalui BUMDESMA bertujuan memberdayakan
              kelompok tani baru agar lebih efektif dalam penyediaan sarana
              produksi, permodalan, serta pengembangan usaha dari hulu ke hilir,
              termasuk pemasaran dan peningkatan posisi tawar.
            </p>
            <p className="text-gray-700 mt-4 leading-relaxed text-justify text-lg">
              BUMDESMA RAISA mendirikan unit usaha sosial "Sekolah Kopi" sebagai
              inovasi dalam pengelolaan kopi hulu-hilir untuk menghadapi
              tantangan penjaminan mutu dan kualitas kopi di Kabupaten
              Bondowoso.
            </p>
            <button className="mt-6 px-6 py-3 bg-[#C19A6B] text-white font-semibold rounded-md hover:-translate-y-1 duration-150 ease-in">
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      </section>

      {/* Produk */}
      <section className="relative py-16 bg-white">
        {/* Gambar Bunga Pojok Kanan Atas */}
        <div className="absolute top-0 -right-18">
          <Image
            src="/assets/flower-top.png"
            alt="Bunga Hiasan"
            className=""
            width={400}
            height={300}
          />
        </div>

        {/* Gambar Bunga Pojok Kiri Bawah */}
        <div className="absolute bottom-0 left-0">
          <Image
            src="/assets/flower-bottom.png"
            alt="Bunga Hiasan"
            className=""
            width={300}
            height={300}
          />
        </div>

        <div className="container mx-auto">
          {/* Judul Section */}
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Produk Kami
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Kopi dari para petani dan UMKM Bondowoso, hasil panen terbaik dari
            tanah yang subur
          </p>

          {/* Auto-Slide Produk */}
          <div className="mt-10">
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
      <section className="py-16 bg-[#F5EDE4]">
        <div className="container mx-auto">
          {/* Judul Section */}
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Kegiatan Terbaru
          </h2>
          <p className="text-center text-gray-600 mt-2">
          Cari tahu kegiatan dan info terbaru dari Kopi Raisa
          </p>

          {/* Auto-Slide Produk */}
          <div className="mt-10">
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
    </div>
  );
}
