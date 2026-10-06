"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart } from "lucide-react";

export default function MockupHeroSection() {
  const whatsappUrl =
    "https://wa.me/923001234567?text=Hi%20Sweetilo!%20I'd%20like%20to%20order%20some%20fresh%20treats.";

  return (
    <div className="relative w-full overflow-hidden">
      {/* ================= 2-COLUMN SPLIT HERO SECTION ================= */}
      <section className="relative w-full bg-gradient-to-br from-[#F5EEFA] via-[#FAF5FC] to-[#FFF9F3] pt-4 sm:pt-12 pb-14 sm:pb-24 overflow-hidden">
        {/* Hardware-accelerated vibrant ambient glow circles (0-byte network cost) */}
        <div
          aria-hidden="true"
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-purple-300/30 via-fuchsia-200/20 to-transparent blur-3xl pointer-events-none gpu-accelerate"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/3 -right-20 w-[420px] h-[420px] rounded-full bg-gradient-to-bl from-amber-200/30 via-purple-200/25 to-transparent blur-3xl pointer-events-none gpu-accelerate"
        />

        {/* Lightweight floating decorative sparkles (CSS GPU animated, instant load on 2G/3G) */}
        <div
          aria-hidden="true"
          className="hidden sm:block absolute top-12 left-[12%] text-purple-400/60 animate-float-cloud pointer-events-none"
        >
          <Sparkles className="w-5 h-5 text-[#9333ea]" />
        </div>
        <div
          aria-hidden="true"
          className="hidden sm:block absolute top-28 right-[10%] text-amber-400/70 animate-float-cloud pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        >
          <svg className="w-6 h-6 fill-amber-400/80" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.2h7.6l-6.1 4.5 2.3 7.3-6.2-4.6-6.2 4.6 2.3-7.3-6.1-4.5h7.6z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
            {/* LEFT COLUMN: Content (Uses CSS animation for instant render on low internet) */}
            <div className="lg:col-span-6 space-y-3.5 sm:space-y-5 text-left z-10 animate-enter-fade gpu-accelerate">
              {/* Decorative script-font text 'Made with Love,' with drawn heart icon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-purple-200/80 shadow-xs">
                <span className="text-[#7e22ce] font-script text-xl sm:text-2xl font-bold -rotate-1">
                  Made with Love,
                </span>
                <Heart className="w-4 h-4 text-[#ec4899] fill-[#ec4899] animate-pulse" />
                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider pl-1 border-l border-purple-200">
                  Micro-Batch Cloud Bakehouse
                </span>
              </div>

              {/* Main Headline: 'Baked on Cloud9, delivered to your heart' */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-[#230737] leading-[1.08] tracking-[-0.03em]">
                Baked on{" "}
                <span className="vibrant-title-gradient drop-shadow-xs">
                  Cloud9,
                </span>{" "}
                <br />
                <span className="inline-flex items-center flex-wrap gap-1.5 sm:gap-2">
                  delivered to your heart
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 sm:w-10 sm:h-10 fill-rose-500/10 stroke-[#e11d48] stroke-2 inline-block -rotate-6 translate-y-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </h1>

              {/* Vibrant decorative separator */}
              <div className="flex items-center gap-2 py-0.5">
                <div className="h-[2px] w-12 sm:w-16 bg-gradient-to-r from-[#4a196d] to-[#9333ea] rounded-full" />
                <span className="text-xs text-[#ec4899]">✦</span>
                <div className="h-[2px] w-20 sm:w-28 bg-gradient-to-r from-[#9333ea] to-amber-300 rounded-full" />
              </div>

              {/* Body Text */}
              <p className="text-stone-700 font-sans text-xs sm:text-base leading-relaxed max-w-lg font-normal">
                We bake more than just cakes — we bake pure happiness. From our
                boutique kitchen to your doorstep, every treat is crafted with French
                butter, Belgian couverture chocolate, and wholesome love.
              </p>

              {/* Two Buttons Side-by-Side with vibrant styling */}
              <div className="pt-2 sm:pt-3 flex items-center gap-3 sm:gap-4 flex-wrap">
                {/* 1. Vibrant Purple Gradient 'Order on WhatsApp' */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#4a196d] via-[#6f22a5] to-[#7e22ce] hover:from-[#3a1357] hover:to-[#6b21a8] text-white text-xs sm:text-sm font-bold tracking-wide shadow-vibrant-purple hover:shadow-lg transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 active:scale-98"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current text-emerald-300"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16ZM16.49 14.34C16.25 14.22 15.04 13.63 14.82 13.55C14.59 13.47 14.43 13.43 14.26 13.67C14.1 13.91 13.62 14.47 13.47 14.64C13.33 14.8 13.18 14.82 12.94 14.7C12.7 14.58 11.93 14.33 11.01 13.51C10.29 12.87 9.8 12.08 9.66 11.84C9.52 11.6 9.64 11.47 9.76 11.35C9.87 11.24 10.01 11.06 10.13 10.92C10.25 10.78 10.29 10.68 10.37 10.52C10.45 10.36 10.41 10.22 10.35 10.1C10.29 9.98 9.8 8.78 9.6 8.29C9.4 7.82 9.2 7.88 9.05 7.87L8.57 7.86C8.41 7.86 8.14 7.92 7.92 8.16C7.7 8.4 7.07 8.99 7.07 10.2C7.07 11.41 7.95 12.58 8.07 12.74C8.19 12.9 9.8 15.38 12.26 16.44C12.85 16.7 13.31 16.85 13.66 16.96C14.25 17.15 14.79 17.12 15.22 17.06C15.7 16.99 16.69 16.46 16.9 15.87C17.1 15.28 17.1 14.78 17.04 14.68C16.98 14.58 16.73 14.46 16.49 14.34Z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                </a>

                {/* 2. Vibrant Outlined 'Explore Menu' */}
                <Link
                  href="/menu"
                  className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl border-2 border-[#7e22ce]/70 bg-white/70 hover:bg-[#F6EFFC] text-[#4a196d] hover:border-[#7e22ce] text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0 shadow-xs active:scale-98"
                >
                  <span>Explore Menu</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-current stroke-2 text-[#7e22ce]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                    <path d="M4 16s4-1 8 0 8 0 8 0" />
                    <path d="M2 21h20" />
                    <path d="M12 5V2" />
                    <circle cx="12" cy="1" r="1" fill="currentColor" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* RIGHT COLUMN: Hero image with instant vibrant shimmer skeleton (renders before image arrives over slow 2G/3G) */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative pt-2 lg:pt-0 animate-enter-fade gpu-accelerate">
              <div className="relative w-full max-w-[290px] xs:max-w-[350px] sm:max-w-[430px] lg:max-w-none aspect-[16/11] sm:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 ring-4 ring-purple-100/60 bg-gradient-to-br from-[#F6EFFC] to-[#FAF7F2] vibrant-shimmer group">
                <Image
                  src="/hero-lavender-cake.jpg"
                  alt="Sweetilo Lavender Drip Cake on pedestal stand"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle soft gradient rim overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#230737]/35 via-transparent to-transparent pointer-events-none" />

                {/* Floating micro-chip over image */}
                <div className="absolute bottom-3.5 left-3.5 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-200/80 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-bold text-[#230737]">
                    Fresh Micro-Batch Today
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FLOATING FEATURE BANNER WITH VIBRANT ICON BADGES ================= */}
      <div className="relative z-30 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 -mt-8 sm:-mt-14">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_12px_36px_rgba(74,25,109,0.1)] border border-purple-200/90 p-3.5 sm:p-7 animate-enter-fade gpu-accelerate">
          {/* Mobile: Horizontal Swipeable Row. Desktop: 4-col grid with vibrant styling */}
          <div className="flex flex-row overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6 sm:divide-x divide-purple-100/80 pb-1 sm:pb-0">
            {/* Col 1: Premium Ingredients (Vibrant Purple Glow) */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[230px] sm:min-w-0 bg-[#FAF6FD] sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none sm:px-3 hover:bg-purple-50/40 transition-colors">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#7e22ce] to-[#4a196d] text-white flex items-center justify-center shrink-0 shadow-sm ring-2 ring-purple-200/80">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">
                  Premium Ingredients
                </h4>
                <p className="text-[11px] sm:text-[12px] text-stone-600 mt-0.5 leading-snug">
                  100% French butter & Belgian chocolate.
                </p>
              </div>
            </div>

            {/* Col 2: Freshly Baked (Vibrant Honey Amber Glow) */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[230px] sm:min-w-0 bg-[#FFFBF2] sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none sm:px-3 hover:bg-amber-50/40 transition-colors">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-white flex items-center justify-center shrink-0 shadow-sm ring-2 ring-amber-200/80">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
                  <path d="M4 16s4-1 8 0 8 0 8 0" />
                  <path d="M2 21h20" />
                  <path d="M12 5V2" />
                  <circle cx="12" cy="1" r="1" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">
                  Freshly Baked
                </h4>
                <p className="text-[11px] sm:text-[12px] text-stone-600 mt-0.5 leading-snug">
                  Every order freshly baked on Cloud9.
                </p>
              </div>
            </div>

            {/* Col 3: Timely Delivery (Vibrant Indigo Glow) */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[230px] sm:min-w-0 bg-[#F5F8FF] sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none sm:px-3 hover:bg-indigo-50/40 transition-colors">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#6366F1] to-[#4338CA] text-white flex items-center justify-center shrink-0 shadow-sm ring-2 ring-indigo-200/80">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="18" r="3" />
                  <path d="M9 18h6" />
                  <path d="M17 15l-3-6H7l1 6" />
                  <path d="M14 9l1-4h3" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">
                  Timely Delivery
                </h4>
                <p className="text-[11px] sm:text-[12px] text-stone-600 mt-0.5 leading-snug">
                  On-time chilled delivery totes.
                </p>
              </div>
            </div>

            {/* Col 4: Made with Love (Vibrant Rose Berry Glow) */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[230px] sm:min-w-0 bg-[#FFF5F8] sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none sm:px-3 hover:bg-rose-50/40 transition-colors">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#BE185D] text-white flex items-center justify-center shrink-0 shadow-sm ring-2 ring-rose-200/80">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">
                  Made with Love
                </h4>
                <p className="text-[11px] sm:text-[12px] text-stone-600 mt-0.5 leading-snug">
                  Baked on Cloud9, delivered to your heart.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
