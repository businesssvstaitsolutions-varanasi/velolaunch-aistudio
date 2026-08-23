import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("client/src/components/InfiniteMarquee.jsx", "utf8");
const styles = readFileSync("client/src/components/Marquee.css", "utf8");

describe("InfiniteMarquee animation contract", () => {
  it("renders repeated groups for a seamless five-logo visual loop", () => {
    expect(component).toContain("groupSize = 5");
    expect(component).toContain("groups.length === 2");
    expect(component).toContain("[groups[0], groups[1], groups[0]]");
    expect(component).toContain("aria-hidden={groupIndex > 0 ? \"true\" : undefined}");
  });

  it("uses five-second group holds, left-to-right transitions, and hover pause", () => {
    expect(styles).toContain("animation: infinite-marquee-left-to-right 30s linear infinite");
    expect(styles).toContain("animation: infinite-marquee-five-groups 12s linear infinite");
    expect(styles).toContain("0%, 41.666% { transform: translateX(-66.666667%); }");
    expect(styles).toContain("50%, 91.666% { transform: translateX(-33.333333%); }");
    expect(styles).toContain(".infinite-marquee:hover .infinite-marquee__track");
    expect(styles).toContain("animation-play-state: paused");
  });
});
