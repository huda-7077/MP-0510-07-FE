import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { Calendar, MapPin, Users } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:border-emerald-200">
      <CardHeader className="p-0">
        <div className="relative h-[120px] md:h-[220px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="transform object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute right-3 top-3">
            <Badge className="bg-emerald-500 text-white hover:bg-emerald-600">
            {event.avaliableSeats === 0 ? (
                <span className="font-medium ">Sold Out</span>
              ) : (
                <span>{event.avaliableSeats} seats</span>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <div className="p-3 md:p-5">
        <CardTitle className="line-clamp-1 text-xl font-bold tracking-tight text-gray-900">
          {event.title}
        </CardTitle>
        
        <CardDescription className="mt-2 line-clamp-2 text-sm text-gray-600">
          {event.description}
        </CardDescription>

        <CardContent className="mt-4 space-y-3 p-0">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-emerald-500" />
            <span>
              {format(event.startDate, "MMM dd, yyyy")} - {format(event.endDate, "MMM dd, yyyy")}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          {/* <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4 text-emerald-500" />
            <span>
              {event.avaliableSeats === 0 ? (
                <span className="font-medium text-red-500">Sold Out</span>
              ) : (
                <span>{event.avaliableSeats} seats available</span>
              )}
            </span>
          </div> */}
        </CardContent>

       
      </div>
    </Card>
  );
};

export default EventCard;