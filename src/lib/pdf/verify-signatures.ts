import { PDFDocument } from "@cantoo/pdf-lib";
import { fileToUint8Array } from "./read-file";

/** Inspect signature-related form fields (not cryptographic CA validation). */
export async function inspectPdfSignatures(file: File): Promise<string> {
  const bytes = await fileToUint8Array(file);
  const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const form = pdf.getForm();
  const fields = form.getFields();
  const signatureFields = fields.filter((field) => {
    const ctor = field.constructor?.name || "";
    const name = field.getName();
    return /signature/i.test(ctor) || /sig/i.test(name);
  });

  const lines: string[] = [
    "myonlinepdfeditor.com — PDF signature inspection",
    `File: ${file.name}`,
    `Pages: ${pdf.getPageCount()}`,
    `Form fields found: ${fields.length}`,
    `Likely signature fields: ${signatureFields.length}`,
    "",
  ];

  if (!signatureFields.length) {
    lines.push(
      "No signature form fields were detected in this PDF.",
      "Invisible or proprietary signatures may still exist.",
      "For cryptographic validation (certificates, trust chain, revocations),",
      "open the file in Adobe Acrobat Reader or another signing suite.",
    );
  } else {
    lines.push("Detected signature-related fields:");
    for (const field of signatureFields) {
      lines.push(`- ${field.getName()} (${field.constructor.name})`);
    }
    lines.push(
      "",
      "This report lists fields only. It does not verify certificate trust.",
      "Validate signatures in a dedicated PDF reader with a trusted certificate store.",
    );
  }

  lines.push("", `Generated: ${new Date().toISOString()}`);
  return lines.join("\n");
}
