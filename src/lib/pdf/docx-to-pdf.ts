import mammoth from "mammoth";
import { fileToArrayBuffer } from "./read-file";
import { textToPdf } from "./text-to-pdf";

export async function docxToPdf(file: File): Promise<Uint8Array> {
  const buffer = await fileToArrayBuffer(file);
  let result: { value: string };
  try {
    result = await mammoth.extractRawText({ arrayBuffer: buffer });
  } catch {
    throw new Error(`Could not read DOCX file: ${file.name}`);
  }

  const text = result.value.trim();
  if (!text) {
    throw new Error("DOCX file contains no extractable text.");
  }

  const title = file.name.replace(/\.docx$/i, "");
  return textToPdf(text, title);
}