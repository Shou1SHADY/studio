"use client";

import Link from "next/link";
import {
  Card
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/hooks/use-language";
import { AnimatedPortfolioCard } from "@/components/animated-portfolio-card";

export const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="w-full">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("portfolio_title")}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-lg">
            {t("portfolio_subtitle")}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PlaceHolderImages.map((item, index) => (
            <AnimatedPortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
    </section>
  );
};
