import { ArrowRight, ShieldCheck } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { trpc } from "@/lib/trpc";

export default function Offers() {
  const offers = trpc.offers.listPublic.useQuery();
  return <div id="top" className="route-shell"><Navigation /><main className="route-main offers-main">
    <section className="route-hero" aria-labelledby="offers-title"><p>VeloLaunch / Offer board</p><h1 id="offers-title">Clear terms.<br /><em>Visible offers.</em></h1><span>When a VeloLaunch product opportunity is available, this board shows the approved asking price, eligible bid information, and current listing status.</span></section>
    {offers.isLoading ? <section className="catalogue-empty offer-empty"><p className="section-tag">Loading availability</p><h2>Checking public offers.</h2></section> : null}
    {offers.data?.length ? <div className="offer-table" role="region" aria-label="Product offer listings"><div className="offer-table-head"><span>Product</span><span>Ask</span><span>Leading bid</span><span>Bid count</span><span>Status</span></div>{offers.data.map((offer) => <div className="offer-table-row" key={offer.productSlug}><span>{offer.productName}</span><span>{offer.askingPrice} {offer.currency}</span><span>{offer.leadingBid ?? "No public bid"}</span><span>{offer.bidCount}</span><span>{offer.status}</span></div>)}</div> : null}
    {!offers.isLoading && !offers.data?.length ? <section className="catalogue-empty offer-empty"><ShieldCheck size={24} aria-hidden="true" /><p className="section-tag">Transparent availability</p><h2>No public offers are active.</h2><p>The board does not display placeholder asking prices, artificial bid activity, or hidden terms. Approved opportunities appear here when they are ready to be evaluated publicly.</p><a href="/#contact">Request offer instructions <ArrowRight size={15} /></a></section> : null}
    <p className="offer-disclosure">The offer board is an information surface, not a payment or contract flow. Any future bid process will require approved terms, identity checks, and commercial review.</p>
  </main><SiteFooter /></div>;
}
