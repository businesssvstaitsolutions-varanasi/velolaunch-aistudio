import { describe, expect, it } from "vitest";
import { consultationInputSchema } from "./routers";

describe("consultation input validation", () => {
  it("accepts concise, complete discovery context", () => {
    expect(consultationInputSchema.parse({
      name: "Avery Chen",
      email: "avery@example.com",
      scope: "We need to align an AI product prototype with a durable delivery path.",
      website: "",
    }).email).toBe("avery@example.com");
  });

  it("accepts a valid callback number and attributes popup-origin leads", () => {
    expect(consultationInputSchema.parse({
      name: "Avery Chen",
      email: "avery@example.com",
      phone: "+1 415 555 0123",
      scope: "Please call me back to discuss an intelligent product launch.",
      source: "callback-popup",
      website: "",
    })).toMatchObject({ phone: "+1 415 555 0123", source: "callback-popup" });
  });

  it("rejects empty and bot-like requests", () => {
    expect(() => consultationInputSchema.parse({ name: "A", email: "not-an-email", scope: "short", website: "filled" })).toThrow();
  });

  it("rejects malformed callback numbers", () => {
    expect(() => consultationInputSchema.parse({ name: "Avery Chen", email: "avery@example.com", phone: "call me", scope: "Please call me back to discuss an intelligent product launch." })).toThrow();
  });
});
