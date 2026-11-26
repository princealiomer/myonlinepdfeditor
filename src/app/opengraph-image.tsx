import {
  homeOgContentType,
  homeOgSize,
  renderHomeOpenGraphImage,
} from "@/lib/og/home-image";
import { site } from "@/lib/site";

export const alt = `${site.name} — free PDF tools`;
export const size = homeOgSize;
export const contentType = homeOgContentType;

export default async function OpenGraphImage() {
  return renderHomeOpenGraphImage("en");
}
