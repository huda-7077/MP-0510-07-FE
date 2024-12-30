"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import { Calendar, MapPin, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import ContentTabs from "./components/ContentTabs";
import SkeletonEvent from "./components/SkeletonEvent";

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const session = useSession();

  const { data, isPending: isPendingGet } = useGetEvent(eventId);

  if (isPendingGet) {
    return <SkeletonEvent />;
  }

  if (!data) {
    return <h1 className="mt-8 text-center">No data available.</h1>;
  }

  return (
    <>
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-wrap justify-between gap-6">
          <div className="relative h-[500px] w-full overflow-hidden rounded-lg md:w-[700px]">
            <Image
              src={data.thumbnail}
              alt={`Thumbnail for ${data.title}`}
              fill
              className="object-cover"
            />
          </div>
          <Card className="w-full md:w-[500px]">
            <CardHeader>
              <CardTitle className="text-2xl">{data.title} </CardTitle>
              <CardDescription>
                Organized by {data.user.fullname}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <div>
                  <div>{new Date(data.startDate).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-500">
                    to {new Date(data.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{data.avaliableSeats} seats available</span>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() =>
                      setTicketQuantity((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={ticketQuantity === 1}
                  >
                    -
                  </Button>
                  <span className="text-lg">{ticketQuantity}</span>
                  <Button
                    onClick={() =>
                      setTicketQuantity((prev) =>
                        Math.min(prev + 1, data.avaliableSeats),
                      )
                    }
                    disabled={ticketQuantity >= data.avaliableSeats}
                  >
                    +
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  Max seats: {data.avaliableSeats}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <span className="text-lg">Total:</span>
                <span className="text-2xl font-bold">
                  ${data.price * ticketQuantity}
                </span>
              </div>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        </div>

        <ContentTabs data={data} />
      </div>
    </>
  );
};

export default EventDetailPage;
