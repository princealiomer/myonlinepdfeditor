import type { CSSProperties } from "react";
import { site } from "@/lib/site";

type BrandWordmarkProps = {
  className?: string;
};

const wordmarkStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  lineHeight: 1.05,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  overflowWrap: "normal",
  wordBreak: "keep-all",
  whiteSpace: "nowrap",
};

const lineStyle: CSSProperties = {
  display: "block",
  whiteSpace: "nowrap",
  overflowWrap: "normal",
  wordBreak: "keep-all",
};

/**
 * Domain as two intentional lines: "myonlinepdfeditor" then ".com".
 * Inline styles beat body/a `overflow-wrap: anywhere` so the name never
 * fractures mid-word in the header.
 */
export function BrandWordmark({ className = "" }: BrandWordmarkProps) {
  const primary = site.name.replace(/\.com$/i, "");
  const tld = site.name.endsWith(".com") ? ".com" : "";

  return (
    <span
      className={`site-brand__wordmark display ${className}`.trim()}
      style={wordmarkStyle}
      aria-label={site.name}
    >
      <span style={lineStyle}>{primary}</span>
      {tld ? (
        <span style={{ ...lineStyle, fontSize: "0.92em", opacity: 0.9 }}>{tld}</span>
      ) : null}
    </span>
  );
}
