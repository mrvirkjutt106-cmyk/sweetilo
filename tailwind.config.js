/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bakery: {
          purple: "#4a196d", // Brand Primary Deep Purple
          "purple-deep": "#320b4d",
          "purple-dark": "#230737",
          "purple-hover": "#5c1b89",
          "purple-light": "#6f22a5",
          "purple-vibrant": "#7e22ce", // Vivid Royal Purple
          "purple-radiant": "#9333ea", // Electric Lavender Glow
          "purple-glow": "#a855f7",
          "purple-subtle": "#F6EFFC",
          "purple-border": "#E5D2F2",
          vanilla: "#FAF7F2", // Soft Cream Background
          cream: "#F4EDE2",
          "cream-glow": "#FFFDF9",
          choc: "#1B0D24", // Deep rich dark
          gold: "#E0A94A",
          "gold-vibrant": "#F59E0B", // Radiant Honey Gold
          "gold-amber": "#FBBF24",
          "gold-light": "#FEF3C7",
          amber: "#F3B552",
          caramel: "#C67D24",
          rose: "#E11D48",
          berry: "#EC4899",
          cloud: "#FAF8F5",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-outfit)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        serif: [
          "var(--font-playfair)",
          '"Playfair Display"',
          "Didot",
          '"Bodoni MT"',
          "Georgia",
          "serif",
        ],
        script: [
          "var(--font-caveat)",
          '"Caveat"',
          '"Brush Script MT"',
          "cursive",
        ],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(74, 25, 109, 0.06)",
        "glass-glow": "0 8px 32px 0 rgba(147, 51, 234, 0.16)",
        "vibrant-purple": "0 10px 30px -5px rgba(74, 25, 109, 0.35)",
        "vibrant-gold": "0 10px 25px -5px rgba(245, 158, 11, 0.3)",
        card: "0 12px 30px -10px rgba(74, 25, 109, 0.08)",
        "card-hover": "0 20px 40px -12px rgba(74, 25, 109, 0.16)",
        float: "0 20px 40px -15px rgba(74, 25, 109, 0.28)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        "float-gentle": "floatGentle 4s ease-in-out infinite",
        pulse_subtle: "pulseSubtle 4s ease-in-out infinite",
        "vibrant-glow": "vibrantGlow 3s ease-in-out infinite",
        "shimmer-fast": "shimmerFast 1.6s ease-in-out infinite",
        "fade-up": "fadeUp 0.4s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0px, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        floatGentle: {
          "0%, 100%": { transform: "translate3d(0, 0px, 0)" },
          "50%": { transform: "translate3d(0, -5px, 0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
        vibrantGlow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(147, 51, 234, 0.3)",
            borderColor: "rgba(147, 51, 234, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)",
            borderColor: "rgba(147, 51, 234, 0.7)",
          },
        },
        shimmerFast: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translate3d(0, 12px, 0)" },
          "100%": { opacity: "1", transform: "translate3d(0, 0, 0)" },
        },
      },
    },
  },
  plugins: [],
};
