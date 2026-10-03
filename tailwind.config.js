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
          "purple-dark": "#340f4e",
          "purple-light": "#672696",
          "purple-hover": "#5a1d82",
          "purple-subtle": "#F6EFFC",
          "purple-border": "#E5D2F2",
          vanilla: "#FAF7F2", // Soft Cream Background
          cream: "#F4EDE2",
          choc: "#1F0F29", // Deep eggplant dark
          gold: "#E0A94A",
          amber: "#F3B552",
          caramel: "#C67D24",
          cloud: "#FAF8F5",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-caveat)", "cursive"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(74, 25, 109, 0.06)",
        "glass-glow": "0 8px 32px 0 rgba(74, 25, 109, 0.16)",
        card: "0 12px 30px -10px rgba(74, 25, 109, 0.08)",
        float: "0 20px 40px -15px rgba(74, 25, 109, 0.28)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 2s infinite",
        pulse_subtle: "pulseSubtle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
