import { textToPdf } from "./text-to-pdf";

/** Lightweight Markdown → plain text → PDF (no full MD renderer). */
export function markdownToPlain(md: string): string {
  return md
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/`{1,3}([^`]+)`{1,3}/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/^\s*\d+\.\s+/gm, (m) => m)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^>\s?/gm, "")
    .replace(/\|/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export async function markdownToPdf(file: File): Promise<Uint8Array> {
  const text = await file.text();
  return textToPdf(markdownToPlain(text), file.name.replace(/\.md$/i, ""));
}
