import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { BrandWordmark } from "@/components/BrandWordmark";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";

export function SiteFooter({
  locale = "en",
  dict,
}: {
  locale?: Locale;
  dict: Dictionary;
}) {
  const companyLinks = [
    { href: localePath(locale, "/about"), label: dict.footer.about },
    { href: localePath(locale, "/contact"), label: dict.footer.contact },
    { href: localePath(locale, "/privacy"), label: dict.footer.privacy },
    { href: localePath(locale, "/disclaimer"), label: dict.footer.disclaimer },
    { href: localePath(locale, "/terms"), label: dict.footer.terms },
  ];

  const quickLinks = [
    { href: localePath(locale, "/tools"), label: dict.nav.allTools },
    { href: localePath(locale, "/tools/edit-pdf"), label: dict.nav.openEditor },
    { href: localePath(locale, "/sample-documents"), label: dict.nav.samples },
    { href: localePath(locale, "/pricing"), label: dict.nav.pricing },
    { href: localePath(locale, "/vs"), label: "Compare" },
  ];

  return (
    <footer className="site-footer mt-auto border-t border-mist bg-ink text-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href={localePath(locale, "/")}
            className="site-brand text-paper no-underline"
          >
            <BrandLogo className="h-9 w-9 shrink-0" title="" />
            <BrandWordmark />
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mist">
            {dict.footer.blurb}
          </p>
          <p className="mt-3 text-sm text-mist">
            <a className="text-teal-bright" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-teal-bright">
            {dict.common.tools}
          </p>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-paper/90 no-underline hover:text-teal-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-teal-bright">
            {dict.footer.company}
          </p>
          <ul className="space-y-2 text-sm">
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-paper/90 no-underline hover:text-teal-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localePath(locale, "/esign-compliance")}
                className="text-paper/90 no-underline hover:text-teal-bright"
              >
                {dict.footer.esign}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © 2026 {site.name}. {dict.footer.copyright}
          </p>
          <a
            href="https://icons8.com"
            className="no-underline hover:text-white"
            rel="noopener noreferrer"
            target="_blank"
          >
            Icons by Icons8
          </a>
        </div>
      </div>
    </footer>
  );
}
