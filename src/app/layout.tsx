import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";
import { buildMetadata, softwareJsonLd } from "@/lib/seo";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2D7D9" },
    { media: "(prefers-color-scheme: dark)", color: "#5A0F2E" },
  ],
};

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const japanese = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({
    title: `${site.name} — PDF Editor, eSign & Convert`,
    description: site.description,
    path: "/",
    keywords: [
      "pdf editor",
      "sign pdf online",
      "merge pdf",
      "convert word to pdf",
      "esign",
    ],
  }),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.name,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.jpg", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${japanese.variable} h-full`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <JsonLd data={softwareJsonLd()} />
        {children}
        {site.adsenseClient ? (
          <Script
            id="adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
