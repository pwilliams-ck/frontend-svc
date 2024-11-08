"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the interface for organization data
interface OrgData {
  month: string;
  active: number;
  suspended: number;
}

interface OrgChartProps {
  orgData: OrgData[];
}

const chartConfig = {
  active: {
    label: "Active Orgs",
    color: "hsl(var(--chart-1))",
  },
  suspended: {
    label: "Suspended Orgs",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const OrgChart = ({ orgData }: OrgChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VCD Organizations</CardTitle>
        <CardDescription>
          Organization count over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={orgData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="suspended"
              type="natural"
              fill="var(--color-suspended)"
              fillOpacity={0.4}
              stroke="var(--color-suspended)"
              stackId="a"
            />
            <Area
              dataKey="active"
              type="natural"
              fill="var(--color-active)"
              fillOpacity={0.4}
              stroke="var(--color-active)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Active organizations trend <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              6-month organization statistics
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
