import { describe, expect, it } from "vitest";
import { getPublicProduct, getService, publicOffers, publicProducts, services } from "../client/src/content/site";

describe("VeloLaunch public catalogue", () => {
  it("keeps service detail records addressable by slug", () => {
    expect(getService("ai-powered-development")?.title).toBe("AI-Powered Development");
    expect(services).toHaveLength(4);
  });

  it("does not expose unapproved products or fabricated offer listings", () => {
    expect(publicProducts).toHaveLength(0);
    expect(publicOffers).toHaveLength(0);
    expect(getPublicProduct("private-system-01")).toBeUndefined();
  });
});
