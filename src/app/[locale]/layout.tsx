import { notFound } from "next/navigation";
import Script from "next/script";
import { Fraunces, Figtree, Noto_Sans_JP } from "next/font/google";
import { LocaleShell } from "@/components/LocaleShell";
import {
  LOCALES,
  getDictionary,
  isLocale,
  type Locale,
} from "@/lib/i18n";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const japanese = Noto_Sans_JP({
  variable: "--font-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

function htmlLang(locale: Locale): string {
  return locale === "pt-BR" ? "pt-BR" : locale;
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
    <html
      lang={htmlLang(locale)}
      data-locale={locale}
      className={`${display.variable} ${body.variable} ${japanese.variable} h-full`}
    >
      <body className="flex min-h-dvh flex-col antialiased">
        <Script id="gtm-datalayer" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
        <Script
          id="gtm"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-K28KSHSP"
          strategy="afterInteractive"
          fetchPriority="low"
        />
        <LocaleShell locale={locale} dict={dict}>
          {children}
        </LocaleShell>
      </body>
    </html>
  );
}
