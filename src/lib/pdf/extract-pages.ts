import { splitPdf } from "./split";
import { mergePdfs } from "./merge";
import { downloadBytes } from "./download";

/** Extract 1-indexed page numbers into a single new PDF. */
export async function extractPages(file: File, pages: number[]): Promise<Uint8Array> {
  if (!pages.length) throw new Error("Select at least one page to extract.");
  const unique = [...new Set(pages)].sort((a, b) => a - b);
  const ranges = unique.join(",");
  const parts = await splitPdf(file, ranges);
  if (parts.length === 1) return parts[0].bytes;
  const files = parts.map(
    (part, index) =>
      new File([part.bytes.slice()], `part-${index}.pdf`, { type: "application/pdf" }),
  );
  return mergePdfs(files);
}

export async function extractPagesAndDownload(file: File, pages: number[]) {
  const bytes = await extractPages(file, pages);
  downloadBytes(bytes, "myonlinepdfeditor.com-extracted.pdf");
}
