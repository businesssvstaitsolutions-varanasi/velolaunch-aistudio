import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("homepage capability grid", () => {
  it("keeps all four capability cards beneath the capabilities heading in a two-column desktop grid", () => {
    expect(home).toContain('className="capabilities-layout"');
    expect(home).toContain('className="capability-list service-card-stack"');
    expect(styles).toContain("grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(styles).toContain("grid-template-rows: repeat(2, minmax(0, 1fr))");
  });

  it("enforces the two-column layout even at compact phone widths", () => {
    expect(styles).toContain("Capability cards are intentionally two-up at every width");
    expect(styles).toContain(".capabilities-layout .service-card-stack { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))");
    expect(styles).toContain("@media (max-width: 429px) { .capabilities-layout");
  });
});
