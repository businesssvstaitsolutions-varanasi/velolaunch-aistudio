import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ConsultationForm } from "@/components/ConsultationForm";
import { principles, services, siteConfig } from "@/content/site";

export default function Home() {
  return (
    <div id="top" className="editorial-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />

      <main id="main-content">
        <section className="editorial-hero" aria-labelledby="hero-title">
          <div className="hero-copy-block">
            <div className="hero-brand-stamp" aria-label="VeloLaunch">
              <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
              <span>VeloLaunch</span>
            </div>
            <p className="editorial-kicker">VeloLaunch / AI-first product systems</p>
            <h1 id="hero-title">Make the product<br /><em>make sense.</em></h1>
            <p className="hero-lede">We shape the product, intelligence, and software behind the next important thing your business needs to become.</p>
            <div className="hero-actions">
              <Button asChild className="button-ink"><a href="#contact">Start a conversation <ArrowRight size={16} aria-hidden="true" /></a></Button>
              <a className="editorial-text-link focus-ring" href="#services">How we work <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </div>

          <figure className="hero-editorial-image">
            <img src={siteConfig.assets.heroCore} alt="A precision-machined V-shaped core made from brushed aluminum and graphite." fetchPriority="high" />
            <figcaption>Product systems, built from the inside out.</figcaption>
          </figure>
        </section>

        <section className="editorial-statement" aria-labelledby="statement-title">
          <p className="section-tag">01 — VeloLaunch</p>
          <h2 id="statement-title">A product company for decisions that cannot stay hypothetical.</h2>
          <p>VeloLaunch brings product thinking, AI systems, and software engineering into a single accountable delivery practice.</p>
        </section>

        <section id="services" className="editorial-section capabilities-section" aria-labelledby="services-title">
          <header className="section-heading">
            <p className="section-tag">02 — Capabilities</p>
            <h2 id="services-title">The work is connected on purpose.</h2>
          </header>
          <div className="capabilities-layout">
            <div className="capability-list">
              {services.map((service) => (
                <article className="capability-row" key={service.code}>
                  <span>{service.code}</span>
                  <div><h3>{service.title}</h3><p>{service.description}</p></div>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </article>
              ))}
            </div>
            <figure className="editorial-inset-image">
              <img src={siteConfig.assets.intelligentStack} alt="A layered metallic sculpture representing an intelligent engineering stack." loading="lazy" />
              <figcaption>Strategy, design, models, systems.</figcaption>
            </figure>
          </div>
        </section>

        <section id="principles" className="editorial-section principles-section" aria-labelledby="principles-title">
          <header className="section-heading">
            <p className="section-tag">03 — Principles</p>
            <h2 id="principles-title">Clarity is a technical decision.</h2>
          </header>
          <div className="principles-grid">
            {principles.map((principle) => (
              <article key={principle.index}>
                <span>{principle.index}</span>
                <h3>{principle.name}</h3>
                <p>{principle.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="company" className="editorial-company" aria-labelledby="company-title">
          <figure className="company-image"><img src={siteConfig.assets.launchTable} alt="A dark engineering workstation with precision-made product artifacts." loading="lazy" /><figcaption>VL / Product material study</figcaption></figure>
          <div className="company-copy">
            <p className="section-tag">04 — Company</p>
            <h2 id="company-title">Less theater. More product.</h2>
            <p>VeloLaunch is an AI-first software development company by {siteConfig.parent}. We partner with leaders who need a considered product direction, a capable system, and a path to durable delivery.</p>
            <a className="editorial-text-link focus-ring" href="#contact">Bring us the hard problem <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="contact" className="editorial-contact" aria-labelledby="contact-title">
          <div>
            <p className="section-tag">05 — Start here</p>
            <h2 id="contact-title">A useful next conversation starts with the truth.</h2>
            <p>Tell us what needs to become real. We will use the next conversation to understand the decision, the system, and the work in front of you.</p>
          </div>
          <ConsultationForm />
        </section>
      </main>

      <footer className="editorial-footer">
        <span>VeloLaunch — {siteConfig.parent}</span>
        <a className="focus-ring" href="/operations">Staff access</a>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
