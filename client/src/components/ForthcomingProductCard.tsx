import { ArrowRight, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { forthcomingProducts } from "@/content/site";
import { trpc } from "@/lib/trpc";

type ForthcomingProductRecord = (typeof forthcomingProducts)[number];

export function ProductNotificationDialog({ product, compact = false }: { product: ForthcomingProductRecord; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [hasJoined, setHasJoined] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const request = trpc.waitlist.create.useMutation({
    onSuccess: () => { setEmail(""); setHasJoined(true); setMessage("You are on the release-interest list for this product."); },
    onError: () => { setHasJoined(false); setMessage("The notification request could not be sent. Please check your email and try again."); },
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) { setMessage("Please add a valid email."); emailRef.current?.focus(); return; }
    setMessage("");
    request.mutate({ email, productName: product.title, website });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) { setEmail(""); setWebsite(""); setMessage(""); setHasJoined(false); }
    setOpen(nextOpen);
  };

  return <><button type="button" className={`forthcoming-notify focus-ring${compact ? " forthcoming-notify-compact" : ""}`} onClick={() => setOpen(true)}><Bell size={14} aria-hidden="true" /> Notify Me</button><Dialog open={open} onOpenChange={handleOpenChange}><DialogContent className="product-notification-dialog" aria-describedby="product-notification-copy"><p className="product-notification-kicker">Release notification</p><DialogTitle>Notify me about {product.title}</DialogTitle><p id="product-notification-copy">Leave your email for a meaningful release update about this forthcoming product. This request does not confirm availability or a release date.</p>{hasJoined ? <div className="product-notification-success" role="status"><CheckCircle2 size={20} aria-hidden="true" /><div><strong>Notification requested.</strong><span>{message}</span></div></div> : <form onSubmit={submit} noValidate><label htmlFor={`notify-email-${product.slug}`}><span>Email</span><input id={`notify-email-${product.slug}`} ref={emailRef} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" type="email" required /></label><label className="hp-field" aria-hidden="true" htmlFor={`notify-website-${product.slug}`}><span>Website</span><input id={`notify-website-${product.slug}`} value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label><Button type="submit" className="button-ink" disabled={request.isPending}>{request.isPending ? <Loader2 size={15} className="spin" aria-hidden="true" /> : <Bell size={15} aria-hidden="true" />}{request.isPending ? "Requesting notification" : "Notify Me"}</Button><p className="product-notification-status" role="status" aria-live="polite">{message}</p></form>}</DialogContent></Dialog></>;
}

export function ForthcomingProductCard({ product }: { product: ForthcomingProductRecord }) {
  return <article className="forthcoming-product-card"><div className="forthcoming-product-card-head"><span>VeloLaunch product</span><strong>Releasing Soon</strong></div><div><p className="forthcoming-product-category">{product.category}</p><h3>{product.title}</h3><p>{product.description}</p></div><div className="forthcoming-product-actions"><a className="focus-ring" href={`/products/${product.slug}`}>View details <ArrowRight size={14} aria-hidden="true" /></a><ProductNotificationDialog product={product} compact /></div></article>;
}
