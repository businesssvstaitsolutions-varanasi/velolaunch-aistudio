import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const content = readFileSync("client/src/content/site.ts", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("forthcoming homepage products", () => {
  it("lists the four supplied forthcoming products with a releasing-soon status", () => {
    expect(content).toContain("Apex Turbo Smart Tab Organizer and Memory Saver");
    expect(content).toContain("FinAura AI - Powered Finance Vault");
    expect(content).toContain("PlutoLearn AI - Powered EdTech Platform");
    expect(content).toContain("VeloTools - 1000+ Powerful Tools");
    expect(home).toContain("Releasing Soon");
    expect(home).toContain("forthcomingHomepageProducts.map");
  });

  it("uses four horizontal desktop cards with responsive wrapping", () => {
    expect(styles).toContain("grid-template-columns: repeat(4, minmax(0, 1fr))");
    expect(styles).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(styles).toContain(".forthcoming-product-card-head strong");
  });

  it("gives the product cards, waitlist, and closing actions distinct breathing room", () => {
    expect(styles).toContain(".home-products .section-heading { margin-bottom:");
    expect(styles).toContain(".home-products .product-waitlist { gap:");
    expect(styles).toContain(".home-products .home-products-panel { margin-top:");
  });
});
