import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const site = readFileSync("client/src/content/site.ts", "utf8");
const productsPage = readFileSync("client/src/pages/Products.tsx", "utf8");
const detailPage = readFileSync("client/src/pages/ProductDetail.tsx", "utf8");
const card = readFileSync("client/src/components/ForthcomingProductCard.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("forthcoming product discovery", () => {
  it("defines addressable forthcoming-product records with minimal browse categories", () => {
    expect(site).toContain("getForthcomingProduct");
    expect(site).toContain('category: "Browser"');
    expect(site).toContain('category: "Finance"');
    expect(site).toContain('category: "Education"');
    expect(site).toContain('category: "Productivity"');
  });

  it("adds accessible category filters and product-detail links", () => {
    expect(productsPage).toContain("aria-pressed={category === option}");
    expect(card).toContain('href={`/products/${product.slug}`}');
    expect(detailPage).toContain("getForthcomingProduct");
    expect(detailPage).toContain("Pre-release disclosure");
  });

  it("captures selected-product notification interest through the existing validated waitlist procedure", () => {
    expect(card).toContain("trpc.waitlist.create.useMutation");
    expect(card).toContain("productName: product.title");
    expect(card).toContain("Notify Me");
    expect(styles).toContain(".product-notification-dialog");
  });
});
