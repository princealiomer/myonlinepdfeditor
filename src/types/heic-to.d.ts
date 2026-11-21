declare module "heic-to" {
  export function isHeic(file: Blob | File): Promise<boolean>;
  export function heicTo(options: {
    blob: Blob;
    type: "image/jpeg" | "image/png" | "bitmap";
    quality?: number;
    options?: ImageBitmapOptions;
  }): Promise<Blob | ImageBitmap>;
}

declare module "heic-to/csp" {
  export function isHeic(file: Blob | File): Promise<boolean>;
  export function heicTo(options: {
    blob: Blob;
    type: "image/jpeg" | "image/png" | "bitmap";
    quality?: number;
    options?: ImageBitmapOptions;
  }): Promise<Blob | ImageBitmap>;
}
