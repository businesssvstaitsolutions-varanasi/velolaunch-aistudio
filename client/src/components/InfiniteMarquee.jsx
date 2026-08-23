import "./Marquee.css";

const placeholderLogos = [
  { name: "Company One", src: "/logos/company-one.svg" },
  { name: "Company Two", src: "/logos/company-two.svg" },
  { name: "Company Three", src: "/logos/company-three.svg" },
];

/**
 * A reusable CSS-only logo ticker. Pass [{ name, src }] to replace the
 * placeholder image paths with approved brand assets for any page.
 */
export function InfiniteMarquee({ icons = placeholderLogos, ariaLabel = "Company logos", groupSize = 5 }) {
  const visibleIcons = icons.length > 0 ? icons : placeholderLogos;
  const groups = Array.from({ length: Math.ceil(visibleIcons.length / groupSize) }, (_, index) => visibleIcons.slice(index * groupSize, (index + 1) * groupSize));
  const usesFiveLogoGroups = groupSize === 5 && groups.length === 2 && groups.every(group => group.length === 5);
  const displayGroups = usesFiveLogoGroups ? groups : [visibleIcons, visibleIcons];

  return (
    <div className={`infinite-marquee${usesFiveLogoGroups ? " infinite-marquee--five-groups" : ""}`} aria-label={ariaLabel}>
      <div className="infinite-marquee__track">
        {displayGroups.map((group, groupIndex) => (
          <div className="infinite-marquee__group" aria-hidden={groupIndex > 0 ? "true" : undefined} key={`${groupIndex}-${group[0]?.name ?? "group"}`}>
            {group.map(icon => (
              <span className="infinite-marquee__logo" role="img" aria-label={icon.name} key={icon.name}>
                <img src={icon.src} alt="" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export { placeholderLogos };
