import { getPdfjs } from "./render";

export async function extractPdfText(
  data: ArrayBuffer | Uint8Array,
): Promise<{ pageCount: number; pages: { page: number; text: string }[]; fullText: string }> {
  const pdfjs = await getPdfjs();
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;
  const pages: { page: number; text: string }[] = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const text = content.items
      .map((item) => ("str" in item ? String(item.str) : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    pages.push({ page: i, text });
  }

  return {
    pageCount: pdf.numPages,
    pages,
    fullText: pages.map((p) => `--- Page ${p.page} ---\n${p.text}`).join("\n\n"),
  };
}

export function searchPdfText(
  pages: { page: number; text: string }[],
  query: string,
): { page: number; snippet: string }[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: { page: number; snippet: string }[] = [];
  for (const page of pages) {
    const lower = page.text.toLowerCase();
    const idx = lower.indexOf(q);
    if (idx === -1) continue;
    const start = Math.max(0, idx - 40);
    const end = Math.min(page.text.length, idx + q.length + 60);
    hits.push({
      page: page.page,
      snippet: `${start > 0 ? "…" : ""}${page.text.slice(start, end)}${end < page.text.length ? "…" : ""}`,
    });
  }
  return hits;
}
