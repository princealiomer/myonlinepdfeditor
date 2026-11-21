import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — free PDF tools`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(145deg, #5A0F2E 0%, #8A1E44 55%, #C76B7A 100%)",
          color: "#FFF7F8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.9, letterSpacing: 2 }}>
          {site.name.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
            Edit, sign, and convert PDFs
          </div>
          <div style={{ fontSize: 28, opacity: 0.92, maxWidth: 820 }}>
            Free · no signup · files stay in your browser
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
