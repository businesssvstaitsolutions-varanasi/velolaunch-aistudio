import { useEffect, useRef } from "react";
import { technologyEcosystem } from "@/content/site";
import { advanceMarqueeOffset } from "@/lib/marqueeMotion";

const MARQUEE_SPEED_PX_PER_SECOND = 92;

export function TechnologyMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const firstSet = track.querySelector<HTMLElement>(".technology-marquee-set");
    if (!firstSet) return;

    let offset = 0;
    let cycleWidth = firstSet.getBoundingClientRect().width;
    let previousTimestamp = performance.now();
    let frameId = 0;

    const updateCycleWidth = () => {
      cycleWidth = firstSet.getBoundingClientRect().width;
      offset = advanceMarqueeOffset(offset, 0, cycleWidth, MARQUEE_SPEED_PX_PER_SECOND);
    };

    const renderFrame = (timestamp: number) => {
      offset = advanceMarqueeOffset(offset, timestamp - previousTimestamp, cycleWidth, MARQUEE_SPEED_PX_PER_SECOND);
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
      previousTimestamp = timestamp;
      frameId = window.requestAnimationFrame(renderFrame);
    };

    const resizeObserver = new ResizeObserver(updateCycleWidth);
    resizeObserver.observe(firstSet);
    updateCycleWidth();
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      track.style.transform = "";
    };
  }, []);

  return (
    <div className="technology-marquee" aria-label="Technology ecosystem examples">
      <div className="technology-marquee-track" ref={trackRef}>
        {[0, 1].map(setIndex => (
          <div className="technology-marquee-set" aria-hidden={setIndex === 1 ? "true" : undefined} key={setIndex}>
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
