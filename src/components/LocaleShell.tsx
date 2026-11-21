import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Dictionary, Locale } from "@/lib/i18n";

export function LocaleShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main className="flex-1 min-h-[50vh]">{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
