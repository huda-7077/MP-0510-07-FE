"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "La Liga 2024-25",
    image: "/assets/coldplay.avif",
    likes: "2.1K",
  },
  {
    id: 2,
    title: "Premier League",
    image: "/assets/adele.avif",
    likes: "1.8K",
  },
  {
    id: 3,
    title: "Champions League",
    image: "/assets/coldplay.avif",
    likes: "3.2K",
  },
  {
    id: 4,
    title: "Serie A",
    image: "/assets/adele.avif",
    likes: "1.5K",
  },
  {
    id: 5,
    title: "Bundesliga",
    image: "/assets/coldplay.avif",
    likes: "1.9K",
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayRef] = useState(() => Autoplay({ delay: 5000 }));



  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplayRef]}
      className="w-full pt-10"
      setApi={setApi}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="relative h-[600px] max-w-7xl mx-auto">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-xl space-y-6">
                    <h1 className="text-6xl font-bold text-white">
                      {slide.title}
                    </h1>
                    <Button variant="secondary" size="lg">
                      See Tickets
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
