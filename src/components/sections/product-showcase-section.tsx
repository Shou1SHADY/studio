
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
          <div className="relative w-full max-w-[400px] mx-auto aspect-square">
             <Image
              src="https://picsum.photos/seed/keychain/400/400"
              alt="Custom drill keychain"
              width={400}
              height={400}
              className="object-contain rounded-lg"
              data-ai-hint="keychain product"
              priority={false}
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
