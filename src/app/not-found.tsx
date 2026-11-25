import { Fraunces, Figtree } from "next/font/google";
import { NotFoundView } from "@/components/pages/NotFoundView";
import "./globals.css";

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

export default function NotFound() {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
    >
      <body className="min-h-dvh antialiased">
        <NotFoundView />
      </body>
    </html>
  );
}
