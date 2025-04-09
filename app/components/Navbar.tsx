"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from "../utils/getUser"; // pastikan path benar

interface NavbarProps {
  title: string;
  link: string;
  isActive?: boolean;
}

interface User {
  name: string;
  image: string;
}

export default function Navbar({
  navbarItems,
}: {
  navbarItems: NavbarProps[];
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      if (data) setUser(data);
    };
    fetchUser();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('#mobile-menu') && !target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <nav className="flex justify-between items-center p-3 md:p-5 shadow-md bg-white/80 backdrop-blur fixed w-full z-50 px-4 md:px-8 lg:px-16">
      <Link href="/" className="flex items-center">
        <Image alt="Logo" src="/assets/logo.png" width={35} height={25} priority />
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 lg:space-x-10 text-primary">
        {navbarItems.map((item, index) => (
          <Link key={index} href={item.link} className="relative group">
            <span
              className={`relative after:content-[''] after:absolute after:left-0 after:-bottom-1/4 after:h-[2px] after:bg-primary after:transition-all after:duration-300
              ${item.isActive ? "after:w-full" : "after:w-0 group-hover:after:w-full"}`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>

      {/* Desktop Authentication */}
      <div className="hidden md:flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm">{user.name}</span>
            <img
              src={user.image}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        id="menu-button"
        className="md:hidden flex flex-col space-y-1.5 p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span 
          className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${
            isMenuOpen ? 'rotate-45 translate-y-2' : ''
          }`} 
        />
        <span 
          className={`block w-6 h-0.5 bg-primary transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-0' : 'opacity-100'
          }`} 
        />
        <span 
          className={`block w-6 h-0.5 bg-primary transition-transform duration-300 ${
            isMenuOpen ? '-rotate-45 -translate-y-2' : ''
          }`} 
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div 
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-white/95 z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } pt-20`}
      >
        <div className="flex flex-col items-center space-y-6 p-6">
          {navbarItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.link}
              onClick={() => setIsMenuOpen(false)}
              className={`text-lg font-medium ${item.isActive ? 'text-primary' : 'text-gray-700'}`}
            >
              {item.title}
            </Link>
          ))}
          
          <div className="pt-6 border-t w-full flex flex-col items-center space-y-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-base font-medium">{user.name}</span>
              </div>
            ) : (
              <>
                <Link 
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <button className="bg-primary w-full py-3 rounded-md text-white">
                    Masuk
                  </button>
                </Link>
                <Link 
                  href="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                >
                  <button className="text-primary w-full py-3 rounded-md border border-primary">
                    Daftar
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}