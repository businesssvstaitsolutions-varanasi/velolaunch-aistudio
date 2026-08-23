import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const footer = readFileSync("client/src/components/SiteFooter.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("professional footer composition", () => {
  it("preserves approved navigation while adding a focused footer rail and brand closing section", () => {
    expect(footer).toContain('className="footer-rail"');
    expect(footer).toContain('className="footer-brand-lockup"');
    expect(footer).toContain('aria-label="Footer navigation"');
    expect(footer).toContain("hello@velolaunch.com");
  });

  it("uses a responsive closing layout with accessible text links", () => {
    expect(styles).toContain(".footer-content { display: grid;");
    expect(styles).toContain(".footer-link-group a:hover");
    expect(styles).toContain("@media (max-width: 760px)");
  });
});
