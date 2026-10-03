"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ShoppingBag } from "lucide-react";
import { useBucket } from "@/context/BucketContext";

export default function NotificationToast() {
  const { notification } = useBucket();

  return (
    <div className="fixed top-24 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl border text-sm font-medium ${
              notification.type === "error"
                ? "bg-rose-50 border-rose-200 text-rose-900"
                : "bg-white/95 backdrop-blur-md border-[#e5d2f2] text-[#1F0F29] shadow-glass-glow"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[#F6EFFC] flex items-center justify-center text-[#4a196d] flex-shrink-0">
              {notification.type === "error" ? (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              ) : (
                <ShoppingBag className="w-4 h-4 text-[#4a196d]" />
              )}
            </div>
            <p className="pr-2">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
