import { ImageResponse } from "next/og";
import { getTool } from "@/lib/catalog";
import { isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export const alt = "Tool preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ToolOpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const tool = getTool(slug);
  const title = tool?.name || slug;
  const summary =
    tool?.summary ||
    "Free PDF tool in your browser — no signup, files stay on your device.";
  const localeLabel = isLocale(locale) ? locale : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: "linear-gradient(145deg, #5A0F2E 0%, #8A1E44 50%, #C76B7A 100%)",
          color: "#FFF7F8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            opacity: 0.9,
            letterSpacing: 1,
          }}
        >
          <span>{site.name}</span>
          <span>{localeLabel.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, opacity: 0.92, maxWidth: 900 }}>
            {summary}
          </div>
          <div style={{ fontSize: 22, opacity: 0.85 }}>
            Free · no signup · files stay in your browser
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
