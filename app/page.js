"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";
import MockupHeroSection from "@/components/MockupHeroSection";
import BentoShowcaseV3 from "@/components/BentoShowcaseV3";
import ProductCard from "@/components/ProductCard";
import CothmShield from "@/components/CothmShield";
import { TESTIMONIALS, PRODUCTS, CATEGORIES } from "@/data/data";

// ── SECURITY: Build WhatsApp URL from env var, not hardcoded string ────────────
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008457933";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi Sweetilo! I'd like to order some fresh treats."
)}`;

// Scroll-reveal hook — adds .is-visible to refs when they enter viewport
function useScrollReveal(refs, options = {}) {
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
      { threshold: 0.1, ...options }
    );
    refs.forEach((ref) => { if (ref.current) observer.observe(ref.current); });
    return () => observer.disconnect();
  }, []);
}

// WaveDivider component
function WaveDivider({ flip = false, fill = "#FAF7F2", className = "" }) {
  return (
    <div className={`wave-${flip ? "bottom" : "top"} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        {flip ? (
          <path d="M0,30 C200,55 400,10 600,35 C800,58 1000,12 1200,38 C1320,52 1400,28 1440,32 L1440,62 L0,62Z" fill={fill} />
        ) : (
          <path d="M0,32 C140,10 320,55 540,28 C760,2 960,52 1200,30 C1360,14 1420,42 1440,35 L1440,0 L0,0Z" fill={fill} />
        )}
      </svg>
    </div>
  );
}

export default function HomePage() {
  // Top 4 bestsellers
  const bestsellers = [
    PRODUCTS.find((p) => p.id === "cake-01")  || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === "cookie-01") || PRODUCTS[6],
    PRODUCTS.find((p) => p.id === "cup-01")   || PRODUCTS[12],
    PRODUCTS.find((p) => p.id === "drink-01") || PRODUCTS[18],
  ];

  // Showcase 4 items (one per category)
  const showcaseItems = [
    PRODUCTS.find((p) => p.id === "cake-02"),
    PRODUCTS.find((p) => p.id === "cookie-03"),
    PRODUCTS.find((p) => p.id === "cup-03"),
    PRODUCTS.find((p) => p.id === "drink-02"),
  ].filter(Boolean);

  // Refs for scroll-reveal
  const storyRef    = useRef(null);
  const ctaRef      = useRef(null);
  const reviewsRef  = useRef(null);
  const showcaseRef = useRef(null);
  const bestsellRef = useRef(null);
  useScrollReveal([storyRef, ctaRef, reviewsRef, showcaseRef, bestsellRef]);

  // WHATSAPP_URL is defined at module level using env var + encodeURIComponent


  return (
    <div className="relative overflow-hidden bg-[#FAF7F2]">

      {/* ===== 1. HERO ===== */}
      <MockupHeroSection />

      {/* ===== 2. MENU / PRODUCT CATEGORIES ===== */}
      <BentoShowcaseV3 />

      {/* ===== 3. TRENDING BESTSELLERS ===== */}
      <section className="py-14 sm:py-20 bg-white relative content-auto">
        {/* Decorative blob */}
        <div aria-hidden="true" className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-40">
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-blob-slow">
            <path d="M160,30 C240,20 290,100 285,175 C280,255 220,300 145,295 C70,290 15,220 20,145 C25,70 80,40 160,30Z" fill="#F6EFFC"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={bestsellRef}>
          <div className="reveal flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4a196d] mb-2">— Cloud9 Top Picks</p>
              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B0D24] leading-tight">
                Trending{" "}
                <span className="text-[#4a196d] font-script font-normal text-3xl sm:text-4xl">Bestsellers</span>
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] transition-colors group shrink-0 self-start sm:self-auto"
            >
              <span>View Full Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Horizontal scroll on mobile, 4-col grid on desktop */}
          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
            {bestsellers.map((product, i) => (
              <div key={product.id} className={`shrink-0 snap-start w-[76vw] sm:w-auto reveal reveal-delay-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. STORY BANNER (full-width wavy dark section) ===== */}
      <section className="relative py-20 sm:py-28 bg-[#4a196d] overflow-hidden content-auto" ref={storyRef}>
        {/* Wave top */}
        <WaveDivider flip={false} fill="#4a196d" />

        {/* Background blob inside banner */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="absolute -right-20 -top-10 w-[520px] h-[420px] opacity-10 animate-blob">
            <path d="M400,60 C520,30 620,120 625,230 C630,350 540,450 410,460 C280,470 170,380 165,250 C160,120 280,90 400,60Z" fill="white"/>
          </svg>
          <svg viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" className="absolute -left-10 bottom-0 w-96 h-80 opacity-8 animate-blob-slow">
            <path d="M280,40 C380,20 470,110 470,220 C470,340 380,420 270,430 C160,440 60,350 60,230 C60,110 180,60 280,40Z" fill="white"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="reveal space-y-5 text-white">
              {/* Doodle leaf accent */}
              <div className="flex items-center gap-2 mb-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E0A94A" strokeWidth="2" className="animate-float-cloud shrink-0">
                  <path d="M11 20A7 7 0 0 1 4 13V3l8 1 8-1v10a7 7 0 0 1-7 7z"/><path d="M11 20v-9"/>
                </svg>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E0A94A]">Our Story</span>
              </div>

              {/* Big handwritten headline */}
              <h2 className="font-script text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
                Baked with Love
              </h2>

              {/* Supporting text */}
              <blockquote className="text-purple-100 text-sm sm:text-base leading-relaxed border-l-2 border-[#E0A94A] pl-4 italic">
                &ldquo;More than a title, this is a dream of creating a haven for all the sweet tooths out there. We never compromise on French butter, Belgian chocolate, or freshness.&rdquo;
              </blockquote>
              <p className="text-purple-200 text-xs sm:text-sm leading-relaxed max-w-lg">
                Every morning, our cloud bakehouse prepares strictly limited micro-batches. Whether it is a multi-tiered ganache cake or warm molten cookies, each treat is boxed with care and dispatched in temperature-controlled totes across Lahore, Karachi &amp; Islamabad.
              </p>

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <Link
                  href="/about"
                  className="pill-btn bg-[#E0A94A] text-[#230737] shadow-[0_6px_20px_rgba(224,169,74,0.35)] hover:bg-[#F59E0B] text-sm"
                >
                  Our Story <span className="pill-arrow">→</span>
                </Link>
                <div className="flex items-center gap-1.5 ml-2">
                  <CothmShield className="w-10 h-12" />
                  <span className="text-xs text-purple-200 font-semibold leading-tight">COTHM<br/>Certified</span>
                </div>
              </div>
            </div>

            {/* Right: Product image overlapping banner edge */}
            <div className="reveal reveal-delay-2 relative flex justify-center lg:justify-end">
              {/* Accent blob */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-20 animate-blob">
                  <circle cx="200" cy="200" r="160" fill="#E0A94A"/>
                </svg>
              </div>

              <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] rounded-[28px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.35)] border-2 border-white/20 lg:translate-y-10">
                <img
                  src="/artisan-cookies.jpg"
                  alt="Freshly baked artisan cookies — Sweetilo Cloud9"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Heart doodle overlay */}
                <div className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-md">
                  <Heart className="w-5 h-5 text-[#ec4899] fill-[#ec4899]" />
                </div>
              </div>

              {/* Floating sparkle accent */}
              <div className="absolute -bottom-4 left-4 sm:left-8 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-purple-100 rotate-[4deg] animate-float-cloud">
                <span className="font-script text-[#4a196d] text-lg font-bold block">Cloud9</span>
                <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">Micro-Batch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave bottom */}
        <WaveDivider flip={true} fill="#FAF7F2" />
      </section>

      {/* ===== 5. SECONDARY SHOWCASE — Crafted for Every Moment ===== */}
      <section className="py-14 sm:py-20 bg-[#FAF7F2] content-auto" ref={showcaseRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="reveal mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4a196d] mb-2">— Curated Selections</p>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#1B0D24] leading-tight">
                Crafted Menus{" "}
                <span className="font-script font-normal text-[#4a196d] text-3xl sm:text-4xl">for Every Moment</span>
                {/* Brush-stroke accent */}
                <svg className="inline-block ml-2 align-middle" width="28" height="16" viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2,12 C10,4 22,14 38,6" stroke="#E0A94A" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </h2>
              <p className="mt-2 text-sm text-stone-500 max-w-md leading-relaxed">
                From savory appetizers to indulgent desserts, every dish is made to tantalize your taste buds.
              </p>
            </div>
            <Link href="/menu" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#4a196d] hover:text-[#7e22ce] transition-colors group shrink-0 self-start sm:self-auto">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Desktop: 4-col row. Mobile: vertical list with thumbnail left */}
          <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-5">
            {showcaseItems.map((product, i) => (
              <div key={product.id} className={`reveal reveal-delay-${i + 1}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile: list style */}
          <div className="sm:hidden space-y-3">
            {showcaseItems.map((product, i) => (
              <div
                key={product.id}
                className={`reveal reveal-delay-${i + 1} flex items-center gap-4 bg-white rounded-2xl p-3 border border-purple-200/60 shadow-sm`}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F6EFFC]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#4a196d] mb-0.5">{product.categoryName}</p>
                  <h4 className="font-bold text-sm text-[#1B0D24] line-clamp-2 leading-tight">{product.name}</h4>
                  {product.price && (
                    <p className="text-sm font-extrabold text-[#4a196d] mt-1">₨{product.price.toLocaleString()}</p>
                  )}
                </div>
                <div className="card-arrow-btn w-9 h-9 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-purple-200/70 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. TESTIMONIALS ===== */}
      <section id="reviews" className="py-14 sm:py-20 bg-white relative content-auto" ref={reviewsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal text-center mb-10 sm:mb-14">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4a196d] mb-2">— Customer Love</p>
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1B0D24]">
              Loved Across{" "}
              <span className="text-[#4a196d]">Pakistan</span>
            </h2>
          </div>

          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className={`shrink-0 snap-start w-[78vw] sm:w-[50vw] md:w-auto bg-[#FAF7F2] p-6 rounded-3xl border border-purple-200/60 shadow-[0_4px_20px_rgba(74,25,109,0.06)] hover:shadow-[0_10px_30px_rgba(74,25,109,0.12)] hover:border-purple-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center text-amber-400 mb-3 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#E0A94A] text-[#E0A94A]" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm italic leading-relaxed mb-5 font-sans">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-[#1B0D24]">{item.author}</h4>
                    <p className="text-[11px] text-stone-400">{item.city}</p>
                  </div>
                  <span className="text-[10px] bg-[#F6EFFC] text-[#4a196d] font-bold px-2.5 py-1 rounded-full border border-purple-200/80 shadow-xs max-w-[120px] text-right leading-tight">
                    {item.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. FINAL CTA BANNER (wavy primary strip) ===== */}
      <section className="relative py-16 sm:py-24 bg-[#4a196d] overflow-hidden content-auto" ref={ctaRef}>
        <WaveDivider flip={false} fill="#4a196d" />

        {/* Background glows */}
        <div aria-hidden="true" className="absolute top-0 right-1/4 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 left-1/4 w-64 h-64 bg-[#E0A94A]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Doodle leaf top-left */}
        <div aria-hidden="true" className="absolute top-8 left-8 hidden sm:block pointer-events-none opacity-40 animate-float-cloud">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E0A94A" strokeWidth="1.5">
            <path d="M11 20A7 7 0 0 1 4 13V3l8 1 8-1v10a7 7 0 0 1-7 7z"/><path d="M11 20v-9"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="reveal lg:col-span-8 text-white space-y-4">
              {/* Handwritten line */}
              <span className="font-script text-2xl sm:text-3xl text-[#E0A94A] block">Craving Something Sweet?</span>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Ready to indulge in
                <span className="text-[#E0A94A]"> Cloud9?</span>
              </h2>

              <p className="text-purple-200 text-sm max-w-lg leading-relaxed">
                Order now and enjoy the freshest bakes, delivered with love. Explore our complete menu of artisan cakes, molten cookies, dessert cups and cold bottle milks.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/menu"
                  className="pill-btn bg-[#E0A94A] text-[#230737] shadow-[0_8px_24px_rgba(224,169,74,0.35)] hover:bg-[#F59E0B] font-black text-sm"
                >
                  Order Now <span className="pill-arrow">→</span>
                </Link>
                <Link
                  href="/custom-order"
                  className="pill-btn bg-white/10 text-white border border-white/25 hover:bg-white/20 text-sm"
                >
                  Custom Celebration Order
                </Link>
              </div>
            </div>

            {/* Right: product image peeking in */}
            <div className="reveal reveal-delay-2 lg:col-span-4 flex justify-center lg:justify-end relative">
              <div className="relative w-52 sm:w-64 lg:w-72 aspect-square rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)] border-2 border-white/20 lg:translate-y-6 animate-float-cloud">
                <img
                  src="/dessert-cups.jpg"
                  alt="Sweetilo saffron dessert cups — order now"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Sparkle doodle overlay */}
                <div className="absolute top-3 left-3" aria-hidden="true">
                  <Sparkles className="w-5 h-5 text-[#E0A94A]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <WaveDivider flip={true} fill="#FAF7F2" />
      </section>

    </div>
  );
}
