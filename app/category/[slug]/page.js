"use client";

import React, { use } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/data";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function CategoryPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const category = CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-[#FAF7F2]">
        <h1 className="font-serif text-3xl font-bold text-[#1F0F29] mb-2">
          Category Not Found
        </h1>
        <p className="text-stone-500 text-sm mb-6">
          The requested collection does not exist in our bakehouse.
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e]"
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
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#4a196d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Category Hero Banner (Tightly Proportional) */}
        <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-[#4a196d] to-[#340f4e] text-white shadow-xl mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[200px] sm:min-h-[260px]">
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative z-10">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cloud9 Handcrafted Collection
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {category.name}
                </h1>

                <p className="text-purple-100 text-xs sm:text-sm max-w-lg leading-relaxed">
                  {category.tagline}. Each order is baked fresh using premium ingredients, packaged in luxury insulated boxes.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
                <span className="text-purple-100 font-medium">
                  {categoryProducts.length} Artisanal items available
                </span>
                <span className="text-purple-300">•</span>
                <span className="text-emerald-300 font-medium">
                  Same-Day Dispatch in LHE / KHI / ISB
                </span>
              </div>
            </div>

            {/* Banner Image */}
            <div className="lg:col-span-5 relative min-h-[160px] sm:min-h-[200px] lg:min-h-full">
              <img
                src={category.image}
                alt={category.name}
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#4a196d] via-[#4a196d]/30 to-transparent" />
            </div>
          </div>
        </div>

        {/* Products Grid: Mobile Horizontal Carousel (1.5-2 cards visible), Desktop Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#1F0F29]">
              Available Delights
            </h2>
            <div className="flex items-center gap-2">
              <span className="sm:hidden text-[11px] font-semibold text-[#4a196d] bg-[#F6EFFC] px-2.5 py-0.5 rounded-full border border-[#e5d2f2]">
                Swipe &rarr;
              </span>
              <span className="text-xs text-stone-500 font-medium">
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

        {/* Explore other categories bar (NO PRICES) */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] shadow-sm">
          <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-4">
            Explore Other Sweetilo Collections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {otherCategories.map((other) => (
              <Link
                key={other.slug}
                href={`/category/${other.slug}`}
                className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#F6EFFC] border border-[#e5d2f2]/60 hover:border-[#e5d2f2] transition-all group"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#1F0F29] group-hover:text-[#4a196d]">
                    {other.name}
                  </h4>
                  <p className="text-[11px] text-stone-500">{other.tagline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#4a196d] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
