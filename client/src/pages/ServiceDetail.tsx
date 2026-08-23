import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRoute } from "wouter";
import { ConsultationForm } from "@/components/ConsultationForm";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { getService } from "@/content/site";

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const service = getService(params?.slug);
  if (!service) return <div className="route-shell"><Navigation /><main className="not-published"><h1>Service not found.</h1><a href="/services">Return to services <ArrowRight size={16} /></a></main><SiteFooter /></div>;
  return <div id="top" className="route-shell"><Navigation /><main className="detail-main">
    <a className="back-link" href="/services"><ArrowLeft size={15} aria-hidden="true" /> All services</a>
    <section className="detail-hero"><p>Service / {service.code}</p><h1>{service.title}</h1><span>{service.description}</span><div className="detail-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></section>
    <section className="detail-grid"><div><p className="section-tag">What this creates</p><h2>Enough clarity to make the next product decision useful.</h2><ul className="detail-list">{service.deliverables.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></div><div className="detail-process"><p className="section-tag">Working rhythm</p>{service.process.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}</div></section>
    <section id="contact" className="detail-contact"><div><p className="section-tag">Start with the context</p><h2>Bring the hard product question.</h2><p>Tell us what needs attention. We will prepare for the discussion with the relevant product and technical context in mind.</p></div><ConsultationForm /></section>
  </main><SiteFooter /></div>;
}
