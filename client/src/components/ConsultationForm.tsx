import { FormEvent, useRef, useState } from "react";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";

export function ConsultationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("No mailing list. Just the necessary next step.");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const scopeRef = useRef<HTMLTextAreaElement>(null);
  const request = trpc.consultations.create.useMutation({
    onSuccess: () => {
      setMessage("Context received. We will follow up by email.");
      setName("");
      setEmail("");
      setScope("");
    },
    onError: () => setMessage("The request could not be sent. Please check your details and try again."),
  });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setMessage("Please add your name before requesting a conversation.");
      nameRef.current?.focus();
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage("Please add a valid work email.");
      emailRef.current?.focus();
      return;
    }
    if (scope.trim().length < 16) {
      setMessage("Please add a little more project context so we can prepare.");
      scopeRef.current?.focus();
      return;
    }
    setMessage("");
    request.mutate({ name, email, scope, website });
  };

  return (
    <form className="consultation-form" onSubmit={submit} noValidate>
      <div className="consultation-form-grid">
        <label htmlFor="consultation-name">
          <span>Name</span>
          <input id="consultation-name" ref={nameRef} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" aria-describedby="consultation-status" required />
        </label>
        <label htmlFor="consultation-email">
          <span>Work email</span>
          <input id="consultation-email" ref={emailRef} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" type="email" aria-describedby="consultation-status" required />
        </label>
      </div>
      <label htmlFor="consultation-scope">
        <span>What needs to become real?</span>
        <textarea id="consultation-scope" ref={scopeRef} value={scope} onChange={(event) => setScope(event.target.value)} minLength={16} maxLength={2000} aria-describedby="consultation-status" required />
      </label>
      <label className="hp-field" aria-hidden="true" htmlFor="consultation-website">
        <span>Website</span>
        <input id="consultation-website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>
      <div className="consultation-submit-row">
        <Button type="submit" className="button-metal contact-button" disabled={request.isPending}>
          {request.isPending ? <Loader2 size={16} className="spin" aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
          {request.isPending ? "Sending context" : "Request a conversation"}
        </Button>
        <p id="consultation-status" role="status" aria-live="polite">
          {message}
        </p>
      </div>
    </form>
  );
}
