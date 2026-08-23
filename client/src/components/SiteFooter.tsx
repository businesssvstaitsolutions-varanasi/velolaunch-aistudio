import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer-pro" aria-label="Site footer">
      <div className="footer-intro">
        <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
        <div><strong>VeloLaunch</strong><span>A Company by Smart Vista IT Solutions</span></div>
        <p>Product thinking, AI systems, and software delivery for work that needs to become real.</p>
      </div>
      <div className="footer-links">
        <div><span>Explore</span><a href="/services">Services</a><a href="/products">Our Products</a><a href="/offers">Offer Board</a></div>
        <div><span>Connect</span><a href="/#company">Company</a><a href="/#contact">Book a consultation</a><a href="mailto:hello@velolaunch.com">hello@velolaunch.com</a></div>
        <div><span>Operations</span><a href="/operations">Staff access</a><a href="/#principles">Principles</a><a href="/#contact">Project enquiry <ArrowUpRight size={12} aria-hidden="true" /></a></div>
      </div>
      <div className="footer-baseline"><span>© {year} VeloLaunch</span><span>Built with Smart Vista IT Solutions</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
