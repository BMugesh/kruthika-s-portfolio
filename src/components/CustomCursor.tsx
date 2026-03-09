import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useSpring(cursorX, { damping: 25, stiffness: 200, mass: 0.5 });
  const trailY = useSpring(cursorY, { damping: 25, stiffness: 200, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-magnetic], .glass-card")) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setHidden(true);
    const handleEnter = () => setHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isMobile, cursorX, cursorY]);

  // Magnetic effect
  useEffect(() => {
    if (isMobile) return;
    const magnetics = document.querySelectorAll("[data-magnetic]");

    const handleMagnet = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const mx = (e as MouseEvent).clientX - rect.left - rect.width / 2;
      const my = (e as MouseEvent).clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${mx * 0.3}px, ${my * 0.3}px)`;
    };

    const handleReset = (e: Event) => {
      (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
    };

    magnetics.forEach((el) => {
      el.addEventListener("mousemove", handleMagnet);
      el.addEventListener("mouseleave", handleReset);
    });

    return () => {
      magnetics.forEach((el) => {
        el.removeEventListener("mousemove", handleMagnet);
        el.removeEventListener("mouseleave", handleReset);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Primary dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "hsl(var(--primary))",
          boxShadow: "0 0 12px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.4)",
          opacity: hidden ? 0 : 1,
        }}
      />
      {/* Trailing glass circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovering ? "hsl(var(--primary) / 0.6)" : "hsl(var(--primary) / 0.2)",
          backgroundColor: hovering ? "hsl(var(--primary) / 0.08)" : "transparent",
          opacity: hidden ? 0 : 1,
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          transition: "width 0.3s, height 0.3s, border-color 0.3s, background-color 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
