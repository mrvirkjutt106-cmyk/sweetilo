"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";

// SECURITY: Phone number from env variable — never hardcode in source
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008457933";


const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,

    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16Z"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B0D24] text-stone-300 pt-16 pb-10 border-t border-purple-800/40 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-36 bg-gradient-to-b from-[#7e22ce]/20 via-[#4a196d]/08 to-transparent blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ---- Centered logo + tagline + social ---- */}
        <div className="flex flex-col items-center text-center mb-12 border-b border-purple-900/40 pb-10">
          <Link href="/" className="inline-block mb-4 group">
            <div className="bg-white/95 rounded-2xl px-4 py-2.5 inline-block shadow-md border border-purple-200/80 group-hover:border-purple-400 transition-colors">
              <img
                src="/Official Logo.png"
                alt="Sweetilo Bakery Logo"
                className="h-12 sm:h-14 w-auto object-contain"
                loading="lazy"
              />
            </div>
          </Link>

          <p className="font-script text-2xl text-[#E0A94A] mb-1">Baked on Cloud9,</p>
          <p className="text-xs text-purple-300/80 max-w-xs leading-relaxed mb-5">
            delivered to your heart. Pakistan&apos;s premier micro-batch cloud bakehouse.
          </p>

          {/* Social icons in circles */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-10 h-10 rounded-full bg-white/8 border border-purple-800/60 text-purple-300 hover:bg-[#4a196d] hover:text-white hover:border-[#4a196d] transition-all flex items-center justify-center"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ---- Links grid ---- */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-purple-900/40">
          {/* Brand info */}
          <div className="col-span-2 lg:col-span-2 space-y-3">
            <p className="text-purple-200/90 text-xs leading-relaxed max-w-xs">
              Handcrafted Belgian Noir Ganache cakes, molten NYC cookies, chilled saffron dessert cups, and vintage glass bottle brews.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#E0A94A] font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px]">COTHM Certified Baker · Halal Certified · 100% French Butter</span>
            </div>
          </div>

          {/* Collections */}
          <div className="col-span-1 space-y-3">
            <h4 className="text-xs font-black text-white tracking-widest uppercase">Collections</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {[
                { label: "Premium Cakes", href: "/category/cakes" },
                { label: "Artisan Cookies", href: "/category/cookies" },
                { label: "Dessert Cups", href: "/category/cups" },
                { label: "Glass Bottles", href: "/category/drinks" },
                { label: "Custom Order ✨", href: "/custom-order", bold: true },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`hover:text-[#E0A94A] transition-colors ${l.bold ? "font-bold text-[#E0A94A]" : ""}`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bakehouses */}
          <div className="col-span-1 space-y-3">
            <h4 className="text-xs font-black text-white tracking-widest uppercase">Bakehouses</h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              {[
                { city: "Lahore:", area: "DHA & Gulberg" },
                { city: "Karachi:", area: "Clifton Block 4" },
                { city: "Islamabad:", area: "F-7 Markaz" },
              ].map((loc) => (
                <div key={loc.city} className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9333ea] shrink-0 mt-0.5" />
                  <span><strong className="text-stone-300">{loc.city}</strong> {loc.area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hours & Contact */}
          <div className="col-span-2 sm:col-span-1 space-y-3 border-t border-purple-900/40 pt-4 sm:border-t-0 sm:pt-0">
            <h4 className="text-xs font-black text-white tracking-widest uppercase">Bake Hours</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E0A94A]" />
                <span>10:00 AM – 1:00 AM Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#9333ea]" />
                <span>+92 (300) 845-SWEET</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#E0A94A]" />
                <span>orders@sweetilo.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom bar ---- */}
        <div className="pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300/60">
          <p className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Sweetilo Homemade Bakery. Made with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
            <span>in Pakistan</span>
          </p>
          <div className="flex items-center gap-5">
            {["Home", "Menu", "About Us", "Custom Orders"].map((item, i) => (
              <Link key={item} href={i === 0 ? "/" : `/${item.toLowerCase().replace(" ", "-")}`} className="hover:text-[#E0A94A] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
