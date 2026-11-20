import { notFound } from "next/navigation";
import { LocaleShell } from "@/components/LocaleShell";
import {
  LOCALES,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = await getDictionary(locale);

  return (
    <LocaleShell locale={locale} dict={dict}>
      {children}
    </LocaleShell>
  );
}
