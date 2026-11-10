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
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      const frame = window.requestAnimationFrame(scrollToCurrentHash);
      return () => window.cancelAnimationFrame(frame);
    }
  }, [location]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToCurrentHash);
    return () => window.removeEventListener("hashchange", scrollToCurrentHash);
  }, []);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Only handle un-modified primary (left) clicks
      if (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return;
      }

      // Find closest anchor tag
      const anchor = (event.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      if (event.defaultPrevented) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (
        !rawHref ||
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.href);

        // Don't intercept external links
        if (url.origin !== window.location.origin) return;

        // Don't intercept standalone static web applications under /our-apps/
        if (url.pathname.startsWith("/our-apps/")) return;

        // Don't intercept backend API routes
        if (url.pathname.startsWith("/api/")) return;

        // Same-page pure hash click (e.g. href="#contact" while at "/")
        if (url.pathname === window.location.pathname && url.hash) {
          event.preventDefault();
          if (window.location.hash !== url.hash) {
            window.history.pushState(null, "", url.hash);
          }
          scrollToCurrentHash();
          return;
        }

        // Internal SPA route: prevent hard page reload and navigate client-side via wouter
        event.preventDefault();
        const targetPath = url.pathname + url.search + url.hash;
        navigate(targetPath);
      } catch {
        // Fall back to default browser navigation
      }
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [navigate]);

  return null;
}
