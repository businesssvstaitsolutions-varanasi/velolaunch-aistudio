import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ServiceCard } from "@/components/ServiceCard";
import { SiteFooter } from "@/components/SiteFooter";
import { services } from "@/content/site";

export default function Services() {
  return <div id="top" className="route-shell"><Navigation /><main className="route-main">
    <section className="route-hero" aria-labelledby="services-title"><p>VeloLaunch / What we build</p><h1 id="services-title">End-to-end<br /><em>tech services.</em></h1><span>We connect product thinking, AI, software, and operating foundations into systems that can move from an idea to a useful release.</span></section>
    <section className="service-matrix" aria-label="VeloLaunch service catalogue">{services.map((service) => <ServiceCard service={service} key={service.slug} />)}</section>
    <section className="route-cta"><p>Not sure where the boundary is?</p><a className="route-cta-link" href="/#contact">Book a consultation <ArrowRight size={16} aria-hidden="true" /></a></section>
  </main><SiteFooter /></div>;
}
