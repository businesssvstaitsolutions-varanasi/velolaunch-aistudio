import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("opening editorial statement", () => {
  it("separates the label rail from the main headline and supporting copy", () => {
    expect(home).toContain('className="editorial-statement-main"');
    expect(home).toContain('className="editorial-statement-summary"');
    expect(styles).toContain(".editorial-statement-aside { display: flex;");
  });

  it("uses balanced desktop and mobile statement compositions", () => {
    expect(styles).toContain(".editorial-statement-main { display: grid;");
    expect(styles).toContain("@media (max-width: 700px)");
  });
});
