import Image from "next/image";
import {
  categoryIconKey,
  icons8Src,
  toolIconKey,
  type Icons8Key,
} from "@/lib/icons8";
import type { Tool, ToolCategory } from "@/lib/catalog/tools";

type Icons8IconProps = {
  name: Icons8Key;
  alt?: string;
  size?: number;
  className?: string;
};

/** Local Icons8 PNG (ios11 style) with attribution required site-wide. */
export function Icons8Icon({
  name,
  alt = "",
  size = 28,
  className = "",
}: Icons8IconProps) {
  return (
    <Image
      src={icons8Src(name)}
      alt={alt}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}

export function ToolIcons8Icon({
  tool,
  size = 28,
  className = "",
}: {
  tool: Pick<Tool, "slug" | "engine" | "category">;
  size?: number;
  className?: string;
}) {
  return (
    <Icons8Icon
      name={toolIconKey(tool)}
      size={size}
      className={className}
      alt=""
    />
  );
}

export function CategoryIcons8Icon({
  category,
  size = 28,
  className = "",
}: {
  category: ToolCategory;
  size?: number;
  className?: string;
}) {
  return (
    <Icons8Icon
      name={categoryIconKey(category)}
      size={size}
      className={className}
      alt=""
    />
  );
}
