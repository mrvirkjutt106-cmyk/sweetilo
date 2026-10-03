"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function BucketSidebar() {
  const {
    bucket,
    isBucketOpen,
    setIsBucketOpen,
    removeFromBucket,
    updateQuantity,
    totalItems,
  } = useBucket();

  return (
    <AnimatePresence>
      {isBucketOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsBucketOpen(false)}
            className="absolute inset-0 bg-[#1F0F29]/50 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#e5d2f2] flex items-center justify-between bg-gradient-to-r from-[#FAF7F2] to-[#F6EFFC]/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#4a196d]/10 flex items-center justify-center text-[#4a196d]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1F0F29]">
                      Bakery Bucket
                    </h2>
                    <p className="text-xs text-stone-500">
                      {totalItems} {totalItems === 1 ? "creation" : "creations"} selected
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsBucketOpen(false)}
                  className="p-2 rounded-full text-stone-400 hover:text-[#4a196d] hover:bg-white/80 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Express Delivery Badge */}
              <div className="bg-[#FAF7F2] border-b border-[#e5d2f2]/80 px-6 py-2.5 flex items-center gap-2 text-xs text-[#4a196d] font-semibold">
                <Truck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Express Temperature-Controlled Delivery in LHE • KHI • ISB</span>
              </div>

              {/* Items List (NO PRICES) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {bucket.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-[#F6EFFC] flex items-center justify-center mb-4 text-[#4a196d]">
                      <ShoppingBag className="w-9 h-9" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-1">
                      Your bucket is empty
                    </h3>
                    <p className="text-xs text-stone-500 max-w-xs mb-6">
                      Add our Belgian Noir Ganache, Tres Leches tubs, or gooey NYC cookies to your bucket.
                    </p>
                    <button
                      onClick={() => setIsBucketOpen(false)}
                      className="px-6 py-2.5 rounded-full bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e] transition-colors shadow-md"
                    >
                      Browse Delights
                    </button>
                  </div>
                ) : (
                  bucket.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 p-3 rounded-2xl border border-stone-100 bg-stone-50/50 hover:bg-white hover:border-[#e5d2f2] transition-all shadow-sm"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_IMAGE;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="text-sm font-semibold text-[#1F0F29] leading-tight">
                              {item.product.name}
                            </h4>
                            <button
                              onClick={() => removeFromBucket(item.product.id)}
                              className="text-stone-300 hover:text-rose-500 transition-colors p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-stone-500 mt-0.5">
                            {item.product.weight || item.product.categoryName} • Fresh Baked
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-stone-200 rounded-lg bg-white px-1.5 py-0.5 shadow-xs">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-[#4a196d]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-semibold text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="w-5 h-5 flex items-center justify-center text-stone-500 hover:text-[#4a196d]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-semibold text-[#4a196d] flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Handcrafted
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Checkout CTA (NO PRICES) */}
              {bucket.length > 0 && (
                <div className="p-6 border-t border-[#e5d2f2] bg-[#FAF7F2]/60 space-y-4">
                  <div className="space-y-1.5 text-xs text-stone-600">
                    <div className="flex justify-between">
                      <span>Total Selected</span>
                      <strong className="text-stone-800 font-bold">
                        {totalItems} {totalItems === 1 ? "Item" : "Items"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Packaging</span>
                      <span className="text-emerald-700 font-semibold">
                        Bespoke Insulated Box
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dispatch</span>
                      <span className="text-emerald-700 font-semibold">
                        Priority Same-Day
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <Link
                    href="/checkout"
                    onClick={() => setIsBucketOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#4a196d] hover:bg-[#340f4e] text-white font-semibold text-sm shadow-card hover:shadow-lg transition-all active:scale-[0.99]"
                  >
                    <span>Proceed to Order Details</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COTHM Certified Quality Guarantee</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
