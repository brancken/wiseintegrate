"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";

/** Open/closed state that closes itself automatically when the page changes. */
export function useOpenUntilNavigate() {
  const pathname = usePathname();
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = useCallback(
    (v: boolean | ((o: boolean) => boolean)) =>
      setOpenAt((cur) => {
        const was = cur === pathname;
        const next = typeof v === "function" ? v(was) : v;
        return next ? pathname : null;
      }),
    [pathname],
  );
  return [open, setOpen] as const;
}

/** Reads the current theme from <html data-theme> and keeps it in sync. */
export function useThemeAttr() {
  return useSyncExternalStore(
    (cb) => {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      return () => mo.disconnect();
    },
    () => (document.documentElement.getAttribute("data-theme") as "light" | "dark") ?? "light",
    () => null,
  );
}

/** A localStorage flag ("1" = set). Returns serverValue during server render. */
export function useStoredFlag(key: string, serverValue: boolean) {
  const value = useSyncExternalStore(
    (cb) => {
      window.addEventListener("storage", cb);
      window.addEventListener(`flag:${key}`, cb);
      return () => { window.removeEventListener("storage", cb); window.removeEventListener(`flag:${key}`, cb); };
    },
    () => { try { return localStorage.getItem(key) === "1"; } catch { return serverValue; } },
    () => serverValue,
  );
  const set = useCallback(() => {
    try { localStorage.setItem(key, "1"); } catch {}
    window.dispatchEvent(new Event(`flag:${key}`));
  }, [key]);
  return [value, set] as const;
}
