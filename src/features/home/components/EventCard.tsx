import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card>
      <CardHeader>
        <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
          <Image
            src={event.thumbnail}
            alt="thumnail"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{event.title}</CardTitle>
        </div>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {format(event.startDate, "dd/MM/yyyy")} -{" "}
            {format(event.endDate, "dd/MM/yyyy")}
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-sm">
          {event.avaliableSeats} seats available
        </span>

        <Button>
          <Link href={`/events/${event.id}`}>Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
