"use client";

import React, { useState } from "react";
import { Star, ShoppingBag, Clock, Check, ArrowRight } from "lucide-react";
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
  const [imageLoaded, setImageLoaded] = useState(false);

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
    <div className="artisan-card group relative bg-white rounded-[24px] sm:rounded-[28px] overflow-hidden border border-purple-200/70 shadow-[0_8px_30px_rgba(74,25,109,0.06)] hover:shadow-[0_18px_44px_rgba(74,25,109,0.14)] hover:border-[#9333ea]/40 flex flex-col">

      {/* ---- Image tile ---- */}
      <div className={`relative h-52 sm:h-56 overflow-hidden ${tileBg}`}>
        {/* Shimmer */}
        {!imageLoaded && <div className="absolute inset-0 vibrant-shimmer" />}

        <img
          src={product.image || FALLBACK_IMAGE}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; setImageLoaded(true); }}
          className={`card-img w-full h-full object-cover object-center ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          decoding="async"
        />

        {/* Badge top-left */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider bg-[#4a196d] text-white shadow-md">
              {product.badge}
            </span>
          </div>
        )}

        {/* Circular arrow button bottom-right */}
        <button
          onClick={handleAdd}
          className={`card-arrow-btn absolute bottom-3 right-3 w-9 h-9 rounded-full border flex items-center justify-center shadow-sm z-10 ${
            isAdded
              ? "bg-emerald-500 border-emerald-300 text-white"
              : "bg-white border-purple-200/70 text-[#4a196d]"
          }`}
          aria-label={`Add ${product.name} to bucket`}
        >
          {isAdded ? <Check className="w-4 h-4 stroke-[3]" /> : <ArrowRight className="w-4 h-4" />}
        </button>

        {/* Prep time chip */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-purple-100 text-[10px] font-semibold text-stone-700 shadow-xs">
            <Clock className="w-3 h-3 text-[#E0A94A]" />
            {product.prepTime}
          </span>
        </div>
      </div>

      {/* ---- Product name (below tile, matching reference) ---- */}
      <div className="p-4 flex-1 flex flex-col gap-2">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-[#E0A94A] text-[#E0A94A]" />
          <span className="text-xs font-bold text-stone-800">{product.rating}</span>
          <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
        </div>

        {/* Name */}
        <h3 className="font-sans text-sm sm:text-[15px] font-extrabold text-[#1B0D24] group-hover:text-[#4a196d] transition-colors leading-tight line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price + Add button row */}
        <div className="flex items-center justify-between pt-2 mt-auto border-t border-purple-50">
          {priceDisplay ? (
            <div>
              <span className="text-base sm:text-lg font-extrabold text-[#4a196d]">{priceDisplay}</span>
              <span className="text-[10px] text-stone-400 font-medium block leading-none">per piece</span>
            </div>
          ) : (
            <span className="text-xs text-stone-400 italic">Price on request</span>
          )}

          <button
            onClick={handleAdd}
            className={`pill-btn text-xs py-2 px-4 gap-1.5 ${
              isAdded
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-[#4a196d] text-white shadow-[0_4px_14px_rgba(74,25,109,0.25)]"
            }`}
            aria-label={`Add ${product.name} to bucket`}
          >
            {isAdded ? (
              <><Check className="w-3.5 h-3.5 stroke-[3]" /><span>Added!</span></>
            ) : (
              <><ShoppingBag className="w-3.5 h-3.5 text-purple-200" /><span>Add</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
