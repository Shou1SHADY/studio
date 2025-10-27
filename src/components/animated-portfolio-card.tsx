"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ImagePlaceholder } from "@/lib/placeholder-images";

type AnimatedPortfolioCardProps = {
  item: ImagePlaceholder;
  index: number;
};

export const AnimatedPortfolioCard = ({ item, index }: AnimatedPortfolioCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href="#" className="group block">
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
    </div>
  );
};
