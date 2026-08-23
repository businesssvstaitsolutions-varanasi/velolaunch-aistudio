import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { forthcomingHomepageProducts } from "@/content/site";
import { trpc } from "@/lib/trpc";

export function ProductWaitlistForm() {
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState(forthcomingHomepageProducts[0].title);
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("Choose a product and we will email you when there is a meaningful update.");
  const emailRef = useRef<HTMLInputElement>(null);
  const request = trpc.waitlist.create.useMutation({
    onSuccess: () => {
      setEmail("");
      setMessage("You are on the interest list. We will email you when this product has a meaningful update.");
    },
    onError: () => setMessage("The waitlist request could not be sent. Please check your email and try again."),
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
        <label htmlFor="waitlist-email"><span>Email</span><input id="waitlist-email" ref={emailRef} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" type="email" aria-describedby="waitlist-status" required /></label>
        <label htmlFor="waitlist-product"><span>Product of interest</span><select id="waitlist-product" value={productName} onChange={(event) => setProductName(event.target.value as typeof productName)}>{forthcomingHomepageProducts.map((product) => <option value={product.title} key={product.title}>{product.title}</option>)}</select></label>
        <label className="hp-field" aria-hidden="true" htmlFor="waitlist-website"><span>Website</span><input id="waitlist-website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <div className="product-waitlist-submit"><Button type="submit" className="button-ink" disabled={request.isPending}>{request.isPending ? <Loader2 size={15} className="spin" aria-hidden="true" /> : <ArrowUpRight size={15} aria-hidden="true" />}{request.isPending ? "Joining list" : "Join the waitlist"}</Button><p id="waitlist-status" role="status" aria-live="polite">{message}</p></div>
      </form>
    </aside>
  );
}
