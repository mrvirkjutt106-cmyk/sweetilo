"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, UtensilsCrossed, Sparkles, ShoppingBag, BookOpen } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleBucket, totalItems } = useBucket();

  const isHome = pathname === "/";
  const isMenu = pathname.startsWith("/menu") || pathname.startsWith("/category");
  const isCustom = pathname === "/custom-order";
  const isStory = pathname === "/about";

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-50 px-4 pointer-events-none flex justify-center">
      {/* Fixed White Pill-shaped Bottom Navigation Bar with Vibrant Accents */}
      <nav className="pointer-events-auto w-full max-w-sm bg-white/95 backdrop-blur-2xl border border-purple-200/90 rounded-full px-2 py-2 shadow-[0_12px_40px_rgba(74,25,109,0.18)] flex items-center justify-around ring-1 ring-white/80">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isHome
              ? "text-[#7e22ce] bg-[#FAF5FC]"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? "stroke-[2.5]" : "stroke-2"}`} />
          <span
            className={`text-[10px] mt-0.5 ${
              isHome ? "font-bold text-[#7e22ce]" : "font-semibold"
            }`}
          >
            Home
          </span>
        </Link>

        {/* Menu */}
        <Link
          href="/menu"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isMenu
              ? "text-[#7e22ce] bg-[#FAF5FC]"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <UtensilsCrossed
            className={`w-5 h-5 ${isMenu ? "stroke-[2.5]" : "stroke-2"}`}
          />
          <span
            className={`text-[10px] mt-0.5 ${
              isMenu ? "font-bold text-[#7e22ce]" : "font-semibold"
            }`}
          >
            Menu
          </span>
        </Link>

        {/* Custom Order */}
        <Link
          href="/custom-order"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all ${
            isCustom
              ? "text-[#7e22ce] bg-[#FAF5FC]"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <Sparkles
            className={`w-5 h-5 ${isCustom ? "stroke-[2.5] text-[#9333ea]" : "stroke-2"}`}
          />
          <span
            className={`text-[10px] leading-tight ${
              isCustom ? "font-bold text-[#7e22ce]" : "font-semibold"
            }`}
          >
            Custom
          </span>
        </Link>

        {/* Bucket */}
        <button
          onClick={toggleBucket}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-2xl text-stone-400 hover:text-stone-700 transition-all relative cursor-pointer"
          aria-label="Open Bucket"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-gradient-to-r from-[#4a196d] to-[#9333ea] text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold mt-0.5">Bucket</span>
        </button>

        {/* Our Story */}
        <Link
          href="/about"
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
            isStory
              ? "text-[#7e22ce] bg-[#FAF5FC]"
              : "text-stone-400 hover:text-stone-700"
          }`}
        >
          <BookOpen
            className={`w-5 h-5 ${isStory ? "stroke-[2.5]" : "stroke-2"}`}
          />
          <span
            className={`text-[10px] mt-0.5 ${
              isStory ? "font-bold text-[#7e22ce]" : "font-semibold"
            }`}
          >
            Story
          </span>
        </Link>
      </nav>
    </div>
  );
}
