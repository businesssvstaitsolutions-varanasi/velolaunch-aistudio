import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate stars only on client-side
    // Increased count and smaller sizes to match the crisp space background
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      // Most stars are 1px, some rarely 2px
      size: Math.random() > 0.8 ? 2 : 1,
      duration: Math.random() * 3 + 2, // Slower twinkle (2s to 5s)
      delay: Math.random() * 5,
    }));
    setStars(newStars);
  }, []);

  // We no longer use setInterval, we use the video's events to track progress
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration) {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    setTimeout(() => setShow(false), 200); // Small delay before fade out
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-black to-black hidden [@media(max-width:1024px)_and_(orientation:portrait)]:flex flex-col items-center justify-between py-10"
        >
          {/* Star Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {stars.map((star) => (
              <motion.div
                key={star.id}
                className="absolute bg-white rounded-full"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3], // Subtle twinkle
                }}
                transition={{
                  duration: star.duration,
                  repeat: Infinity,
                  delay: star.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Top Status Bar */}
          <div className="w-full px-8 pt-4 flex justify-between items-center relative z-10 text-[0.65rem] font-mono tracking-widest text-white/40 uppercase">
            <div className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              SYS.ACTIVE
            </div>
            <div>BUILD 2.0.4</div>
          </div>

          <div className="flex-1" />

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center w-full relative z-10">
            <div className="w-full flex items-center justify-center relative">
              {/* Subtle glowing orb behind video */}
              <div className="absolute inset-0 bg-blue-500/10 blur-[80px] pointer-events-none" />
              <video
                src="/manus-storage/SplashScreen.mp4"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-[100vw] object-cover relative z-10"
              />
            </div>
            
            {/* Loading Terminal */}
            <div className="w-full max-w-xs px-6 mt-12 flex flex-col items-center gap-3">
              <div className="w-full flex justify-between text-[0.65rem] font-mono tracking-wider text-white/50 uppercase">
                <span>{progress < 25 ? "READY" : progress < 50 ? "GET" : progress < 75 ? "SET" : "VELO"}</span>
                <span className="text-white/80">[{Math.floor(progress)}%]</span>
              </div>
              {/* Premium Progress Bar */}
              <div className="w-full h-[2px] bg-white/10 overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-indigo-400 to-white transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
                {/* Glowing head of progress bar */}
                <div 
                  className="absolute top-0 h-full w-4 bg-white blur-[2px] transition-all duration-75 ease-linear"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          {/* Bottom Branding */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="w-full flex flex-col items-center justify-end pb-8 relative z-10"
          >
            <div className="text-center space-y-2">
              <p className="text-sm md:text-base font-semibold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white/70">
                VeloLaunch
              </p>
              <div className="flex items-center justify-center gap-2 text-[0.6rem] md:text-xs font-mono text-white/40 tracking-[0.2em] uppercase">
                <span className="w-3 h-[1px] bg-white/20"></span>
                AI Product Studio
                <span className="w-3 h-[1px] bg-white/20"></span>
              </div>
              <p className="text-[10px] text-white/30 pt-2 font-light">
                A company by Smart Vista IT Solutions
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
