import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("client/src/index.css", "utf8");

describe("service-card capability tag alignment", () => {
  it("centers wrapped tag groups inside each service card", () => {
    expect(styles).toContain(".service-card-tags { justify-content: center; }");
  });
});
