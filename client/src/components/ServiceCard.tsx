import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/content/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <a className="service-card focus-ring" href={`/services/${service.slug}`}>
      <div className="service-card-top"><span>{service.code}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>
      <div className="service-card-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </a>
  );
}
