import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const content = readFileSync("client/src/content/site.ts", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("responsive homepage hero artwork", () => {
  it("uses the supplied alternate artwork only for mobile and tablet portrait source selection", () => {
    expect(content).toContain("heroArtworkMobile");
    expect(home).toContain('className="hero-artwork-picture"');
    expect(home).toContain('srcSet={siteConfig.assets.heroArtworkMobile}');
    expect(home).toContain('(max-width: 850px), (min-width: 851px) and (max-width: 1024px) and (orientation: portrait)');
  });

  it("retains the desktop artwork fallback and keeps mobile actions without duplicated visual copy", () => {
    expect(home).toContain('src={siteConfig.assets.heroArtwork}');
    expect(styles).toContain(".hero-artwork-copy .hero-artwork-kicker, .hero-artwork-copy h1");
    expect(styles).toContain(".hero-actions { margin-top: 0; }");
  });
});
