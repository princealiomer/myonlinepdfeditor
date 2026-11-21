import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Lightweight archival readiness checklist — not a veraPDF-class PDF/A validator. */
export async function validatePdfaChecklist(file: File): Promise<string> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });

  const title = pdf.getTitle() || "";
  const author = pdf.getAuthor() || "";
  const producer = pdf.getProducer() || "";
  const creator = pdf.getCreator() || "";
  const pageCount = pdf.getPageCount();
  let hasForm = false;
  try {
    hasForm = pdf.getForm().getFields().length > 0;
  } catch {
    hasForm = false;
  }

  const checks: { ok: boolean; note: string }[] = [
    { ok: pageCount > 0, note: `Document opens and has ${pageCount} page(s).` },
    {
      ok: !hasForm,
      note: hasForm
        ? "Interactive form fields are present — flatten before archival PDF/A."
        : "No interactive form fields detected.",
    },
    {
      ok: Boolean(title || author || producer || creator),
      note: title || author || producer || creator
        ? `Metadata present (title/author/producer/creator).`
        : "Little or no document metadata — PDF/A often expects XMP metadata.",
    },
  ];

  const lines = [
    "myonlinepdfeditor.com — PDF/A readiness checklist",
    `File: ${file.name}`,
    "",
    "This is NOT a full PDF/A conformance report (use veraPDF or similar).",
    "Use PDF to PDF/A prep, then validate externally if your archive requires it.",
    "",
    ...checks.map((c) => `${c.ok ? "[OK]" : "[CHECK]"} ${c.note}`),
    "",
    `Title: ${title || "(empty)"}`,
    `Author: ${author || "(empty)"}`,
    `Producer: ${producer || "(empty)"}`,
    `Creator: ${creator || "(empty)"}`,
    "",
    `Generated: ${new Date().toISOString()}`,
  ];

  return lines.join("\n");
}
