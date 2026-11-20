import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";
import { extractPdfText } from "./extract-text";

export async function analyzePdf(file: File): Promise<string> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pageCount = pdf.getPageCount();
  const sizes = pdf.getPages().map((p, i) => {
    const { width, height } = p.getSize();
    return `  Page ${i + 1}: ${width.toFixed(1)} × ${height.toFixed(1)} pt`;
  });
  const title = pdf.getTitle() || "(none)";
  const author = pdf.getAuthor() || "(none)";
  const subject = pdf.getSubject() || "(none)";
  const creator = pdf.getCreator() || "(none)";
  const producer = pdf.getProducer() || "(none)";
  const keywords = (pdf.getKeywords() || "").toString() || "(none)";

  let textChars = 0;
  let pagesWithText = 0;
  try {
    const extracted = await extractPdfText(bytes);
    textChars = extracted.fullText.length;
    pagesWithText = extracted.pages.filter((p) => p.text.trim()).length;
  } catch {
    // ignore extract failures
  }

  return [
    "myonlinepdfeditor.com PDF Analysis",
    `File: ${file.name}`,
    `Bytes: ${bytes.byteLength.toLocaleString()}`,
    `Pages: ${pageCount}`,
    `Title: ${title}`,
    `Author: ${author}`,
    `Subject: ${subject}`,
    `Creator: ${creator}`,
    `Producer: ${producer}`,
    `Keywords: ${keywords}`,
    `Pages with extractable text: ${pagesWithText}/${pageCount}`,
    `Extractable characters: ${textChars.toLocaleString()}`,
    "",
    "Page sizes:",
    ...sizes,
  ].join("\n");
}

export async function pdfStatistics(file: File): Promise<string> {
  return analyzePdf(file);
}
