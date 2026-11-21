import type { Metadata, Viewport } from "next";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

/** Pass-through: html/body live in [locale]/layout so lang matches the URL. */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
