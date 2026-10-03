"use client";

import React, { useState, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Phone,
  User,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Heart,
  Award,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Scale,
  FileText,
  Image as ImageIcon,
  Trash2,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";

// Popular signature flavor choices for quick selection
const SIGNATURE_FLAVORS = [
  "Belgian Dark Chocolate Fudge",
  "Pistachio Rose Cloud",
  "Salted Caramel Dream",
  "Lotus Biscoff Crunch",
  "Madagascar Vanilla Bean Caviar",
  "Red Velvet Cream Cheese",
  "Alphonso Mango & White Chocolate",
  "Hazelnut Ferrero Praline",
  "Fresh Strawberry Chantilly",
  "Saffron Cardamom Tres Leches",
];

// Product types dropdown options
const PRODUCT_TYPES = [
  { value: "", label: "Select a Product Type..." },
  { value: "cake", label: "Custom Cake (Buttercream, Fondant, or Tiered)" },
  { value: "cupcakes", label: "Bespoke Cupcakes Box (6, 12, or 24 Pack)" },
  { value: "dessert-cups", label: "Dessert Cups Assortment (Micro-batch cups)" },
  { value: "cookies", label: "Artisan Cookies Platter / Custom Shapes" },
  { value: "drinks-desserts", label: "Flavored Milks & Dessert Pairing Station" },
  { value: "dessert-table", label: "Full Dessert Table / Grazing Setup" },
  { value: "other", label: "Other Bespoke Sweet Creation" },
];

// Delivery time slots
const TIME_SLOTS = [
  { value: "", label: "Select preferred delivery window..." },
  { value: "morning", label: "Morning Window (10:00 AM – 01:00 PM)" },
  { value: "afternoon", label: "Afternoon Window (01:00 PM – 05:00 PM)" },
  { value: "evening", label: "Evening / Golden Hour (05:00 PM – 08:00 PM)" },
  { value: "night", label: "Night Window (08:00 PM – 10:30 PM)" },
  { value: "specific", label: "Exact Specific Time (Specify in notes)" },
];

// Serving size guide
const SERVING_OPTIONS = [
  { value: "", label: "Select estimated guest count..." },
  { value: "4-6", label: "4 – 6 Guests (Approx. 1.5 - 2 lbs)" },
  { value: "8-12", label: "8 – 12 Guests (Approx. 2.5 - 3 lbs)" },
  { value: "15-20", label: "15 – 20 Guests (Approx. 4 - 5 lbs)" },
  { value: "25-35", label: "25 – 35 Guests (2-Tier Centerpiece)" },
  { value: "40+", label: "40+ Guests (3+ Tiers or Dessert Buffet)" },
  { value: "custom", label: "Custom Serving Size (Enter below)" },
];

export default function CustomOrderPage() {
  // Calculate minimum delivery date: 3 days in advance from today
  const minDeliveryDate = useMemo(() => {
    const target = new Date();
    target.setDate(target.getDate() + 3);
    return target.toISOString().split("T")[0];
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Lahore",
    deliveryDate: "",
    deliveryTime: "",
    productType: "",
    themeDescription: "",
    flavorPreferences: [],
    customFlavorNotes: "",
    servingSize: "",
    customGuestCount: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const fileInputRef = useRef(null);

  // Handle standard text / select change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Toggle flavor pill
  const toggleFlavor = (flavor) => {
    setFormData((prev) => {
      const exists = prev.flavorPreferences.includes(flavor);
      const updated = exists
        ? prev.flavorPreferences.filter((f) => f !== flavor)
        : [...prev.flavorPreferences, flavor];
      return { ...prev, flavorPreferences: updated };
    });
  };

  // Handle file selection and preview generation
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newEntries = files.map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2), // MB
      previewUrl: URL.createObjectURL(file),
    }));

    setUploadedFiles((prev) => [...prev, ...newEntries]);
  };

  // Remove uploaded file
  const removeFile = (idToRemove) => {
    setUploadedFiles((prev) => {
      const filtered = prev.filter((item) => item.id !== idToRemove);
      return filtered;
    });
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = "Please enter your full name.";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required (WhatsApp preferred).";
    }
    if (!formData.address.trim()) errors.address = "Please provide your delivery address.";
    if (!formData.deliveryDate) {
      errors.deliveryDate = "Please choose a desired delivery date.";
    } else if (formData.deliveryDate < minDeliveryDate) {
      errors.deliveryDate = "Notice requirement: Date must be at least 3 days in advance.";
    }
    if (!formData.deliveryTime) errors.deliveryTime = "Please select a delivery time window.";
    if (!formData.productType) errors.productType = "Please select the type of product.";
    if (!formData.themeDescription.trim()) {
      errors.themeDescription = "Please describe your desired theme, design, or occasion.";
    }
    if (
      formData.flavorPreferences.length === 0 &&
      !formData.customFlavorNotes.trim()
    ) {
      errors.flavor = "Please pick at least one flavor or describe your preference.";
    }
    if (!formData.servingSize && !formData.customGuestCount) {
      errors.servingSize = "Please specify the serving size or number of guests.";
    }
    if (!termsAgreed) {
      errors.terms = "Please read and accept the Sweetilo Order Policies.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Submit Quote Request
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll smoothly to the first error
      window.scrollTo({ top: 380, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Simulate quote processing
    setTimeout(() => {
      setIsSubmitting(false);
      const quoteId = `SWQ-${Math.floor(10000 + Math.random() * 90000)}`;

      const quoteReceipt = {
        quoteId,
        submittedAt: new Date().toLocaleDateString("en-PK", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        data: { ...formData },
        filesCount: uploadedFiles.length,
      };

      setSubmissionResult(quoteReceipt);

      // Confetti celebration
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#4a196d", "#672696", "#E0A94A", "#F3B552", "#FAF7F2"],
        });
      } catch (err) {}

      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 1400);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link href="/" className="hover:text-[#4a196d] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#4a196d] font-semibold">Custom Order & Bespoke Quote</span>
        </div>

        {/* ----------------- SUBMISSION SUCCESS RECEIPT STATE ----------------- */}
        <AnimatePresence>
          {submissionResult ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-[36px] border border-[#e5d2f2] p-8 sm:p-14 shadow-card max-w-3xl mx-auto text-center relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F6EFFC] rounded-full blur-3xl pointer-events-none" />

              <div className="w-20 h-20 rounded-full bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center mx-auto mb-5 shadow-sm border border-[#e5d2f2]">
                <CheckCircle2 className="w-10 h-10 text-[#4a196d]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Quote Request Received
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1F0F29] tracking-tight">
                Thank You, {submissionResult.data.fullName.split(" ")[0]}!
              </h1>

              <p className="text-stone-600 text-sm max-w-lg mx-auto mt-3 leading-relaxed">
                Your custom creation details have been dispatched to our COTHM Certified Head Baker. We will calculate an estimated quote and contact your WhatsApp shortly.
              </p>

              {/* Quote Reference Card */}
              <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#e5d2f2] text-left mt-8 max-w-xl mx-auto space-y-4">
                <div className="flex items-center justify-between border-b border-[#e5d2f2] pb-3">
                  <div>
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Quote Reference
                    </span>
                    <p className="font-mono text-lg font-black text-[#4a196d]">
                      {submissionResult.quoteId}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Status
                    </span>
                    <span className="block text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full mt-0.5">
                      Reviewing Details
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-stone-500 font-medium">Product Type:</span>
                    <p className="font-semibold text-stone-800 capitalize mt-0.5">
                      {submissionResult.data.productType}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Delivery Date:</span>
                    <p className="font-semibold text-stone-800 mt-0.5">
                      {submissionResult.data.deliveryDate} ({submissionResult.data.deliveryTime})
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">Serving Size:</span>
                    <p className="font-semibold text-stone-800 mt-0.5">
                      {submissionResult.data.servingSize || submissionResult.data.customGuestCount}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500 font-medium">WhatsApp Contact:</span>
                    <p className="font-semibold text-stone-800 mt-0.5">
                      {submissionResult.data.phone}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-stone-500 font-medium">Theme & Notes:</span>
                    <p className="font-semibold text-stone-800 mt-0.5 italic">
                      &ldquo;{submissionResult.data.themeDescription}&rdquo;
                    </p>
                  </div>
                  {submissionResult.filesCount > 0 && (
                    <div className="sm:col-span-2">
                      <span className="text-stone-500 font-medium">Reference Images Attached:</span>
                      <p className="font-semibold text-stone-800 mt-0.5">
                        {submissionResult.filesCount} image(s) uploaded for baker review
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
                <a
                  href={`https://wa.me/923008457933?text=Hi%20Sweetilo!%20I%20just%20submitted%20a%20Custom%20Order%20Quote%20with%20ID%20${submissionResult.quoteId}.%20Can%20we%20connect%20about%20the%20details?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp with Baker</span>
                </a>

                <button
                  onClick={() => {
                    setSubmissionResult(null);
                    setFormData({
                      fullName: "",
                      phone: "",
                      address: "",
                      city: "Lahore",
                      deliveryDate: "",
                      deliveryTime: "",
                      productType: "",
                      themeDescription: "",
                      flavorPreferences: [],
                      customFlavorNotes: "",
                      servingSize: "",
                      customGuestCount: "",
                    });
                    setUploadedFiles([]);
                    setTermsAgreed(false);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#4a196d] border border-[#e5d2f2] text-xs font-bold hover:bg-[#F6EFFC] transition-colors"
                >
                  <span>Submit Another Custom Request</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-stone-700 border border-stone-200 text-xs font-bold hover:bg-stone-50 transition-colors"
                >
                  <span>Return to Homepage</span>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* ----------------- CUSTOM ORDER FORM VIEW ----------------- */
            <div>
              {/* Header Hero Banner */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F6EFFC] text-[#4a196d] border border-[#e5d2f2] text-xs font-bold uppercase tracking-wider mb-4">
                  <Award className="w-4 h-4 text-[#4a196d]" />
                  Bespoke Studio • COTHM Certified Baker
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1F0F29] tracking-tight leading-tight">
                  Design Your <span className="text-[#4a196d] italic font-serif">Custom Dream</span> Creation
                </h1>

                <p className="text-stone-600 text-xs sm:text-sm md:text-base mt-4 leading-relaxed font-sans max-w-2xl mx-auto">
                  From vintage lambeth birthday cakes and celebratory multi-tiered wedding centerpieces to personalized dessert boxes, we bake your vision to life from scratch using 100% French grass-fed butter and pure Belgian chocolate.
                </p>

                {/* Trust Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 text-left">
                  <div className="bg-white rounded-2xl p-3.5 border border-[#e5d2f2] shadow-xs flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#4a196d] shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-[#1F0F29]">3-Day Notice</span>
                      <span className="text-[10px] text-stone-500">Carefully handcrafted</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3.5 border border-[#e5d2f2] shadow-xs flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#4a196d] shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-[#1F0F29]">Full Prepayment</span>
                      <span className="text-[10px] text-stone-500">Secures your date slot</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3.5 border border-[#e5d2f2] shadow-xs flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-[#4a196d] shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-[#1F0F29]">Fair Estimation</span>
                      <span className="text-[10px] text-stone-500">Transparent refund/balance</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-3.5 border border-[#e5d2f2] shadow-xs flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="block text-[11px] font-bold text-[#1F0F29]">WhatsApp Consult</span>
                      <span className="text-[10px] text-stone-500">Direct design review</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content: Form & Policies */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Form Container */}
                <div className="lg:col-span-8 bg-white rounded-[32px] border border-[#e5d2f2] p-6 sm:p-10 shadow-card">
                  <div className="border-b border-purple-50 pb-5 mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-[#1F0F29]">
                          Bespoke Order Specifications
                        </h2>
                        <p className="text-xs text-stone-500 mt-1">
                          Please provide accurate details so our bakers can prepare an exact estimate.
                        </p>
                      </div>
                      <span className="hidden sm:inline-block text-[11px] font-semibold text-[#4a196d] bg-[#F6EFFC] px-3 py-1 rounded-full border border-[#e5d2f2]">
                        * Required Fields
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 1. Contact Information Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          Full Name <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="e.g., Sarah Fatima"
                            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all ${
                              formErrors.fullName
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          />
                        </div>
                        {formErrors.fullName && (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone Number (WhatsApp preferred) */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider">
                            Phone Number <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            WhatsApp Preferred
                          </span>
                        </div>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+92 300 1234567"
                            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all ${
                              formErrors.phone
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          />
                        </div>
                        {formErrors.phone && (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 2. Delivery Address & City Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* City Selector */}
                      <div className="sm:col-span-1">
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          City Hub <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-8 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 focus:border-[#4a196d] focus:ring-[#e5d2f2] appearance-none bg-white cursor-pointer"
                          >
                            <option value="Lahore">Lahore Hub</option>
                            <option value="Karachi">Karachi Hub</option>
                            <option value="Islamabad">Islamabad / RWP</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          Delivery Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            placeholder="House #, Street, Phase/Sector, Landmark..."
                            className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all ${
                              formErrors.address
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          />
                        </div>
                        {formErrors.address && (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.address}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 3. Desired Delivery Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Desired Delivery Date with Calendar Picker */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider">
                            Desired Delivery Date <span className="text-rose-500">*</span>
                          </label>
                          <span className="text-[10px] text-[#4a196d] font-bold">
                            Min. 3 Days Notice
                          </span>
                        </div>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            type="date"
                            name="deliveryDate"
                            min={minDeliveryDate}
                            value={formData.deliveryDate}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all bg-white ${
                              formErrors.deliveryDate
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          />
                        </div>
                        {formErrors.deliveryDate ? (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.deliveryDate}
                          </p>
                        ) : (
                          <p className="text-[11px] text-stone-500 mt-1">
                            Earliest available slot: {minDeliveryDate}
                          </p>
                        )}
                      </div>

                      {/* Desired Delivery Time */}
                      <div>
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          Desired Delivery Time <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            name="deliveryTime"
                            value={formData.deliveryTime}
                            onChange={handleInputChange}
                            className={`w-full pl-10 pr-8 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all appearance-none bg-white cursor-pointer ${
                              formErrors.deliveryTime
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          >
                            {TIME_SLOTS.map((slot) => (
                              <option key={slot.value} value={slot.value}>
                                {slot.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        {formErrors.deliveryTime && (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.deliveryTime}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 4. Type of Product Dropdown */}
                    <div>
                      <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                        Type of Product <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="productType"
                          value={formData.productType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all appearance-none bg-white cursor-pointer ${
                            formErrors.productType
                              ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                              : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                          }`}
                        >
                          {PRODUCT_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {formErrors.productType && (
                        <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.productType}
                        </p>
                      )}
                    </div>

                    {/* 5. Serving Size / Number of Guests */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          Serving Size / Guests <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="servingSize"
                            value={formData.servingSize}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all appearance-none bg-white cursor-pointer ${
                              formErrors.servingSize
                                ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                                : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                            }`}
                          >
                            {SERVING_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                        {formErrors.servingSize && (
                          <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {formErrors.servingSize}
                          </p>
                        )}
                      </div>

                      {/* Custom number if preferred */}
                      <div>
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                          Exact Headcount or Weight (Optional)
                        </label>
                        <input
                          type="text"
                          name="customGuestCount"
                          value={formData.customGuestCount}
                          onChange={handleInputChange}
                          placeholder="e.g. 18 Guests or 3.5 lbs cake"
                          className="w-full px-4 py-3 rounded-2xl border border-stone-200 text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                        />
                      </div>
                    </div>

                    {/* 6. Flavor Preferences */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider">
                          Flavor Preferences <span className="text-rose-500">*</span>
                        </label>
                        <span className="text-[10px] text-stone-500">
                          Select one or multiple options
                        </span>
                      </div>

                      {/* Clickable Flavor Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {SIGNATURE_FLAVORS.map((flavor) => {
                          const isSelected = formData.flavorPreferences.includes(flavor);
                          return (
                            <button
                              type="button"
                              key={flavor}
                              onClick={() => toggleFlavor(flavor)}
                              className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 border ${
                                isSelected
                                  ? "bg-[#4a196d] text-white border-[#4a196d] font-bold shadow-xs"
                                  : "bg-white text-stone-700 border-stone-200 hover:border-[#4a196d] hover:bg-[#F6EFFC]"
                              }`}
                            >
                              <span>{flavor}</span>
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Flavor / Dietary Notes */}
                      <input
                        type="text"
                        name="customFlavorNotes"
                        value={formData.customFlavorNotes}
                        onChange={handleInputChange}
                        placeholder="Special flavor combination or dietary requests (e.g. Eggless, Low Sugar, Nut-Free)..."
                        className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                      />
                      {formErrors.flavor && (
                        <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.flavor}
                        </p>
                      )}
                    </div>

                    {/* 7. Theme / Design Description (Text Area) */}
                    <div>
                      <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                        Theme / Design Description <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        name="themeDescription"
                        rows={4}
                        value={formData.themeDescription}
                        onChange={handleInputChange}
                        placeholder="Describe your design vision: occasion (birthday, wedding, anniversary), color scheme, personalized message on cake/box, aesthetic style (e.g. vintage piping, modern floral, gold leaf accents), or cake topper requests..."
                        className={`w-full p-4 rounded-2xl border text-xs sm:text-sm font-sans focus:outline-hidden focus:ring-2 transition-all leading-relaxed ${
                          formErrors.themeDescription
                            ? "border-rose-400 bg-rose-50/30 focus:ring-rose-200"
                            : "border-stone-200 focus:border-[#4a196d] focus:ring-[#e5d2f2]"
                        }`}
                      />
                      {formErrors.themeDescription && (
                        <p className="text-rose-500 text-[11px] font-medium mt-1.5 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {formErrors.themeDescription}
                        </p>
                      )}
                    </div>

                    {/* 8. File Upload (For Reference Images) */}
                    <div>
                      <label className="block text-xs font-bold text-[#1F0F29] uppercase tracking-wider mb-2">
                        File Upload (Reference Images / Design Inspiration)
                      </label>

                      {/* Dropzone container */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#e5d2f2] hover:border-[#4a196d] bg-[#FAF7F2]/60 hover:bg-[#F6EFFC]/40 rounded-2xl p-6 text-center cursor-pointer transition-all group"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-white text-[#4a196d] shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-6 h-6 text-[#4a196d]" />
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-[#1F0F29]">
                          Click or drag photos here to upload
                        </p>
                        <p className="text-[11px] text-stone-500 mt-1">
                          Upload Pinterest inspiration, color palettes, sketch, or greeting font ideas (PNG, JPG, WEBP up to 10MB)
                        </p>
                      </div>

                      {/* Uploaded Preview list */}
                      {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                          {uploadedFiles.map((fileObj) => (
                            <div
                              key={fileObj.id}
                              className="relative group rounded-2xl overflow-hidden border border-[#e5d2f2] bg-white shadow-xs aspect-square"
                            >
                              <img
                                src={fileObj.previewUrl}
                                alt={fileObj.name}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                                <span className="text-[10px] text-white truncate font-medium">
                                  {fileObj.name} ({fileObj.size}MB)
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(fileObj.id);
                                  }}
                                  className="self-end p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition-colors"
                                  title="Remove image"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* ----------------- TERMS & CONDITIONS / ORDER POLICIES SECTION ----------------- */}
                    <div className="pt-6 border-t border-[#e5d2f2]">
                      <div className="rounded-3xl bg-[#FAF7F2] border-2 border-[#e5d2f2] p-6 sm:p-8 space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-[#4a196d] text-white flex items-center justify-center shrink-0 shadow-sm">
                            <FileText className="w-5 h-5 text-amber-300" />
                          </div>
                          <div>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1F0F29]">
                              Order Policies & Important Notes
                            </h3>
                            <p className="text-xs text-stone-600">
                              Please review our bespoke baking guidelines prior to submitting your quote request.
                            </p>
                          </div>
                        </div>

                        {/* Three Structured Policy Cards */}
                        <div className="grid grid-cols-1 gap-4">
                          {/* 1. Advance Notice */}
                          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5d2f2] shadow-xs flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center shrink-0 mt-0.5">
                              <Clock className="w-4 h-4 text-[#4a196d]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#1F0F29] uppercase tracking-wider flex items-center gap-2">
                                <span>Advance Notice</span>
                                <span className="text-[10px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2 py-0.5 rounded-full">
                                  Policy 01
                                </span>
                              </h4>
                              <p className="text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                                All custom orders must be placed a maximum of 3 days prior to the desired delivery date.
                              </p>
                              <p className="text-[11px] text-stone-500 leading-normal">
                                This allows our certified pastry artists adequate time to prep micro-batches, curate specialty imported ingredients, and execute intricate sugar craft.
                              </p>
                            </div>
                          </div>

                          {/* 2. Payment Requirement */}
                          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5d2f2] shadow-xs flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center shrink-0 mt-0.5">
                              <ShieldCheck className="w-4 h-4 text-[#4a196d]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#1F0F29] uppercase tracking-wider flex items-center gap-2">
                                <span>Payment Requirement</span>
                                <span className="text-[10px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2 py-0.5 rounded-full">
                                  Policy 02
                                </span>
                              </h4>
                              <p className="text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                                Custom orders are only confirmed upon full payment in advance.
                              </p>
                              <p className="text-[11px] text-stone-500 leading-normal">
                                Since each creation is completely customized to your bespoke theme, our bakehouse reserves baking schedule and slots exclusively following payment receipt.
                              </p>
                            </div>
                          </div>

                          {/* 3. Estimated Pricing Policy */}
                          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5d2f2] shadow-xs flex items-start gap-3.5">
                            <div className="w-8 h-8 rounded-xl bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center shrink-0 mt-0.5">
                              <Scale className="w-4 h-4 text-[#4a196d]" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-xs font-bold text-[#1F0F29] uppercase tracking-wider flex items-center gap-2">
                                <span>Estimated Pricing Policy</span>
                                <span className="text-[10px] font-bold text-[#4a196d] bg-[#F6EFFC] px-2 py-0.5 rounded-full">
                                  Policy 03
                                </span>
                              </h4>
                              <p className="text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                                The initial payment for a custom order is based on an estimated price. This price may change depending on specific design circumstances or ingredient requirements. If the final cost exceeds the estimate, the customer is required to pay the remaining balance. If the final cost is less than the estimate, Sweetilo is bound to refund the difference to the customer.
                              </p>
                              <p className="text-[11px] text-stone-500 leading-normal">
                                Guaranteed 100% fair and transparent accounting. Zero hidden fees or unjustified surcharges.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Mandatory Acknowledgement Checkbox */}
                        <div className="pt-2">
                          <label className="flex items-start gap-3 cursor-pointer group">
                            <input
                              type="checkbox"
                              checked={termsAgreed}
                              onChange={(e) => {
                                setTermsAgreed(e.target.checked);
                                if (formErrors.terms) {
                                  setFormErrors((prev) => ({ ...prev, terms: null }));
                                }
                              }}
                              className="mt-1 h-4 w-4 rounded-md border-stone-300 text-[#4a196d] focus:ring-[#4a196d] cursor-pointer"
                            />
                            <span className="text-xs text-stone-700 font-medium group-hover:text-[#4a196d] transition-colors leading-relaxed">
                              I have read, understood, and accept the <strong>Sweetilo Order Policies</strong> (3-Day Advance Notice, Full Advance Prepayment, and Estimated Pricing Adjustment/Refund Guarantee).
                            </span>
                          </label>
                          {formErrors.terms && (
                            <p className="text-rose-500 text-[11px] font-medium mt-2 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {formErrors.terms}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* ----------------- SUBMISSION ACTION BUTTON ----------------- */}
                    <div className="pt-4">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-8 rounded-full bg-[#4a196d] hover:bg-[#340f4e] text-white text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-5 h-5 animate-spin" />
                            <span>Processing Custom Quote Request...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-amber-300" />
                            <span>Request Custom Quote</span>
                            <ArrowRight className="w-5 h-5 text-amber-300" />
                          </>
                        )}
                      </motion.button>
                      <p className="text-center text-[11px] text-stone-500 mt-2.5">
                        Our head baker usually replies on WhatsApp within 2 to 4 business hours.
                      </p>
                    </div>
                  </form>
                </div>

                {/* Right: Bespoke Studio Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                  {/* Baker Consultation Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e5d2f2] shadow-card relative overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-[#F6EFFC] text-[#4a196d] flex items-center justify-center mb-4">
                      <Award className="w-6 h-6 text-[#4a196d]" />
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#1F0F29] mb-1">
                      COTHM Certified Craft
                    </h3>
                    <p className="text-xs text-stone-500 mb-4 leading-relaxed">
                      Every custom centerpiece is individually overseen by our certified pastry chef with uncompromising passion.
                    </p>

                    <div className="space-y-3 text-xs text-stone-700 pt-2 border-t border-purple-50">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% French Grass-fed Butter</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Pure Belgian Couverture Chocolate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Zero Artificial Preservatives or Fillers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Climate-Controlled Shockproof Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* 3-Step Process Guide */}
                  <div className="bg-gradient-to-br from-[#4a196d] to-[#340f4e] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                      The Sweetilo Journey
                    </span>
                    <h3 className="font-serif text-xl font-bold leading-tight">
                      How Custom Ordering Works
                    </h3>

                    <div className="space-y-4 pt-2 text-xs">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                          1
                        </div>
                        <div>
                          <strong className="block text-white font-semibold">1. Submit Details</strong>
                          <span className="text-purple-200 text-[11px]">
                            Share your date, serving size, flavor profile, and inspiration images.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                          2
                        </div>
                        <div>
                          <strong className="block text-white font-semibold">2. WhatsApp Consultation</strong>
                          <span className="text-purple-200 text-[11px]">
                            We review details, finalize colors/flavor nuances, and share estimated quote.
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/20 text-amber-300 font-bold flex items-center justify-center shrink-0 text-xs">
                          3
                        </div>
                        <div>
                          <strong className="block text-white font-semibold">3. Fresh Cloud9 Dispatch</strong>
                          <span className="text-purple-200 text-[11px]">
                            Baked micro-batch and delivered on your requested date in pristine condition.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Immediate WhatsApp Contact */}
                  <div className="bg-white rounded-3xl p-6 border border-[#e5d2f2] shadow-xs text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F0F29] uppercase tracking-wider">
                        Have Urgent Questions?
                      </h4>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Direct concierge line open 10:00 AM – 1:00 AM daily
                      </p>
                    </div>
                    <a
                      href="https://wa.me/923008457933?text=Hi%20Sweetilo!%20I%20have%20an%20urgent%20question%20regarding%20a%20custom%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-full bg-[#FAF7F2] text-[#4a196d] hover:bg-[#F6EFFC] border border-[#e5d2f2] text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>+92 300 845-SWEET</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
