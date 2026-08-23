import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("client/src/index.css", "utf8");

describe("homepage heading continuity", () => {
  it("keeps key statement and section headings on a single line at wide desktop widths", () => {
    expect(styles).toContain("@media (min-width: 1100px)");
    expect(styles).toContain(".editorial-statement h2, .editorial-section .section-heading h2 { max-width: none;");
    expect(styles).toContain("white-space: nowrap;");
  });
});
