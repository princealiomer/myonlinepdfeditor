import Link from "next/link";
import type { ReactNode } from "react";
import { localePath, type Locale } from "@/lib/i18n";

const MD_LINK = /\[([^\]]+)\]\((\/[^)\s]+)\)/g;

/** Renders plain text with optional `[label](/path)` markdown links as Next.js Links. */
export function LinkedText({
  text,
  locale,
  className,
}: {
  text: string;
  locale: Locale;
  className?: string;
}) {
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(MD_LINK.source, "g");

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(text.slice(last, match.index));
    }
    const [, label, href] = match;
    nodes.push(
      <Link
        key={`${href}-${match.index}`}
        href={localePath(locale, href)}
        className="font-medium text-teal no-underline hover:underline"
      >
        {label}
      </Link>,
    );
    last = match.index + match[0].length;
  }

  if (last < text.length) nodes.push(text.slice(last));

  return className ? <span className={className}>{nodes}</span> : <>{nodes}</>;
}
