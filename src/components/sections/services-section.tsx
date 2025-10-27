"use client";

import { useLanguage } from "@/hooks/use-language";
import { Box, Building, Layers, Package, MousePointerClick, AppWindow } from "lucide-react";
import React from "react";

const services = [
  {
    icon: Box,
    titleKey: "service_3d_modeling_title",
    descriptionKey: "service_3d_modeling_description",
  },
  {
    icon: Building,
    titleKey: "service_animation_title",
    descriptionKey: "service_animation_description",
  },
  {
    icon: Layers,
    titleKey: "service_motion_graphics_title",
    descriptionKey: "service_motion_graphics_description",
  },
  {
    icon: AppWindow,
    titleKey: "service_architecture_title",
    descriptionKey: "service_architecture_description",
  },
  {
    icon: Package,
    titleKey: "service_product_design_title",
    descriptionKey: "service_product_design_description",
  },
  {
    icon: MousePointerClick,
    titleKey: "service_interactive_title",
    descriptionKey: "service_interactive_description",
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="container mx-auto">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("services_title")}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          {t("services_subtitle")}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="flex flex-col items-center text-center p-6 border border-border/50 rounded-lg hover:bg-accent transition-colors">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-headline text-xl font-bold">{t(service.titleKey)}</h3>
              <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
