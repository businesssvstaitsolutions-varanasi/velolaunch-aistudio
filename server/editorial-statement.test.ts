import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const statement = readFileSync("client/src/components/OpeningStatement.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("opening editorial statement", () => {
  it("separates the label rail from the main headline and supporting copy", () => {
    expect(statement).toContain('className="editorial-statement-main"');
    expect(statement).toContain('className="editorial-statement-summary"');
    expect(styles).toContain(".editorial-statement-aside { display: flex;");
  });

  it("uses balanced desktop and mobile statement compositions", () => {
    expect(styles).toContain(".editorial-statement-main { display: grid;");
    expect(styles).toContain("grid-template-columns: minmax(0, 1fr) minmax(16rem, 29rem)");
    expect(styles).toContain(".editorial-statement-summary { margin-top: 0; }");
    expect(styles).toContain("@media (max-width: 700px)");
  });
});
