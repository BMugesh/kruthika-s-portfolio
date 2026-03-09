import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "zoom" | "done">("loading");

  useEffect(() => {
    let frame: number;
    let start: number;
    const duration = 1800;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(elapsed / duration, 1);
      setProgress(Math.round(pct * 100));
      if (pct < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setPhase("zoom");
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 600);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: "hsl(var(--background))" }}
          exit={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeIn" }}
        >
          {/* Initials */}
          <motion.div
            className="text-5xl md:text-7xl font-bold font-mono mb-12"
            style={{ color: "hsl(var(--primary))" }}
            animate={phase === "zoom" ? { scale: 20, opacity: 0 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            KS
          </motion.div>

          {/* Progress bar */}
          <div className="w-64 h-[2px] rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--muted))" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: "hsl(var(--primary))",
                boxShadow: "0 0 20px hsl(var(--primary) / 0.8)",
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Percentage */}
          <p className="font-mono text-xs mt-4" style={{ color: "hsl(var(--muted-foreground))" }}>
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CinematicLoader;
