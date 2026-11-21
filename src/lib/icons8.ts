import type { Tool, ToolCategory } from "@/lib/catalog/tools";

/**
 * Icons8 iOS Glyph (ios11) pack — searched via Icons8 MCP, PNGs in /public/icons/icons8.
 * Free PNG use requires attribution: https://icons8.com
 */
export const ICONS8_STYLE = "ios11" as const;

export type Icons8Key =
  | "pdf"
  | "merge"
  | "edit"
  | "signature"
  | "share"
  | "ai"
  | "convert"
  | "compress"
  | "lock"
  | "download"
  | "split"
  | "search"
  | "unlock"
  | "export-pdf";

export const ICONS8_IDS: Record<Icons8Key, string> = {
  pdf: "59859",
  merge: "Cpgkj1eIudXG",
  edit: "71201",
  signature: "61375",
  share: "98959",
  ai: "Kni843UOUPxB",
  convert: "59872",
  compress: "78839",
  lock: "59825",
  download: "59783",
  split: "62915",
  search: "59878",
  unlock: "60016",
  "export-pdf": "102687",
};

export function icons8Src(key: Icons8Key, size = 64): string {
  return `/icons/icons8/${key}.png`;
}

/** CDN fallback (same asset as local file). */
export function icons8CdnSrc(key: Icons8Key, size = 64): string {
  return `https://img.icons8.com/?id=${encodeURIComponent(ICONS8_IDS[key])}&format=png&size=${size}`;
}

const CATEGORY_ICON: Record<ToolCategory, Icons8Key> = {
  convert: "convert",
  edit: "edit",
  sign: "signature",
  share: "share",
  ai: "ai",
  other: "search",
};

export function categoryIconKey(category: ToolCategory): Icons8Key {
  return CATEGORY_ICON[category] ?? "pdf";
}

export function toolIconKey(tool: Pick<Tool, "slug" | "engine" | "category">): Icons8Key {
  const slug = tool.slug;
  const engine = tool.engine;

  if (slug.includes("merge") || engine === "merge") return "merge";
  if (slug.includes("split") || engine === "split") return "split";
  if (slug.includes("compress") || engine === "compress" || engine === "compress-images")
    return "compress";
  if (slug.includes("unlock") || engine === "unlock") return "unlock";
  if (
    slug.includes("password") ||
    slug.includes("protect") ||
    engine === "protect" ||
    slug.includes("lock")
  )
    return "lock";
  if (
    slug.includes("sign") ||
    slug.includes("signature") ||
    engine === "envelope" ||
    tool.category === "sign"
  )
    return "signature";
  if (tool.category === "ai" || engine === "ai-assist") return "ai";
  if (
    tool.category === "share" ||
    engine === "email-share" ||
    slug.includes("share") ||
    engine === "fax"
  )
    return "share";
  if (
    engine === "download" ||
    engine === "export" ||
    slug.includes("download") ||
    slug.includes("export")
  )
    return "download";
  if (engine === "editor" || engine === "watermark" || slug.includes("edit"))
    return "edit";
  if (engine === "search" || engine === "analyze" || slug.includes("search"))
    return "search";
  if (
    engine === "pdf-to-images" ||
    engine === "pdf-to-docx" ||
    engine === "pdf-to-odt" ||
    engine === "pdf-to-text" ||
    engine === "pdf-to-excel" ||
    slug.startsWith("pdf-to-")
  )
    return "export-pdf";
  if (tool.category === "convert") return "convert";
  return categoryIconKey(tool.category);
}
