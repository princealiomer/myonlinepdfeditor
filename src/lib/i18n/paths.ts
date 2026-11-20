import {
  DEFAULT_LOCALE,
  type Locale,
  isLocale,
} from "./config";

/** Build a path for the given locale. English has no prefix. */
export function localePath(locale: Locale, path = "/"): string {
  const normalized =
    !path || path === "/"
      ? "/"
      : path.startsWith("/")
        ? path
        : `/${path}`;

  if (locale === DEFAULT_LOCALE) {
    return normalized;
  }

  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

/** Strip a leading locale segment from a pathname. */
export function stripLocalePrefix(pathname: string): {
  locale: Locale;
  path: string;
} {
  const parts = pathname.split("/").filter(Boolean);
  const maybe = parts[0];
  if (maybe && isLocale(maybe)) {
    const rest = "/" + parts.slice(1).join("/");
    return {
      locale: maybe,
      path: rest === "/" || rest === "" ? "/" : rest,
    };
  }
  return { locale: DEFAULT_LOCALE, path: pathname || "/" };
}

/** Swap the locale on the current path (without origin). */
export function switchLocalePath(pathname: string, next: Locale): string {
  const { path } = stripLocalePrefix(pathname);
  return localePath(next, path);
}
