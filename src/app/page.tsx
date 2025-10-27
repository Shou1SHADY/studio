import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PortfolioSection />
      <ContactSection />
    </div>
  );
}
