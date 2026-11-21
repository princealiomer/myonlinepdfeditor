import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandWordmark } from "@/components/BrandWordmark";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MobileNav } from "@/components/MobileNav";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";

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
    { href: localePath(locale, "/sample-documents"), label: dict.nav.samples },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/about"), label: dict.nav.about },
  ];

  return (
    <header className="site-header sticky top-0 z-40 border-b border-mist/80 bg-paper/92 backdrop-blur-md">
      {/* Critical brand/header layout: unlayered so it wins over a{overflow-wrap:anywhere}
          and .btn{display} even if Turbopack is slow to refresh globals.css */}
      <style>{`
        .site-brand {
          display: flex;
          flex-shrink: 0;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.35rem;
          overflow-wrap: normal !important;
          word-break: normal !important;
          text-decoration: none;
          max-width: min(100%, 11.5rem);
        }
        .site-brand__wordmark,
        .site-brand__wordmark > span {
          overflow-wrap: normal !important;
          word-break: keep-all !important;
          white-space: nowrap !important;
          text-wrap: nowrap !important;
        }
        .site-brand__wordmark {
          font-size: 0.62rem;
        }
        .site-header .header-editor-cta {
          display: none !important;
        }
        @media (min-width: 420px) {
          .site-brand {
            flex-direction: row;
            align-items: center;
            gap: 0.55rem;
            max-width: none;
          }
          .site-brand__wordmark {
            font-size: 0.72rem;
          }
        }
        @media (min-width: 640px) {
          .site-brand__wordmark {
            font-size: 0.95rem;
          }
        }
        @media (min-width: 1024px) {
          .site-brand__wordmark {
            font-size: 1.125rem;
          }
        }
        @media (min-width: 1280px) {
          .site-header .header-editor-cta {
            display: inline-flex !important;
          }
        }
      `}</style>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-2.5 sm:gap-4 sm:px-6 sm:py-3">
        <Link href={localePath(locale, "/")} className="site-brand group text-ink">
          <BrandLogo className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" title="" />
          <BrandWordmark />
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
            className="btn btn-accent header-editor-cta no-underline"
          >
            {dict.nav.openEditor}
          </Link>
          <MobileNav locale={locale} dict={dict} items={nav} />
        </div>
      </div>
    </header>
  );
}
