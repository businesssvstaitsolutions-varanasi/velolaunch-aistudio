import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";

export function CompanyVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsSoundEnable, setNeedsSoundEnable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = async () => {
      video.muted = false;
      video.volume = 1;
      try {
        await video.play();
        setNeedsSoundEnable(false);
      } catch {
        video.muted = true;
        try {
          await video.play();
        } finally {
          setNeedsSoundEnable(true);
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void startPlayback();
        } else {
          video.pause();
        }
      },
      { threshold: 0.48 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    try {
      await video.play();
      setNeedsSoundEnable(false);
    } catch {
      setNeedsSoundEnable(true);
    }
  };

  return (
    <figure className="company-video">
      <video ref={videoRef} src={src} playsInline loop preload="metadata" aria-label="VeloLaunch company video" />
      {needsSoundEnable ? <button className="company-video-sound focus-ring" type="button" onClick={() => void enableSound()}><Volume2 size={15} aria-hidden="true" /> Enable sound</button> : null}
      <figcaption>VL / Product material study</figcaption>
    </figure>
  );
}
