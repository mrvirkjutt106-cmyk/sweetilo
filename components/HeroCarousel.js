"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, Sparkles, Check } from "lucide-react";
import { heroFeaturedProducts, PRODUCTS } from "@/data/data";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80";

export default function HeroCarousel({ items = heroFeaturedProducts }) {
  const { addToBucket } = useBucket();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next (right), -1 = prev (left)
  const [isPaused, setIsPaused] = useState(false);
  const [addedItemNotice, setAddedItemNotice] = useState(null);

  const total = items.length;

  // Next slide handler
  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Prev slide handler
  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Go directly to a slide index
  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-scroll every 5 seconds (5000ms), paused when hovered
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext, total]);

  const currentItem = items[currentIndex] || items[0];

  // Quick add to bucket matching the current featured item
  const handleQuickAdd = (e, item) => {
    e.stopPropagation();
    // Try to find matching full product in PRODUCTS, or construct a bucket item
    const matchingProduct =
      PRODUCTS.find((p) => p.name.toLowerCase() === item.title.toLowerCase()) || {
        id: item.id,
        name: item.title,
        description: item.description,
        image: item.image,
        categoryName: item.accentTag || "Top Seller",
        slug: item.categorySlug || "cakes",
        prepTime: "Fresh Batch",
        weight: "Signature Size",
      };

    addToBucket(matchingProduct, 1);
    setAddedItemNotice(item.id);
    setTimeout(() => {
      setAddedItemNotice(null);
    }, 1800);
  };

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir > 0 ? -40 : 40,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 28 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div
      className="relative mx-auto max-w-md lg:max-w-none select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ----------------- TOP-LEFT FLOATING AMBIENT BADGE ----------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-top-${currentItem.id}`}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="absolute -top-4 -left-3 sm:-left-4 z-20"
        >
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-md px-3.5 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-[#e5d2f2] flex items-center gap-2.5"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center font-bold text-sm sm:text-base">
              ✨
            </div>
            <div>
              <div className="text-xs font-bold text-[#1F0F29]">
                {currentItem.badgeText || "Fresh Out Of Oven"}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold">
                {currentItem.subBadge || "Dispatched Warm in 45 Mins"}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ----------------- BOTTOM-RIGHT FLOATING BADGE (QUICK ADD) ----------------- */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`badge-bottom-${currentItem.id}`}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="absolute -bottom-4 -right-2 sm:-right-3 z-20"
        >
          <motion.div
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="bg-[#4a196d] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-xl border border-purple-400/30 flex items-center gap-2.5 sm:gap-3"
          >
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 block">
                {currentItem.accentTag || "Chef's Signature"}
              </span>
              <span className="text-xs font-bold text-amber-300 font-serif line-clamp-1 max-w-[140px] sm:max-w-[170px]">
                {currentItem.title}
              </span>
            </div>
            <button
              onClick={(e) => handleQuickAdd(e, currentItem)}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm hover:scale-110 active:scale-95 transition-all shadow-md ${
                addedItemNotice === currentItem.id
                  ? "bg-emerald-400 text-stone-900"
                  : "bg-amber-400 text-[#340f4e]"
              }`}
              title={addedItemNotice === currentItem.id ? "Added to Bucket!" : "Quick Add to Bucket"}
              aria-label="Quick Add to Bucket"
            >
              {addedItemNotice === currentItem.id ? (
                <Check className="w-4 h-4 stroke-[3]" />
              ) : (
                <Plus className="w-4 h-4 stroke-[2.5]" />
              )}
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* ----------------- MAIN HERO CARD (CAROUSEL VIEWPORT) ----------------- */}
      <div className="rounded-[32px] overflow-hidden bg-white p-2.5 shadow-xl border border-[#e5d2f2] relative">
        <div className="relative h-[380px] sm:h-[430px] rounded-[24px] overflow-hidden bg-stone-100">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentItem.image}
                alt={currentItem.title}
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F29]/90 via-[#1F0F29]/30 to-transparent" />

              {/* Bottom Card Content Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 bg-black/45 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 inline-flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{currentItem.accentTag || "Top Seller"}</span>
                  </span>
                  <span className="text-[10px] font-semibold text-purple-200 bg-purple-900/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-purple-400/20">
                    Handmade
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {currentItem.title}
                </h3>

                <p className="text-xs text-stone-200 mt-1 line-clamp-2 leading-relaxed">
                  {currentItem.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ----------------- NAVIGATION CONTROLS (ARROWS & DOTS) ----------------- */}
      <div className="mt-4 flex items-center justify-between px-2 sm:px-3">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#4a196d] text-stone-700 hover:text-white border border-[#e5d2f2] shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95"
          aria-label="Previous Featured Creation"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Dynamic Navigation Dots */}
        <div className="flex items-center gap-2">
          {items.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-7 h-2 bg-[#4a196d] shadow-xs"
                    : "w-2 h-2 bg-[#e5d2f2] hover:bg-purple-300"
                }`}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
              />
            );
          })}
        </div>

        {/* Slide Counter & Right Arrow */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-stone-500">
            0{currentIndex + 1} <span className="text-stone-300">/</span> 0{total}
          </span>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#4a196d] text-stone-700 hover:text-white border border-[#e5d2f2] shadow-xs flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            aria-label="Next Featured Creation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
