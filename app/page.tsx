import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/NavBar";

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
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/background-homepage.png')" }}
      >
        <div className="container mx-auto h-screen">
          <div className="flex">
            <div className="mt-80">
              <h1 className="text-white">
                Membangun Ekosistem Kopi Berkualitas
              </h1>
              <h1 className="text-5xl font-bold text-white mt-4">
                Sekolah Kopi Raisa
              </h1>
            </div>
            <Image
              src="/assets/product1.png"
              alt="Logo"
              width={500}
              height={500}
              className="ml-auto mt-40"
            />
          </div>
        </div>
      </section>

      {/* Tentang Kami */}
      <section className="p-10 text-center">
        <h2 className="text-3xl font-bold">Tentang Kami</h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Pengembangan kelembagaan melalui BUMDESMA bertujuan untuk
          memberdayakan kelompok tani baru agar lebih efektif dalam penyediaan
          sarana produksi dan pemasaran.
        </p>
        <button className="mt-4 px-6 py-2 bg-gray-300 rounded">
          Lihat selengkapnya
        </button>
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
