"use client";

import React from "react";
import { motion } from "framer-motion";

export default function WhatsAppFAB() {
  const whatsappUrl =
    "https://wa.me/923001234567?text=Hi%20Sweetilo!%20I'm%20interested%20in%20ordering%20handcrafted%20treats%20from%20your%20cloud%20bakehouse.";

  return (
    <div className="fixed bottom-20 lg:bottom-8 right-5 lg:right-8 z-40 flex items-center gap-2.5 group">
      {/* Desktop/Tablet Hover Pill Tooltip */}
      <span className="hidden sm:inline-block px-3.5 py-1.5 rounded-full bg-white/95 text-stone-700 text-xs font-semibold shadow-lg border border-stone-200/80 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Baker
      </span>

      {/* Prominent Floating Green WhatsApp Action Button pinned to bottom right */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat on WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#20bd5a] transition-all ring-4 ring-white/90 cursor-pointer"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 6.46 17.5 2 12.04 2ZM12.04 20.16C10.59 20.16 9.17 19.77 7.93 19.03L7.63 18.85L4.51 19.67L5.34 16.63L5.15 16.32C4.34 15.03 3.91 13.51 3.91 11.91C3.91 7.43 7.56 3.78 12.05 3.78C14.22 3.78 16.26 4.63 17.79 6.16C19.32 7.7 20.17 9.74 20.17 11.92C20.16 16.4 16.52 20.16 12.04 20.16ZM16.49 14.34C16.25 14.22 15.04 13.63 14.82 13.55C14.59 13.47 14.43 13.43 14.26 13.67C14.1 13.91 13.62 14.47 13.47 14.64C13.33 14.8 13.18 14.82 12.94 14.7C12.7 14.58 11.93 14.33 11.01 13.51C10.29 12.87 9.8 12.08 9.66 11.84C9.52 11.6 9.64 11.47 9.76 11.35C9.87 11.24 10.01 11.06 10.13 10.92C10.25 10.78 10.29 10.68 10.37 10.52C10.45 10.36 10.41 10.22 10.35 10.1C10.29 9.98 9.8 8.78 9.6 8.29C9.4 7.82 9.2 7.88 9.05 7.87L8.57 7.86C8.41 7.86 8.14 7.92 7.92 8.16C7.7 8.4 7.07 8.99 7.07 10.2C7.07 11.41 7.95 12.58 8.07 12.74C8.19 12.9 9.8 15.38 12.26 16.44C12.85 16.7 13.31 16.85 13.66 16.96C14.25 17.15 14.79 17.12 15.22 17.06C15.7 16.99 16.69 16.46 16.9 15.87C17.1 15.28 17.1 14.78 17.04 14.68C16.98 14.58 16.73 14.46 16.49 14.34Z" />
        </svg>
      </motion.a>
    </div>
  );
}
