"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Award,
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-4 h-4 text-[#4a196d]" />
            COTHM Certified Baker & Artisan
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#1F0F29] tracking-tight leading-tight">
            The Story Behind <span className="text-[#4a196d] italic">Sweetilo</span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
            A boutique homemade bakehouse born out of unconditional love for genuine craftsmanship and unforgettable sweetness.
          </p>
        </div>

        {/* Baker's Dream Card (Exact Prompt Text) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[36px] border border-[#e5d2f2] p-8 sm:p-14 shadow-card mb-16 relative overflow-hidden"
        >
          {/* Subtle watermark / glow */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#F6EFFC] rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Image / Certificate Badge */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FAF7F2] relative">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Artisanal Bakery Craft"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F0F29]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block">
                    Certified Professional
                  </span>
                  <p className="font-serif text-lg font-bold">
                    COTHM Certified Bakery
                  </p>
                </div>
              </div>

              {/* Floating Heart Quote */}
              <div className="absolute -bottom-5 -right-3 bg-[#4a196d] text-white p-3 rounded-2xl shadow-xl flex items-center gap-2 border border-purple-300/30">
                <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="text-xs font-semibold">100% Homemade Touch</span>
              </div>
            </div>

            {/* Right: Personal Introduction */}
            <div className="lg:col-span-7 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F6EFFC] flex items-center justify-center text-[#4a196d]">
                <Sparkles className="w-6 h-6" />
              </div>

              <blockquote className="font-serif text-xl sm:text-2xl text-[#1F0F29] leading-relaxed italic">
                &ldquo;Hi, I’m a COTHM Certified Baker. But more than a title, I’m someone with a dream. A dream of creating a little haven for all the sweet tooths out there. A place where it’s not just about cake, pastry, or dessert. It’s about a spoonful of joy. A taste of home. And love, baked into every layer.&rdquo;
              </blockquote>

              <div className="pt-2 border-t border-stone-100 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4a196d] text-white flex items-center justify-center font-serif font-bold text-sm">
                  SW
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#1F0F29]">Founder & Head Baker</h4>
                  <p className="text-xs text-[#4a196d] font-semibold">Sweetilo Cloud Bakehouse</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Full Vision Section (Exact Prompt Text) */}
        <section className="bg-gradient-to-br from-[#4a196d] via-[#371052] to-[#4a196d] rounded-[36px] p-8 sm:p-16 text-white shadow-2xl mb-16 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-bold block">
              Our Guiding Philosophy
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-snug">
              What “Homemade” Truly Means to Us
            </h2>

            <div className="space-y-5 text-purple-100/90 text-sm sm:text-base leading-relaxed font-sans">
              <p className="text-lg sm:text-xl font-serif italic text-white leading-relaxed">
                &ldquo;When you take a bite from me, I want you to feel comfort, warmth, and the kind of care you only get from home. Because desserts should do more than satisfy cravings. They should make your heart smile too.&rdquo;
              </p>

              <p>
                &ldquo;Because homemade is more than just flour and sugar. It’s the warmth of an oven at noon, the smell of vanilla that feels like childhood... Homemade means no shortcuts, no preservatives, no rushing — just real ingredients chosen with love...&rdquo;
              </p>

              <p className="text-amber-200 font-serif text-lg font-bold pt-2">
                &ldquo;When you take a bite of something homemade, you’re not just tasting cake. You’re tasting home.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Pillars / Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-[#e5d2f2] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFFC] flex items-center justify-center text-[#4a196d] mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-1">
              No Shortcuts
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We whip, fold, and steep every element patiently to preserve delicate flavors and textures.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e5d2f2] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFFC] flex items-center justify-center text-[#4a196d] mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-1">
              No Preservatives
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Zero artificial shelf-stabilizers or chemicals. Pure French butter, fresh milk, and rich Belgian cocoa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e5d2f2] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFFC] flex items-center justify-center text-[#4a196d] mb-4">
              <Heart className="w-5 h-5 text-[#4a196d]" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-1">
              Real Ingredients
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every vanilla pod, hazelnut praline, and berry compote is chosen with love and strict culinary standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#e5d2f2] shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#F6EFFC] flex items-center justify-center text-[#4a196d] mb-4">
              <Flame className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#1F0F29] mb-1">
              Baked at Dawn
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Ovens fire up every morning so your orders arrive fresh, fragrant, and comforting.
            </p>
          </div>
        </div>

        {/* Explore Collections CTA */}
        <div className="text-center bg-white rounded-3xl p-10 border border-[#e5d2f2] shadow-card">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F0F29] mb-2">
            Taste the Love in Every Layer
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-6">
            Explore our artisanal collections handcrafted fresh for Lahore, Karachi, and Islamabad.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/category/cakes"
              className="px-6 py-3 rounded-full bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e] transition-colors shadow-sm"
            >
              Premium Cakes
            </Link>
            <Link
              href="/category/cookies"
              className="px-6 py-3 rounded-full bg-[#F6EFFC] text-[#4a196d] text-xs font-semibold hover:bg-[#FAF7F2] border border-[#e5d2f2] transition-colors"
            >
              Artisan Cookies
            </Link>
            <Link
              href="/category/cups"
              className="px-6 py-3 rounded-full bg-[#F6EFFC] text-[#4a196d] text-xs font-semibold hover:bg-[#FAF7F2] border border-[#e5d2f2] transition-colors"
            >
              Dessert Cups
            </Link>
            <Link
              href="/category/drinks"
              className="px-6 py-3 rounded-full bg-[#F6EFFC] text-[#4a196d] text-xs font-semibold hover:bg-[#FAF7F2] border border-[#e5d2f2] transition-colors"
            >
              Glass Bottles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
