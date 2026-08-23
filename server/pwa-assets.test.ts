import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readPublicFile = (path: string) => readFileSync(`client/public/${path}`, "utf8");

describe("PWA installation assets", () => {
  it("declares an installable standalone manifest with maskable icons", () => {
    const manifest = JSON.parse(readPublicFile("manifest.webmanifest")) as {
      display: string;
      start_url: string;
      icons: Array<{ src: string; purpose: string }>;
    };

    expect(manifest.display).toBe("standalone");
    expect(manifest.start_url).toBe("/");
    expect(manifest.icons).toEqual(expect.arrayContaining([
      expect.objectContaining({ src: "/pwa-192.png", purpose: "any maskable" }),
      expect.objectContaining({ src: "/pwa-512.png", purpose: "any maskable" }),
    ]));
  });

  it("provides a service worker with a cached navigation fallback", () => {
    const worker = readPublicFile("sw.js");

    expect(worker).toContain('const CACHE_NAME = "velolaunch-shell-v1"');
    expect(worker).toContain('request.mode === "navigate"');
    expect(worker).toContain('caches.match("/")');
  });
});
