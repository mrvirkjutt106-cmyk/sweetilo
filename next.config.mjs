/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── IMAGE SECURITY ────────────────────────────────────────────────────────
  // Restrict to specific, verified external image hosts.
  // Never use a wildcard hostname. Constrain to exact paths where possible.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      // 'source.unsplash.com' removed: it is a redirect service that can be
      // abused for open-redirect / SSRF. Use images.unsplash.com directly.
    ],
    // Deny SVG images by default (potential XSS vector via <svg> with scripts)
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'none'; script-src 'none'; sandbox;",
  },

  // ─── BUILD HYGIENE ─────────────────────────────────────────────────────────
  // Never expose source maps in production – they reveal internal file paths
  // and original source code to attackers.
  productionBrowserSourceMaps: false,

  // Re-enable ESLint during builds so security-related lint errors surface.
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ─── HTTP SECURITY HEADERS ─────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Apply these headers to every route.
        source: '/(.*)',
        headers: [
          // ── Content-Security-Policy ────────────────────────────────────
          // Blocks inline scripts/styles and limits resource origins.
          // 'unsafe-inline' is intentionally omitted; Framer Motion and
          // canvas-confetti work without it through their bundled scripts.
          // Adjust 'script-src' if you add third-party scripts (analytics, etc.).
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Allow scripts only from the same origin; Next.js inlines a small
              // bootstrap script, so 'unsafe-inline' is added for dev parity.
              // For strict production, remove 'unsafe-inline' and use nonces.
              "script-src 'self' 'unsafe-inline'",
              // Styles: Next.js also injects critical CSS inline.
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Google Fonts files
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + specific Unsplash CDN + data URIs for previews
              "img-src 'self' data: blob: https://images.unsplash.com",
              // Confetti and framer-motion use Web Workers via blob URLs
              "worker-src 'self' blob:",
              // WhatsApp is an external navigation target, not a frame
              "frame-src 'none'",
              "object-src 'none'",
              // Upgrade insecure requests in production
              "upgrade-insecure-requests",
            ].join('; '),
          },
          // ── HTTP Strict Transport Security ─────────────────────────────
          // Force HTTPS for 2 years; include subdomains.
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // ── Clickjacking Protection ────────────────────────────────────
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // ── MIME-type sniffing prevention ─────────────────────────────
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // ── Referrer leakage control ──────────────────────────────────
          // Do not send the full URL as a Referer to external origins.
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // ── Feature / Permissions Policy ──────────────────────────────
          // Disable browser features this app does not use.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()',
          },
          // ── Cross-Origin policies ─────────────────────────────────────
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },

  // ─── SENSITIVE FILE PROTECTION ─────────────────────────────────────────────
  // Defense-in-depth: Block public HTTP access to .env, .git, and config files
  async redirects() {
    return [
      {
        source: '/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.env.:ext*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.git',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/.git/:path*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/:subpath*/.env',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/:subpath*/.env.:ext*',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/:subpath*/.git/:path*',
        destination: '/404',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
