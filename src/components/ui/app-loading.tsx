"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AppLoadingProps {
  className?: string;
}

export const AppLoading = ({ className }: AppLoadingProps) => {
  return (
    <div className={cn(
      "fixed inset-0 z-50 flex items-center justify-center bg-background",
      "transition-opacity duration-500 ease-in-out",
      className
    )}>
      <div className="flex flex-col items-center space-y-8">
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-headline font-bold text-foreground">
            Elastic Canvas
          </h2>
          <p className="text-muted-foreground animate-pulse">
            Loading your creative experience...
          </p>
        </div>
        
        {/* Progress Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        
        {/* Subtle Background Animation */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-pulse" 
               style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
};
