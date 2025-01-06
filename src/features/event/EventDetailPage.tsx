"use client";

import Footer from "@/components/Footer";
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
import { Calendar, MapPin, TicketIcon as Tickets, Users } from 'lucide-react';
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import ContentTabs from "./components/ContentTabs";
import SkeletonEvent from "./components/SkeletonEvent";
import { TransactionForm } from "./components/TransactionForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const session = useSession();
  const { data, isPending, error } = useGetEvent(eventId);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  if (isPending) {
    return <SkeletonEvent />;
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.message || "An error occurred while fetching the event details. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No event data available. The event might not exist or has been removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      <section className="container mx-auto pt-2">
        <Navbar />
      </section>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex flex-wrap justify-between gap-6">
          <div className="relative h-[200px] w-full overflow-hidden rounded-lg md:h-[500px] md:w-[700px]">
            <Image
              src={data.thumbnail}
              alt={`Thumbnail for ${data.title}`}
              fill
              className="object-cover"
            />
          </div>
          <Card className="w-full md:h-[500px] md:w-[380px]">
            <CardHeader>
              <CardTitle className="text-2xl">{data.title}</CardTitle>
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
              <div className="flex items-center gap-2">
                <Tickets className="h-5 w-5" />
                <span>
                  Ticket Price:{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(data.price)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{data.description}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link href={`/events/${data.id}`} className="w-full">
                <Button
                  size="icon"
                  className="w-full rounded-xl bg-slate-900 p-4 text-lg font-medium text-white"
                  onClick={() => setShowTransactionForm(true)}
                >
                  Book Now
                </Button>
              </Link>
              {showTransactionForm && (
                <TransactionForm
                  event={{ ...data, id: parseInt(data.id) }}
                  onClose={() => setShowTransactionForm(false)}
                />
              )}
            </CardFooter>
          </Card>
        </div>

        <ContentTabs data={data} />
      </div>
      <Footer />
    </>
  );
};

export default EventDetailPage;

