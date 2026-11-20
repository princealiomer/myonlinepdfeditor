import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.[^/]+$/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Canonicalize /en and /en/... to unprefixed English URLs.
  if (maybeLocale === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    if (url.pathname === "/") {
      // keep as /
    } else if (!url.pathname.startsWith("/")) {
      url.pathname = "/" + url.pathname;
    }
    if (url.pathname === "") url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Already prefixed with a supported non-default locale.
  if (maybeLocale && isLocale(maybeLocale)) {
    return NextResponse.next();
  }

  // Rewrite unprefixed paths to /en/... so a single [locale] layout owns the shell.
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
