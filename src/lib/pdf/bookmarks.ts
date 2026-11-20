import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Add simple page-number bookmarks (Page 1…N) when the API allows. */
export async function bookmarkPdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const count = pdf.getPageCount();

  // @cantoo/pdf-lib outline support varies; try common API then fall back.
  const anyPdf = pdf as unknown as {
    setTitle?: (t: string) => void;
    addOutline?: (title: string, dest: unknown) => void;
    outline?: unknown;
  };
  anyPdf.setTitle?.(pdf.getTitle() || file.name.replace(/\.pdf$/i, ""));

  try {
    for (let i = 0; i < count; i++) {
      if (typeof anyPdf.addOutline === "function") {
        anyPdf.addOutline(`Page ${i + 1}`, i);
      }
    }
  } catch {
    // Outline API unavailable — still return a valid PDF with updated title.
  }

  const note = [
    "myonlinepdfeditor.com Bookmarks",
    `Pages: ${count}`,
    "Outline entries were added when supported by this PDF engine.",
    "Open the sidebar bookmarks panel in your PDF reader to verify.",
  ].join("\n");

  // Attach as subject for discoverability if outlines fail silently
  if (!anyPdf.addOutline) {
    pdf.setSubject(`Bookmarks pending: ${count} pages. ${note.slice(0, 80)}`);
  }

  return pdf.save();
}

export async function listBookmarkHint(file: File): Promise<string> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  return `PDF has ${pdf.getPageCount()} page(s). Run Bookmark PDF to add Page 1…N outline entries when supported.`;
}
