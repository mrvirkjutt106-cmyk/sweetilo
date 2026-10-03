"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CATEGORIES } from "@/data/data";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function FeaturedGrid() {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Handcrafted Collections
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1F0F29] tracking-tight">
              Flavors Baked for Royalty
            </h2>
          </div>
          <p className="text-stone-600 text-xs sm:text-sm max-w-md mt-2 md:mt-0 leading-relaxed">
            From molten NYC chocolate chunks to velvety saffron Tres Leches, each collection is made with love in artisanal micro-batches.
          </p>
        </div>

        {/* Categories Grid with cohesive tight spacing (no huge gaps) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl overflow-hidden shadow-card border border-[#e5d2f2]/80 bg-white"
            >
              <Link href={`/category/${category.slug}`} className="block">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-stone-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F29]/90 via-[#1F0F29]/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-[11px] font-bold bg-white/95 backdrop-blur-md text-[#4a196d] px-3 py-0.5 rounded-full shadow-sm">
                      {category.itemCount} Delights
                    </span>
                  </div>

                  {/* Content overlay (NO PRICES) */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                    <h3 className="font-serif text-xl font-bold group-hover:text-amber-200 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-normal">
                      {category.tagline}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300 mt-2.5 group-hover:translate-x-1 transition-transform">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
