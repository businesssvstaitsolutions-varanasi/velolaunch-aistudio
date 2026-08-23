# Services, Products, and Offer Board

## Public Route Structure

| Route | Purpose | Primary action |
| --- | --- | --- |
| `/services` | Presents the end-to-end VeloLaunch service matrix. | Explore a service or start a consultation. |
| `/services/:slug` | Explains one service’s scope, working model, deliverables, and relevant capabilities. | Book a consultation. |
| `/products` | Presents the public VeloLaunch product portfolio. | View product detail or offer-board availability. |
| `/products/:slug` | Presents an individual product’s positioning, delivery model, and availability. | Register purchase or partnership interest. |
| `/offers` | Publicly displays only approved product opportunities, asking price, offer currency, bid count, and current bid when a listing is live. | Request bid instructions. |

## Content and Disclosure Controls

The application will use a **publicly approved catalogue** and will not invent product names, customer outcomes, pricing, or bids. Product records remain non-public by default. The portfolio page and product routes will provide professional release-ready states while the offer board clearly states when no public listings are active.

Asking prices and bid values are business-sensitive data. Therefore, the public offer board will be a display and interest-registration surface only in this iteration. It does not accept payment, bind either party, or fabricate market activity. A later operational release can add authenticated bid submission, moderation, offer expiry, and payment/legal workflows after the user provides the commercial rules.

## Reusable Component Model

| Component | Reuse purpose |
| --- | --- |
| `ServiceCard` | Dense dark service-matrix card matching the supplied reference and linking to a dedicated route. |
| `ServiceDetail` | Reusable route template with scope, capability tags, delivery rhythm, and the existing consultation form. |
| `ProductCard` | Existing visual primitive adapted for public product portfolio records. |
| `ProductDetail` | Reusable product route with availability disclosure and consultation CTA. |
| `OfferBoard` | Public status table with reliable empty, pending, and live-offer states. |
| `SiteFooter` | Permanent navigation, brand ownership, route links, and legal/disclosure context. |

## Risk Controls

The new public catalogue must never display unapproved product records. The offer board must not show zero-value placeholder bids, synthetic competition, or synthetic price history. Consultation calls will reuse the validated server-side request flow already present in the application. Future bid submission must add authenticated identity, server-side minimum/maximum validation, audit records, and a separately approved commercial process.
