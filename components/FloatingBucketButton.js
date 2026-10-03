"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function FloatingBucketButton() {
  const { toggleBucket, totalItems } = useBucket();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0, y: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={toggleBucket}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-[#4a196d] text-white shadow-float border border-white/20 backdrop-blur-md group hover:bg-[#340f4e] transition-colors"
        aria-label="View Bakery Bucket"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-white group-hover:text-amber-300 transition-colors" />
          <span className="absolute -top-2 -right-2.5 min-w-[20px] h-5 px-1 rounded-full bg-amber-400 text-[#340f4e] text-[11px] font-black flex items-center justify-center shadow-xs">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-purple-200 tracking-wider">
            Bakery Bucket
          </span>
          <span className="text-xs font-bold text-amber-300 -mt-0.5">
            {totalItems} {totalItems === 1 ? "Creation" : "Creations"}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
