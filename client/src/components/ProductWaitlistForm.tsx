import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { forthcomingHomepageProducts } from "@/content/site";
import { trpc } from "@/lib/trpc";

export function ProductWaitlistForm() {
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState(forthcomingHomepageProducts[0].title);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("Choose a product and we will email you when there is a meaningful update.");
  const [hasJoined, setHasJoined] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const request = trpc.waitlist.create.useMutation({
    onSuccess: () => {
      setEmail("");
      setHasJoined(true);
      setMessage("Thank you. You are on the interest list, and we will email you when this product has a meaningful update.");
    },
    onError: () => {
      setHasJoined(false);
      setMessage("The waitlist request could not be sent. Please check your email and try again.");
    },
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage("Please add a valid email.");
      emailRef.current?.focus();
      return;
    }
    setMessage("");
    request.mutate({ email, productName, website });
  };

  return (
    <aside className="product-waitlist" aria-labelledby="waitlist-title">
      <div>
        <p className="section-tag">Product interest list</p>
        <h3 id="waitlist-title">Be first to hear when a product is ready for a closer look.</h3>
      </div>
      <form onSubmit={submit} noValidate>
        <label htmlFor="waitlist-email"><span>Email</span><input id="waitlist-email" ref={emailRef} value={email} onChange={(event) => { setEmail(event.target.value); setHasJoined(false); }} autoComplete="email" inputMode="email" type="email" aria-describedby="waitlist-privacy waitlist-status" required /></label>
        <label htmlFor="waitlist-product"><span>Product of interest</span><select id="waitlist-product" value={productName} onChange={(event) => setProductName(event.target.value as typeof productName)}>{forthcomingHomepageProducts.map((product) => <option value={product.title} key={product.title}>{product.title}</option>)}</select></label>
        <label className="hp-field" aria-hidden="true" htmlFor="waitlist-website"><span>Website</span><input id="waitlist-website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <p id="waitlist-privacy" className="product-waitlist-privacy">We will only use your email for product updates. We will never spam you. <button type="button" className="privacy-policy-trigger focus-ring" onClick={() => setPrivacyOpen(true)}>Privacy Policy</button></p>
        {hasJoined ? <div className="waitlist-thank-you" id="waitlist-status" role="status" aria-live="polite"><CheckCircle2 size={20} aria-hidden="true" /><div><strong>Thank you for your interest.</strong><span>{message}</span></div></div> : <div className="product-waitlist-submit"><Button type="submit" className="button-ink" disabled={request.isPending}>{request.isPending ? <Loader2 size={15} className="spin" aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}{request.isPending ? "Joining list" : "Join the waitlist"}</Button><p id="waitlist-status" role="status" aria-live="polite">{message}</p></div>}
      </form>
      <Dialog open={privacyOpen} onOpenChange={setPrivacyOpen}>
        <DialogContent className="privacy-policy-dialog" aria-describedby="privacy-policy-copy">
          <DialogTitle>Privacy Policy</DialogTitle>
          <div id="privacy-policy-copy"><p>This privacy note applies to the product-interest form. We use your email and selected product only to send relevant VeloLaunch product updates.</p><p>We do not use this form to create a general mailing list. If you have a privacy question, contact <a href="mailto:hello@velolaunch.com">hello@velolaunch.com</a>.</p></div>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
