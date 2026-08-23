import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useRoute } from "wouter";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { getPublicProduct } from "@/content/site";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const product = getPublicProduct(params?.slug);
  return <div id="top" className="route-shell"><Navigation /><main className="detail-main product-detail">
    <a className="back-link" href="/products"><ArrowLeft size={15} aria-hidden="true" /> Our products</a>
    {product ? <section className="detail-hero"><p>{product.category}</p><h1>{product.name}</h1><span>{product.summary}</span><a className="detail-primary-link" href="/#contact">Discuss this product <ArrowRight size={16} /></a></section> : <section className="not-published"><LockKeyhole size={24} aria-hidden="true" /><p className="section-tag">Controlled disclosure</p><h1>This product record is not published.</h1><p>Public product pages appear only when the record, availability, and relevant commercial information are approved for release.</p><a href="/#contact">Ask about product availability <ArrowRight size={16} /></a></section>}
  </main><SiteFooter /></div>;
}
