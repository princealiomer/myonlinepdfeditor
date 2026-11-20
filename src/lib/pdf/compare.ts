import { extractPdfText } from "./extract-text";
import { fileToUint8Array } from "./read-file";

export async function comparePdfs(a: File, b: File): Promise<string> {
  const [textA, textB] = await Promise.all([
    extractPdfText(await fileToUint8Array(a)),
    extractPdfText(await fileToUint8Array(b)),
  ]);

  const linesA = textA.fullText.split(/\r?\n/);
  const linesB = textB.fullText.split(/\r?\n/);
  const max = Math.max(linesA.length, linesB.length);
  const diffs: string[] = [
    `Compare: ${a.name} vs ${b.name}`,
    `Pages: ${textA.pageCount} vs ${textB.pageCount}`,
    "",
  ];

  let changes = 0;
  for (let i = 0; i < max; i++) {
    const left = linesA[i] ?? "";
    const right = linesB[i] ?? "";
    if (left === right) continue;
    changes += 1;
    if (changes <= 80) {
      diffs.push(`Line ${i + 1}`);
      if (left) diffs.push(`- ${left.slice(0, 200)}`);
      if (right) diffs.push(`+ ${right.slice(0, 200)}`);
      diffs.push("");
    }
  }

  if (!changes) diffs.push("No text differences found (binary/layout-only changes may still exist).");
  else diffs.push(`Total changed lines shown: ${Math.min(changes, 80)} of ${changes}.`);
  return diffs.join("\n");
}
