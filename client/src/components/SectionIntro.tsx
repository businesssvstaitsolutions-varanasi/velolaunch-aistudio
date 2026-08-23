/**
 * Precision Field design reminder: headings use a technical left rail and spacious asymmetric hierarchy.
 */
type SectionIntroProps = {
  eyebrow: string;
  title: string;
  titleId?: string;
  copy?: string;
  className?: string;
};

export function SectionIntro({ eyebrow, title, titleId, copy, className = "" }: SectionIntroProps) {
  return (
    <header className={`section-intro ${className}`}>
      <div className="section-index">
        <span className="section-index-dot" />
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 id={titleId}>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </header>
  );
}
