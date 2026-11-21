/** Copy PDF bytes so pdf.js workers never receive a transferable/detached buffer twice. */
export function copyPdfBytes(data: ArrayBuffer | Uint8Array): Uint8Array {
  if (data instanceof Uint8Array) {
    return data.slice();
  }
  return new Uint8Array(data.slice(0));
}
