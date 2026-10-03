"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1F0F29] text-stone-300 pt-16 pb-12 border-t border-purple-950/40 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#4a196d]/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-purple-900/40">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group">
              <div className="bg-white/95 rounded-2xl p-2.5 inline-block shadow-md">
                <img
                  src="/Official Logo.png"
                  alt="Sweetilo Bakery Logo"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-purple-200/80 text-xs leading-relaxed max-w-sm">
              “Baked on Cloud9, delivered to your heart.” Handcrafted cakes, molten NYC cookies, chilled dessert cups, and vintage glass bottle brews.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>COTHM Certified Baker • Halal Certified • 100% Grass-Fed Butter</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/category/cakes" className="hover:text-amber-300 transition-colors">
                  Premium Cakes
                </Link>
              </li>
              <li>
                <Link href="/category/cookies" className="hover:text-amber-300 transition-colors">
                  Artisan Cookies
                </Link>
              </li>
              <li>
                <Link href="/category/cups" className="hover:text-amber-300 transition-colors">
                  Dessert Cups
                </Link>
              </li>
              <li>
                <Link href="/category/drinks" className="hover:text-amber-300 transition-colors">
                  Glass Bottles
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="hover:text-amber-300 transition-colors font-medium text-amber-200">
                  Custom Order & Quotes ✨
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors font-semibold text-purple-300">
                  About Our Baker Story →
                </Link>
              </li>
            </ul>
          </div>

          {/* Hub Locations */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Bakehouses
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8a3bb5] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Lahore:</strong> DHA Phase 5 & Gulberg III
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8a3bb5] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Karachi:</strong> Clifton Block 4
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8a3bb5] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-200">Islamabad:</strong> F-7 Markaz
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white tracking-wider uppercase">
              Bake Hours
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>10:00 AM – 1:00 AM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8a3bb5]" />
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
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200/60 gap-4">
          <p>© {new Date().getFullYear()} Sweetilo Homemade Bakery Prototype. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-[11px] bg-[#2a1338] border border-purple-900/50 px-3 py-1 rounded-full text-purple-200">
              Serving: Lahore • Karachi • Islamabad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
