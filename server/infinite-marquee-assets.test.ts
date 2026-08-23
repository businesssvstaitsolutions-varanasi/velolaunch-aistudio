import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const component = readFileSync("client/src/components/InfiniteMarquee.jsx", "utf8");
const styles = readFileSync("client/src/components/Marquee.css", "utf8");

describe("InfiniteMarquee animation contract", () => {
  it("renders the logo array twice for a seamless visual loop", () => {
    expect(component).toContain("[0, 1].map");
    expect(component).toContain("aria-hidden={copyIndex === 1 ? \"true\" : undefined}");
  });

  it("uses a 30-second CSS-only left-to-right loop and pauses on hover", () => {
    expect(styles).toContain("animation: infinite-marquee-left-to-right 30s linear infinite");
    expect(styles).toContain("from { transform: translateX(-50%); }");
    expect(styles).toContain("to { transform: translateX(0%); }");
    expect(styles).toContain(".infinite-marquee:hover .infinite-marquee__track");
    expect(styles).toContain("animation-play-state: paused");
  });
});
