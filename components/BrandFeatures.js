"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Flame, Truck, Award, CheckCircle2 } from "lucide-react";
import { BRAND_FEATURES } from "@/data/data";

const iconMap = {
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
  Flame: Flame,
  Truck: Truck,
};

export default function BrandFeatures() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-[#4a196d]" />
            The Sweetilo Promise
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1F0F29] tracking-tight">
            Why It Tastes Like Cloud9
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            We reject industrial shortcuts. Here is the artisanal commitment baked into every single treat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BRAND_FEATURES.map((feature, idx) => {
            const IconComponent = iconMap[feature.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-3xl border border-[#e5d2f2] shadow-card hover:shadow-xl transition-all relative group flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#F6EFFC] border border-[#e5d2f2] flex items-center justify-center text-[#4a196d] mb-6 group-hover:scale-110 group-hover:bg-[#4a196d] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <span className="text-[11px] font-bold text-[#4a196d] uppercase tracking-wider block mb-2">
                    {feature.highlight}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-[#1F0F29] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-50 flex items-center gap-1.5 text-[11px] font-semibold text-stone-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Artisanal Quality Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
