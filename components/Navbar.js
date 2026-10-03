"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function Navbar() {
  const pathname = usePathname();
  const { toggleBucket, totalItems } = useBucket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const whatsappUrl =
    "https://wa.me/923001234567?text=Hi%20Sweetilo!%20I'd%20like%20to%20order%20some%20fresh%20treats.";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Menu", href: "/menu" },
    { name: "Custom Orders", href: "/custom-order" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Contact Us", href: "https://wa.me/923001234567", isExternal: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-purple-100/60 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-22">
          {/* Left: Official Logo.png */}
          <Link href="/" className="flex items-center group shrink-0">
            <Image
              src="/Official Logo.png"
              alt="Sweetilo - Baked on Cloud9, delivered to your heart"
              width={220}
              height={70}
              priority
              className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102"
            />
          </Link>

          {/* Center: Inline Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : !link.isExternal && pathname.startsWith(link.href);

              if (link.isExternal) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-semibold text-stone-700 hover:text-[#4a196d] transition-colors"
                  >
                    {link.name}
                  </a>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[13px] font-semibold transition-all relative py-1 ${
                    isActive
                      ? "text-[#4a196d] font-bold"
                      : "text-stone-700 hover:text-[#4a196d]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#4a196d] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: Solid Deep Purple 'Order on WhatsApp' Button + Cart Bucket */}
          <div className="flex items-center gap-3">
            {/* Cart Bucket Icon Button */}
            <button
              onClick={toggleBucket}
              className="relative p-2.5 rounded-xl text-stone-700 hover:text-[#4a196d] hover:bg-[#F6EFFC] transition-colors cursor-pointer"
              aria-label="View Shopping Bucket"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#4a196d] text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Solid Deep Purple 'Order on WhatsApp' Button with WhatsApp Icon */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#4a196d] hover:bg-[#381054] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              {/* WhatsApp Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16ZM16.49 14.34C16.25 14.22 15.04 13.63 14.82 13.55C14.59 13.47 14.43 13.43 14.26 13.67C14.1 13.91 13.62 14.47 13.47 14.64C13.33 14.8 13.18 14.82 12.94 14.7C12.7 14.58 11.93 14.33 11.01 13.51C10.29 12.87 9.8 12.08 9.66 11.84C9.52 11.6 9.64 11.47 9.76 11.35C9.87 11.24 10.01 11.06 10.13 10.92C10.25 10.78 10.29 10.68 10.37 10.52C10.45 10.36 10.41 10.22 10.35 10.1C10.29 9.98 9.8 8.78 9.6 8.29C9.4 7.82 9.2 7.88 9.05 7.87L8.57 7.86C8.41 7.86 8.14 7.92 7.92 8.16C7.7 8.4 7.07 8.99 7.07 10.2C7.07 11.41 7.95 12.58 8.07 12.74C8.19 12.9 9.8 15.38 12.26 16.44C12.85 16.7 13.31 16.85 13.66 16.96C14.25 17.15 14.79 17.12 15.22 17.06C15.7 16.99 16.69 16.46 16.9 15.87C17.1 15.28 17.1 14.78 17.04 14.68C16.98 14.58 16.73 14.46 16.49 14.34Z" />
              </svg>
              <span>Order on WhatsApp</span>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:text-[#4a196d] hover:bg-stone-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100/80 bg-white px-5 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-stone-800 hover:text-[#4a196d]"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4a196d] text-white text-xs font-semibold shadow-sm"
            >
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
