/**
 * Precision Field design reminder: the mark is a precise, physical three-plane V—never ornamental.
 */
import { siteConfig } from "@/content/site";

type BrandMarkProps = {
  className?: string;
  label?: boolean;
  showAttribution?: boolean;
};

export function BrandMark({ className = "", label = true, showAttribution = false }: BrandMarkProps) {
  return (
    <a className={`brand-mark focus-ring ${className}`} href="#top" aria-label="VeloLaunch home">
      <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
      {label ? <span className="brand-copy"><span className="brand-title">VeloLaunch</span>{showAttribution ? <span className="brand-attribution">A Company by Smart Vista IT Solutions</span> : null}</span> : null}
    </a>
  );
}
