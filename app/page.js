"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Star, Heart, Award } from "lucide-react";
import MockupHeroSection from "@/components/MockupHeroSection";
import BentoShowcaseV3 from "@/components/BentoShowcaseV3";
import ProductCard from "@/components/ProductCard";
import CothmShield from "@/components/CothmShield";
import { TESTIMONIALS, PRODUCTS } from "@/data/data";

export default function HomePage() {
  // Top 4 bestsellers across categories
  const bestsellers = [
    PRODUCTS.find((p) => p.id === "ganache-cake") || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === "molten-nyc-cookie") || PRODUCTS[4],
    PRODUCTS.find((p) => p.id === "tiramisu-cloud-cup") || PRODUCTS[8],
    PRODUCTS.find((p) => p.id === "badami-rabri-doodh") || PRODUCTS[12],
  ];

  return (
    <div className="relative overflow-hidden bg-[#FAF7F2]">
      {/* ================= 1. SPLIT-LAYOUT HERO & FLOATING FEATURE BANNER ================= */}
      <MockupHeroSection />

      {/* ================= 2. THE BENTO-BOX SHOWCASE (4 CATEGORIES) ================= */}
      <BentoShowcaseV3 />

      {/* ================= 3. TRENDING BESTSELLERS CAROUSEL ================= */}
      <section className="py-12 sm:py-20 bg-[#FAF7F2] relative content-auto">
        {/* Soft background glow */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-0 w-72 h-72 bg-purple-200/25 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#6b21a8] border border-purple-200/90 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#9333ea]" />
                <span>Cloud9 Top Picks</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B0D24] tracking-tight">
                Trending <span className="vibrant-title-gradient">Bestsellers</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="sm:hidden text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200/80">
                Swipe treats &rarr;
              </span>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] transition-colors"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4 text-[#7e22ce]" />
              </Link>
            </div>
          </div>

          {/* Horizontal Scrolling Carousel on Mobile (1.5 to 2 cards visible), 4-col Grid on Desktop */}
          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
            {bestsellers.map((product) => (
              <div key={product.id} className="shrink-0 snap-start w-[76vw] sm:w-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. OUR STORY & COTHM CERTIFICATION ================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-purple-100 relative content-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#FAF7F2] via-[#FAF5FC] to-[#FFF9F3] p-8 sm:p-14 border border-purple-200/90 shadow-card relative overflow-hidden">
            {/* Background radiant glow */}
            <div
              aria-hidden="true"
              className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-200/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Mascot & Baker Imagery */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 p-3 rounded-full bg-white/80 shadow-card border border-purple-200/70">
                  <img
                    src="/cloud-mascot.jpg"
                    alt="Sweetilo Baker Cloud Mascot"
                    className="w-full h-full object-contain drop-shadow-[0_12px_25px_rgba(74,25,109,0.25)] animate-float-cloud"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4">
                  <CothmShield className="w-14 h-16 mx-auto drop-shadow-sm" />
                </div>
              </div>

              {/* Story Narrative */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#6b21a8] border border-purple-200/90 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Award className="w-3.5 h-3.5 text-[#9333ea]" />
                  <span>COTHM Certified Baker</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B0D24] leading-tight">
                  A Spoonful of Joy,{" "}
                  <span className="vibrant-title-gradient">Baked into Every Layer.</span>
                </h2>

                <blockquote className="font-serif text-base sm:text-lg text-stone-700 italic leading-relaxed pt-1 border-l-2 border-[#7e22ce] pl-4">
                  &ldquo;More than a title, this is a dream of creating a haven for all the sweet tooths out there. We never compromise on French butter, Belgian chocolate, or freshness.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Every morning, our cloud bakehouse prepares strictly limited micro-batches. Whether it is a multi-tiered ganache cake or warm molten cookies, each treat is boxed with care and dispatched in temperature-controlled totes across Lahore, Karachi & Islamabad.
                </p>

                <div className="pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] group transition-colors"
                  >
                    <span>Read Our Complete Story</span>
                    <ArrowRight className="w-4 h-4 text-[#7e22ce] group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. TESTIMONIALS (CUSTOMER LOVE) ================= */}
      <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2] relative content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-center mb-8 sm:mb-16">
            <div className="text-left sm:text-center max-w-xl sm:mx-auto">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7e22ce] mb-2 px-3 py-1 rounded-full bg-[#F6EFFC] border border-purple-200">
                <Heart className="w-3.5 h-3.5 fill-[#ec4899] text-[#ec4899]" />
                <span>Customer Love</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B0D24]">
                Loved Across <span className="vibrant-title-gradient">Pakistan</span>
              </h2>
            </div>
            <span className="sm:hidden text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200/80 shrink-0">
              Swipe reviews &rarr;
            </span>
          </div>

          {/* Reviews Carousel (Mobile) and Grid (Desktop) */}
          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="shrink-0 snap-start w-[78vw] sm:w-[50vw] md:w-auto bg-white p-6 sm:p-7 rounded-3xl border border-purple-200/80 shadow-card hover:shadow-card-hover hover:border-purple-300 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 gpu-accelerate"
              >
                <div>
                  <div className="flex items-center text-amber-500 mb-3.5 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-xs" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed mb-6 font-serif">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1B0D24]">{item.author}</h4>
                    <p className="text-[11px] text-stone-500">{item.city}</p>
                  </div>
                  <span className="text-[10px] bg-[#FAF5FC] text-[#6b21a8] font-bold px-2.5 py-1 rounded-full border border-purple-200/80 shadow-2xs">
                    {item.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 6. VIBRANT INVITATION CTA ================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 content-auto">
        <div className="max-w-5xl mx-auto rounded-[36px] bg-gradient-to-br from-[#230737] via-[#4a196d] to-[#6f22a5] p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden ring-1 ring-purple-400/20">
          {/* Ambient inner glow */}
          <div
            aria-hidden="true"
            className="absolute top-0 right-1/4 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Pure Homemade Magic
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Ready to indulge in Cloud9?
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
              Explore our complete menu of artisan cakes, molten cookies, dessert cups, and cold bottle milks delivered in temperature-controlled totes.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-3">
              <Link
                href="/menu"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 text-[#230737] text-xs sm:text-sm font-extrabold hover:shadow-vibrant-gold hover:scale-102 transition-all shadow-lg active:scale-98"
              >
                Browse Full Menu
              </Link>
              <Link
                href="/custom-order"
                className="px-7 py-3.5 rounded-full bg-white/10 text-white border border-white/25 text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all active:scale-98"
              >
                Custom Celebration Order
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
