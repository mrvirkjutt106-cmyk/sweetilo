"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function ScrollProgressBar3D() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const current = (window.scrollY / totalHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, current)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-purple-950/10 pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#4a196d] via-[#9333ea] to-[#f59e0b] transition-all duration-75 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Glowing 3D tip */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_12px_#9333ea] border-2 border-[#4a196d] flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-[#f59e0b]" />
        </div>
      </div>
    </div>
  );
}
