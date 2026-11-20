import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Re-save a PDF without encryption after opening with the user password. */
export async function unlockPdf(file: File, password: string): Promise<Uint8Array> {
  if (!password.trim()) {
    throw new Error("Enter the current PDF password to unlock it.");
  }
  const bytes = await fileToUint8Array(file);
  let pdf: PDFDocument;
  try {
    pdf = await PDFDocument.load(bytes, { password });
  } catch {
    try {
      pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
    } catch {
      throw new Error("Could not open this PDF. Check the password or file integrity.");
    }
  }
  return pdf.save();
}
