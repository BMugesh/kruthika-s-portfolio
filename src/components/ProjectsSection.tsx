import { motion } from "framer-motion";
import { ExternalLink, Globe, Brain, BarChart3 } from "lucide-react";

const projects = [
  {
    title: "Space-Weather Storytelling",
    description:
      "An interactive, character-driven storytelling website that transforms complex space weather data into an immersive narrative experience with cinematic animations.",
    tech: ["React", "Framer Motion", "Lottie", "TypeScript"],
    icon: Globe,
    accent: "from-primary to-cyan-400",
    number: "01",
  },
  {
    title: "AI-Study Companion",
    description:
      "A full-stack intelligent study platform powered by OpenAI's API with advanced NLP parsing for personalized learning paths and AI-generated study material.",
    tech: ["MongoDB", "Express", "React", "Node.js", "OpenAI API"],
    icon: Brain,
    accent: "from-secondary to-blue-400",
    number: "02",
  },
  {
    title: "DSA Tracker",
    description:
      "A secure, full-stack Data Structures & Algorithms progress tracker with automated streak tracking, gamification, and performance analytics.",
    tech: ["Spring Boot", "MongoDB", "Java", "REST API"],
    icon: BarChart3,
    accent: "from-primary to-secondary",
    number: "03",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-primary/70 text-sm tracking-widest uppercase mb-3">
            // Act III
          </p>
          <h2 className="text-3xl md:text-5xl font-bold">
            The <span className="text-gradient-cyan neon-text">Masterpieces</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="glass-card neon-border group overflow-hidden"
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Number & Icon */}
                <div className={`p-8 md:p-10 md:w-48 flex flex-row md:flex-col items-center justify-center gap-4 bg-gradient-to-br ${project.accent} bg-opacity-10 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-background/80" />
                  <span className="relative text-5xl md:text-6xl font-bold text-primary/20 font-mono">
                    {project.number}
                  </span>
                  <project.icon className="relative w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 p-8 md:p-10">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-1 ml-4" />
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary/15 group-hover:border-primary/30"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
