"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import ThreeScene from "@/components/3d-scroll-animation";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const { t, direction } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ThreeScene />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10 flex flex-col items-center text-center">
        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl"
          style={{ textShadow: "0 2px 10px hsl(var(--background))" }}
        >
          {t("hero_headline")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-secondary-foreground md:text-xl">
          {t("hero_subheadline")}
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="font-bold">
            <Link href="#portfolio">
              {t("hero_cta")}
              <ArrowRight className={`w-5 h-5 ${direction === 'rtl' ? 'mr-2 -scale-x-100' : 'ml-2'}`} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
