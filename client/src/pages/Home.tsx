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
        <section className="hero-artwork" aria-labelledby="hero-title">
          <img className="hero-artwork-image" src={siteConfig.assets.heroArtwork} alt="VeloLaunch metallic mark, rocket, and planetary launch artwork." fetchPriority="high" />
          <div className="hero-artwork-copy">
            <p className="hero-artwork-kicker">Product systems / 01</p>
            <h1 id="hero-title">Build for the moment things become <em>real.</em></h1>
            <p>VeloLaunch brings product thinking, AI systems, and software delivery into a single accountable practice.</p>
            <div className="hero-actions">
              <Button asChild className="button-light"><a href="#contact">Start a conversation <ArrowRight size={16} aria-hidden="true" /></a></Button>
              <a className="hero-text-link focus-ring" href="#services">How we work <ArrowRight size={15} aria-hidden="true" /></a>
            </div>
          </div>
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
