import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function protectPdf(
  file: File,
  userPassword: string,
): Promise<Uint8Array> {
  if (!userPassword.trim()) {
    throw new Error("Password must not be empty.");
  }

  const bytes = await fileToUint8Array(file);
  let pdfDoc: PDFDocument;
  try {
    pdfDoc = await PDFDocument.load(bytes);
  } catch {
    throw new Error(`Could not load PDF: ${file.name}`);
  }

  pdfDoc.encrypt({
    userPassword,
    ownerPassword: userPassword,
  });

  return pdfDoc.save();
}
