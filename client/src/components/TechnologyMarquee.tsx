import { technologyEcosystem } from "@/content/site";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";

export function TechnologyMarquee() {
  return (
    <div className="technology-marquee-shell">
      <InfiniteMarquee icons={technologyEcosystem.map(({ name, logo }) => ({ name, src: logo }))} ariaLabel="Technology ecosystem examples" />
    </div>
  );
}
