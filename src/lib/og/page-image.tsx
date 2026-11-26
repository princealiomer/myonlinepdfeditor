import { ImageResponse } from "next/og";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

function localeBadge(locale: Locale): string {
  return locale === "pt-BR" ? "PT-BR" : locale.toUpperCase();
}

function clip(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export function renderPageOpenGraphImage({
  locale: localeRaw,
  title,
  summary,
  footer,
}: {
  locale: string;
  title: string;
  summary?: string;
  footer?: string;
}) {
  const locale: Locale = isLocale(localeRaw) ? localeRaw : "en";
  const headline = clip(title, 90);
  const body = summary ? clip(summary, 140) : undefined;

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
          background:
            "linear-gradient(145deg, #5A0F2E 0%, #8A1E44 50%, #C76B7A 100%)",
          color: "#FFF7F8",
          fontFamily: "Georgia, 'Noto Sans JP', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            opacity: 0.92,
            letterSpacing: 1,
          }}
        >
          <span>{site.name}</span>
          <span style={{ fontSize: 20, opacity: 0.85 }}>
            {localeBadge(locale)}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: headline.length > 36 ? 44 : headline.length > 24 ? 52 : 58,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {headline}
          </div>
          {body ? (
            <div style={{ fontSize: 26, opacity: 0.92, maxWidth: 920 }}>
              {body}
            </div>
          ) : null}
          {footer ? (
            <div style={{ fontSize: 22, opacity: 0.88 }}>{footer}</div>
          ) : null}
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
