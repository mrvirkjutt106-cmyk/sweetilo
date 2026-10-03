"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, Search, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/data";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full bg-[#FAF7F2]">
      {/* ================= TIGHT PROPORTIONAL EXPLORE HERO (FIXED SPACING) ================= */}
      {/* min-h-[40vh] and py-12 as explicitly requested to eliminate excessive empty space */}
      <section className="relative w-full min-h-[40vh] py-12 bg-gradient-to-r from-[#F5EEFA] via-[#FAF5FC] to-[#FBF8FD] border-b border-purple-100/70 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center z-10 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#4a196d]" />
            <span>Cloud9 Taste Exploration</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#4a196d] tracking-tight leading-tight">
            Explore Handcrafted Delights
          </h1>

          <p className="text-stone-600 font-sans text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Delve into our micro-batch bakery catalog — artisanal cakes, molten NYC cookies, chilled cloud dessert cups, and cold glass bottle brews baked fresh on Cloud9.
          </p>

          {/* Quick Category Filters */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#4a196d] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-[#e5d2f2] hover:bg-purple-50"
              }`}
            >
              All Creations ({PRODUCTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#4a196d] text-white shadow-xs"
                    : "bg-white text-stone-700 border border-[#e5d2f2] hover:bg-purple-50"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPLORE CONTENT & PRODUCT CAROUSEL/GRID ================= */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search bar & header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search flavors, chocolate, rabri, nuts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-[#e5d2f2] rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/20 focus:border-[#4a196d]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="sm:hidden text-[11px] font-semibold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-[#e5d2f2]">
                Swipe items &rarr;
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {filteredProducts.length} Artisanal items available
              </span>
            </div>
          </div>

          {/* Product Grid: Mobile horizontal swipe carousel (1.5-2 cards visible), Desktop 4-col Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#e5d2f2] p-8">
              <p className="text-stone-500 text-sm">
                No treats found matching your search. Try another keyword.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 px-5 py-2 rounded-full bg-[#4a196d] text-white text-xs font-semibold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:pb-0">
              {filteredProducts.map((product) => (
                <div key={product.id} className="shrink-0 snap-start w-[76vw] sm:w-auto">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Link to Full Menu & Custom Orders */}
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-[#4a196d] text-[#4a196d] text-xs sm:text-sm font-semibold hover:bg-purple-50 transition-colors shadow-xs"
            >
              <span>View Full Menu with Nutritional & Ingredient Details</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
