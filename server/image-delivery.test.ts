import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const content = readFileSync("client/src/content/site.ts", "utf8");
const home = readFileSync("client/src/pages/Home.tsx", "utf8");

describe("homepage image delivery", () => {
  it("uses compressed WebP delivery for active hero and supporting artwork", () => {
    expect(content).toContain('heroArtwork: "/manus-storage/velolaunch-hero-artwork_37f1bb46.webp"');
    expect(content).toContain('heroArtworkMobile: "/manus-storage/velolaunch-hero-mobile-tablet_de540abe.webp"');
    expect(content).toContain('supportVertical: "/manus-storage/velolaunch-support-vertical_2e7a0848.webp"');
    expect(content).toContain('supportHorizon: "/manus-storage/velolaunch-support-horizon_d4a7cb0d.webp"');
  });

  it("prioritizes the responsive hero while deferring and asynchronously decoding supporting visuals", () => {
    expect(home).toContain('fetchPriority="high" decoding="async" sizes="100vw"');
    expect(home).toContain('loading="lazy" decoding="async"');
    expect(home).toContain('srcSet={siteConfig.assets.heroArtworkMobile}');
  });
});
