import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("client/src/components/InfiniteMarquee.jsx", "utf8");
const styles = readFileSync("client/src/components/Marquee.css", "utf8");

describe("InfiniteMarquee static layout contract", () => {
  it("renders the provided logo array once in a shared static grid", () => {
    expect(component).toContain("const visibleIcons = icons.length > 0 ? icons : placeholderLogos");
    expect(component).toContain("<div className=\"infinite-marquee__grid\">");
    expect(component).toContain("visibleIcons.map(icon => (");
    expect(component).not.toContain("displayGroups");
  });

  it("uses a responsive ten-logo grid with no animation or motion controls", () => {
    expect(styles).toContain("grid-template-columns: repeat(10, minmax(0, 1fr))");
    expect(styles).toContain("grid-template-columns: repeat(5, minmax(0, 1fr))");
    expect(styles).not.toContain("@keyframes");
    expect(styles).not.toContain("animation:");
    expect(styles).not.toContain("animation-play-state");
  });
});
