
"use client";

import { useLanguage } from "@/hooks/use-language";
import { ContactSection } from "@/components/sections/contact-section";
import { MapPin, Mail, Phone } from "lucide-react";
import { Map } from "@/components/map";

export default function ContactPage() {
  const { t } = useLanguage();
  return (
    <div className="flex-grow flex items-center justify-center py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("contact_title")}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-lg">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-headline mb-4">
                Our Studio
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                  <span>
                    123 Design Lane
                    <br />
                    San Francisco, CA 94105, USA
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a
                    href="mailto:contact@elasticcanvas.com"
                    className="hover:text-primary transition-colors"
                  >
                    contact@elasticcanvas.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-primary transition-colors"
                  >
                    (123) 456-7890
                  </a>
                </div>
              </div>
            </div>
            <div className="aspect-video w-full">
              <Map />
            </div>
          </div>
          <div className="bg-card/50 p-8 rounded-lg border border-border/50">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
