import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ConsultationForm } from "@/components/ConsultationForm";
import { CompanyVideo } from "@/components/CompanyVideo";
import { CallbackPopup } from "@/components/CallbackPopup";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteFooter } from "@/components/SiteFooter";
import { TechnologyMarquee } from "@/components/TechnologyMarquee";
import { ProductWaitlistForm } from "@/components/ProductWaitlistForm";
import { OpeningStatement } from "@/components/OpeningStatement";
import { ForthcomingProductCard } from "@/components/ForthcomingProductCard";
import { forthcomingHomepageProducts, principles, services, siteConfig } from "@/content/site";

export default function Home() {
  return (
    <div id="top" className="editorial-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation />

      <main id="main-content">
        <section className="hero-artwork" aria-labelledby="hero-title">
          <picture className="hero-artwork-picture"><source media="(max-width: 850px), (min-width: 851px) and (max-width: 1024px) and (orientation: portrait)" srcSet={siteConfig.assets.heroArtworkMobile} /><img className="hero-artwork-image" src={siteConfig.assets.heroArtwork} alt="VeloLaunch metallic mark, rocket, and planetary launch artwork." fetchPriority="high" decoding="async" sizes="100vw" /></picture>
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

        <OpeningStatement />
        <section className="opening-proof-strip" aria-label="How VeloLaunch approaches product work">
          <dl><div><dt>Decision-led</dt><dd>Start with operating reality.</dd></div><div><dt>AI-conscious</dt><dd>Keep human judgment in the loop.</dd></div><div><dt>Built to evolve</dt><dd>Design for the next decision.</dd></div></dl>
        </section>
        <section id="work" className="client-proof-section" aria-labelledby="client-proof-title">
          <div className="client-proof-intro"><p className="section-tag">01B — Client proof</p><h2 id="client-proof-title">Client work is shared when permission is clear.</h2></div>
          <div className="client-proof-preview">
            <div className="client-logo-preview" aria-label="Neutral client logo placement preview; no client relationships are represented"><span><strong>Placeholder logo</strong>Logo placement 01<small>Approval required</small></span><span><strong>Placeholder logo</strong>Logo placement 02<small>Approval required</small></span><span><strong>Placeholder logo</strong>Logo placement 03<small>Approval required</small></span><span><strong>Placeholder logo</strong>Logo placement 04<small>Approval required</small></span></div>
            <article className="case-study-preview"><p>Case study layout preview</p><h3>Product decision → delivery</h3><dl><div><dt>Context</dt><dd>Approved client context appears here.</dd></div><div><dt>Workstream</dt><dd>Approved scope and methods appear here.</dd></div><div><dt>Approval required</dt><dd>Publication needs approved evidence and permission.</dd></div></dl><small>Preview only — no client, partnership, or outcome is represented.</small></article>
            <a className="editorial-text-link focus-ring" href="#contact">Discuss your next product decision <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="services" className="editorial-section capabilities-section" aria-labelledby="services-title">
          <header className="section-heading">
            <p className="section-tag">02 — Capabilities</p>
            <h2 id="services-title">The work is connected on purpose.</h2>
          </header>
          <div className="capabilities-layout">
            <div className="capability-list service-card-stack">{services.map((service) => <ServiceCard service={service} key={service.slug} />)}</div>
            <figure className="editorial-inset-image">
              <img src={siteConfig.assets.supportVertical} alt="VeloLaunch product-development artwork showing a luminous portal and product systems." loading="lazy" decoding="async" />
              <figcaption>VeloLaunch / product development field</figcaption>
            </figure>
          </div>
        </section>

        <section id="ecosystem" className="technology-ecosystem" aria-labelledby="ecosystem-title">
          <div className="technology-ecosystem-head"><p className="section-tag">03 — Technology ecosystem</p><p id="ecosystem-title">Examples of the tools we evaluate for product work. Names are shown for context only; they do not imply partnership or endorsement.</p></div>
          <TechnologyMarquee />
        </section>

        <section id="products" className="editorial-section home-products" aria-labelledby="products-title">
          <header className="section-heading"><p className="section-tag">04 — Our products</p><h2 id="products-title">Published when the product is ready to be evaluated.</h2></header>
          <div className="home-product-grid" aria-label="Forthcoming products">
            {forthcomingHomepageProducts.map((product) => <ForthcomingProductCard product={product} key={product.slug} />)}
          </div>
          <ProductWaitlistForm />
          <div className="home-products-panel"><p>VeloLaunch product records, availability, and offer terms are released only when they are approved for the people making the next decision.</p><div><a className="button-ink focus-ring" href="/products">Explore our products <ArrowUpRight size={16} aria-hidden="true" /></a><a className="editorial-text-link focus-ring" href="/offers">View the offer board <ArrowUpRight size={15} aria-hidden="true" /></a></div></div>
        </section>

        <section id="principles" className="editorial-section principles-section" aria-labelledby="principles-title">
          <header className="section-heading">
            <p className="section-tag">05 — Principles</p>
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

        <section className="editorial-art-interlude" aria-label="VeloLaunch product development artwork">
          <figure>
            <img src={siteConfig.assets.supportHorizon} alt="VeloLaunch product-development artwork with a metallic mark traveling through a luminous landscape." loading="lazy" decoding="async" />
            <figcaption>VeloLaunch / From idea to impact</figcaption>
          </figure>
        </section>

        <section id="company" className="company-feature" aria-labelledby="company-title">
          <div className="company-copy">
            <p className="section-tag">06 — Company</p>
            <h2 id="company-title">Less theater. More product.</h2>
            <p>VeloLaunch is an AI-first software development company by {siteConfig.parent}. We partner with leaders who need a considered product direction, a capable system, and a path to durable delivery.</p>
            <a className="editorial-text-link focus-ring" href="#contact">Bring us the hard problem <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
          <CompanyVideo src={siteConfig.assets.companyVideo} />
        </section>

        <section id="contact" className="editorial-contact" aria-labelledby="contact-title">
          <div>
            <p className="section-tag">07 — Start here</p>
            <h2 id="contact-title">A useful next conversation starts with the truth.</h2>
            <p>Tell us what needs to become real. We will use the next conversation to understand the decision, the system, and the work in front of you.</p>
          </div>
          <ConsultationForm />
        </section>
      </main>

      <SiteFooter />
      <CallbackPopup />
    </div>
  );
}
