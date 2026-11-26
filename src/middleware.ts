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
    // Only the site-root OG file is unprefixed. Nested OG routes
    // (e.g. /tools/[slug]/opengraph-image) must rewrite into /en/...
    pathname === "/opengraph-image" ||
    pathname.startsWith("/opengraph-image/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  // Canonicalize /en and /en/... to unprefixed English URLs.
  // Keep /en/.../opengraph-image reachable so ImageResponse can resolve
  // under the [locale] segment without a redirect loop.
  if (maybeLocale === DEFAULT_LOCALE) {
    if (/\/opengraph-image\/?$/.test(pathname)) {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/" + segments.slice(1).join("/");
    if (url.pathname === "/") {
      // keep as /
    } else if (!url.pathname.startsWith("/")) {
      url.pathname = "/" + url.pathname;
    }
    if (url.pathname === "") url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }

  // Already prefixed with a supported non-default locale.
  if (maybeLocale && isLocale(maybeLocale)) {
    return NextResponse.next();
  }

  // Rewrite unprefixed paths to /en/... so a single [locale] layout owns the shell.
  // This includes /tools/[slug]/opengraph-image → /en/tools/[slug]/opengraph-image.
  const url = request.nextUrl.clone();
  url.pathname =
    pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
