"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, Heart, Award } from "lucide-react";
import MockupHeroSection from "@/components/MockupHeroSection";
import BentoShowcaseV3 from "@/components/BentoShowcaseV3";
import ProductCard from "@/components/ProductCard";
import CothmShield from "@/components/CothmShield";
import { TESTIMONIALS, PRODUCTS } from "@/data/data";

export default function HomePage() {
  // Top 4 bestsellers across categories for the mobile-responsive swipe carousel
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
      <section className="py-12 sm:py-20 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-12 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cloud9 Top Picks</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29] tracking-tight">
                Trending Bestsellers
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="sm:hidden text-[11px] font-semibold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-[#e5d2f2]">
                Swipe treats &rarr;
              </span>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#381054] transition-colors"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4" />
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
      <section className="py-16 sm:py-24 bg-white border-y border-[#e5d2f2]/70 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] sm:rounded-[40px] bg-[#FAF7F2] p-8 sm:p-14 border border-[#e5d2f2] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Mascot & Baker Imagery */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
                <div className="relative w-44 h-44 sm:w-56 sm:h-56">
                  <img
                    src="/cloud-mascot.jpg"
                    alt="Sweetilo Baker Cloud Mascot"
                    className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(74,25,109,0.2)]"
                  />
                </div>
                <div className="mt-3">
                  <CothmShield className="w-14 h-16 mx-auto" />
                </div>
              </div>

              {/* Story Narrative */}
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>COTHM Certified Baker</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1F0F29] leading-tight">
                  A Spoonful of Joy, Baked into Every Layer.
                </h2>

                <blockquote className="font-serif text-base sm:text-lg text-stone-700 italic leading-relaxed pt-1">
                  &ldquo;More than a title, this is a dream of creating a haven for all the sweet tooths out there. We never compromise on French butter, Belgian chocolate, or freshness.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
                  Every morning, our cloud bakehouse prepares strictly limited micro-batches. Whether it is a multi-tiered ganache cake or warm molten cookies, each treat is boxed with care and dispatched across Lahore, Karachi & Islamabad.
                </p>

                <div className="pt-3">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4a196d] hover:text-[#381054] group"
                  >
                    <span>Read Our Complete Story</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. TESTIMONIALS (CUSTOMER LOVE) ================= */}
      <section id="reviews" className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-center mb-8 sm:mb-16">
            <div className="text-left sm:text-center max-w-xl sm:mx-auto">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4a196d] mb-2">
                <Heart className="w-3.5 h-3.5 fill-[#4a196d]" />
                <span>Customer Love</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29]">
                Loved Across Pakistan
              </h2>
            </div>
            <span className="sm:hidden text-[11px] font-semibold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-[#e5d2f2] shrink-0">
              Swipe reviews &rarr;
            </span>
          </div>

          {/* Horizontal Scrolling Carousel on Mobile (1.5 to 2 cards visible), Grid on Desktop */}
          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 snap-start w-[78vw] sm:w-[50vw] md:w-auto bg-white p-6 sm:p-7 rounded-3xl border border-[#e5d2f2] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center text-amber-400 mb-3">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs sm:text-sm italic leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-50 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1F0F29]">{item.author}</h4>
                    <p className="text-[11px] text-stone-400">{item.city}</p>
                  </div>
                  <span className="text-[10px] bg-[#F6EFFC] text-[#4a196d] font-bold px-2 py-0.5 rounded-full border border-[#e5d2f2]">
                    {item.item}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. LUXURY INVITATION CTA ================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-[36px] bg-gradient-to-r from-[#4a196d] via-[#35104e] to-[#4a196d] p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
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
                className="px-8 py-3.5 rounded-full bg-white text-[#4a196d] text-xs sm:text-sm font-bold hover:bg-amber-300 hover:text-[#340f4e] transition-colors shadow-lg"
              >
                Browse Full Menu
              </Link>
              <Link
                href="/custom-order"
                className="px-7 py-3.5 rounded-full bg-white/10 text-white border border-white/20 text-xs sm:text-sm font-semibold hover:bg-white/20 transition-colors"
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
