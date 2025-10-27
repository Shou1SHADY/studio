import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function PortfolioPage() {
    return (
        <div className="container mx-auto px-4 py-20 sm:py-32 space-y-24">
            <ServicesSection />
            <PortfolioSection />
        </div>
    );
}
