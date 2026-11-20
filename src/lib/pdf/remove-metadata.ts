import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

export async function removePdfMetadata(file: File): Promise<Uint8Array> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  pdf.setTitle("");
  pdf.setAuthor("");
  pdf.setSubject("");
  pdf.setKeywords([]);
  pdf.setProducer("myonlinepdfeditor.com");
  pdf.setCreator("myonlinepdfeditor.com");
  try {
    pdf.setCreationDate(new Date(0));
    pdf.setModificationDate(new Date(0));
  } catch {
    // Some builds omit date setters.
  }
  return pdf.save();
}
