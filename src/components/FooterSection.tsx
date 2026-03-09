import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const credits = [
  "Directed by Kruthika S.",
  "Written in React, TypeScript & Java",
  "Produced at Anvora Studios",
  "Special Effects by Framer Motion",
  "Score by Coffee & Determination",
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/kruthikas" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/kruthikas" },
  { icon: Mail, label: "Email", href: "mailto:kruthika.s2023eee@sece.ac.in" },
];

const FooterSection = () => {
  return (
    <footer id="contact" className="section-padding relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="font-mono text-primary/70 text-sm tracking-widest uppercase mb-3">
            // The Credits
          </p>
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            <span className="text-gradient-cyan neon-text">End Scene</span>
          </h2>
        </motion.div>

        {/* Rolling Credits */}
        <div className="mb-12 space-y-3">
          {credits.map((credit, i) => (
            <motion.p
              key={credit}
              className="text-muted-foreground text-lg font-mono"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              {credit}
            </motion.p>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              className="group glass-card neon-border p-4 rounded-xl transition-all duration-300 hover:neon-glow-strong hover:scale-110 hover:bg-primary/10"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
            </a>
          ))}
        </motion.div>

        <motion.div
          className="pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p className="text-muted-foreground text-sm font-mono">
            &copy; {new Date().getFullYear()} Kruthika S. — All rights reserved.
          </p>
          <p className="text-muted-foreground/50 text-xs font-mono mt-2">
            No developers were harmed in the making of this portfolio.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
