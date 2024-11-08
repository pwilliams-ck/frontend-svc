"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const chartData = [
  { date: "2024-01-01", Dallas: 150, SLC: 120, Chicago: 180 },
  { date: "2024-01-02", Dallas: 165, SLC: 98, Chicago: 195 },
  { date: "2024-01-03", Dallas: 142, SLC: 132, Chicago: 176 },
  { date: "2024-01-04", Dallas: 189, SLC: 145, Chicago: 154 },
  { date: "2024-01-05", Dallas: 167, SLC: 128, Chicago: 198 },
  { date: "2024-01-06", Dallas: 145, SLC: 167, Chicago: 187 },
  { date: "2024-01-07", Dallas: 178, SLC: 154, Chicago: 165 },
  { date: "2024-01-08", Dallas: 198, SLC: 143, Chicago: 189 },
  { date: "2024-01-09", Dallas: 167, SLC: 176, Chicago: 201 },
  { date: "2024-01-10", Dallas: 187, SLC: 189, Chicago: 178 },
  { date: "2024-01-11", Dallas: 210, SLC: 165, Chicago: 156 },
  { date: "2024-01-12", Dallas: 189, SLC: 154, Chicago: 187 },
  { date: "2024-01-13", Dallas: 167, SLC: 178, Chicago: 198 },
  { date: "2024-01-14", Dallas: 198, SLC: 187, Chicago: 176 },
  { date: "2024-01-15", Dallas: 221, SLC: 167, Chicago: 189 },
  { date: "2024-01-16", Dallas: 198, SLC: 189, Chicago: 210 },
  { date: "2024-01-17", Dallas: 176, SLC: 198, Chicago: 187 },
  { date: "2024-01-18", Dallas: 198, SLC: 176, Chicago: 165 },
  { date: "2024-01-19", Dallas: 234, SLC: 189, Chicago: 198 },
  { date: "2024-01-20", Dallas: 212, SLC: 201, Chicago: 221 },
  { date: "2024-01-21", Dallas: 187, SLC: 187, Chicago: 198 },
  { date: "2024-01-22", Dallas: 201, SLC: 165, Chicago: 176 },
  { date: "2024-01-23", Dallas: 245, SLC: 198, Chicago: 198 },
  { date: "2024-01-24", Dallas: 223, SLC: 221, Chicago: 234 },
  { date: "2024-01-25", Dallas: 198, SLC: 198, Chicago: 212 },
  { date: "2024-01-26", Dallas: 234, SLC: 176, Chicago: 187 },
  { date: "2024-01-27", Dallas: 256, SLC: 212, Chicago: 201 },
  { date: "2024-01-28", Dallas: 234, SLC: 234, Chicago: 245 },
  { date: "2024-01-29", Dallas: 212, SLC: 212, Chicago: 223 },
  { date: "2024-01-30", Dallas: 245, SLC: 187, Chicago: 198 },
  { date: "2024-01-31", Dallas: 267, SLC: 223, Chicago: 234 },
  { date: "2024-02-01", Dallas: 245, SLC: 245, Chicago: 256 },
  { date: "2024-02-02", Dallas: 223, SLC: 223, Chicago: 234 },
  { date: "2024-02-03", Dallas: 256, SLC: 198, Chicago: 212 },
  { date: "2024-02-04", Dallas: 278, SLC: 234, Chicago: 245 },
  { date: "2024-02-05", Dallas: 256, SLC: 256, Chicago: 267 },
  { date: "2024-02-06", Dallas: 234, SLC: 234, Chicago: 245 },
  { date: "2024-02-07", Dallas: 267, SLC: 212, Chicago: 223 },
  { date: "2024-02-08", Dallas: 289, SLC: 245, Chicago: 256 },
  { date: "2024-02-09", Dallas: 267, SLC: 267, Chicago: 278 },
  { date: "2024-02-10", Dallas: 245, SLC: 245, Chicago: 256 },
  { date: "2024-02-11", Dallas: 278, SLC: 223, Chicago: 234 },
  { date: "2024-02-12", Dallas: 301, SLC: 256, Chicago: 267 },
  { date: "2024-02-13", Dallas: 278, SLC: 278, Chicago: 289 },
  { date: "2024-02-14", Dallas: 256, SLC: 256, Chicago: 267 },
  { date: "2024-02-15", Dallas: 289, SLC: 234, Chicago: 245 },
  { date: "2024-02-16", Dallas: 312, SLC: 267, Chicago: 278 },
  { date: "2024-02-17", Dallas: 289, SLC: 289, Chicago: 301 },
  { date: "2024-02-18", Dallas: 267, SLC: 267, Chicago: 278 },
  { date: "2024-02-19", Dallas: 301, SLC: 245, Chicago: 256 },
  { date: "2024-02-20", Dallas: 323, SLC: 278, Chicago: 289 },
  { date: "2024-02-21", Dallas: 301, SLC: 301, Chicago: 312 },
  { date: "2024-02-22", Dallas: 278, SLC: 278, Chicago: 289 },
  { date: "2024-02-23", Dallas: 312, SLC: 256, Chicago: 267 },
  { date: "2024-02-24", Dallas: 334, SLC: 289, Chicago: 301 },
  { date: "2024-02-25", Dallas: 312, SLC: 312, Chicago: 323 },
  { date: "2024-02-26", Dallas: 289, SLC: 289, Chicago: 301 },
  { date: "2024-02-27", Dallas: 323, SLC: 267, Chicago: 278 },
  { date: "2024-02-28", Dallas: 345, SLC: 301, Chicago: 312 },
  { date: "2024-02-29", Dallas: 323, SLC: 323, Chicago: 334 },
];

const chartConfig = {
  vms: {
    label: "Virtual Machines",
  },
  Dallas: {
    label: "Dallas",
    color: "hsl(var(--chart-1))",
  },
  SLC: {
    label: "Salt Lake City",
    color: "hsl(var(--chart-2))",
  },
  Chicago: {
    label: "Chicago",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export const OrgAreaChart = () => {
  const [selectedCity, setSelectedCity] = React.useState("all");

  const getFilteredData = () => {
    if (selectedCity === "all") {
      return chartData;
    }
    return chartData.map((item) => ({
      date: item.date,
      [selectedCity]: item[selectedCity as keyof typeof item],
    }));
  };

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Active VMs by Datacenter</CardTitle>
          <CardDescription>
            Real-time VM usage across datacenter locations
          </CardDescription>
        </div>
        <Select value={selectedCity} onValueChange={setSelectedCity}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a datacenter"
          >
            <SelectValue placeholder="All Datacenters" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="all" className="rounded-lg">
              All Datacenters
            </SelectItem>
            <SelectItem value="Dallas" className="rounded-lg">
              Dallas
            </SelectItem>
            <SelectItem value="SLC" className="rounded-lg">
              Salt Lake City
            </SelectItem>
            <SelectItem value="Chicago" className="rounded-lg">
              Chicago
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={getFilteredData()}>
            <defs>
              <linearGradient id="fillDallas" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Dallas)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Dallas)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSLC" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-SLC)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-SLC)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillChicago" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Chicago)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Chicago)"
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
            {(selectedCity === "all" || selectedCity === "Chicago") && (
              <Area
                dataKey="Chicago"
                type="monotone"
                fill="url(#fillChicago)"
                stroke="var(--color-Chicago)"
                stackId="1"
              />
            )}
            {(selectedCity === "all" || selectedCity === "SLC") && (
              <Area
                dataKey="SLC"
                type="monotone"
                fill="url(#fillSLC)"
                stroke="var(--color-SLC)"
                stackId="1"
              />
            )}
            {(selectedCity === "all" || selectedCity === "Dallas") && (
              <Area
                dataKey="Dallas"
                type="monotone"
                fill="url(#fillDallas)"
                stroke="var(--color-Dallas)"
                stackId="1"
              />
            )}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
