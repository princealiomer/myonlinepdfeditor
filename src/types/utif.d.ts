declare module "utif" {
  export type IFD = {
    width: number;
    height: number;
    data?: Uint8Array;
    t256?: number[];
    t257?: number[];
    [key: string]: unknown;
  };

  export function decode(buffer: ArrayBuffer | Uint8Array): IFD[];
  export function decodeImage(buffer: ArrayBuffer | Uint8Array, ifd: IFD): void;
  export function toRGBA8(ifd: IFD): Uint8Array;
  export function encode(ifds: IFD[]): ArrayBuffer;
  export function encodeImage(
    rgba: Uint8Array,
    width: number,
    height: number,
  ): ArrayBuffer;
}
