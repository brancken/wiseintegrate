"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Icon } from "./Icon";

type BIPEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

/*
 * On Android and computers the browser offers an "install" event once per page load.
 * We catch it here, outside any component, so the pop-up and every "Get our app" button can share it.
 */
let savedPrompt: BIPEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((fn) => fn());

/** "This device already has the app" (17 Nov 2026), so we stop offering to install it again. */
const INSTALLED_KEY = "wi-app-installed";
function markInstalled() { try { localStorage.setItem(INSTALLED_KEY, String(Date.now())); } catch {} }
function knownInstalled() { try { return Boolean(localStorage.getItem(INSTALLED_KEY)); } catch { return false; } }

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    savedPrompt = e as BIPEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    savedPrompt = null;
    markInstalled();
    notify();
  });
  // Opened as the app: remember that this phone has it (the app and the browser share this memory on Android).
  if (window.matchMedia("(display-mode: standalone)").matches) markInstalled();
  // Ask Android/Chrome whether the WiseIntegrate app is already installed on this device.
  const nav = navigator as Navigator & { getInstalledRelatedApps?: () => Promise<unknown[]> };
  nav.getInstalledRelatedApps?.().then((apps) => { if (apps.length) { markInstalled(); notify(); } }).catch(() => {});
}


const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};
const noSubscribe = () => () => {};

/** True when the site is already open as the installed app. */
function isStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

/** The browser's own install prompt, when it's available. */
function useInstallPrompt() {
  return useSyncExternalStore(subscribe, () => (knownInstalled() ? null : savedPrompt), () => null);
}

/** Whether we're running inside the installed app. */
export function useInstalled() {
  return useSyncExternalStore(noSubscribe, isStandalone, () => false);
}

async function runInstall() {
  const p = savedPrompt;
  if (!p) return;
  await p.prompt();
  await p.userChoice;
  savedPrompt = null; // a prompt can only be used once
  notify();
}


type Platform = "ios" | "android" | "other";
function detectPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}
function usePlatform(): Platform {
  return useSyncExternalStore(noSubscribe, detectPlatform, () => "other");
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="inline h-5 w-5 align-text-bottom" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="Share icon">
      <path d="M12 3v12" /><path d="M8 7l4-4 4 4" /><path d="M5 11v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8" />
    </svg>
  );
}

/** A short, big-print guide for the steps a phone won't let a website do for you. */
function InstallGuide({ kind, onClose }: { kind: "ios" | "android"; onClose: () => void }) {
  const isChromeIos = typeof navigator !== "undefined" && /crios|fxios|edgios/i.test(navigator.userAgent);
  const steps: React.ReactNode[] = kind === "ios"
    ? [
        isChromeIos
          ? <>Tap the <b>Share</b> button <ShareIcon /> at the <b>top right</b>, next to the web address.</>
          : <>Tap the <b>Share</b> button <ShareIcon /> at the <b>bottom</b> of the screen. On newer iPhones, tap the <b>three dots (•••)</b> first, then <b>Share</b>.</>,
        <>Scroll down and tap <b>Add to Home Screen</b> <span className="inline-grid h-5 w-5 place-items-center rounded border border-current align-text-bottom text-xs font-bold">+</span>.</>,
        <>Tap <b>Add</b> at the top right. The WiseIntegrate app is now on your home screen.</>,
      ]
    : [<>Tap the <b>three dots</b> at the top right of Chrome.</>, <>Tap <b>Install app</b> (or <b>Add to Home screen</b>).</>, <>Tap <b>Install</b>. The WiseIntegrate app is now on your home screen.</>];
  return (
    <div role="dialog" aria-modal="true" aria-label="How to add the WiseIntegrate app" className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl border border-line bg-bg p-5 shadow-soft" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/icons/icon-192.png" alt="" width={48} height={48} className="h-12 w-12 rounded-2xl" />
          <p className="font-display text-xl font-semibold">{kind === "ios" ? "Add the app to your iPhone" : "Add the app to your Android phone"}</p>
        </div>
        {kind === "ios" && <p className="mt-3 text-sm text-muted">Apple doesn&rsquo;t let websites add themselves, so it takes three quick taps:</p>}
        <ol className="mt-3 list-none space-y-3 pl-0">
          {steps.map((t, i) => (
            <li key={i} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent font-semibold text-on-accent">{i + 1}</span><span className="pt-0.5">{t}</span></li>
          ))}
        </ol>
        <button type="button" className="btn btn-primary mt-5 w-full" onClick={onClose}>Got it</button>
      </div>
      {kind === "ios" && !isChromeIos && (
        <div className="pointer-events-none fixed bottom-2 left-1/2 -translate-x-1/2 text-white motion-safe:animate-bounce" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 4v16" /><path d="M6 14l6 6 6-6" /></svg>
        </div>
      )}
    </div>
  );
}

type Browser = "chrome" | "edge" | "safari" | "firefox" | "other";
function detectBrowser(): Browser {
  const ua = navigator.userAgent;
  if (/firefox|fxios/i.test(ua)) return "firefox";
  if (/edg\//i.test(ua)) return "edge";
  if (/chrome|crios/i.test(ua)) return "chrome";
  if (/safari/i.test(ua)) return "safari";
  return "other";
}

/** Steps for computers, for the browser being used now, with the others listed underneath. */
function ComputerGuide({ onClose }: { onClose: () => void }) {
  const b = typeof navigator !== "undefined" ? detectBrowser() : "other";
  const all: { key: Browser; name: string; steps: React.ReactNode }[] = [
    { key: "chrome", name: "Chrome (Windows or Mac)", steps: <>Click the small <b>install icon</b> (a screen with a down arrow) at the right end of the address bar, then <b>Install</b>. Or open the <b>three dots</b> menu, then <b>Cast, save and share</b>, then <b>Install page as app</b>.</> },
    { key: "edge", name: "Microsoft Edge", steps: <>Click the <b>App available</b> icon at the right end of the address bar, then <b>Install</b>. Or open the <b>three dots</b> menu, then <b>Apps</b>, then <b>Install this site as an app</b>.</> },
    { key: "safari", name: "Safari on a Mac", steps: <>Click <b>File</b> in the menu bar at the top of the screen, then <b>Add to Dock</b>, then <b>Add</b>. (You need macOS Sonoma or newer.)</> },
    { key: "firefox", name: "Firefox", steps: <>Firefox on computers can&rsquo;t install web apps yet. On Windows, newer versions may show an <b>Add to taskbar</b> icon at the right end of the address bar; click it if you see it. Otherwise, press <b>Ctrl+D</b> (Windows) or <b>Cmd+D</b> (Mac) to bookmark WiseIntegrate, or open this page in Chrome, Edge or Safari to install it.</> },
  ];
  const mine = all.find((x) => x.key === b);
  const others = all.filter((x) => x.key !== b);
  return (
    <div role="dialog" aria-modal="true" aria-label="How to add the WiseIntegrate app to your computer" className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-3 sm:items-center" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-line bg-bg p-5 shadow-soft" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-xl font-semibold">Add the app to your computer</p>
        {mine && (
          <div className="mt-3 rounded-2xl bg-accent/10 p-4">
            <p className="font-semibold">You&rsquo;re using {mine.name}</p>
            <p className="mt-1">{mine.steps}</p>
          </div>
        )}
        <p className="mt-4 font-semibold">{mine ? "Other browsers" : "Choose your browser"}</p>
        <ul className="mt-2 list-none space-y-3 pl-0">{others.map((x) => <li key={x.key}><b>{x.name}:</b> {x.steps}</li>)}</ul>
        <button type="button" className="btn btn-primary mt-5 w-full" onClick={onClose}>Got it</button>
      </div>
    </div>
  );
}

/** Two big buttons, one for Android and one for iPhone, at the top of the "Get our app" page. */
export function AppButtons() {
  const prompt = useInstallPrompt();
  const installed = useInstalled();
  const [guide, setGuide] = useState<null | "ios" | "android" | "computer">(null);
  if (installed) return <p className="not-prose my-6 rounded-2xl border border-line bg-panel p-5 font-semibold">You&rsquo;re already using the WiseIntegrate app. Welcome!</p>;
  return (
    <div className="not-prose my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <button type="button" className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-5 text-left hover:border-accent" onClick={() => (prompt ? void runInstall() : setGuide("android"))}>
        <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-accent" fill="currentColor" aria-hidden="true"><path d="M17.6 9.48l1.84-3.18a.38.38 0 0 0-.66-.38l-1.86 3.22a11.4 11.4 0 0 0-9.84 0L5.22 5.92a.38.38 0 0 0-.66.38L6.4 9.48A10.8 10.8 0 0 0 1 18h22a10.8 10.8 0 0 0-5.4-8.52zM7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zm10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5z" /></svg>
        <span><span className="block font-display text-xl font-semibold">Android phone</span><span className="text-muted">{prompt ? "Tap to install in one step" : "Tap for the quick steps"}</span></span>
      </button>
      <button type="button" className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-5 text-left hover:border-accent" onClick={() => setGuide("ios")}>
        <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-accent" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31a4.05 4.05 0 0 0-3.18-1.72c-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76a4.24 4.24 0 0 0-3.58 2.17c-1.53 2.65-.39 6.57 1.1 8.72.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.12a9.5 9.5 0 0 0 1.2-2.47 3.83 3.83 0 0 1-2.31-3.48zM14.2 6.13a3.86 3.86 0 0 0 .89-2.77 3.94 3.94 0 0 0-2.55 1.32 3.69 3.69 0 0 0-.91 2.68 3.26 3.26 0 0 0 2.57-1.23z" /></svg>
        <span><span className="block font-display text-xl font-semibold">iPhone or iPad</span><span className="text-muted">Tap for the three quick taps</span></span>
      </button>
      <button type="button" className="flex items-center gap-4 rounded-3xl border border-line bg-panel p-5 text-left hover:border-accent" onClick={() => (prompt && detectPlatform() === "other" ? void runInstall() : setGuide("computer"))}>
        <svg viewBox="0 0 24 24" className="h-10 w-10 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>
        <span><span className="block font-display text-xl font-semibold">Computer</span><span className="text-muted">{prompt && detectPlatform() === "other" ? "Click to install in one step" : "Windows or Mac: click for the steps"}</span></span>
      </button>
      {guide === "computer" ? <ComputerGuide onClose={() => setGuide(null)} /> : guide && <InstallGuide kind={guide} onClose={() => setGuide(null)} />}
    </div>
  );
}

/** One button for every phone: installs in one tap where the browser allows it, otherwise shows the short guide. */
function InstallNowButton({ className, children }: { className: string; children: React.ReactNode }) {
  const prompt = useInstallPrompt();
  const platform = usePlatform();
  const [guide, setGuide] = useState<null | "ios" | "android">(null);
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          if (prompt) void runInstall();
          else setGuide(platform === "ios" ? "ios" : "android");
        }}
      >
        {children}
      </button>
      {guide && <InstallGuide kind={guide} onClose={() => setGuide(null)} />}
    </>
  );
}

/** Registers the service worker and offers "install" (Android/desktop) or an Add to Home Screen hint (iPhone). */
export function PwaSupport() {
  const prompt = useInstallPrompt();
  const [allowed, setAllowed] = useState(false);
  const [iosHint, setIosHint] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    let dismissed = false;
    try {
      const v = Number(localStorage.getItem("wi-install-dismissed-at") || 0);
      dismissed = Date.now() - v < 7 * 24 * 60 * 60 * 1000; // ask again after a week
    } catch {}
    if (dismissed || isStandalone() || knownInstalled()) return;

    const show = setTimeout(() => setAllowed(true), 0);
    const ua = navigator.userAgent;
    const isIos = /iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (isIos) t = setTimeout(() => setIosHint(true), 2_000);
    return () => { clearTimeout(show); if (t) clearTimeout(t); };
  }, []);

  const dismiss = () => {
    setAllowed(false); setIosHint(false);
    try { localStorage.setItem("wi-install-dismissed-at", String(Date.now())); } catch {}
  };

  if (!allowed || (!prompt && !iosHint)) return null;
  return (
    <div role="dialog" aria-label="Install the WiseIntegrate app" className="rise fixed inset-x-3 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-md flex-wrap items-center gap-3 rounded-3xl border border-line bg-bg p-4 shadow-soft lg:bottom-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-192.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-2xl" />
      {/* With large text on a phone the buttons move under the text instead of squeezing it into a thin column. */}
      <div className="min-w-0 flex-1 basis-40 text-sm">
        <p className="font-semibold">Add WiseIntegrate to your home screen</p>
        {prompt ? (
          <p className="text-muted">Quick access to our courses, tools and articles.</p>
        ) : (
          <p className="text-muted">Tap Add and we&rsquo;ll show you the three quick taps.</p>
        )}
      </div>
      <div className="ml-auto flex items-center gap-1">
      {prompt ? (
        <button type="button" className="btn btn-primary !min-h-9 !px-4 text-sm" onClick={async () => { await runInstall(); dismiss(); }}>
          Install
        </button>
      ) : (
        <InstallNowButton className="btn btn-primary !min-h-9 !px-4 text-sm">Add</InstallNowButton>
      )}
      <button type="button" onClick={dismiss} aria-label="Dismiss" className="rounded-full p-2 hover:bg-panel"><Icon name="close" className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

/**
 * "Get our app" button (home page banner). Installs in one tap where the browser allows it
 * (Android, computers); otherwise opens the /app page with the steps. Hidden inside the app.
 */
export function InstallAppButton({ className = "btn btn-primary", label = "Get our app", labelClassName, page = false }: { className?: string; label?: string; labelClassName?: string; page?: boolean | "top" }) {
  const installed = useInstalled();
  const platform = usePlatform();
  if (installed) return null;
  // page: always open the Get our app page (used in the top bar).
  if (page) {
    return (
      <Link href="/app" className={className} aria-label={label} title={label}>
        {page === "top" ? (
          // Top bar: a little phone, "App" on phones and medium screens, "Get our app" where there is room.
          <>
            <Icon name="smartphone" className="h-[18px] w-[18px]" />
            <span className="hdr-app-label whitespace-nowrap sm:hidden lg:inline xl:hidden" aria-hidden="true">App</span>
            <span className="hdr-app-label hidden whitespace-nowrap sm:inline lg:hidden xl:inline" aria-hidden="true">{label}</span>
          </>
        ) : (
          <><Icon name="download" className="h-4 w-4" /> <span className={labelClassName}>{label}</span></>
        )}
      </Link>
    );
  }
  if (platform === "other") {
    // Computers: install if the browser offers it, otherwise go to the page.
    return <ComputerInstall className={className} label={label} labelClassName={labelClassName} />;
  }
  return (
    <InstallNowButton className={className}>
      <Icon name="download" className="h-4 w-4" /> <span className={labelClassName}>{label}</span>
    </InstallNowButton>
  );
}

function ComputerInstall({ className, label, labelClassName }: { className: string; label: string; labelClassName?: string }) {
  const prompt = useInstallPrompt();
  if (prompt) {
    return (
      <button type="button" className={className} onClick={runInstall} aria-label={label} title={label}>
        <Icon name="download" className="h-4 w-4" /> <span className={labelClassName}>{label}</span>
      </button>
    );
  }
  return (
    <Link href="/app" className={className} aria-label={label} title={label}>
      <Icon name="download" className="h-4 w-4" /> <span className={labelClassName}>{label}</span>
    </Link>
  );
}

/** Box at the top of the "Get our app" page: one-tap install where possible, otherwise points to the steps. */
export function InstallAppPanel() {
  const prompt = useInstallPrompt();
  const installed = useInstalled();
  return (
    <div className="not-prose my-8 flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-panel p-5 sm:p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/icon-192.png" alt="The WiseIntegrate app icon: the blue W" width={64} height={64} className="h-16 w-16 rounded-2xl" />
      <div className="min-w-[12rem] flex-1">
        <p className="font-display text-xl font-semibold">WiseIntegrate</p>
        {installed ? (
          <p className="text-muted">You&rsquo;re already using the app. Welcome!</p>
        ) : prompt ? (
          <p className="text-muted">Your device can add the app in one tap.</p>
        ) : (
          <p className="text-muted">Press the button. We&rsquo;ll walk you through it on your phone.</p>
        )}
      </div>
      {!installed && (
        <InstallNowButton className="btn btn-primary">
          <Icon name="download" className="h-4 w-4" /> Install the app
        </InstallNowButton>
      )}
    </div>
  );
}

/** Step 1 on the "Get our app" page: a one-tap Install button where the browser allows it (Android, computers). */
export function InstallAppSaveAction() {
  const prompt = useInstallPrompt();
  const installed = useInstalled();
  if (installed || !prompt) return null;
  return (
    <button type="button" className="btn btn-primary" onClick={runInstall}>
      <Icon name="download" className="h-4 w-4" /> Install now
    </button>
  );
}
