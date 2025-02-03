"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [autoplayRef] = useState(() =>
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  );
  const [isHovered, setIsHovered] = useState(false);

  const {
    data: events,
    isLoading,
    error,
  } = useGetEvents({
    page: 1,
    take: 5,
  });

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className="h-[500px] w-full animate-pulse bg-gray-200 md:h-[700px]">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !events) {
    return (
      <div className="flex h-[500px] w-full items-center justify-center bg-gray-100 md:h-[700px]">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">
            Failed to load events
          </p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative mx-3 md:mx-auto h-[250px] max-w-6xl overflow-hidden rounded-2xl bg-black md:h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[autoplayRef]}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {events.data.map((event, index) => (
            <CarouselItem key={event.id}>
              <div className="relative h-[250px] w-full overflow-hidden md:h-[500px]">
                <div className="absolute right-6 top-6 z-30 flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-black/60 text-white hover:bg-black/70"
                  >
                    {Math.floor(Math.random() * 5 + 2)}.
                    {Math.floor(Math.random() * 9)}K interested
                  </Badge>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-5 w-5 md:h-10 md:w-10 rounded-full border-0 bg-black/60 backdrop-blur-sm transition-all hover:bg-black/80"
                  >
                    <Heart className="h-5 w-5 text-white transition-all hover:scale-110" />
                  </Button>
                </div>

                <div className="absolute left-0 top-0 z-10 h-full w-[45%] bg-gradient-to-r from-emerald-900 via-emerald-900/95 to-transparent" />
                <div className="absolute left-0 top-0 z-10 h-full w-full bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute left-0 top-0 z-20 flex h-full w-[45%] items-center px-8 md:px-16 lg:px-24">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h1 className="text-2xl font-bold tracking-tight text-white transition-all duration-300 md:text-5xl lg:text-6xl">
                        {event.title}
                      </h1>
                    </div>

                    <div className="flex items-center gap-4">
                      <Button
                        size="sm"
                        className="group bg-white px-3 text-emerald-900 transition-all hover:bg-white/90 md:px-6"
                      >
                        <Link
                          href={`/events/${event.id}`}
                          className="flex items-center gap-2"
                        >
                          See Tickets
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  fill
                  className="duration-[2s] object-cover transition-transform ease-in-out hover:scale-105"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div
          className={`transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            onClick={() => api?.scrollPrev()}
            className="absolute left-4 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 p-0 hover:bg-black/70"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>
          <Button
            onClick={() => api?.scrollNext()}
            className="absolute right-4 top-1/2 z-30 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 p-0 hover:bg-black/70"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </Button>
        </div>

        <div className="absolute bottom-8 left-8 z-30 flex space-x-2 md:left-16 lg:left-24">
          {events.data.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/50 hover:bg-white/70"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
