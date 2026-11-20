/** Minimal ZIP reader for OOXML (.pptx/.docx) using browser DecompressionStream. */

type ZipEntry = { name: string; data: Uint8Array };

function readU16(view: DataView, offset: number) {
  return view.getUint16(offset, true);
}

function readU32(view: DataView, offset: number) {
  return view.getUint32(offset, true);
}

async function inflateRaw(data: Uint8Array): Promise<Uint8Array> {
  if (typeof DecompressionStream === "undefined") {
    throw new Error("This browser cannot decompress PPTX/ZIP files.");
  }
  const stream = new Blob([data.slice()]).stream().pipeThrough(
    new DecompressionStream("deflate-raw"),
  );
  const buffer = await new Response(stream).arrayBuffer();
  return new Uint8Array(buffer);
}

export async function unzipEntries(bytes: Uint8Array): Promise<ZipEntry[]> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const entries: ZipEntry[] = [];
  let offset = 0;

  while (offset + 30 <= bytes.length) {
    const signature = readU32(view, offset);
    if (signature !== 0x04034b50) break;

    const method = readU16(view, offset + 8);
    const compSize = readU32(view, offset + 18);
    const nameLen = readU16(view, offset + 26);
    const extraLen = readU16(view, offset + 28);
    const nameStart = offset + 30;
    const nameEnd = nameStart + nameLen;
    const dataStart = nameEnd + extraLen;
    const dataEnd = dataStart + compSize;
    if (dataEnd > bytes.length) break;

    const name = new TextDecoder().decode(bytes.subarray(nameStart, nameEnd));
    const compressed = bytes.subarray(dataStart, dataEnd);
    let data: Uint8Array;
    if (method === 0) data = compressed.slice();
    else if (method === 8) data = await inflateRaw(compressed);
    else throw new Error(`Unsupported ZIP compression method: ${method}`);

    entries.push({ name, data });
    offset = dataEnd;
  }

  if (!entries.length) {
    throw new Error("Could not read ZIP archive.");
  }
  return entries;
}
