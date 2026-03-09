import { motion } from "framer-motion";
import { ExternalLink, Globe, Brain, BarChart3, Github } from "lucide-react";

const projects = [
  {
    title: "Space-Weather Storytelling",
    description:
      "An interactive, character-driven storytelling website that transforms complex space weather data into an immersive narrative experience with cinematic animations.",
    tech: ["React", "Framer Motion", "Lottie", "TypeScript"],
    icon: Globe,
    image: "/projects/space-weather.png",
    accent: "from-primary to-cyan-400",
    number: "01",
  },
  {
    title: "AI-Study Companion",
    description:
      "A full-stack intelligent study platform powered by OpenAI's API with advanced NLP parsing for personalized learning paths and AI-generated study material.",
    tech: ["MongoDB", "Express", "React", "Node.js", "OpenAI API"],
    icon: Brain,
    image: "/projects/ai-study.png",
    accent: "from-secondary to-blue-400",
    number: "02",
  },
  {
    title: "DSA Tracker",
    description:
      "A secure, full-stack Data Structures & Algorithms progress tracker with automated streak tracking, gamification, and performance analytics.",
    tech: ["Spring Boot", "MongoDB", "Java", "REST API"],
    icon: BarChart3,
    image: "/projects/dsa-tracker.png",
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
              <div className="flex flex-col lg:flex-row">
                {/* Visual Area */}
                <div className="relative w-full lg:w-[45%] h-64 lg:h-auto overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  <div className={`absolute top-4 left-4 p-3 rounded-lg bg-background/80 backdrop-blur-md border border-white/10`}>
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute bottom-4 right-6 text-6xl font-bold text-white/10 font-mono">
                    {project.number}
                  </span>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-3xl font-bold group-hover:text-primary transition-colors duration-300 chromatic-aberration">
                        {project.title}
                      </h3>
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 flex-shrink-0 mt-2" />
                    </div>
                    <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-xs font-mono rounded-md bg-primary/10 text-primary border border-primary/20"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 rounded-lg font-bold transition-all duration-300">
                      View Mission
                    </button>
                    <button className="p-3 border border-white/10 rounded-lg hover:bg-white/10 transition-colors">
                      <Github className="w-5 h-5" />
                    </button>
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
