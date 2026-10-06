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
    <div className="py-6 sm:py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#6b21a8] border border-purple-200/90 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9333ea]" />
            <span>Cloud9 Menu Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B0D24] tracking-tight">
            The Complete <span className="vibrant-title-gradient">Bakery Menu</span>
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
            All 4 handcrafted collections baked fresh on Cloud9 using 100% French butter, Belgian couverture chocolate, and pure dairy.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border border-purple-200/90 shadow-card mb-6 sm:mb-8 space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between gap-4">
          {/* Search box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cakes, cookies, dessert cups, glass bottles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F2]/80 border border-purple-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#7e22ce]/30 focus:border-[#7e22ce] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#7e22ce] hover:text-[#4a196d] font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-purple-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2]/80 border border-purple-200 rounded-2xl px-3.5 py-2.5 text-xs text-stone-700 font-bold focus:outline-none focus:ring-2 focus:ring-[#7e22ce]/30 focus:border-[#7e22ce] cursor-pointer transition-all"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Top Rated (★)</option>
              <option value="name">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Dynamic Mapping for All Categories) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 mb-6 sm:mb-8 hide-scrollbar scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-[#4a196d] to-[#7e22ce] text-white shadow-md ring-1 ring-white/30"
                : "bg-white text-stone-700 border border-purple-200/90 hover:bg-[#F6EFFC] hover:text-[#7e22ce]"
            }`}
          >
            All Collections ({PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.category === cat.id).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#4a196d] to-[#7e22ce] text-white shadow-md ring-1 ring-white/30"
                    : "bg-white text-stone-700 border border-purple-200/90 hover:bg-[#F6EFFC] hover:text-[#7e22ce]"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* If 'all' selected and no search, group by category */}
        {selectedCategory === "all" && !searchQuery ? (
          <div className="space-y-10 sm:space-y-14">
            {CATEGORIES.map((cat) => {
              const catProducts = PRODUCTS.filter((p) => p.category === cat.id);

              return (
                <section key={cat.id} className="space-y-4 sm:space-y-6 content-auto">
                  {/* Category Title Header */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-purple-200/90 pb-3 gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7e22ce] mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Category Collection</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B0D24]">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-stone-600 mt-1">
                        {cat.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="sm:hidden text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-purple-200">
                        Swipe treats &rarr;
                      </span>
                      <span className="text-xs font-bold text-stone-500">
                        {catProducts.length} Items Available
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Scrolling Carousel on Mobile, Desktop Grid */}
                  <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0">
                    {catProducts.map((product) => (
                      <div key={product.id} className="shrink-0 snap-start w-[76vw] sm:w-auto">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          /* Filtered or Searched Results */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1B0D24]">
                {selectedCategory === "all"
                  ? `Showing results for "${searchQuery}"`
                  : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
              </h2>
              <div className="flex items-center gap-2">
                <span className="sm:hidden text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-purple-200">
                  Swipe &rarr;
                </span>
                <span className="text-xs text-stone-500 font-bold">
                  {filteredProducts.length} items
                </span>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-purple-200 p-8 shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#F6EFFC] flex items-center justify-center mx-auto mb-3 text-[#7e22ce]">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B0D24] mb-1">
                  No treats found
                </h3>
                <p className="text-stone-500 text-xs mb-4">
                  We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try another term.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4a196d] to-[#7e22ce] text-white text-xs font-bold hover:shadow-md transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="shrink-0 snap-start w-[76vw] sm:w-auto">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
