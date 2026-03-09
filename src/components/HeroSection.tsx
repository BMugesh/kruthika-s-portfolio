import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GlitchText = ({ text }: { text: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block group cursor-pointer">
      <span className="relative z-10">{text}</span>
      <span
        className="absolute top-0 left-0 text-primary opacity-0 group-hover:opacity-70 transition-opacity duration-100"
        style={{ animation: isGlitching ? "glitch-1 0.2s steps(2) infinite" : "none" }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 text-secondary opacity-0 group-hover:opacity-70 transition-opacity duration-100"
        style={{ animation: isGlitching ? "glitch-2 0.2s steps(2) infinite" : "none" }}
      >
        {text}
      </span>
    </span>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse-glow text-primary">|</span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-primary/70 text-sm md:text-base mb-6 tracking-widest uppercase">
            // The Director's Cut
          </p>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-foreground">You're looking for a developer.</span>
          <br />
          <span className="text-gradient-cyan neon-text">
            <GlitchText text="You just found a cinematic architect." />
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <TypewriterText
            text="I am Kruthika S. I build digital experiences that refuse to be ignored."
            delay={1200}
          />
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a
            href="/resume/chinna akka resume.pdf"
            download="kruthika_s_resume.pdf"
            data-magnetic
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg neon-glow transition-all duration-300 hover:neon-glow-strong hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Cut to the Chase <span className="text-xs opacity-50 font-mono">(Get Resume)</span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#projects"
            data-magnetic
            className="px-8 py-4 border border-primary/40 text-primary rounded-lg font-semibold transition-all duration-300 hover:bg-primary/10 hover:border-primary/70 hover:scale-105"
          >
            See the Masterpieces
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-primary/60 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
