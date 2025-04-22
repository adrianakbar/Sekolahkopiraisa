import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-10">
      <div className="container mx-auto px-4 md:px-0">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Sekolah Kopi Raisa */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg">SEKOLAH KOPI RAISA</h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Races Dua, Rejo Agung, Kec. Sumberwringin, Kabupaten Bondowoso, Jawa
              Timur
            </p>
          </div>
          
          {/* Fitur */}
          <div className="justify-self-start md:justify-self-center">
            <h3 className="font-bold text-lg">FITUR</h3>
            <hr className="w-12 border-black my-2" />
            <ul className="text-gray-600 space-y-1 text-sm md:text-base">
              <Link href="/">
                <li className="hover:underline">Beranda</li>
              </Link>
              <Link href="/about">
                <li className="hover:underline">Tentang</li>
              </Link>
              <Link href="/products">
                <li className="hover:underline">Produk</li>
              </Link>
              <Link href="/Kegiatan">
                <li className="hover:underline">Kegiatan</li>
              </Link>
            </ul>
          </div>
          
          {/* Media Sosial */}
          <div className="justify-self-start md:justify-self-center">
            <h3 className="font-bold text-lg">MEDIA SOSIAL</h3>
            <hr className="w-12 border-black my-2" />
            <ul className="text-gray-600 space-y-1 text-sm md:text-base">
              <Link href="">
                <li className="hover:underline">Instagram</li>
              </Link>
              <Link href="">
                <li className="hover:underline">Facebook</li>
              </Link>
              <Link href="">
                <li className="hover:underline">Website</li>
              </Link>
            </ul>
          </div>
          
          {/* Hubungi */}
          <div className="justify-self-start md:justify-self-center">
            <h3 className="font-bold text-lg">HUBUNGI</h3>
            <hr className="w-12 border-black my-2" />
            <Link href="">
              <p className="text-gray-600 hover:underline text-sm md:text-base">WhatsApp</p>
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2025 Sekolah Kopi Raisa</p>
        </div>
      </div>
    </footer>
  );
}