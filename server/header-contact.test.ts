import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const navigation = readFileSync("client/src/components/Navigation.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("header phone contact", () => {
  it("adds the supplied number to both desktop and mobile navigation", () => {
    expect(navigation).toContain("+1 9746-2711-143");
    expect(navigation).toContain('href="tel:+19746271143"');
  });

  it("keeps the desktop contact compact and prevents primary navigation crowding", () => {
    expect(styles).toContain(".nav-phone { display: inline-flex;");
    expect(styles).toContain("@media (max-width: 1050px) { .nav-phone { display: none; } }");
  });
});
