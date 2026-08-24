import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const app = readFileSync("client/src/App.tsx", "utf8");
const navigation = readFileSync("client/src/components/Navigation.tsx", "utf8");
const hashScroll = readFileSync("client/src/components/SmoothHashScroll.tsx", "utf8");
const whyPage = readFileSync("client/src/pages/WhyVeloLaunch.tsx", "utf8");
const aboutPage = readFileSync("client/src/pages/About.tsx", "utf8");
const styles = readFileSync("client/src/index.css", "utf8");

describe("dedicated company pages and in-page navigation", () => {
  it("registers dedicated Why VeloLaunch and About routes and links to them from the header", () => {
    expect(app).toContain('path="/why-velolaunch"');
    expect(app).toContain('path="/about"');
    expect(navigation).toContain('{ href: "/why-velolaunch", label: "Why VeloLaunch" }');
    expect(navigation).toContain('{ href: "/about", label: "About" }');
  });

  it("uses approved company and principle material without invented client claims", () => {
    expect(whyPage).toContain("Working principles");
    expect(whyPage).toContain("single accountable delivery practice");
    expect(aboutPage).toContain("siteConfig.parent");
    expect(aboutPage).toContain("Less theater.");
  });

  it("smoothly scrolls hash targets with sticky-header and reduced-motion support", () => {
    expect(hashScroll).toContain("prefers-reduced-motion: reduce");
    expect(hashScroll).toContain("target.scrollIntoView");
    expect(hashScroll).toContain("hashchange");
    expect(styles).toContain("html { scroll-behavior: smooth; }");
    expect(styles).toContain("#work, #principles, #company, #contact { scroll-margin-top: 5.4rem; }");
  });
});
