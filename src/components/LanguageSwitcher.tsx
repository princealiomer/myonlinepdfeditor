"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_LABELS,
  type Locale,
} from "@/lib/i18n/config";
import { switchLocalePath } from "@/lib/i18n/paths";

export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const pathname = usePathname() || "/";

  return (
    <details className="relative">
      <summary
        className="btn btn-ghost flex min-h-11 cursor-pointer list-none items-center gap-1.5 border border-mist/80 px-2.5 py-2 text-sm sm:px-3 [&::-webkit-details-marker]:hidden"
        aria-label={`${label}: ${locale === "pt-BR" ? "PT" : locale.toUpperCase()}`}
      >
        <span className="hidden text-xs font-medium text-muted sm:inline">
          {label}
        </span>
        <span className="font-semibold uppercase tracking-[0.08em] text-ink">
          {locale === "pt-BR" ? "PT" : locale.toUpperCase()}
        </span>
      </summary>
      <div className="surface absolute right-0 z-50 mt-2 w-52 rounded-xl p-2 shadow-lg">
        <p className="px-3 pb-1 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted">
          {label}
        </p>
        <ul className="py-1">
          {LOCALES.map((code) => {
            const href = switchLocalePath(pathname, code);
            const active = code === locale;
            return (
              <li key={code}>
                <Link
                  href={href}
                  hrefLang={LOCALE_LABELS[code].hreflang}
                  className={`block rounded-lg px-3 py-3 text-sm no-underline hover:bg-paper ${
                    active ? "font-semibold text-teal" : "text-ink-soft"
                  }`}
                  aria-current={active ? "true" : undefined}
                >
                  {LOCALE_LABELS[code].native}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </details>
  );
}
