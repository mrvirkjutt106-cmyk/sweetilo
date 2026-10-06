"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1B0D24] text-stone-300 pt-16 pb-12 border-t border-purple-800/40 relative overflow-hidden">
      {/* Background ambient vibrant glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-36 bg-gradient-to-b from-[#7e22ce]/25 via-[#4a196d]/10 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* On mobile: 2-column grid so links sit side-by-side */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-purple-900/50">
          {/* Brand info (spans 2 cols on mobile, 2 cols on desktop) */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white/95 rounded-2xl p-2.5 inline-block shadow-md border border-purple-200/80 group-hover:border-purple-400 transition-colors">
                <img
                  src="/Official Logo.png"
                  alt="Sweetilo Bakery Logo"
                  className="h-12 sm:h-14 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </Link>

            <p className="text-purple-200/90 text-xs leading-relaxed max-w-sm">
              &ldquo;Baked on Cloud9, delivered to your heart.&rdquo; Handcrafted Belgian
              Noir Ganache cakes, molten NYC cookies, chilled saffron dessert cups,
              and vintage glass bottle brews.
            </p>

            <div className="pt-1 flex items-center gap-2 text-xs text-amber-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] sm:text-xs">
                COTHM Certified Baker • Halal Certified • 100% Grass-Fed French Butter
              </span>
            </div>
          </div>

          {/* Quick Links (Column 1 on Mobile) */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link
                  href="/category/cakes"
                  className="hover:text-amber-300 transition-colors"
                >
                  Premium Cakes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cookies"
                  className="hover:text-amber-300 transition-colors"
                >
                  Artisan Cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/category/cups"
                  className="hover:text-amber-300 transition-colors"
                >
                  Dessert Cups
                </Link>
              </li>
              <li>
                <Link
                  href="/category/drinks"
                  className="hover:text-amber-300 transition-colors"
                >
                  Glass Bottles
                </Link>
              </li>
              <li>
                <Link
                  href="/custom-order"
                  className="hover:text-amber-300 transition-colors font-bold text-amber-300"
                >
                  Custom Order ✨
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-amber-300 transition-colors font-semibold text-purple-300"
                >
                  About Our Story &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Hub Locations (Column 2 on Mobile) */}
          <div className="col-span-1 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Bakehouses
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-4 h-4 text-[#a855f7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Lahore:</strong> DHA & Gulberg
                </div>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-4 h-4 text-[#a855f7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Karachi:</strong> Clifton Block 4
                </div>
              </div>
              <div className="flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-4 h-4 text-[#a855f7] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Islamabad:</strong> F-7 Markaz
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-3 pt-2 sm:pt-0 border-t border-purple-900/40 sm:border-t-0">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Bake Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>10:00 AM – 1:00 AM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#a855f7]" />
                <span>+92 (300) 845-SWEET</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>orders@sweetilo.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200/70 gap-4">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Sweetilo Homemade Bakery Prototype. Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] bg-[#2a0e38] border border-purple-800/60 px-3.5 py-1 rounded-full text-purple-200 font-semibold shadow-xs">
              Serving: Lahore • Karachi • Islamabad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
