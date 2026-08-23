import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const productsPage = readFileSync("client/src/pages/Products.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("Products page search", () => {
  it("combines a controlled keyword query with category filtering", () => {
    expect(productsPage).toContain("const [searchQuery, setSearchQuery]");
    expect(productsPage).toContain("product.title} ${product.category} ${product.description");
    expect(productsPage).toContain("matchesCategory && (!query || searchableText.includes(query))");
    expect(productsPage).toContain('id="product-search"');
  });

  it("provides a clearable accessible no-results state and responsive search layout", () => {
    expect(productsPage).toContain("No forthcoming products match");
    expect(productsPage).toContain("Clear product search");
    expect(styles).toContain(".product-search");
    expect(styles).toContain(".products-no-results");
    expect(styles).toContain(".product-discovery-controls { align-items: stretch; flex-direction: column;");
    expect(styles).toContain("@media (min-width: 701px) { .products-forthcoming > header { display: grid;");
  });
});
