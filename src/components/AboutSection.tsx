import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code, Star, Trophy, Rocket } from "lucide-react";

const AnimatedCounter = ({ target, label, icon: Icon, suffix = "" }: { target: number; label: string; icon: React.ElementType; suffix?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      className="glass-card neon-border p-6 text-center group hover:bg-card/60 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:neon-glow transition-all duration-300">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gradient-cyan mb-2 font-mono">
        {count}{suffix}
      </div>
      <p className="text-muted-foreground text-sm">{label}</p>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-secondary/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-primary/70 text-sm tracking-widest uppercase mb-3">
            // Act II
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            The <span className="text-gradient-cyan neon-text">Plot</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AnimatedCounter target={190} label="LeetCode Problems Solved" icon={Code} suffix="+" />
          <AnimatedCounter target={4} label="Star HackerRank Coder" icon={Star} suffix="-Star" />
          <AnimatedCounter target={300} label="SkillRack Solutions" icon={Trophy} suffix="+" />
        </div>

        {/* Anvora Card */}
        <motion.div
          className="glass-card neon-border p-8 md:p-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 neon-glow">
              <Rocket className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Co-Founder, <span className="text-gradient-cyan">Anvora</span>
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Not just a developer — an entrepreneur. Co-founded Anvora, turning vision into reality 
                with a relentless drive to build products that matter. From architecture to deployment, 
                every line of code serves the bigger picture.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Startup Founder", "Full-Stack", "Product Thinking", "Leadership"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-mono rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
