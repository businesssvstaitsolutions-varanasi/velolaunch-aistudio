import { technologyEcosystem } from "@/content/site";

export function TechnologyMarquee() {
  return (
    <div className="technology-marquee" aria-label="Technology ecosystem examples">
      <span className="technology-marquee-motion-cue" aria-hidden="true">Auto <b>←</b></span>
      <div className="technology-marquee-track" data-motion="css-right-to-left">
        {[0, 1].map(setIndex => (
          <div className="technology-marquee-set" aria-hidden={setIndex > 0 ? "true" : undefined} key={setIndex}>
            {technologyEcosystem.map(brand => (
              <span className="technology-logo" role="img" aria-label={brand.name} key={brand.name}>
                <img src={brand.logo} alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
