import { useEffect } from "react";
import { useLocation } from "wouter";

function scrollToCurrentHash() {
  const id = window.location.hash.slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function SmoothHashScroll() {
  const [location] = useLocation();

  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToCurrentHash);
    window.addEventListener("hashchange", scrollToCurrentHash);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("hashchange", scrollToCurrentHash); };
  }, [location]);

  return null;
}
