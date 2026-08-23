import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";
import { useRoute } from "wouter";
import { ProductNotificationDialog } from "@/components/ForthcomingProductCard";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { getForthcomingProduct, getPublicProduct } from "@/content/site";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const forthcomingProduct = getForthcomingProduct(params?.slug);
  const publicProduct = getPublicProduct(params?.slug);

  return <div id="top" className="route-shell"><Navigation /><main className="detail-main product-detail"><a className="back-link" href="/products"><ArrowLeft size={15} aria-hidden="true" /> Our products</a>{forthcomingProduct ? <><section className="detail-hero forthcoming-product-detail"><p>{forthcomingProduct.category} / forthcoming product</p><h1>{forthcomingProduct.title}</h1><span>{forthcomingProduct.description}</span><div className="detail-product-actions"><ProductNotificationDialog product={forthcomingProduct} /><a className="detail-secondary-link focus-ring" href="/#contact">Discuss this product <ArrowRight size={16} aria-hidden="true" /></a></div></section><section className="forthcoming-detail-disclosure"><p className="section-tag">Pre-release disclosure</p><h2>Details will expand when they are ready to be evaluated.</h2><p>This is a forthcoming product overview. Availability, detailed features, pricing, and release timing have not been published.</p></section></> : publicProduct ? <section className="detail-hero"><p>{publicProduct.category}</p><h1>{publicProduct.name}</h1><span>{publicProduct.summary}</span><a className="detail-primary-link" href="/#contact">Discuss this product <ArrowRight size={16} /></a></section> : <section className="not-published"><LockKeyhole size={24} aria-hidden="true" /><p className="section-tag">Controlled disclosure</p><h1>This product record is not published.</h1><p>Public product pages appear only when the record, availability, and relevant commercial information are approved for release.</p><a href="/#contact">Ask about product availability <ArrowRight size={16} /></a></section>}</main><SiteFooter /></div>;
}
