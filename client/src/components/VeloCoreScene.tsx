import { useRef, type CSSProperties, type PointerEvent } from "react";

type VeloCoreSceneProps = {
  src: string;
  alt: string;
};

export function VeloCoreScene({ src, alt }: VeloCoreSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);

  const setRotation = (x: number, y: number) => {
    sceneRef.current?.style.setProperty("--core-rotate-x", `${x.toFixed(2)}deg`);
    sceneRef.current?.style.setProperty("--core-rotate-y", `${y.toFixed(2)}deg`);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setRotation(-y * 3.5, x * 4.5);
  };

  return (
    <div
      ref={sceneRef}
      className="velo-core-scene"
      style={{ "--core-rotate-x": "0deg", "--core-rotate-y": "0deg" } as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setRotation(0, 0)}
    >
      <span className="core-scene-arc core-scene-arc-one" aria-hidden="true" />
      <span className="core-scene-arc core-scene-arc-two" aria-hidden="true" />
      <span className="core-scene-arc core-scene-arc-three" aria-hidden="true" />
      <span className="core-scene-node" aria-hidden="true" />
      <div className="core-scene-plane core-scene-plane-rear" aria-hidden="true" />
      <div className="core-scene-object">
        <div className="core-scene-plane core-scene-plane-mid" aria-hidden="true" />
        <img className="core-scene-image" src={src} alt={alt} fetchPriority="high" />
      </div>
    </div>
  );
}
