import { describe, expect, it } from "vitest";
import { siteConfig } from "../client/src/content/site";

describe("company video asset", () => {
  it("uses the managed supplied video asset", () => {
    expect(siteConfig.assets.companyVideo).toMatch(/^\/manus-storage\/.*\.mp4$/);
  });
});
