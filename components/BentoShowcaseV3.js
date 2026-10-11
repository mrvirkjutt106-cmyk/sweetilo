"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/data";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

// Tile bg colors mapped from existing palette
const TILE_COLORS = [
  "bg-[#F6EFFC]",   // Premium Cakes  — purple subtle
  "bg-[#FEF3C7]",   // Artisan Cookies — gold light
  "bg-[#FAF5FC]",   // Dessert Cups   — lavender
  "bg-[#F4EDE2]",   // Glass Milks    — cream
];

export default function BentoShowcaseV3() {
  const [loadedImages, setLoadedImages] = useState({});
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const handleImageLoad = (id) =>
    setLoadedImages((prev) => ({ ...prev, [id]: true }));

  // Scroll-reveal for cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    cardRefs.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="bento-showcase" className="w-full py-14 sm:py-20 bg-[#FAF7F2] relative overflow-hidden">

      {/* Small decorative blob top-right */}
      <div aria-hidden="true" className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none opacity-60">
        <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-blob-slow">
          <path d="M160,30 C240,20 290,100 285,175 C280,255 220,300 145,295 C70,290 15,220 20,145 C25,70 80,40 160,30Z" fill="#F6EFFC"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ---- Section Header ---- */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4 reveal" ref={(el) => { if (el) { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('is-visible'); obs.disconnect(); } }, { threshold: 0.2 }); obs.observe(el); } }}>
          <div>
            {/* Eyebrow label */}
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4a196d] mb-3">
              — Our Menu
            </p>
            <div className="relative inline-block">
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B0D24] tracking-tight leading-tight">
                Explore{" "}
                <span className="text-[#4a196d] relative">
                  Our Delicious
                  {/* Doodle underline */}
                  <svg className="doodle-underline drawn absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 240 8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M3,5 C50,2 100,7 150,4 C200,1 225,6 237,5" stroke="#E0A94A" strokeWidth="3" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                <span className="font-script font-normal text-[#4a196d] text-3xl sm:text-4xl">
                  Creations
                </span>
              </h2>
            </div>
            <p className="mt-3 text-sm text-stone-600 max-w-sm leading-relaxed">
              From warm treats to delightful pastries, made with love and the finest ingredients.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] transition-colors group shrink-0 self-end sm:self-auto"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ---- Mobile swipe hint ---- */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <span className="text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200/80">
            Swipe cards →
          </span>
        </div>

        {/* ---- 4-col Grid (2×2 on mobile, 4-col on desktop) ---- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {CATEGORIES.map((cat, idx) => {
            const isLoaded = loadedImages[cat.id];
            return (
              <div
                key={cat.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className={`reveal reveal-delay-${Math.min(idx + 1, 4)} group artisan-card`}
              >
                <Link
                  href={`/category/${cat.slug}`}
                  className="block rounded-[20px] sm:rounded-[28px] overflow-hidden border border-purple-200/70 bg-white shadow-[0_6px_24px_rgba(74,25,109,0.06)] hover:shadow-[0_16px_40px_rgba(74,25,109,0.14)] hover:border-[#9333ea]/40 transition-all duration-300"
                  aria-label={`Explore ${cat.name}`}
                >
                  {/* Colored tile background + image with 4:3 aspect ratio */}
                  <div className={`relative aspect-[4/3] w-full overflow-hidden ${TILE_COLORS[idx]}`}>
                    {/* Shimmer placeholder */}
                    {!isLoaded && <div className="absolute inset-0 vibrant-shimmer" />}

                    <img
                      src={cat.image}
                      alt={cat.name}
                      onLoad={() => handleImageLoad(cat.id)}
                      onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; handleImageLoad(cat.id); }}
                      className={`card-img w-full h-full object-cover object-center ${isLoaded ? "opacity-100" : "opacity-0"}`}
                      loading="lazy"
                      decoding="async"
                    />

                    {/* Circular arrow button bottom-right */}
                    <div className="card-arrow-btn absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#4a196d] border border-purple-200/70 flex items-center justify-center shadow-sm z-10">
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-3 sm:px-4 sm:py-3.5">
                    <h3 className="font-sans text-xs sm:text-base font-extrabold text-[#1B0D24] group-hover:text-[#4a196d] transition-colors leading-tight">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 line-clamp-2 leading-snug">
                      {cat.tagline}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-bold text-[#4a196d] mt-1.5 sm:mt-2 uppercase tracking-wider">
                      {cat.itemCount} items →
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
