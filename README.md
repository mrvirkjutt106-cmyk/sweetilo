# 🍰 Sweetilo — Premium Homemade Cloud Bakehouse

> **“Baked on Cloud9, delivered to your heart.”**  
> A boutique homemade bakery prototype crafted with passion, featuring micro-batch cakes, molten cookies, dessert jars, and vintage bottled brews.

---

## 🌟 Overview

**Sweetilo** is a web application prototype for a high-end homemade cloud bakery operating across **Lahore, Karachi, and Islamabad**. Certified by **COTHM** (College of Tourism & Hotel Management), Sweetilo balances traditional artisanal craftsmanship with a modern digital storefront experience.

---

## ✨ Key Features & Architecture

### 1. Dynamic Auto-Scrolling Hero Carousel
- Built with **Framer Motion** (`AnimatePresence`).
- Auto-scrolls every 5 seconds through curated top-selling creations (`heroFeaturedProducts`).
- Pauses smoothly on hover and supports manual navigation via circular glassmorphic arrow buttons and active dot indicators.
- **Future-Proof**: Built dynamically by mapping over data arrays in `data/data.js` — new items added to the data file automatically appear in the carousel without touching UI components.

### 2. Bespoke Custom Order Studio (`/custom-order`)
- Comprehensive design & quote request form:
  - Full Name & WhatsApp-preferred Contact Number
  - Delivery Address with City Hub Selector (Lahore, Karachi, Islamabad)
  - Desired Delivery Date with calendar picker and minimum 3-day notice validation
  - Desired Delivery Time slot presets & custom time
  - Product Type dropdown (Cakes, Cupcakes, Dessert Cups, Cookie Platters, Dessert Tables)
  - Flavor Preferences with interactive selection pills + custom dietary notes
  - Serving Size / Guest Headcount
  - Reference Image Upload dropzone with live preview and removal
- **Prominent Order Policies & Important Notes**:
  - **Advance Notice**: All custom orders must be placed a maximum of 3 days prior to the desired delivery date.
  - **Payment Requirement**: Custom orders are only confirmed upon full payment in advance.
  - **Estimated Pricing Policy**: Initial payment is based on an estimated quote; final costs exceeding the estimate are settled by the customer, and any surplus is strictly refunded by Sweetilo.
- Interactive submission flow with confetti celebration, unique Quote ID generation (`#SWQ-XXXXX`), and direct WhatsApp link to the Head Baker.

### 3. Glassmorphic Navigation & Brand Identity
- Sticky glassmorphic navigation bar displaying the official brand logo (`public/Official Logo.png`).
- Side-by-side category buttons (`Premium Cakes`, `Artisan Cookies`, `Dessert Cups`, `Glass Bottles`, `Custom Order`, and `About Us`).
- Dedicated mobile drawer menu with touch-friendly navigation.
- Deep Purple (`#4a196d`) brand theme accents paired with warm cream (`#FAF7F2`) and white surfaces.

### 4. Floating Interactive Bucket (Cart) Drawer
- Dynamic slide-over drawer powered by React Context (`BucketContext`).
- Real-time quantity adjustments, custom order notes, complimentary greeting card personalization, and reservation flow.
- Sitewide price removal in accordance with Sweetilo's bespoke artisanal consultation and reservation model.

### 5. COTHM Baker Story & Brand Showcase (`/about`)
- Highlights the founder's COTHM bakery credentials, artisanal ingredient sourcing (100% French grass-fed butter, Belgian couverture chocolate), and homemade philosophy.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebrations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, yarn, or pnpm

### 1. Clone & Install
```bash
git clone https://github.com/mrvirkjutt106-cmyk/sweetilo-prototype.git
cd sweetilo-prototype
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live prototype.

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 📦 Project Structure

```text
sweetilo-prototype/
├── app/
│   ├── about/              # COTHM Baker story & vision page
│   ├── category/[slug]/    # Dynamic category collections (cakes, cookies, cups, drinks)
│   ├── checkout/           # Handcrafted reservation & quote dispatch
│   ├── custom-order/       # Bespoke custom orders & specifications studio
│   ├── menu/               # All-inclusive filterable menu
│   ├── globals.css         # Global styling & design tokens
│   ├── layout.js           # Root layout with Navbar, Footer & Bucket Context
│   └── page.js             # Homepage with Hero Carousel & chef showcases
├── components/
│   ├── BrandFeatures.js    # 3-pillar brand value cards
│   ├── BucketSidebar.js    # Slide-over cart drawer
│   ├── FeaturedGrid.js     # Top collection showcase
│   ├── FloatingBucketButton.js # Mobile floating cart shortcut
│   ├── Footer.js           # Comprehensive footer with city hubs & contacts
│   ├── HeroCarousel.js     # Dynamic auto-scrolling Framer Motion carousel
│   ├── Navbar.js           # Sticky header with official logo & navigation
│   └── ProductCard.js      # Individual creation card with fallback handling
├── context/
│   └── BucketContext.js    # Global cart state & local storage synchronization
├── data/
│   └── data.js             # Product catalog, categories & heroFeaturedProducts
├── public/
│   └── Official Logo.png   # Brand mark asset
└── tailwind.config.js      # Tailored brand color palette configuration
```

---

## 📄 License
This project is an exclusive prototype developed for Sweetilo Homemade Bakehouse. All rights reserved.
