"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Heart,
  Star,
  ShoppingBag,
  Flame,
  ChevronRight,
  Search,
  ArrowUpDown,
  Award,
} from "lucide-react";
import FeaturedGrid from "@/components/FeaturedGrid";
import BrandFeatures from "@/components/BrandFeatures";
import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import { PRODUCTS, TESTIMONIALS, heroFeaturedProducts } from "@/data/data";
import { useBucket } from "@/context/BucketContext";

export default function HomePage() {
  const { addToBucket } = useBucket();

  // Search & Filter state for the Homepage search bar
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Filtered items based on search query
  const displayedItems = useMemo(() => {
    let items = PRODUCTS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(q)))
      );
    } else {
      // Default to chef specials
      items = items.filter((item) => item.isChefSpecial);
    }

    return [...items].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [searchQuery, sortBy]);

  return (
    <div className="relative overflow-hidden bg-[#FAF7F2]">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#e5d2f2]/40 via-amber-100/30 to-[#F6EFFC]/50 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-6 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & CTAs */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              {/* Slogan pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#e5d2f2] shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#4a196d] animate-ping" />
                <Sparkles className="w-4 h-4 text-[#4a196d]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#4a196d]">
                  Baked on Cloud9, delivered to your heart
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1F0F29] leading-[1.08]">
                Artisanal indulgence, <br />
                <span className="text-[#4a196d] italic font-serif">
                  pure homemade
                </span>{" "}
                magic.
              </h1>

              {/* Sub-headline */}
              <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
                Pakistan&apos;s premier micro-batch cloud bakehouse. We craft multi-tiered Belgian ganache cakes, molten NYC cookies, and saffron Tres Leches using 100% French grass-fed butter.
              </p>

              {/* Quick Perks Bar */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-xs font-semibold text-stone-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <span>100% Homemade</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <span>Same-Day 45m Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <span>Lahore • Karachi • Islamabad</span>
                </div>
              </div>

              {/* Action Buttons (NO PRICES) */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/category/cakes"
                  className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#4a196d] text-white text-xs sm:text-sm font-semibold hover:bg-[#340f4e] transition-all shadow-card hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Cakes & Treats</span>
                  <ArrowRight className="w-4 h-4 text-amber-300" />
                </Link>

                <Link
                  href="/about"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-[#e5d2f2] text-[#4a196d] text-xs sm:text-sm font-bold hover:bg-[#F6EFFC] transition-all shadow-sm hover:scale-105"
                >
                  <span>Our Baker Story</span>
                </Link>
              </div>

              {/* Rating Proof snippet */}
              <div className="flex items-center gap-4 pt-4 border-t border-[#e5d2f2]/70">
                <div className="flex -space-x-2 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Customer"
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="ml-1 text-stone-800">4.96 / 5.0</span>
                  </div>
                  <span className="text-stone-500">Over 3,800+ happy bakery lovers in Pakistan</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Hero Visual Dynamic Framer Motion Carousel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-5 relative"
            >
              <HeroCarousel items={heroFeaturedProducts} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ----------------- MINIMALIST WIDE PILL SEARCH BAR ----------------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="bg-white/95 backdrop-blur-md p-2 sm:p-2.5 rounded-full border border-[#e5d2f2] shadow-sm flex items-center gap-2">
          {/* Search Icon & Input */}
          <div className="relative flex-1 flex items-center pl-4">
            <Search className="w-5 h-5 text-stone-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search cakes, cookies, dessert cups, glass bottles, pistachio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent pl-3 pr-4 py-2 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-stone-400 hover:text-stone-600 mr-2"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 pr-2 border-l border-stone-200 pl-3">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs text-stone-700 font-semibold focus:outline-none cursor-pointer py-1.5"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top Rated (★)</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </section>

      {/* ----------------- FEATURED CATEGORIES (REDUCED TIGHT SPACING) ----------------- */}
      <FeaturedGrid />

      {/* ----------------- ABOUT US SECTION (HOME PAGE PROMPT SPECIFIC) ----------------- */}
      <section className="py-16 md:py-20 bg-white border-y border-[#e5d2f2]/70 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FAF7F2] rounded-[32px] p-8 sm:p-14 border border-[#e5d2f2] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 relative">
                <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-3xl overflow-hidden shadow-lg border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80"
                    alt="COTHM Certified Baker"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#4a196d] text-white px-3.5 py-1 rounded-full text-[11px] font-bold shadow-md whitespace-nowrap">
                  COTHM Certified
                </div>
              </div>

              <div className="md:col-span-8 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  Our Story
                </div>

                {/* EXACT REQUIRED TEXT */}
                <blockquote className="font-serif text-lg sm:text-xl text-[#1F0F29] leading-relaxed italic">
                  &ldquo;Hi, I’m a COTHM Certified Baker. But more than a title, I’m someone with a dream. A dream of creating a little haven for all the sweet tooths out there. A place where it’s not just about cake, pastry, or dessert. It’s about a spoonful of joy. A taste of home. And love, baked into every layer.&rdquo;
                </blockquote>

                <div className="pt-2">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#4a196d] hover:text-[#340f4e] group"
                  >
                    <span>Read Our Full Homemade Story</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- CHEF'S SIGNATURE DELIGHTS SHOWCASE ----------------- */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-[#4a196d]" />
                {searchQuery ? `Search Results (${displayedItems.length})` : "Chef's Signature Showcase"}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F0F29] tracking-tight">
                {searchQuery ? `Treats matching "${searchQuery}"` : "Handcrafted Masterpieces"}
              </h2>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#e5d2f2] p-6">
              <p className="text-stone-500 text-sm">
                No sweet treats found matching &ldquo;{searchQuery}&rdquo;. Try another keyword.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {displayedItems.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ----------------- BRAND FEATURES (UI MOCKUP SECTION) ----------------- */}
      <BrandFeatures />

      {/* ----------------- THE SWEETILO DIFFERENCE COMPARISON ----------------- */}
      <section className="py-16 md:py-20 bg-white border-b border-[#e5d2f2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F0F29]">
              The Cloud9 Standard
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-2">
              Why our treats stand out from generic supermarket shelves and mass bakeries.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5d2f2] overflow-hidden shadow-card">
            <div className="grid grid-cols-3 bg-[#FAF7F2] text-xs sm:text-sm font-bold p-4 border-b border-[#e5d2f2]">
              <span className="text-stone-500">Benchmark Factor</span>
              <span className="text-[#4a196d]">Sweetilo Homemade</span>
              <span className="text-stone-400">Ordinary Bakeries</span>
            </div>

            <div className="divide-y divide-purple-50 text-xs sm:text-sm bg-white">
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-semibold text-stone-800">Butter Quality</span>
                <span className="text-emerald-700 font-bold">100% French Grass-fed Butter</span>
                <span className="text-stone-400">Vegetable Margarine / Dalda</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center bg-[#F6EFFC]/30">
                <span className="font-semibold text-stone-800">Chocolate Source</span>
                <span className="text-emerald-700 font-bold">Belgian Couverture & Guittard</span>
                <span className="text-stone-400">Compound / Artificial Cocoa</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center">
                <span className="font-semibold text-stone-800">Baking Batch Size</span>
                <span className="text-emerald-700 font-bold">Micro-batches (under 12 cakes)</span>
                <span className="text-stone-400">Mass assembly line</span>
              </div>
              <div className="grid grid-cols-3 p-4 items-center bg-[#F6EFFC]/30">
                <span className="font-semibold text-stone-800">Preservatives</span>
                <span className="text-emerald-700 font-bold">Zero Artificial Preservatives</span>
                <span className="text-stone-400">Extended shelf stabilizers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- TESTIMONIALS ----------------- */}
      <section className="py-16 md:py-20 bg-[#FAF7F2] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4a196d] mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#4a196d]" />
              Customer Love
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1F0F29]">
              Loved by Foodies in Pakistan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="bg-white p-7 rounded-3xl border border-[#e5d2f2] shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center text-amber-400 mb-4">
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
                  <span className="text-[10px] bg-[#F6EFFC] text-[#4a196d] font-bold px-2.5 py-1 rounded-full border border-[#e5d2f2]">
                    {item.item}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- CTA PROMO BANNER (NO PRICE DISCOUNTS) ----------------- */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[36px] bg-gradient-to-r from-[#4a196d] via-[#340f4e] to-[#4a196d] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl space-y-3.5">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                Exclusive Prototype Launch
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                Craving sweetness right now?
              </h2>
              <p className="text-purple-100 text-xs sm:text-sm">
                Each cake and cookie is baked fresh on Cloud9 and delivered in temperature-controlled totes straight to your doorstep across Lahore, Karachi & Islamabad.
              </p>
              <div className="pt-3">
                <Link
                  href="/category/cakes"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#4a196d] text-xs font-bold hover:bg-amber-300 hover:text-[#340f4e] transition-colors shadow-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Handcrafted Treats</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
