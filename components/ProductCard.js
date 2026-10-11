"use client";

import React, { useState } from "react";
import { Star, ShoppingBag, Clock, Check } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

// Tile bg colors per category
const CATEGORY_TILE = {
  cakes:   "bg-[#F6EFFC]",
  cookies: "bg-[#FEF3C7]",
  cups:    "bg-[#FAF5FC]",
  drinks:  "bg-[#F4EDE2]",
};

export default function ProductCard({ product }) {
  const { addToBucket } = useBucket();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToBucket(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const tileBg = CATEGORY_TILE[product.category] || "bg-[#F6EFFC]";

  const priceDisplay = product.price
    ? `₨${product.price.toLocaleString()}`
    : null;

  return (
    <div className="artisan-card group relative bg-white rounded-[18px] sm:rounded-[28px] overflow-hidden border border-purple-200/70 shadow-[0_4px_18px_rgba(74,25,109,0.06)] hover:shadow-[0_18px_44px_rgba(74,25,109,0.14)] hover:border-[#9333ea]/40 flex flex-col h-full w-full">

      {/* ---- Image tile: Proportional Aspect Ratio (4:3) ---- */}
      <div className={`relative aspect-[4/3] w-full overflow-hidden ${tileBg}`}>
        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
          className="card-img w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />

        {/* Badge top-left */}
        {product.badge && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 max-w-[85%]">
            <span className="inline-block text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-black uppercase tracking-wider bg-[#4a196d] text-white shadow-xs truncate max-w-full">
              {product.badge}
            </span>
          </div>
        )}

        {/* Prep time chip bottom-left */}
        <div className="absolute bottom-2 left-2 z-10 max-w-[85%]">
          <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-purple-100 text-[8px] sm:text-[9.5px] font-semibold text-stone-700 shadow-xs">
            <Clock className="w-2.5 h-2.5 text-[#E0A94A] shrink-0" />
            <span className="truncate max-w-[85px] sm:max-w-none">{product.prepTime}</span>
          </span>
        </div>
      </div>

      {/* ---- Product info ---- */}
      <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between gap-1.5 sm:gap-2">
        <div className="space-y-1">
          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#E0A94A] text-[#E0A94A] shrink-0" />
            <span className="text-[10.5px] sm:text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-[9.5px] sm:text-[11px] text-stone-400">({product.reviewsCount})</span>
          </div>

          {/* Name */}
          <h3 className="font-sans text-xs sm:text-[15px] font-extrabold text-[#1B0D24] group-hover:text-[#4a196d] transition-colors leading-snug line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[9.5px] sm:text-[11px] text-stone-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* ---- Price + Add button: Stacked on mobile, inline on desktop ---- */}
        <div className="pt-2 mt-auto border-t border-purple-50/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2">
          {priceDisplay ? (
            <div className="flex items-baseline justify-between sm:block min-w-0">
              <span className="text-xs sm:text-base font-extrabold text-[#4a196d] whitespace-nowrap leading-tight">
                {priceDisplay}
              </span>
              <span className="text-[8.5px] sm:text-[10px] text-stone-400 font-medium sm:ml-1 leading-tight">
                per piece
              </span>
            </div>
          ) : (
            <span className="text-[10px] sm:text-xs text-stone-400 italic">On request</span>
          )}

          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all duration-200 cursor-pointer shrink-0 active:scale-95 ${
              isAdded
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-[#4a196d] hover:bg-[#5c1b89] text-white shadow-[0_4px_14px_rgba(74,25,109,0.25)]"
            }`}
            aria-label={`Add ${product.name} to bucket`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-purple-200 shrink-0" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
