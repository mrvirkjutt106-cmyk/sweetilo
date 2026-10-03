import React from "react";

export default function CothmShield({ className = "w-12 h-14" }) {
  return (
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* COTHM Shield SVG Graphic */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Shield Outer Gold Border */}
        <path
          d="M50 2L10 16V55C10 82 27 107 50 118C73 107 90 82 90 55V16L50 2Z"
          fill="#0C2340"
          stroke="#D4AF37"
          strokeWidth="3.5"
        />

        {/* Shield Inner Inset */}
        <path
          d="M50 8L16 20V54C16 77 31 99 50 109C69 99 84 77 84 54V20L50 8Z"
          fill="#112F58"
        />

        {/* Gold Chevron / Crest Cross */}
        <path
          d="M50 18L76 50H58V88H42V50H24L50 18Z"
          fill="#E5B942"
          opacity="0.9"
        />

        {/* Diagonal Heraldic Line */}
        <path
          d="M20 30L80 75"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        {/* Shield Star */}
        <circle cx="50" cy="38" r="4" fill="#FFFFFF" />

        {/* Bottom Banner Ribbon */}
        <path
          d="M12 92H88L78 108H22L12 92Z"
          fill="#D4AF37"
        />
        <text
          x="50"
          y="103"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fontFamily="sans-serif"
          fill="#0C2340"
          letterSpacing="0.8"
        >
          COTHM
        </text>
      </svg>
      <span className="text-[7.5px] font-black uppercase tracking-wider text-[#0C2340] text-center mt-0.5 leading-tight">
        Certified
      </span>
    </div>
  );
}
