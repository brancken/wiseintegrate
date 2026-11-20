"use client";

import { useEffect, useRef } from "react";

/**
 * The glowing cursor and the soft blue light that follows the mouse (as on the original wiseintegrate.com).
 * Only on computers with a mouse; never on phones or tablets, and off when the visitor asks for less motion.
 */
export function CursorGlow() {
  const dot = useRef<HTMLDivElement>(null);
  const ambient = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches && !("ontouchstart" in window);
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm || !dot.current || !ambient.current) return;
    const d = dot.current, a = ambient.current;
    document.documentElement.classList.add("has-cursor-glow");
    d.style.display = a.style.display = "block";
    let x = window.innerWidth / 2, y = window.innerHeight / 2, raf = 0;
    const paint = () => {
      raf = 0;
      d.style.transform = a.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      d.classList.toggle("hovering", !!t?.closest?.("a, button, [role='button'], summary, label"));
    };
    paint();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.documentElement.classList.remove("has-cursor-glow");
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ambient} className="mouse-ambient" aria-hidden="true" />
      <div ref={dot} className="cursor-glow" aria-hidden="true" />
    </>
  );
}
