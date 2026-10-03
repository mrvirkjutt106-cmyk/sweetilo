"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

export default function HeroV3() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 pb-16">
      {/* Background: Rich Deep Purple (#4a196d) to Warm Cream (#FAF7F2) Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a196d] via-[#35104e] to-[#FAF7F2] -z-20" />

      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-purple-500/25 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-200/20 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Main Animated Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8"
      >
        {/* Subtle Brand Slogan Pill */}
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
              Baked on Cloud9, delivered to your heart
            </span>
          </div>
        </motion.div>

        {/* Center Massive Dramatic Serif Headline: "Taste Home." */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-bold text-white tracking-tight leading-[0.92] drop-shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
            Taste Home.
          </h1>

          {/* Highly stylized, smaller sans-serif subtitle */}
          <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.28em] sm:tracking-[0.35em] text-purple-200/95 uppercase font-medium max-w-xl mx-auto pt-2">
            Pakistan’s premier micro-batch cloud bakehouse.
          </p>
        </motion.div>

        {/* Action Button & Explore link */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3.5 pt-4"
        >
          <Link
            href="/menu"
            className="px-8 py-3.5 rounded-full bg-white text-[#4a196d] text-xs sm:text-sm font-bold tracking-wide shadow-2xl hover:bg-amber-300 hover:text-[#340f4e] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Explore The Menu
          </Link>
          <Link
            href="/custom-order"
            className="px-7 py-3.5 rounded-full bg-white/10 text-white border border-white/25 text-xs sm:text-sm font-semibold hover:bg-white/20 backdrop-blur-md transition-all duration-200"
          >
            Custom Cakes (3-Day Notice)
          </Link>
        </motion.div>

        {/* Scroll indicator down to Bento Showcase */}
        <motion.div
          variants={itemVariants}
          className="pt-8 sm:pt-12 flex flex-col items-center"
        >
          <a
            href="#bento-showcase"
            className="group flex flex-col items-center gap-2 text-stone-700/80 hover:text-[#4a196d] transition-colors"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-stone-600 group-hover:text-[#4a196d]">
              Discover Collections
            </span>
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-sm border border-stone-200/80 flex items-center justify-center group-hover:translate-y-1 transition-transform">
              <ArrowDown className="w-4 h-4 text-stone-700 group-hover:text-[#4a196d]" />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
