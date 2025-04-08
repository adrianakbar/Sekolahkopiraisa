import Image from "next/image";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar
        navbarItems={[
          { title: "Beranda", link: "/" },
          { title: "Tentang", link: "/about", isActive: true },
          { title: "Produk", link: "/product" },
          { title: "Kegiatan", link: "/activity" },
        ]}
      />

      <main className="px-4 md:px-12 lg:px-24 py-10 space-y-16">
        {/* Section 1 - Tentang Sekolah Kopi Raisa */}
        <section className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Tentang Sekolah <br /> Kopi Raisa
            </h2>
            <p className="text-gray-700 mb-4">
              Sekolah Kopi Raisa adalah kelembagaan{" "}
              <em>social entrepreneurship</em> yang berfokus pada fungsi edukatif dan
              bisnis pengelolaan kopi sebagai komoditas utamanya.
            </p>
            <p className="text-gray-700">
              BUMDESMA (Badan Usaha Milik Desa Bersama) RAISA merupakan hasil kolaborasi
              tiga desa di Kecamatan Sumberwringin—Desa Sumberwringin, Rejoagung, dan
              Sukorejo—yang berdiri sejak tahun 2021.
              <br />
              <br />
              Salah satu unit usahanya adalah Sekolah Kopi Raisa Center, yang berfokus
              pada pengelolaan kopi dari hulu ke hilir guna menjawab tantangan kualitas
              dan mutu kopi di Kabupaten Bondowoso. Nama RAISA sendiri merupakan
              singkatan dari Ruang Ijen Sumberwringin Agropolitan, sebagai simbol
              kolaborasi dan komitmen dalam mewujudkan pertanian berkelanjutan.
            </p>
            <button className="mt-4 text-blue-600 font-medium hover:underline">
              Read More
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/assets/background-homepage.png" // ganti dengan path gambar kamu
              alt="Sekolah Kopi Raisa"
              width={600}
              height={400}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        </section>

        {/* Section 2 - Visi Misi */}
        <section className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Image
              src="/assets/about-image2.png" // ganti dengan path gambar kamu
              alt="Kegiatan Kebun"
              width={400}
              height={200}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div className="lg:w-1/2 bg-[#F5F3F1] p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">VISI</h3>
            <p className="text-gray-700 italic mb-6">
              “Terwujudnya Kemandirian Petani dan UMKM Kopi Bondowoso Secara Berkelanjutan
              serta Penguatan Branding Bondowoso Republik Kopi (BRK).”
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">MISI</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Meningkatkan iklim perkopian yang sehat</li>
              <li>Menumbuhkembangkan kuantitas dan kualitas perkopian</li>
              <li>Mendorong tercapainya pasar yang kompetitif</li>
              <li>Menjaga ketersediaan dan kelangsungan produksi</li>
              <li>
                Menjaga keberlangsungan dan peningkatan soft skill SDM perkopian
              </li>
              <li>Meningkatkan branding BRK</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
