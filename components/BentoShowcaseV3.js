"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/data";

export default function BentoShowcaseV3() {
  // Bento layouts for the 4 categories
  const bentoConfigs = [
    {
      ...CATEGORIES[0], // Premium Cakes
      gridClass: "lg:col-span-7 min-h-[380px] sm:min-h-[440px]",
      tag: "Signature Creation",
      accent: "from-purple-900/90 via-black/40 to-transparent",
    },
    {
      ...CATEGORIES[1], // Artisan Cookies
      gridClass: "lg:col-span-5 min-h-[380px] sm:min-h-[440px]",
      tag: "NYC Molten Chunks",
      accent: "from-amber-950/90 via-black/40 to-transparent",
    },
    {
      ...CATEGORIES[2], // Dessert Cups
      gridClass: "lg:col-span-5 min-h-[360px] sm:min-h-[420px]",
      tag: "Saffron Cloud Tubs",
      accent: "from-rose-950/90 via-black/40 to-transparent",
    },
    {
      ...CATEGORIES[3], // Glass Bottle Milks
      gridClass: "lg:col-span-7 min-h-[360px] sm:min-h-[420px]",
      tag: "Vintage Slow-Steeped",
      accent: "from-emerald-950/90 via-black/40 to-transparent",
    },
  ];

  return (
    <section id="bento-showcase" className="w-full py-12 sm:py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29] tracking-tight">
              The Cloud9 Showcase
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#381054] transition-colors group"
          >
            <span>View All Menu Items</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Clean CSS Grid (Bento Box style) for the 4 Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {bentoConfigs.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
              className={`group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl border border-stone-200/90 bg-stone-900 flex flex-col justify-between ${cat.gridClass}`}
            >
              {/* Entire Card Click Target */}
              <Link
                href={`/category/${cat.slug}`}
                className="absolute inset-0 z-20"
              >
                <span className="sr-only">Explore {cat.name}</span>
              </Link>

              {/* Edge-to-Edge High Quality Imagery */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Gradient Scrim Overlay for Maximum Contrast */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${cat.accent} pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-95`}
              />

              {/* Top Row: Category Tag & Arrow Pill */}
              <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between">
                <span className="inline-block px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
                  {cat.tag}
                </span>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#4a196d] transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>

              {/* Bottom Content: Category Name & Tagline (STRICT RULE: NO PRICES) */}
              <div className="relative z-10 p-5 sm:p-8 space-y-2">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold drop-shadow-sm">
                  Handcrafted Micro-Batch
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight drop-shadow-md">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-200/90 max-w-md line-clamp-2 leading-relaxed drop-shadow-sm">
                  {cat.tagline}
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    <span>Explore Collection</span>
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
