"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import Link from "next/link";

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [autoplayRef] = useState(() => Autoplay({ delay: 5000 }));

  const {
    data: events,
    isLoading,
    error,
  } = useGetEvents({
    page: 1,
    take: 5,
  });

  if (isLoading) {
    return (
      <div className="h-[300px] w-full animate-pulse bg-gray-200 md:h-[600px]" />
    );
  }

  if (error || !events) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center bg-gray-100 md:h-[600px]">
        Failed to load events
      </div>
    );
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[autoplayRef]}
      className="w-full pt-5 md:pt-10"
      setApi={setApi}
    >
      <CarouselContent>
        {events.data.map((event) => (
          <CarouselItem key={event.id}>
            <div className="relative mx-auto h-[300px] max-w-7xl md:h-[600px]">
              <Image
                src={event.thumbnail}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6">
                  <div className="max-w-sm space-y-6 md:max-w-xl">
                    <h1 className="text-3xl font-bold text-white md:text-6xl">
                      {event.title}
                    </h1>
                    <Button variant="secondary" size="lg">
                      <Link href={`/events/${event.id}`}>See Ticket</Link>
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
