import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
  title: string;
  link: string;
  isActive?: boolean;
}

export default function Navbar({
  navbarItems,
}: {
  navbarItems: NavbarProps[];
}) {
  return (
    <nav className="flex justify-between items-center p-5 shadow-md bg-white opacity-80 fixed w-screen z-50 px-30">
      <Link href="/">
        <Image alt="" src="/assets/logo.png" width={35} height={25} />
      </Link>

      <div className="space-x-10 text-primary ml-120">
        {navbarItems.map((item, index) => (
          <Link key={index} href={item.link} className="relative group">
            <span
              className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1/4 after:h-[2px] after:bg-primary after:transition-all after:duration-300
        ${item.isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}
      `}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="space-x-4">
        <Link href="/login">
          <button className="bg-primary px-4 py-2 rounded-md text-white hover:-translate-y-1 duration-150 ease-in">
            Masuk
          </button>
        </Link>
        <Link href="/signup">
          <button className="text-primary px-4 py-2 rounded-md border border-primary hover:-translate-y-1 duration-150 ease-in">
            Daftar
          </button>
        </Link>
      </div>
    </nav>
  );
}
