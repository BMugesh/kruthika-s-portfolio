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
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-cyan neon-text">Send a Transmission</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
            Ready to start a new production? Drop a line and let's build something that refuses to be ignored.
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="max-w-xl mx-auto mb-20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="PROTAGONIST NAME"
                className="bg-card/30 border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-primary/50 outline-none transition-all placeholder:opacity-30"
              />
              <input
                type="email"
                placeholder="COMMUNICATION FREQUENCY"
                className="bg-card/30 border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-primary/50 outline-none transition-all placeholder:opacity-30"
              />
            </div>
            <textarea
              rows={4}
              placeholder="THE PLOT"
              className="w-full bg-card/30 border border-white/10 rounded-lg p-4 font-mono text-sm focus:border-primary/50 outline-none transition-all placeholder:opacity-30"
            />
            <button className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg neon-glow hover:neon-glow-strong transition-all active:scale-[0.98]">
              Roll Camera (Send Message)
            </button>
          </form>
        </motion.div>

        {/* Rolling Credits */}
        <div className="mb-20">
          <p className="font-mono text-primary/50 text-xs tracking-widest uppercase mb-8">// The Credits</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {credits.map((credit, i) => (
              <motion.p
                key={credit}
                className="text-muted-foreground/60 text-sm font-mono whitespace-nowrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {credit}
              </motion.p>
            ))}
          </div>
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
