"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useLanguage } from "@/hooks/use-language";

export const PortfolioSection = () => {
  const { t } = useLanguage();

  return (
    <section id="portfolio" className="py-20 sm:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("portfolio_title")}
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-muted-foreground md:text-lg">
            {t("portfolio_subtitle")}
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {PlaceHolderImages.map((item) => (
            <Link href="#" key={item.id} className="group block">
              <Card
                className="overflow-hidden border-2 border-border/50 transition-all duration-300 ease-in-out hover:border-primary hover:shadow-2xl hover:shadow-primary/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.description}
                    width={600}
                    height={400}
                    data-ai-hint={item.imageHint}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                   <div className="absolute bottom-0 w-full p-4">
                     <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      {item.category}
                    </p>
                    <h3 className="font-headline text-lg font-bold text-white">
                      {item.description}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
