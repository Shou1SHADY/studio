"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/hooks/use-language";

export const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-20 sm:py-32">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("portfolio_title")}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-lg">
            {t("portfolio_subtitle")}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PlaceHolderImages.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden border-2 border-border/50 transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
            >
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.description}
                    width={600}
                    height={400}
                    data-ai-hint={item.imageHint}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-xl">
                  {item.description}
                </CardTitle>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
