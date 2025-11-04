"use client";

import { Line, LineChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: 'Jan', satisfaction: 65 },
  { month: 'Feb', satisfaction: 68 },
  { month: 'Mar', satisfaction: 72 },
  { month: 'Apr', satisfaction: 70 },
  { month: 'May', satisfaction: 75 },
  { month: 'Jun', satisfaction: 78 },
  { month: 'Jul', satisfaction: 82 },
];

const chartConfig = {
  satisfaction: {
    label: "Satisfaction",
    color: "hsl(var(--chart-1))",
  },
};

export function SatisfactionTrendCard() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Satisfaction Trend</CardTitle>
        <CardDescription>Last 7 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="satisfaction"
                type="monotone"
                stroke="var(--color-satisfaction)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
