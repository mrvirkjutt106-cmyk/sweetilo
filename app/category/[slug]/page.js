"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/data";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#FAF7F2]">
        <h1 className="font-serif text-3xl font-bold text-[#1B0D24] mb-2">
          Category Not Found
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          The requested collection does not exist in our bakehouse.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-[#4a196d] to-[#7e22ce] text-white text-xs font-bold hover:shadow-md transition-all"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const categoryProducts = PRODUCTS.filter((item) => item.category === category.id);
  const otherCategories = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <div className="py-6 sm:py-12 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back breadcrumb */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-[#7e22ce] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Category Hero Banner with Vibrant Styling */}
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-br from-[#230737] via-[#4a196d] to-[#7e22ce] text-white shadow-2xl mb-8 sm:mb-12 ring-1 ring-purple-300/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[200px] sm:min-h-[260px]">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative z-10">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Cloud9 Handcrafted Collection
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  {category.name}
                </h1>

                <p className="text-purple-100 text-xs sm:text-sm max-w-lg leading-relaxed">
                  {category.tagline}. Each order is baked fresh using premium ingredients, packaged in luxury insulated totes.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/15 text-xs">
                <span className="text-purple-100 font-bold">
                  {categoryProducts.length} Artisanal items available
                </span>
                <span className="text-purple-300">•</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Same-Day Dispatch in LHE / KHI / ISB
                </span>
              </div>
            </div>

            {/* Banner Image with instant shimmer fallback */}
            <div className="lg:col-span-5 relative min-h-[180px] sm:min-h-[220px] lg:min-h-full vibrant-shimmer">
              <img
                src={category.image}
                alt={category.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#230737] via-[#4a196d]/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid: Mobile Horizontal Carousel, Desktop Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#1B0D24]">
              Available <span className="vibrant-title-gradient">Delights</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="sm:hidden text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-purple-200">
                Swipe &rarr;
              </span>
              <span className="text-xs text-stone-500 font-bold">
                {categoryProducts.length} creations
              </span>
            </div>
          </div>

          <div className="flex flex-nowrap overflow-x-auto snap-x hide-scrollbar scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0">
            {categoryProducts.map((product) => (
              <div key={product.id} className="shrink-0 snap-start w-[76vw] sm:w-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Explore other categories bar */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-purple-200/90 shadow-card">
          <h3 className="font-serif text-lg font-bold text-[#1B0D24] mb-4">
            Explore Other Sweetilo Collections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`/category/${other.slug}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#F6EFFC] border border-purple-200/70 hover:border-purple-300 transition-all duration-200 group shadow-2xs"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#1B0D24] group-hover:text-[#7e22ce] transition-colors">
                    {other.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">{other.tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#7e22ce] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
