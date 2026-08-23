import { useEffect, useRef, useState } from "react";

export function OpeningStatement() {
  const statementRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const statement = statementRef.current;
    if (!statement) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setRevealed(true);
      observer.disconnect();
    }, { threshold: 0.18 });

    observer.observe(statement);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={statementRef} className="editorial-statement" data-reveal={revealed ? "visible" : "pending"} aria-labelledby="statement-title">
      <div className="editorial-statement-aside"><p className="section-tag">01 — VeloLaunch</p><span aria-hidden="true" /></div>
      <div className="editorial-statement-main">
        <h2 id="statement-title">A product company for decisions that cannot stay hypothetical.</h2>
        <p className="editorial-statement-summary">VeloLaunch brings product thinking, AI systems, and software engineering into a single accountable delivery practice.</p>
      </div>
    </section>
  );
}
