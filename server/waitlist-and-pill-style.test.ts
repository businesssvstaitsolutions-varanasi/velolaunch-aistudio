import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const home = readFileSync("client/src/pages/Home.tsx", "utf8");
const form = readFileSync("client/src/components/ProductWaitlistForm.tsx", "utf8");
const detail = readFileSync("client/src/pages/ServiceDetail.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");
const schema = readFileSync("drizzle/schema.ts", "utf8");

describe("forthcoming product waitlist and capability-pill consistency", () => {
  it("adds the waitlist to the homepage products section", () => {
    expect(home).toContain("<ProductWaitlistForm />");
    expect(form).toContain("trpc.waitlist.create.useMutation");
    expect(form).toContain("Join the waitlist");
    expect(form).toContain("We will never spam you.");
    expect(form).toContain("Thank you for your interest.");
    expect(form).toContain('className="waitlist-thank-you"');
  });

  it("centers and adds hover feedback to homepage and detail capability pills", () => {
    expect(detail).toContain('className="detail-tags"');
    expect(styles).toContain(".detail-tags { justify-content: center; }");
    expect(styles).toContain(".service-card-tags span:hover, .detail-tags span:hover");
  });

  it("keeps separate interest records for each email-and-product combination", () => {
    expect(schema).toContain('unique("productWaitlist_email_productName_unique").on(table.email, table.productName)');
  });
});
