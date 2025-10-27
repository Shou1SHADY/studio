
"use client";

import Image from "next/image";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ProductShowcaseSection() {
  const { t } = useLanguage();

  return (
    <div className="bg-background py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
             <Image
              src="https://storage.googleapis.com/stedi-assets/elastic-canvas/bosch-keychain.png"
              alt="Custom drill keychain"
              fill
              className="object-contain"
              data-ai-hint="keychain product"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t("product_showcase_title")}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("product_showcase_text")}
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/portfolio">{t("hero_cta")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
