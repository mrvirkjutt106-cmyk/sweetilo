"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CothmShield from "@/components/CothmShield";

export default function BentoGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 items-stretch">
        {/* ================= CARD 1: ARTISAN COOKIES ================= */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25 }}
          className="col-span-1 group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 bg-stone-100 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/4.5] flex flex-col justify-between"
        >
          <Link href="/category/cookies" className="absolute inset-0 z-20">
            <span className="sr-only">View Artisan Cookies</span>
          </Link>

          {/* Full-bleed background image */}
          <img
            src="/artisan-cookies.jpg"
            alt="Artisan Cookies"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Top-left: Yellow Pill Badge 'TOP SELLER' */}
          <div className="relative z-10 p-3 sm:p-4">
            <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-[#E5B942] text-stone-900 text-[9px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm">
              TOP SELLER
            </span>
          </div>

          {/* Bottom Title Text */}
          <div className="relative z-10 p-3 sm:p-5">
            <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">
              Artisan Cookies
            </h3>
          </div>
        </motion.div>

        {/* ================= CARD 2: BELGIAN NOIR GANACHE CAKE ================= */}
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.25 }}
          className="col-span-1 group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 bg-stone-100 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[4/4.5] flex flex-col justify-between"
        >
          <Link href="/product/belgian-noir-ganache-cake" className="absolute inset-0 z-20">
            <span className="sr-only">View Belgian Noir Ganache Cake</span>
          </Link>

          {/* Full-bleed background image */}
          <img
            src="/ganache-cake.jpg"
            alt="Belgian Noir Ganache Cake"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

          {/* Top-left: Purple Badge 'Chef's Signature' */}
          <div className="relative z-10 p-3 sm:p-4">
            <span className="inline-block px-2.5 sm:px-3 py-1 rounded-full bg-[#4a196d] text-white text-[9px] sm:text-[11px] font-bold tracking-wide shadow-sm border border-purple-300/30">
              Chef&apos;s Signature
            </span>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 p-3 sm:p-5 space-y-1 sm:space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-stone-950 text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider">
              <span>FRESH OUT OF OVEN</span>
            </div>
            <h3 className="font-serif text-base sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">
              Belgian Noir Ganache Cake
            </h3>
            <p className="text-[10px] sm:text-xs text-stone-200 line-clamp-1 sm:line-clamp-2 leading-relaxed drop-shadow-sm hidden xs:block">
              70% Dark Callebaut chocolate sponge with express
            </p>
          </div>
        </motion.div>

        {/* ================= CARD 3: ABOUT BRIEF ================= */}
        {/* On Mobile: spans full width (col-span-2), on Desktop: col-span-1 */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.25 }}
          className="col-span-2 lg:col-span-1 relative rounded-2xl sm:rounded-3xl bg-white border border-[#e5d2f2]/90 p-5 sm:p-7 shadow-sm hover:shadow-lg flex flex-col justify-between"
        >
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0F29] tracking-tight">
              About Brief
            </h3>
            <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans">
              Pakistan&apos;s premier micro-batch cloud bakehouse. We craft multi-tiered
              Belgian ganache Cakes, molten NYC cookies, and using premium ingredients,
              packaged using 100% French-fed butter.
            </p>

            <ul className="space-y-1.5 text-xs text-stone-600 font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#4a196d] font-bold text-sm leading-none">•</span>
                <span>Local origins in geometrie Sans-Serif</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4a196d] font-bold text-sm leading-none">•</span>
                <span>COTHM certificated in body text</span>
              </li>
            </ul>
          </div>

          {/* Bottom Row: Read Story link on left & COTHM Shield on right */}
          <div className="flex items-end justify-between pt-5 mt-2 border-t border-purple-50">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4a196d] hover:text-[#340f4e] transition-colors"
            >
              <span>Our Story</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>

            {/* COTHM Shield in the bottom right corner */}
            <div className="shrink-0">
              <CothmShield className="w-12 h-14" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
