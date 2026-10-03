import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { BucketProvider } from "@/context/BucketContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BucketSidebar from "@/components/BucketSidebar";
import FloatingBucketButton from "@/components/FloatingBucketButton";
import NotificationToast from "@/components/NotificationToast";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  title: "Sweetilo — Baked on Cloud9, Delivered to Your Heart",
  description:
    "Luxury homemade bakery in Pakistan. Indulge in Belgian Noir Ganache cakes, molten NYC chunk cookies, saffron Tres Leches tubs, and cold brew milks.",
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
    title: "Sweetilo — Baked on Cloud9, Delivered to Your Heart",
    description:
      "Handcrafted luxury cakes, molten artisan cookies, and cold brew milks priced in PKR.",
    type: "website",
  },
};

import MobileBottomNav from "@/components/MobileBottomNav";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-bakery-choc font-sans antialiased selection:bg-[#4a196d] selection:text-white">
        <BucketProvider>
          <NotificationToast />
          <Navbar />
          <main className="flex-grow pb-24 lg:pb-0">{children}</main>
          <BucketSidebar />
          <FloatingBucketButton />
          <WhatsAppFAB />
          <MobileBottomNav />
          <Footer />
        </BucketProvider>
      </body>
    </html>
  );
}
