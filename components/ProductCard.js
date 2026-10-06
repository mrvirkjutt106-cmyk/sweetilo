"use client";

import React, { useState } from "react";
import { Star, ShoppingBag, Clock, Check, Sparkles } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function ProductCard({ product }) {
  const { addToBucket } = useBucket();
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAdd = () => {
    addToBucket(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case "Cloud9 Signature":
        return "bg-gradient-to-r from-[#4a196d] via-[#7e22ce] to-[#9333ea] text-white shadow-md font-bold ring-1 ring-white/30";
      case "Bestseller":
      case "#1 Local Legend":
        return "bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#F59E0B] text-white font-bold shadow-md ring-1 ring-white/30";
      case "Hot Pick":
      case "Overload":
        return "bg-gradient-to-r from-[#BE185D] via-[#DB2777] to-[#EC4899] text-white font-bold shadow-md ring-1 ring-white/30";
      default:
        return "bg-white/95 backdrop-blur-md text-[#4a196d] border border-purple-200/90 font-bold shadow-xs";
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-purple-200/90 shadow-card hover:shadow-card-hover hover:border-purple-400/80 transition-all duration-300 ease-out flex flex-col justify-between gpu-accelerate">
      <div>
        {/* Image Container with Instant Vibrant Shimmer Fallback (loads in 0ms on slow 2G/3G) */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#F6EFFC] via-[#FAF7F2] to-[#FFF8F0] vibrant-shimmer">
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover group-hover:scale-106 transition-all duration-500 ease-out ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
          />

          {/* Vibrant Gradient Scrim for Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B0D24]/65 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity pointer-events-none" />

          {/* Vibrant Category Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`text-[11px] px-3 py-1 rounded-full uppercase tracking-wider ${getBadgeStyle(
                  product.badge
                )}`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Weight & Prep Time Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium">
            <span className="bg-black/55 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/25 shadow-xs font-semibold">
              {product.weight || product.categoryName}
            </span>
            <span className="flex items-center gap-1 bg-black/55 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/25 shadow-xs font-semibold">
              <Clock className="w-3 h-3 text-amber-300" />
              {product.prepTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Star Rating with Vibrant Amber Accent */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 drop-shadow-xs" />
              <span className="text-xs font-bold text-stone-800 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-[11px] text-stone-600">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#1B0D24] group-hover:text-[#7e22ce] transition-colors line-clamp-1 tracking-tight">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Vibrant Ingredients Badges */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {product.ingredients.slice(0, 3).map((ing, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-[#FAF5FC] text-[#6b21a8] px-2 py-0.5 rounded-md font-semibold border border-purple-200/70"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer: Handcrafted Notice & Vibrant Add to Bucket CTA */}
      <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-purple-50">
        <div className="pt-2">
          <span className="text-[11px] font-bold text-[#4a196d] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Handcrafted
          </span>
          <span className="text-[10px] text-stone-600 block font-medium">
            Made to Order
          </span>
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold shadow-xs transition-all duration-200 active:scale-95 cursor-pointer ${
            isAdded
              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md ring-2 ring-emerald-200"
              : "bg-gradient-to-r from-[#4a196d] via-[#6f22a5] to-[#7e22ce] text-white hover:shadow-md hover:from-[#3a1357] hover:to-[#6b21a8]"
          }`}
          aria-label={`Add ${product.name} to bucket`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 text-white stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5 text-purple-200" />
              <span>Add to Bucket</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
