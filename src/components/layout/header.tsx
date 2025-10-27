"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { t, toggleLanguage, language, direction } = useLanguage();

  const navLinks = [
    { href: "#home", label: t("nav_home") },
    { href: "#portfolio", label: t("nav_portfolio") },
    { href: "#contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div
          className={cn(
            "flex flex-1 items-center justify-between space-x-2 md:justify-end",
            direction === "rtl" ? "md:justify-start" : "md:justify-end"
          )}
        >
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Mobile Nav could go here */}
          </div>
          <nav className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="font-bold"
            >
              {t("toggle_language")}
            </Button>
          </nav>
        </div>
         {/* Mobile logo centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Link href="/" aria-label="Home">
                <Logo />
            </Link>
        </div>
      </div>
    </header>
  );
};
