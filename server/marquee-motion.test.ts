import { describe, expect, it } from "vitest";
import { advanceMarqueeOffset } from "../client/src/lib/marqueeMotion";

describe("advanceMarqueeOffset", () => {
  it("moves a marquee continuously from right to left", () => {
    expect(advanceMarqueeOffset(0, 500, 920, 240)).toBe(-120);
    expect(advanceMarqueeOffset(-120, 500, 920, 240)).toBe(-240);
  });

  it("wraps the track at the duplicated-set boundary without stopping", () => {
    expect(advanceMarqueeOffset(-900, 500, 920, 240)).toBe(-100);
  });

  it("keeps moving leftward for a narrow mobile-sized cycle", () => {
    expect(advanceMarqueeOffset(0, 500, 343, 240)).toBe(-120);
    expect(advanceMarqueeOffset(-320, 500, 343, 240)).toBe(-97);
  });

  it("does not advance when the cycle width is unavailable", () => {
    expect(advanceMarqueeOffset(-20, 500, 0, 92)).toBe(0);
  });
});
