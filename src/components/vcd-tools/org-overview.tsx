"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { VCDOrg } from "@/app/actions/get-orgs";
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
import { TrendingUp } from "lucide-react";

const chartConfig = {
  vdcs: {
    label: "Virtual Data Centers",
    color: "hsl(142, 76%, 36%)",
  },
  vms: {
    label: "Running VMs",
    color: "hsl(217, 91%, 60%)",
  },
} satisfies ChartConfig;

export function OrganizationOverview({
  organizations,
}: {
  organizations: VCDOrg[];
}) {
  const data = organizations.map((org) => ({
    name: org.displayName,
    vdcs: org.orgVdcCount,
    vms: org.runningVMCount,
  }));

  const totalVDCs = data.reduce((sum, org) => sum + org.vdcs, 0);
  const totalVMs = data.reduce((sum, org) => sum + org.vms, 0);

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg w-[800px]">
        <CardHeader className="space-y-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">
              Resource Distribution
            </CardTitle>
            <CardDescription className="text-sm">
              Comprehensive overview of VDCs and VMs across all organizations
            </CardDescription>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="rounded-lg border p-2">
              <div className="text-xs font-medium text-muted-foreground">
                Total VDCs
              </div>
              <div className="text-xl font-bold">{totalVDCs}</div>
            </div>
            <div className="rounded-lg border p-2">
              <div className="text-xs font-medium text-muted-foreground">
                Total VMs
              </div>
              <div className="text-xl font-bold">{totalVMs}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative h-[600px] ">
          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{
                  top: 15,
                  right: 20,
                  left: 15,
                  bottom: 50,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={20}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 11 }}
                  interval={0}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 11 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="vdcs"
                  fill="var(--color-vdcs)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="vms"
                  fill="var(--color-vms)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 border-t pt-4">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span className="font-medium text-sm">
              Managing {organizations.length} Active Organizations
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Monitoring resource allocation across all VCD organizations in
            real-time
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
