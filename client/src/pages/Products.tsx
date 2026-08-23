import { ArrowRight, Box } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { publicProducts } from "@/content/site";

export default function Products() {
  return <div id="top" className="route-shell"><Navigation /><main className="route-main">
    <section className="route-hero products-hero" aria-labelledby="products-title"><p>VeloLaunch / Our products</p><h1 id="products-title">Product systems,<br /><em>released with intent.</em></h1><span>We publish product information only when it is approved, current, and useful to the people evaluating it.</span></section>
    {publicProducts.length ? <section className="product-grid">{publicProducts.map((product) => <a className="catalogue-product focus-ring" href={`/products/${product.slug}`} key={product.slug}><span>{product.category}</span><h2>{product.name}</h2><p>{product.summary}</p><strong>View product <ArrowRight size={15} /></strong></a>)}</section> : <section className="catalogue-empty"><Box size={22} aria-hidden="true" /><p className="section-tag">Controlled product registry</p><h2>No public products are listed today.</h2><p>VeloLaunch product records remain private until their release context, availability, and public information are approved.</p><a href="/offers">View the offer board <ArrowRight size={15} /></a></section>}
  </main><SiteFooter /></div>;
}
