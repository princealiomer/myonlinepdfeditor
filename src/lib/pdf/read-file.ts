function readFileAs<T>(file: File, read: (reader: FileReader) => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as T);
    reader.onerror = () =>
      reject(reader.error ?? new Error(`Failed to read file: ${file.name}`));
    read(reader);
  });
}

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return readFileAs<ArrayBuffer>(file, (reader) => reader.readAsArrayBuffer(file));
}

export async function fileToUint8Array(file: File): Promise<Uint8Array> {
  const buffer = await fileToArrayBuffer(file);
  return new Uint8Array(buffer);
}

export function fileToDataUrl(file: File): Promise<string> {
  return readFileAs<string>(file, (reader) => reader.readAsDataURL(file));
}

export function readTextFile(file: File): Promise<string> {
  return readFileAs<string>(file, (reader) => reader.readAsText(file));
}