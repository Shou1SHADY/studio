"use client";

import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

type AnimatedServiceCardProps = {
  service: Service;
  index: number;
  t: (key: string) => string;
};

export const AnimatedServiceCard = ({ service, index, t }: AnimatedServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = service.icon;

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
      { threshold: 0.1 }
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

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className={cn(
        "group flex flex-col items-center text-center p-6 border border-border/50 rounded-lg transition-all duration-700 ease-out hover:bg-accent",
        isVisible ? "opacity-100 translate-x-0" : "opacity-0",
        isEven ? (isVisible ? "translate-x-0" : "-translate-x-12") : (isVisible ? "translate-x-0" : "translate-x-12")
      )}
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="mb-2 font-headline text-xl font-bold">{t(service.titleKey)}</h3>
      <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
    </div>
  );
};
