import { describe, expect, it } from "vitest";
import { shouldOpenForExitIntent, shouldStartMobileCallbackTimer } from "../client/src/lib/callbackPopup";

describe("callback popup triggers", () => {
  it("opens only for an unhandled desktop top-edge exit intent", () => {
    expect(shouldOpenForExitIntent({ clientY: 0, isDesktop: true, hasHandled: false })).toBe(true);
    expect(shouldOpenForExitIntent({ clientY: 24, isDesktop: true, hasHandled: false })).toBe(false);
    expect(shouldOpenForExitIntent({ clientY: 0, isDesktop: false, hasHandled: false })).toBe(false);
    expect(shouldOpenForExitIntent({ clientY: 0, isDesktop: true, hasHandled: true })).toBe(false);
  });

  it("starts the mobile timer only after a meaningful scroll in an unhandled session", () => {
    expect(shouldStartMobileCallbackTimer({ isMobile: true, scrollY: 160, hasHandled: false })).toBe(true);
    expect(shouldStartMobileCallbackTimer({ isMobile: true, scrollY: 159, hasHandled: false })).toBe(false);
    expect(shouldStartMobileCallbackTimer({ isMobile: false, scrollY: 300, hasHandled: false })).toBe(false);
    expect(shouldStartMobileCallbackTimer({ isMobile: true, scrollY: 300, hasHandled: true })).toBe(false);
  });
});
