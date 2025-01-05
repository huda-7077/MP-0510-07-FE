"use client";
import Markdown from "@/components/Markdown";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types/event";
import { FC } from "react";
import ReviewSection from "./ReviewSection";
import { format } from "date-fns";

interface ContentTabsProps {
  data: Event;
}

const ContentTabs: FC<ContentTabsProps> = ({ data }) => {
  const isEventFinished = new Date(data.endDate) < new Date();
  const startDate = new Date(data.startDate);
  const endDate = new Date(data.endDate);

  const formatScheduleDate = (date: Date) => {
    return format(date, "EEEE, dd MMMM yyyy • HH:mm");
  };

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>About the Event</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown content={data.full_description} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="schedule" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Event Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">Start Date</h3>
              <p className="text-gray-600">{formatScheduleDate(startDate)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">End Date</h3>
              <p className="text-gray-600">{formatScheduleDate(endDate)}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-600">{data.location}</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Available Seats</h3>
              <p className="text-gray-600">{data.avaliableSeats} seats</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-4">
        <ReviewSection
          eventId={typeof data.id === "string" ? parseInt(data.id) : data.id}
          isEventFinished={isEventFinished}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
