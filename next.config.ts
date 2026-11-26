import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // AdSense + Privacy Sandbox / Funding Choices hosts (no unpkg — pdf.js worker is same-origin).
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google.com https://partner.googleadservices.com https://adservice.google.com https://tpc.googlesyndication.com https://www.gstatic.com https://www.googletagmanager.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https: blob:",
      // blob: allows same-origin print preview iframes/windows (HTML page images, not PDF plugins).
      "frame-src 'self' blob: https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://www.googleadservices.com https://fundingchoicesmessages.google.com https://*.google.com",
      "worker-src 'self' blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Prefer fully static HTML for tool/feature pages (avoids empty <main> holes).
  cacheComponents: false,
  // Helps Lighthouse "missing source maps" / easier production debugging.
  productionBrowserSourceMaps: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:file(favicon.*|apple-touch-icon.*|logo.svg|icon-512.jpg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/tools/publisher-to-pdf",
        destination: "/tools/pub-to-pdf",
        permanent: true,
      },
      {
        source: "/:locale(es|de|fr|pt-BR|ja)/tools/publisher-to-pdf",
        destination: "/:locale/tools/pub-to-pdf",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
