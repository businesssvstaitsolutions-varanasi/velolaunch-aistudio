import "./Marquee.css";

const placeholderLogos = [
  { name: "Company One", src: "/logos/company-one.svg" },
  { name: "Company Two", src: "/logos/company-two.svg" },
  { name: "Company Three", src: "/logos/company-three.svg" },
];

/**
 * A reusable static logo grid. Pass [{ name, src }] to replace the
 * placeholder image paths with approved brand assets for any page.
 */
export function InfiniteMarquee({ icons = placeholderLogos, ariaLabel = "Company logos" }) {
  const visibleIcons = icons.length > 0 ? icons : placeholderLogos;

  return (
    <div className="infinite-marquee" aria-label={ariaLabel}>
      <div className="infinite-marquee__grid">
        {visibleIcons.map(icon => (
          <span className="infinite-marquee__logo" role="img" aria-label={icon.name} key={icon.name}>
            <img src={icon.src} alt="" />
          </span>
        ))}
      </div>
    </div>
  );
}

export { placeholderLogos };
