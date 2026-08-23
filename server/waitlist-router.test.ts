import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  joinProductWaitlist: vi.fn(),
}));

vi.mock("./db", () => ({
  createConsultation: vi.fn(),
  joinProductWaitlist: mocks.joinProductWaitlist,
  listConsultations: vi.fn(),
  listPublicProductOffers: vi.fn(),
  updateConsultationStatus: vi.fn(),
}));

import { appRouter } from "./routers";

describe("product waitlist mutation", () => {
  it("accepts a valid interest record without requiring a live database insert", async () => {
    const caller = appRouter.createCaller({} as never);
    const result = await caller.waitlist.create({
      email: "interest@example.com",
      productName: "PlutoLearn AI - Powered EdTech Platform",
      website: "",
    });

    expect(result).toEqual({ accepted: true });
    expect(mocks.joinProductWaitlist).toHaveBeenCalledWith({
      email: "interest@example.com",
      productName: "PlutoLearn AI - Powered EdTech Platform",
    });
  });
});
