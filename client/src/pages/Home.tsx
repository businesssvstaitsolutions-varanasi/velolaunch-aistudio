/**
 * Precision Field design reminder: dark industrial minimalism, an asymmetric information rail, metallic material hierarchy, and Velo Blue only for operating signals.
 */
import { ArrowDown, ArrowRight, ArrowUpRight, Box, Code2, Layers3, Network, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { SectionIntro } from "@/components/SectionIntro";
import { ConsultationForm } from "@/components/ConsultationForm";
import { VeloCoreScene } from "@/components/VeloCoreScene";
import { getVisibleProducts, principles, services, siteConfig } from "@/content/site";

const visibleProducts = getVisibleProducts(siteConfig.launchMode);

const technologyNotes = ["Product strategy", "Experience design", "AI systems", "Software engineering"];

export default function Home() {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation />

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-content">
            <div className="hero-brand-lockup" aria-label="VeloLaunch">
              <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
              <div>
                <span>VeloLaunch</span>
                <i>AI-first product systems</i>
              </div>
            </div>
            <div className="eyebrow hero-eyebrow">
              <span className="eyebrow-line" />
              <span>AI-first product systems</span>
              <span>By {siteConfig.parent}</span>
            </div>

            <h1 id="hero-title">
              Building intelligent <em>products</em> that scale.
            </h1>
            <p className="hero-copy">AI-native product systems for teams that need the reasoning—and the software—to hold under real operating conditions.</p>

            <div className="hero-actions">
              <Button asChild className="button-metal">
                <a href="#products">
                  Explore products <ArrowRight size={16} aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" className="button-secondary">
                <a href="#contact">Book a discovery call</a>
              </Button>
            </div>

            <div className="hero-status" aria-label="VeloLaunch launch status">
              <span className="status-pulse" aria-hidden="true" />
              <span>Operating mode</span>
              <strong>{siteConfig.launchMode}</strong>
            </div>

            <div className="hero-signal-panel" aria-label="VeloLaunch operating sequence">
              <div className="hero-signal-heading"><span className="section-index-dot" /><span>Operating sequence</span></div>
              <div className="hero-signal-items">
                <div><span>01</span><strong>Frame</strong><small>the product</small></div>
                <div><span>02</span><strong>Design</strong><small>the system</small></div>
                <div><span>03</span><strong>Engineer</strong><small>the intelligence</small></div>
                <div><span>04</span><strong>Deliver</strong><small>the surface</small></div>
              </div>
            </div>
          </div>

          <div className="hero-art" aria-label="Precision-machined VeloLaunch core visual">
            <VeloCoreScene
              src={siteConfig.assets.heroCore}
              alt="A precision-machined V-shaped core made from brushed aluminum and graphite."
            />
            <div className="hero-art-signal" aria-hidden="true"><span>VL / vector field</span><span>01—04</span></div>
            <div className="hero-art-caption" aria-hidden="true">
              <span>VL—CORE / 01</span>
              <span>Aligned for momentum</span>
            </div>
          </div>

          <a className="hero-scroll focus-ring" href="#overview">
            <span>Scroll to enter</span>
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </section>

        <section id="overview" className="overview-strip" aria-label="VeloLaunch overview">
          <p>
            VeloLaunch brings product thinking, AI systems, and software engineering into a single delivery surface.
          </p>
          <div className="overview-notes">
            {technologyNotes.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        </section>

        <section id="products" className="section section-products" aria-labelledby="products-title">
          <SectionIntro
            eyebrow="01 / Product ecosystem"
            titleId="products-title"
            title="A portfolio built with intentional disclosure."
            copy="We are establishing the system before publishing the catalog. Product visibility is governed by launch state, not by a hard-coded layout."
          />

          <div className="products-bento">
            <ProductCard
              className="product-card-featured"
              label="Ecosystem / in formation"
              title="The work is bigger than a feature list."
              copy="We build the product surfaces, systems, and operating logic that let teams turn real signals into useful software."
              visual={<><img src={siteConfig.assets.constellation} alt="" /><div className="asset-annotation"><span>Core topology</span><span>05 / nodes</span></div></>}
            />
            <ProductCard
              className="product-card-disclosure"
              label="Disclosure / controlled"
              title="Visibility is a product decision."
              copy="Unreleased systems stay out of public metadata, search surfaces, and page source until they are ready to be named."
              visual={
                <div className="disclosure-visual">
                  <span className="disclosure-ring" />
                  <span className="disclosure-block disclosure-block-one" />
                  <span className="disclosure-block disclosure-block-two" />
                </div>
              }
            />
            <ProductCard
              className="product-card-signal"
              label="Launch signal / measured"
              title="Built for the next release, not a one-time reveal."
              copy="The portfolio framework is ready to move from prelaunch to selected products or a full public catalog without redesign."
              visual={
                <div className="signal-visual">
                  <span className="signal-line signal-line-one" />
                  <span className="signal-line signal-line-two" />
                  <span className="signal-node signal-node-one" />
                  <span className="signal-node signal-node-two" />
                  <span className="signal-node signal-node-three" />
                </div>
              }
            />
            <div className="visibility-console" aria-label="Product visibility status">
              <div className="console-topline">
                <ScanLine size={15} aria-hidden="true" />
                <span>Portfolio console</span>
              </div>
              <div className="console-row"><span>Public records</span><strong>{visibleProducts.length.toString().padStart(2, "0")}</strong></div>
              <div className="console-row"><span>Launch state</span><strong>{siteConfig.launchMode}</strong></div>
              <p>Public product information will appear here when approved for release.</p>
            </div>
          </div>
        </section>

        <section id="services" className="section section-services" aria-labelledby="services-title">
          <SectionIntro
            eyebrow="02 / Capabilities"
            titleId="services-title"
            title="Engineering that stays close to the product."
            copy="The work connects strategy, design, models, and software delivery so the important decisions do not get lost between disciplines."
          />

          <div className="services-layout">
            <div className="services-stack-image">
              <img src={siteConfig.assets.intelligentStack} alt="A layered metallic sculpture representing an intelligent engineering stack." loading="lazy" />
              <div className="asset-annotation stack-annotation" aria-hidden="true"><span>VL / engineering stack</span><span>06 / layers</span></div>
              <div className="stack-legend" aria-hidden="true">
                <span>Research</span><span>Design</span><span>Models</span><span>Agents</span><span>Software</span><span>Scale</span>
              </div>
            </div>
            <div className="services-list">
              {services.map((service, index) => {
                const Icon = [Layers3, Network, Code2][index];
                return (
                  <article className="service-item" key={service.code}>
                    <div className="service-code"><span>{service.code}</span><Icon size={19} aria-hidden="true" /></div>
                    <div><h3>{service.title}</h3><p>{service.description}</p></div>
                    <ArrowUpRight className="service-arrow" size={18} aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="principles" className="section section-principles" aria-labelledby="principles-title">
          <SectionIntro
            eyebrow="03 / Engineering principles"
            titleId="principles-title"
            title="Technical depth is felt in the decisions that hold."
          />
          <div className="principles-list">
            {principles.map((principle) => (
              <article className="principle-item" key={principle.index}>
                <span className="principle-index">{principle.index}</span>
                <h3>{principle.name}</h3>
                <p>{principle.copy}</p>
                <span className="principle-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section id="company" className="section company-section" aria-labelledby="company-title">
          <div className="company-image-wrap">
            <img src={siteConfig.assets.launchTable} alt="A dark engineering workstation with precision-made product artifacts." loading="lazy" />
            <div className="asset-annotation company-annotation" aria-hidden="true"><span>Material study / 04</span><span>Product before proof</span></div>
          </div>
          <div className="company-panel">
            <div className="section-index"><span className="section-index-dot" /><span>04 / Company</span></div>
            <h2 id="company-title">Make the hard thing feel inevitable.</h2>
            <p>
              VeloLaunch is an AI-first software development company by Smart Vista IT Solutions. We partner with leaders who need more than a plausible demo: a product direction, a considered system, and a path to durable delivery.
            </p>
            <a className="text-link focus-ring" href="#contact">How we engage <ArrowRight size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="contact-grid-overlay" aria-hidden="true" />
          <div className="contact-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> <span>Start with the important question</span></div>
            <h2 id="contact-title">Bring the hard problem into focus.</h2>
            <p>Tell us what needs to become real. We will use the next conversation to understand the product, the decision horizon, and the engineering work in front of you.</p>
          </div>
          <div className="contact-action">
            <span className="contact-availability"><span className="status-pulse" aria-hidden="true" /> Discovery conversations</span>
            <ConsultationForm />
            <span className="contact-note">hello@velolaunch.com</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-mark focus-ring" href="#top"><Box size={16} aria-hidden="true" /> VeloLaunch</a>
        <span>AI-first software development by Smart Vista IT Solutions.</span>
        <a className="footer-access focus-ring" href="/operations">Staff access</a>
        <span>© {new Date().getFullYear()} VeloLaunch</span>
      </footer>
    </div>
  );
}
