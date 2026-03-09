import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";
import CinematicLoader from "@/components/CinematicLoader";
import CinematicNav from "@/components/CinematicNav";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Hero zoom-through on scroll
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          scale: 3,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
          },
        });
      }

      // About section — slide up from depth
      if (aboutRef.current) {
        gsap.fromTo(
          aboutRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 90%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        // Text reveals inside About
        const aboutTexts = aboutRef.current.querySelectorAll("h2, h3, p, .glass-card");
        aboutTexts.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                end: "top 60%",
                scrub: 0.5,
              },
            }
          );
        });
      }

      // Projects — horizontal wipe + text reveals
      if (projectsRef.current) {
        gsap.fromTo(
          projectsRef.current,
          { x: 120, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 85%",
              end: "top 35%",
              scrub: 1,
            },
          }
        );

        // Stagger project cards with cinematic slide
        const projectCards = projectsRef.current.querySelectorAll(".glass-card");
        projectCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { x: i % 2 === 0 ? -80 : 80, y: 30, opacity: 0, rotateY: i % 2 === 0 ? -5 : 5 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotateY: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 55%",
                scrub: 0.8,
              },
            }
          );
        });
      }

      // Skills — tilt up reveal + text
      if (skillsRef.current) {
        gsap.fromTo(
          skillsRef.current,
          { y: 80, rotateX: 8, opacity: 0 },
          {
            y: 0,
            rotateX: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );

        // Skills headings
        const skillTexts = skillsRef.current.querySelectorAll("h2, p");
        skillTexts.forEach((el) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 65%",
                scrub: 0.6,
              },
            }
          );
        });
      }

      // Footer — fade up with line reveal
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.8,
            },
          }
        );

        const footerLines = footerRef.current.querySelectorAll("h2, p, a");
        footerLines.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 95%",
                end: "top 75%",
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <>
      <CustomCursor />
      {!loaded && <CinematicLoader onComplete={handleLoaded} />}
      {loaded && <CinematicNav />}
      <main
        ref={containerRef}
        className="bg-background text-foreground overflow-x-hidden"
        style={{ cursor: "none" }}
      >
        <div ref={heroRef} style={{ transformOrigin: "center center" }}>
          <HeroSection />
        </div>
        <div ref={aboutRef}>
          <AboutSection />
        </div>
        <div ref={projectsRef} style={{ perspective: "800px" }}>
          <ProjectsSection />
        </div>
        <div ref={skillsRef} style={{ perspective: "1000px" }}>
          <SkillsSection />
        </div>
        <div ref={footerRef}>
          <FooterSection />
        </div>
      </main>
    </>
  );
};

export default Index;
