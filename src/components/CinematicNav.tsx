import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { id: "hero", label: "Teaser", number: "00" },
  { id: "about", label: "Plot", number: "01" },
  { id: "projects", label: "Masterpieces", number: "02" },
  { id: "skills", label: "Arsenal", number: "03" },
  { id: "contact", label: "Credits", number: "04" },
];

const CinematicNav = () => {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Determine active section
      const sections = navItems.map((n) => ({
        id: n.id,
        el: document.getElementById(n.id),
      }));

      let current = "hero";
      for (const s of sections) {
        if (s.el) {
          const rect = s.el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) current = s.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] hidden md:block"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "bg-card/60 backdrop-blur-xl border-b border-primary/10 shadow-lg"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              data-magnetic
              className="text-xl font-bold font-mono text-primary neon-text transition-transform duration-300"
            >
              KS<span className="text-muted-foreground">.</span>
            </button>

            {/* Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  data-magnetic
                  className={`relative px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 group ${
                    active === item.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="text-[10px] text-primary/50 mr-1">{item.number}</span>
                  {item.label}
                  {active === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                      style={{
                        backgroundColor: "hsl(var(--primary))",
                        boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Nav */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] md:hidden"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 2.2, duration: 0.6 }}
      >
        <div
          className={`flex items-center justify-between px-5 py-3 transition-all duration-500 ${
            scrolled || mobileOpen
              ? "bg-card/80 backdrop-blur-xl border-b border-primary/10"
              : "bg-transparent"
          }`}
        >
          <button onClick={() => scrollTo("hero")} className="text-lg font-bold font-mono text-primary neon-text">
            KS<span className="text-muted-foreground">.</span>
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-[2px] bg-primary rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-primary rounded-full"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-primary rounded-full origin-center"
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="bg-card/95 backdrop-blur-2xl border-b border-primary/10"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-5 py-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-mono text-sm transition-all duration-300 ${
                      active === item.id
                        ? "text-primary bg-primary/10 neon-border"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/60"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <span className="text-[10px] text-primary/50 mr-2">{item.number}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CinematicNav;
