import { ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { forthcomingHomepageProducts, publicProducts } from "@/content/site";

export default function Products() {
  return <div id="top" className="route-shell"><Navigation /><main className="route-main">
    <section className="route-hero products-hero" aria-labelledby="products-title"><p>VeloLaunch / Our products</p><h1 id="products-title">Product systems,<br /><em>released with intent.</em></h1><span>We publish product information only when it is approved, current, and useful to the people evaluating it.</span></section>
    <section className="products-forthcoming" aria-labelledby="forthcoming-products-title"><header><p className="section-tag">Forthcoming products</p><h2 id="forthcoming-products-title">Prepared for a closer look.</h2></header><div className="home-product-grid products-forthcoming-grid" aria-label="Forthcoming products">{forthcomingHomepageProducts.map((product) => <article className="forthcoming-product-card" key={product.title}><div className="forthcoming-product-card-head"><span>VeloLaunch product</span><strong>Releasing Soon</strong></div><div><h3>{product.title}</h3><p>{product.description}</p></div></article>)}</div></section>
    {publicProducts.length ? <section className="product-grid products-public-grid">{publicProducts.map((product) => <a className="catalogue-product focus-ring" href={`/products/${product.slug}`} key={product.slug}><span>{product.category}</span><h2>{product.name}</h2><p>{product.summary}</p><strong>View product <ArrowRight size={15} /></strong></a>)}</section> : <p className="products-release-note">Detailed product records, availability, and offer terms are shared only when their public release context is approved.</p>}
  </main><SiteFooter /></div>;
}
