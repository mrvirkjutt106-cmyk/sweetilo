"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu as MenuIcon,
  X,
  MapPin,
} from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function Navbar() {
  const pathname = usePathname();
  const { toggleBucket, totalItems } = useBucket();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Premium Cakes", href: "/category/cakes" },
    { name: "Artisan Cookies", href: "/category/cookies" },
    { name: "Dessert Cups", href: "/category/cups" },
    { name: "Glass Bottles", href: "/category/drinks" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#e5d2f2]/60"
          : "py-3.5 bg-[#FAF7F2]/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center group shrink-0">
            <div className="relative h-14 sm:h-16 md:h-20 w-auto transition-transform duration-300 group-hover:scale-105">
              <img
                src="/Official Logo.png"
                alt="Sweetilo Bakery - Baked on Cloud9, delivered to your heart"
                className="h-full w-auto object-contain py-1"
              />
            </div>
          </Link>

          {/* Desktop Navigation: Side-by-side links with Custom Order before About Us */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#e5d2f2] shadow-sm">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-[#4a196d] text-white shadow-xs"
                      : "text-stone-700 hover:text-[#4a196d] hover:bg-[#F6EFFC]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side: Serving Cities badge & Bucket button */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-600 bg-white/80 px-3 py-1.5 rounded-full border border-[#e5d2f2] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#4a196d] animate-bounce" />
              <span className="font-medium text-stone-700">LHE • KHI • ISB</span>
            </div>

            {/* Bucket (Cart) Button with Deep Purple #4a196d */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleBucket}
              className="relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#4a196d] text-white hover:bg-[#340f4e] transition-colors shadow-card"
              aria-label="Open Cart Bucket"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-400 text-[#340f4e] text-[10px] font-black flex items-center justify-center shadow-xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold">
                Bucket
              </span>
              {totalItems > 0 && (
                <span className="text-xs font-bold text-purple-200 border-l border-white/20 pl-2">
                  ({totalItems})
                </span>
              )}
            </motion.button>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl text-stone-700 hover:text-[#4a196d] hover:bg-stone-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <MenuIcon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-[#e5d2f2] bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-lg"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#4a196d] text-white"
                      : "text-stone-800 hover:bg-[#F6EFFC] hover:text-[#4a196d]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#e5d2f2]/60 mt-3 flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#4a196d]" />
                Lahore • Karachi • Islamabad
              </span>
              <span className="font-semibold text-[#4a196d]">
                Freshly Baked
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
