"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MockupHeroSection() {
  const whatsappUrl =
    "https://wa.me/923001234567?text=Hi%20Sweetilo!%20I'd%20like%20to%20order%20some%20fresh%20treats.";

  return (
    <div className="relative w-full overflow-hidden">
      {/* ================= 2-COLUMN SPLIT HERO SECTION ================= */}
      <section className="relative w-full bg-gradient-to-r from-[#F5EEFA] via-[#FAF5FC] to-[#FBF8FD] pt-8 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            {/* LEFT COLUMN: Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-4 sm:space-y-5 text-left z-10"
            >
              {/* Decorative script-font text 'Made with Love,' with drawn heart icon */}
              <div className="flex items-center gap-1.5 text-[#4a196d] font-script text-2xl sm:text-3xl">
                <span>Made with Love,</span>
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2 -rotate-12 translate-y-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>

              {/* Main Headline: 'Baked on Cloud9, delivered to your heart' with outline heart */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-[#4a196d] leading-[1.12] tracking-tight">
                Baked on Cloud9, <br />
                <span className="inline-flex items-center gap-2">
                  delivered to your heart
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 sm:w-10 sm:h-10 fill-none stroke-[#4a196d] stroke-2 inline-block -rotate-6 translate-y-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </span>
              </h1>

              {/* Subtle decorative separator with tiny heart */}
              <div className="flex items-center gap-2.5 py-1">
                <div className="h-[1px] w-14 bg-purple-200/90" />
                <span className="text-xs text-purple-400">♥</span>
                <div className="h-[1px] w-24 bg-purple-200/90" />
              </div>

              {/* Body Text */}
              <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed max-w-lg">
                We bake more than just cakes — we bake happiness. From our
                kitchen to your doorstep, every bite is made with love and the
                finest ingredients.
              </p>

              {/* Two Buttons Side-by-Side */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                {/* 1. Solid deep purple 'Order on WhatsApp' */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-[#4a196d] hover:bg-[#381054] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16ZM16.49 14.34C16.25 14.22 15.04 13.63 14.82 13.55C14.59 13.47 14.43 13.43 14.26 13.67C14.1 13.91 13.62 14.47 13.47 14.64C13.33 14.8 13.18 14.82 12.94 14.7C12.7 14.58 11.93 14.33 11.01 13.51C10.29 12.87 9.8 12.08 9.66 11.84C9.52 11.6 9.64 11.47 9.76 11.35C9.87 11.24 10.01 11.06 10.13 10.92C10.25 10.78 10.29 10.68 10.37 10.52C10.45 10.36 10.41 10.22 10.35 10.1C10.29 9.98 9.8 8.78 9.6 8.29C9.4 7.82 9.2 7.88 9.05 7.87L8.57 7.86C8.41 7.86 8.14 7.92 7.92 8.16C7.7 8.4 7.07 8.99 7.07 10.2C7.07 11.41 7.95 12.58 8.07 12.74C8.19 12.9 9.8 15.38 12.26 16.44C12.85 16.7 13.31 16.85 13.66 16.96C14.25 17.15 14.79 17.12 15.22 17.06C15.7 16.99 16.69 16.46 16.9 15.87C17.1 15.28 17.1 14.78 17.04 14.68C16.98 14.58 16.73 14.46 16.49 14.34Z" />
                  </svg>
                  <span>Order on WhatsApp</span>
                </a>

                {/* 2. Outlined 'Explore Menu' with small cake icon */}
                <Link
                  href="/menu"
                  className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl border-2 border-[#4a196d] text-[#4a196d] hover:bg-[#F6EFFC] text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Menu</span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-none stroke-current stroke-2"
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
            </motion.div>

            {/* RIGHT COLUMN: Large prominent purple drip cake image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6 flex justify-center lg:justify-end relative"
            >
              <div className="relative w-full max-w-[540px] lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/60">
                <Image
                  src="/hero-lavender-cake.jpg"
                  alt="Sweetilo Lavender Drip Cake on pedestal stand"
                  fill
                  priority
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= 3. FLOATING FEATURE BANNER ================= */}
      {/* Overlaps the bottom edge of the hero section */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_12px_45px_rgba(74,25,109,0.09)] border border-purple-100/80 p-6 sm:p-7"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4 lg:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-purple-100/70">
            {/* Col 1: Premium Ingredients */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-3 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#EDE4F6] text-[#4a196d] flex items-center justify-center shrink-0 shadow-xs">
                {/* Ribbon / Rosette icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F0F29] leading-tight">
                  Premium Ingredients
                </h4>
                <p className="text-[12px] text-stone-500 mt-0.5 leading-snug">
                  We use only the finest quality ingredients.
                </p>
              </div>
            </div>

            {/* Col 2: Freshly Baked */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#EDE4F6] text-[#4a196d] flex items-center justify-center shrink-0 shadow-xs">
                {/* Cake icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
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
                <h4 className="text-sm font-bold text-[#1F0F29] leading-tight">
                  Freshly Baked
                </h4>
                <p className="text-[12px] text-stone-500 mt-0.5 leading-snug">
                  Every order is freshly baked with love.
                </p>
              </div>
            </div>

            {/* Col 3: Timely Delivery */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#EDE4F6] text-[#4a196d] flex items-center justify-center shrink-0 shadow-xs">
                {/* Delivery Scooter icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
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
                <h4 className="text-sm font-bold text-[#1F0F29] leading-tight">
                  Timely Delivery
                </h4>
                <p className="text-[12px] text-stone-500 mt-0.5 leading-snug">
                  On-time delivery, every time.
                </p>
              </div>
            </div>

            {/* Col 4: Made with Love */}
            <div className="flex items-center gap-3.5 sm:px-3 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#EDE4F6] text-[#4a196d] flex items-center justify-center shrink-0 shadow-xs">
                {/* Heart icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-none stroke-current stroke-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1F0F29] leading-tight">
                  Made with Love
                </h4>
                <p className="text-[12px] text-stone-500 mt-0.5 leading-snug">
                  Baked on Cloud9, delivered to your heart.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
