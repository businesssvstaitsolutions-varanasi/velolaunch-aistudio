import { ArrowRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { ForthcomingProductCard } from "@/components/ForthcomingProductCard";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { forthcomingProducts, publicProducts } from "@/content/site";

const categories = ["All", ...Array.from(new Set(forthcomingProducts.map((product) => product.category)))];

export default function Products() {
  const [category, setCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return forthcomingProducts.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const searchableText = `${product.title} ${product.category} ${product.description}`.toLocaleLowerCase();
      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [category, searchQuery]);

  return <div id="top" className="route-shell"><Navigation /><main className="route-main">
    <section className="route-hero products-hero" aria-labelledby="products-title"><p>VeloLaunch / Our products</p><h1 id="products-title">Product systems,<br /><em>released with intent.</em></h1><span>We publish product information only when it is approved, current, and useful to the people evaluating it.</span></section>
    <section className="products-forthcoming" aria-labelledby="forthcoming-products-title"><header><div><p className="section-tag">Forthcoming products</p><h2 id="forthcoming-products-title">Prepared for a closer look.</h2></div><div className="product-discovery-controls"><div className="product-search"><Search size={15} aria-hidden="true" /><label htmlFor="product-search"><span>Search products</span><input id="product-search" type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search by product or category" autoComplete="off" /></label>{searchQuery ? <button className="product-search-clear focus-ring" type="button" onClick={() => setSearchQuery("")} aria-label="Clear product search"><X size={14} aria-hidden="true" /></button> : null}</div><div className="product-filter-bar" aria-label="Filter forthcoming products by category">{categories.map((option) => <button type="button" className="focus-ring" aria-pressed={category === option} onClick={() => setCategory(option)} key={option}>{option}</button>)}</div></div></header>{visibleProducts.length ? <div id="forthcoming-products-grid" className="home-product-grid products-forthcoming-grid" aria-live="polite" aria-label="Forthcoming products">{visibleProducts.map((product) => <ForthcomingProductCard product={product} key={product.slug} />)}</div> : <div className="products-no-results" id="forthcoming-products-grid" role="status" aria-live="polite"><p>No forthcoming products match “{searchQuery.trim()}”.</p><button type="button" className="focus-ring" onClick={() => setSearchQuery("")}>Clear search</button></div>}</section>
    {publicProducts.length ? <section className="product-grid products-public-grid">{publicProducts.map((product) => <a className="catalogue-product focus-ring" href={`/products/${product.slug}`} key={product.slug}><span>{product.category}</span><h2>{product.name}</h2><p>{product.summary}</p><strong>View product <ArrowRight size={15} /></strong></a>)}</section> : <p className="products-release-note">Detailed product records, availability, and offer terms are shared only when their public release context is approved.</p>}
  </main><SiteFooter /></div>;
}
