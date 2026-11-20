"use client";

import { useThemeAttr } from "@/lib/hooks";
import { Icon } from "./Icon";

/** Inline script for <head>: applies the saved theme before first paint (no flash). Otherwise follows the device; light if unknown. */
export const themeScript = `(function(){var d=document.documentElement,t='light';try{t=localStorage.getItem('wi-theme')||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch(e){}d.setAttribute('data-theme',t==='dark'?'dark':'light');d.classList.remove('no-js')})();`;

export function ThemeToggle() {
  const theme = useThemeAttr();
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("wi-theme", next); } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f7f9fd" : "#0b1220");
  };
  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  return (
    <button type="button" onClick={toggle} aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-panel-strong hover:text-ink">
      <Icon name={theme === "light" ? "moon" : "sun"} />
    </button>
  );
}
