/**
 * Precision Field design reminder: the mark is a precise, physical three-plane V—never ornamental.
 */
import { siteConfig } from "@/content/site";

type BrandMarkProps = {
  className?: string;
  label?: boolean;
};

export function BrandMark({ className = "", label = true }: BrandMarkProps) {
  return (
    <a className={`brand-mark focus-ring ${className}`} href="#top" aria-label="VeloLaunch home">
      <img src={siteConfig.assets.mark} alt="" aria-hidden="true" />
      {label ? <span>VeloLaunch</span> : null}
    </a>
  );
}
