/**
 * lib/security.js — Sweetilo Shared Security Utilities
 *
 * This module centralises security-related helpers so that sanitization
 * behaviour is consistent across all pages and components. Import from
 * this file rather than duplicating sanitization logic.
 *
 * IMPORTANT: This file must NEVER import server-only secrets, API keys,
 * or credentials. It is intentionally safe for both server and client use.
 */

// ─────────────────────────────────────────────────────────────────────────────
// String sanitization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Strip ASCII control characters from a string and trim it to maxLen.
 *
 * React JSX already HTML-escapes text nodes, so this function is primarily
 * a defence-in-depth measure against:
 *   - Log injection (null bytes, carriage returns)
 *   - Header injection (CRLF sequences in values that may reach HTTP headers)
 *   - Resource exhaustion (unbounded long strings)
 *
 * @param {unknown} value  - Raw user input
 * @param {number}  maxLen - Maximum allowed length (characters)
 * @returns {string}
 */
export function sanitizeString(value, maxLen = 200) {
  if (typeof value !== "string") return "";
  // \x00-\x1F = null + C0 control chars; \x7F = DEL
  return value.replace(/[\x00-\x1F\x7F]/g, "").slice(0, maxLen);
}

// ─────────────────────────────────────────────────────────────────────────────
// URL / redirect safety
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Whitelist of domains that the application may link users to externally.
 * Add to this list only after security review.
 */
const ALLOWED_EXTERNAL_DOMAINS = new Set([
  "wa.me",
  "api.whatsapp.com",
  "images.unsplash.com",
  "fonts.googleapis.com",
  "fonts.gstatic.com",
]);

/**
 * Return true if a URL string is safe to use as an <a href> for external links.
 * Blocks:
 *   - javascript: URIs (XSS vector)
 *   - data: URIs (XSS vector)
 *   - vbscript: URIs (legacy IE XSS)
 *   - Any domain not in ALLOWED_EXTERNAL_DOMAINS
 *
 * @param {string} url
 * @returns {boolean}
 */
export function isSafeExternalUrl(url) {
  if (typeof url !== "string") return false;
  try {
    const parsed = new URL(url);
    // Only allow https: (never http: for external links)
    if (parsed.protocol !== "https:") return false;
    return ALLOWED_EXTERNAL_DOMAINS.has(parsed.hostname);
  } catch {
    return false; // URL constructor threw — malformed URL
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Cryptographically random IDs
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate a cryptographically random UUID-based identifier with a prefix.
 * Uses the Web Crypto API (crypto.randomUUID) when available, falling back
 * to a best-effort alternative for very old environments.
 *
 * NEVER use Math.random() for security-sensitive IDs (order IDs, quote IDs,
 * session tokens) — it is a pseudo-random number generator and is predictable.
 *
 * @param {string} prefix  - Short prefix string (e.g. "SW-", "SWQ-")
 * @param {number} length  - Number of hex characters to include after prefix
 * @returns {string}
 */
export function generateSecureId(prefix = "", length = 10) {
  let rawId;
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    rawId = crypto.randomUUID().replace(/-/g, "").toUpperCase();
  } else if (
    typeof crypto !== "undefined" &&
    typeof crypto.getRandomValues === "function"
  ) {
    const bytes = new Uint8Array(Math.ceil(length / 2));
    crypto.getRandomValues(bytes);
    rawId = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  } else {
    // Absolute last resort — only used in non-browser environments without WebCrypto.
    // This is NOT cryptographically secure; prefer the above paths.
    rawId = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`.toUpperCase();
  }
  return `${prefix}${rawId.slice(0, length)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Image magic-byte verification
// ─────────────────────────────────────────────────────────────────────────────

/** Allowed upload MIME types (first-pass client check only — still spoofable) */
export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

/** Max upload file size in bytes (5 MB) */
export const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

/** Max number of files per upload session */
export const MAX_UPLOAD_COUNT = 5;

/**
 * Verify that a File's content begins with a known image magic byte sequence.
 *
 * Client-reported MIME types (File.type) are trivially spoofable — any file
 * can be renamed to ".jpg" and the browser will report "image/jpeg". This
 * function reads the first 12 bytes of the actual file and compares them
 * against known signatures for JPEG, PNG, and WebP.
 *
 * Magic byte references:
 *   JPEG:  FF D8 FF
 *   PNG:   89 50 4E 47 0D 0A 1A 0A
 *   WebP:  52 49 46 46 ?? ?? ?? ?? 57 45 42 50  (RIFF....WEBP)
 *
 * @param {File} file
 * @returns {Promise<boolean>}
 */
export async function verifyImageMagicBytes(file) {
  try {
    const headerBytes = await file.slice(0, 12).arrayBuffer();
    const b = new Uint8Array(headerBytes);

    // JPEG
    if (b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return true;

    // PNG
    if (
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4E && b[3] === 0x47 &&
      b[4] === 0x0D && b[5] === 0x0A && b[6] === 0x1A && b[7] === 0x0A
    ) return true;

    // WebP (RIFF....WEBP)
    if (
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
      b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
    ) return true;

    return false;
  } catch {
    return false; // Reading failed — reject the file
  }
}
