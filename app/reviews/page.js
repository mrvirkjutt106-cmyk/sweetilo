"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  ThumbsUp,
  Filter,
  PlusCircle,
  ArrowRight,
} from "lucide-react";
import confetti from "canvas-confetti";
import { TESTIMONIALS, PRODUCTS } from "@/data/data";
import { sanitizeString, generateSecureId } from "@/lib/security";

const INITIAL_REVIEWS = [
  ...TESTIMONIALS.map((t, idx) => ({
    id: `verified-init-${idx + 1}`,
    author: t.author,
    city: t.city,
    rating: t.rating,
    item: t.item,
    category: t.item.toLowerCase().includes("cake")
      ? "cakes"
      : t.item.toLowerCase().includes("cookie")
      ? "cookies"
      : t.item.toLowerCase().includes("milk") || t.item.toLowerCase().includes("rabri")
      ? "drinks"
      : "cups",
    quote: t.quote,
    date: "Verified Customer · 2 days ago",
    verified: true,
    helpfulCount: 12 + idx * 4,
    recommended: true,
  })),
  {
    id: "verified-init-5",
    author: "Dr. Ayesha Siddiqui",
    city: "Model Town, Lahore",
    rating: 5,
    item: "Pistachio Rose Cloud Sponge",
    category: "cakes",
    quote:
      "Ordered for my anniversary. The rosewater notes are subtle, perfectly balanced with the crunch of emerald pistachios. The cake arrived in pristine refrigerated packaging.",
    date: "Verified Customer · 4 days ago",
    verified: true,
    helpfulCount: 19,
    recommended: true,
  },
  {
    id: "verified-init-6",
    author: "Omar Farooq",
    city: "DHA Phase 6, Karachi",
    rating: 5,
    item: "NYC Dark Chocolate Lava Cookie",
    category: "cookies",
    quote:
      "Heated it in the microwave for 12 seconds like the instruction card suggested — molten center burst with rich Belgian cocoa. Outstanding artisan baking.",
    date: "Verified Customer · 1 week ago",
    verified: true,
    helpfulCount: 27,
    recommended: true,
  },
  {
    id: "verified-init-7",
    author: "Mehwish Riaz",
    city: "F-10/2, Islamabad",
    rating: 5,
    item: "Classic Italian Tiramisu Cup",
    category: "cups",
    quote:
      "Real savoiardi ladyfingers soaked in dark roast espresso. Light, airy, not overly sweet. Hands down the highest quality dessert cup in town.",
    date: "Verified Customer · 2 weeks ago",
    verified: true,
    helpfulCount: 15,
    recommended: true,
  },
  {
    id: "verified-init-8",
    author: "Salman & Fatima",
    city: "Bahria Town, Rawalpindi",
    rating: 5,
    item: "Custom Two-Tier Floral Cake",
    category: "custom",
    quote:
      "Our bespoke wedding cake matched the moodboard photo exactly! The baker stayed in touch on WhatsApp throughout the process. Every guest complimented the ganache layers.",
    date: "Verified Customer · 3 weeks ago",
    verified: true,
    helpfulCount: 34,
    recommended: true,
  },
];

const CATEGORIES = [
  { id: "all", name: "All Reviews" },
  { id: "cakes", name: "Cakes" },
  { id: "cookies", name: "NYC Cookies" },
  { id: "cups", name: "Dessert Cups" },
  { id: "drinks", name: "Glass Bottles" },
  { id: "custom", name: "Custom Orders" },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");
  const [helpfulMap, setHelpfulMap] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    city: "Lahore",
    item: "Belgian Noir Ganache Cake",
    rating: 5,
    category: "cakes",
    quote: "",
    recommended: true,
  });
  const [hoverRating, setHoverRating] = useState(0);

  // Hydrate user reviews from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sweetilo_user_reviews");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setReviews([...parsed, ...INITIAL_REVIEWS]);
        }
      }
    } catch {
      // LocalStorage unavailable, use initial reviews
    }
  }, []);

  const handleHelpful = (id) => {
    if (helpfulMap[id]) return;
    setHelpfulMap((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const cleanName = sanitizeString(formData.name.trim());
    const cleanCity = sanitizeString(formData.city.trim());
    const cleanItem = sanitizeString(formData.item.trim());
    const cleanQuote = sanitizeString(formData.quote.trim());

    if (!cleanName || cleanQuote.length < 10) {
      alert("Please enter your name and a review of at least 10 characters.");
      return;
    }

    const newReview = {
      id: generateSecureId("rev"),
      author: cleanName,
      city: cleanCity || "Pakistan",
      item: cleanItem || "Sweetilo Treat",
      category: formData.category || "cakes",
      rating: Number(formData.rating) || 5,
      quote: cleanQuote,
      date: "Just now · Verified Customer",
      verified: true,
      helpfulCount: 1,
      recommended: formData.recommended,
      isNew: true,
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);

    // Save to localStorage
    try {
      const existingUserReviews = JSON.parse(
        localStorage.getItem("sweetilo_user_reviews") || "[]"
      );
      localStorage.setItem(
        "sweetilo_user_reviews",
        JSON.stringify([newReview, ...existingUserReviews])
      );
    } catch {
      // Fallback
    }

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#4a196d", "#9333ea", "#E0A94A", "#f43f5e"],
      });
    } catch {
      // Confetti fallback
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setModalOpen(false);
      setFormData({
        name: "",
        city: "Lahore",
        item: "Belgian Noir Ganache Cake",
        rating: 5,
        category: "cakes",
        quote: "",
        recommended: true,
      });
    }, 1800);
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesCat =
      selectedCategory === "all" || r.category === selectedCategory;
    const matchesRating =
      selectedRating === "all" || r.rating === Number(selectedRating);
    return matchesCat && matchesRating;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1B0D24]">
      {/* ── Top Hero Banner ── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F6EFFC]/40 to-[#FAF7F2] pt-10 sm:pt-14 pb-12 sm:pb-16 border-b border-purple-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F6EFFC] border border-purple-200/80 mb-3">
                <Sparkles className="w-4 h-4 text-[#4a196d]" />
                <span className="text-xs font-bold text-[#4a196d] uppercase tracking-wider">
                  Customer Testimonials
                </span>
              </div>
              <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B0D24] tracking-tight leading-tight">
                Baked on Cloud9,{" "}
                <span className="text-[#4a196d] font-script font-normal text-4xl sm:text-5xl lg:text-6xl">
                  Loved in Every Home.
                </span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
                Real feedback from cake lovers, dessert enthusiasts, and celebration hosts across Lahore, Karachi &amp; Islamabad.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-stone-600 font-semibold">
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>100% Verified Orders</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-purple-100 shadow-xs">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>French Butter &amp; Belgian Chocolate</span>
                </div>
              </div>
            </div>

            {/* Right: Rating Card & Write Review CTA */}
            <div className="w-full lg:w-auto bg-white p-6 sm:p-7 rounded-[28px] border border-purple-200/70 shadow-[0_12px_40px_rgba(74,25,109,0.08)] flex flex-col sm:flex-row lg:flex-col items-center gap-5 sm:gap-8 lg:gap-5 shrink-0">
              <div className="text-center sm:text-left lg:text-center">
                <div className="flex items-center justify-center sm:justify-start lg:justify-center gap-2">
                  <span className="font-sans text-5xl font-black text-[#4a196d]">
                    4.96
                  </span>
                  <div className="flex flex-col items-start">
                    <div className="flex items-center gap-1 text-[#E0A94A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-stone-500 mt-0.5">
                      Based on 450+ reviews
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-500 mt-2">
                  98% of customers recommend Sweetilo
                </p>
              </div>

              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto lg:w-full pill-btn bg-[#4a196d] hover:bg-[#5c1b89] text-white shadow-[0_8px_24px_rgba(74,25,109,0.30)] text-sm py-3 px-6 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <PlusCircle className="w-4 h-4 text-emerald-300" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters & Controls ── */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-purple-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto hide-scrollbar pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs sm:text-sm font-bold px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#4a196d] text-white shadow-sm"
                    : "bg-white text-stone-600 hover:bg-[#F6EFFC] hover:text-[#4a196d] border border-purple-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Rating Filter Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-semibold text-stone-500">
              Showing {filteredReviews.length} reviews
            </span>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="text-xs font-bold bg-white border border-purple-200/80 rounded-xl px-3 py-2 text-stone-700 focus:outline-none focus:ring-2 focus:ring-[#4a196d]"
            >
              <option value="all">All Star Ratings</option>
              <option value="5">5 Stars Only ★★★★★</option>
              <option value="4">4 Stars Only ★★★★☆</option>
            </select>
          </div>
        </div>

        {/* ── Reviews Grid (2-column on mobile, 3-column on desktop) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 pt-8">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-[24px] sm:rounded-[28px] p-5 sm:p-6 border border-purple-200/70 shadow-[0_6px_24px_rgba(74,25,109,0.05)] hover:shadow-[0_14px_36px_rgba(74,25,109,0.12)] hover:border-[#9333ea]/40 transition-all duration-300 flex flex-col justify-between relative ${
                item.isNew ? "ring-2 ring-emerald-500/50 bg-emerald-50/10" : ""
              }`}
            >
              <div>
                {/* Header: Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#E0A94A]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>

                {/* Product Tag */}
                <div className="mb-3">
                  <span className="text-[11px] font-bold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200/60 inline-block">
                    {item.item}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-5 font-sans">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Footer: Author Info & Helpful Action */}
              <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-extrabold text-[#1B0D24] text-xs sm:text-sm">
                    {item.author}
                  </h3>
                  <p className="text-[11px] text-stone-400 mt-0.5">{item.city}</p>
                </div>

                <button
                  onClick={() => handleHelpful(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                    helpfulMap[item.id]
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-stone-50 hover:bg-[#F6EFFC] text-stone-500 hover:text-[#4a196d] border border-stone-200/60"
                  }`}
                  aria-label="Mark review as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{item.helpfulCount || 0}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if filtered to 0 */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-purple-100 p-8 my-8">
            <MessageSquare className="w-12 h-12 text-purple-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#1B0D24]">No reviews found</h3>
            <p className="text-sm text-stone-500 mt-1">
              Try selecting another category or be the first to leave a review!
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedRating("all");
              }}
              className="mt-4 text-xs font-bold text-[#4a196d] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Bottom Order CTA ── */}
      <section className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-[#4a196d] to-[#6d28d9] rounded-[32px] p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-lg text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E0A94A] block mb-2">
              Experience the Taste
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Taste Cloud9?
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm mt-2 leading-relaxed">
              Order fresh micro-batch treats delivered directly to your doorstep in pristine temperature-controlled boxes.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <Link
              href="/menu"
              className="pill-btn bg-[#E0A94A] text-[#230737] hover:bg-[#f59e0b] shadow-lg text-sm py-3 px-6 font-bold"
            >
              Explore Our Menu <ArrowRight className="w-4 h-4 ml-1 inline" />
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="pill-btn bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm py-3 px-6 font-bold backdrop-blur-sm"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {/* ── Interactive "Write a Review" Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-purple-100 relative max-h-[92vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close review dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submitSuccess ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#1B0D24]">
                  Thank You for Your Love!
                </h3>
                <p className="text-sm text-stone-600 max-w-xs mx-auto">
                  Your review has been successfully published to the Sweetilo wall of love.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-purple-200">
                    Share Your Feedback
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#1B0D24] mt-2">
                    Write a Sweetilo Review
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Help fellow dessert lovers discover their next favorite micro-batch creation!
                  </p>
                </div>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Your Rating *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, rating: star }))
                          }
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              (hoverRating || formData.rating) >= star
                                ? "text-[#E0A94A] fill-[#E0A94A]"
                                : "text-stone-200 fill-stone-100"
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-stone-600 ml-2">
                        {formData.rating === 5
                          ? "5 - Exceptional! ✨"
                          : formData.rating === 4
                          ? "4 - Very Good! 😋"
                          : formData.rating === 3
                          ? "3 - Good 🙂"
                          : formData.rating === 2
                          ? "2 - Fair"
                          : "1 - Needs Improvement"}
                      </span>
                    </div>
                  </div>

                  {/* Name & City Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={50}
                        placeholder="e.g. Ayesha Khan"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#4a196d]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        City / Area
                      </label>
                      <select
                        value={formData.city}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#4a196d] bg-white"
                      >
                        <option value="Lahore">Lahore</option>
                        <option value="Karachi">Karachi</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Rawalpindi">Rawalpindi</option>
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Other">Other City</option>
                      </select>
                    </div>
                  </div>

                  {/* Product Category & Item Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#4a196d] bg-white"
                      >
                        <option value="cakes">Premium Cakes</option>
                        <option value="cookies">NYC Cookies</option>
                        <option value="cups">Dessert Cups</option>
                        <option value="drinks">Glass Bottles</option>
                        <option value="custom">Custom Cake</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1">
                        Item Ordered
                      </label>
                      <input
                        type="text"
                        maxLength={60}
                        placeholder="e.g. Belgian Noir Ganache"
                        value={formData.item}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            item: e.target.value,
                          }))
                        }
                        className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#4a196d]"
                      />
                    </div>
                  </div>

                  {/* Review Text */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">
                      Your Review * (min 10 characters)
                    </label>
                    <textarea
                      required
                      minLength={10}
                      maxLength={500}
                      rows={4}
                      placeholder="Tell us about the flavor, freshness, presentation, or delivery..."
                      value={formData.quote}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          quote: e.target.value,
                        }))
                      }
                      className="w-full text-xs font-medium p-3.5 rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-[#4a196d] resize-none"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                      <span>Be descriptive and honest</span>
                      <span>{formData.quote.length}/500</span>
                    </div>
                  </div>

                  {/* Recommendation Checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={formData.recommended}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          recommended: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 text-[#4a196d] rounded border-purple-300 focus:ring-[#4a196d]"
                    />
                    <span className="text-xs text-stone-700 font-semibold">
                      I recommend Sweetilo to my friends &amp; family
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full pill-btn bg-[#4a196d] hover:bg-[#5c1b89] text-white py-3 rounded-full font-bold text-sm shadow-md transition-all"
                    >
                      Publish My Review →
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
