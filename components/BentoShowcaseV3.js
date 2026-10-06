"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/data";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function BentoShowcaseV3() {
  const [loadedImages, setLoadedImages] = useState({});

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  // Vibrant bento configurations tailored for each bakery category
  const bentoConfigs = [
    {
      ...CATEGORIES[0], // Premium Cakes
      gridClass: "lg:col-span-7 min-h-[380px] sm:min-h-[440px]",
      tag: "Signature Creation",
      accent: "from-[#230737]/95 via-[#4a196d]/65 to-transparent",
      tagStyle: "bg-gradient-to-r from-[#4a196d] to-[#7e22ce] text-white border-purple-300/40",
      accentColor: "text-purple-200",
    },
    {
      ...CATEGORIES[1], // Artisan Cookies
      gridClass: "lg:col-span-5 min-h-[380px] sm:min-h-[440px]",
      tag: "NYC Molten Chunks",
      accent: "from-[#2d1202]/95 via-[#78350f]/60 to-transparent",
      tagStyle: "bg-gradient-to-r from-[#92400e] to-[#f59e0b] text-white border-amber-300/40",
      accentColor: "text-amber-200",
    },
    {
      ...CATEGORIES[2], // Dessert Cups
      gridClass: "lg:col-span-5 min-h-[360px] sm:min-h-[420px]",
      tag: "Saffron Cloud Tubs",
      accent: "from-[#370a27]/95 via-[#831843]/60 to-transparent",
      tagStyle: "bg-gradient-to-r from-[#9d174d] to-[#ec4899] text-white border-rose-300/40",
      accentColor: "text-rose-200",
    },
    {
      ...CATEGORIES[3], // Glass Bottle Milks
      gridClass: "lg:col-span-7 min-h-[360px] sm:min-h-[420px]",
      tag: "Vintage Slow-Steeped",
      accent: "from-[#022c22]/95 via-[#065f46]/60 to-transparent",
      tagStyle: "bg-gradient-to-r from-[#065f46] to-[#10b981] text-white border-emerald-300/40",
      accentColor: "text-emerald-200",
    },
  ];

  return (
    <section id="bento-showcase" className="w-full py-12 sm:py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#6b21a8] border border-purple-200/90 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#9333ea]" />
              <span>Curated Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B0D24] tracking-tight">
              The <span className="vibrant-title-gradient">Cloud9</span> Showcase
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] transition-colors group"
          >
            <span>View All Menu Items</span>
            <ArrowUpRight className="w-4 h-4 text-[#7e22ce] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between lg:hidden mb-3">
          <span className="text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200/80">
            Swipe cards &rarr;
          </span>
          <Link href="/menu" className="text-xs font-bold text-[#7e22ce]">
            All Items
          </Link>
        </div>

        {/* Responsive Grid with Hardware Acceleration & Instant Render */}
        <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-12 lg:gap-6 lg:overflow-visible lg:pb-0">
          {bentoConfigs.map((cat) => {
            const isLoaded = loadedImages[cat.id];

            return (
              <div
                key={cat.id}
                className={`shrink-0 snap-start w-[78vw] sm:w-[50vw] lg:w-auto group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-card hover:shadow-2xl border border-purple-200/80 bg-stone-900 flex flex-col justify-between transition-all duration-300 ease-out hover:-translate-y-1.5 gpu-accelerate ${cat.gridClass}`}
              >
                {/* Entire Card Click Target */}
                <Link
                  href={`/category/${cat.slug}`}
                  className="absolute inset-0 z-20"
                >
                  <span className="sr-only">Explore {cat.name}</span>
                </Link>

                {/* Instant Vibrant Shimmer Fallback (Loads on 0ms for slow networks) */}
                <div className="absolute inset-0 vibrant-shimmer pointer-events-none" />

                {/* Edge-to-Edge High Quality Imagery */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  onLoad={() => handleImageLoad(cat.id)}
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                    handleImageLoad(cat.id);
                  }}
                  className={`absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-all duration-700 ease-out ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  decoding="async"
                />

                {/* Vibrant Gradient Scrim Overlay for Contrast */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${cat.accent} pointer-events-none transition-opacity duration-300 opacity-90 group-hover:opacity-95`}
                />

                {/* Top Row: Category Tag & Arrow Pill */}
                <div className="relative z-10 p-5 sm:p-7 flex items-center justify-between">
                  <span
                    className={`inline-block px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm border ${cat.tagStyle}`}
                  >
                    {cat.tag}
                  </span>

                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white flex items-center justify-center group-hover:bg-white group-hover:text-[#4a196d] transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Bottom Content: Category Name & Tagline */}
                <div className="relative z-10 p-5 sm:p-8 space-y-2">
                  <span className="text-xs uppercase tracking-widest text-amber-300 font-bold drop-shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Handcrafted Micro-Batch
                  </span>
                  <h3 className="font-serif text-2xl sm:text-4xl lg:text-4xl font-bold text-white leading-tight drop-shadow-md">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 max-w-md line-clamp-2 leading-relaxed drop-shadow-sm">
                    {cat.tagline}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                      <span>Explore Collection</span>
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
