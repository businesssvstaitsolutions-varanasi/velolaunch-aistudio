import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const navigation = readFileSync("client/src/components/Navigation.tsx", "utf8");
const booking = readFileSync("client/src/components/BookingModal.tsx", "utf8");
const waitlist = readFileSync("client/src/components/ProductWaitlistForm.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("booking and privacy modal interactions", () => {
  it("opens a simple calendar planning modal from desktop and mobile header controls", () => {
    expect(navigation).toContain("Book a Call");
    expect(navigation).toContain("<BookingModal open={bookingOpen}");
    expect(booking).toContain('type="date"');
    expect(booking).toContain("planning preview");
    expect(booking).toContain("const handleOpenChange");
    expect(booking).toContain("setSelected(false)");
  });

  it("opens a text privacy-policy modal from beneath the waitlist fields", () => {
    expect(waitlist).toContain("Privacy Policy");
    expect(waitlist).toContain("privacy-policy-dialog");
    expect(waitlist).toContain("We do not use this form to create a general mailing list.");
    expect(styles).toContain(".privacy-policy-trigger");
  });
});
