"use client";

import React, { useState, useMemo } from "react";
import { Search, Sparkles, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/data/data";

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.ingredients &&
          item.ingredients.some((ing) =>
            ing.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="py-12 md:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Fresh From Cloud9
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29]">
            The Bakery Menu
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-3">
            Explore our handcrafted luxury cakes, gooey NYC cookies, layered dessert cups, and cold glass bottle milks made fresh daily with love.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-[#e5d2f2] shadow-sm mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cakes, pistachios, lotus, cold brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50/80 border border-stone-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort dropdown (NO PRICE SORTS) */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50/80 border border-stone-200 rounded-2xl px-3 py-2.5 text-xs text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-[#4a196d] text-white shadow-xs"
                : "bg-white text-stone-700 border border-[#e5d2f2] hover:bg-[#F6EFFC] hover:text-[#4a196d]"
            }`}
          >
            All Delights ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#4a196d] text-white shadow-xs"
                  : "bg-white text-stone-700 border border-[#e5d2f2] hover:bg-[#F6EFFC] hover:text-[#4a196d]"
              }`}
            >
              {cat.name} ({PRODUCTS.filter((p) => p.category === cat.id).length})
            </button>
          ))}
        </div>

        {/* Results grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#e5d2f2] p-8">
            <div className="w-16 h-16 rounded-full bg-[#F6EFFC] flex items-center justify-center mx-auto mb-4 text-[#4a196d]">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1F0F29] mb-1">
              No sweet matches found
            </h3>
            <p className="text-stone-500 text-xs mb-4">
              We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another ingredient like chocolate, pistachio, or coffee.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-5 py-2 rounded-full bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
