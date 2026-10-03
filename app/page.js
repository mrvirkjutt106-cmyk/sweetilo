"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, Heart, Award } from "lucide-react";
import HeroV3 from "@/components/HeroV3";
import BentoShowcaseV3 from "@/components/BentoShowcaseV3";
import CothmShield from "@/components/CothmShield";
import { TESTIMONIALS } from "@/data/data";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-[#FAF7F2]">
      {/* ================= 1. IMMERSIVE 90VH HERO SECTION ================= */}
      <HeroV3 />

      {/* ================= 2. THE BENTO-BOX SHOWCASE (4 CATEGORIES) ================= */}
      <BentoShowcaseV3 />

      {/* ================= 3. OUR STORY & COTHM CERTIFICATION ================= */}
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

      {/* ================= 4. TESTIMONIALS (CUSTOMER LOVE) ================= */}
      <section className="py-16 sm:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4a196d] mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#4a196d]" />
              <span>Customer Love</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29]">
              Loved Across Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white p-6 sm:p-7 rounded-3xl border border-[#e5d2f2] shadow-sm flex flex-col justify-between"
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
