import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteHeader({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
}) {
  const nav = [
    { href: localePath(locale, "/tools"), label: dict.nav.allTools },
    { href: localePath(locale, "/features"), label: dict.nav.features },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/about"), label: dict.nav.about },
  ];

  return (
    <header className="site-header sticky top-0 z-40 border-b border-mist/80 bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link
          href={localePath(locale, "/")}
          className="group flex min-w-0 flex-1 items-center gap-2 no-underline sm:flex-none sm:gap-2.5"
        >
          <BrandLogo className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" title="" />
          <span className="display truncate text-base font-semibold tracking-tight text-ink sm:text-xl lg:text-2xl">
            {site.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft no-underline hover:text-teal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={locale} label={dict.common.language} />
          <Link
            href={localePath(locale, "/tools/edit-pdf")}
            className="btn btn-accent hidden no-underline lg:inline-flex"
          >
            {dict.nav.openEditor}
          </Link>
          <MobileNav locale={locale} dict={dict} items={nav} />
        </div>
      </div>
    </header>
  );
}
