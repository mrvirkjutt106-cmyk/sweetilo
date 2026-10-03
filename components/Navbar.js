"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingBag, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBucket } from "@/context/BucketContext";
import { PRODUCTS } from "@/data/data";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toggleBucket, totalItems } = useBucket();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const searchResults = searchTerm.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSelectResult = (slug) => {
    setIsSearchOpen(false);
    setSearchTerm("");
    router.push(`/menu?q=${encodeURIComponent(slug)}`);
  };

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Custom Order", href: "/custom-order" },
    { name: "Our Story", href: "/about" },
  ];

  return (
    <>
      {/* DESKTOP: Single Floating Glassmorphism Header (Hidden on Mobile) */}
      <header className="hidden lg:flex fixed top-4 inset-x-0 z-50 justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-5xl rounded-full px-6 py-2 transition-all duration-300 flex items-center justify-between border ${
            isScrolled
              ? "bg-white/85 backdrop-blur-2xl border-white/60 shadow-[0_12px_40px_rgba(74,25,109,0.12)]"
              : "bg-white/70 backdrop-blur-xl border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }`}
        >
          {/* Left: Strictly Source Official Logo.png via Next.js <Image /> */}
          <Link href="/" className="flex items-center group shrink-0 py-0.5">
            <Image
              src="/Official Logo.png"
              alt="Sweetilo Bakery"
              width={180}
              height={56}
              priority
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          {/* Center: Navigation Links (Menu, Custom Order, Our Story) */}
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-150 ${
                    isActive
                      ? "text-[#4a196d] font-bold border-b-2 border-[#4a196d] pb-0.5"
                      : "text-stone-700 hover:text-[#4a196d]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right: Exactly ONE Minimalist Search Icon and the Bucket */}
          <div className="flex items-center gap-3">
            {/* Minimalist Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-stone-700 hover:text-[#4a196d] hover:bg-[#F6EFFC] transition-colors cursor-pointer"
              aria-label="Open Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Bucket Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleBucket}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a196d] text-white text-xs font-semibold shadow-xs hover:bg-[#381054] transition-colors cursor-pointer"
              aria-label="View Bucket"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Bucket</span>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black">
                  {totalItems}
                </span>
              )}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Sleek Minimalist Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-stone-200"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2 text-stone-400 text-xs font-semibold uppercase tracking-wider">
                  <Search className="w-4 h-4 text-[#4a196d]" />
                  <span>Search Sweetilo Delights</span>
                </div>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 relative">
                <input
                  type="text"
                  autoFocus
                  placeholder="Type cake, cookie, pistachio, lotus, saffron..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/20 focus:border-[#4a196d]"
                />
              </div>

              {/* Suggestions / Results */}
              <div className="mt-4 space-y-1 max-h-60 overflow-y-auto">
                {searchResults.length > 0 ? (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectResult(item.name)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F6EFFC] text-left transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-stone-800 group-hover:text-[#4a196d]">
                            {item.name}
                          </p>
                          <p className="text-[10px] text-stone-400">
                            {item.categoryName} • {item.weight || item.prepTime}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#4a196d] opacity-0 group-hover:opacity-100 transition-opacity">
                        View &rarr;
                      </span>
                    </button>
                  ))
                ) : searchTerm.trim() ? (
                  <p className="text-xs text-stone-400 text-center py-6">
                    No sweet creations found for &ldquo;{searchTerm}&rdquo;
                  </p>
                ) : (
                  <div className="text-xs text-stone-400 py-3 flex items-center justify-center gap-4">
                    <span>Try: Belgian Noir</span>
                    <span>•</span>
                    <span>NYC Chunk</span>
                    <span>•</span>
                    <span>Tres Leches</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
