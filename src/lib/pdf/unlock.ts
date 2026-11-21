import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

function looksEncrypted(bytes: Uint8Array): boolean {
  const sample = bytes.subarray(0, Math.min(bytes.length, 512_000));
  const text = new TextDecoder("latin1").decode(sample);
  return /\/Encrypt[\s/<\[]/.test(text);
}

/** Re-save a PDF without encryption after opening with the user password. */
export async function unlockPdf(file: File, password: string): Promise<Uint8Array> {
  if (!password.trim()) {
    throw new Error("Enter the current PDF password to unlock it.");
  }
  const bytes = await fileToUint8Array(file);

  if (!looksEncrypted(bytes)) {
    // Confirm with a clean load — some writers omit a clear /Encrypt token.
    try {
      await PDFDocument.load(bytes);
      throw new Error(
        "This PDF is not password-protected. Nothing to unlock — download the original file as-is.",
      );
    } catch (err) {
      if (err instanceof Error && err.message.includes("not password-protected")) {
        throw err;
      }
      // Fall through: file may still be encrypted despite missing token in the sample.
    }
  }

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
