
"use client";

import { useLanguage } from "@/hooks/use-language";
import ThreeScene from "@/components/3d-scroll-animation";

export const HeroSection = () => {
  const { t } = useLanguage();

  const storyFrames = [
    {
      title: t("story_frame_1_title"),
      text: t("story_frame_1_text"),
    },
    {
      title: t("story_frame_4_title"),
      text: t("story_frame_4_text"),
    },
    {
      title: t("story_frame_2_title"),
      text: t("story_frame_2_text"),
    },
    {
      title: t("story_frame_3_title"),
      text: t("story_frame_3_text"),
    },
  ];

  return (
    <section id="home" className="relative w-full">
      {/* 3D Background */}
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Initial Frame */}
        <div className="container flex h-screen flex-col items-center justify-center text-center">
           <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-4xl"
            style={{ textShadow: "0 2px 10px hsl(var(--background))" }}
          >
            {t("hero_headline")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-secondary-foreground md:text-xl">
            {t("hero_subheadline")}
          </p>
        </div>

        {/* Story Frames */}
        {storyFrames.map((frame, index) => (
          <div
            key={index}
            className="flex h-screen items-center justify-center"
          >
            <div className="container max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {frame.title}
              </h2>
              <p className="mt-4 text-secondary-foreground md:text-xl">
                {frame.text}
              </p>
            </div>
          </div>
        ))}

         {/* Final padding */}
        <div className="h-[50vh]"></div>
      </div>
    </section>
  );
};
