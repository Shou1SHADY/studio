
"use client";

import { useLanguage } from "@/hooks/use-language";
import { Box, Layers, Package, MousePointerClick } from "lucide-react";
import React from "react";
import { AnimatedServiceCard } from "@/components/animated-service-card";

const services = [
  {
    icon: Box,
    titleKey: "service_3d_modeling_title",
    descriptionKey: "service_3d_modeling_description",
  },
  {
    icon: Layers,
    titleKey: "service_product_design_title",
    descriptionKey: "service_product_design_description",
  },
  {
    icon: Package,
    titleKey: "service_keychain_title",
    descriptionKey: "service_keychain_description",
  },
  {
    icon: MousePointerClick,
    titleKey: "service_patches_title",
    descriptionKey: "service_patches_description",
  },
];

export const ServicesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="services">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {t("services_title")}
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
          {t("services_subtitle")}
        </p>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {services.map((service, index) => (
          <AnimatedServiceCard
            key={index}
            service={service}
            index={index}
            t={t}
          />
        ))}
      </div>
    </section>
  );
};
