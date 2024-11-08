"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Organization {
  name: string;
  orgVdcCount: number;
  userCount: number;
  runningVMCount: number;
}

export function OrganizationBubbleChart({
  organizations,
}: {
  organizations: Organization[];
}) {
  const data = organizations.map((org) => ({
    name: org.name,
    userCount: org.userCount,
    runningVMCount: org.runningVMCount,
    vdcCount: org.orgVdcCount * 100, // Scale factor for better visualization
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <XAxis dataKey="userCount" name="Users" />
        <YAxis dataKey="runningVMCount" name="Running VMs" />
        <ZAxis dataKey="vdcCount" range={[100, 1000]} name="VDCs" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter data={data} fill="#8884d8" name="Organizations" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
