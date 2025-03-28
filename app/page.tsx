import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";
import TiltedCard from "./components/TiltedCard/TiltedCard";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <NavBar
        navbarItems={[
          { title: "Beranda", link: "/" },
          { title: "Tentang", link: "/about" },
          { title: "Produk", link: "/products" },
          { title: "Berita", link: "/blog" },
        ]}
      />

      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background-homepage.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-80"></div>
        <div className="container relative z-10 mx-auto">
          <div className="flex">
            <div className="mt-100">
              <h1 className="text-primary text-2xl">
                Membangun Ekosistem Kopi Berkualitas
              </h1>
              <h1 className="text-8xl font-bold text-primary">
                Sekolah Kopi Raisa
              </h1>
            </div>
            <Image
              src="/assets/product1.png"
              alt="Logo"
              width={600}
              height={600}
              className="ml-auto mt-50"
            />
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="bg-[#F5EDE4] py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Kolom Gambar */}
          <div className="grid grid-cols-2 gap-4">
            <TiltedCard
              imageSrc="assets/tk1.png"
              altText="Kendrick Lamar - GNX Album Cover"
              captionText="Biji Kopi"
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
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
              containerHeight="300px"
              containerWidth="300px"
              imageHeight="300px"
              imageWidth="300px"
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
              containerWidth="620px"
              imageHeight="300px"
              imageWidth="620px"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
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
            <button className="mt-6 px-6 py-3 bg-[#C19A6B] text-white font-semibold rounded-lg hover:bg-[#a07850] transition hover:-translate-y-1 duration-150 ease-in">
              Lihat Selengkapnya
            </button>
          </div>
        </div>
      </section>

      {/* Produk Kami */}
      <section className="p-10">
        <h2 className="text-3xl font-bold text-center">Produk Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-lg p-4 text-center shadow-lg"
            >
              <Image
                src="/assets/kopi.jpg"
                width={200}
                height={200}
                alt="Kopi Raisa"
                className="mx-auto"
              />
              <h3 className="font-semibold mt-2">Kopi Raisa - Robusta Gayo</h3>
              <p className="text-gray-600">Rp. 57,000</p>
              <button className="mt-4 bg-brown-500 text-white px-6 py-2 rounded">
                Beli Sekarang
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="p-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border rounded-lg p-4 text-center shadow-lg bg-white"
            >
              <Image
                src="/assets/blog.jpg"
                width={300}
                height={200}
                alt="Blog"
                className="mx-auto"
              />
              <h3 className="font-semibold mt-2">Kunjungan Staf Ahli</h3>
              <p className="text-gray-600">Kegiatan terbaru dari Kopi Raisa</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="p-10 bg-gray-900 text-white text-center">
        <p>&copy; 2025 Sekolah Kopi Raisa</p>
      </footer>
    </div>
  );
}
