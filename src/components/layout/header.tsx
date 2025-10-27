
"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/hooks/use-language";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const { t, toggleLanguage, language } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav_home") },
    { href: "/portfolio", label: t("nav_portfolio") },
    { href: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-screen-2xl items-center justify-between mx-auto px-4">
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-2 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-headline font-bold text-base text-muted-foreground transition-colors hover:bg-gradient-to-r hover:from-primary hover:to-blue-400 hover:bg-clip-text hover:text-transparent px-4 py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="hidden font-bold sm:flex"
          >
            {t("toggle_language")}
          </Button>

          {/* Mobile Navigation Trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs pr-6">
              <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center justify-between">
                   <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <Logo />
                  </Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                      <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-headline text-xl font-bold text-muted-foreground transition-colors hover:bg-gradient-to-r hover:from-primary hover:to-blue-400 hover:bg-clip-text hover:text-transparent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto">
                   <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggleLanguage();
                        setIsMenuOpen(false)
                      }}
                      className="w-full font-bold"
                    >
                      {t("toggle_language")}
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
