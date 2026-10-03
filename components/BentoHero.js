"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BentoHero() {
  return (
    <section className="w-full">
      {/* Massive Full-width Rounded Rectangle with Deep Purple (#4a196d) */}
      <div className="relative w-full rounded-3xl lg:rounded-[36px] bg-[#4a196d] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl">
        {/* Subtle ambient interior glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Mobile Mascot: in the phone mockup, the mascot sits at the top on mobile */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:hidden flex justify-center pt-2"
          >
            <div className="relative w-28 h-28 sm:w-36 sm:h-36">
              <img
                src="/cloud-mascot.jpg"
                alt="Sweetilo Baker Cloud Mascot"
                className="w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)]"
              />
            </div>
          </motion.div>

          {/* Left Column (Desktop) / Below Mascot (Mobile): Headline & Explore CTA */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-left"
          >
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.12]">
              Baking with Love... <br />
              <span className="font-serif font-normal italic opacity-95">
                A COTHM Certified
              </span>{" "}
              <br className="hidden sm:inline" />
              Baker&apos;s Dream
            </h1>

            <div>
              <Link
                href="/category/cakes"
                className="group inline-flex items-center gap-2 text-base sm:text-lg font-serif italic text-white/95 hover:text-amber-300 transition-colors pt-1"
              >
                <span className="underline underline-offset-4 decoration-white/40 group-hover:decoration-amber-300">
                  Explore
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1.5 font-sans not-italic font-bold"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column (Desktop only): 3D-Style Cloud Mascot Holding Spatula */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="hidden lg:flex lg:col-span-5 justify-center items-center relative"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-64 h-64 xl:w-80 xl:h-80"
            >
              <img
                src="/cloud-mascot.jpg"
                alt="3D Cloud Mascot holding spatula"
                className="w-full h-full object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.45)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
