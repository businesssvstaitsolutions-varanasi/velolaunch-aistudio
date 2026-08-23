import { useEffect, useRef } from "react";
import { technologyEcosystem } from "@/content/site";
import { advanceMarqueeScrollPosition } from "@/lib/marqueeMotion";

const MARQUEE_SPEED_PX_PER_SECOND = 240;

export function TechnologyMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) return;

    const firstSet = track.querySelector<HTMLElement>(".technology-marquee-set");
    if (!firstSet) return;

    let cycleWidth = firstSet.getBoundingClientRect().width;
    let previousTimestamp = performance.now();
    let frameId = 0;

    const updateCycleWidth = () => {
      cycleWidth = firstSet.getBoundingClientRect().width;
      if (cycleWidth > 0) viewport.scrollLeft %= cycleWidth;
    };

    const renderFrame = (timestamp: number) => {
      viewport.scrollLeft = advanceMarqueeScrollPosition(viewport.scrollLeft, timestamp - previousTimestamp, cycleWidth, MARQUEE_SPEED_PX_PER_SECOND);
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
      viewport.scrollLeft = 0;
    };
  }, []);

  return (
    <div className="technology-marquee" aria-label="Technology ecosystem examples" ref={viewportRef}>
      <span className="technology-marquee-motion-cue" aria-hidden="true">Auto <b>←</b></span>
      <div className="technology-marquee-track" ref={trackRef}>
        {[0, 1, 2].map(setIndex => (
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
