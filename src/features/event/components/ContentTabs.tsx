import Markdown from "@/components/Markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types/event";
import { FC } from "react";

interface ContentTabsProps {
  data: Event;
}

const ContentTabs: FC<ContentTabsProps> = ({ data }) => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="schedule">Schedule</TabsTrigger>
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
          <CardContent>
            
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
