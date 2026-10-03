"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Clock, Check, Sparkles } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function ProductCard({ product }) {
  const { addToBucket } = useBucket();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToBucket(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case "Cloud9 Signature":
        return "bg-gradient-to-r from-[#4a196d] to-[#7d2ca8] text-white shadow-xs font-semibold";
      case "Bestseller":
      case "#1 Local Legend":
        return "bg-[#340f4e] text-amber-300 font-bold";
      case "Hot Pick":
      case "Overload":
        return "bg-amber-500 text-white font-bold";
      default:
        return "bg-white/95 backdrop-blur-md text-[#4a196d] border border-[#e5d2f2] font-semibold";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-3xl overflow-hidden border border-[#e5d2f2]/80 shadow-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Fallback Handler */}
        <div className="relative h-56 w-full overflow-hidden bg-stone-100">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`text-[11px] px-3 py-0.5 rounded-full uppercase tracking-wider ${getBadgeStyle(
                  product.badge
                )}`}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Weight & Prep Time */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90 font-medium">
            <span className="bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              {product.weight || product.categoryName}
            </span>
            <span className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/20">
              <Clock className="w-3 h-3 text-amber-300" />
              {product.prepTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-1.5">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-stone-800 ml-1">
                {product.rating}
              </span>
            </div>
            <span className="text-[11px] text-stone-400">
              ({product.reviewsCount} reviews)
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-[#1F0F29] group-hover:text-[#4a196d] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Ingredients snippet */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {product.ingredients.slice(0, 3).map((ing, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-[#F6EFFC] text-[#4a196d] px-2 py-0.5 rounded-md font-medium border border-[#e5d2f2]/60"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer (NO PRICES): Status Badge & Add CTA */}
      <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-stone-100">
        <div className="pt-2">
          <span className="text-[11px] font-semibold text-[#4a196d] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" />
            Handcrafted
          </span>
          <span className="text-[10px] text-stone-400 block">
            Made to Order
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold shadow-xs transition-all ${
            isAdded
              ? "bg-emerald-600 text-white"
              : "bg-[#4a196d] text-white hover:bg-[#340f4e] hover:shadow-md"
          }`}
          aria-label={`Add ${product.name} to bucket`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bucket</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
