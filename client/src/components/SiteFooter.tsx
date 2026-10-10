import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer-pro" aria-label="Site footer">
      <div className="footer-rail">
        <span>VeloLaunch / Product systems</span>
        <a href="/#contact">Start a conversation <ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
      <div className="footer-content">
        <section className="footer-intro" aria-label="About VeloLaunch">
          <div className="footer-brand-lockup">
            <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
            <div><strong>VeloLaunch</strong><span>A Company by Smart Vista IT Solutions</span></div>
          </div>
          <p>Product thinking, AI systems, and software delivery for work that needs to become real.</p>
          <a className="footer-principles-link" href="/#principles">Our working principles <ArrowUpRight size={13} aria-hidden="true" /></a>
        </section>
        <nav className="footer-links" aria-label="Footer navigation">
          <div className="footer-link-group"><span>Explore</span><a href="/services">Services</a><a href="/products">Our Products</a><a href="/our-apps/apexturbo-landingpage/">Apex Turbo</a><a href="/offers">Offer Board</a></div>
          <div className="footer-link-group"><span>Connect</span><a href="/#company">Company</a><a href="/#contact">Book a consultation</a><a href="mailto:hello@velolaunch.com">hello@velolaunch.com</a></div>
          <div className="footer-link-group"><span>Operations</span><a href="/operations">Staff access</a><a href="/#principles">Principles</a><a href="/#contact">Project enquiry <ArrowUpRight size={12} aria-hidden="true" /></a></div>
        </nav>
      </div>
      <div className="footer-baseline"><span>© {year} VeloLaunch</span><span>Built with Smart Vista IT Solutions</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
