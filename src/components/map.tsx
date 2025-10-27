
"use client";

import { Card } from "@/components/ui/card";

export const Map = () => {
  return (
    <Card className="overflow-hidden w-full h-full border-2 border-border/50">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.284704481084!2d-122.39821168468202!3d37.78369697975803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858063a4365555%3A0x1a8f6d4de2043a7e!2sSalesforce%20Park!5e0!3m2!1sen!2sus!4v1688580000000!5m2!1sen!2sus&style=feature:all|element:labels.text.fill|color:0xaaaaaa&style=feature:all|element:labels.text.stroke|visibility:off&style=feature:administrative.land_parcel|visibility:off&style=feature:administrative.neighborhood|visibility:off&style=feature:poi|element:labels.text|visibility:off&style=feature:road|element:geometry|color:0x333333&style=feature:road.arterial|element:labels|visibility:off&style=feature:road.highway|element:geometry|color:0x444444&style=feature:road.highway|element:labels|visibility:off&style=feature:road.local|element:labels|visibility:off&style=feature:transit|visibility:off&style=feature:water|element:geometry|color:0x1a1a1a"
        className="grayscale invert-[90%] contrast-[1.2]"
      ></iframe>
    </Card>
  );
};
