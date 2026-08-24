import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const navigation = readFileSync("client/src/components/Navigation.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("header phone contact", () => {
  it("adds the supplied number to both desktop and mobile navigation", () => {
    expect(navigation).toContain("+1 9746-2711-143");
    expect(navigation).toContain('href="tel:+19746271143"');
  });

  it("includes the requested product, service, company, work, and build navigation entries", () => {
    expect(navigation).toContain('{ href: "/products", label: "Products" }');
    expect(navigation).toContain('{ href: "/services", label: "Services" }');
    expect(navigation).toContain('{ href: "/why-velolaunch", label: "Why VeloLaunch" }');
    expect(navigation).toContain('{ href: "/#work", label: "Work" }');
    expect(navigation).toContain('{ href: "/about", label: "About" }');
    expect(navigation).toContain("Let’s Build");
  });

  it("keeps the desktop contact compact and prevents primary navigation crowding", () => {
    expect(navigation).toContain('className="desktop-nav"');
    expect(styles).toContain("grid-template-columns: auto minmax(0, 1fr) auto");
    expect(styles).toContain(".desktop-nav { display: flex;");
    expect(styles).toContain(".nav-phone { display: inline-flex;");
    expect(styles).toContain("@media (max-width: 1050px) { .nav-phone, .nav-booking { display: none; } }");
    expect(styles).toContain("@media (max-width: 1250px) { .nav-phone, .nav-booking { display: none; } }");
  });
});
