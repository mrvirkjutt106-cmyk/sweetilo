"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useBucket } from "@/context/BucketContext";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80";

export default function CheckoutPage() {
  const { bucket, totalItems, clearBucket } = useBucket();

  // Form states
  const [formData, setFormData] = useState({
    fullName: "Ayesha Khan",
    phone: "0300 8472910",
    email: "ayesha.khan@example.com",
    city: "Lahore",
    address: "House 42, Street 8, Sector Y, DHA Phase 3",
    deliverySlot: "express",
    notes: "Please pack with extra ribbon, it's an anniversary treat!",
    includeSparkler: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = {
        orderId: `SW-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...bucket],
        customer: { ...formData },
        date: new Date().toLocaleString(),
      };
      setOrderComplete(generatedOrder);

      // Confetti celebration
      try {
        confetti({
          particleCount: 130,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#4a196d", "#672696", "#E0A94A", "#F3B552", "#FAF7F2"],
        });
      } catch (err) {}

      // Clear the bucket state
      clearBucket();
    }, 1200);
  };

  // If order complete modal
  if (orderComplete) {
    return (
      <div className="min-h-[80vh] py-16 flex items-center justify-center px-4 bg-[#FAF7F2]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#e5d2f2] text-center relative overflow-hidden"
        >
          <div className="w-20 h-20 rounded-full bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-[#4a196d]" />
          </div>

          <span className="text-xs uppercase font-bold tracking-widest text-[#4a196d]">
            Baked on Cloud9 • Dispatched
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#1F0F29] mt-1 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6 leading-relaxed">
            Your sweet treats are officially in the oven. Our COTHM certified bakers are preparing your micro-batch packaging right now.
          </p>

          <div className="bg-[#FAF7F2] rounded-2xl p-4 text-left text-xs space-y-2 mb-6 border border-[#e5d2f2]">
            <div className="flex justify-between">
              <span className="text-stone-500">Order ID:</span>
              <strong className="text-[#4a196d] font-mono text-sm">{orderComplete.orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Recipient:</span>
              <strong className="text-stone-800">
                {orderComplete.customer.fullName} ({orderComplete.customer.city})
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Address:</span>
              <span className="text-stone-700 text-right line-clamp-1 max-w-[240px]">
                {orderComplete.customer.address}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Estimated Dispatch:</span>
              <strong className="text-emerald-700 font-bold">35 – 45 Minutes</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#e5d2f2] font-semibold text-xs text-[#1F0F29]">
              <span>Items in Batch:</span>
              <span className="text-[#4a196d] font-bold">
                {orderComplete.items.reduce((s, i) => s + i.quantity, 0)} Handcrafted Treats
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full py-3.5 rounded-2xl bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e] transition-colors shadow-md"
            >
              Back to Home
            </Link>
            <Link
              href="/about"
              className="block w-full py-3 rounded-2xl bg-stone-100 text-stone-700 text-xs font-semibold hover:bg-stone-200 transition-colors"
            >
              Read Our Baker Story
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // If empty bucket
  if (bucket.length === 0) {
    return (
      <div className="min-h-[70vh] py-16 flex flex-col items-center justify-center px-4 text-center bg-[#FAF7F2]">
        <div className="w-20 h-20 rounded-full bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#1F0F29] mb-2">
          Your Bakery Bucket is Empty
        </h1>
        <p className="text-stone-500 text-xs sm:text-sm max-w-sm mb-6">
          You haven&apos;t selected any cakes, cookies, or dessert cups yet. Choose your favorites to place your order.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 rounded-full bg-[#4a196d] text-white text-xs font-semibold hover:bg-[#340f4e] transition-all shadow-card"
        >
          Explore Collections
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#4a196d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Browsing</span>
          </Link>
        </div>

        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Seamless Local Order
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29]">
            Order Confirmation & Details
          </h1>
        </div>

        {/* 2-Column Split: Form Left, Sticky Summary Right */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Form: Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Customer Contact */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-[#4a196d] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F0F29]">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-stone-50/80 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                    Phone (WhatsApp updates) *
                  </label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-stone-50/80 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-stone-50/80 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Destination */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-[#4a196d] text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F0F29]">
                  Delivery Destination
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {["Lahore", "Karachi", "Islamabad"].map((city) => (
                  <button
                    type="button"
                    key={city}
                    onClick={() => setFormData({ ...formData, city })}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
                      formData.city === city
                        ? "bg-[#4a196d] text-white border-[#4a196d] shadow-xs"
                        : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-[#F6EFFC] hover:text-[#4a196d]"
                    }`}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Complete Street Address (House/Apartment, Phase/Block) *
                </label>
                <textarea
                  name="address"
                  rows={2}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-stone-50/80 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">
                  Special Instructions (e.g. Cake Message, Ring Bell)
                </label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. Write 'Happy Birthday Sarah' on the greeting note"
                  className="w-full bg-stone-50/80 border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-[#4a196d]/30"
                />
              </div>
            </div>

            {/* Step 3: Delivery Window & Add-ons */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] shadow-sm space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <span className="w-7 h-7 rounded-full bg-[#4a196d] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="font-serif text-lg font-bold text-[#1F0F29]">
                  Delivery Slot & Celebration Kit
                </h3>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-[#F6EFFC]/30 cursor-pointer">
                  <input
                    type="radio"
                    name="deliverySlot"
                    value="express"
                    checked={formData.deliverySlot === "express"}
                    onChange={handleChange}
                    className="accent-[#4a196d]"
                  />
                  <div className="text-xs">
                    <strong className="text-[#1F0F29]">
                      🚀 Cloud9 Priority Dispatch (45 – 60 Mins)
                    </strong>
                    <p className="text-stone-500 text-[11px]">
                      Dispatched straight from our nearest bakehouse oven.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3.5 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-[#F6EFFC]/30 cursor-pointer">
                  <input
                    type="radio"
                    name="deliverySlot"
                    value="evening"
                    checked={formData.deliverySlot === "evening"}
                    onChange={handleChange}
                    className="accent-[#4a196d]"
                  />
                  <div className="text-xs">
                    <strong className="text-[#1F0F29]">
                      🌙 Evening Celebration Slot (7:00 PM – 9:00 PM)
                    </strong>
                    <p className="text-stone-500 text-[11px]">
                      Perfect for dinner parties and surprise gifts.
                    </p>
                  </div>
                </label>
              </div>

              {/* Sparkler & Card Addon */}
              <div className="pt-2">
                <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#F6EFFC] border border-[#e5d2f2] cursor-pointer">
                  <input
                    type="checkbox"
                    name="includeSparkler"
                    checked={formData.includeSparkler}
                    onChange={handleChange}
                    className="w-4 h-4 rounded accent-[#4a196d]"
                  />
                  <div className="text-xs">
                    <strong className="text-[#4a196d] block">
                      ✨ Complimentary Gold Sparkler Candle + Handwritten Greeting Card
                    </strong>
                    <p className="text-purple-900/70 text-[11px]">
                      Includes 1 smokeless gold celebration fountain sparkler and custom calligraphy card.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Summary (Sticky, NO PRICES) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#e5d2f2]">
                  <h3 className="font-serif text-xl font-bold text-[#1F0F29]">
                    Order Summary
                  </h3>
                  <span className="text-xs bg-[#F6EFFC] text-[#4a196d] font-bold px-2.5 py-1 rounded-full border border-[#e5d2f2]">
                    {totalItems} Delights
                  </span>
                </div>

                {/* Items preview list */}
                <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                  {bucket.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 text-xs"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = FALLBACK_IMAGE;
                        }}
                        className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-stone-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-stone-400 text-[11px]">
                          Qty: {item.quantity} • {item.product.categoryName}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#4a196d]">
                        Micro-Batch
                      </span>
                    </div>
                  ))}
                </div>

                {/* Packaging & Service Specs */}
                <div className="space-y-2 text-xs border-t border-[#e5d2f2] pt-4 text-stone-600">
                  <div className="flex justify-between">
                    <span>Packaging</span>
                    <strong className="text-stone-800">Insulated Cooling Tote</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Dispatch Mode</span>
                    <strong className="text-emerald-700">Priority Handcrafted</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Baker Standard</span>
                    <strong className="text-[#4a196d]">COTHM Certified</strong>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#4a196d] hover:bg-[#340f4e] text-white font-bold text-sm shadow-card hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Placing Bakery Order...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Confirm & Place Order</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-stone-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Satisfaction Guarantee • Fresh Baked Promise</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
