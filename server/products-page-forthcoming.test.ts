import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const productsPage = readFileSync("client/src/pages/Products.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("dedicated Products page forthcoming cards", () => {
  it("reuses the approved homepage forthcoming-product records with safe release status", () => {
    expect(productsPage).toContain("forthcomingHomepageProducts");
    expect(productsPage).toContain("products-forthcoming-grid");
    expect(productsPage).toContain("VeloLaunch product");
    expect(productsPage).toContain("Releasing Soon");
  });

  it("uses the shared four-card layout and provides a mobile-safe route presentation", () => {
    expect(styles).toContain(".products-forthcoming .home-product-grid");
    expect(styles).toContain(".products-forthcoming .forthcoming-product-card");
    expect(styles).toContain("@media (max-width: 700px) { .products-forthcoming");
  });
});
