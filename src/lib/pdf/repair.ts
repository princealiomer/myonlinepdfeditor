import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Rebuild PDF structure by loading and re-saving (helps some lightly corrupted files). */
export async function repairPdf(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  try {
    const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    return pdf.save({ useObjectStreams: false });
  } catch {
    throw new Error(
      "Could not repair this PDF. Severely corrupted files may need a specialized recovery tool.",
    );
  }
}
