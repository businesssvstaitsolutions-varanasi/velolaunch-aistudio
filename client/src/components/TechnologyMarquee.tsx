import { technologyEcosystem } from "@/content/site";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

export function TechnologyMarquee() {
  return (
    <div className="technology-marquee-shell">
      <span className="technology-marquee-motion-cue" aria-hidden="true">Auto <b>→</b></span>
      <InfiniteMarquee icons={technologyEcosystem.map(({ name, logo }) => ({ name, src: logo }))} ariaLabel="Technology ecosystem examples" />
    </div>
  );
}
