import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const taglines = [
  "Initializing cinematic experience…",
  "Loading the Director's Cut…",
  "Preparing the masterpieces…",
];

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "zoom" | "done">("loading");
  const [tagIndex, setTagIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((i) => (i + 1) % taglines.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let frame: number;
    let start: number;
    const duration = 2200;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      // Ease-out cubic for dramatic slowdown at end
      const eased = 1 - Math.pow(1 - pct, 3);
      setProgress(Math.round(eased * 100));
      if (pct < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase("zoom");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 700);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(var(--background))" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Radial ambient glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.1) 2px, hsl(var(--foreground) / 0.1) 4px)",
            }}
          />

          {/* Initials with zoom */}
          <motion.div
            className="text-6xl md:text-8xl font-bold font-mono mb-8 relative"
            style={{ color: "hsl(var(--primary))" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={
              phase === "zoom"
                ? { scale: 30, opacity: 0, filter: "blur(4px)" }
                : { scale: 1, opacity: 1, filter: "blur(0px)" }
            }
            transition={
              phase === "zoom"
                ? { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0.6 }
            }
          >
            <span className="neon-text">KS</span>
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 -m-4 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Progress bar container */}
          <motion.div
            className="relative w-72 md:w-80"
            animate={phase === "zoom" ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Track */}
            <div className="w-full h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--muted))" }}>
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: "hsl(var(--primary))",
                  boxShadow: "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)",
                  width: `${progress}%`,
                }}
              />
            </div>

            {/* Percentage + tagline */}
            <div className="flex justify-between items-center mt-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={tagIndex}
                  className="font-mono text-[10px] tracking-wider"
                  style={{ color: "hsl(var(--muted-foreground))" }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {taglines[tagIndex]}
                </motion.p>
              </AnimatePresence>
              <p className="font-mono text-xs tabular-nums" style={{ color: "hsl(var(--primary))" }}>
                {progress}%
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
