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

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

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

      // About section slide up from depth
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
      }

      // Projects horizontal wipe feel
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
      }

      // Skills tilt up reveal
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
      }
    }, containerRef);

    return () => ctx.revert();
  }, [loaded]);

  return (
    <>
      <CustomCursor />
      {!loaded && <CinematicLoader onComplete={handleLoaded} />}
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
        <div ref={projectsRef}>
          <ProjectsSection />
        </div>
        <div ref={skillsRef} style={{ perspective: "1000px" }}>
          <SkillsSection />
        </div>
        <FooterSection />
      </main>
    </>
  );
};

export default Index;
