"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProfile from "@/hooks/api/account/useGetProfile";
import useGetUsersData from "@/hooks/api/dashboard-admin/useGetTransactionsData";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { CardTopCharts } from "./CardTopCharts";

const chartConfig = {
  newUsers: {
    label: "New Users",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const generateMonthlyData = (data: any[], year: number) => {
  const months = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  return months.map((month) => {
    const monthData = data.find(
      (item) =>
        new Date(item.date).getMonth() === month.getMonth() &&
        new Date(item.date).getFullYear() === year,
    );
    return {
      month: month.toLocaleDateString("en-US", { month: "short" }),
      newUsers: monthData ? monthData.newUsers : 0,
    };
  });
};

export function CardDashboardAdminCharts() {
  const [timeRange, setTimeRange] = useState("30d");
  const [year, setYear] = useState(2025);
  const [selectedData, setSelectedData] =
    useState<keyof typeof chartConfig>("newUsers");

  const { data, isPending } = useGetUsersData({
    orderBy: timeRange,
    year: year,
  });

  const { data: userName, isPending: isPendingProfile } = useGetProfile();

  const filteredData =
    timeRange === "1y"
      ? generateMonthlyData(data?.data || [], year)
      : data?.data.filter((item) => {
          const date = new Date(item.date);
          const referenceDate = new Date();
          const daysToSubtract = timeRange === "30d" ? 30 : 7;
          const startDate = new Date(referenceDate);
          startDate.setDate(startDate.getDate() - daysToSubtract);
          return date >= startDate;
        });

  const renderChart = () => {
    if (timeRange === "1y") {
      return (
        <BarChart data={filteredData} barCategoryGap="20%">
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => `Month: ${value}`}
              />
            }
          />
          <Bar
            dataKey={selectedData}
            fill={chartConfig[selectedData].color}
            barSize={30}
            name={chartConfig[selectedData].label}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </BarChart>
      );
    } else {
      return (
        <AreaChart data={filteredData}>
          <defs>
            <linearGradient
              id={`fill${selectedData}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={chartConfig[selectedData].color}
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor={chartConfig[selectedData].color}
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
          />
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
                indicator="dot"
              />
            }
          />
          <Area
            dataKey={selectedData}
            type="natural"
            fill={`url(#fill${selectedData})`}
            stroke={chartConfig[selectedData].color}
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      );
    }
  };

  return (
    <div className="w-screen space-y-4 p-4 md:w-full md:p-0 md:px-0">
      <CardTopCharts
        totalUsers={data?.totalUsers}
        totalOrganizers={data?.totalOrganizers}
        totalEvents={data?.totalEvents}
        userName={userName?.fullname}
        isPending={isPending || isPendingProfile}
      />

      <div className="min-h-min flex-1 rounded-xl bg-muted/50">
        <Card>
          <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
              <CardTitle>Event Statistics</CardTitle>
              <CardDescription>
                Select data type and time range for statistics
              </CardDescription>
            </div>
            <div className="flex flex-col items-center gap-2 md:flex-row">
              <div className="flex items-center gap-2">
                <Select
                  value={timeRange}
                  onValueChange={(value) => setTimeRange(value)}
                >
                  <SelectTrigger
                    className="w-[160px] rounded-lg sm:ml-auto"
                    aria-label="Select a time range"
                  >
                    <SelectValue placeholder="Select a time range" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="1y" className="rounded-lg">
                      Year
                    </SelectItem>
                    <SelectItem value="30d" className="rounded-lg">
                      Last 30 days
                    </SelectItem>
                    <SelectItem value="7d" className="rounded-lg">
                      Last 7 days
                    </SelectItem>
                  </SelectContent>
                </Select>

                {timeRange === "1y" && (
                  <Select
                    value={`${year}`}
                    onValueChange={(value) => setYear(Number(value))}
                  >
                    <SelectTrigger
                      className="w-[160px] rounded-lg sm:ml-auto"
                      aria-label="Select a year"
                    >
                      <SelectValue placeholder="Select a year" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectItem value="2024" className="rounded-lg">
                        2024
                      </SelectItem>
                      <SelectItem value="2025" className="rounded-lg">
                        2025
                      </SelectItem>
                      <SelectItem value="2026" className="rounded-lg">
                        2026
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              {renderChart()}
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
