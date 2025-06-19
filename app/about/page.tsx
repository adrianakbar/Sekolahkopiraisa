import Image from "next/image";
import Navbar from "../components/Navbar";
import MemberCard from "../components/MemberCard";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      {/* Section 1 - Tentang Sekolah Kopi Raisa */}
      <div className="py-10 p-4">
        <section className="flex flex-col md:flex-row gap-8 items-center container mx-auto mt-10 md:mt-20">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Tentang Sekolah <br /> Kopi Raisa
            </h2>
            <p className="text-gray-700 mb-4">
              Sekolah Kopi Raisa adalah kelembagaan{" "}
              <em>social entrepreneurship</em> yang berfokus pada fungsi
              edukatif dan bisnis pengelolaan kopi sebagai komoditas utamanya.
            </p>
            <p className="text-gray-700">
              BUMDESMA RAISA merupakan hasil kolaborasi tiga desa di Kecamatan
              Sumberwringin—Desa Sumberwringin, Rejoagung, dan Sukorejo—yang
              berdiri sejak 2021.
              <br />
              <br />
              Salah satu unit usahanya adalah Sekolah Kopi Raisa Center, yang
              berfokus pada pengelolaan kopi dari hulu ke hilir. Nama RAISA
              merupakan singkatan dari Ruang Ijen Sumberwringin Agropolitan.
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <Image
              src="/assets/background-homepage.png"
              alt="Sekolah Kopi Raisa"
              width={600}
              height={400}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
        </section>
      </div>

      {/* Section 2 - Visi Misi */}
      <div className="bg-secondary py-10 md:py-16">
        <section className="flex flex-col lg:flex-row gap-8 container mx-auto px-4">
          <div className="md:w-100 w-50 place-self-center">
            <Image
              src="/assets/about-image2.png"
              alt="Kegiatan Kebun"
              width={400}
              height={200}
              className="rounded-xl w-full h-auto object-cover"
            />
          </div>
          <div className="lg:w-2/3 w-full p-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">VISI</h3>
            <p className="text-gray-700 italic mb-6">
              “Terwujudnya Kemandirian Petani dan UMKM Kopi Bondowoso secara
              berkelanjutan serta penguatan branding Bondowoso Republik Kopi
              (BRK).”
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">MISI</h3>
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
      </div>

      {/* Section 3 - Struktur Kelembagaan */}
      <section className="container mx-auto py-10 md:py-16 px-4">
        <h3 className="text-2xl md:text-3xl text-center font-bold text-gray-800 mb-10">
          Struktur Kelembagaan
        </h3>
        <Image
          src="/assets/structure.png"
          alt="Struktur Kelembagaan"
          width={800}
          height={400}
          className="rounded-xl w-full h-auto object-cover"
        />
      </section>

      {/* Pengurus Inti */}
      <div className="bg-secondary py-10 md:py-16">
        <section className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Pengurus Inti
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MemberCard
              id={1}
              image="/assets/tk2.png"
              name="Raisa"
              position="Founder"
            />
            <MemberCard
              id={2}
              image="/assets/tk2.png"
              name="Raisa"
              position="Co-Founder"
            />
            <MemberCard
              id={3}
              image="/assets/tk2.png"
              name="Raisa"
              position="Co-Founder"
            />
            <MemberCard
              id={4}
              image="/assets/tk2.png"
              name="Raisa"
              position="Co-Founder"
            />
          </div>
        </section>

        {/* Bagian Pokja */}
        <section className="container mx-auto mt-10 px-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Bagian Pokja
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MemberCard
              id={1}
              image="/assets/tk2.png"
              name="Raisa"
              position="Founder"
            />
            <MemberCard
              id={2}
              image="/assets/tk2.png"
              name="Raisa"
              position="Co-Founder"
            />
            <MemberCard
              id={3}
              image="/assets/tk2.png"
              name="Raisa"
              position="Co-Founder"
            />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
