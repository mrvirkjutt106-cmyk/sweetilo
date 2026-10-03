"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Menu as MenuIcon, Sparkles, ShoppingBag, BookOpen } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { toggleBucket, totalItems } = useBucket();

  const isHome = pathname === "/";
  const isMenu = pathname.startsWith("/category");
  const isCustom = pathname === "/custom-order";
  const isStory = pathname === "/about";

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-50 px-3 pointer-events-none flex justify-center">
      {/* Pill-shaped White Navigation Bar */}
      <nav className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-full px-2 py-2 shadow-2xl flex items-center justify-around">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all ${
            isHome ? "text-[#4a196d]" : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className={`text-[10px] mt-0.5 ${isHome ? "font-bold" : "font-medium"}`}>
            Home
          </span>
        </Link>

        {/* Menu */}
        <Link
          href="/category/cakes"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all ${
            isMenu ? "text-[#4a196d]" : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <MenuIcon className={`w-5 h-5 ${isMenu ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className={`text-[10px] mt-0.5 ${isMenu ? "font-bold" : "font-medium"}`}>
            Menu
          </span>
        </Link>

        {/* Custom with required subtext '3-Day Notice Required' */}
        <Link
          href="/custom-order"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-full transition-all relative ${
            isCustom ? "text-[#4a196d]" : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <Sparkles className={`w-5 h-5 ${isCustom ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className={`text-[10px] leading-tight ${isCustom ? "font-bold" : "font-semibold"}`}>
            Custom
          </span>
          <span className="text-[7.5px] leading-none text-stone-600 font-semibold tracking-tight whitespace-nowrap mt-0.5">
            3-Day Notice Required
          </span>
        </Link>

        {/* Bucket (Cart) */}
        <button
          onClick={toggleBucket}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-full text-stone-500 hover:text-stone-800 transition-all relative cursor-pointer"
          aria-label="Open Bucket"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-2" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-[#4a196d] text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5">
            Bucket
          </span>
        </button>

        {/* Story */}
        <Link
          href="/about"
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all ${
            isStory ? "text-[#4a196d]" : "text-stone-500 hover:text-stone-800"
          }`}
        >
          <BookOpen className={`w-5 h-5 ${isStory ? "stroke-[2.5]" : "stroke-2"}`} />
          <span className={`text-[10px] mt-0.5 ${isStory ? "font-bold" : "font-medium"}`}>
            Story
          </span>
        </Link>
      </nav>
    </div>
  );
}
