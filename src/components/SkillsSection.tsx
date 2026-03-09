import { motion } from "framer-motion";

const skills = [
  "React.js", "Express.js", "Spring Boot", "Java", "NumPy",
  "MongoDB", "Git", "TypeScript", "Node.js", "Python",
  "REST APIs", "PostgreSQL", "Tailwind CSS", "Docker", "Framer Motion",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-secondary/3 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-primary/70 text-sm tracking-widest uppercase mb-3">
            // Act IV
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            The <span className="text-gradient-cyan neon-text">Arsenal</span>
          </h2>
        </motion.div>

        {/* Infinite Marquee */}
        <div className="relative overflow-hidden py-8">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-6 whitespace-nowrap">
            {[...skills, ...skills].map((skill, i) => (
              <div
                key={`${skill}-${i}`}
                className="glass-card neon-border px-6 py-4 flex-shrink-0 hover:bg-primary/10 transition-all duration-300 cursor-default group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Second row — reverse */}
        <div className="relative overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <div className="flex gap-6 whitespace-nowrap" style={{ animation: "marquee 35s linear infinite reverse" }}>
            {[...skills.slice().reverse(), ...skills.slice().reverse()].map((skill, i) => (
              <div
                key={`rev-${skill}-${i}`}
                className="glass-card neon-border px-6 py-4 flex-shrink-0 hover:bg-primary/10 transition-all duration-300 cursor-default group"
              >
                <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Orbit visualization */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary neon-glow-strong flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">KS</span>
              </div>
            </div>
            {/* Orbits */}
            {[100, 140, 180].map((radius, ring) => (
              <div
                key={ring}
                className="absolute rounded-full border border-primary/10"
                style={{
                  width: radius * 2,
                  height: radius * 2,
                  top: `calc(50% - ${radius}px)`,
                  left: `calc(50% - ${radius}px)`,
                }}
              >
                {[0, 1, 2].map((dot) => {
                  const angle = (dot * 120 + ring * 40) * (Math.PI / 180);
                  const coreSkills = ["React.js", "Java", "MongoDB", "Spring Boot", "Express.js", "Git", "NumPy", "Python", "Node.js"];
                  const idx = ring * 3 + dot;
                  return (
                    <motion.div
                      key={dot}
                      className="absolute"
                      style={{
                        top: `calc(50% + ${Math.sin(angle) * radius}px - 14px)`,
                        left: `calc(50% + ${Math.cos(angle) * radius}px - 14px)`,
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 20 + ring * 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-7 h-7 rounded-full bg-card border border-primary/30 flex items-center justify-center text-[8px] font-mono text-primary hover:neon-glow hover:scale-125 transition-all duration-300 cursor-default">
                        {coreSkills[idx]?.[0]}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
