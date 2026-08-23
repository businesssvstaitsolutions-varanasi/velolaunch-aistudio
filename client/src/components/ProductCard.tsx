/**
 * Precision Field design reminder: product cards feel like machined objects with restrained depth, not floating glass tiles.
 */
import type { MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

type ProductCardProps = {
  label: string;
  title: string;
  copy: string;
  className?: string;
  href?: string;
  visual?: React.ReactNode;
};

export function ProductCard({ label, title, copy, className = "", href = "#contact", visual }: ProductCardProps) {
  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    card.style.setProperty("--pointer-x", `${((event.clientX - left) / width) * 100}%`);
    card.style.setProperty("--pointer-y", `${((event.clientY - top) / height) * 100}%`);
  };

  return (
    <a
      className={`product-card focus-ring ${className}`}
      href={href}
      onMouseMove={handlePointerMove}
      onMouseLeave={(event) => {
        event.currentTarget.style.removeProperty("--pointer-x");
        event.currentTarget.style.removeProperty("--pointer-y");
      }}
    >
      <span className="product-card-shine" aria-hidden="true" />
      <div className="product-card-topline">
        <span>{label}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </div>
      <div className="product-card-body">
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      {visual ? <div className="product-card-visual" aria-hidden="true">{visual}</div> : null}
      <div className="machined-edge" aria-hidden="true" />
    </a>
  );
}
