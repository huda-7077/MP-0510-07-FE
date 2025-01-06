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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import { 
  Calendar, 
  MapPin, 
  TicketIcon, 
  Users, 
  AlertCircle,
  Heart,
  Share2,
  Clock,
  ArrowRight,
  Star,
  Building,
  Phone
} from 'lucide-react';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useState } from "react";
import ContentTabs from "./components/ContentTabs";
import SkeletonEvent from "./components/SkeletonEvent";
import { TransactionForm } from "./components/TransactionForm";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const session = useSession();
  const { data, isPending, error } = useGetEvent(eventId);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  if (isPending) return <SkeletonEvent />;

  if (error || !data) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Alert variant="destructive" className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          <div>
            <AlertTitle className="text-lg font-semibold">Error</AlertTitle>
            <AlertDescription className="mt-1">
              {error?.message || "Event not found or has been removed."}
            </AlertDescription>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr,380px]">
          {/* Left Column - Image and Details */}
          <div className="space-y-6">
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Top Actions */}
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-all hover:bg-white"
                >
                  <Heart 
                    className={`h-5 w-5 transition-all group-hover:scale-110 group-hover:text-red-500 ${
                      isLiked ? 'fill-red-500 text-red-500' : 'text-white'
                    }`}
                  />
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-all hover:bg-white hover:text-emerald-600">
                  <Share2 className="h-5 w-5 text-white transition-all group-hover:scale-110 group-hover:text-emerald-600" />
                </button>
              </div>

              {/* Bottom Badges */}
              <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2">
                <Badge className="bg-emerald-500 text-white">
                  {data.category}
                </Badge>
                <Badge className="flex items-center gap-1 bg-white/90 text-emerald-600">
                  <Star className="h-3 w-3 fill-emerald-600" />
                  4.8 (120 reviews)
                </Badge>
              </div>
            </div>

            {/* Event Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {data.title}
              </h1>
              <p className="text-gray-600">
                {data.description}
              </p>
            </div>

            {/* Organizer Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="h-5 w-5 text-emerald-600" />
                  Event Organizer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-600">
                    {data.user.fullname[0]}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{data.user.fullname}</h3>
                    <p className="text-sm text-gray-600">Verified Organizer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  Contact organizer
                </div>
              </CardContent>
            </Card>

            {/* Content Tabs */}
            <ContentTabs data={data} />
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:sticky lg:top-24">
            <Card className="overflow-hidden border-2">
              <CardHeader className="border-b bg-gray-50 pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    {formatPrice(data.price)}
                  </CardTitle>
                  <Badge className={data.avaliableSeats > 0 ? 'bg-emerald-500' : 'bg-red-500'}>
                    {data.avaliableSeats > 0 ? `${data.avaliableSeats} seats left` : 'Sold Out'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-6">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Date & Time</div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>{format(new Date(data.startDate), "EEEE, MMMM d, yyyy")}</div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {format(new Date(data.startDate), "h:mm a")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Location</div>
                    <div className="text-sm text-gray-600">{data.location}</div>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    <Users className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Availability</div>
                    <div className="text-sm text-gray-600">
                      {data.avaliableSeats} seats remaining
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t bg-gray-50 p-6">
                <Button
                  className="group w-full gap-2 bg-emerald-600 py-6 text-lg hover:bg-emerald-700"
                  onClick={() => setShowTransactionForm(true)}
                  disabled={data.avaliableSeats === 0}
                >
                  {data.avaliableSeats > 0 ? 'Book Now' : 'Sold Out'}
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          event={{ ...data, id: parseInt(data.id) }}
          onClose={() => setShowTransactionForm(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default EventDetailPage;