"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles, Eye } from "lucide-react";
import Hero3DCakeCanvas from "@/components/3d/Hero3DCakeCanvas";

// SECURITY: Phone number sourced from env variable, URL built with encodeURIComponent
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923008457933";

export default function MockupHeroSection() {
  const [viewMode, setViewMode] = useState("3d");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hi Sweetilo! I'd like to order some fresh treats."
  )}`;

  // Draw doodle underline after mount
  const underlineRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      if (underlineRef.current) {
        underlineRef.current.classList.add("drawn");
      }
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <circle cx="12" cy="8" r="5" /><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12" />
        </svg>
      ),
      label: "Premium Ingredients",
      sub: "French butter & Belgian chocolate",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ),
      label: "Homemade Taste",
      sub: "Baked with love every morning",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 2l2.4 7.4h7.6l-6.2 4.6 2.4 7.4L12 17l-6.2 4.4 2.4-7.4L2 9.4h7.6z" />
        </svg>
      ),
      label: "Premium Quality",
      sub: "COTHM certified micro-batches",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full bg-[#FAF7F2] pt-8 sm:pt-14 pb-20 sm:pb-32 overflow-hidden">

        {/* ---- Large organic blob behind right image (SVG, GPU-animated) ---- */}
        <div
          aria-hidden="true"
          className="absolute top-[-80px] right-[-100px] w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] pointer-events-none animate-blob"
          style={{ zIndex: 0 }}
        >
          <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M290,50 C420,30 530,130 540,250 C550,380 460,500 330,520 C200,540 80,450 60,320 C40,190 150,70 290,50Z"
              fill="#F6EFFC"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* ---- Secondary accent blob top-left ---- */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -left-28 w-72 h-72 sm:w-96 sm:h-96 pointer-events-none animate-blob-slow"
          style={{ zIndex: 0 }}
        >
          <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M200,40 C290,20 360,100 370,200 C380,300 310,380 210,390 C110,400 30,320 40,210 C50,100 110,60 200,40Z"
              fill="#E0A94A"
              opacity="0.12"
            />
          </svg>
        </div>

        {/* ---- Gold brush-stroke circle behind hero image ---- */}
        <div
          aria-hidden="true"
          className="absolute top-6 right-0 sm:right-8 lg:right-[8%] w-64 h-64 sm:w-80 sm:h-80 pointer-events-none"
          style={{ zIndex: 1 }}
        >
          <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-blob-slow">
            <circle cx="150" cy="150" r="130" fill="#E0A94A" opacity="0.18" />
          </svg>
        </div>

        {/* ---- Small floating doodle sparkles ---- */}
        <div aria-hidden="true" className="absolute top-16 left-[18%] pointer-events-none animate-float-cloud hidden sm:block" style={{ zIndex: 2 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l1.8 5.6H19l-4.6 3.4 1.8 5.6L12 13.2l-4.2 3.4 1.8-5.6L5 7.6h5.2z" fill="#E0A94A" opacity="0.7"/>
          </svg>
        </div>
        <div aria-hidden="true" className="absolute bottom-24 left-[12%] pointer-events-none animate-float-cloud hidden sm:block" style={{ animationDelay:"2s", zIndex: 2 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#9333ea" opacity="0.5"><circle cx="12" cy="12" r="8"/></svg>
        </div>
        <div aria-hidden="true" className="absolute top-36 right-[22%] pointer-events-none animate-float-cloud hidden lg:block" style={{ animationDelay:"3.5s", zIndex: 2 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a196d" strokeWidth="2" opacity="0.4">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative" style={{ zIndex: 3 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">

            {/* ===== LEFT COLUMN: Text content (Centralized on mobile) ===== */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-5 text-center lg:text-left flex flex-col items-center lg:items-start">

              {/* Handwritten script tagline */}
              <div className="hero-slide-up hero-slide-up-1 inline-flex items-center justify-center lg:justify-start gap-2">
                <span className="font-script text-2xl sm:text-3xl text-[#4a196d] font-bold -rotate-1">
                  Freshly Baked,
                </span>
                <Heart className="w-5 h-5 text-[#ec4899] fill-[#ec4899] animate-pulse shrink-0" />
              </div>

              {/* Main two-line bold headline */}
              <div className="hero-slide-up hero-slide-up-2 text-center lg:text-left">
                <h1 className="font-sans text-[2.4rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.8rem] font-extrabold text-[#230737] leading-[1.07] tracking-[-0.03em]">
                  Baked on{" "}
                  <span className="relative inline-block text-[#4a196d]">
                    Cloud9,
                    {/* Doodle underline SVG */}
                    <svg
                      ref={underlineRef}
                      className="doodle-underline absolute -bottom-2 left-0 w-full overflow-visible"
                      height="10"
                      viewBox="0 0 200 10"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4,7 C40,2 80,9 120,5 C160,1 185,8 196,6"
                        stroke="#E0A94A"
                        strokeWidth="3.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <br />
                  <span className="text-[#1B0D24]">delivered to your</span>{" "}
                  <span className="text-[#4a196d]">heart.</span>
                </h1>
              </div>

              {/* Body text */}
              <p className="hero-slide-up hero-slide-up-3 text-stone-600 text-sm sm:text-base leading-relaxed max-w-md font-sans mx-auto lg:mx-0 text-center lg:text-left">
                We bake more than just cakes — we bake pure happiness. From our boutique kitchen to your doorstep, every treat is crafted with French butter, Belgian couverture chocolate, and wholesome love.
              </p>

              {/* CTA Buttons */}
              <div className="hero-slide-up hero-slide-up-4 flex items-center justify-center lg:justify-start gap-3 flex-wrap pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-btn bg-[#4a196d] hover:bg-[#5c1b89] text-white shadow-[0_8px_24px_rgba(74,25,109,0.30)] text-sm"
                >
                  Order Now
                  <span className="pill-arrow">→</span>
                </a>
                <Link
                  href="/menu"
                  className="pill-btn bg-white border-2 border-[#4a196d]/70 text-[#4a196d] hover:bg-[#F6EFFC] shadow-sm text-sm"
                >
                  Explore Menu
                  <span className="pill-arrow text-[#9333ea]">→</span>
                </Link>
              </div>

              {/* Feature icons row with dividers */}
              <div className="hero-slide-up hero-slide-up-5 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-0 pt-4 border-t border-purple-100/80 w-full justify-center">
                {features.map((feat, i) => (
                  <React.Fragment key={feat.label}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-1.5 sm:gap-2.5 sm:px-4 py-1.5 first:sm:pl-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center shrink-0">
                        {feat.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10.5px] sm:text-[12px] font-bold text-[#1B0D24] leading-tight">{feat.label}</p>
                        <p className="hidden sm:block text-[11px] text-stone-500 leading-tight">{feat.sub}</p>
                      </div>
                    </div>
                    {i < features.length - 1 && (
                      <div className="h-8 w-px bg-purple-200/60 shrink-0 hidden sm:block" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* ===== RIGHT COLUMN: Hero image with blob ===== */}
            <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative pt-4 lg:pt-0">
              {/* Small rotated handwritten badge */}
              <div
                className="absolute top-6 left-4 sm:left-8 lg:-left-4 z-10 bg-white rounded-2xl px-3 py-2 shadow-md border border-purple-200/70 rotate-[-8deg] animate-float-cloud"
                style={{ animationDelay:"1s" }}
                aria-hidden="true"
              >
                <span className="font-script text-sm text-[#4a196d] font-bold block leading-tight">Made with</span>
                <span className="font-script text-sm text-[#4a196d] font-bold flex items-center gap-1 leading-tight">
                  Love <Heart className="w-3.5 h-3.5 text-[#ec4899] fill-[#ec4899]" />
                </span>
              </div>

              {/* Hero image container */}
              <div className="relative w-full max-w-[340px] sm:max-w-[440px] lg:max-w-[520px] xl:max-w-[580px]">
                {/* Organic blob background */}
                <div className="absolute inset-[-10%] pointer-events-none" aria-hidden="true">
                  <svg viewBox="0 0 500 480" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-blob">
                    <path
                      d="M240,30 C360,10 460,100 465,230 C470,360 380,460 250,465 C120,470 20,370 25,240 C30,110 120,50 240,30Z"
                      fill="#F6EFFC"
                      opacity="0.9"
                    />
                  </svg>
                </div>

                {/* View Mode Switcher Toggle (3D Interactive vs Studio Photo) */}
                <div className="absolute -top-3.5 right-2 sm:right-4 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-md p-1 rounded-full border border-purple-200/80 shadow-[0_4px_16px_rgba(74,25,109,0.12)]">
                  <button
                    onClick={() => setViewMode("3d")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      viewMode === "3d"
                        ? "bg-[#4a196d] text-white shadow-xs"
                        : "text-[#4a196d] hover:bg-purple-50"
                    }`}
                    aria-label="Switch to 3D view"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>3D Interactive</span>
                  </button>
                  <button
                    onClick={() => setViewMode("photo")}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      viewMode === "photo"
                        ? "bg-[#4a196d] text-white shadow-xs"
                        : "text-[#4a196d] hover:bg-purple-50"
                    }`}
                    aria-label="Switch to Photo view"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Photo</span>
                  </button>
                </div>

                {viewMode === "3d" ? (
                  <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(74,25,109,0.18)] border-2 border-white/90 bg-gradient-to-b from-[#F6EFFC]/70 via-white to-[#F6EFFC]/50 flex items-center justify-center p-2 min-h-[380px] sm:min-h-[460px]">
                    <Hero3DCakeCanvas />
                  </div>
                ) : (
                  <div className="relative rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(74,25,109,0.22)] border-2 border-white/80 hero-image-in">
                    <Image
                      src="/hero-lavender-cake.jpg"
                      alt="Sweetilo Lavender Drip Cake — Baked on Cloud9"
                      width={580}
                      height={440}
                      priority
                      className="w-full h-auto object-cover object-center"
                      sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 580px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#230737]/30 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-200/80 shadow-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" />
                      <span className="text-[11px] font-bold text-[#230737]">Fresh Micro-Batch Today</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ===== WAVY BOTTOM DIVIDER ===== */}
        <div className="wave-bottom" aria-hidden="true" style={{ zIndex: 4 }}>
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,30 C200,55 400,10 600,35 C800,58 1000,12 1200,38 C1320,52 1400,28 1440,32 L1440,62 L0,62Z" fill="#FAF7F2" />
          </svg>
        </div>
      </section>

      {/* ===== FLOATING FEATURE BANNER ===== */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 pb-4">
        <div className="bg-white/96 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-[0_12px_40px_rgba(74,25,109,0.10)] border border-purple-200/80 p-4 sm:p-7">
          <div className="flex flex-row overflow-x-auto snap-x hide-scrollbar gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-0 pb-1 sm:pb-0 sm:divide-x divide-purple-100/80">
            {/* Col 1 */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[210px] sm:min-w-0 sm:px-5 hover:bg-purple-50/30 rounded-xl transition-colors py-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#7e22ce] to-[#4a196d] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><circle cx="12" cy="8" r="5"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.12"/></svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">Premium Ingredients</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">100% French butter &amp; Belgian chocolate.</p>
              </div>
            </div>
            {/* Col 2 */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[210px] sm:min-w-0 sm:px-5 hover:bg-amber-50/30 rounded-xl transition-colors py-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#E0A94A] to-[#C67D24] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s4-1 8 0 8 0 8 0"/><path d="M2 21h20"/><path d="M12 5V2"/><circle cx="12" cy="1" r="1" fill="currentColor"/></svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">Freshly Baked</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">Every order freshly baked on Cloud9.</p>
              </div>
            </div>
            {/* Col 3 */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[210px] sm:min-w-0 sm:px-5 hover:bg-purple-50/30 rounded-xl transition-colors py-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#6f22a5] to-[#4a196d] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><path d="M9 18h6"/><path d="M17 15l-3-6H7l1 6"/><path d="M14 9l1-4h3"/></svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">Timely Delivery</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">On-time chilled delivery totes.</p>
              </div>
            </div>
            {/* Col 4 */}
            <div className="flex items-center gap-3.5 shrink-0 snap-start min-w-[210px] sm:min-w-0 sm:px-5 hover:bg-rose-50/20 rounded-xl transition-colors py-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#ec4899] to-[#be185d] text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1B0D24] leading-tight">Made with Love</h4>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">Baked on Cloud9, delivered to your heart.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
