/** Build a download name from the original file plus a short action suffix. */
export function namedFromOriginal(
  original: string | undefined,
  suffix: string,
  ext = ".pdf",
): string {
  const raw = (original || "document").trim() || "document";
  const withoutExt = raw.replace(/\.[^.]+$/, "") || "document";
  const safe = withoutExt
    .replace(/[^\w\- .()+]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 80);
  const extension = ext.startsWith(".") ? ext : `.${ext}`;
  return `${safe || "document"}-${suffix}${extension}`;
}
