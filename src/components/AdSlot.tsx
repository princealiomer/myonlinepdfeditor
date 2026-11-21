"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

type AdSlotProps = {
  slot?: string;
  format?: "auto" | "horizontal" | "rectangle";
  className?: string;
  label?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot = "0000000000",
  format = "auto",
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const pushed = useRef(false);
  const client = site.adsenseClient;

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense may be blocked by extensions; keep placeholder.
    }
  }, [client]);

  if (!client) {
    return null;
  }

  return (
    <aside className={`ad-slot ${className}`} aria-label={label}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
