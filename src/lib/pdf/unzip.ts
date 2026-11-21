import JSZip from "jszip";

export type ZipEntry = { name: string; data: Uint8Array };

/** Read ZIP entries (OOXML, ODF, EPUB, image packs). Uses JSZip for data descriptors / Deflate. */
export async function unzipEntries(bytes: Uint8Array): Promise<ZipEntry[]> {
  let zip: JSZip;
  try {
    // Static import — avoids a separate dynamic chunk that can surface as "Failed to fetch".
    zip = await JSZip.loadAsync(bytes);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "";
    if (/failed to fetch|loading chunk|dynamically imported/i.test(detail)) {
      throw new Error(
        `Could not load the ZIP library (${detail}). Reload the page and try again.`,
      );
    }
    throw new Error(
      "Could not read ZIP archive. The file may be damaged or not a ZIP-based format.",
    );
  }

  const entries: ZipEntry[] = [];
  const names = Object.keys(zip.files).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );

  for (const name of names) {
    const file = zip.files[name];
    if (!file || file.dir) continue;
    const data = await file.async("uint8array");
    entries.push({ name, data });
  }

  if (!entries.length) {
    throw new Error("Could not read ZIP archive (no files found).");
  }
  return entries;
}
