import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <FooterSection />
    </main>
  );
};

export default Index;
