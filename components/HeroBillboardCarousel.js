"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const PROMOTIONAL_SLIDES = [
  {
    id: "slide-1",
    image: "/hero-slide-1.jpg",
    badge: "Chef's Signature • Limited Batch",
    headline: "Belgian Noir Ganache Cake",
    description:
      "Handcrafted with 70% dark Belgian Callebaut chocolate, French grass-fed butter, and 24K edible gold leaf. Pure luxury baked for your most unforgettable moments.",
    primaryCta: {
      label: "Order Ganache Cake",
      href: "/category/cakes",
    },
    secondaryCta: {
      label: "View All Cakes",
      href: "/category/cakes",
    },
  },
  {
    id: "slide-2",
    image: "/hero-slide-2.jpg",
    badge: "Baked Fresh Daily • Warm Dispatch",
    headline: "Molten NYC Chunk Cookies",
    description:
      "Thick, caramelized Levain-style cookies pooled with rich Guittard chocolate pockets and toasted walnuts. Dispatched warm straight from Cloud9 to your doorstep.",
    primaryCta: {
      label: "Order NYC Cookies",
      href: "/category/cookies",
    },
    secondaryCta: {
      label: "Explore Menu",
      href: "/menu",
    },
  },
  {
    id: "slide-3",
    image: "/hero-slide-3.jpg",
    badge: "Bespoke Centerpiece • 3-Day Notice",
    headline: "Bespoke Event & Wedding Cakes",
    description:
      "Architected by our COTHM certified cake artist with delicate cascading sugar florals, gold foil leaf, and signature fillings. Book your dream celebration centerpiece today.",
    primaryCta: {
      label: "Book Custom Order",
      href: "/custom-order",
    },
    secondaryCta: {
      label: "Chat with Baker",
      href: "https://wa.me/923001234567?text=Hi%20Sweetilo!%20I'd%20like%20to%20inquire%20about%20a%20bespoke%20event%20cake.",
      isExternal: true,
    },
  },
];

export default function HeroBillboardCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % PROMOTIONAL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) =>
      prev === 0 ? PROMOTIONAL_SLIDES.length - 1 : prev - 1
    );
  }, []);

  // 5-second Autoplay
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const slide = PROMOTIONAL_SLIDES[current];

  return (
    <section
      className="relative w-full h-[84vh] sm:h-[88vh] min-h-[580px] max-h-[920px] overflow-hidden bg-black text-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Promotional Bakery Billboard"
    >
      {/* Background Image Carousel with Framer Motion cross-fade */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="w-full h-full object-cover object-center"
          />

          {/* Readability: Subtle dark gradient scrim overlay for maximum text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Foreground Content Overlay */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-end pb-16 sm:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl sm:max-w-3xl space-y-4 sm:space-y-5"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                {slide.badge}
              </span>
            </div>

            {/* Bold Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]">
              {slide.headline}
            </h1>

            {/* 1-2 Sentence Advertisement Description */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-200 leading-relaxed font-sans max-w-xl drop-shadow-md">
              {slide.description}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href={slide.primaryCta.href}
                className="px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#4a196d] hover:bg-[#391255] text-white text-xs sm:text-sm font-bold tracking-wide shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-purple-400/30 flex items-center gap-2"
              >
                <span>{slide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              {slide.secondaryCta.isExternal ? (
                <a
                  href={slide.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold transition-all duration-200"
                >
                  {slide.secondaryCta.label}
                </a>
              ) : (
                <Link
                  href={slide.secondaryCta.href}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/30 text-xs sm:text-sm font-semibold transition-all duration-200"
                >
                  {slide.secondaryCta.label}
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls: Minimal Left / Right Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous promotional slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/35 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next promotional slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/35 hover:bg-black/60 text-white/90 hover:text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Bottom Bar: Pagination Dots & Slide Counter */}
      <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between pointer-events-none">
        {/* Pagination Dots */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {PROMOTIONAL_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrent(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                current === idx
                  ? "w-8 sm:w-10 h-2 bg-amber-400 shadow-md"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Counter Number */}
        <div className="text-xs font-mono font-bold tracking-widest text-stone-300 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 pointer-events-auto">
          0{current + 1} / 0{PROMOTIONAL_SLIDES.length}
        </div>
      </div>
    </section>
  );
}
