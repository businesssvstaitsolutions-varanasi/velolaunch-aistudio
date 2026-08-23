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

  it("rejects empty and bot-like requests", () => {
    expect(() => consultationInputSchema.parse({ name: "A", email: "not-an-email", scope: "short", website: "filled" })).toThrow();
  });
});
