import Navbar from "../components/Navbar";
import ActivitySlider from "../components/ActivitySlider";
import ActivityCard from "../components/ActivityCard";
import Footer from "../components/Footer";

export default function Activity() {
  return (
    <>
      <Navbar
        navbarItems={[
          { title: "Beranda", link: "/" },
          { title: "Tentang", link: "/about" },
          { title: "Produk", link: "/product" },
          { title: "Kegiatan", link: "/activity", isActive: true },
        ]}
      />
      <div className="px-4 md:px-8 py-4 max-w-400 mx-auto">
        <section className="mt-20 md:mt-30">
          <ActivitySlider
            sliderItems={[
              {
                id: 1,
                image: "/assets/activity.png",
                title:
                  "Kunjungan Staf Ahli menteri PUPR beserta istri Wakil Ketua DPRD Kabupaten Bondowoso",
              },
              {
                id: 2,
                image: "/assets/activity.png",
                title:
                  "Kunjungan Dharma wanita dinas sosial provinsi jawa timur",
              },
              {
                id: 3,
                image: "/assets/activity.png",
                title: "Perpisahan magang mahasiswa Penyuluhan Pertanian",
              },
              {
                id: 4,
                image: "/assets/activity.png",
                title: "Teknik Pembuatan Terasering pada Tanaman Kopi",
              },
            ]}
          />
        </section>

        <section className="mt-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4">
            Berita Terbaru
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <ActivityCard
              cardItems={[
                {
                  id: 1,
                  image: "/assets/activity.png",
                  title:
                    "Kunjungan Staf Ahli menteri PUPR beserta istri Wakil Ketua DPRD Kabupaten Bondowoso",
                  time: "10j",
                },
                {
                  id: 2,
                  image: "/assets/activity.png",
                  title:
                    "Kunjungan Dharma wanita dinas sosial provinsi jawa timur",
                  time: "1m",
                },
                {
                  id: 3,
                  image: "/assets/activity.png",
                  title: "Perpisahan magang mahasiswa Penyuluhan Pertanian",
                  time: "2hr",
                },
                {
                  id: 4,
                  image: "/assets/activity.png",
                  title: "Teknik Pembuatan Terasering pada Tanaman Kopi",
                  time: "1m",
                },
              ]}
            />
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
}
