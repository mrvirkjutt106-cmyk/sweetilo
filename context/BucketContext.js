"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BucketContext = createContext(null);

export function BucketProvider({ children }) {
  const [bucket, setBucket] = useState([]);
  const [isBucketOpen, setIsBucketOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [notification, setNotification] = useState(null);

  // Load bucket from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sweetilo_bucket");
      if (saved) {
        setBucket(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load bucket from localStorage", e);
    }
  }, []);

  // Save to localStorage whenever bucket changes
  useEffect(() => {
    try {
      localStorage.setItem("sweetilo_bucket", JSON.stringify(bucket));
    } catch (e) {
      console.error("Failed to save bucket to localStorage", e);
    }
  }, [bucket]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification((curr) => (curr?.id ? null : curr));
    }, 3200);
  };

  const addToBucket = (product, quantity = 1, notes = "") => {
    setBucket((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          notes: notes || next[existingIndex].notes,
        };
        return next;
      } else {
        return [...prev, { product, quantity, notes }];
      }
    });

    showNotification(`Added "${product.name}" to your Bucket!`);
    setIsBucketOpen(true);
  };

  const removeFromBucket = (productId) => {
    setBucket((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromBucket(productId);
      return;
    }
    setBucket((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearBucket = () => {
    setBucket([]);
    setPromoCode("");
    setDiscountPercent(0);
    try {
      localStorage.removeItem("sweetilo_bucket");
    } catch (e) {}
  };

  const applyPromo = (code) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === "CLOUD9") {
      setPromoCode("CLOUD9");
      setDiscountPercent(15);
      showNotification("Promo CLOUD9 applied! 15% discount granted.", "success");
      return { success: true, message: "15% discount applied!" };
    } else if (cleaned === "SWEETILO10") {
      setPromoCode("SWEETILO10");
      setDiscountPercent(10);
      showNotification("Promo SWEETILO10 applied! 10% discount granted.", "success");
      return { success: true, message: "10% discount applied!" };
    } else {
      showNotification("Invalid code. Try using 'CLOUD9' for 15% off!", "error");
      return { success: false, message: "Invalid promo code. Try 'CLOUD9'" };
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
