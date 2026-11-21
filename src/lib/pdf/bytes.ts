/**
 * Always allocate a fresh ArrayBuffer + Uint8Array.
 * pdf.js may transfer/detach whatever buffer it receives in getDocument(),
 * so callers must never reuse a buffer that was already handed to a worker.
 */
export function copyPdfBytes(data: ArrayBuffer | Uint8Array): Uint8Array {
  const view =
    data instanceof Uint8Array
      ? data
      : new Uint8Array(data);
  const out = new Uint8Array(view.byteLength);
  out.set(view);
  return out;
}
