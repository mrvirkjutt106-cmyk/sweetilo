"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BucketContext = createContext(null);

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY: Schema-validate items read from localStorage.
// An attacker who can write to localStorage (e.g., via a stored-XSS on a
// different same-origin page, or a compromised browser extension) could inject
// malicious objects into cart state. We validate every field before trusting it.
// ─────────────────────────────────────────────────────────────────────────────
const MAX_QUANTITY    = 99;   // Prevent absurd quantity values
const MAX_BUCKET_SIZE = 50;   // Prevent storage-exhaustion / DoS
const MAX_NAME_LENGTH = 200;  // Limit string sizes embedded in the DOM
const MAX_NOTE_LENGTH = 500;

/**
 * Sanitize a plain string from untrusted storage.
 * Strips control characters and truncates to maxLen.
 */
function sanitizeString(val, maxLen = MAX_NAME_LENGTH) {
  if (typeof val !== "string") return "";
  return val.replace(/[\x00-\x1F\x7F]/g, "").slice(0, maxLen);
}

/**
 * Validate and sanitize a single bucket item sourced from localStorage.
 * Returns null if the item fails validation (will be filtered out of state).
 */
function validateBucketItem(item) {
  if (!item || typeof item !== "object") return null;
  const { product, quantity, notes } = item;

  // Product must be a proper object with the required typed fields.
  if (!product || typeof product !== "object") return null;
  if (typeof product.id !== "string" || !product.id) return null;
  if (
    typeof product.price !== "number" ||
    product.price < 0 ||
    !isFinite(product.price)
  )
    return null;

  // Quantity must be a safe positive integer within bounds.
  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QUANTITY) return null;

  // Return a sanitized clone — never return the raw storage object.
  return {
    product: {
      id: sanitizeString(product.id, 50),
      name: sanitizeString(product.name),
      price: product.price,
      // Constrain the image URL to the only trusted CDN we allow.
      // Any other URL is replaced with empty string and the UI falls back.
      image:
        typeof product.image === "string" &&
        product.image.startsWith("https://images.unsplash.com/")
          ? sanitizeString(product.image, 400)
          : "",
      categoryName: sanitizeString(product.categoryName, 100),
      weight: sanitizeString(product.weight || "", 100),
    },
    quantity: qty,
    // Notes are user-supplied — sanitize to prevent stored XSS via notifications.
    notes: sanitizeString(notes || "", MAX_NOTE_LENGTH),
  };
}

/**
 * Parse and schema-validate the full bucket array from raw localStorage JSON.
 * Returns [] if data is missing, malformed, or entirely fails validation.
 */
function parseSavedBucket(raw) {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .slice(0, MAX_BUCKET_SIZE)      // cap before mapping to avoid memory DoS
      .map(validateBucketItem)
      .filter(Boolean);               // drop items that failed validation
  } catch {
    // JSON.parse threw — storage was corrupted or tampered with; start fresh.
    return [];
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SECURITY: Promo code validation.
// All codes are held in a server-side lookup table in a real application.
// For this purely client-side prototype we keep the table here, but:
//   1. We do NOT disclose valid code names in error messages.
//   2. Input is sanitized and normalised before comparison.
//   3. Consider moving to a server action / API route for production.
// ─────────────────────────────────────────────────────────────────────────────
const VALID_PROMOS = Object.freeze({
  CLOUD9: 15,
  SWEETILO10: 10,
});

export function BucketProvider({ children }) {
  const [bucket, setBucket] = useState([]);
  const [isBucketOpen, setIsBucketOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notification, setNotification] = useState(null);

  // ── Load & validate bucket from localStorage on mount ──────────────────
  // parseSavedBucket() validates every field — raw storage is never trusted.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sweetilo_bucket");
      if (saved) {
        setBucket(parseSavedBucket(saved));
      }
    } catch {
      // localStorage inaccessible (private mode, storage blocked) — start empty.
      // SECURITY: Do not console.error here; stack traces should not leak to
      // browser DevTools in production.
    }
  }, []);

  // Persist bucket to localStorage whenever it changes.
  useEffect(() => {
    try {
      localStorage.setItem("sweetilo_bucket", JSON.stringify(bucket));
    } catch {
      // Quota exceeded or storage blocked — ignore silently.
    }
  }, [bucket]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification((curr) => (curr?.id ? null : curr));
    }, 3200);
  };

  const addToBucket = (product, quantity = 1, notes = "") => {
    // ── SECURITY: Validate every item before it enters state ─────────────
    const validatedItem = validateBucketItem({ product, quantity, notes });
    if (!validatedItem) return; // silently reject malformed / untrusted input

    setBucket((prev) => {
      if (prev.length >= MAX_BUCKET_SIZE) return prev; // DoS guard
      const existingIndex = prev.findIndex(
        (item) => item.product.id === validatedItem.product.id
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          // Cap accumulated quantity to prevent integer abuse
          quantity: Math.min(
            next[existingIndex].quantity + validatedItem.quantity,
            MAX_QUANTITY
          ),
          notes: validatedItem.notes || next[existingIndex].notes,
        };
        return next;
      } else {
        return [...prev, validatedItem];
      }
    });

    // product.name is already sanitized in validateBucketItem — safe to embed.
    showNotification(`Added "${validatedItem.product.name}" to your Bucket!`);
    setIsBucketOpen(true);
  };

  const removeFromBucket = (productId) => {
    if (typeof productId !== "string") return;
    setBucket((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (typeof productId !== "string") return;
    const qty = Math.floor(Number(newQuantity));
    if (!isFinite(qty)) return;

    if (qty <= 0) {
      removeFromBucket(productId);
      return;
    }
    const bounded = Math.min(qty, MAX_QUANTITY); // enforce upper bound
    setBucket((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: bounded } : item
      )
    );
  };

  const clearBucket = () => {
    setBucket([]);
    setPromoCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("sweetilo_bucket");
    } catch { /* ignore */ }
  };

  const applyPromo = (code) => {
    // ── SECURITY: Sanitize, normalise, then look up in a whitelist table ─
    // The error message never reveals which codes are valid.
    const cleaned = sanitizeString(code, 30).trim().toUpperCase();
    const discount = VALID_PROMOS[cleaned];

    if (discount !== undefined) {
      setPromoCode(cleaned);
      setDiscountPercent(discount);
      showNotification(`Promo applied! ${discount}% discount granted.`, "success");
      return { success: true, message: `${discount}% discount applied!` };
    } else {
      showNotification("Invalid or expired promo code.", "error");
      return { success: false, message: "Invalid or expired promo code." };
    }
  };

  const removePromo = () => {
    setPromoCode("");
    setDiscountPercent(0);
  };

  const totalItems = bucket.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = bucket.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Delivery policy: Free delivery over ₨2500, otherwise ₨200
  const freeDeliveryThreshold = 2500;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold || subtotal === 0;
  const deliveryFee = subtotal === 0 ? 0 : isFreeDelivery ? 0 : 200;
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <BucketContext.Provider
      value={{
        bucket,
        addToBucket,
        removeFromBucket,
        updateQuantity,
        clearBucket,
        isBucketOpen,
        setIsBucketOpen,
        toggleBucket: () => setIsBucketOpen((prev) => !prev),
        totalItems,
        subtotal,
        deliveryFee,
        isFreeDelivery,
        amountToFreeDelivery,
        freeDeliveryThreshold,
        promoCode,
        discountPercent,
        discountAmount,
        applyPromo,
        removePromo,
        total,
        notification,
      }}
    >
      {children}
    </BucketContext.Provider>
  );
}

export function useBucket() {
  const context = useContext(BucketContext);
  if (!context) {
    throw new Error("useBucket must be used within a BucketProvider");
  }
  return context;
}
