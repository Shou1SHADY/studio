"use client";

import { useLanguage } from "@/hooks/use-language";
import { Logo } from "@/components/logo";
import { Github, Twitter, Dribbble } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="container flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Elastic Canvas. {t("footer_rights")}
        </p>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
          <Link href="#" aria-label="Dribbble">
            <Dribbble className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          </Link>
        </div>
      </div>
    </footer>
  );
};
