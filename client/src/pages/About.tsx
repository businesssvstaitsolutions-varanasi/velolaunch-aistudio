import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { siteConfig } from "@/content/site";

const practice = [
  ["Decision-led", "Start with operating reality."],
  ["AI-conscious", "Keep human judgment in the loop."],
  ["Built to evolve", "Design for the next decision."],
] as const;

export default function About() {
  return <div id="top" className="route-shell"><Navigation /><main className="route-main company-page-main"><section className="route-hero company-route-hero" aria-labelledby="about-title"><p>VeloLaunch / About</p><h1 id="about-title">Less theater.<br /><em>More product.</em></h1><span>VeloLaunch is an AI-first software development company by {siteConfig.parent}. We partner with leaders who need a considered product direction, a capable system, and a path to durable delivery.</span></section><section className="company-page-intro company-about-intro" aria-labelledby="about-intro-title"><p className="section-tag">Company perspective</p><div><h2 id="about-intro-title">A focused practice for work that needs to become real.</h2><p>We work across product thinking, AI systems, and software delivery, connecting the decisions that shape a product with the system needed to make it dependable.</p></div></section><section className="company-practice" aria-labelledby="practice-title"><p className="section-tag">Our working posture</p><h2 id="practice-title">Made to support the next useful decision.</h2><div>{practice.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></section><section className="company-page-cta"><p className="section-tag">Next conversation</p><h2>Tell us what needs to become real.</h2><a className="detail-primary-link focus-ring" href="/#contact">Let’s Build <ArrowRight size={16} aria-hidden="true" /></a></section></main><SiteFooter /></div>;
}
