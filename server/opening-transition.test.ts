import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const statement = readFileSync("client/src/components/OpeningStatement.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("opening statement transition", () => {
  it("uses an intersection observer with a reduced-motion fallback", () => {
    expect(statement).toContain("IntersectionObserver");
    expect(statement).toContain("prefers-reduced-motion: reduce");
    expect(statement).toContain('data-reveal={revealed ? "visible" : "pending"}');
  });

  it("adds a compact positioning-based proof strip without invented metrics", () => {
    expect(home).toContain('className="opening-proof-strip"');
    expect(home).toContain("Decision-led");
    expect(home).toContain("AI-conscious");
    expect(home).toContain("Built to evolve");
    expect(styles).toContain(".opening-proof-strip dl { display: grid;");
  });

  it("keeps client proof approval-gated until verified material is supplied", () => {
    expect(home).toContain('className="client-proof-section"');
    expect(home).toContain('className="client-logo-preview"');
    expect(home).toContain("Placeholder logo");
    expect(home).toContain("Approval required");
    expect(home).toContain("Preview only — no client, partnership, or outcome is represented.");
    expect(home).not.toContain("Trusted by");
  });

  it("adds restrained hover feedback to the four Work-section placeholder cards", () => {
    expect(styles).toContain(".client-logo-preview span { transition: transform 220ms");
    expect(styles).toContain("@media (hover: hover) and (prefers-reduced-motion: no-preference)");
    expect(styles).toContain(".client-logo-preview span:hover");
  });
});
