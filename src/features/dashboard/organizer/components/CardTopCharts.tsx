"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CardTopChartsProps {
  totalRevenue: number | undefined;
  totalTicketsSold: number | undefined;
  totalEvents: number | undefined;
  userName: string | undefined;
  isPending: boolean;
}

export function CardTopCharts({
  totalRevenue,
  totalTicketsSold,
  totalEvents,
  userName,
  isPending,
}: CardTopChartsProps) {
  if (isPending) {
    return (
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[150px]" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Organizer Name</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userName}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">
            All Time Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalRevenue?.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">
            All Time Events Created
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEvents}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">
            All Time Tickets Sold
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTicketsSold}</div>
        </CardContent>
      </Card>
    </div>
  );
}
