import MemberCard from "../components/MemberCard";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      {/* Section 1 - Tentang Sekolah Kopi Raisa */}
      <div className="py-15 pt-25 px-4 bg-secondary">
        <section className="flex flex-col lg:flex-row gap-12 items-center container mx-auto max-w-7xl">
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-full">
                Tentang Kami
              </span>
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                Sekolah Kopi <span className="text-amber-600">Raisa</span>
              </h1>
            </div>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p className="font-medium">
                Sekolah Kopi Raisa adalah kelembagaan{" "}
                <em className="text-amber-700 font-semibold">
                  social entrepreneurship
                </em>{" "}
                yang berfokus pada fungsi edukatif dan bisnis pengelolaan kopi
                sebagai komoditas utamanya.
              </p>
              <p>
                BUMDESMA RAISA merupakan hasil kolaborasi tiga desa di Kecamatan
                Sumberwringin—Desa Sumberwringin, Rejoagung, dan Sukorejo—yang
                berdiri sejak 2021.
              </p>
              <p>
                Salah satu unit usahanya adalah Sekolah Kopi Raisa Center, yang
                berfokus pada pengelolaan kopi dari hulu ke hilir. Nama RAISA
                merupakan singkatan dari{" "}
                <strong>Ruang Ijen Sumberwringin Agropolitan</strong>.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-20"></div>
              <img
                src="/assets/background-homepage.png"
                alt="Sekolah Kopi Raisa"
                className="relative rounded-xl w-full h-auto object-cover shadow-2xl"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Video Section */}
      <div className="bg-white py-15">
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-secondary text-sm font-medium rounded-full mb-4">
              Video Profil
            </span>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Mengenal Lebih Dekat <br />
              <span className="text-amber-600">Sekolah Kopi Raisa</span>
            </h2>
            <p className=" text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Saksikan perjalanan dan aktivitas Sekolah Kopi Raisa dalam
              mengembangkan industri kopi dari hulu ke hilir di Bondowoso.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-10"></div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl bg-gray-900">
                <iframe
                  src="https://www.youtube.com/embed/X_XndVV-ck4"
                  title="Video Profil Sekolah Kopi Raisa"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section 2 - Visi Misi */}
      <div className="bg-secondary py-15">
        <section className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-2/5 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-xl blur opacity-20"></div>
                <img
                  src="/assets/about-image2.png"
                  alt="Kegiatan Kebun"
                  className="relative rounded-xl w-full h-auto object-cover shadow-xl"
                />
              </div>
            </div>
            <div className="lg:w-3/5 w-full space-y-8">
              {/* Visi Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded mr-4"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    VISI
                  </h3>
                </div>
                <p className="text-lg text-gray-700 italic leading-relaxed border-l-4 border-amber-200 pl-6">
                  "Terwujudnya Kemandirian Petani dan UMKM Kopi Bondowoso secara
                  berkelanjutan serta penguatan branding Bondowoso Republik Kopi
                  (BRK)."
                </p>
              </div>

              {/* Misi Card */}
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-8 bg-gradient-to-b from-emerald-400 to-green-500 rounded mr-4"></div>
                  <h3 className="text-xl font-bold text-gray-900">
                    MISI
                  </h3>
                </div>
                <div className="grid gap-3">
                  {[
                    "Meningkatkan iklim perkopian yang sehat",
                    "Menumbuhkembangkan kuantitas dan kualitas perkopian",
                    "Mendorong tercapainya pasar yang kompetitif",
                    "Menjaga ketersediaan dan kelangsungan produksi",
                    "Menjaga keberlangsungan dan peningkatan soft skill SDM perkopian",
                    "Meningkatkan branding BRK",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Section 3 - Struktur Kelembagaan */}
      <section className="container mx-auto py-15 px-4 max-w-7xl">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-secondary text-sm font-medium rounded-full mb-4">
            Organisasi
          </span>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Struktur Kelembagaan
          </h2>
          <p className=" text-gray-600 max-w-2xl mx-auto">
            Tata kelola organisasi yang solid untuk mendukung visi dan misi kami
          </p>
        </div>
        <div className="bg-white rounded-xl p-8 shadow-2xl border border-gray-100">
          <img
            src="/assets/structure.png"
            alt="Struktur Kelembagaan"
            className="rounded-xl w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Team Section */}
      <div className="bg-secondary py-15">
        <section className="container mx-auto px-4 max-w-7xl">
          {/* Pengurus Inti */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-full mb-4">
                Tim Kami
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Pengurus Inti
              </h2>
              <p className=" text-gray-600">
                Para pemimpin yang berdedikasi untuk kemajuan Sekolah Kopi Raisa
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
          </div>

          {/* Bagian Pokja */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Bagian Pokja
              </h3>
              <p className=" text-gray-600">
                Tim kerja yang menjalankan program-program strategis
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <MemberCard
                id={1}
                image="/assets/tk2.png"
                name="Raisa"
                position="Pokja Member"
              />
              <MemberCard
                id={2}
                image="/assets/tk2.png"
                name="Raisa"
                position="Pokja Member"
              />
              <MemberCard
                id={3}
                image="/assets/tk2.png"
                name="Raisa"
                position="Pokja Member"
              />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
