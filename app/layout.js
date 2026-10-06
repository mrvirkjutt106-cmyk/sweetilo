import { Outfit, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";
import { BucketProvider } from "@/context/BucketContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BucketSidebar from "@/components/BucketSidebar";
import NotificationToast from "@/components/NotificationToast";
import MobileBottomNav from "@/components/MobileBottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "sans-serif",
  ],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  fallback: ["Playfair Display", "Didot", "Bodoni MT", "Georgia", "serif"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  preload: true,
  fallback: ["Caveat", "Brush Script MT", "cursive"],
});

export const metadata = {
  title: "Sweetilo — Taste Home. Baked on Cloud9",
  description:
    "Pakistan’s premier micro-batch cloud bakehouse. Handcrafted Belgian Noir Ganache cakes, molten NYC cookies, saffron Tres Leches tubs, and vintage glass bottle milks.",
  keywords: [
    "Sweetilo",
    "Bakery Lahore",
    "Bakery Karachi",
    "Bakery Islamabad",
    "Homemade cakes",
    "NYC cookies",
    "Tres Leches",
    "Gourmet bakery Pakistan",
  ],
  openGraph: {
    title: "Sweetilo — Taste Home. Baked on Cloud9",
    description:
      "Handcrafted luxury cakes, molten artisan cookies, and cold brew milks across Lahore, Karachi & Islamabad.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-stone-900 font-sans antialiased selection:bg-[#4a196d] selection:text-white">
        <BucketProvider>
          <NotificationToast />
          {/* Desktop Floating Glassmorphism Header */}
          <Navbar />
          {/* Main App Content */}
          <main className="flex-grow pb-24 lg:pb-0">{children}</main>
          {/* Cart Bucket Drawer */}
          <BucketSidebar />
          {/* Global WhatsApp Action Button pinned to bottom right on all screens */}
          <WhatsAppFAB />
          {/* Mobile Fixed White Pill Bottom Navigation */}
          <MobileBottomNav />
          {/* Footer */}
          <Footer />
        </BucketProvider>
      </body>
    </html>
  );
}
