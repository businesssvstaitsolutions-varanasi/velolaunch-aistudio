import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { siteConfig } from "@/content/site";
import { CALLBACK_POPUP_SESSION_KEY, MOBILE_CALLBACK_DELAY_MS, shouldOpenForExitIntent, shouldStartMobileCallbackTimer } from "@/lib/callbackPopup";
import { trpc } from "@/lib/trpc";

function getPopupSessionState() {
  try {
    return window.sessionStorage.getItem(CALLBACK_POPUP_SESSION_KEY);
  } catch {
    return null;
  }
}

function setPopupSessionState(state: "shown" | "submitted" | "dismissed") {
  try {
    window.sessionStorage.setItem(CALLBACK_POPUP_SESSION_KEY, state);
  } catch {
    // The popup remains usable when browser storage is unavailable.
  }
}

export function CallbackPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handledRef = useRef(false);
  const mobileTimerRef = useRef<number | null>(null);

  const showPopup = useCallback(() => {
    if (handledRef.current || getPopupSessionState()) return;
    handledRef.current = true;
    setPopupSessionState("shown");
    setOpen(true);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const handleMouseLeave = (event: MouseEvent) => {
      if (shouldOpenForExitIntent({ clientY: event.clientY, isDesktop: desktopQuery.matches, hasHandled: handledRef.current })) {
        showPopup();
      }
    };

    const beginMobileTimer = () => {
      if (!shouldStartMobileCallbackTimer({ isMobile: mobileQuery.matches, scrollY: window.scrollY, hasHandled: handledRef.current })) return;
      if (mobileTimerRef.current) return;

      mobileTimerRef.current = window.setTimeout(() => {
        if (document.visibilityState === "visible") showPopup();
      }, MOBILE_CALLBACK_DELAY_MS);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", beginMobileTimer, { passive: true });

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", beginMobileTimer);
      if (mobileTimerRef.current) window.clearTimeout(mobileTimerRef.current);
    };
  }, [showPopup]);

  const request = trpc.consultations.create.useMutation({
    onSuccess: () => {
      setPopupSessionState("submitted");
      setMessage("Request received. We will use these details to follow up about your callback.");
      setName("");
      setEmail("");
      setPhone("");
    },
    onError: () => setMessage("We could not send that request. Please check the details and try again."),
  });

  const closePopup = () => {
    if (!message) setPopupSessionState("dismissed");
    setOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name.trim().length < 2) {
      setMessage("Please add your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setMessage("Please add a valid email.");
      return;
    }
    if (!/^[+()\d][+()\d\s.-]{5,31}$/.test(phone.trim())) {
      setMessage("Please add a valid callback number.");
      return;
    }

    setMessage("");
    request.mutate({
      name,
      email,
      phone,
      scope: "Callback request from the engagement popup.",
      source: "callback-popup",
      website: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={nextOpen => (nextOpen ? setOpen(true) : closePopup())}>
      <DialogContent className="callback-popup-dialog" showCloseButton={false} aria-describedby="callback-popup-copy">
        <div className="callback-popup-visual" aria-hidden="true">
          <img src={siteConfig.assets.callbackPopup} alt="" />
        </div>
        <section className="callback-popup-panel">
          <button type="button" className="callback-popup-close focus-ring" onClick={closePopup} aria-label="Dismiss callback request"><X size={17} aria-hidden="true" /></button>
          <p className="callback-popup-kicker">A useful next conversation</p>
          <DialogTitle className="callback-popup-title">Request a callback.</DialogTitle>
          <p id="callback-popup-copy" className="callback-popup-copy">Tell us where to reach you. We will use these details only to follow up about the work you are considering.</p>
          <form className="callback-popup-form" onSubmit={submit} noValidate>
            <label>
              <span>Name</span>
              <input value={name} onChange={event => setName(event.target.value)} autoComplete="name" required />
            </label>
            <label>
              <span>Work email</span>
              <input value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" inputMode="email" type="email" required />
            </label>
            <label>
              <span>Callback number</span>
              <input value={phone} onChange={event => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" type="tel" required />
            </label>
            <div className="callback-popup-submit-row">
              <Button type="submit" className="callback-popup-submit" disabled={request.isPending}>
                {request.isPending ? <Loader2 size={16} className="spin" aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                {request.isPending ? "Sending" : "Request callback"}
              </Button>
              <p role="status" aria-live="polite">{message}</p>
            </div>
          </form>
          <button type="button" className="callback-popup-dismiss focus-ring" onClick={closePopup}>Not right now</button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
