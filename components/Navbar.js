"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleBucket, totalItems } = useBucket();
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/category/cakes?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/category/cakes" },
    { name: "Custom", href: "/custom-order" },
    { name: "Story", href: "/about" },
  ];

  return (
    // STRICT REQUIREMENT: Hide top desktop navigation entirely on mobile (< lg)
    <header
      className={`hidden lg:block sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#e5d2f2]/60"
          : "bg-[#FAF7F2] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo: Purple Cake Icon + Sweetilo Serif Typography */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[#4a196d] flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              {/* Minimalist Cake Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C12.55 2 13 2.45 13 3C13 3.32 12.84 3.6 12.6 3.77L12 4.17L11.4 3.77C11.16 3.6 11 3.32 11 3C11 2.45 11.45 2 12 2ZM18 9V7H6V9C6 9.55 6.45 10 7 10C7.55 10 8 9.55 8 9C8 9.55 8.45 10 9 10C9.55 10 10 9.55 10 9C10 9.55 10.45 10 11 10C11.55 10 12 9.55 12 9C12 9.55 12.45 10 13 10C13.55 10 14 9.55 14 9C14 9.55 14.45 10 15 10C15.55 10 16 9.55 16 9C16 9.55 16.45 10 17 10C17.55 10 18 9.55 18 9ZM19 11.82C18.42 11.31 17.67 11 16.85 11C15.93 11 15.11 11.38 14.5 12C13.89 11.38 13.07 11 12.15 11C11.23 11 10.41 11.38 9.8 12C9.19 11.38 8.37 11 7.45 11C6.63 11 5.88 11.31 5.3 11.82C4.52 12.5 4 13.48 4 14.59V19C4 20.1 4.9 21 6 21H18C19.1 21 20 20.1 20 19V14.59C20 13.48 19.48 12.5 18.7 11.82H19Z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold text-[#1F0F29] tracking-tight group-hover:text-[#4a196d] transition-colors">
              Sweetilo
            </span>
          </Link>

          {/* Desktop Navigation Links: Home, Menu, Custom, Story, Bucket */}
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? "text-[#4a196d] font-bold"
                      : "text-stone-700 hover:text-[#4a196d]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Bucket Link (Button) */}
            <button
              onClick={toggleBucket}
              className="text-sm font-semibold text-stone-700 hover:text-[#4a196d] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Bucket</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black rounded-full bg-[#4a196d] text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>

          {/* Right: Pill-shaped Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-56 xl:w-64">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/90 border border-stone-200/90 rounded-full pl-9 pr-4 py-1.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#4a196d] focus:ring-1 focus:ring-[#4a196d] transition-all shadow-xs"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}
