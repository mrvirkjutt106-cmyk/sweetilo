"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu as MenuIcon, X, Search } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

// ── SECURITY: Contact details from environment variables ───────────────────────
// Never hardcode phone numbers in source. Set NEXT_PUBLIC_WHATSAPP_NUMBER
// in .env.local. NEXT_PUBLIC_ prefix is correct here — this is public UI data.
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008457933";

export default function Navbar() {
  const pathname = usePathname();
  const { toggleBucket, totalItems } = useBucket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ── SECURITY: Use encodeURIComponent for WhatsApp message ─────────────────
  // Manual percent-encoding is error-prone; encodeURIComponent handles all
  // special characters correctly and prevents URL injection.
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Sweetilo! I'd like to order some fresh treats."
  )}`;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Our Menu", href: "/menu" },
    { name: "Custom Orders", href: "/custom-order" },
    { name: "Reviews", href: "/reviews" },
    {
      name: "Contact Us",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      isExternal: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close drawer on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-lg shadow-[0_4px_24px_rgba(74,25,109,0.08)] border-b border-purple-100"
            : "bg-white/90 backdrop-blur-md border-b border-purple-200/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4 lg:gap-6">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <Image
                src="/Official Logo.png"
                alt="Sweetilo — Baked on Cloud9, delivered to your heart"
                width={190}
                height={60}
                priority
                className="h-11 sm:h-13 w-auto object-contain transition-transform duration-250 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Center: Nav Links (Desktop only, single-line whitespace-nowrap) */}
            <nav className="hidden lg:flex items-center justify-center gap-3.5 xl:gap-7 flex-1 px-2 min-w-0">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : !link.isExternal && (pathname === link.href || pathname.startsWith(link.href + "/"));

                if (link.isExternal) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] xl:text-[14px] font-semibold text-stone-600 hover:text-[#4a196d] transition-colors whitespace-nowrap px-1 py-1"
                    >
                      {link.name}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-[13px] xl:text-[14px] font-semibold transition-all relative px-1 py-1 whitespace-nowrap ${
                      isActive
                        ? "text-[#4a196d] font-bold"
                        : "text-stone-600 hover:text-[#4a196d]"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-0.5 inset-x-0 h-[2.5px] bg-gradient-to-r from-[#4a196d] to-[#9333ea] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Icons + CTA */}
            <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
              {/* Search icon */}
              <button
                className="hidden sm:flex p-2.5 rounded-full text-stone-500 hover:text-[#4a196d] hover:bg-[#F6EFFC] transition-all"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart Bucket Icon */}
              <button
                onClick={toggleBucket}
                className="relative p-2.5 rounded-full text-stone-600 hover:text-[#4a196d] hover:bg-[#F6EFFC] transition-all"
                aria-label="View Shopping Bucket"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#4a196d] to-[#9333ea] text-white text-[10px] font-black flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Pill CTA — Order on WhatsApp (strictly hidden on mobile, shown on md+) */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn !hidden md:!inline-flex bg-[#4a196d] hover:bg-[#5c1b89] text-white shadow-[0_6px_20px_rgba(74,25,109,0.30)] text-xs sm:text-[13px] tracking-wide"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-emerald-300 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16Z"/>
                </svg>
                <span>Order Now</span>
                <span className="pill-arrow text-emerald-300">→</span>
              </a>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-full text-stone-600 hover:text-[#4a196d] hover:bg-[#F6EFFC] transition-all"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-[#1B0D24]/40 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        {/* Drawer Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-purple-100">
            <span className="font-script text-2xl text-[#4a196d]">Sweetilo</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-[#F6EFFC] text-stone-500 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                  (!link.isExternal && (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)))
                    ? "bg-[#F6EFFC] text-[#4a196d] font-bold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-[#4a196d]"
                }`}
                style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : "0ms" }}
                {...(link.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA at bottom of drawer */}
          <div className="px-5 py-5 border-t border-purple-100 space-y-3">
            <button
              onClick={() => { toggleBucket(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full border-2 border-[#4a196d] text-[#4a196d] text-sm font-bold transition-all hover:bg-[#F6EFFC]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>View Bucket {totalItems > 0 ? `(${totalItems})` : ""}</span>
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#4a196d] text-white text-sm font-bold shadow-md transition-all hover:bg-[#5c1b89]"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current text-emerald-300 shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16Z"/>
              </svg>
              <span>Order on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
