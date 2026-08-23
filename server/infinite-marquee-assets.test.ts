import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("client/src/components/InfiniteMarquee.jsx", "utf8");
const styles = readFileSync("client/src/components/Marquee.css", "utf8");

describe("InfiniteMarquee animation contract", () => {
  it("renders two full panels for a seamless five-logo visual loop", () => {
    expect(component).toContain("groupSize = 5");
    expect(component).toContain("groups.length === 2");
    expect(component).toContain("const displayGroups = usesFiveLogoGroups ? groups : [visibleIcons, visibleIcons]");
    expect(component).toContain("aria-hidden={groupIndex > 0 ? \"true\" : undefined}");
  });

  it("uses three-second group holds, full-panel crossfades, and hover pause", () => {
    expect(styles).toContain("animation: infinite-marquee-left-to-right 30s linear infinite");
    expect(styles).toContain("animation: infinite-marquee-five-groups-first 8s linear infinite");
    expect(styles).toContain("animation-name: infinite-marquee-five-groups-second");
    expect(styles).toContain("0%, 37.5% { opacity: 1; }");
    expect(styles).toContain("50%, 87.5% { opacity: 1; }");
    expect(styles).toContain("position: absolute;");
    expect(styles).toContain(".infinite-marquee:hover .infinite-marquee__track");
    expect(styles).toContain(".infinite-marquee:hover .infinite-marquee__group");
    expect(styles).toContain("animation-play-state: paused");
  });
});
